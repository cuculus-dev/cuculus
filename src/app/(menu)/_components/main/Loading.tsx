'use client';

import { LinearProgress, styled } from '@mui/material';

const Root = styled('div')`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.palette.grey[100]};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[100]};
  min-height: 100vh;
  color: ${({ theme }) => theme.palette.primary.main};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    min-height: calc(
      100vh - ${({ theme }) => theme.mixins.bottomMenu.height}px +
        env(safe-area-inset-bottom)
    );
  }
`;

const Container = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

const Icon = styled('div')`
  margin: 16px auto;
  display: flex;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  user-select: none;
`;

const Img = styled('img')`
  width: 100%;
  height: 100%;
`;

export default function Loading() {
  return (
    <Root>
      <LinearProgress />
      <Container>
        <Icon>
          <Img src="/icons/cuculus-icon-2.png" alt="cuculus-icon" />
        </Icon>
      </Container>
    </Root>
  );
}
