'use client';

import { useState } from 'react';
import { useSystem } from '@/swr/client/system';
import StepInvitationCode from '@/app/(plain)/(guest)/signup/_components/layouts/StepInvitationCode';
import StepEmail from '@/app/(plain)/(guest)/signup/_components/layouts/StepEmail';
import StepVerifyCode from '@/app/(plain)/(guest)/signup/_components/layouts/StepVerifyCode';
import StepSignup from '@/app/(plain)/(guest)/signup/_components/layouts/StepSignup';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();

  // 招待限定
  const { data: systemSettings } = useSystem();

  // 0 => 招待コード入力, 1 => 表示名とメールアドレス入力, 2 => 確認コード入力, 3 => パスワード入力とユーザー名入力
  const [step, setStep] = useState(0);

  const [invitationCode, setInvitationCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [pinCode, setPinCode] = useState('');

  if (!systemSettings) {
    return <></>;
  }

  // 招待コードの有無で表示上のステップを変更する
  const maxStep = systemSettings.invitationOnly ? 4 : 3;
  const addStep = systemSettings.invitationOnly ? 1 : 0;

  // 招待コード入力をスキップする
  if (systemSettings.invitationOnly === false && step === 0) {
    setStep(1);
  }

  return (
    <>
      {step === 0 && (
        <StepInvitationCode
          onSuccess={(code) => {
            setInvitationCode(code);
            setStep(1);
          }}
          step={step + addStep}
          maxStep={maxStep}
        />
      )}
      {step === 1 && (
        <StepEmail
          onSuccess={(email, displayName) => {
            setEmail(email);
            setDisplayName(displayName);
            setStep(2);
          }}
          step={step + addStep}
          maxStep={maxStep}
        />
      )}
      {step === 2 && (
        <StepVerifyCode
          email={email}
          onSuccess={(pinCode) => {
            setPinCode(pinCode);
            setStep(3);
          }}
          step={step + addStep}
          maxStep={maxStep}
        />
      )}
      {step === 3 && (
        <StepSignup
          step={step + addStep}
          maxStep={maxStep}
          email={email}
          displayName={displayName}
          pinCode={pinCode}
          invitationCode={invitationCode}
          onSuccess={() => {
            router.push('/home');
          }}
        />
      )}
    </>
  );
}
