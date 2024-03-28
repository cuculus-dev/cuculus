import FFProfileCard from '@/app/(menu)/(public)/[username]/_components/layouts/FFProfileCard';
import ComingSoon from '@/app/(menu)/_components/main/ComingSoon';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';

export default function page({}: { params: { userName: string } }) {
  return (
    <PrimaryColumn hideHeader={true}>
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      <FFProfileCard />
      {/* <ComingSoon /> */}
    </PrimaryColumn>
  );
}
