'use client';

import { CardActionArea, styled, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import FavoriteButton from '@/app/(menu)/_components/timeline/elements/FavoriteButton';
import RepostButton from '@/app/(menu)/_components/timeline/elements/RepostButton';
import ReplyButton from '@/app/(menu)/_components/timeline/elements/ReplyButton';
import ShareButton from '@/app/(menu)/_components/timeline/elements/ShareButton';
import { useRouter } from 'next/navigation';
import MomentAgo from '@/app/(menu)/_components/timeline/elements/MomentAgo';
import { format } from 'date-fns';
import AvatarIcon from '@/app/(menu)/_components/timeline/elements/AvatarIcon';

const Article = styled('article')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: rgba(0, 0, 0, 0.87);
`;

const Original = styled('div')`
  padding: 12px 0 6px 0;
  display: flex;
  gap: 10px;
`;

const Content = styled('div')`
  flex: 1;
  overflow: hidden;
`;

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 4px;
`;

const ProfileLink = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  margin-right: 10px;
  text-decoration: none;
  outline-offset: 0;
  outline: none;

  &:focus > :first-child,
  &:hover > :first-child {
    text-decoration: underline;
  }
`;

const DisplayName = styled('span')`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: bold;
  font-size: 1rem;
`;

const Footer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const MomentLinks = styled(Link)`
  color: #8899a6;
  text-decoration: none;
  flex-shrink: 0;
  outline-offset: 0;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  displayName: string;
  userName: string;
  profileImageUrl: string;
  text: string;
  postId: string;
  postedAt: Date;
  replyCount: number;
  favorited: boolean;
  favoriteCount: number;
  reposted: boolean;
  repostCount: number;
};

export default function Post({
  displayName,
  userName,
  profileImageUrl,
  text,
  postId,
  postedAt,
  replyCount,
  favorited,
  favoriteCount,
  reposted,
  repostCount,
}: Props) {
  const router = useRouter();
  const postUrl = `/${userName}/posts/${postId}`;

  return (
    <Article>
      <CardActionArea
        sx={{ userSelect: 'text' }}
        component={'div'}
        onFocus={() => void router.prefetch(postUrl)}
        onMouseEnter={() => void router.prefetch(postUrl)}
        onClick={() => {
          const selection = window.getSelection();
          if (!(selection && selection.toString())) {
            void router.push(postUrl);
          }
        }}
        disableRipple
      >
        <div style={{ padding: '0 16px' }}>
          {/*<div>〇〇さんがリポストしました。</div>*/}
          <Original>
            <AvatarIcon src={profileImageUrl} href={`/${userName}`} />
            <Content>
              <Header>
                <ProfileLink
                  href={`/${userName}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <DisplayName>{displayName}</DisplayName>
                  <span style={{ color: '#8899a6', marginLeft: '4px' }}>
                    @{userName}
                  </span>
                </ProfileLink>
                <Tooltip title={format(postedAt, 'yyyy/MM/dd HH:mm:ss')}>
                  <MomentLinks
                    aria-label="投稿へ"
                    href={postUrl}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <MomentAgo postedAt={postedAt} />
                  </MomentLinks>
                </Tooltip>
              </Header>
              <Typography component="div" whiteSpace="pre-wrap">
                {text}
              </Typography>
              <Footer>
                <ReplyButton count={replyCount} />
                <RepostButton
                  postId={postId}
                  reposted={reposted}
                  repostCount={repostCount}
                />
                <FavoriteButton
                  postId={postId}
                  favorited={favorited}
                  favoriteCount={favoriteCount}
                />
                <ShareButton />
              </Footer>
            </Content>
          </Original>
        </div>
      </CardActionArea>
    </Article>
  );
}
