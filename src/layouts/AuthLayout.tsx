import { LoadingSpinner } from '@/components/utils/LoadingSpinner'
import { GoogleSignInProvider } from '@/context/GoogleSignIn'
import { PublicRouteGuard } from '@/routes/PublicRouteGuard'
import React from 'react'

export const AuthLayout: React.FC<{children: JSX.Element | JSX.Element[]}> = ({children}) => {
  return (
    <GoogleSignInProvider>
      <PublicRouteGuard redirect="/" loadingComponent={<LoadingSpinner />}>
        {children}
      </PublicRouteGuard>
    </GoogleSignInProvider>
  )
}
