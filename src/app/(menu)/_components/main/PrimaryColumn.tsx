'use client';

import { styled } from '@mui/material';
import { ReactNode } from 'react';
import BackButton from '@/app/_components/button/BackButton';

const Main = styled('main')`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.palette.grey[100]};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[100]};
  min-height: 100vh;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    min-height: calc(
      100vh - ${({ theme }) => theme.mixins.bottomMenu.height}px +
        env(safe-area-inset-bottom)
    );
  }
`;

const Header = styled('header')`
  top: 0;
  position: sticky;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.grey[100]};
  border-width: 0;
  border-bottom-width: 1px;
  background-color: rgba(255, 255, 255, 0.6);
  color: ${({ theme }) => theme.palette.grey[800]};
  z-index: ${({ theme }) => theme.zIndex.appBar};
`;

const TitleBar = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  gap: 12px;
  min-height: 50px;
`;

const Title = styled('div')`
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

type Props = {
  columnName?: string;
  children?: ReactNode;
  hideHeader?: boolean;
  showBack?: boolean;
};

export default function PrimaryColumn({
  columnName = '',
  children,
  hideHeader = false,
  showBack = false,
}: Props) {
  return (
    <Main>
      {!hideHeader && (
        <Header>
          <TitleBar>
            {showBack && <BackButton height="100%" />}
            <Title>{columnName}</Title>
          </TitleBar>
        </Header>
      )}
      {children}
    </Main>
  );
}
