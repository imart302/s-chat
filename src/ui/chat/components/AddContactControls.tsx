import React from 'react';

import styles from '@/styles/Chat.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailRegex } from '@/utils';
import { startAddContact, useAppDispatch, useAppSelector } from '@/redux';
import { ContactApiStates } from '@/interfaces';

export interface IAddContactForm {
  email: string;
}

export const AddContactControls = () => {
  
  const chatState = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddContactForm>();

  const onSubmit: SubmitHandler<IAddContactForm> = (data) => {
    dispatch(startAddContact(data.email));
    reset();
  };

  return (
    <div className={styles.addContactControlsContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <input
            type="text"
            pattern={emailRegex.source}
            className="form-control"
            aria-label="Message"
            aria-describedby="basic-addon1"
            placeholder="email"
            autoComplete='off'
            {...register('email', { pattern: emailRegex, required: true })}
          />
          <button
            className="btn btn-primary"
            type="submit"
            style={{ borderStyle: 'solid', borderColor: 'rgb(223, 223, 223)', width: '45px' }}
            disabled={chatState.contactApiState === ContactApiStates.FETCHING}
          >
            <i className="fa fa-user-plus" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
