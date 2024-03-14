import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import { Metadata } from 'next';
import PrivacyPolicy from '@/app/(menu)/(public)/[privacy]/privacy';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
};

export default function page() {
  return (
    <PrimaryColumn columnName={'プライバシーポリシー'}>
      <PrivacyPolicy />
    </PrimaryColumn>
  );
}
