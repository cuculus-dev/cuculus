import { SWRInfiniteResponse } from 'swr/infinite';
import { FollowList } from '@cuculus/cuculus-api';
import { CircularProgress } from '@mui/material';
import FFProfileCard from '@/app/(menu)/(public)/[username]/_components/layouts/FFProfileCard';

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
      {data?.map((follows, index) => (
        <div key={index}>
          {follows?.users.map((User, index) => (
            <FFProfileCard
              key={index}
              name={User.name}
              userName={User.username}
              bio={User.bio}
              profileImageUrl={User.profileImageUrl}
              id={User.id}
            />
          ))}
        </div>
      ))}
    </>
  );
}
