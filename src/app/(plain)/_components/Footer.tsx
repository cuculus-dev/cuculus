'use client';

import GitHubLink from '@/components/elements/GitHubLink';
import LinkButton from '@/components/elements/LinkButton';
import { styled } from '@mui/material';

const StyledFooter = styled('footer')`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.values.desktop}px;
  padding: 0 24px;
  margin: 0 auto;
`;

const BorderLine = styled('hr')`
  width: 100%;
  margin: 0;
  border-width: 0;
  border-style: solid;
  border-bottom-width: thin;
  border-color: ${({ theme }) => theme.palette.grey[600]};
`;

const Container = styled('div')`
  display: flex;
  margin-top: 15px;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
`;

const StyledButton = styled(LinkButton)`
  text-transform: none;
  font-size: 24px;
  padding: 0 8px;
  font-weight: bold;
  color: #9d9d9d;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 20px;
  }
`;
const Copyright = styled('span')`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export default function footer() {
  return (
    <StyledFooter>
      <BorderLine />
      <Container>
        <Copyright>Copyright © 2023 Cuculus.</Copyright>
        <div style={{ marginLeft: 'auto' }} />
        <StyledButton
          href="https://about.cuculus.jp/"
          color="primary"
          target="_blank"
        >
          Roadmap
        </StyledButton>
        <GitHubLink
          href="https://github.com/cuculus-dev"
          height="35px"
          width="35px"
        />
      </Container>
      <div style={{ paddingBottom: '12px' }} />
    </StyledFooter>
  );
}
