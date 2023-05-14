import { IContact, IIncomingMessagePayload, IMessagesQueryParams, IMessagesQueryResponse, ISendMessagePayload } from '@/interfaces';
import { SocketManager } from '@/sockets/socket';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { addContact, getContacts } from '@/api';
import { queryMessages } from '@/api/messages';

export const startSendMessageThunk = createAsyncThunk<
  void,
  ISendMessagePayload
>('chat/send', async (message) => {
  const socket = SocketManager.getInstance({});

  if (socket.connected) {
    socket.emit('sendMessage', message);
  }
});

export const startDispatchIncomingMessage = createAsyncThunk<
  void,
  IIncomingMessagePayload
>('chat/incoming', async (message) => {});

export const startAddContact = createAsyncThunk<IContact, string>('chat/addContact', async (string) => {
  const res = await addContact(string);
  return res.contact;
});


export const startGetContacts = createAsyncThunk<IContact[], void>('chat/getContacts', async () => {
  const response = await getContacts();
  return response.contacts;
});

export const startFetchingMessages = createAsyncThunk<IMessagesQueryResponse, IMessagesQueryParams>('chat/fetchMessages', async (params) => {
  const response = await queryMessages(params);
  return response;
});