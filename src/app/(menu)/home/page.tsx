'use client';

import PrimaryColumn from '@/components/PrimaryColumn';
import Timeline from '@/components/timeline/Timeline';

export default function page() {
  return (
    <main>
      <PrimaryColumn columnName={'ホーム'}>
        <Timeline />
      </PrimaryColumn>
    </main>
  );
}
