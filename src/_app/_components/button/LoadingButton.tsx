'use client';

import { styled } from '@mui/material';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

const LoadingButton = styled(MuiLoadingButton)`
  box-shadow: none;

  &:hover,
  &:focus {
    box-shadow: none;
  }
` as typeof MuiLoadingButton;

export default LoadingButton;
