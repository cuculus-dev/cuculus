import ComingSoon from '@/app/(menu)/_components/main/ComingSoon';
import { Metadata } from 'next';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';

export const metadata: Metadata = {
  title: '設定',
};

export default function page() {
  return (
    <PrimaryColumn hideHeader={true}>
      <ComingSoon />
    </PrimaryColumn>
  );
}
