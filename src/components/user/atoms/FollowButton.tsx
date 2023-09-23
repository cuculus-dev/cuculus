'use client';

import CapsuleButton from '@/components/common/atoms/CapsuleButton';
import { ButtonTypeMap } from '@mui/material';
import { MouseEventHandler } from 'react';

// static class propertyにして文字列で持たせる？(interfaceどうするか)(enum使う？)
type FollowStatusKeys = 'NotFollowing' | 'Following' | 'Pending' | 'Blocked';
export const FollowStatus = {
  /** 未フォロー */
  NotFollowing: 0,
  /** フォロー中 */
  Following: 1,
  /** フォローリクエスト承認待ち */
  Pending: 2,
  /** ブロックされている */
  Blocked: 3,
} satisfies Record<FollowStatusKeys, number>;

interface Props {
  userId: number;
  followStatus: FollowStatusKeys[keyof FollowStatusKeys];
}

export function FollowButton({ followStatus, userId }: Props) {
  const followActionUrl = `/v1/users/${userId}/follow`;

  // TODO ボタン処理実装
  const follow: MouseEventHandler<HTMLButtonElement> = () => {
    // doPost(followActionUrl)
  };

  // TODO ボタン処理実装
  const unfollow: MouseEventHandler<HTMLButtonElement> = () => {
    // doDelete(followActionUrl);
  };

  // TODO ボタン処理実装
  const cancelRequest: MouseEventHandler<HTMLButtonElement> = () => {
    // doCancel(???);
  };

  const [color, enabled, text, onClick] = ((): [
    ButtonTypeMap['props']['color'],
    boolean,
    string | React.JSX.Element,
    MouseEventHandler<HTMLButtonElement>?,
  ] => {
    switch (followStatus) {
      case FollowStatus.NotFollowing:
        return ['primary', true, 'フォローする', unfollow];
      case FollowStatus.Following:
        return ['success', true, 'フォロー中', follow];
      case FollowStatus.Pending:
        return ['secondary', true, '承認待ち', cancelRequest];
      case FollowStatus.Blocked:
        return ['warning', false, 'ブロックされています'];
      default:
        return ['error', false, '(invalid value)'];
    }
  })();

  return (
    <CapsuleButton
      color={color}
      disabled={!enabled}
      onClick={onClick}
      variant="outlined"
    >
      {text}
    </CapsuleButton>
  );
}
