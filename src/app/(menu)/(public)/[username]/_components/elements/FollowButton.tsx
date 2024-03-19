'use client';

import CapsuleButton from '@/app/_components/button/CapsuleButton';
import { useRelationship } from '@/swr/client/relationship';
import { useFollowUpdate } from '@/swr/client/user';
import { styled } from '@mui/material';
import { useState } from 'react';

const RemoveButton = styled(CapsuleButton)`
  &:hover {
    color: ${({ theme }) => theme.palette.error.main};
    border-color: ${({ theme }) => theme.palette.error.main};
  }
`;
const CancelButton = styled(CapsuleButton)`
  &:hover {
    color: ${({ theme }) => theme.palette.error.main};
    border-color: ${({ theme }) => theme.palette.error.main};
  }
`;

/**
 * フォローボタン
 * @param userId
 * @constructor
 */
export default function FollowButton({ userId }: { userId: number }) {
  const { data: relationship } = useRelationship(userId);
  const { trigger: updateFollow } = useFollowUpdate(userId);
  const [isHover, setHover] = useState(false);

  // ロード中または非ログイン時は何も表示しない
  if (!relationship) {
    return <></>;
  }

  // Relationshipが承認待ちの場合はキャンセルボタンを表示
  if (relationship.followRequested) {
    return (
      <CancelButton
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={'キャンセル'}
        onClick={() => {
          void updateFollow(false);
        }}
        variant={'outlined'}
      >
        {isHover ? 'キャンセル' : '承認待ち'}
      </CancelButton>
    );
  }

  // 非フォローの場合はフォローボタンを表示
  if (!relationship.following) {
    const text = 'フォロー';
    return (
      <CapsuleButton
        aria-label={text}
        variant={'contained'}
        onClick={() => {
          void updateFollow(true);
        }}
      >
        {text}
      </CapsuleButton>
    );
  } else {
    // フォロー中の場合はフォロー解除ボタンを表示
    return (
      <RemoveButton
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={'フォロー解除'}
        onClick={() => {
          void updateFollow(false);
        }}
        variant={'outlined'}
      >
        {isHover ? 'フォロー解除' : 'フォロー中'}
      </RemoveButton>
    );
  }
}
