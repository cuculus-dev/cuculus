import NotFound from '@/app/_components/NotFound';
import { Metadata } from 'next';
export function generateMetadata(): Metadata {
  const title = `ページが見つかりません | Cuculus`;
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
      <NotFound />
    </main>
  );
}
