import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import '@/styles/scss/global.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
