'use client';

import ConfirmClosePostDialogDialog from '@/app/_components/post/ConfirmClosePostDialogDialog';
import PostForm from '@/app/_components/post/PostForm';
import SendPostButton from '@/app/_components/post/elements/SendPostButton';
import { Close } from '@mui/icons-material';
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  styled,
} from '@mui/material';
import { useState } from 'react';

const Flex = styled('div')`
  display: flex;
`;

const HFlex = styled(Flex)`
  flex-direction: row;
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding: 0.5rem;
`;

const StyledDialogContent = styled(DialogContent)`
  padding-bottom: 0;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledDialogActions = styled(DialogActions)`
  padding-top: 0;
`;

interface Props {
  fullScreen?: boolean;
  open: boolean;
  close: () => void;
}

export default function PostDialog({ fullScreen, open, close }: Props) {
  const [getContent, setContent] = useState('');
  const [getShowConfirmCloseDialog, setShowConfirmCloseDialog] =
    useState(false);
  const [getErrorMessage, setErrorMesssage] = useState('');
  const [getSucceedMessage, setSucceedMessage] = useState('');

  // NOTE: 閉じきる前に微妙に空になるのが見えるので
  // それが嫌ならsetTimeout(unmount時にcb呼ぶ方法あるならそっち)で包む
  const clearContent = () => setContent('');
  const confirmAndClose = () => setShowConfirmCloseDialog(true);

  return (
    <Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => (getContent.length ? confirmAndClose() : close())}
      >
        <StyledDialogTitle>
          <HFlex>
            <IconButton
              onClick={() => (getContent.length ? confirmAndClose() : close())}
            >
              <Close />
            </IconButton>
          </HFlex>
        </StyledDialogTitle>

        <StyledDialogContent>
          <PostForm
            getContent={getContent}
            setContent={setContent}
            focusEditor
          />
        </StyledDialogContent>

        <StyledDialogActions>
          <SendPostButton
            disabled={!getContent.length}
            sendData={{ plainText: getContent }}
            onSucceed={() => {
              setSucceedMessage('送信しました。');
              clearContent();
              close();
            }}
            onError={(e) => {
              // TODO: リリース前に消す？
              console.error(e);
              setErrorMesssage('送信に失敗しました。');
            }}
          />
        </StyledDialogActions>

        <Snackbar
          open={!!getErrorMessage.length}
          onClose={() => setErrorMesssage('')}
          autoHideDuration={2_000}
        >
          <Alert severity="error">{getErrorMessage}</Alert>
        </Snackbar>
      </Dialog>

      <ConfirmClosePostDialogDialog
        open={getShowConfirmCloseDialog}
        close={() => setShowConfirmCloseDialog(false)}
        actions={[
          {
            text: '変更内容を破棄',
            callback() {
              clearContent();
              close();
            },
          },
          { text: '編集を続ける' },
        ]}
      />

      <Snackbar
        open={!!getSucceedMessage.length}
        onClose={() => setSucceedMessage('')}
        autoHideDuration={2_000}
      >
        <Alert severity="success">{getSucceedMessage}</Alert>
      </Snackbar>
    </Box>
  );
}
