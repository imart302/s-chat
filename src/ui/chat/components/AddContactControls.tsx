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
            style={{ borderStyle: 'solid', borderColor: 'rgb(223, 223, 223)' }}
            disabled={chatState.contactApiState === ContactApiStates.FETCHING}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-add"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
