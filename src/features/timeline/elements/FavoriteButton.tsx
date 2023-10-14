'use client';

import { IconButton, styled } from '@mui/material';
import { Star } from '@mui/icons-material';
import { usePostMutation } from '@/swr/client/post';
import React from 'react';

const Icon = styled(Star)<{ active: 'true' | 'false' }>`
  color: ${({ theme, active }) =>
    active == 'true'
      ? theme.palette.favorite.main
      : theme.palette.action.active};
`;

type Props = {
  postId: number;
  favorited: boolean;
  favoriteCount: number;
};

export default function FavoriteButton({
  postId,
  favorited,
  favoriteCount,
}: Props) {
  const { updatePost } = usePostMutation(postId);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    void updatePost(postId);
  };
  return (
    <div aria-label={`${favoriteCount}件のお気に入り。お気に入りに追加する`}>
      <IconButton
        color="favorite"
        aria-label="お気に入りに追加"
        onClick={handleClick}
      >
        <Icon active={favorited ? 'true' : 'false'} />
      </IconButton>
    </div>
  );
}
