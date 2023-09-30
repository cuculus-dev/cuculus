'use client';

import { Mail, MoreHoriz } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Typography,
  styled,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { ReactElement, useRef, useState } from 'react';
import {
  FollowButton,
  FollowStatus,
} from '@/components/user/atoms/FollowButton';
import { IconButton } from '@/components/common/atoms/IconButton';
import MoreMenu from '@/components/user/atoms/MoreMenu';

const UnselectableCard = styled(Card)`
  user-select: none;
`;

const HeaderImage = styled(CardMedia)`
  height: 250px;
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
  width: 80px;
  height: 80px;

  // ↓CO解除でTwitterみたいな感じの表示
  /*
  margin-top: -56px;
  border-color: 'white';
  border-style: 'solid';
  */
`;

const DisplayName = styled(Typography)`
  font-weight: bold;
  font-size: 1.3rem;
`;

const UserName = styled(Typography)`
  font-weight: bold;
  font-size: 0.9rem;
`;

const Bio = styled(Typography)`
  white-space: pre-wrap;
`;

// TODO 表示項目の内容を引数で受け取るか、userIdだけ受け取ってこっちでAPI叩いて表示するか決める
interface ProfileCardProps {
  // TODO stringだけ受けるか、elementも受けるか検討(リンクどうするかとか)
  bio: string | ReactElement;
  displayName: string;
  followStatus: (typeof FollowStatus)[keyof typeof FollowStatus];
  followedCount: number;
  followsCount: number;
  userId: number;
  profileAvatarImageUrl: string;
  profileHeaderImageUrl: string;
  userName: string;
}

export default function ProfileCard({
  bio,
  displayName,
  followStatus,
  followedCount,
  followsCount,
  userId,
  profileAvatarImageUrl,
  profileHeaderImageUrl,
  userName,
}: ProfileCardProps) {
  // FIXME setShowFollowButton(globalState.me.id !== userId)
  const [getIsSelf, setShowFollowButton] = useState(false);
  const [getShowMoreMenu, setShowMoreMenu] = useState(false);

  const router = useRouter();

  const moreMenuRef = useRef(null);

  const UserCount = ({
    label,
    linkUrl,
    num,
  }: {
    label: string;
    linkUrl: string;
    num: number;
  }) => (
    <Box
      onMouseEnter={() => router.prefetch(linkUrl)}
      onFocus={() => router.prefetch(linkUrl)}
      onClick={() => router.push(linkUrl)}
    >
      <Typography component={'div'} fontWeight={'bold'}>
        {label}
      </Typography>
      <Typography component={'div'} textAlign={'right'}>
        {num.toLocaleString()}
      </Typography>
    </Box>
  );

  const Follows = ({ num }: { num: number }) =>
    UserCount({
      label: 'フォロー数',
      linkUrl: `${usePathname()}/following`,
      num,
    });

  const Followers = ({ num }: { num: number }) =>
    UserCount({
      label: 'フォロワー数',
      linkUrl: `${usePathname()}/followers`,
      num,
    });

  return (
    <>
      {/* FIXME テスト用コード削除 */}
      <div className="test-code" style={{ display: 'block' }}>
        <div>
          <label style={{ userSelect: 'none' }}>
            <input
              type="checkbox"
              defaultChecked={getIsSelf}
              onChange={() => setShowFollowButton(!getIsSelf)}
            />
            フォローボタン・DMボタン表示
          </label>
        </div>
      </div>

      <UnselectableCard variant="outlined">
        <HeaderImage image={profileHeaderImageUrl} />

        <HFlex gap={4} p={2}>
          {/* アイコン */}
          <UserIcon src={profileAvatarImageUrl} />

          <FillFlex>
            <VFlex gap={2} pt={2}>
              <HFlex gap={1}>
                {/* 名前・ID */}
                {/* FIXME デザイン調整 */}
                <VFlex>
                  <DisplayName>{displayName}</DisplayName>
                  <UserName>@{userName}</UserName>
                </VFlex>

                <FillFlex>
                  <HFlex gap={2} justifyContent={'end'}>
                    {/* フォローボタン */}
                    {!getIsSelf && (
                      <FollowButton
                        followStatus={followStatus}
                        userId={userId}
                      />
                    )}

                    {/* DMボタン */}
                    {!getIsSelf && (
                      <IconButton
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          /* FIXME */
                        }}
                      >
                        <Mail />
                      </IconButton>
                    )}

                    {/* ミートボールボタン */}
                    <IconButton
                      ref={moreMenuRef}
                      color="primary"
                      variant="outlined"
                      onClick={() => setShowMoreMenu(!getShowMoreMenu)}
                    >
                      <MoreHoriz />

                      <MoreMenu
                        anchorEl={moreMenuRef.current}
                        open={getShowMoreMenu}
                      />
                    </IconButton>
                  </HFlex>
                </FillFlex>
              </HFlex>

              <Bio>{bio}</Bio>

              <HFlex gap={2}>
                <Follows num={followsCount} />
                <Followers num={followedCount} />
              </HFlex>
            </VFlex>
          </FillFlex>
        </HFlex>
      </UnselectableCard>
    </>
  );
}
