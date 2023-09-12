'use client';

import { IconButton } from '@mui/material';
import { IosShare } from '@mui/icons-material';

export default function ShareButton() {
  return (
    <div aria-label={`共有する`}>
      <IconButton
        color="more"
        aria-label="共有"
        onClick={(event) => event.stopPropagation()}
      >
        <IosShare />
      </IconButton>
    </div>
  );
}
