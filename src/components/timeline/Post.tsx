'use client';

import {
  Avatar,
  CardActionArea,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Favorite } from '@mui/icons-material';
import { MouseEvent } from 'react';
import { useRouter } from 'next/router';

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

const Footer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const stopPropagation = (
  event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
) => {
  event.stopPropagation();
};

type Props = {
  displayName: string;
  userName: string;
  profileImageUrl: string;
  text: string;
  postId: number;
  postedAt: Date;
};

export default function Post({ displayName, userName, text, postId }: Props) {
  const router = useRouter();
  return (
    <Article>
      <CardActionArea
        onClick={(event) => {
          event.stopPropagation();
          void router.push(`/posts/${postId}`);
        }}
        disableRipple
      >
        <div style={{ padding: '0 16px' }}>
          {/*<div>〇〇さんがリポストしました。</div>*/}
          <Original>
            <Avatar sx={{ backgroundColor: '' }}>TODO</Avatar>
            <Content>
              <Header>
                <Typography
                  component={Link}
                  href={`/${userName}`}
                  color="text.primary"
                  sx={{
                    textDecoration: 'none',
                    ':hover': { textDecoration: 'underline' },
                  }}
                  fontWeight="bold"
                >
                  {displayName}
                </Typography>
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
                <div>返信</div>
                <div>リポスト</div>
                <IconButton
                  aria-label="お気に入りに追加"
                  onClick={stopPropagation}
                >
                  <Favorite />
                </IconButton>
              </Footer>
            </Content>
          </Original>
        </div>
      </CardActionArea>
    </Article>
  );
}
