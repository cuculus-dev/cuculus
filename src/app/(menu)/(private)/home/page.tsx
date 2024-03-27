import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import { Metadata } from 'next';
import HomeTimeline from '@/app/(menu)/(private)/home/_components/HomeTimeline';
import TopicMenu from '@/app/(menu)/_components/menu/TopicMenu';

export const metadata: Metadata = {
  title: 'ホーム',
};

export default function page() {
  return (
    <>
      <PrimaryColumn columnName={'ホーム'}>
        <HomeTimeline />
      </PrimaryColumn>
      <TopicMenu />
    </>
  );
}
