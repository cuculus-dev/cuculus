import NotFound from '@/app/_components/NotFound';

// export const metadata: Metadata = {
//   title: 'ページが見つかりません',
// };

const Page = () => {
  return (
    <main style={{ height: '100vh' }}>
      <NotFound />
    </main>
  );
};

export default Page;
