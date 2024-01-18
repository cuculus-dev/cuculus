import ComingSoon from '@/pages/_components/main/ComingSoon';
import PrimaryColumn from '@/pages/_components/main/PrimaryColumn';
import MenuLayout from '@/pages/_components/menu/MenuLayout';
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
