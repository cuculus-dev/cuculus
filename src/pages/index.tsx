import CuculusSvg from '@assets/icons/Cuculus.svg';
import { styled } from '@mui/material';
import LinkButton from '@/pages/_components/button/LinkButton';
import Footer from '@/_app/(plain)/_components/Footer';
import { NextPageWithLayout } from 'next';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const Title = styled('div')`
  display: flex;
  padding: 0 150px 40px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding: 0 0 80px 0;
  }
`;
const Bottom = styled('div')`
  display: flex;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 0 0 50px 0;
    gap: 20px;
  }
`;

const Background = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

const StyledLinkButton = styled(LinkButton)`
  box-shadow: none;
  border-radius: 30px;
  width: 265px;
  height: 49px;
  font-size: 24px;
  font-weight: bold;
`;

const Page: NextPageWithLayout = () => {
  return (
    <main>
      <Background>
        <Container>
          <Title>
            <CuculusSvg />
          </Title>
          <Bottom>
            <StyledLinkButton variant="contained" href={'/signup'}>
              アカウントを作成
            </StyledLinkButton>
            <div style={{ marginLeft: 'auto' }} />
            <StyledLinkButton variant="outlined" href={'/login'}>
              ログイン
            </StyledLinkButton>
          </Bottom>
        </Container>
        <Footer />
      </Background>
    </main>
  );
};

Page.accessLevel = 'guest';

export default Page;
