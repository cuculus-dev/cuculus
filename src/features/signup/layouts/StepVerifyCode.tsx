import { useState } from 'react';
import { OutlinedInput } from '@mui/material';
import StepTemplate from '@/features/signup/layouts/StepTemplate';
import { useVerifyCode } from '@/swr/client/auth';

type Props = {
  step: number;
  maxStep: number;
  email: string;
  onSuccess: (pinCode: string, email: string) => void;
};

export default function StepVerifyCode({
  onSuccess,
  email,
  step,
  maxStep,
}: Props) {
  const { trigger, error, isMutating } = useVerifyCode();

  const [pinCode, setPinCode] = useState('');

  return (
    <StepTemplate
      onSubmit={() => {
        void trigger({ code: pinCode, email }).then((value) => {
          if (value) {
            onSuccess(pinCode, email);
          }
        });
      }}
      isMutating={isMutating}
      error={error}
      step={step}
      maxStep={maxStep}
      title={`${email}に確認コードを送信しました。`}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isMutating}
        name="pinCode"
        type="text"
        onChange={(e) => setPinCode(e.target.value)}
        placeholder="PIN"
      />
    </StepTemplate>
  );
}
