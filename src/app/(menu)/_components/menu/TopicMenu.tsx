'use client';

import { styled } from '@mui/material';
import { Lightbulb } from '@mui/icons-material';
import Link from 'next/link';
import GitHubSvg from '@assets/icons/github-mark.svg';

const Root = styled('div')`
  background-color: ${({ theme }) => theme.palette.background.paper};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: none;
  }
`;

const StyledMenu = styled('nav')`
  height: 100%;
  overflow-y: auto;
  position: fixed;
  width: 330px;
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const Title = styled('div')`
  color: ${({ theme }) => theme.palette.grey[900]};
  display: flex;
  font-size: 1.2rem;
  font-weight: 700;
  gap: 0.5rem;
  padding: 10px 0;
  width: 100%;
`;

const Item = styled('div')`
  display: flex;
  padding: 10px 0;
  font-size: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.grey[800]};
  gap: 0.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[800]};

  &:hover {
    text-decoration: underline;
  }
`;

function MenuItem({ text, href }: { text: string; href: string }) {
  return (
    <Item>
      <GitHubSvg height={20} width={20} viewBox="0 0 100 100" />
      <StyledLink href={href} target={'_blank'}>
        {text}
      </StyledLink>
    </Item>
  );
}

export default function TopicMenu() {
  return (
    <Root>
      <StyledMenu>
        <Container>
          <Title>
            <Lightbulb style={{ color: '#ffcf33' }} />
            現在検討中の機能
          </Title>
          {/* FIXME APIから取得するようにする */}
          <MenuItem
            text={'引用みたいな見た目になるようOGPを調整する'}
            href={'https://github.com/orgs/cuculus-dev/discussions/38'}
          />
          <MenuItem
            text={'画像生成AIの学習から保護する機能'}
            href={'https://github.com/orgs/cuculus-dev/discussions/33'}
          />
          <MenuItem
            text={'ATProtocol(Bluesky)のサポート'}
            href={'https://github.com/orgs/cuculus-dev/discussions/9'}
          />
          <MenuItem
            text={'Nostrのサポート'}
            href={'https://github.com/orgs/cuculus-dev/discussions/7'}
          />
          <MenuItem
            text={'ショートカットキーの設定'}
            href={'https://github.com/orgs/cuculus-dev/discussions/6'}
          />
          <MenuItem
            text={'投げ銭システム'}
            href={'https://github.com/orgs/cuculus-dev/discussions/4'}
          />
        </Container>
      </StyledMenu>
    </Root>
  );
}
