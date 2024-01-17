'use client';

import SideMenuItemStyleBase from '@/_app/(menu)/_components/menu/elements/SideMenuItemStyleBase';
import { Box, styled } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const Wrapper = styled(SideMenuItemStyleBase)`
  padding: 0;
`;

const StyledLink = styled(NextLink)`
  align-items: center;
  color: black;
  display: flex;
  font-size: 1.3rem;
  font-weight: 500;
  gap: 0.5rem;
  height: 100%;
  padding: 4px 1rem;
  text-decoration: none;
  width: 100%;

  &.active {
    font-weight: 700;
  }

  & > svg {
    font-size: 2rem;
  }

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    padding: 0;
    margin: auto;

    & > svg {
      aspect-ratio: 1 / 1;
      width: 100%;
    }
  }
`;

const Label = styled(Box)`
  ${({ theme }) => theme.breakpoints.down('desktop')} {
    display: none;
  }
`;

interface Props {
  href: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  label: string;
}

const SideMenuLinkItem = ({ href, icon, label, activeIcon }: Props) => {
  const pathname = usePathname();

  return (
    <Wrapper>
      <StyledLink
        href={href}
        className={href === pathname ? 'active' : undefined}
      >
        {activeIcon && href === pathname ? activeIcon : icon}
        <Label>{label}</Label>
      </StyledLink>
    </Wrapper>
  );
};

export default SideMenuLinkItem;
