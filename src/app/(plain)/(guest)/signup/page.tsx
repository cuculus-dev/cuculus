'use client';

import { styled } from '@mui/material';
import SignUpForm from '@/app/(plain)/(guest)/signup/_components/SignUpForm';

const Root = styled('div')`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 2fr 3fr;
  gap: 200px;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    gap: 100px;
  }

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    gap: 50px;
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 5fr;
    gap: 0;
  }
`;

const Left = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.primary.main};
  justify-content: center;

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    text-align: right;
    padding-right: 50px;
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`;

const Title = styled('h1')`
  font-size: 40px;
  margin-block-start: 0;
  margin-block-end: 2%;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const Right = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function page() {
  return (
    <main>
      <Root>
        <Left>
          <Title>アカウントを作成</Title>
        </Left>
        <Right>
          <SignUpForm />
        </Right>
      </Root>
    </main>
  );
}
