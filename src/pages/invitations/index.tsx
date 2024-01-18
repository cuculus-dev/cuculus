import Invitations from '@/pages/invitations/_components/Invitations';
import PrimaryColumn from '@/_app/(menu)/_components/main/PrimaryColumn';
import { GetStaticProps, NextPageWithLayout, PageProps } from 'next';
import MenuLayout from '@/_app/(menu)/layout';

export const getStaticProps = (() => {
  return {
    props: {
      metadata: {
        title: '招待コード',
      },
    },
  };
}) satisfies GetStaticProps<PageProps>;

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
