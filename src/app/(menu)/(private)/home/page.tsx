import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import { Metadata } from 'next';
import HomeTimeline from '@/app/(menu)/(private)/home/_components/HomeTimeline';

export const metadata: Metadata = {
  title: 'ホーム',
};

export default function page() {
  return (
    <PrimaryColumn columnName={'ホーム'}>
      <HomeTimeline />
    </PrimaryColumn>
  );
}
