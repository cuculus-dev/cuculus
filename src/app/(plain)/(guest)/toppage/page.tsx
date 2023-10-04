'use client';

import Image from 'next/image';
import Footer from '@/app/(plain)/(guest)/toppage/footer/Footer';
import LinkButton from '@/components/common/atoms/LinkButton';

export default function toppage() {
  return (
    <div>
      <LinkButton href={''}>アカウントを作成</LinkButton>
      <LinkButton href={''}>ログイン</LinkButton>
      <Footer />
    </div>
  );
}
