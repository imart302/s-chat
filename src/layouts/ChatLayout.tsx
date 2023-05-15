import styles from '@/styles/Chat.module.scss';

import { ContactsView } from '@/components/chat/ContactsView';
import { MessagesView } from '@/components/chat/MessagesView';
import { ProfileView } from '@/components/chat/ProfileView';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import { ChatTabs } from '@/interfaces';
import {
  doLogout,
  setSelectedContact,
  setSelectedTab,
  startGetContacts,
  useAppDispatch,
  useAppSelector,
} from '@/redux';
import { AuthRouteGuard } from '@/routes/AuthRouteGuard';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ChatSocketProvider } from '@/context/SocketConnection';

export interface IChatLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const tabViewMap = {
  [ChatTabs.PROFILE]: <ProfileView />,
  [ChatTabs.CONTACTS]: <ContactsView />,
  [ChatTabs.MESSAGES]: <MessagesView />,
};

const tabStringMap = {
  [ChatTabs.PROFILE]: 'profile',
  [ChatTabs.CONTACTS]: 'contacts',
  [ChatTabs.MESSAGES]: 'messages',
};

const tabMap = [
  {
    name: tabStringMap[ChatTabs.PROFILE],
    value: ChatTabs.PROFILE,
  },
  {
    name: tabStringMap[ChatTabs.CONTACTS],
    value: ChatTabs.CONTACTS,
  },
  {
    name: tabStringMap[ChatTabs.MESSAGES],
    value: ChatTabs.MESSAGES,
  },
];

export const ChatLayout: React.FC<IChatLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();

  const onSelectTab: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    const tabName = event.currentTarget.href.split('#')[1];

    const tab = tabMap.find((tab) => tab.name === tabName);
    if (tab) {
      dispatch(setSelectedTab(tab.value));
    }
  };

  const onLogout = () => {
    dispatch(doLogout());
    router.push('/auth');
  };

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
          <div className={styles.chatNavbar}>
            <div className={styles.chatToolbar}>
              <h5>Chat Express: {authState.user?.username}</h5>
              <button
                type="button"
                className="btn btn-outline-danger"
                style={{ height: '38px', whiteSpace: 'pre' }}
                onClick={onLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                {' Logout'}
              </button>
            </div>
          </div>
          <div className={`${styles.chatTabs}`}>
            <ul className="nav nav-tabs w-100">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    chatState.selectedTab === ChatTabs.MESSAGES ? 'active' : ''
                  }`}
                  href="#messages"
                  onClick={onSelectTab}
                >
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    chatState.selectedTab === ChatTabs.CONTACTS ? 'active' : ''
                  }`}
                  href="#contacts"
                  onClick={onSelectTab}
                >
                  Contacts
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    chatState.selectedTab === ChatTabs.PROFILE ? 'active' : ''
                  }`}
                  href="#profile"
                  onClick={onSelectTab}
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>
          <main className={styles.viewContainer}>
            {tabViewMap[chatState.selectedTab]}
          </main>
        </div>
      </ChatSocketProvider>
    </AuthRouteGuard>
  );
};
