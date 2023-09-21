'use client';

// FIXME 関連Issues → https://github.com/cuculus-dev/cuculus/issues/21

import { styled, IconButton as MuiDefaultIconButton } from '@mui/material';
import type {
  IconButtonProps as MuiDefaultIconButtonProps,
  ButtonProps,
} from '@mui/material';

interface IconButtonProps extends MuiDefaultIconButtonProps {
  variant?: Exclude<NonNullable<ButtonProps['variant']>, 'text'> | 'icon';
}

const IconButton = styled(MuiDefaultIconButton, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<IconButtonProps>(({ variant, color }) => {
  // FIXME ButtonとIconButtonで高さが異なる問題。ベタ書きで暫定対処。
  const width = 36;
  const height = width;

  switch (variant) {
    case 'outlined':
      return {
        // FIXME 透明度が効いてない
        color,
        height,
        outlineStyle: 'solid',
        outlineWidth: 1,
        width,
      };
    case 'contained':
      return {
        // FIXME 色がつかない
        backgroundColor: color,
        height,
        width,
      };
    case 'icon':
      return {
        height,
        width,
      };
  }
});

export type { IconButtonProps };
export { IconButton };