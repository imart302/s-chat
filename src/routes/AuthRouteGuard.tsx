import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux';
import { AuthStatus } from '@/interfaces';
import { startRefreshToken } from '@/redux/auth';

export interface IAuthRouteGuardProps {
  children: JSX.Element | JSX.Element[];
  redirect: string;
  loadingComponent?: JSX.Element;
}

export const AuthRouteGuard: React.FC<IAuthRouteGuardProps> = ({
  children,
  redirect,
  loadingComponent,
}) => {
  const [isChecking, setIsChecking] = useState(true);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const tokenListener = (event: StorageEvent) => {
      if( (event.oldValue === null && event.newValue) || (event.oldValue && event.newValue === null) ) {
        router.reload();
      }
    }
    window.addEventListener('storage', tokenListener);

    if (authState.status === AuthStatus.Auth) {
      setIsChecking(false);
      return;
    }

    if (authState.status === AuthStatus.NoAuth && isChecking) {
      const xToken = localStorage.getItem('x-token');
      if (xToken && xToken.length > 0) {
        dispatch(startRefreshToken(xToken));
        setIsChecking(false);
      } else {
        //Nothing to do, redirect
        router.push(redirect);
      }
    }

    return () => {
      window.removeEventListener('storage', tokenListener);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isChecking) {
      //not successful refresh token
      if (authState.status === AuthStatus.NoAuth) {
        router.push(redirect);
        return;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.status, isChecking]);

  return isChecking || authState.status !== AuthStatus.Auth ? (
    loadingComponent ?? (
      <>
        <h1>Loading</h1>
      </>
    )
  ) : (
    <>{children}</>
  );
};
