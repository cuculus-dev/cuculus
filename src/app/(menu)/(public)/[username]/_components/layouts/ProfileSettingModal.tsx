'use client';

import { Box, Dialog as MuiDialog, styled } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { AddAPhoto, Close, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@/app/_components/button/IconButton';
import HeaderImage from '@/app/(menu)/(public)/[username]/_components/elements/HeaderImage';
import UserIcon from '@/app/(menu)/(public)/[username]/_components/elements/UserIcon';
import Cropper, { Point } from 'react-easy-crop';

const Dialog = styled(MuiDialog)`
  .MuiDialog-paper {
    margin: 0;
    max-width: 100vw;
    max-height: 100vh;

    ${({ theme }) => theme.breakpoints.down('tablet')} {
      border-radius: 0;
    }
  }
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100vw;
    height: 100vh;
  }
`;

const Header = styled('div')`
  display: flex;
  align-items: center;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.grey[100]};
  border-width: 0;
  border-bottom-width: 1px;
  color: ${({ theme }) => theme.palette.grey[800]};
  min-height: 50px;
  padding: 0 8px;
  gap: 12px;
`;

const Content = styled('div')`
  max-width: 598px;
  width: 100vw;
`;

const CropContainer = styled('div')`
  position: relative;

  height: calc(100vh - 50px);

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    max-height: 600px;
  }
`;

const Flex = styled(Box)`
  display: flex;
  flex-wrap: nowrap;
`;

const HFlex = styled(Flex)`
  flex-direction: row;
`;

function ProfileImageCrop({
  src,
  onClose,
}: {
  src: string | undefined;
  onClose: () => void;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <Dialog open={src != undefined}>
      <Container>
        <Header>
          <IconButton aria-label="戻る" onClick={onClose}>
            <ArrowBack />
          </IconButton>
          <span style={{ fontWeight: 'bold' }}>メディアを編集</span>
        </Header>
        <Content>
          {/* TODO ここでCrop出来るようにする */}
          <CropContainer>
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              showGrid={false}
            />
          </CropContainer>
        </Content>
      </Container>
    </Dialog>
  );
}

export default function ProfileSettingModal({ open: init }: { open: boolean }) {
  const [open, setOpen] = useState(init);

  const [iconSrc, setIconSrc] = useState<string | undefined>(undefined);

  function handleClose() {
    setOpen(false);
  }

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setIconSrc(reader.result?.toString() || undefined),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  return (
    <>
      <ProfileImageCrop
        src={iconSrc}
        onClose={() => {
          setOpen(true);
          setIconSrc(undefined);
        }}
      />
      <Dialog open={open && !iconSrc}>
        <Container>
          <Header>
            <IconButton aria-label="閉じる" onClick={handleClose}>
              <Close />
            </IconButton>
            <span style={{ fontWeight: 'bold' }}>プロフィールを編集</span>
          </Header>
          <Content>
            <HeaderImage />
            <div style={{ padding: '12px 16px 16px' }}>
              <HFlex>
                {/* TODO アイコン */}
                <UserIcon
                  src={
                    'https://media.develop.cuculus.jp/profile_images/d691e7ec-5622-42a1-92c6-1f89bff87acd.png'
                  }
                  alt={'プロフィール画像'}
                />
                <UserIcon
                  sx={{
                    position: 'absolute',
                    bgcolor: 'transparent',
                  }}
                >
                  <label htmlFor="icon-upload-button">
                    <input
                      id="icon-upload-button"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <IconButton
                      size={'large'}
                      aria-label="アイコン画像アップロード"
                      component="span"
                    >
                      <AddAPhoto />
                    </IconButton>
                  </label>
                </UserIcon>
              </HFlex>
            </div>
          </Content>
        </Container>
      </Dialog>
    </>
  );
}
