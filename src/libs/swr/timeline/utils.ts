import { Gap, TimelineData } from '@/libs/swr/timeline/types';
import { serialize } from 'swr/_internal';

export const serializeGap = <Data>(gap: Gap<Data>) => {
  return serialize(gap)[0];
};

export const findLatest = <Data>(
  timeline: TimelineData<Data>,
): Data | undefined => {
  const data = timeline.find((data) => Array.isArray(data)) as
    | Data[]
    | undefined;
  if (data && data.length > 0) {
    return data[0];
  }
  return undefined;
};

export const findOldest = <Data>(
  timeline: TimelineData<Data>,
): Data | undefined => {
  let data: Data[] | undefined;
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (Array.isArray(timeline[i])) {
      data = timeline[i] as Data[];
      break;
    }
  }
  if (data && data.length > 0) {
    return data[data.length - 1];
  }
  return undefined;
};
