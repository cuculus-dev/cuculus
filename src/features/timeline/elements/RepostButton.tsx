'use client';

import { IconButton, styled } from '@mui/material';
import { Sync } from '@mui/icons-material';
import { usePostMutation } from '@/swr/client/post';
import React from 'react';

const Icon = styled(Sync)<{ active: 'true' | 'false' }>`
  color: ${({ theme, active }) =>
    active == 'true' ? theme.palette.repost.main : theme.palette.action.active};
`;

type Props = {
  postId: number;
  reposted: boolean;
  repostCount: number;
};

export default function RepostButton({ postId, reposted, repostCount }: Props) {
  const { updatePost } = usePostMutation(postId);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    void updatePost(postId);
  };
  return (
    <div aria-label={`${repostCount}件のリポスト。リポストする`}>
      <IconButton color="repost" aria-label="リポスト" onClick={handleClick}>
        <Icon active={reposted ? 'true' : 'false'} />
      </IconButton>
    </div>
  );
}
