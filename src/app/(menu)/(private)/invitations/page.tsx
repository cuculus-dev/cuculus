import Invitations from '@/app/(menu)/(private)/invitations/_components/Invitations';
import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';

export default function page() {
  return (
    <PrimaryColumn hideHeader={true}>
      <Invitations />
    </PrimaryColumn>
  );
}
