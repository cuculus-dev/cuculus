import useSWR from 'swr';

const fetcher = () => {
  return new Date();
};

const useTimer = (interval: number) => {
  return useSWR<Date>(`useTimer:${interval}`, fetcher, {
    refreshInterval: interval,
    dedupingInterval: interval,
  });
};

export default useTimer;
