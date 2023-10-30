import Button, { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget } from 'react';

interface LinkButtonProps extends Omit<ButtonProps, 'href'> {
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
}

export default function LinkButton({
  href,
  target,
  children,
  ...args
}: LinkButtonProps) {
  return (
    <Link
      style={{ textDecorationLine: 'none' }}
      href={href}
      target={target}
      passHref
    >
      <Button {...args}>{children}</Button>
    </Link>
  );
}
