'use client';

import Image from 'next/image';
import Footer from '@/app/(plain)/(guest)/toppage/footer/Footer';
import LinkButton from '@/components/common/atoms/LinkButton';
import { styled } from '@mui/material';

const Container = styled('div')`
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

const Title = styled('div')`
  display: flex;
  justify-content: center;
`;
const Bottom = styled('div')`
  display: flex;
`;

export default function toppage() {
  return (
    <main>
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
          <LinkButton href={''}>アカウントを作成</LinkButton>
          <div style={{ marginLeft: 'auto' }} />
          <LinkButton href={''}>ログイン</LinkButton>
        </Bottom>
      </Container>
      <Footer />
    </main>
  );
}
