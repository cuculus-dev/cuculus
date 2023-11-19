'use client';

import EmotionCacheProvider from '@/app/_providers/EmotionCache';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '@/theme/theme';

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </EmotionCacheProvider>
  );
};

export default ThemeRegistry;
