import { ChatSocketContext } from '@/context/SocketConnection';
import { ISendMessagePayload } from '@/interfaces';
import { setInputMessage, useAppDispatch, useAppSelector } from '@/redux';
import styles from '@/styles/Chat.module.scss';
import { useContext, useEffect, useState } from 'react';

export const ChatControls = () => {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const authState = useAppSelector((state) => state.auth);
  const socketChatContext = useContext(ChatSocketContext);
  const [ send , setSend ] = useState<boolean>(false);

  const keyPressListener = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSend(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', keyPressListener);

    return () => {
      window.removeEventListener('keyup', keyPressListener);
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(send && chatState.inputMessage.length > 0) {
      const message: ISendMessagePayload = {
        receiver: chatState.selectedContact?.contactId ?? '',
        sender: authState.user?.id ?? '',
        sentAt: new Date(),
        text: chatState.inputMessage
      }

      socketChatContext.sendMessage(message);
      dispatch(setInputMessage(''))
      setSend(false);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send]);

  const handleButtonSend = () => {
    if(chatState.inputMessage.length > 0) {
      const message: ISendMessagePayload = {
        receiver: chatState.selectedContact?.contactId ?? '',
        sender: authState.user?.id ?? '',
        sentAt: new Date(),
        text: chatState.inputMessage
      }

      socketChatContext.sendMessage(message);
      dispatch(setInputMessage(''))
    }
  }

  return (
    <div className={styles.messageControlsContainer}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          aria-label="Message"
          aria-describedby="basic-addon1"
          onChange={(e) => {
            dispatch(setInputMessage(e.target.value));
          }}
          value={chatState.inputMessage}
          placeholder='message'
          disabled={chatState.selectedContact === null}
        />
        <button
          className="btn btn-primary"
          type='button'
          style={{ borderStyle: 'solid', borderColor: 'rgb(223, 223, 223)' }}
          disabled={chatState.selectedContact === null}
          onClick={handleButtonSend}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
