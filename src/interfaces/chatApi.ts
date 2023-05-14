export interface IMessagesQueryParams {
  contact: string;
  page?: number;
  pageSize?: number;
}

export interface IMessageBody {
  text: string;
  sentAt: string;
  sender: string;
  receiver: string;
  id: string;
}

export interface IMessagesQueryResponse {
  pagination: {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    totalCount: number;
    pages: number;
    pageSize: number;
  };
  contact: string;
  messages: IMessageBody[];
}
