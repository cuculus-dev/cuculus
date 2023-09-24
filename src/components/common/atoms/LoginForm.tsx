import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const StyledLogin = styled('div')`
  display: grid;
  grid-template-columns: 2fr 3fr;
  align-items: center;
  background-size: cover;
  min-height: 100vh;
`;

const Title = styled('div')`
  text-align: right;
  background-color: #e4e4e4;
  padding-right: 50px;
`;

const StyledTitle = styled('h1')`
  font-size: 48px;
`;

const StyledForm = styled('div')`
  padding-left: 200px;
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <StyledLogin>
      <Title>
        <StyledTitle>ログイン</StyledTitle>
        <span>メールアドレス、パスワードを入力してください。</span>
      </Title>
      <form>
        <StyledForm>
          <div>
            <FormControl
              sx={{ mb: 5, width: '50ch' }}
              variant="outlined"
              size="small"
            >
              <OutlinedInput
                id="id"
                type="text"
                onChange={(e) => setId(e.target.value)}
                placeholder="mail address"
              />
            </FormControl>
          </div>
          <div>
            <FormControl
              sx={{ mb: 5, width: '50ch' }}
              variant="outlined"
              size="small"
            >
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div>
            <Link href={'/'}>Back</Link>
            <Link href={'/login'} onClick={handleLogin}>
              Next
            </Link>
          </div>
          <div>{error && <>{error}</>}</div>
        </StyledForm>
      </form>
    </StyledLogin>
  );
}
