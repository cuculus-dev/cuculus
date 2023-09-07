'use client';

import { IconButton, styled } from '@mui/material';
import { Star } from '@mui/icons-material';
import { useState } from 'react';

const Icon = styled(Star)<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.palette.favorite.main : theme.palette.action.active};
`;

type Props = {
  count: number;
};

export default function FavoriteButton({ count }: Props) {
  const [favorited, setFavorite] = useState(false);

  return (
    <div aria-label={`${count}件のお気に入り。お気に入りに追加する`}>
      <IconButton
        color="favorite"
        aria-label="お気に入りに追加"
        onClick={(event) => {
          event.stopPropagation();
          setFavorite(!favorited);
        }}
      >
        <Icon active={favorited} />
      </IconButton>
    </div>
  );
}
