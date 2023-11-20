'use client';

import GitHubSvg from '@assets/icons/github-mark.svg';
import { IconButton } from '@mui/material';

type Props = {
  href: string;
  width?: string;
  height?: string;
};

export default function GitHubLink({ href, width = '0', height = '0' }: Props) {
  return (
    <IconButton
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      aria-label="github"
      title="GitHub"
      size="small"
    >
      <GitHubSvg width={width} height={height} viewBox="0 0 100 100" />
    </IconButton>
  );
}
