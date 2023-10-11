'use client';

import useTimer from '@/swr/client/timer';
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  format,
} from 'date-fns';

function timeAgo(now: Date, postedAt: Date): string {
  const minutesAgo = differenceInMinutes(now, postedAt);
  if (minutesAgo < 1) {
    const secondsAgo = differenceInSeconds(now, postedAt);
    if (secondsAgo <= 0) return 'たった今';
    return `${secondsAgo}秒前`;
  }
  if (minutesAgo < 60) return `${minutesAgo}分前`;

  const hoursAgo = differenceInHours(now, postedAt);
  if (hoursAgo < 24) return `${hoursAgo}時間前`;

  const daysAgo = differenceInDays(now, postedAt);
  if (daysAgo < 7) return `${daysAgo}日前`;

  return format(postedAt, 'yyyy-MM-dd');
}

export default function MomentAgo({ postedAt }: { postedAt: Date }) {
  const { data } = useTimer(60000);
  return <>{timeAgo(data ?? new Date(), postedAt)}</>;
}
