export default function Profile({ params }: { params: { userName: string } }) {
  return <main>UserName: {params.userName}</main>;
}
