'use client';

import { IconButton, styled } from '@mui/material';
import { Star } from '@mui/icons-material';

const Icon = styled(Star)<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.palette.favorite.main : theme.palette.action.active};
`;

type Props = {
  active?: boolean;
  count: number;
};

export default function FavoriteButton({ active = false, count }: Props) {
  return (
    <div aria-label={`${count}件のお気に入り。お気に入りに追加する`}>
      <IconButton
        color="favorite"
        aria-label="お気に入りに追加"
        onClick={(event) => event.stopPropagation()}
      >
        <Icon active={active} />
      </IconButton>
    </div>
  );
}
