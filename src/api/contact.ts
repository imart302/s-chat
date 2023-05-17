import { IAddContactResponse, IContact, IGetContactsResponse } from "@/interfaces";
import { chatApi } from "./chatApi";

export const addContact = async (email: string) => {

  const response = await chatApi.post('/contact', {
    email
  });

  const data = response.data as IAddContactResponse;

  return data;
}

export const getContacts = async () => {

  const response = await chatApi.get('/contact');

  const data = response.data as IGetContactsResponse;
  
  return data;
}

export const deleteContact = async (contact: IContact) => {

  const response = await chatApi.delete(`/contact/${contact.id}`);

  const deleted = response.data.deleted as number;

  return deleted;
}