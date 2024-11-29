'use client';
import FollowButton from '@/app/(menu)/(public)/[username]/_components/elements/FollowButton';
import UserIcon from '@/app/(menu)/(public)/[username]/_components/elements/UserIcon';
import { Box, Typography, styled } from '@mui/material';

const UnselectableCard = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: rgba(0, 0, 0, 0.87);
`;

const Flex = styled(Box)`
  display: flex;
  flex-wrap: nowrap;
`;

const VFlex = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;

const HFlex = styled(Flex)`
  flex-direction: row;
`;

const HFlexS = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`;

const FillFlex = styled(Box)`
  flex-grow: 1;
`;

const DisplayName = styled(Typography)`
  word-wrap: break-word;
  font-weight: bold;
  font-size: 20px;
`;

const ButtonArea = styled(Box)`
  width: 100%;
  text-align: right;
`;

const UserName = styled(Typography)`
  color: #8899a6;
  font-size: 15px;
`;

const Avater = styled(UserIcon)`
  aspect-ratio: 1;
  height: 64px;
  width: 64px;
  margin: 0 10px auto;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    margin: 0 10px auto;
    height: 64px;
    width: 64px;
  }
`;

const Bio = styled(Typography)`
  white-space: pre-wrap;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

type Props = {
  id: number;
  name: string;
  username: string;
  profileImageUrl: string;
  bio: string;
};

export default function FFProfileCard({
  name,
  username,
  profileImageUrl,
  bio,
  id,
}: Props) {
  return (
    <UnselectableCard>
      <HFlex>
        <Avater src={profileImageUrl} alt={'プロフィール画像'} />
        <VFlex style={{ margin: '12px 0' }}>
          <HFlexS>
            <VFlex>
              <DisplayName>{name}</DisplayName>
              <UserName>@{username}</UserName>
            </VFlex>
            {/* フォローされてるか表示 */}
            {/* <FollowedDisplay/> */}
            <ButtonArea>
              <FollowButton userId={id} />
            </ButtonArea>
          </HFlexS>
          <FillFlex>
            <Bio>{bio}</Bio>
          </FillFlex>
        </VFlex>
      </HFlex>
    </UnselectableCard>
  );
}
