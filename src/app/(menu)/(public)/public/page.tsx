import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import { Metadata } from 'next';
import PublicTimeline from '@/app/(menu)/(public)/public/_components/PublicTimeline';
import TopicMenu from '@/app/(menu)/_components/menu/TopicMenu';

export const metadata: Metadata = {
  title: 'グローバルタイムライン',
};

export default function page() {
  return (
    <>
      <PrimaryColumn columnName={'グローバル'}>
        <PublicTimeline />
      </PrimaryColumn>
      <TopicMenu />
    </>
  );
}
