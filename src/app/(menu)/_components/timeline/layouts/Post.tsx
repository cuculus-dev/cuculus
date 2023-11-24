'use client';

import {
  Avatar as MuiDefaultAvatar,
  CardActionArea,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import FavoriteButton from '@/app/(menu)/_components/timeline/elements/FavoriteButton';
import RepostButton from '@/app/(menu)/_components/timeline/elements/RepostButton';
import ReplyButton from '@/app/(menu)/_components/timeline/elements/ReplyButton';
import ShareButton from '@/app/(menu)/_components/timeline/elements/ShareButton';
import { useRouter } from 'next/navigation';
import MomentAgo from '@/app/(menu)/_components/timeline/elements/MomentAgo';
import { format } from 'date-fns';

const Avatar = styled(MuiDefaultAvatar)`
  aspect-ratio: 1;
  height: 40px;
  width: 40px;
`;

const Article = styled('article')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: rgba(0, 0, 0, 0.87);
`;

const Original = styled('div')`
  padding: 12px 0;
  display: flex;
  gap: 10px;
`;

const Content = styled('div')`
  overflow: hidden;
`;

const Header = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-bottom: 5px;
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

const MomentLinks = styled(Link)`
  color: #8899a6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HiddenSize = styled('span')`
  max-width: 80%;
`;

const NameHidden = styled('div')`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WhiteSpace = styled('span')`
  padding-left: 4px;
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
        component={'div'}
        onFocus={() => void router.prefetch(postUrl)}
        onMouseEnter={() => void router.prefetch(postUrl)}
        onClick={() => void router.push(postUrl)}
        disableRipple
      >
        <div style={{ padding: '0 16px' }}>
          {/*<div>〇〇さんがリポストしました。</div>*/}
          <Original>
            <Avatar src={profileImageUrl} alt={'プロフィール画像'} />
            <Content>
              <Header>
                <HiddenSize>
                  <NameHidden>
                    <DisplayName
                      href={`/${userName}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      {displayName}
                    </DisplayName>
                    <WhiteSpace>
                      <Typography component="span" color="#8899a6">
                        @{userName}
                      </Typography>
                    </WhiteSpace>
                  </NameHidden>
                </HiddenSize>
                <Typography component="span" color="#8899a6">
                  ·
                </Typography>
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
