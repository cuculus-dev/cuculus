'use client';

import { useHomeTimeline } from '@/swr/client/timeline';
import Timeline from '@/_app/(menu)/_components/timeline/Timeline';

/**
 * ホームタイムライン
 * @constructor
 */
export default function HomeTimeline() {
  return <Timeline timeline={useHomeTimeline()} />;
}
