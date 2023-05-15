import { useAppSelector } from '@/redux';
import Image from 'next/image';
import React from 'react';

export const ProfileView = () => {
  const authState = useAppSelector((state) => state.auth);

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
            margin: '10px 0'
          }}
        >
          <Image
            width={120}
            height={120}
            src={
              'https://res.cloudinary.com/dxhbjjkbh/image/upload/v1672956566/journal/jyylbsfmhecjw1bjcvif.jpg'
            }
            alt=""
            style={{borderRadius: '50%'}}
          ></Image>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <button className='btn btn-primary btn-sm w-50'>Change picture</button>
        </div>
        {/* <img src="..." className="card-img-top" alt="..." /> */}
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
