import PrimaryColumn from '@/components/layouts/PrimaryColumn';
import Timeline from '@/features/timeline/Timeline';
import ScrollRestoration from '@/components/providers/ScrollRestoration';

export default function page() {
  return (
    <main>
      <ScrollRestoration path={'/home'}>
        <PrimaryColumn columnName={'ホーム'}>
          <Timeline />
        </PrimaryColumn>
      </ScrollRestoration>
    </main>
  );
}
