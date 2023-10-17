'use client';

import { Box, styled } from '@mui/material';

const MobileBottomMenuItemStyleBase = styled(Box)`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 1px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & svg {
    font-size: 4rem;
  }
`;

export default MobileBottomMenuItemStyleBase;
