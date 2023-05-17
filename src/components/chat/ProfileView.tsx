import { BaseApiStates } from '@/interfaces';
import {
  startUpdateProfilePicture,
  useAppDispatch,
  useAppSelector,
} from '@/redux';
import Image from 'next/image';
import React, { useRef } from 'react';

export const ProfileView = () => {
  const authState = useAppSelector((state) => state.auth);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleClickChangePicture = () => {
    if (inputFileRef) {
      inputFileRef.current?.click();
    }
  };

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      dispatch(startUpdateProfilePicture(files[0]));
    }
  };

  return (
    <div
      className="p-2 m-4 d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100%' }}
    >
      <div className="card" style={{ width: '18rem' }}>
        <div
          style={{
            width: '100%',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 0',
          }}
        >
          <Image
            width={120}
            height={120}
            src={
              authState.user?.img
                ? authState.user?.img
                : '/profile_picture_user_icon.svg'
            }
            alt="profile picture"
            style={{
              borderRadius: '50%',
              backgroundColor: 'rgb(223, 223, 223)',
              objectFit: 'cover',
            }}
          ></Image>
        </div>
        <input
          onChange={handleChangeFile}
          ref={inputFileRef}
          type="file"
          style={{ display: 'none' }}
          disabled={authState.updatePictureApiState === BaseApiStates.FETCHING}
        />
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-primary btn-sm w-50"
            onClick={handleClickChangePicture}
          >
            Change picture
          </button>
        </div>

        <div className="card-body">
          <hr />
          <small className="text-muted">Username:</small>
          <h5 className="card-title">{authState.user?.username}</h5>
          <small className="text-muted">Email:</small>
          <p className="card-text">{authState.user?.email}</p>
          <hr />
        </div>
      </div>
    </div>
  );
};
