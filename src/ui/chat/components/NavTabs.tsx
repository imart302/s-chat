import { ChatTabs } from '@/interfaces';
import { setSelectedTab, useAppDispatch, useAppSelector } from '@/redux';
import styles from '@/styles/Chat.module.scss';
import React from 'react';

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

export const NavTabs = () => {
  const chatState = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const onSelectTab: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    const tabName = event.currentTarget.href.split('#')[1];

    const tab = tabMap.find((tab) => tab.name === tabName);
    if (tab) {
      dispatch(setSelectedTab(tab.value));
    }
  };

  return (
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
  );
};
