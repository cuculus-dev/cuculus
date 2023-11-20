'use client';

import { styled } from '@mui/material';
import LinkButton from '@/app/_components/button/LinkButton';
import { MuseoModerno } from 'next/font/google';

const museoModerno = MuseoModerno({ subsets: ['latin'], weight: ['700'] });

const Root = styled('div')`
  display: flex;
  justify-content: center;
  align-content: center;
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

export default function ComingSoon() {
  return (
    <Root>
      <Container>
        <Title className={museoModerno.className}>Coming Soon</Title>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>私たちのチームは熱心に新機能の開発に取り組んでいます。</span>
          <span>
            詳しい開発状況や予定については、以下のリンクをチェックしてください。
          </span>
        </div>
        <LinkButton
          href={'https://github.com/orgs/cuculus-dev/discussions'}
          variant={'outlined'}
          target={'_blank'}
          aria-label="開発予定とディスカッション"
        >
          開発予定とディスカッション
        </LinkButton>
        <Icon>
          <Img src="/icons/cuculus-icon-2.png" alt="cuculus-icon" />
        </Icon>
      </Container>
    </Root>
  );
}
