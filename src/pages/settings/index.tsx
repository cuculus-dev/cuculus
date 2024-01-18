import ComingSoon from '@/pages/_components/main/ComingSoon';
import { GetStaticProps, NextPageWithLayout, PageProps } from 'next';
import PrimaryColumn from '@/pages/_components/main/PrimaryColumn';
import MenuLayout from '@/pages/_components/menu/MenuLayout';

export const getStaticProps = (() => {
  return {
    props: {
      metadata: {
        title: '設定',
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
