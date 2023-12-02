import ComingSoon from '@/app/(menu)/_components/main/ComingSoon';
import { Metadata } from 'next';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';

export function generateMetadata(): Metadata {
  const title = `通知 | Cuculus`;
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
      <PrimaryColumn hideHeader={true}>
        <ComingSoon />
      </PrimaryColumn>
    </main>
  );
}
