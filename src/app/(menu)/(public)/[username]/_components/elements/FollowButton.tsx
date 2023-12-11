'use client';

import CapsuleButton from '@/app/_components/button/CapsuleButton';

type Props = {
  userId: number;
  isFollowing: boolean;
};

export function FollowButton({ isFollowing }: Props) {
  const text = isFollowing ? 'フォロー中' : 'フォロー';

  return (
    <CapsuleButton
      aria-label={text}
      color="primary"
      // onClick={onClick}
      variant={isFollowing ? 'outlined' : 'contained'}
    >
      {text}
    </CapsuleButton>
  );
}
