import { SWRInfiniteResponse } from 'swr/infinite';
import { FollowList } from '@cuculus/cuculus-api';
import { CircularProgress } from '@mui/material';

type Props = {
  follows: SWRInfiniteResponse<FollowList | undefined, Error>;
};

/**
 * フォロー/フォロワーリスト
 * @param follows
 * @constructor
 */
export default function FollowList({ follows }: Props) {
  const { data, isLoading, size, setSize } = follows;

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div>現在のページ: {size}</div>
      <button onClick={() => void setSize(size + 1)}>次のページへ</button>
      {data?.map((follow, index) => (
        <div key={index}>
          {follow?.users.map((user) => (
            <div key={user.id}>ユーザー名:{user.name}</div>
          ))}
        </div>
      ))}
    </>
  );
}
