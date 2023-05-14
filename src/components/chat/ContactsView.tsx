import React from 'react';
import { Contact } from './Contact';

import styles from '@/styles/Chat.module.scss';
import { AddContactControls } from './AddContactControls';
import { startGetContacts, useAppDispatch, useAppSelector } from '@/redux';
import { ContactApiStates } from '@/interfaces';

export const ContactsView = () => {
  const chatState = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  return (
    <div
      className="p-2 m-4 d-flex flex-column justify-content-between"
      style={{ height: '100%' }}
    >
      <div className={styles.contactsContainer}>
        {chatState.contacts.map((contact) => (
          <Contact key={contact.id} contact={contact}></Contact>
        ))}

        <button
          className="btn btn-primary"
          disabled={chatState.contactApiState === ContactApiStates.FETCHING}
          style={{width: '18rem'}}
          onClick={() => {
            dispatch(startGetContacts());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
          Refresh
        </button>
      </div>

      <AddContactControls />
    </div>
  );
};
