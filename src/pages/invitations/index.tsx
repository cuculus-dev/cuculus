import Invitations from '@/app/(menu)/(private)/invitations/_components/Invitations';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import { NextPageWithLayout } from 'next';
import MenuLayout from '@/app/(menu)/layout';

const Page: NextPageWithLayout = () => {
  return (
    <PrimaryColumn hideHeader={true}>
      <Invitations />
    </PrimaryColumn>
  );
};

Page.getLayout = (children) => <MenuLayout>{children}</MenuLayout>;

Page.accessLevel = 'private';

export default Page;
