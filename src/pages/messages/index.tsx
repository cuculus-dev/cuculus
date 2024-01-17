import ComingSoon from '@/_app/(menu)/_components/main/ComingSoon';
import PrimaryColumn from '@/_app/(menu)/_components/main/PrimaryColumn';
import MenuLayout from '@/_app/(menu)/layout';
import { NextPageWithLayout } from 'next';

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
