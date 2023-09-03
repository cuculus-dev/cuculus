'use client';

// TODO 小さい時とでっかいときで表示が替わる
// TODO アイコンとラベルとリンク
// TODO 横幅はマックスにしたい

import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { styled } from '@mui/material';

const StyledButton = styled('div')`
  padding: 8px 11px;
  font-size: 20px;
  color: black;
  gap: 10px;
  font-weight: 500;

  width: 100%;
  display: inline-flex;
  justify-content: left;
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  line-height: 1.75;
  align-items: center;
  border-radius: 10px;

  &:hover,
  &:focus {
    background-color: rgba(15, 20, 25, 0.04);
  }

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    border-radius: 50%;
  }
`;

const Label = styled('span')`
  ${({ theme }) => theme.breakpoints.down('desktop')} {
    display: none;
  }
`;

type Props = {
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  icon: ReactNode;
  label?: string;
};

const MenuItem = ({ href, target, icon, label }: Props) => {
  return (
    <Link href={href} target={target} passHref>
      <StyledButton>
        {icon}
        <Label>{label}</Label>
      </StyledButton>
    </Link>
  );
};

export default MenuItem;
