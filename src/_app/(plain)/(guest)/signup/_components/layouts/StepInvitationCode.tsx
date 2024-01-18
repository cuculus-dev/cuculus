import { useInvitationVerify } from '@/swr/client/invitations';
import { useState } from 'react';
import { OutlinedInput } from '@mui/material';
import StepTemplate from '@/_app/(plain)/(guest)/signup/_components/layouts/StepTemplate';

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
  const { trigger, error, isMutating } = useInvitationVerify();
  const [invitationCode, setInvitationCode] = useState('');

  return (
    <StepTemplate
      onSubmit={() => {
        void trigger({ invitationCode }).then((value) => {
          if (value) {
            onSuccess(invitationCode);
          }
        });
      }}
      isMutating={isMutating}
      error={error}
      step={step}
      maxStep={maxStep}
      title={'招待コードを入力してください'}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isMutating}
        name="invitationCode"
        type="text"
        onChange={(e) => setInvitationCode(e.target.value)}
        placeholder="invitationCode"
      />
    </StepTemplate>
  );
}
