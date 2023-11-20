import ComingSoon from '@/app/(menu)/_components/main/ComingSoon';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  const title = `検索 | Cuculus`;
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
      <ComingSoon />
    </main>
  );
}
