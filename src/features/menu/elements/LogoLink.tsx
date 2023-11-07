'use client';

import { styled } from '@mui/material';
import Link from 'next/link';

const Wrapper = styled('div')`
  border-radius: 9999px;
  cursor: pointer;
  height: 46px;
  width: 46px;
  aspect-ratio: 1 / 1;

  &:hover,
  &:focus {
    background-color: rgba(15, 20, 25, 0.04);
  }

  ${({ theme }) => theme.breakpoints.up('desktop')} {
    margin-left: 12px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Image = styled('img')`
  width: 80%;
  height: 80%;
`;

const LogoLink = () => {
  return (
    <Wrapper>
      <StyledLink href="/home">
        <Image src="/icon.png" alt="Cuculus" />
      </StyledLink>
    </Wrapper>
  );
};

export default LogoLink;
