import styles from '@/styles/Chat.module.scss';

import { ChatSocketProvider } from '@/context/SocketConnection';
import { ChatTabs } from '@/interfaces';
import {
  setSelectedContact,
  startGetContacts,
  useAppDispatch,
  useAppSelector
} from '@/redux';
import { AuthRouteGuard } from '@/routes/AuthRouteGuard';
import { ContactsView, MessagesView, ProfileView } from '@/ui';
import { ChatHeader } from '@/ui/chat/components/ChatHeader';
import { NavTabs } from '@/ui/chat/components/NavTabs';
import { LoadingSpinner } from '@/ui/utils/LoadingSpinner';
import React, { useEffect } from 'react';

export interface IChatLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const tabViewMap = {
  [ChatTabs.PROFILE]: <ProfileView />,
  [ChatTabs.CONTACTS]: <ContactsView />,
  [ChatTabs.MESSAGES]: <MessagesView />,
};


export const ChatLayout: React.FC<IChatLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(startGetContacts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const lastContact = localStorage.getItem('last-contact');

    if(lastContact) {
      const contact = chatState.contacts.find(contact => contact.contactId  === lastContact);
      if( contact ){
        dispatch(setSelectedContact(contact));
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatState.contacts.length])

  return (
    <AuthRouteGuard redirect="/auth" loadingComponent={<LoadingSpinner />}>
      <ChatSocketProvider>
        <div className={styles.chatPageContainer}>
          <ChatHeader />
          <NavTabs />
          <main className={styles.viewContainer}>
            {tabViewMap[chatState.selectedTab]}
          </main>
        </div>
      </ChatSocketProvider>
    </AuthRouteGuard>
  );
};
