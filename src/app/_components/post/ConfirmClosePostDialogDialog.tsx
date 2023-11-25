'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

// FIXME: 名前がナンセンス

interface Props {
  open: boolean;
  close: () => void;
  actions: {
    text: string;
    callback?: CallableFunction;
  }[];
}

export default function ConfirmClosePostDialogDialog({
  open,
  close,
  actions,
}: Props) {
  const Actions = actions.map(({ text, callback }) => {
    const onClick = async () => {
      await callback?.();
      close();
    };

    return (
      <Button key={text} onClick={() => void onClick()}>
        {text}
      </Button>
    );
  });

  return (
    <Box>
      <Dialog open={open} onClose={close}>
        <DialogTitle>確認</DialogTitle>

        <DialogContent>送信せずに破棄してよろしいですか？</DialogContent>

        <DialogActions>{Actions}</DialogActions>
      </Dialog>
    </Box>
  );
}
