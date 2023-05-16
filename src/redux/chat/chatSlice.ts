import {
  BaseApiStates,
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
  queryMessages: [], //messages obtained from the REST API
  onlineMessages: [], //messages obtained through sockets
  selectedQueryMessages: null,
  queryMessagesApiState: BaseApiStates.NONE,
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
      const queryMessages = state.queryMessages.find((qM) =>  qM.contact === action.payload.contactId);
      if(queryMessages){
        state.selectedQueryMessages = queryMessages;
      }
    },
    addIncomingMessage: (state, action: PayloadAction<IMessageBody>) => {
      state.onlineMessages.push(action.payload);
    },
    fullReset: (state) => {
      state = initialState;
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
    builder.addCase(startGetContacts.rejected, (state) => {
      state.contactApiState = ContactApiStates.NONE;
    });

    
    builder.addCase(startFetchingMessages.pending, (state) => {
      state.queryMessagesApiState = BaseApiStates.FETCHING;
    });
    builder.addCase(startFetchingMessages.fulfilled, (state, action) => {
      state.queryMessagesApiState = BaseApiStates.NONE;
      const paginatedMessages = action.payload;
      action.payload.messages = action.payload.messages.reverse();

      state.selectedQueryMessages = action.payload;
      const findMessages = state.queryMessages.find(
        (message) => message.contact === paginatedMessages.contact
      );
      if (findMessages) {
        state.queryMessages = state.queryMessages.map((message) =>
          message.contact === paginatedMessages.contact
            ? paginatedMessages
            : message
        );
      } else {
        state.queryMessages.push(paginatedMessages);
      }
      state.onlineMessages = state.onlineMessages.filter((message) => {
        return (
          message.sender !== paginatedMessages.contact &&
          message.receiver !== paginatedMessages.contact
        );
      });
    });
    builder.addCase(startFetchingMessages.rejected, (state) => {
      state.queryMessagesApiState = BaseApiStates.NONE;
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
  fullReset,
} = chatSlice.actions;
