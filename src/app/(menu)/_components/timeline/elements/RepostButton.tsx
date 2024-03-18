'use client';

import { IconButton, styled } from '@mui/material';
import { Sync } from '@mui/icons-material';
import { useRepostCreate } from '@/swr/client/post';
import React from 'react';

const Icon = styled(Sync)<{ active: 'true' | 'false' }>`
  color: ${({ theme, active }) =>
    active == 'true' ? theme.palette.repost.main : theme.palette.action.active};
`;

type Props = {
  postId: string;
  reposted: boolean;
  repostCount: number;
};

export default function RepostButton({ postId, reposted, repostCount }: Props) {
  const { trigger } = useRepostCreate(postId);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (!reposted) {
      void trigger();
    } else {
      // TODO リポスト解除
      console.error('リポスト解除は未実装です。');
    }
  };
  return (
    <div aria-label={`${repostCount}件のリポスト。リポストする`}>
      <IconButton color="repost" aria-label="リポスト" onClick={handleClick}>
        <Icon active={reposted ? 'true' : 'false'} fontSize="small" />
      </IconButton>
    </div>
  );
}
