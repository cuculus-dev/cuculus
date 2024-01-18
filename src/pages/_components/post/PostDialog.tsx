'use client';

import ConfirmClosePostDialogDialog from '@/pages/_components/post/ConfirmClosePostDialogDialog';
import PostForm from '@/pages/_components/post/PostForm';
import SendPostButton from '@/pages/_components/post/elements/SendPostButton';
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
import { useHomeTimelineImmutable } from '@/swr/client/timeline';

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
  const [content, setContent] = useState('');
  const [showConfirmCloseDialog, setShowConfirmCloseDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { mutateLatest } = useHomeTimelineImmutable();

  // NOTE: 閉じきる前に微妙に空になるのが見えるので
  // それが嫌ならsetTimeout(unmount時にcb呼ぶ方法あるならそっち)で包む
  const clearContent = () => setContent('');
  const confirmAndClose = () => setShowConfirmCloseDialog(true);

  return (
    <Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => (content.length ? confirmAndClose() : close())}
      >
        <StyledDialogTitle>
          <HFlex>
            <IconButton
              onClick={() => (content.length ? confirmAndClose() : close())}
            >
              <Close />
            </IconButton>
          </HFlex>
        </StyledDialogTitle>

        <StyledDialogContent>
          <PostForm getContent={content} setContent={setContent} focusEditor />
        </StyledDialogContent>

        <StyledDialogActions>
          <SendPostButton
            disabled={!content.length}
            sendData={{ plainText: content }}
            onSucceed={() => {
              setSuccessMessage('送信しました。');
              clearContent();
              void mutateLatest();
              close();
            }}
            onError={(e) => {
              // TODO: リリース前に消す？
              console.error(e);
              setErrorMessage('送信に失敗しました。');
            }}
          />
        </StyledDialogActions>

        <Snackbar
          open={!!errorMessage.length}
          onClose={() => setErrorMessage('')}
          autoHideDuration={2_000}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      </Dialog>

      <ConfirmClosePostDialogDialog
        open={showConfirmCloseDialog}
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
        open={!!successMessage.length}
        onClose={() => setSuccessMessage('')}
        autoHideDuration={2_000}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </Box>
  );
}
