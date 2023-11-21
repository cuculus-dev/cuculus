import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import { Metadata } from 'next';
import HomeTimeline from '@/app/(menu)/(private)/home/_components/HomeTimeline';

export function generateMetadata(): Metadata {
  const title = `ホーム | Cuculus`;
  return {
    title,
    openGraph: {
      title,
    },
  };
}

export default function page() {
  return (
    <main>
      <PrimaryColumn columnName={'ホーム'}>
        <HomeTimeline />
      </PrimaryColumn>
    </main>
  );
}
