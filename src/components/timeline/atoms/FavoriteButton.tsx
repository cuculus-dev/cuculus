'use client';

import { IconButton, styled } from '@mui/material';
import { Star } from '@mui/icons-material';
import usePost from '@/swr/client/post';
import React from 'react';

const Icon = styled(Star)<{ active: 'true' | 'false' }>`
  color: ${({ theme, active }) =>
    active == 'true'
      ? theme.palette.favorite.main
      : theme.palette.action.active};
`;

type Props = {
  postId: number;
};

export default function FavoriteButton({ postId }: Props) {
  const { data, mutate, isValidating } = usePost(postId);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (data && !isValidating) {
      void mutate({
        ...data,
        favorited: !data.favorited,
        favoriteCount: data.favoriteCount + (data.favorited ? -1 : 1),
      });
    }
  };
  return (
    <div
      aria-label={`${
        data?.favoriteCount ?? 0
      }件のお気に入り。お気に入りに追加する`}
    >
      <IconButton
        color="favorite"
        aria-label="お気に入りに追加"
        onClick={handleClick}
      >
        <Icon active={data?.favorited ?? false ? 'true' : 'false'} />
      </IconButton>
    </div>
  );
}
