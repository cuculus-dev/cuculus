'use client';
import FollowButton from '@/app/(menu)/(public)/[username]/_components/elements/FollowButton';
import UserIcon from '@/app/(menu)/(public)/[username]/_components/elements/UserIcon';
import { UserWithFollows } from '@cuculus/cuculus-api';
import { Box, Typography, styled } from '@mui/material';

const Flex = styled(Box)`
  display: flex;
  flex-wrap: nowrap;
`;

const VFlex = styled(Flex)`
  flex-direction: column;
`;

const HFlex = styled(Flex)`
  flex-direction: row;
`;

const HFlexS = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`;

const DisplayName = styled(Typography)`
  word-wrap: break-word;
  font-weight: bold;
  font-size: 20px;
`;

const UserName = styled(Typography)`
  color: #8899a6;
  font-size: 15px;
`;

const Avater = styled(UserIcon)`
  aspect-ratio: 1;
  height: 60px;
  width: 60px;
  margin: auto 10px;
`;

const Bio = styled(Typography)`
  white-space: pre-wrap;
  margin-bottom: 12px;
`;

type FFProfileCardProps = {
  displayName: string;
  userName: string;
  profileAvatarImageUrl: string;
  bio: string;
  authId: number | undefined;
} & UserWithFollows;

export default function FFProfileCard({
  displayname,
  username,
  profileImageUrl,
  bio,
  authId,
  id,
}: FFProfileCardProps) {
  const isMe = id === authId;
  return (
    <div>
      <HFlex>
        <Avater src={profileImageUrl} alt={'プロフィール画像'} />
        <VFlex style={{ margin: '12px 0' }}>
          <HFlexS>
            <VFlex>
              <DisplayName>{displayname}ユーザー表示名</DisplayName>
              <UserName>@{username}usernoid</UserName>
            </VFlex>
            {/* {authId && !isMe && <FollowButton userId={id} />} */}
            <FollowButton userId={1} />
          </HFlexS>
          <Bio>
            {bio}
            1234567890aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaあああああああああああああああああああああああああああああ
          </Bio>
        </VFlex>
      </HFlex>
    </div>
  );
}
