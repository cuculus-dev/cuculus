import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import PrivacyPolicy from '@/app/(plain)/(public)/privacy/_components/PrivacyPolicy';
import { Metadata } from 'next';

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
