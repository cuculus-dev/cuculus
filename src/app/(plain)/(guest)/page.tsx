'use client';

import Image from 'next/image';
import Footer from '@/app/(plain)/(guest)/_components/Footer';
import LinkButton from '@/components/common/atoms/LinkButton';
import { styled } from '@mui/material';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
  }
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

export default function toppage() {
  return (
    <main>
      <Background>
        <Container>
          <Title>
            <Image
              src="/icons/title.png"
              alt={'cuculus'}
              width={344}
              height={84}
            />
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
}
