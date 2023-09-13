'use client';

import { IconButton, styled } from '@mui/material';
import { Sync } from '@mui/icons-material';
import usePost from '@/swr/client/post';
import React from 'react';

const Icon = styled(Sync)<{ active: 'true' | 'false' }>`
  color: ${({ theme, active }) =>
    active == 'true' ? theme.palette.repost.main : theme.palette.action.active};
`;

type Props = {
  postId: number;
};

export default function RepostButton({ postId }: Props) {
  const { data, mutate, isValidating } = usePost(postId);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (data && !isValidating) {
      void mutate({
        ...data,
        reposted: !data.reposted,
        repostCount: data.repostCount + (data.reposted ? -1 : 1),
      });
    }
  };
  return (
    <div aria-label={`${data?.repostCount ?? 0}件のリポスト。リポストする`}>
      <IconButton color="repost" aria-label="リポスト" onClick={handleClick}>
        <Icon active={data?.reposted ?? false ? 'true' : 'false'} />
      </IconButton>
    </div>
  );
}
