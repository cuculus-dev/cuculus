import { useState } from 'react';
import { OutlinedInput } from '@mui/material';
import StepTemplate from '@/app/(plain)/(guest)/signup/_components/layouts/StepTemplate';
import { usePreSignUp } from '@/react-query/client/auth';

type Props = {
  step: number;
  maxStep: number;
  onSuccess: (email: string, displayName: string) => void;
};

export default function StepEmail({ onSuccess, step, maxStep }: Props) {
  const { mutate, error, isPending } = usePreSignUp((result, request) => {
    if (result) {
      onSuccess(request.email, request.name);
    }
  });

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <StepTemplate
      onSubmit={() => {
        mutate({ name: displayName, email });
      }}
      isMutating={isPending}
      error={error}
      step={step}
      maxStep={maxStep}
      title={'表示名とメールアドレスを入力してください'}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isPending}
        name="displayName"
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="displayName"
      />
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isPending}
        name="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@cuculus.jp"
      />
    </StepTemplate>
  );
}
