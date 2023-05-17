import { IMessageBody, IMessagesQueryResponse } from "./chatApi";

export enum AuthStatus {
  'Auth',
  'NoAuth',
  'Checking',
  'LoggedOut',
  'LoginIn',
}

export enum CreationStatus {
  'Success',
  'Failed',
  'Creating',
}

export enum BaseApiStates {
  'FETCHING',
  'NONE',
}
export interface IAuthUser {
  username: string;
  email: string;
  id: string;
  img?: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ICreateUserBody extends ILoginBody {
  username: string;
}

export interface IUserCreateResponse {
  ok: string,
  user: {
    email: string,
    username: string,
  }
}

export interface IUserLoginResponse {
  status: string,
  token: string,
  user: IAuthUser,
}

export interface IAuthState {
  status: AuthStatus,
  creationStatus: CreationStatus | null,
  token: string  | null,
  user: null | IAuthUser,
  errors: {
    creating: string | null,
    signIn: string | null
  } | null,
  updatePictureApiState: BaseApiStates;
}

export interface IRootState {
  auth: IAuthState
}

export interface IContact {
  email: string;
  userId: string;
  contactId: string;
  username: string;
  id: string;
  img? : string;
}

export interface IGetContactsResponse {
  contacts: IContact[],
}

export interface IAddContactResponse {
  contact: IContact,
}

export interface ISendMessagePayload {
  text: string;
  sender: string;
  receiver: string;
  sentAt: Date;
}

export type IIncomingMessagePayload = ISendMessagePayload;

export enum ChatTabs {
  'MESSAGES',
  'CONTACTS',
  'PROFILE'
}

export enum ContactApiStates {
  'FETCHING',
  'NONE'
}

export interface IChatState {
  selectedTab: ChatTabs;
  selectedContact: IContact | null;
  contacts: IContact[];
  inputMessage: string;
  socketConnected: boolean;
  contactApiState: ContactApiStates;
  queryMessagesApiState: BaseApiStates;
  queryMessages: IMessagesQueryResponse[];
  onlineMessages: IMessageBody[];
  selectedQueryMessages: IMessagesQueryResponse | null;
}