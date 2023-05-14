
import { Inter } from 'next/font/google';
import type { NextPageWithLayout } from './_app';
import { ChatLayout } from '@/layouts';



const inter = Inter({ subsets: ['latin'] });

const Home: NextPageWithLayout = () => {
  return (
    <>
      <h1>CHAT</h1>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <ChatLayout>
      {page}
    </ChatLayout>
  );
}


export default Home;