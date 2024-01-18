'use client';

import { styled } from '@mui/material';
import LinkButton from '@/pages/_components/button/LinkButton';
import { MuseoModerno } from 'next/font/google';

const museoModerno = MuseoModerno({ subsets: ['latin'], weight: ['700'] });

const Root = styled('div')`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

const Title = styled('div')`
  font-weight: bold;
  font-size: 2.25rem;
  line-height: 2.5rem;
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

export default function NotFound() {
  return (
    <Root>
      <Container>
        <Title className={museoModerno.className}>404 NotFound</Title>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>このページは存在しません。</span>
        </div>
        <LinkButton href={'/'} variant={'outlined'} aria-label="トップに戻る">
          トップに戻る
        </LinkButton>
        <Icon>
          <Img src="/icons/cuculus-icon-2.png" alt="cuculus-icon" />
        </Icon>
      </Container>
    </Root>
  );
}
