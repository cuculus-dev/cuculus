'use client';

import { styled } from '@mui/material';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

const CapsuleButton = styled(MuiLoadingButton)`
  border-radius: 9999px;
  box-shadow: none;

  &:hover,
  &:focus {
    box-shadow: none;
  }
`;

export default CapsuleButton;
