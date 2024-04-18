'use client';

import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  Snackbar,
  styled,
} from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useConnectBsky } from '@/swr/client/bluesky';

const Root = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 20px;

  gap: 40px;
`;

/**
 * FIXME デザインは仮です
 * @constructor
 */
export default function ConnectBluesky() {
  const { isMutating, trigger, error } = useConnectBsky();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Root>
      <Link href={'https://bsky.app/settings/app-passwords'}>
        アプリパスワードの発行はこちら
      </Link>
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        name="handle"
        autoComplete="off"
        disabled={isMutating}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="example.bsky.social"
      />
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isMutating}
        name="app-password"
        autoComplete="off"
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="アプリパスワード"
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
      <Button
        disabled={isMutating}
        variant="contained"
        sx={{ maxWidth: '200px' }}
        onClick={() => {
          void trigger({
            connectAtProtocol: {
              id: username,
              appPassword: password,
            },
          }).then((result) => {
            if (result) {
              setSuccessMessage('連携しました。');
            }
          });
        }}
      >
        連携
      </Button>
      <Snackbar
        open={!!successMessage.length}
        onClose={() => setSuccessMessage('')}
        autoHideDuration={2_000}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </Root>
  );
}
