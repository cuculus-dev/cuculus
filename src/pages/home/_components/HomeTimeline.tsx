'use client';

import { useHomeTimeline } from '@/swr/client/timeline';
import Timeline from '@/pages/_components/timeline/Timeline';

/**
 * ホームタイムライン
 * @constructor
 */
export default function HomeTimeline() {
  return <Timeline timeline={useHomeTimeline()} />;
}
