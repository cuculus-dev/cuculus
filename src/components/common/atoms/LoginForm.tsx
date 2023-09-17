import FormButton from '@/components/common/atoms/FormButton';
import LinkButton from '@/components/common/atoms/LinkButton';
import { Grid, styled } from '@mui/material';

const StyledLogin = styled('div');

type FormInputProps = {
  id: string;
  password: string;
};

export default function LoginForm() {
  return (
    <form>
      {/* タイトル */}
      <div>サインイン</div>
      <div>アカウント</div>
      {/* 入力欄 */}
      <input id="id" type="text" placeholder="ユーザー名またeメールアドレス" />
      <div>
        <input id="password" type="password" placeholder="パスワード" />
        {/* リンク */}
        {/* 更新画面へのリンク */}
        {/* <LinkButton href={'/'}>忘れた</LinkButton> */}
      </div>
      {/*入力を保持せずしてTopへ*/}
      <LinkButton href={'/'}>戻る</LinkButton>
      {/* 入力情報送信 */}
      <FormButton href={'/login'} type="submit">
        サインイン
      </FormButton>
    </form>
  );
}
