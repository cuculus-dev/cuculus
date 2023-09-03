'use client';

// TODO 小さい時とでっかいときで表示が替わる
// TODO アイコンとラベルとリンク

import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { Button, styled } from '@mui/material';

const StyledButton = styled(Button)`
  min-width: 64px;
  padding: 8px 11px;
  border-radius: 4px;
  font-size: 20px;
  color: black;
  gap: 10px;
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
        <span>{label}</span>
      </StyledButton>
    </Link>
  );
};

export default MenuItem;
