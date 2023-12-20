'use client';

import { IconButton } from '@/app/_components/button/IconButton';
import PostDialog from '@/app/_components/post/PostDialog';
import { useProfile } from '@/swr/client/auth';
import { Send } from '@mui/icons-material';
import { Box, styled } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const StyledButton = styled(IconButton)`
  position: fixed;

  bottom: calc(
    ${({ theme }) => theme.mixins.bottomMenu.height}px +
      env(safe-area-inset-bottom) + 1rem
  );
  right: 1rem;

  height: auto;
  width: 3.5rem;
  aspect-ratio: 1 / 1;

  > svg {
    width: 2rem;
    height: auto;
  }

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }

  /* FIXME: IconButtonのvariant=containedで色つかない問題が解消したら消す */
  color: white;
  background-color: #007bbb;
  :hover {
    background-color: #007bbb;
  }
`;

export default function MobileOpenPostDialogButton() {
  const [getOpenDialog, setOpenDialog] = useState(false);

  const renderablePaths = ['/home', '/search', '/notifications'];
  const renderable = renderablePaths.includes(usePathname() as string);
  const { data: profile } = useProfile();

  return (
    <>
      {profile && renderable && (
        <Box>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            <Send />
          </StyledButton>

          <PostDialog
            fullScreen
            open={getOpenDialog}
            close={() => setOpenDialog(false)}
          />
        </Box>
      )}
    </>
  );
}
