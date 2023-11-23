'use client';

import { styled } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const StyledLink = styled(NextLink)`
  align-items: center;
  color: black;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;

  &.active {
    font-weight: 700;
  }

  & > svg {
    aspect-ratio: 1 / 1;
    width: 41px;
    height: 41px;
  }
`;

interface Props {
  href: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  label: string;
}

const MobileBottomMenuLinkItem = ({ href, icon, activeIcon, label }: Props) => {
  const pathname = usePathname();

  return (
    <StyledLink
      href={href}
      className={href === pathname ? 'active' : undefined}
      aria-label={label}
    >
      {activeIcon && href === pathname ? activeIcon : icon}
    </StyledLink>
  );
};

export default MobileBottomMenuLinkItem;
