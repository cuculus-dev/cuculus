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
`;

const Title = styled('div')`
  display: flex;
  padding: 0 150px 40px 150px;
`;
const Bottom = styled('div')`
  display: flex;
`;

const Background = styled('div')`
  min-height: 100vh;
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

export default function toppage() {
  const buttonStyles = {
    boxShadow: 'none',
    borderRadius: '30px',
    width: '265px',
    height: '49px',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Inter',
  };
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
            ></Image>
          </Title>
          <Bottom>
            <LinkButton
              variant="contained"
              style={buttonStyles}
              href={'/signup'}
            >
              アカウントを作成
            </LinkButton>
            <div style={{ marginLeft: 'auto' }} />
            <LinkButton variant="outlined" style={buttonStyles} href={'/login'}>
              ログイン
            </LinkButton>
          </Bottom>
        </Container>
        <Footer />
      </Background>
    </main>
  );
}
