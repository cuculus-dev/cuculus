'use client';

import { styled, IconButton as MuiDefaultIconButton } from '@mui/material';
import type { IconButtonProps, ButtonProps } from '@mui/material';

interface ExtraProps extends IconButtonProps {
  variant?: Exclude<NonNullable<ButtonProps['variant']>, 'text'> | 'icon';
}

const IconButton = styled(MuiDefaultIconButton, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<ExtraProps>(({ variant, color }) => {
  switch (variant) {
    case 'outlined':
      return {
        outlineWidth: 1,
        outlineStyle: 'solid',
      };
    case 'contained':
      // FIXME 色効かない
      return {
        backgroundColor: color,
      };
    case 'icon':
      return {};
  }
});

export default IconButton;
