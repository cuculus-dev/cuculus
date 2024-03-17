import { useState } from 'react';
import { OutlinedInput } from '@mui/material';
import StepTemplate from '@/app/(plain)/(guest)/signup/_components/layouts/StepTemplate';
import { useVerifyCode } from '@/react-query/client/auth';

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
  const { mutate, error, isPending } = useVerifyCode((result, request) => {
    if (result) {
      onSuccess(request.code, request.email);
    }
  });

  const [pinCode, setPinCode] = useState('');

  return (
    <StepTemplate
      onSubmit={() => {
        mutate({ code: pinCode, email });
      }}
      isMutating={isPending}
      error={error}
      step={step}
      maxStep={maxStep}
      title={`${email}に確認コードを送信しました。`}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isPending}
        name="pinCode"
        type="text"
        onChange={(e) => setPinCode(e.target.value)}
        placeholder="PIN"
      />
    </StepTemplate>
  );
}
