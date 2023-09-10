import LinkButton from '@/components/common/atoms/LinkButton';

export default function LoginForm() {
  return (
    <form>
      <div>サインイン</div>
      <div>アカウント</div>
      {/* 入力欄 */}
      <input type="text" placeholder="ユーザー名またはeメールアドレス"></input>
      <div>
        <input type="text" placeholder="パスワード"></input>
        {/* リンク */}
        {/* 更新画面へのリンク */}
        <LinkButton href={'/'}>忘れた</LinkButton>
      </div>
      {/*入力を破棄してTopへ*/}
      <LinkButton href={'/'}>戻る</LinkButton>
      {/* ここで情報送信 */}
      <LinkButton href={'/'}>サインイン</LinkButton>
    </form>
  );
}
