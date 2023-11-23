'use client';

import { styled, Button } from '@mui/material';

const CapsuleButton = styled(Button)`
  border-radius: 9999px;
  box-shadow: none;

  &:hover,
  &:focus {
    box-shadow: none;
  }
`;

export default CapsuleButton;
