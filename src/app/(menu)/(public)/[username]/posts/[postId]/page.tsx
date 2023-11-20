import ComingSoon from '@/app/(menu)/_components/main/ComingSoon';

export default function page({}: {
  params: { userName: string; postId: string };
}) {
  return (
    <main style={{ height: '100vh' }}>
      <ComingSoon />
    </main>
  );
}
