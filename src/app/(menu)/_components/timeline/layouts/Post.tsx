'use client';

import {
  CardActionArea,
  Skeleton,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import FavoriteButton from '@/app/(menu)/_components/timeline/elements/FavoriteButton';
import RepostButton from '@/app/(menu)/_components/timeline/elements/RepostButton';
import { useRouter } from 'next/navigation';
import MomentAgo from '@/app/(menu)/_components/timeline/elements/MomentAgo';
import { format } from 'date-fns';
import AvatarIcon from '@/app/(menu)/_components/timeline/elements/AvatarIcon';
import { isRepost as checkRepost } from '@/app/(menu)/_utils/post.utils';
import { usePost } from '@/swr/client/post';

const Article = styled('article')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: rgba(0, 0, 0, 0.87);
`;

const Original = styled('div')`
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

/**
 * 〇〇さんへの返信
 * @constructor
 */
function ReplyTo({ replyToPostId }: { replyToPostId: string }) {
  const { data, isLoading } = usePost(replyToPostId);

  if (isLoading) {
    return <Skeleton style={{ maxWidth: '250px' }} />;
  }

  if (!data) {
    return <div>読み込みエラー</div>;
  }

  return (
    <MomentLinks
      aria-label="リポストしたユーザー"
      href={`/${data.author.username}/posts/${data.id}`}
      onClick={(event) => event.stopPropagation()}
    >
      {data.author.name}さんへの返信
    </MomentLinks>
  );
}

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

export default function Post(props: Props) {
  const router = useRouter();

  const isRepost = checkRepost(props);
  const originalPost = props.originalPost ?? props;

  const { favorited, favoriteCount, reposted, repostCount } = props;
  const id = isRepost ? originalPost.id : props.id;
  const text = isRepost ? originalPost.text : props.text;
  const postedAt = isRepost ? originalPost.postedAt : props.postedAt;
  const author = isRepost ? originalPost.author : props.author;
  const repostedBy = isRepost ? props.author : undefined;
  const replyToPostId = props.replyToPostId;

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
          <div style={{ padding: '12px 0 6px 0' }}>
            {repostedBy && (
              <MomentLinks
                aria-label="リポストしたユーザー"
                href={`/${repostedBy.username}`}
                onClick={(event) => event.stopPropagation()}
              >
                {repostedBy.name}さんがリポスト
              </MomentLinks>
            )}
            {replyToPostId && <ReplyTo replyToPostId={replyToPostId} />}
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
                    postId={props.id}
                    reposted={reposted}
                    repostCount={repostCount}
                  />
                  <FavoriteButton
                    postId={props.id}
                    favorited={favorited}
                    favoriteCount={favoriteCount}
                  />
                  <div>{/*シェアボタン*/}</div>
                </Footer>
              </Content>
            </Original>
          </div>
        </div>
      </CardActionArea>
    </Article>
  );
}
