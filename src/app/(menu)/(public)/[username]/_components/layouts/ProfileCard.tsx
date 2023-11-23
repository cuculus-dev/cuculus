'use client';

import { Avatar, Box, Typography, styled } from '@mui/material';
import {
  FollowButton,
  FollowStatus,
} from '@/app/(menu)/(public)/[username]/_components/elements/FollowButton';
import UserCount from '@/app/(menu)/(public)/[username]/_components/elements/UserCount';
import { usePathname } from 'next/navigation';

const UnselectableCard = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: rgba(0, 0, 0, 0.87);
`;

const HeaderImage = styled('div')<{
  image?: string;
}>`
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  aspect-ratio: 3 / 1;
  background-color: ${({ theme }) => theme.palette.primary.light};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
`;

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

const FillFlex = styled(Box)`
  flex-grow: 1;
`;

const UserIcon = styled(Avatar)`
  width: 120px;
  height: 120px;

  margin-top: -80px;
  border-color: ${({ theme }) => theme.palette.background.paper};
  border-style: solid;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 80px;
    height: 80px;
    margin-top: -48px;
  }
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

const Bio = styled(Typography)`
  white-space: pre-wrap;
  margin-bottom: 12px;
`;

interface ProfileCardProps {
  id: number;
  name: string;
  username: string;
  createdAt: Date;
  description: string;
  profileImageUrl: string;
  protected: boolean;
  url: string;
  verified: boolean;
  followersCount?: number;
  followingCount?: number;
  authId: number | undefined;
  authorizing: boolean;
}

export default function ProfileCard({
  id,
  name,
  username,
  description,
  profileImageUrl,
  followersCount,
  followingCount,
  authId,
  authorizing,
}: ProfileCardProps) {
  const path = usePathname();

  const getFollowStatus = (): FollowStatus => {
    if (id === authId) {
      return 'EditProfile';
    }
    return 'NotFollowing';
  };

  return (
    <>
      <UnselectableCard>
        <HeaderImage image={''} />

        <div style={{ padding: '12px 16px 16px' }}>
          <HFlex>
            {/* アイコン */}
            <UserIcon src={profileImageUrl} alt={'プロフィール画像'} />

            <FillFlex>
              <VFlex gap={2}>
                <HFlex gap={1}>
                  <FillFlex>
                    <HFlex gap={1} justifyContent={'end'}>
                      {/* ミートボールボタン */}
                      {/*<IconButton*/}
                      {/*  ref={moreMenuRef}*/}
                      {/*  color="primary"*/}
                      {/*  variant="outlined"*/}
                      {/*  aria-label="もっと見る"*/}
                      {/*  onClick={() => setShowMoreMenu(!getShowMoreMenu)}*/}
                      {/*>*/}
                      {/*  <MoreHoriz />*/}
                      {/*  <MoreMenu*/}
                      {/*    anchorEl={moreMenuRef.current}*/}
                      {/*    open={getShowMoreMenu}*/}
                      {/*  />*/}
                      {/*</IconButton>*/}
                      {/* DMボタン */}
                      {/*{!isMe && (*/}
                      {/*  <IconButton*/}
                      {/*    color="primary"*/}
                      {/*    variant="outlined"*/}
                      {/*    aria-label="メッセージ"*/}
                      {/*    onClick={() => {*/}
                      {/*     */}
                      {/*    }}*/}
                      {/*  >*/}
                      {/*    <Mail />*/}
                      {/*  </IconButton>*/}
                      {/*)}*/}
                      {/* フォローボタン */}
                      {!authorizing && (
                        <FollowButton
                          followStatus={getFollowStatus()}
                          userId={id}
                        />
                      )}
                    </HFlex>
                  </FillFlex>
                </HFlex>
              </VFlex>
            </FillFlex>
          </HFlex>

          <VFlex style={{ margin: '12px 0' }}>
            <DisplayName>{name}</DisplayName>
            <UserName>@{username}</UserName>
          </VFlex>
          <Bio>{description}</Bio>

          <HFlex gap={2}>
            {followingCount != undefined && (
              <UserCount
                label={'フォロー'}
                href={path ? `${path}/following` : ''}
                num={followingCount}
                aria-label="フォロー一覧"
              />
            )}
            {followersCount != undefined && (
              <UserCount
                label={'フォロワー'}
                href={path ? `${path}/followers` : ''}
                num={followersCount}
                aria-label="フォロワー一覧"
              />
            )}
          </HFlex>
        </div>
      </UnselectableCard>
    </>
  );
}
