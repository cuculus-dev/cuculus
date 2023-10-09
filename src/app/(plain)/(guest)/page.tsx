'use client';

import Image from 'next/image';
import Footer from '@/app/(plain)/(guest)/_components/Footer';
import LinkButton from '@/components/common/atoms/LinkButton';
import { styled } from '@mui/material';

const Container = styled('div')`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Title = styled('div')`
  display: flex;
  padding: 0 150px 40px 150px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding: 0 0 40px 0;
  }
`;
const Bottom = styled('div')`
  display: flex;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 210px 0 0 0;
    left: 50%;
    gap: 20px;
    transform: translate(-50%, -50%);
  }
`;

const Background = styled('div')`
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
