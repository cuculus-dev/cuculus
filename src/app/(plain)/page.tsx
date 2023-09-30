import LinkButton from '@/components/common/atoms/LinkButton';
import Top from '@/app/(plain)/_components/Top';

export default function page() {
  return (
    <main>
      <Top />
      <LinkButton href={'/login'}>Login</LinkButton>
    </main>
  );
}
