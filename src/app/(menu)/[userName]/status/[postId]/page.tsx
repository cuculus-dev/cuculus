export default function page({
  params,
}: {
  params: { userName: string; postId: string };
}) {
  return (
    <main style={{ height: '2000px' }}>
      UserName: {params.userName} & postId: {params.postId}
    </main>
  );
}
