'use client';

import { Box, styled } from '@mui/material';

// FIXME 高さ不足でスクロールバー出てくると右端に被ります
const SideMenuItemStyleBase = styled(Box)`
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1.3rem;
  height: 56px;
  margin: 5px;
  min-height: 56px;
  padding: 0.25rem;

  &:hover,
  &:focus {
    background-color: rgba(15, 20, 25, 0.04);
  }

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    aspect-ratio: 1 / 1;
    height: 46px;
    margin: 2px 0;
    max-height: 46px;
    min-height: 46px;
    padding: 0;
    width: 46px;

    span:has(svg) {
      overflow: visible;
      width: 100%;

      & > svg {
        font-size: 2rem;
      }
    }
  }
`;

export default SideMenuItemStyleBase;
