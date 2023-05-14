import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/scss/bootstrap.scss';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
