'use client';

import { Avatar, CardActionArea, styled, Typography } from '@mui/material';
import Link from 'next/link';
import FavoriteButton from '@/components/common/atoms/FavoriteButton';
import RePostButton from '@/components/common/atoms/RePostButton';
import ReplyButton from '@/components/common/atoms/ReplyButton';
import ShareButton from '@/components/common/atoms/ShareButton';
import { useRouter } from 'next/navigation';

const Article = styled('article')`
  border-bottom: 1px solid rgb(239, 243, 244);
  max-width: 600px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: rgba(0, 0, 0, 0.87);
`;

const Original = styled('div')`
  padding: 12px 0;
  display: flex;
  gap: 10px;
`;

const Content = styled('div')`
  flex: 1;
`;

const Header = styled('div')`
  display: flex;
  margin-bottom: 5px;
  gap: 4px;
`;

const DisplayName = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  displayName: string;
  userName: string;
  profileImageUrl: string;
  text: string;
  postId: number;
  postedAt: Date;
  replyCount: number;
  favoriteCount: number;
  repostCount: number;
};

export default function Post({
  displayName,
  userName,
  text,
  postId,
  replyCount,
  favoriteCount,
  repostCount,
}: Props) {
  const router = useRouter();

  return (
    <Article>
      <CardActionArea
        component={'div'}
        onFocus={() => void router.prefetch(`/posts/${postId}`)}
        onMouseEnter={() => void router.prefetch(`/posts/${postId}`)}
        onClick={() => void router.push(`/posts/${postId}`)}
        disableRipple
      >
        <div style={{ padding: '0 16px' }}>
          {/*<div>〇〇さんがリポストしました。</div>*/}
          <Original>
            <Avatar sx={{ backgroundColor: '' }}>TODO</Avatar>
            <Content>
              <Header>
                <DisplayName
                  href={`/${userName}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  {displayName}
                </DisplayName>
                <Typography component="span" color="#8899a6">
                  @{userName}
                </Typography>
                <Typography component="span" color="#8899a6">
                  ·
                </Typography>
                <Typography component="span" color="#8899a6">
                  1分前
                </Typography>
              </Header>
              <Typography component="div" whiteSpace="pre-wrap">
                {text}
              </Typography>
              <Footer>
                <ReplyButton count={replyCount} />
                <RePostButton count={repostCount} />
                <FavoriteButton count={favoriteCount} />
                <ShareButton />
              </Footer>
            </Content>
          </Original>
        </div>
      </CardActionArea>
    </Article>
  );
}
