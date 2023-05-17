
import type { NextPageWithLayout } from './_app';
import { ChatLayout } from '@/layouts';


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