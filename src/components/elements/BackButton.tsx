'use client';

import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';

type Props = {
  width?: string;
  height?: string;
};

export default function BackButton({ width = 'auto', height = 'auto' }: Props) {
  const router = useRouter();
  return (
    <IconButton
      aria-label="戻る"
      onClick={() => router.back()}
      sx={{ width, height, aspectRatio: 1 }}
    >
      <ArrowBack />
    </IconButton>
  );
}
