import PrimaryColumn from '@/components/PrimaryColumn';
import Timeline from '@/components/timeline/Timeline';
import ScrollRestoration from '@/components/provider/ScrollRestoration';

export default function page() {
  return (
    <main>
      <ScrollRestoration key={'/home'}>
        <PrimaryColumn columnName={'ホーム'}>
          <Timeline />
        </PrimaryColumn>
      </ScrollRestoration>
    </main>
  );
}
