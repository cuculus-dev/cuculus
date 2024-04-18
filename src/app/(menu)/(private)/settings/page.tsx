import { Metadata } from 'next';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import Settings from '@/app/(menu)/(private)/settings/_components/Settings';

export const metadata: Metadata = {
  title: '設定',
};

export default function page() {
  return (
    <PrimaryColumn columnName={'設定'}>
      <Settings />
    </PrimaryColumn>
  );
}
