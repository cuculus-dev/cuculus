'use client';

import LinkButton from '@/components/common/atoms/LinkButton';
import GitHubLink from '@/components/common/molecules/GitHubLink';
import { styled } from '@mui/material';
import Image from 'next/image';

const StyledFooter = styled('footer')`
  padding: 20px;
  margin: 0 auto;
  position: absolute;
  bottom: 0%;
  right: 0%;
`;

const Container = styled('div')`
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
`;

export default function footer() {
  const buttonStyles = {
    fontSize: '24px',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#9D9D9D',
    textTransform: 'none',
  };
  return (
    <StyledFooter>
      <Container>
        <LinkButton
          href="https://about.cuculus.jp/"
          color="primary"
          target="_blank"
          style={buttonStyles}
        >
          Roadmap
        </LinkButton>
        <div style={{ paddingRight: '20px' }} />
        <Image
          src="/icons/github.png"
          alt={'cuculus'}
          width={50}
          height={50}
        ></Image>
        <GitHubLink
          href="https://github.com/cuculus-dev"
          height="24px"
          width="24px"
        />
      </Container>
    </StyledFooter>
  );
}
