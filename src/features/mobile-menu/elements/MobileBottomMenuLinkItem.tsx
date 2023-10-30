'use client';

import MobileBottomMenuItemStyleBase from '@/features/mobile-menu/elements/MobileBottomMenuItemStyleBase';
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

  &::after {
    font-size: 1.5rem;
    line-height: 1rem;
  }

  &.active::after {
    content: '・';
  }

  &:not(.active)::after {
    content: '　';
  }
`;

interface Props {
  href: string;
  icon: ReactNode;
}

const MobileBottomMenuLinkItem = ({ href, icon }: Props) => {
  const pathname = usePathname();

  return (
    <MobileBottomMenuItemStyleBase>
      <StyledLink
        href={href}
        className={href === pathname ? 'active' : undefined}
      >
        {icon}
      </StyledLink>
    </MobileBottomMenuItemStyleBase>
  );
};

export default MobileBottomMenuLinkItem;
