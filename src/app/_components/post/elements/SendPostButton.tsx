'use client';

import CapsuleButton from '@/app/_components/button/CapsuleButton';
import { Send } from '@mui/icons-material';
import { usePostSend } from '@/swr/client/post';

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
  const { trigger, isMutating } = usePostSend();

  const sendPost = async () => {
    await trigger({ createPost: { text: sendData.plainText } })
      .then(() => {
        onSucceed?.();
      })
      .catch((e) => {
        onError?.(e);
      });
  };

  return (
    <CapsuleButton
      disabled={disabled || isMutating}
      variant="contained"
      disableElevation
      startIcon={<Send />}
      onClick={() => void sendPost()}
    >
      送信
    </CapsuleButton>
  );
}
