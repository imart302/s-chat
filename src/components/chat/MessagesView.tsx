import { startFetchingMessages, useAppDispatch, useAppSelector } from '@/redux';
import { ChatControls } from './ChatControls';
import { Message } from './Message';

import styles from '@/styles/Chat.module.scss';
import { useEffect, useRef } from 'react';
import { PAGE_SIZE } from '@/constants';

export const MessagesView = () => {
  const chatState = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  const messagesQuery = chatState.messages.find(
    (messages) => messages.contact === chatState.selectedContact?.contactId
  );

  const completeMessages = [
    ...(messagesQuery?.messages ?? []),
    ...(messagesQuery?.pagination.prevPage === null
      ? chatState.onlineMessages.filter(
          (message) =>
            message.sender === chatState.selectedContact?.contactId ||
            message.receiver === chatState.selectedContact?.contactId
        )
      : []),
  ];

  const scrollToBottom = () => {
    bottomContainerRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  const handleLoadPastMessages = () => {
    if (messagesQuery?.pagination.nextPage) {
      dispatch(
        startFetchingMessages({
          contact: chatState.selectedContact?.contactId!,
          page: messagesQuery.pagination.nextPage,
          pageSize: PAGE_SIZE,
        })
      );
    }
  };

  const handleLoadPresentMessages = () => {
    if (messagesQuery?.pagination.prevPage !== null) {
      dispatch(
        startFetchingMessages({
          contact: chatState.selectedContact?.contactId!,
          page: messagesQuery?.pagination.prevPage!,
          pageSize: PAGE_SIZE,
        })
      );
    }
  };

  const handleLoadRecentMessages = () => {
    dispatch(
      startFetchingMessages({
        contact: chatState.selectedContact?.contactId!,
        page: 0,
        pageSize: PAGE_SIZE,
      })
    );
  };

  useEffect(() => {
    if (chatState.selectedContact) {
      const findMessages = chatState.messages.find(
        (messages) => messages.contact === chatState.selectedContact?.contactId
      );

      if (!findMessages) {
        dispatch(
          startFetchingMessages({
            contact: chatState.selectedContact.contactId,
            page: 0,
            pageSize: PAGE_SIZE,
          })
        );
      }
    }

    scrollToBottom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatState.selectedContact?.contactId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatState.onlineMessages.length, messagesQuery?.messages.length]);

  return (
    <div
      className="p-2 m-4 d-flex flex-column justify-content-between"
      style={{ height: '100%' }}
    >
      <div className={styles.messagesContainer}>
        {chatState.selectedContact === null ? (
          <>Select a contact</>
        ) : (
          <>
            <button
              className="btn btn-primary mb-2"
              style={{
                display: messagesQuery?.pagination.nextPage !== null ? 'block' : 'none',
              }}
              onClick={handleLoadPastMessages}
            >
              Load past
            </button>
            {completeMessages.map((message) => (
              <Message
                date={new Date(message.sentAt)}
                message={message.text}
                user={
                  chatState.contacts.find(
                    (contact) => contact.contactId === message.sender
                  )?.username ?? 'You'
                }
                key={message.id}
              />
            ))}
            <button
              className="btn btn-primary mb-2"
              style={{
                display: messagesQuery?.pagination.prevPage !== null ? 'block' : 'none',
              }}
              onClick={handleLoadPresentMessages}
              onDoubleClick={handleLoadRecentMessages}
            >
              Go to present
            </button>
          </>
        )}
        <div ref={bottomContainerRef} id="bottomContainerRef"></div>
      </div>
      <ChatControls />
    </div>
  );
};
