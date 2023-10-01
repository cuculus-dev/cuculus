'use client';

import { styled } from '@mui/material';
import { useEffect } from 'react';
import { useAuth } from '@/swr/client/auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/app/(plain)/login/_components/LoginForm';

const StyledLogin = styled('div')`
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
    gap: 0px;
  }
`;

const StyledLeftColumn = styled('div')`
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

const StyledTitle = styled('h1')`
  font-size: 48px;
  margin-block-start: 0;
  margin-block-end: 2%;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const StyledText = styled('span')`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const StyledRightColumn = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Login() {
  const { data } = useAuth();

  useEffect(() => {
    if (data) {
      redirect('/home');
    }
  }, [data]);

  return (
    <StyledLogin>
      <StyledLeftColumn>
        <StyledTitle>ログイン</StyledTitle>
        <StyledText>メールアドレス、パスワードを入力してください。</StyledText>
      </StyledLeftColumn>
      <StyledRightColumn>
        <LoginForm />
      </StyledRightColumn>
    </StyledLogin>
  );
}
