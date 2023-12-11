'use client';

import { Box, Typography, styled } from '@mui/material';
import { FollowButton } from '@/app/(menu)/(public)/[username]/_components/elements/FollowButton';
import UserCount from '@/app/(menu)/(public)/[username]/_components/elements/UserCount';
import { usePathname } from 'next/navigation';
import HeaderImage from '@/app/(menu)/(public)/[username]/_components/elements/HeaderImage';
import UserIcon from '@/app/(menu)/(public)/[username]/_components/elements/UserIcon';
import { UserWithFollows } from '@cuculus/cuculus-api';
import { EditProfileButton } from '@/app/(menu)/(public)/[username]/_components/layouts/EditProfileButton';

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
`;

const HFlex = styled(Flex)`
  flex-direction: row;
`;

const FillFlex = styled(Box)`
  flex-grow: 1;
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

type ProfileCardProps = {
  authId: number | undefined;
} & UserWithFollows;

export default function ProfileCard({
  id,
  name,
  username,
  bio,
  profileImageUrl,
  followersCount,
  followingCount,
  authId,
}: ProfileCardProps) {
  const path = usePathname();

  const isMe = id === authId;

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
                      {authId && !isMe && (
                        <FollowButton isFollowing={false} userId={id} />
                      )}
                      {authId && isMe && (
                        <EditProfileButton
                          src={profileImageUrl}
                          displayName={name}
                          bio={bio}
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
          <Bio>{bio}</Bio>

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
