import styles from '@/styles/Auth.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { GoogleSignInButton } from '@/components';
import {
  CreationStatus,
  ICreateUserBody,
  TokenResponse
} from '@/interfaces';
import { AuthLayout } from '@/layouts';
import { useAppDispatch, useAppSelector } from '@/redux';
import { startCreateUserNative, startGoogleSignIn } from '@/redux/auth';
import { emailRegex } from '@/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app';

interface IRegisterInputs {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

interface IRegisterState {
  displayError: string | null;
  displaySuccess: boolean;
  calcButtonWidth: number | null;
}

const Register: NextPageWithLayout = () => {
  const buttonSubmitRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const creationStatus = useAppSelector((store) => store.auth.creationStatus);
  const creationError = useAppSelector((store) => store.auth.errors);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInputs>();
  const [state, setState] = useState<IRegisterState>({
    displayError: null,
    calcButtonWidth: null,
    displaySuccess: false,
  });

  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    if(creationStatus === CreationStatus.Creating){
      return;
    }

    if (data.password !== data.repeatPassword) {
      setState((actual) => ({
        ...actual,
        displayError: "Passwords doesn't match",
      }));
      return;
    }

    const user: ICreateUserBody = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    dispatch(startCreateUserNative(user));
  };

  const onSignInWithGoogle = (credentialResponse: TokenResponse) => {
    dispatch(startGoogleSignIn(credentialResponse.access_token))
  };

  useEffect(() => {
    if (errors.username) {
      setState((actual) => ({
        ...actual,
        displayError: 'Not a valid username',
      }));
      return;
    }

    if (errors.email) {
      setState((actual) => ({
        ...actual,
        displayError: 'Not a valid email',
      }));
      return;
    }

    if (errors.password) {
      setState((actual) => ({
        ...actual,
        displayError: 'Not a valid password',
      }));
      return;
    }

    if (errors.repeatPassword) {
      setState((actual) => ({
        ...actual,
        displayError: 'Please repeat password',
      }));
      return;
    }

    setState((actual) => ({
      ...actual,
      displayError: null,
    }));
  }, [errors.email, errors.username, errors.password, errors.repeatPassword]);

  useEffect(() => {
    if (buttonSubmitRef.current?.offsetWidth) {
      setState((actual) => ({
        ...actual,
        calcButtonWidth: buttonSubmitRef.current?.offsetWidth ?? 250,
      }));
    }
  }, [buttonSubmitRef]);

  useEffect(() => {
    let inter: any = null;
    if (creationStatus === CreationStatus.Success) {
      setState((actual) => ({
        ...actual,
        displaySuccess: true,
      }));
      inter = setInterval(() => {
        setState((actual) => ({
          ...actual,
          displaySuccess: false,
        }));
      }, 2000);
    }
    return () => {
      if(inter){
        clearInterval(inter);
      }
    }
  }, [creationStatus]);

  useEffect(() => {
    if(creationError?.creating){
      setState((actual) => ({
        ...actual,
        displayError: creationError.creating
      }));
    } else {
      setState((actual) => ({
        ...actual,
        displayError: null
      }));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creationError?.creating]);

  return (
    <div className={`container ${styles.authContainer}`}>
      <div className="row">
        <div className="column flex">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex justify-content-center mb-3">
              <h3 className="place-items-middle">Register</h3>
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="id-username"
                className={`form-control ${
                  errors.username ? 'is-invalid' : ''
                }`}
                placeholder="username"
                autoComplete="off"
                {...register('username', {
                  required: true,
                  minLength: 4,
                })}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="id-email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="email"
                autoComplete="off"
                {...register('email', {
                  required: {
                    message: 'Must be a valid email',
                    value: true,
                  },
                  pattern: emailRegex,
                })}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                id="id-password"
                className="form-control"
                placeholder="password"
                minLength={6}
                {...register('password', {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>

            <div className="mb-1">
              <input
                type="password"
                id="id-password-r"
                className="form-control"
                placeholder="repeat password"
                minLength={6}
                {...register('repeatPassword', {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>

            <div className="mb-3 d-flex">
              <small
                style={{
                  visibility: state.displayError ? 'visible' : 'hidden',
                }}
              >
                <i className="text-danger">
                  {state.displayError ? state.displayError : '-'}
                </i>
              </small>
            </div>
            <div className="alert alert-success" role="alert" style={{display: state.displaySuccess ? 'block':'none'}}>
              User created
            </div>

            <div className="d-grid mt-5 mb-3">
              <button
                ref={buttonSubmitRef}
                type="submit"
                className={`btn btn-primary ${creationStatus === CreationStatus.Creating ? 'disabled' : 'active'}`}
              >
                Register
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center">
            <GoogleSignInButton onSignIn={onSignInWithGoogle} text='Continue with google' />
          </div>

          <div className="mt-5 d-flex justify-content-around">
            <small>Already have an account? </small>
            <small>
              <Link href={'/auth'} prefetch={false}>
                Sign In
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Register;
