import { ChatTabs, IContact } from '@/interfaces'
import React from 'react'

import styles from '@/styles/Chat.module.scss';
import { setSelectedContact, setSelectedTab, useAppDispatch } from '@/redux';

export interface IContactProps {
  contact: IContact
}

export const Contact: React.FC<IContactProps> = ({contact}) => {

  const dispatch = useAppDispatch();

  const onClickContact = () => {
    dispatch(setSelectedContact(contact));
    dispatch(setSelectedTab(ChatTabs.MESSAGES));
  } 

  return (
    <div className={styles.contactContainer} onClick={onClickContact}>
      <h6>{contact.username}</h6>
      <small>{contact.email}</small>
      <small>offline</small>
    </div>
  )
}
