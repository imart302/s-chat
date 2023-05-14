import { GoogleSignInContext } from '@/context/GoogleSignIn'
import { GoogleCredentialResponse } from '@/interfaces';
import React, { useContext, useEffect, useRef } from 'react'

export interface GoogleSignInButtonProps {
  onSingIn?: (credentials: GoogleCredentialResponse) => void;
  calcWidth: number | null;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSingIn,
  calcWidth
}) => {

  const buttonRef = useRef<HTMLDivElement>(null);
  const googleContext = useContext(GoogleSignInContext);
  
  
  useEffect(() => { 
    if(!googleContext.scriptLoaded) return;
    if(!buttonRef) return;
    if(!calcWidth) return;

    window.google?.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENTID,
      callback(credentialResponse: GoogleCredentialResponse) {
          onSingIn?.(credentialResponse);
      },
    });

    window.google?.accounts.id.renderButton(buttonRef.current!, {
      type: 'standard',
      shape: 'rectangular',
      size: 'medium',
      theme: 'outline',
      locale: "en_US",
      width: calcWidth.toString(),
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleContext.scriptLoaded, buttonRef]);

  return (
    <div ref={buttonRef} style={{height: 45}}></div>
  )
}
