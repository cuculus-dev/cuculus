import ComingSoon from '@/_app/(menu)/_components/main/ComingSoon';
import { GetStaticProps, NextPageWithLayout, PageProps } from 'next';
import PrimaryColumn from '@/_app/(menu)/_components/main/PrimaryColumn';
import MenuLayout from '@/_app/(menu)/layout';

export const getStaticProps = (() => {
  return {
    props: {
      metadata: {
        title: '通知',
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
