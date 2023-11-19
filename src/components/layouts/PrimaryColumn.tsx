'use client';

import { styled } from '@mui/material';
import { ReactNode } from 'react';
import BackButton from '@/components/elements/BackButton';

const Main = styled('div')`
  border-left: 1px solid ${({ theme }) => theme.palette.grey[100]};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[100]};
  min-height: 100vh;
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
  padding: 0 12px;
  gap: 12px;
  min-height: 50px;
`;

const Title = styled('div')`
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  //white-space: nowrap;
`;

type Props = {
  columnName: string;
  children?: ReactNode;
  showBack?: boolean;
};

export default function PrimaryColumn({
  columnName,
  children,
  showBack = false,
}: Props) {
  return (
    <Main>
      <Header>
        <TitleBar>
          {showBack && <BackButton height="100%" />}
          <Title>{columnName}</Title>
        </TitleBar>
      </Header>
      {children}
    </Main>
  );
}
