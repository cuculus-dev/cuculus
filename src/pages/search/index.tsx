import ComingSoon from '@/pages/_components/main/ComingSoon';
import PrimaryColumn from '@/pages/_components/main/PrimaryColumn';
import MenuLayout from '@/pages/_components/menu/layout';
import { GetStaticProps, NextPageWithLayout, PageProps } from 'next';

export const getStaticProps = (() => {
  return {
    props: {
      metadata: {
        title: '検索',
      },
    },
  };
}) satisfies GetStaticProps<PageProps>;

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
