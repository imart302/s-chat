import { IMessagesQueryParams, IMessagesQueryResponse } from "@/interfaces"
import { chatApi } from "./chatApi"

export const queryMessages = async (params: IMessagesQueryParams) => {
  const response = await chatApi.get('/messages', {
    params
  });

  const data = response.data as IMessagesQueryResponse;
  return data;
}