'use client';

import { ReactNode, useEffect } from 'react';

const scrollPositions: { [path: string]: number } = {};

function setScrollPosition(path: string, y: number) {
  scrollPositions[path] = y;
}

function getScrollPosition(path: string) {
  return scrollPositions[path] || 0;
}

type Props = {
  children?: ReactNode;
  path: string;
};

const ScrollRestoration = ({ path, children }: Props) => {
  useEffect(() => {
    const savedScrollY = getScrollPosition(path);
    if (savedScrollY) {
      window.scrollTo(window.scrollX, savedScrollY);
    }

    const handleScroll = () => {
      setScrollPosition(path, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [path]);

  return <>{children}</>;
};

export default ScrollRestoration;
