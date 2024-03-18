import { useInvitationVerify } from '@/react-query/client/invitations';
import { useState } from 'react';
import { OutlinedInput } from '@mui/material';
import StepTemplate from '@/app/(plain)/(guest)/signup/_components/layouts/StepTemplate';

type Props = {
  step: number;
  maxStep: number;
  onSuccess: (invitationCode: string) => void;
};

export default function StepInvitationCode({
  onSuccess,
  step,
  maxStep,
}: Props) {
  const { mutate, error, isPending } = useInvitationVerify(
    (result, request) => {
      if (result) {
        onSuccess(request.invitationCode);
      }
    },
  );
  const [invitationCode, setInvitationCode] = useState('');

  return (
    <StepTemplate
      onSubmit={() => {
        mutate({ invitationCode });
      }}
      isMutating={isPending}
      error={error}
      step={step}
      maxStep={maxStep}
      title={'招待コードを入力してください'}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isPending}
        name="invitationCode"
        type="text"
        onChange={(e) => setInvitationCode(e.target.value)}
        placeholder="invitationCode"
      />
    </StepTemplate>
  );
}
