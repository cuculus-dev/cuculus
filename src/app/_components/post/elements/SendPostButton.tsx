'use client';

import CapsuleButton from '@/app/_components/button/CapsuleButton';
import { postsApi } from '@/libs/cuculus-client';
import { Send } from '@mui/icons-material';

interface Props {
  disabled: boolean;
  // TODO: 処理対象の整理
  sendData: {
    plainText: string;
  };
  onSucceed?: () => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => unknown;
}

export default function SendPostButton({
  disabled,
  sendData,
  onSucceed,
  onError,
}: Props) {
  const sendPost = async () => {
    try {
      // TODO: バリデーションが必要なら実装;
      await postsApi.createPost({
        createPost: {
          text: sendData.plainText,
        },
      });

      await onSucceed?.();
    } catch (e) {
      await onError?.(e);
    }
  };

  return (
    <CapsuleButton
      disabled={disabled}
      variant="contained"
      disableElevation
      startIcon={<Send />}
      onClick={() => void sendPost()}
    >
      送信
    </CapsuleButton>
  );
}
