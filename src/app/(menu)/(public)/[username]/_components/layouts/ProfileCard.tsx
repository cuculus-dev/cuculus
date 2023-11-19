'use client';

import { Mail, MoreHoriz } from '@mui/icons-material';
import { Avatar, Box, CardMedia, Typography, styled } from '@mui/material';
import { usePathname } from 'next/navigation';
import { ReactElement, useRef, useState } from 'react';
import {
  FollowButton,
  FollowStatus,
} from '@/app/(menu)/(public)/[username]/_components/elements/FollowButton';
import { IconButton } from '@/components/elements/IconButton';
import MoreMenu from '@/app/(menu)/(public)/[username]/_components/elements/MoreMenu';
import UserCount from '@/app/(menu)/(public)/[username]/_components/elements/UserCount';

const UnselectableCard = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: rgba(0, 0, 0, 0.87);
`;

const HeaderImage = styled(CardMedia)`
  aspect-ratio: 3 / 1;
  background-color: ${({ theme }) => theme.palette.primary.light};
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

// TODO 表示項目の内容を引数で受け取るか、userIdだけ受け取ってこっちでAPI叩いて表示するか決める
interface ProfileCardProps {
  // TODO stringだけ受けるか、elementも受けるか検討(リンクどうするかとか)
  bio: string | ReactElement;
  displayName: string;
  followStatus: (typeof FollowStatus)[keyof typeof FollowStatus];
  followersCount?: number;
  followingCount?: number;
  userId: number;
  profileAvatarImageUrl: string;
  profileHeaderImageUrl: string;
  userName: string;
}

export default function ProfileCard({
  bio,
  displayName,
  followStatus,
  followersCount,
  followingCount,
  userId,
  profileAvatarImageUrl,
  profileHeaderImageUrl,
  userName,
}: ProfileCardProps) {
  // FIXME setShowFollowButton(globalState.me.id !== userId)
  const [getIsSelf, setShowFollowButton] = useState(false);
  const [getShowMoreMenu, setShowMoreMenu] = useState(false);

  const moreMenuRef = useRef(null);

  const path = usePathname();

  return (
    <>
      <UnselectableCard>
        <HeaderImage image={profileHeaderImageUrl} />

        <div style={{ padding: '12px 16px 16px' }}>
          <HFlex>
            {/* アイコン */}
            <UserIcon src={profileAvatarImageUrl} alt={'プロフィール画像'} />

            <FillFlex>
              <VFlex gap={2}>
                <HFlex gap={1}>
                  <FillFlex>
                    <HFlex gap={1} justifyContent={'end'}>
                      {/* ミートボールボタン */}
                      <IconButton
                        ref={moreMenuRef}
                        color="primary"
                        variant="outlined"
                        aria-label="もっと見る"
                        onClick={() => setShowMoreMenu(!getShowMoreMenu)}
                      >
                        <MoreHoriz />

                        <MoreMenu
                          anchorEl={moreMenuRef.current}
                          open={getShowMoreMenu}
                        />
                      </IconButton>
                      {/* DMボタン */}
                      {!getIsSelf && (
                        <IconButton
                          color="primary"
                          variant="outlined"
                          aria-label="メッセージ"
                          onClick={() => {
                            /* FIXME */
                          }}
                        >
                          <Mail />
                        </IconButton>
                      )}
                      {/* フォローボタン */}
                      {!getIsSelf && (
                        <FollowButton
                          aria-label="フォローする"
                          followStatus={followStatus}
                          userId={userId}
                        />
                      )}
                    </HFlex>
                  </FillFlex>
                </HFlex>
              </VFlex>
            </FillFlex>
          </HFlex>

          <VFlex style={{ margin: '12px 0' }}>
            <DisplayName>{displayName}</DisplayName>
            <UserName>@{userName}</UserName>
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
