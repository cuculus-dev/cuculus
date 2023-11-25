'use client';

import { MouseEvent } from 'react';
import { Avatar, styled } from '@mui/material';
import { useRouter } from 'next/navigation';

const AvatarWrapper = styled('div')`
  cursor: pointer;
  position: relative;
  display: inline-block;
  aspect-ratio: 1;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Overlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: rgba(26, 26, 26, 0);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(26, 26, 26, 0.1);
  }
`;

type Props = {
  href?: string;
  src?: string;
};

export default function AvatarIcon({ href, src }: Props) {
  const router = useRouter();
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (href) {
      void router.push(href);
    }
  };

  return (
    <AvatarWrapper onClick={handleClick}>
      <Avatar src={src} alt={'プロフィール画像'} />
      <Overlay />
    </AvatarWrapper>
  );
}
