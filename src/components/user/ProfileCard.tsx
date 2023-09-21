'use client';

import {
  FollowButton,
  FollowStatus,
} from '@/components/user/atoms/FollowButton';
import { MoreHoriz } from '@mui/icons-material';
import { Avatar, Box, Card, CardMedia, Typography } from '@mui/material';
import { IconButton } from '@/components/common/atoms/IconButton';

import { usePathname, useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';

interface Props {
  // TODO stringだけ受けるか、elementも受けるか検討(リンクどうするかとか)
  bio: string | ReactElement;
  displayName: string;
  followStatus: (typeof FollowStatus)[keyof typeof FollowStatus];
  followedCount: number;
  followsCount: number;
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
  profileAvatarImageUrl,
  profileHeaderImageUrl,
  userName,
}: Props) {
  const [getShowFollowButton, setShowFollowButton] = useState(true);
  const [getFollowStatus, setFollowStatus] = useState(followStatus ?? NaN);

  const router = useRouter();
  const followingUrl = `${usePathname()}/following`;
  const followersUrl = `${usePathname()}/followers`;

  return (
    <>
      {/* TODO テスト用コード削除 */}
      <div style={{ display: 'block' }}>
        <div>
          <label style={{ userSelect: 'none' }}>
            <input
              type="checkbox"
              defaultChecked={getShowFollowButton}
              onChange={() => setShowFollowButton(!getShowFollowButton)}
            />
            フォローボタン表示
          </label>
        </div>
        <div>
          <label style={{ userSelect: 'none' }}>
            フォロー状態:
            <select
              defaultValue={getFollowStatus}
              onChange={(e) => setFollowStatus(Number(e.target.value))}
            >
              <option value={0}>未フォロー</option>
              <option value={1}>フォロー中</option>
              <option value={2}>承認待ち</option>
              <option value={3}>ブロック</option>
            </select>
          </label>
        </div>
      </div>

      {/* TODO Boxまみれをどうにかする */}
      <Card
        variant="outlined"
        sx={{
          userSelect: 'none',
        }}
      >
        {/* ヘッダー画像 */}
        <CardMedia image={profileHeaderImageUrl} sx={{ height: 250 }} />

        <Box p={2} display={'flex'} flexWrap={'nowrap'} gap={4}>
          {/* アイコン */}
          <Avatar
            src={profileAvatarImageUrl}
            sx={{
              flexGrow: '64px',
              width: 80,
              height: 80,
              boxSizing: 'content-box',
              // ↓CO解除でX(Twitter)みたいにヘッダに重ねる
              // mt: -7,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }}
          />

          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={3}
            flex={1}
            pt={2}
          >
            <Box display={'flex'} flexDirection={'row'} gap={1}>
              {/* 名前・ID */}
              {/* FIXME デザイン調整 */}
              <Box>
                <Typography>{displayName}</Typography>
                <Typography>@{userName}</Typography>
              </Box>

              <Box flexGrow={1}>
                <Box
                  display={'flex'}
                  gap={2}
                  flexDirection={'row'}
                  justifyContent={'end'}
                >
                  {/* フォローボタン */}
                  {getShowFollowButton && (
                    <FollowButton
                      followStatus={getFollowStatus}
                      userName={userName}
                    />
                  )}
                  {/* ミートボールボタン */}
                  {/* FIXME サイズ調整 */}
                  <IconButton color="primary" variant="outlined">
                    <MoreHoriz />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* bio */}
            <Box>
              <Typography whiteSpace={'pre-wrap'}>{bio}</Typography>
            </Box>

            <Box display={'inline-flex'} flexDirection={'row'} gap={2}>
              {/* フォロー数 */}
              <Box
                onMouseEnter={() => router.prefetch(followingUrl)}
                onFocus={() => router.prefetch(followingUrl)}
                onClick={() => router.push(followingUrl)}
              >
                <Typography component={'span'} display={'block'}>
                  フォロー数
                </Typography>
                <Typography
                  component={'span'}
                  display={'block'}
                  textAlign={'right'}
                >
                  {followsCount}
                </Typography>
              </Box>

              {/* フォロワー数 */}
              <Box
                onMouseEnter={() => router.prefetch(followersUrl)}
                onFocus={() => router.prefetch(followersUrl)}
                onClick={() => router.push(followersUrl)}
              >
                <Typography component={'span'} display={'block'}>
                  フォロワー数
                </Typography>
                <Typography
                  component={'span'}
                  display={'block'}
                  textAlign={'right'}
                >
                  {followedCount}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}
