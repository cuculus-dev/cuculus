'use client';

import LinkButton from '@/components/common/atoms/LinkButton';
import { styled } from '@mui/material';
import Image from 'next/image';

const StyledFooter = styled('footer')`
  padding: 20px;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Container = styled('div')`
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
`;

const StyledButton = styled(LinkButton)`
  text-transform: none;
  font-size: 24px;
  font-weight: bold;
  color: #9d9d9d;
`;

export default function footer() {
  return (
    <StyledFooter>
      <Container>
        <StyledButton
          href="https://about.cuculus.jp/"
          color="primary"
          target="_blank"
        >
          Roadmap
        </StyledButton>
        <div style={{ paddingRight: '20px' }} />

        <a href="https://github.com/cuculus-dev">
          <Image
            src="/icons/github.png"
            alt={'cuculus'}
            width={50}
            height={50}
          ></Image>
        </a>
      </Container>
    </StyledFooter>
  );
}
