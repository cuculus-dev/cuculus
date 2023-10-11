'use client';

import SideMenuItemStyleBase from '@/features/menu/elements/SideMenuItemStyleBase';
import { Send } from '@mui/icons-material';
import { Box, Dialog, styled } from '@mui/material';
import { useState } from 'react';

const Wrapper = styled(SideMenuItemStyleBase)`
  background-color: lightskyblue;

  &:hover,
  &:focus {
    background-color: skyblue;
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
  const [getShowPostDialog, setShowPostDialog] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setShowPostDialog(true)}>
        <HFlex justifyContent={'center'} alignItems={'center'} gap={1}>
          <Send />
          <Label>投稿</Label>
        </HFlex>
      </Wrapper>
      <Dialog open={getShowPostDialog} onClose={() => setShowPostDialog(false)}>
        <div>FIXME 投稿コンポーネントに差し替え</div>
      </Dialog>
    </>
  );
};

export default SideMenuPostButton;
