import ProfileCard from '@/components/user/ProfileCard';
import PrimaryColumn from '@/components/PrimaryColumn';

export default function page({ params }: { params: { userName: string } }) {
  return (
    <main>
      {/* FIXME mock値 */}
      <PrimaryColumn columnName={'testDispName'}>
        <ProfileCard
          bio={'bio\nfoobarbaz\n\n    hogefuga'}
          displayName={'testDispName'}
          followStatus={0}
          profileAvatarImageUrl="/mock/profileAvatarImage.png"
          profileHeaderImageUrl="/mock/profileHeaderImage.png"
          userName={params.userName}
          followsCount={123456}
          followedCount={123456}
          userId={0}
        />
        <div style={{ height: '2000px' }}>
          ここにユーザータイムラインが表示される
        </div>
      </PrimaryColumn>
    </main>
  );
}
