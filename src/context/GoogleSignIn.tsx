import { googleGsiClient } from '@/utils';
import Script from 'next/script';
import React, { createContext, useState } from 'react';

export interface IGoogleSignInContext {
  scriptLoaded: boolean;
  scriptError?: string;
}

export const GoogleSignInContext = createContext<IGoogleSignInContext>({
  scriptLoaded: false,
});

export const GoogleSignInProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [state, setState] = useState<IGoogleSignInContext>({
    scriptLoaded: false,
  });

  const handleScriptLoaded = () => {

  };

  const handleScriptError = (e: any) => {
    
    setState((actual) => ({
      ...actual,
      scriptLoaded: false,
      scriptError: 'Failed to load script',
    }));
  };

  const handleOnReady = () => {
    setState((actual) => ({
      ...actual,
      scriptLoaded: true,
    }));
  };

  return (
    <>
      <GoogleSignInContext.Provider value={state}>
        <Script
          id="google-gsi-script"
          src={googleGsiClient}
          onLoad={handleScriptLoaded}
          onError={handleScriptError}
          onReady={handleOnReady}
          async
          defer
        />
        {children}
      </GoogleSignInContext.Provider>
    </>
  );
};
