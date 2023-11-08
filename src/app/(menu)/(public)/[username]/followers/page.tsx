import ComingSoon from '@/components/layouts/ComingSoon';

export default function page({}: { params: { userName: string } }) {
  return (
    <main style={{ height: '100vh' }}>
      <ComingSoon />
    </main>
  );
}
