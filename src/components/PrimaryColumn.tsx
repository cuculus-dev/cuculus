'use client';

import { styled } from '@mui/material';
import { ReactNode } from 'react';

const Main = styled('div')`
  border-left: 1px solid ${({ theme }) => theme.palette.grey[100]};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[100]};
  max-width: 640px;
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

type Props = {
  columnName: string;
  tabs?: string[];
  children?: ReactNode;
};

export default function PrimaryColumn({ columnName, children }: Props) {
  return (
    <Main>
      <Header>{columnName}</Header>
      {children}
    </Main>
  );
}
