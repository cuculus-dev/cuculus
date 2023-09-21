import ProfileCard from '@/components/user/ProfileCard';

export default function Profile({ params }: { params: { userName: string } }) {
  return (
    <main style={{ height: '2000px' }}>
      <ProfileCard
        bio={'bio\nfoobarbaz\n\n    hogefuga'}
        displayName={'testDispName'}
        followStatus={0}
        profileAvatarImageUrl="/mock/profileAvatarImage.png"
        profileHeaderImageUrl="/mock/profileHeaderImage.png"
        userName={params.userName}
        followsCount={Math.floor(Math.random() * 100)}
        followedCount={Math.floor(Math.random() * 100_000 + 10_000)}
      />
    </main>
  );
}
