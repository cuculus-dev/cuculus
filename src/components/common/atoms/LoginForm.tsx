import FormButton from '@/components/common/atoms/FormButton';
import LinkButton from '@/components/common/atoms/LinkButton';
import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const StyledLogin = styled('div')`
  display: grid;
  grid-template-columns: 2fr 3fr;
  align-items: center;
  min-height: 100vh;
`;

export default function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (
      (id === 'test@example.com' || id === 'aaaa') &&
      password === 'password'
    ) {
      setError(null);
      console.log('成功');
    } else {
      setError('失敗');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledLogin>
      <div>ログイン</div>
      <div>メールアドレス、パスワードを入力してください。</div>
      <form>
        {/* 入力欄 */}
        <input
          id="id"
          type="text"
          placeholder="ユーザー名またeメールアドレス"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'hidden' : 'open'}
          </button>
        </div>
        <LinkButton href={'/'}>Back</LinkButton>
        <LinkButton href={'/login'} onClick={handleLogin}>
          Next
        </LinkButton>
      </form>
      {error && <div>{error}</div>}
    </StyledLogin>
  );
}
