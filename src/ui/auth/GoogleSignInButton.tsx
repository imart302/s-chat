import { GoogleSignInContext } from '@/context/GoogleSignIn';
import { AuthStatus, TokenResponse } from '@/interfaces';
import React, { useContext, useEffect, useState } from 'react';

import styles from '@/styles/Auth.module.scss';
import Image from 'next/image';
import { useAppSelector } from '@/redux';

export interface GoogleSignInButtonProps {
  onSignIn?: (response: TokenResponse) => void;
  text?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSignIn,
  text,
}) => {
  const authState = useAppSelector((state) => state.auth);
  const [render, setRender] = useState<boolean>(false);
  const googleContext = useContext(GoogleSignInContext);

  const handleGoogleLogin = () => {
    const client = window.google?.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENTID ?? '',
      scope: `openid profile email`,
      callback: (response) => onSignIn?.(response),
    });

    client?.requestAccessToken();
  };

  useEffect(() => {
    if (!googleContext.scriptLoaded) return;
    setRender(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleContext.scriptLoaded]);

  return render ? (
    <button
      className={`${styles.googleSignInButton}`}
      onClick={handleGoogleLogin}
      disabled={authState.status === AuthStatus.LoginIn || authState.status === AuthStatus.Checking}
    >
      <Image
        src={'/logo_google_g_icon.svg'}
        alt={''}
        style={{ marginRight: '10px' }}
        width={25}
        height={25}
      />
      {/* <img style={{height: '30px', marginRight: '24dp'}} src='/logo_google_g_icon.svg'></img> */}
      {text ?? 'Continue with google'}
    </button>
  ) : (
    <></>
  );
};
