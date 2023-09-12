'use client';

import {
  Avatar,
  CardActionArea,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import FavoriteButton from '@/components/common/atoms/FavoriteButton';
import RePostButton from '@/components/common/atoms/RePostButton';
import ReplyButton from '@/components/common/atoms/ReplyButton';
import ShareButton from '@/components/common/atoms/ShareButton';
import { useRouter } from 'next/navigation';
import MomentAgo from '@/components/timeline/atoms/MomentAgo';
import { format } from 'date-fns';

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
  favorited: boolean;
  favoriteCount: number;
  reposted: boolean;
  repostCount: number;
};

export default function Post({
  displayName,
  userName,
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
  const postUrl = `/${userName}/status/${postId}`;

  return (
    <Article>
      <CardActionArea
        component={'div'}
        onFocus={() => void router.prefetch(postUrl)}
        onMouseEnter={() => void router.prefetch(postUrl)}
        onClick={() => void router.push(postUrl)}
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
                <Tooltip title={format(postedAt, 'yyyy/MM/dd HH:mm:ss')}>
                  <Typography
                    aria-label="投稿へ"
                    component={Link}
                    color="#8899a6"
                    href={postUrl}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <MomentAgo postedAt={postedAt} />
                  </Typography>
                </Tooltip>
              </Header>
              <Typography component="div" whiteSpace="pre-wrap">
                {text}
              </Typography>
              <Footer>
                <ReplyButton count={replyCount} />
                <RePostButton count={repostCount} reposted={reposted} />
                <FavoriteButton count={favoriteCount} favorited={favorited} />
                <ShareButton />
              </Footer>
            </Content>
          </Original>
        </div>
      </CardActionArea>
    </Article>
  );
}
