'use client';

import { styled } from '@mui/material';
import { useEffect } from 'react';
import { useAuth } from '@/swr/client/auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/app/(plain)/login/_components/LoginForm';

const StyledLogin = styled('div')`
  display: flex;
`;

const StyledLeftColumn = styled('div')`
  text-align: right;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding-right: 50px;
  min-height: 100vh;
  justify-content: center;
  flex: 2;
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
  flex: 3;
  padding-left: 200px;
  min-height: 100vh;
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
