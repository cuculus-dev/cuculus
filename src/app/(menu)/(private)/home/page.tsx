import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import Timeline from '@/app/(menu)/_components/timeline/Timeline';
import { Metadata } from 'next';

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
        <Timeline />
      </PrimaryColumn>
    </main>
  );
}
