import ComingSoon from '@/app/(menu)/_components/main/ComingSoon';
import { NextPageWithLayout } from 'next';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import MenuLayout from '@/app/(menu)/layout';

// export const metadata: Metadata = {
//   title: '通知',
// };

const Page: NextPageWithLayout = () => {
  return (
    <PrimaryColumn hideHeader={true}>
      <ComingSoon />
    </PrimaryColumn>
  );
};

Page.getLayout = (children) => <MenuLayout>{children}</MenuLayout>;

Page.accessLevel = 'private';

export default Page;
