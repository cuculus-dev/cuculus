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
  display: flex;
`;

const StyledLeftColumn = styled('div')`
  text-align: right;
  display: flex;
  flex-direction: column;
  background-color: #e4e4e4;
  padding-right: 50px;
  min-height: 100vh;
  justify-content: center;
  flex: 2;
`;

const StyledTitle = styled('h1')`
  font-size: 48px;
  font-family: inter;
  margin-block-start: 0%;
  margin-block-end: 2%;
`;

const StyledText = styled('span')`
  font-size: 16px;
  font-family: inter;
`;

const StyledRightColumn = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 3;
  padding-left: 200px;
  min-height: 100vh;
  justify-content: center;
`;

const StyledForm = styled('form')`
  width: fit-content;
  height: fit-content;
`;

const StyledLink = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
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
      <StyledLeftColumn>
        <StyledTitle>ログイン</StyledTitle>
        <StyledText>メールアドレス、パスワードを入力してください。</StyledText>
      </StyledLeftColumn>
      <StyledRightColumn>
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
                placeholder="mail address or id"
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
          <StyledLink>
            <div>
              <Link href={'/'}>Back</Link>
            </div>
            <div style={{ marginLeft: 'auto' }} />
            <Link href={'/login'} onClick={handleLogin}>
              Next
            </Link>
          </StyledLink>
          <div>{error && <>{error}</>}</div>
        </StyledForm>
      </StyledRightColumn>
    </StyledLogin>
  );
}
