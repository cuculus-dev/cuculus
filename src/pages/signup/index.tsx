import { styled } from '@mui/material';
import SignUpForm from '@/app/(plain)/(guest)/signup/_components/SignUpForm';
import { NextPageWithLayout } from 'next';

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
    display: inline;
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
    display: none;
  }
`;

const LeftTitle = styled('h1')`
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
      <Root>
        <Left>
          <LeftTitle>アカウントを作成</LeftTitle>
        </Left>
        <Title>Cuculus アカウント登録</Title>
        <Right>
          <SignUpForm />
        </Right>
      </Root>
    </main>
  );
};

Page.accessLevel = 'guest';

export default Page;
