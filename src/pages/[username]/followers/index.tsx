import ComingSoon from '@/app/(menu)/_components/main/ComingSoon';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import MenuLayout from '@/app/(menu)/layout';
import { NextPageWithLayout } from 'next';

const Page: NextPageWithLayout = () => {
  return (
    <PrimaryColumn hideHeader={true}>
      <ComingSoon />
    </PrimaryColumn>
  );
};

Page.getLayout = (children) => <MenuLayout>{children}</MenuLayout>;

export default Page;
