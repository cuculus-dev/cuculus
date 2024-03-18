'use client';

import CapsuleButton from '@/app/_components/button/CapsuleButton';
import ProfileSettingModal from '@/app/(menu)/(public)/[username]/_components/layouts/ProfileSettingModal';
import { useState } from 'react';
import { useProfile } from '@/react-query/client/account';

export function EditProfileButton() {
  const text = 'プロフィールを編集';
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useProfile();

  if (!data) {
    return <></>;
  }

  return (
    <>
      <CapsuleButton
        aria-label={text}
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
        variant="outlined"
      >
        {text}
      </CapsuleButton>
      <ProfileSettingModal
        open={open}
        bio={data.bio}
        displayName={data.name}
        src={data.profileImageUrl}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
