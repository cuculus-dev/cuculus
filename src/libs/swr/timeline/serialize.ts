import { Gap } from '@/libs/swr/timeline/types';

export const serializeGap = (gap: Gap<any>) => {
  return JSON.stringify(gap);
};
