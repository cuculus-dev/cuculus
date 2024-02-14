'use client';

import { CardActionArea, styled, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import FavoriteButton from '@/app/(menu)/_components/timeline/elements/FavoriteButton';
import RepostButton from '@/app/(menu)/_components/timeline/elements/RepostButton';
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

type UserProps = {
  name: string;
  username: string;
  profileImageUrl: string;
};

type PostProps = {
  id: string;
  originalPostId?: string;
  replyToPostId?: string;
  author: UserProps;
  text?: string;
  postedAt: Date;
};

type Props = {
  favorited: boolean;
  favoriteCount: number;
  reposted: boolean;
  repostCount: number;
  originalPost?: PostProps;
} & PostProps;

export default function Post({
  text,
  id,
  postedAt,
  favorited,
  favoriteCount,
  reposted,
  repostCount,
  author,
}: Props) {
  const router = useRouter();
  const postUrl = `/${author.username}/posts/${id}`;

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
            <AvatarIcon
              src={author.profileImageUrl}
              href={`/${author.username}`}
            />
            <Content>
              <Header>
                <ProfileLink
                  href={`/${author.username}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <DisplayName>{author.name}</DisplayName>
                  <span style={{ color: '#8899a6', marginLeft: '4px' }}>
                    @{author.username}
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
              <Typography
                component="div"
                whiteSpace="pre-wrap"
                sx={{ wordWrap: 'break-word' }}
              >
                {text}
              </Typography>
              <Footer>
                <div>{/*リプライボタン*/}</div>
                <RepostButton
                  postId={id}
                  reposted={reposted}
                  repostCount={repostCount}
                />
                <FavoriteButton
                  postId={id}
                  favorited={favorited}
                  favoriteCount={favoriteCount}
                />
                <div>{/*シェアボタン*/}</div>
              </Footer>
            </Content>
          </Original>
        </div>
      </CardActionArea>
    </Article>
  );
}
