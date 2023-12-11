'use client';

import CapsuleButton from '@/app/_components/button/CapsuleButton';
import ProfileSettingModal from '@/app/(menu)/(public)/[username]/_components/layouts/ProfileSettingModal';
import { useState } from 'react';

type Props = {
  src: string;
  displayName: string;
  bio: string;
};

export function EditProfileButton({ src, displayName, bio }: Props) {
  const text = 'プロフィールを編集';
  const [open, setOpen] = useState<boolean>(false);

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
        bio={bio}
        displayName={displayName}
        src={src}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
