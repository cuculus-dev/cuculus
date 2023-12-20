import NotFound from '@/app/_components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ページが見つかりません',
};

export default function page() {
  return (
    <main style={{ height: '100vh' }}>
      <NotFound />
    </main>
  );
}
