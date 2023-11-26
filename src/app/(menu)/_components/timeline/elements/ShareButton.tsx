'use client';

import { IconButton, styled } from '@mui/material';
import { IosShare } from '@mui/icons-material';

const StyledButton = styled(IconButton)`
  &:hover {
    color: ${({ theme }) => theme.palette.more.main};
  }
`;

export default function ShareButton() {
  return (
    <div aria-label={`共有する`}>
      <StyledButton
        aria-label="共有"
        onClick={(event) => event.stopPropagation()}
      >
        <IosShare fontSize="small" />
      </StyledButton>
    </div>
  );
}
