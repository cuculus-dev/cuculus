import useSWR from 'swr';

const fetcher = () => {
  return new Date();
};

const useTimer = (interval: 60000 | 1000) => {
  return useSWR<Date>(`useTimer:${interval}`, fetcher, {
    refreshInterval: interval,
    dedupingInterval: interval,
  });
};

export default useTimer;
