'use client';

import LinkButton from '@/components/common/atoms/LinkButton';
import GitHubLink from '@/components/common/molecules/GitHubLink';
import { styled } from '@mui/material';

const StyledFooter = styled('footer')`
  max-width: ${({ theme }) => theme.breakpoints.values.desktop}px;
  padding: 0 24px;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
`;

const Container = styled('div')`
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
`;

export default function footer() {
  return (
    <StyledFooter>
      <Container>
        <div style={{ marginLeft: 'auto' }} />
        <LinkButton
          href="https://about.cuculus.jp/"
          color="primary"
          target="_blank"
        >
          Roadmap
        </LinkButton>
        <GitHubLink
          href="https://github.com/cuculus-dev"
          height="24px"
          width="24px"
        />
      </Container>
    </StyledFooter>
  );
}
