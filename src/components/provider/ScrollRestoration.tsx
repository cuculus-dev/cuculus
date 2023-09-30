'use client';

import { ReactNode, useEffect } from 'react';

const scrollPositions: { [key: string]: number } = {};

function setScrollPosition(path: string, y: number) {
  scrollPositions[path] = y;
}

function getScrollPosition(path: string) {
  return scrollPositions[path] || 0;
}

type Props = {
  children?: ReactNode;
  key: string;
};

const ScrollRestoration = ({ key, children }: Props) => {
  useEffect(() => {
    const savedScrollY = getScrollPosition(key);
    if (savedScrollY) {
      window.scrollTo(window.scrollX, savedScrollY);
    }

    const handleScroll = () => {
      setScrollPosition(key, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [key]);

  return <>{children}</>;
};

export default ScrollRestoration;
