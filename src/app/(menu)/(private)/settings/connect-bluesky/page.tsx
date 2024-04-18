import { Metadata } from 'next';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import ConnectBluesky from '@/app/(menu)/(private)/settings/connect-bluesky/_components/ConnectBluesky';

export const metadata: Metadata = {
  title: 'Bluesky連携',
};

export default function page() {
  return (
    <PrimaryColumn columnName={'Bluesky連携'} showBack={true}>
      <ConnectBluesky />
    </PrimaryColumn>
  );
}
