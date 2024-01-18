import ComingSoon from '@/pages/_components/main/ComingSoon';
import PrimaryColumn from '@/pages/_components/main/PrimaryColumn';
import { NextPageWithLayout } from 'next';
import MenuLayout from '@/pages/_components/menu/layout';

const Page: NextPageWithLayout = () => {
  return (
    <PrimaryColumn hideHeader={true}>
      <ComingSoon />
    </PrimaryColumn>
  );
};

Page.getLayout = (children) => <MenuLayout>{children}</MenuLayout>;

export default Page;
