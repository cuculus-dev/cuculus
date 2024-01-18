'use client';

import PostDialog from '@/pages/_components/post/PostDialog';
import SideMenuItemStyleBase from '@/pages/_components/menu/elements/SideMenuItemStyleBase';
import { Send } from '@mui/icons-material';
import { Box, styled } from '@mui/material';
import { useState } from 'react';

const Wrapper = styled(SideMenuItemStyleBase)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background-color: ${({ theme }) => theme.palette.primary.main};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const Flex = styled(Box)`
  display: flex;
  height: 100%;
  width: 100%;
`;

const HFlex = styled(Flex)`
  flex-direction: row;
`;

const Label = styled(`span`)`
  font-size: 1.3rem;
  font-weight: bold;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    display: none;
  }
`;
const SideMenuPostButton = () => {
  const [showPostDialog, setShowPostDialog] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setShowPostDialog(true)}>
        <HFlex justifyContent={'center'} alignItems={'center'} gap={1}>
          <Send />
          <Label>ポスト</Label>
        </HFlex>
      </Wrapper>

      <PostDialog
        open={showPostDialog}
        close={() => setShowPostDialog(false)}
      />
    </>
  );
};

export default SideMenuPostButton;
