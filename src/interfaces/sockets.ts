import { Socket } from "socket.io-client";
import { IMessagePayload } from "./chat";
import { ISendMessagePayload } from "./store";
import { IMessageBody } from "./chatApi";

export interface IClientToServerEvents {
  sendMessage: (message: ISendMessagePayload) => void; 
}

export interface IServerToClientEvents {

  incomingMessage: (message: IMessageBody) => void;

}

export type SocketChat = Socket<IServerToClientEvents, IClientToServerEvents>;