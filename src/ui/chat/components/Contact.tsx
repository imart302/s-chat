import { ChatTabs, IContact } from '@/interfaces';
import React from 'react';

import styles from '@/styles/Chat.module.scss';
import { setSelectedContact, setSelectedTab, startDeleteContacts, useAppDispatch } from '@/redux';
import Image from 'next/image';

export interface IContactProps {
  contact: IContact;
}

export const Contact: React.FC<IContactProps> = ({ contact }) => {
  const dispatch = useAppDispatch();

  const onClickContact = () => {
    dispatch(setSelectedContact(contact));
    dispatch(setSelectedTab(ChatTabs.MESSAGES));
  };

  const handleDeleteContact = () => {
    dispatch(startDeleteContacts(contact));
  }

  return (
    <div className={styles.contactContainer}>
      <div className={styles.innerContactInfo} onClick={onClickContact}>
        <div className="d-flex flex-column p-1">
          <h6>{contact.username}</h6>
          <small>{contact.email}</small>
          <small>offline</small>
        </div>

        <div className={styles.contactImage}>
          <Image
            width={50}
            height={50}
            src={ contact.img ?? '/profile_picture_user_icon.svg'}
            alt="image profile"
            style={{objectFit: 'cover'}}
          />
        </div>
      </div>
      <div className='h-100'>
        <button className="btn btn-danger h-100" onClick={handleDeleteContact}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>

    </div>
  );
};
