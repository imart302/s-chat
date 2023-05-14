import { IAddContactResponse, IGetContactsResponse } from "@/interfaces";
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