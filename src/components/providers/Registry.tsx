'use client';

import EmotionCacheProvider from '@/components/providers/EmotionCache';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '@/components/theme/theme';

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </EmotionCacheProvider>
  );
};

export default ThemeRegistry;
