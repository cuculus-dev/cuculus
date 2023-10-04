'use client';

import { Alert, Button, OutlinedInput, styled } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@/swr/client/auth';
import { useSystem } from '@/swr/client/system';
import { useInvitationVerify } from '@/swr/client/invitations';

const Form = styled('form')`
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

function FormTemplate({
  onSubmit,
  disabled,
  children,
}: {
  onSubmit: () => void;
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      {children}
      <Bottom>
        <div style={{ marginLeft: 'auto' }} />
        <Button type="submit" disabled={disabled}>
          Next
        </Button>
      </Bottom>
    </Form>
  );
}

function StepInvitationCode({ onNext }: { onNext: () => void }) {
  const { trigger, error, isMutating } = useInvitationVerify();
  const [input, setInput] = useState('');

  return (
    <FormTemplate
      onSubmit={() => {
        void trigger({ invitationCode: input }).then((value) => {
          if (value) {
            onNext();
          }
        });
      }}
      disabled={isMutating}
    >
      <OutlinedInput
        sx={{ width: '100%' }}
        size="small"
        disabled={isMutating}
        name="invitationCode"
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="invitationCode"
      />
      {!isMutating && error && <Alert severity="error">{error.message}</Alert>}
    </FormTemplate>
  );
}

export default function SignUpForm() {
  const router = useRouter();

  // 招待限定
  const { data: systemSettings } = useSystem();
  const [step, setStep] = useState(0); // 0 => 招待コード入力, 1 => 表示名とメールアドレス入力, 2 => 確認コード入力, 3 => パスワード入力とユーザー名入力

  const [invitationCode, setInvitationCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ステップ0 => もし招待コード入力が必須だった場合は、ここで入力させる（Cuculusは現在、招待制となっております。）
  // ステップ1 => 表示名とメールアドレスを入力させて、そのまま確認コード入力に飛ばす
  // ステップ2 => 確認コードを入力させて、そのままパスワード入力とユーザー名入力に飛ばす

  const { isMutating, trigger, error } = useSignIn();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  if (!systemSettings) {
    return <></>;
  }

  return (
    <>
      <StepInvitationCode
        onNext={() => {
          console.log('onNext');
        }}
      />
    </>
  );
}
