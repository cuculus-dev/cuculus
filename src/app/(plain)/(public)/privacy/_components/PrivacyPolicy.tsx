'use client';

import { styled } from '@mui/material';
import LinkButton from '@/app/_components/button/LinkButton';
import { MuseoModerno } from 'next/font/google';

const museoModerno = MuseoModerno({ subsets: ['latin'], weight: ['700'] });

const Root = styled('div')`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  max-width: 100%;
  height: 100%;
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  margin: 0 auto;
`;

const Title = styled('div')`
  font-weight: bold;
  font-size: 2.25rem;
  line-height: 2.5rem;
`;

const ButtonAlea = styled('div')`
  display: flex;
  justify-content: center;
  align-content: center;
`;
export default function NotFound() {
  return (
    <Root>
      <Container>
        <div>
          <h3>1. はじめに</h3>
          <p>
            Cuculus（以下、当サイト）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
          </p>

          <h3>2. 収集する情報</h3>
          <p>当サイトでは、以下の情報を収集することがあります。</p>
          <ul>
            <li>
              ユーザーが提供する情報（例：名前、メールアドレス、プロフィール情報）
            </li>
            <li>利用状況に関する情報（例：ログデータ、アクセスIPアドレス）</li>
          </ul>

          <h3>3. 情報の利用目的</h3>
          <p>収集した情報は以下の目的で利用されます。</p>
          <ul>
            <li>当サイトの提供・改善</li>
            <li>ユーザーサポート</li>
            <li>不正行為の防止</li>
            <li>新機能やサービスの案内</li>
          </ul>

          <h3>4. 情報の共有と開示</h3>
          <p>
            当サイトは、以下の場合を除き、ユーザーの個人情報を第三者に開示または共有しません。
          </p>
          <ul>
            <li>ユーザーの同意がある場合</li>
            <li>法的要求に基づく場合</li>
            <li>ユーザーの権利や安全を守るため必要な場合</li>
          </ul>

          <h3>5. 情報の保護</h3>
          <p>
            当サイトは、収集した情報の安全を確保するために、適切な物理的、技術的、組織的対策を講じます。
          </p>

          <h3>6. ユーザーの権利</h3>
          <p>ユーザーは、自己の個人情報に関して、以下の権利を有します。</p>
          <ul>
            <li>アクセス権</li>
            <li>訂正権</li>
            <li>削除権</li>
            <li>処理制限の権利</li>
          </ul>

          <h3>7. プライバシーポリシーの変更</h3>
          <p>
            本ポリシーは、必要に応じて更新されることがあります。本ポリシーの内容は、ユーザーに通知することなく、変更することができるものとします。
          </p>

          <h3>8. お問い合わせ</h3>
          <p>
            本プライバシーポリシーに関するご質問や懸念がある場合は、こちらよりご連絡ください。
          </p>
        </div>
      </Container>
      <ButtonAlea>
        <LinkButton href={'/'} variant={'outlined'} aria-label="トップに戻る">
          トップに戻る
        </LinkButton>
      </ButtonAlea>
    </Root>
  );
}
