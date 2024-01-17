import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import HomeTimeline from '@/app/(menu)/(private)/home/_components/HomeTimeline';
import { NextPageWithLayout } from 'next';
import MenuLayout from '@/app/(menu)/layout';

// export const metadata: Metadata = {
//   title: 'ホーム',
// };

const Page: NextPageWithLayout = () => {
  return (
    <PrimaryColumn columnName={'ホーム'}>
      <HomeTimeline />
    </PrimaryColumn>
  );
};

Page.getLayout = (children) => <MenuLayout>{children}</MenuLayout>;

Page.accessLevel = 'private';

export default Page;
