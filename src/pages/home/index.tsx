import PrimaryColumn from '@/_app/(menu)/_components/main/PrimaryColumn';
import HomeTimeline from '@/pages/home/_components/HomeTimeline';
import { GetStaticProps, NextPageWithLayout, PageProps } from 'next';
import MenuLayout from '@/_app/(menu)/layout';

export const getStaticProps = (() => {
  return {
    props: {
      metadata: {
        title: 'ホーム',
      },
    },
  };
}) satisfies GetStaticProps<PageProps>;
const Page: NextPageWithLayout = () => {
  return (
    <PrimaryColumn columnName={'ホーム'}>
      <HomeTimeline />
    </PrimaryColumn>
  );
};

Page.getLayout = (children) => <MenuLayout>{children}</MenuLayout>;

Page.accessLevel = 'private';

export default Page;
