'use client';

import Image from 'next/image';
import { IconButton } from '@mui/material';

type Props = {
  href: string;
  width?: string;
  height?: string;
};

export default function GitHubLink({ href }: Props) {
  return (
    <IconButton
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      aria-label="github"
      title="GitHub"
      size="small"
    ></IconButton>
  );
}
