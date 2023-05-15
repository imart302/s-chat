import { GoogleSignInButton } from '@/components';
import {
  AuthStatus,
  CodeResponse,
  GoogleCredentialResponse,
  ILoginBody,
  TokenResponse,
} from '@/interfaces';
import { AuthLayout } from '@/layouts';
import { useAppDispatch, useAppSelector } from '@/redux';
import { startGoogleSignIn, startLoginNative } from '@/redux/auth';
import styles from '@/styles/Auth.module.scss';
import { emailRegex } from '@/utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { use, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app';

interface ILoginInputs {
  email: string;
  password: string;
}

export interface IAuthState {
  displayError: null | string;
  calcButtonWidth: number | null;
}

const Auth: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const [state, setState] = useState<IAuthState>({
    calcButtonWidth: null,
    displayError: null,
  });
  const buttonLoginRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonLoginRef.current?.offsetWidth) {
      setState((actual) => ({
        ...actual,
        calcButtonWidth: buttonLoginRef.current?.offsetWidth ?? 250,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonLoginRef.current]);

  useEffect(() => {
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

    setState((actual) => ({
      ...actual,
      displayError: null,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.email, errors.password]);

  const onSignInWithGoogle = (credentialResponse: TokenResponse) => {
    dispatch(startGoogleSignIn(credentialResponse.access_token))
  };

  const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
    if (authState.status !== AuthStatus.LoginIn) {
      const user: ILoginBody = {
        email: data.email,
        password: data.password,
      };

      dispatch(startLoginNative(user));
    }
  };

  useEffect(() => {
    if (authState.status === AuthStatus.Auth) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.status]);

  useEffect(() => {
    if (authState.errors?.signIn) {
      setState((actual) => ({
        ...actual,
        displayError: authState.errors?.signIn ?? 'Unknown error',
      }));
    }
  }, [authState.errors?.signIn]);

  return (
    <div className={`container ${styles.authContainer}`}>
      <div className="row">
        <div className="column flex">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex justify-content-center mb-3">
              <h3 className="place-items-middle">Login</h3>
            </div>

            <div className="mb-3">
              <input
                type="email"
                id="id-email"
                className="form-control"
                placeholder="email"
                autoComplete="off"
                pattern={emailRegex.source}
                {...register('email', {
                  required: true,
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

            <div className="d-grid mt-5 mb-3">
              <button
                ref={buttonLoginRef}
                type="submit"
                className="btn btn-primary"
                disabled={authState.status === AuthStatus.LoginIn}
              >
                Login
              </button>
            </div>
          </form>

          <div className="d-flex justify-content-center">
            <GoogleSignInButton onSignIn={onSignInWithGoogle} text='Login with google' />
          </div>

          <div className="mt-5 d-flex justify-content-around">
            <small>Don&apos;t have an account?</small>
            <small>
              <Link href={'/auth/register'} prefetch={false}>
                Create account
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

Auth.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Auth;
