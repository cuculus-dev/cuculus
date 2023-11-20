'use client';

import { LinearProgress, styled } from '@mui/material';

const Root = styled('div')`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Icon = styled('div')`
  margin: 16px auto;
  display: flex;
  flex-shrink: 0;
  width: 128px;
  height: 128px;
  user-select: none;
`;

const Img = styled('img')`
  width: 100%;
  height: 100%;
`;

/**
 * ローディング画面
 * @constructor
 */
export default function LoadingScreen() {
  return (
    <main style={{ height: '100vh' }}>
      <Root>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
        <Icon>
          <Img src="/icons/cuculus-icon-2.png" alt="cuculus-icon" />
        </Icon>
      </Root>
    </main>
  );
}
