import ProfileCard from '@/components/user/ProfileCard';

export default function page({ params }: { params: { userName: string } }) {
  return (
    <main style={{ height: '2000px' }}>
      {/* FIXME mock値 */}
      <ProfileCard
        bio={'bio\nfoobarbaz\n\n    hogefuga'}
        displayName={'testDispName'}
        followStatus={0}
        profileAvatarImageUrl="/mock/profileAvatarImage.png"
        profileHeaderImageUrl="/mock/profileHeaderImage.png"
        userId={Math.random()}
        userName={params.userName}
        followsCount={Math.floor(Math.random() * 100)}
        followedCount={Math.floor(Math.random() * 100_000 + 10_000)}
        userId={0}
      />
    </main>
  );
}
