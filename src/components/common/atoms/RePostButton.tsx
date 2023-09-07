'use client';

import { IconButton, styled } from '@mui/material';
import { Sync } from '@mui/icons-material';
import { useState } from 'react';

const Icon = styled(Sync)<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.palette.repost.main : theme.palette.action.active};
`;

type Props = {
  count: number;
};

export default function RePostButton({ count }: Props) {
  const [reposted, setRepost] = useState(false);
  return (
    <div aria-label={`${count}件のリポスト。リポストする`}>
      <IconButton
        color="repost"
        aria-label="リポスト"
        onClick={(event) => {
          event.stopPropagation();
          setRepost(!reposted);
        }}
      >
        <Icon active={reposted} />
      </IconButton>
    </div>
  );
}
