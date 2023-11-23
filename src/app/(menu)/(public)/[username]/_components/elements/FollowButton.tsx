'use client';

import CapsuleButton from '@/app/_components/button/CapsuleButton';
import { ButtonTypeMap } from '@mui/material';
import { MouseEventHandler } from 'react';
import { OverridableStringUnion } from '@mui/types';
import { ButtonPropsVariantOverrides } from '@mui/material/Button';

// static class propertyにして文字列で持たせる？(interfaceどうするか)(enum使う？)
export type FollowStatus =
  | 'NotFollowing'
  | 'Following'
  | 'Pending'
  | 'Blocked'
  | 'EditProfile';

interface Props {
  userId: number;
  followStatus: FollowStatus;
}

export function FollowButton({ followStatus }: Props) {
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

  const editProfile: MouseEventHandler<HTMLButtonElement> = () => {
    // editProfile(???);
  };

  const [color, enabled, text, onClick, variant] = ((): [
    ButtonTypeMap['props']['color'],
    boolean,
    string,
    MouseEventHandler<HTMLButtonElement> | undefined,
    OverridableStringUnion<
      'text' | 'outlined' | 'contained',
      ButtonPropsVariantOverrides
    >,
  ] => {
    switch (followStatus) {
      case 'NotFollowing':
        return ['primary', true, 'フォロー', unfollow, 'contained'];
      case 'Following':
        return ['primary', true, 'フォロー中', follow, 'outlined'];
      case 'Pending':
        return ['secondary', true, '承認待ち', cancelRequest, 'outlined'];
      case 'Blocked':
        return [
          'warning',
          false,
          'ブロックされています',
          undefined,
          'outlined',
        ];
      case 'EditProfile':
        return ['primary', true, 'プロフィールを編集', editProfile, 'outlined'];
      default:
        return ['error', false, '(invalid value)', undefined, 'outlined'];
    }
  })();

  return (
    <CapsuleButton
      aria-label={text}
      color={color}
      disabled={!enabled}
      onClick={onClick}
      variant={variant}
    >
      {text}
    </CapsuleButton>
  );
}
