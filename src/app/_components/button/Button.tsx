'use client';

import { styled, Button as MuiButton } from '@mui/material';

const Button = styled(MuiButton)`
  box-shadow: none;

  &:hover,
  &:focus {
    box-shadow: none;
  }
` as typeof MuiButton;

export default Button;
