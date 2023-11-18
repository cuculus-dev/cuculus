import ComingSoon from '@/components/layouts/ComingSoon';
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
    <main style={{ height: '100vh' }}>
      <ComingSoon />
    </main>
  );
}
