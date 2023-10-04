'use client';

import { useState } from 'react';
import { useSystem } from '@/swr/client/system';
import StepInvitationCode from '@/app/(plain)/(guest)/signup/_components/steps/StepInvitationCode';
import StepEmail from '@/app/(plain)/(guest)/signup/_components/steps/StepEmail';
import StepVerifyCode from '@/app/(plain)/(guest)/signup/_components/steps/StepVerifyCode';
import StepSignup from '@/app/(plain)/(guest)/signup/_components/steps/StepSignup';

export default function SignUpForm() {
  // 招待限定
  const { data: systemSettings } = useSystem();
  // 1 => 招待コード入力, 2 => 表示名とメールアドレス入力, 3 => 確認コード入力, 4 => パスワード入力とユーザー名入力
  const [step, setStep] = useState(1);

  const [invitationCode, setInvitationCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [pinCode, setPinCode] = useState('');

  if (!systemSettings) {
    return <></>;
  }

  const maxStep = 4 - (systemSettings.invitationOnly ? 0 : 1);

  return (
    <>
      {step === 1 - (systemSettings.invitationOnly ? 0 : 1) && (
        <StepInvitationCode
          onSuccess={(code) => {
            setInvitationCode(code);
            setStep(2);
          }}
          step={step}
          maxStep={maxStep}
        />
      )}
      {step === 2 - (systemSettings.invitationOnly ? 0 : 1) && (
        <StepEmail
          onSuccess={(email, displayName) => {
            setEmail(email);
            setDisplayName(displayName);
            setStep(3);
          }}
          step={step}
          maxStep={maxStep}
        />
      )}
      {step === 3 - (systemSettings.invitationOnly ? 0 : 1) && (
        <StepVerifyCode
          email={email}
          onSuccess={(pinCode) => {
            setPinCode(pinCode);
            setStep(4);
          }}
          step={step}
          maxStep={maxStep}
        />
      )}
      {step === 4 - (systemSettings.invitationOnly ? 0 : 1) && (
        <StepSignup
          step={step}
          maxStep={maxStep}
          email={email}
          displayName={displayName}
          pinCode={pinCode}
          invitationCode={invitationCode}
          onSuccess={() => {
            // TODO /homeに移動させる
          }}
        />
      )}
    </>
  );
}
