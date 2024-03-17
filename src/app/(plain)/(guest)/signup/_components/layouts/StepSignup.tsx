import { useState } from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import StepTemplate from '@/app/(plain)/(guest)/signup/_components/layouts/StepTemplate';
import { useSignUp } from '@/react-query/client/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type Props = {
  step: number;
  maxStep: number;
  email: string;
  displayName: string;
  pinCode: string;
  invitationCode?: string;
  onSuccess?: () => void;
};

export default function StepSignup({
  onSuccess,
  step,
  maxStep,
  pinCode,
  invitationCode,
  email,
}: Props) {
  const { mutate, error, isPending } = useSignUp((result) => {
    if (result && onSuccess) {
      onSuccess();
    }
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <StepTemplate
      onSubmit={() => {
        mutate({
          username,
          password,
          email,
          code: pinCode,
          invitationCode,
        });
      }}
      isMutating={isPending}
      error={error}
      step={step}
      maxStep={maxStep}
      title={'使用するユーザーIDとパスワードを入力してください'}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isPending}
        name="username"
        autoComplete="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isPending}
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
    </StepTemplate>
  );
}
