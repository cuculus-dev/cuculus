import Logout from '@/pages/logout/_components/Logout';
import { NextPageWithLayout } from 'next';

const Page: NextPageWithLayout = () => {
  return (
    <main>
      <Logout />
    </main>
  );
};

Page.accessLevel = 'private';

export default Page;
