import ComingSoon from '@/app/(menu)/_components/main/ComingSoon';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';

export default function page() {
  return (
    <PrimaryColumn hideHeader={true}>
      <ComingSoon />
    </PrimaryColumn>
  );
}
