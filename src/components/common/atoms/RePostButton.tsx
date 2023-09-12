'use client';

import { IconButton, styled } from '@mui/material';
import { Sync } from '@mui/icons-material';

const Icon = styled(Sync)<{ active: 'true' | 'false' }>`
  color: ${({ theme, active }) =>
    active == 'true' ? theme.palette.repost.main : theme.palette.action.active};
`;

type Props = {
  count: number;
  reposted: boolean;
};

export default function RePostButton({ count, reposted }: Props) {
  return (
    <div aria-label={`${count}件のリポスト。リポストする`}>
      <IconButton
        color="repost"
        aria-label="リポスト"
        onClick={(event) => event.stopPropagation()}
      >
        <Icon active={reposted ? 'true' : 'false'} />
      </IconButton>
    </div>
  );
}
