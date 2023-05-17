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
  );
};
