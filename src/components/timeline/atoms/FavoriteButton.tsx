'use client';

import { IconButton, styled } from '@mui/material';
import { Star } from '@mui/icons-material';

const Icon = styled(Star)<{ active: 'true' | 'false' }>`
  color: ${({ theme, active }) =>
    active == 'true'
      ? theme.palette.favorite.main
      : theme.palette.action.active};
`;

type Props = {
  count: number;
  favorited: boolean;
};

export default function FavoriteButton({ count, favorited }: Props) {
  return (
    <div aria-label={`${count}件のお気に入り。お気に入りに追加する`}>
      <IconButton
        color="favorite"
        aria-label="お気に入りに追加"
        onClick={(event) => event.stopPropagation()}
      >
        <Icon active={favorited ? 'true' : 'false'} />
      </IconButton>
    </div>
  );
}
