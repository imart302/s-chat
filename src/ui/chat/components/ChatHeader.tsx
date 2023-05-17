import React from 'react';
import styles from '@/styles/Chat.module.scss';
import { doLogout, fullReset, useAppDispatch, useAppSelector } from '@/redux';
import { useRouter } from 'next/router';

export const ChatHeader = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogout = () => {
    dispatch(fullReset());
    dispatch(doLogout());
    router.push('/auth');
  };

  return (
    <div className={styles.chatNavbar}>
      <div className={styles.chatToolbar}>
        <h5>Chat Express: {authState.user?.username}</h5>
        <button
          type="button"
          className="btn btn-outline-danger"
          style={{whiteSpace: 'pre' }}
          onClick={onLogout}
        >
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          {' Logout'}
        </button>
      </div>
    </div>
  );
};
