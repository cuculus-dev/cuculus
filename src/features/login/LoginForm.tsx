'use client';

import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  styled,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@/swr/client/auth';

const StyledForm = styled('form')`
  display: flex;
  max-width: 500px;
  padding: 20px;
  gap: 40px;
  flex-direction: column;
`;

const Bottom = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function LoginForm() {
  const router = useRouter();
  const { isMutating, trigger, error } = useSignIn();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault();
        void trigger({ username, password }).then(() => {
          router.push('/home');
        });
      }}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isMutating}
        name="username"
        autoComplete="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isMutating}
        name="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {isMutating && <LinearProgress />}
      {!isMutating && error && <Alert severity="error">{error.message}</Alert>}
      <Bottom>
        <Button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <div style={{ marginLeft: 'auto' }} />
        <Button type="submit" disabled={isMutating}>
          Next
        </Button>
      </Bottom>
    </StyledForm>
  );
}
