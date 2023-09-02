export default function Profile({ params }: { params: { userName: string } }) {
  return <main style={{ height: '2000px' }}>UserName: {params.userName}</main>;
}
