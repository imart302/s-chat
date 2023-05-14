import {
  ChatTabs,
  ContactApiStates,
  IChatState,
  IContact,
  IMessageBody,
} from '@/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  startAddContact,
  startFetchingMessages,
  startGetContacts,
  startSendMessageThunk,
} from './thunks';

const initialState: IChatState = {
  contacts: [],
  selectedContact: null,
  selectedTab: ChatTabs.MESSAGES,
  inputMessage: '',
  socketConnected: false,
  contactApiState: ContactApiStates.NONE,
  messages: [], //messages obtained from the REST API
  onlineMessages: [], //messages obtained through sockets
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<ChatTabs>) => {
      state.selectedTab = action.payload;
    },
    setInputMessage: (state, action: PayloadAction<string>) => {
      state.inputMessage = action.payload;
    },
    setSocketConnection: (state, action: PayloadAction<boolean>) => {
      state.socketConnected = action.payload;
    },
    setSelectedContact: (state, action: PayloadAction<IContact>) => {
      state.selectedContact = action.payload;
    },
    addIncomingMessage: (state, action: PayloadAction<IMessageBody>) => {
      state.onlineMessages.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder.addCase(startSendMessageThunk.fulfilled, () => {});

    builder.addCase(startAddContact.fulfilled, (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    });

    builder.addCase(startGetContacts.pending, (state) => {
      state.contactApiState = ContactApiStates.FETCHING;
    });
    builder.addCase(startGetContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.contactApiState = ContactApiStates.NONE;
    });


    builder.addCase(startFetchingMessages.fulfilled, (state, action) => {
      const paginatedMessages = action.payload;
      action.payload.messages = action.payload.messages.reverse();
      const findMessages = state.messages.find(
        (message) => message.contact === paginatedMessages.contact
      );
      if (findMessages) {
        state.messages = state.messages.map((message) =>
          message.contact === paginatedMessages.contact
            ? paginatedMessages
            : message
        );
      } else {
        state.messages.push(paginatedMessages);
      }
    });
  },
});

export const chatInitState = chatSlice.getInitialState();
export const {
  setSelectedTab,
  setInputMessage,
  setSocketConnection,
  setSelectedContact,
  addIncomingMessage,
} = chatSlice.actions;
