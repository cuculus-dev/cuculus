import { styled } from '@mui/material';
import LoginForm from '@/_app/(plain)/(guest)/login/_components/LoginForm';
import { NextPageWithLayout } from 'next';

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
    display: inline;
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
    display: none;
  }
`;

const StyledTitle = styled('h1')`
  font-size: 40px;
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

const Title = styled('div')`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 20px;

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }
`;

const Page: NextPageWithLayout = () => {
  return (
    <main>
      <StyledLogin>
        <StyledLeftColumn>
          <StyledTitle>ログイン</StyledTitle>
          <StyledText>
            メールアドレス、パスワードを入力してください。
          </StyledText>
        </StyledLeftColumn>
        <Title>Cuculusにログイン</Title>
        <StyledRightColumn>
          <LoginForm />
        </StyledRightColumn>
      </StyledLogin>
    </main>
  );
};

Page.accessLevel = 'guest';

export default Page;
