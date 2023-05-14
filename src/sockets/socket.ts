import { SocketChat } from '@/interfaces';
import { io } from 'socket.io-client';

// export const socket: SocketChat = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http:localhost:3000', {
//   extraHeaders: {
//     'x-token': localStorage.getItem('x-token') ?? '',
//   },
//   autoConnect: false,
// });

export class SocketManager {
  static socket: SocketChat | null = null;

  private constructor() {}

  static getInstance(extraHeaders: any) {
    if (this.socket) {
      return this.socket;
    } else {
      this.socket = io(
        process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http:localhost:3000',
        {
          extraHeaders,
          autoConnect: false,
        }
      );

      return this.socket;
    }
  }
}
