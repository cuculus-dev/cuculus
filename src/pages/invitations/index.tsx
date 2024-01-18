import Invitations from '@/pages/invitations/_components/Invitations';
import PrimaryColumn from '@/pages/_components/main/PrimaryColumn';
import { GetStaticProps, NextPageWithLayout, PageProps } from 'next';
import MenuLayout from '@/pages/_components/menu/layout';

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
