import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux';
import { AuthStatus } from '@/interfaces';
import { resetAuth, startRefreshToken } from '@/redux/auth';

export interface IPublicRouteGuardProps {
  children: JSX.Element | JSX.Element[];
  redirect: string;
  loadingComponent?: JSX.Element;
}

export const PublicRouteGuard: React.FC<IPublicRouteGuardProps> = ({
  children,
  redirect,
  loadingComponent,
}) => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const tokenListener = (event: StorageEvent) => {
      if (
        (event.oldValue === null && event.newValue) ||
        (event.oldValue && event.newValue === null)
      ) {
        router.reload();
      }
    };
    window.addEventListener('storage', tokenListener);

    if (authState.status === AuthStatus.Auth) {
      setIsChecking(false);
      return () => {
        window.removeEventListener('storage', tokenListener);
      };
    }

    if (authState.status === AuthStatus.NoAuth && isChecking) {
      const xToken = localStorage.getItem('x-token');
      if (xToken && xToken.length > 0) {
        setIsChecking(false);
        dispatch(startRefreshToken());
      }
    }

    setIsChecking(false);

    return () => {
      window.removeEventListener('storage', tokenListener);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isChecking) {
      //success redirect to dashboard
      if (authState.status === AuthStatus.Auth) {
        router.push(redirect);
        return;
      }
    }

    if (authState.status === AuthStatus.LoggedOut) {
      dispatch(resetAuth());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.status, isChecking]);

  return (!isChecking && authState.status === AuthStatus.NoAuth) ||
    authState.status === AuthStatus.LoginIn ? (
    <>{children}</>
  ) : (
    loadingComponent ?? (
      <>
        <h1>Loading</h1>
      </>
    )
  );
};
