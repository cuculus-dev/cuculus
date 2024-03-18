'use client';

import { usePublicTimeline } from '@/swr/client/timeline';
import Timeline from '@/app/(menu)/_components/timeline/Timeline';

/**
 * パブリックタイムライン
 * @constructor
 */
export default function PublicTimeline() {
  return <Timeline timeline={usePublicTimeline()} />;
}
