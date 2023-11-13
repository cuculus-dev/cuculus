import PrimaryColumn from '@/components/layouts/PrimaryColumn';
import Timeline from '@/features/timeline/Timeline';

export default function page() {
  return (
    <main>
      <PrimaryColumn columnName={'ホーム'}>
        <Timeline />
      </PrimaryColumn>
    </main>
  );
}
