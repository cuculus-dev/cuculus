import Logout from '@/app/(plain)/(private)/logout/_components/Logout';
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
