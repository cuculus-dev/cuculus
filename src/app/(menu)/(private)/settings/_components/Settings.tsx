'use client';

import { styled } from '@mui/material';
import Link from 'next/link';

const Root = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const H2 = styled('h2')`
  font-size: 20px;
`;

/**
 * FIXME デザインは仮です
 * @constructor
 */
export default function Settings() {
  return (
    <Root>
      <H2>外部連携</H2>
      <Link href={'/settings/connect-bluesky'}>Blueskyと連携する</Link>
    </Root>
  );
}
