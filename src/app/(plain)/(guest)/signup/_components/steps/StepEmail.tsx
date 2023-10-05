import { useState } from 'react';
import { OutlinedInput } from '@mui/material';
import StepTemplate from '@/app/(plain)/(guest)/signup/_components/steps/StepTemplate';
import { usePreSignUp } from '@/swr/client/auth';

type Props = {
  step: number;
  maxStep: number;
  onSuccess: (email: string, displayName: string) => void;
};

export default function StepEmail({ onSuccess, step, maxStep }: Props) {
  const { trigger, error, isMutating } = usePreSignUp();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <StepTemplate
      onSubmit={() => {
        void trigger({ name: displayName, email }).then((value) => {
          if (value) {
            onSuccess(email, displayName);
          }
        });
      }}
      isMutating={isMutating}
      error={error}
      step={step}
      maxStep={maxStep}
      title={'表示名とメールアドレスを入力してください'}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isMutating}
        name="displayName"
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="displayName"
      />
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isMutating}
        name="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@cuculus.jp"
      />
    </StepTemplate>
  );
}
