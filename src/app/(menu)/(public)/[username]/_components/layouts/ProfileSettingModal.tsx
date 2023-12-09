'use client';

import { Box, Dialog as MuiDialog, Slider, styled } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  AddAPhoto,
  Close,
  ArrowBack,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import { IconButton } from '@/app/_components/button/IconButton';
import HeaderImage from '@/app/(menu)/(public)/[username]/_components/elements/HeaderImage';
import UserIcon from '@/app/(menu)/(public)/[username]/_components/elements/UserIcon';
import Cropper, { Area, Point } from 'react-easy-crop';
import CapsuleButton from '@/app/_components/button/CapsuleButton';
import { getCroppedImg } from '@/app/(menu)/(public)/[username]/_utils/cropImage';

const HEADER_HEIGHT = '50px';
const SLIDER_HEIGHT = '50px';

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
  height: ${HEADER_HEIGHT};
  padding: 0 8px;
  gap: 12px;
`;

const Content = styled('div')`
  max-width: 598px;
  width: 100vw;
`;

const SliderContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${SLIDER_HEIGHT};
  padding: 0 30px;
  gap: 10px;
`;

const CropContainer = styled('div')`
  position: relative;
  height: calc(100vh - ${HEADER_HEIGHT} - ${SLIDER_HEIGHT});

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    max-height: 600px;
  }

  .crop-area {
    border: 3px solid #00a0ff;
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
  onComplete,
}: {
  src: string | undefined;
  onClose: () => void;
  onComplete: (blob: Blob) => void;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleSave = useCallback(async () => {
    if (!croppedAreaPixels || !src) return;

    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels, 400);
      onComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <Dialog open={src != undefined}>
      <Container>
        <Header>
          <IconButton aria-label="戻る" onClick={onClose}>
            <ArrowBack />
          </IconButton>
          <span style={{ fontWeight: 'bold' }}>メディアを編集</span>
          <div style={{ marginLeft: 'auto' }} />
          <CapsuleButton
            variant="contained"
            aria-label="保存"
            onClick={() => {
              // FIXME 可能ならここは非同期で投げっぱなしではなく、ちゃんと処理を待機させたい
              void handleSave();
            }}
          >
            保存
          </CapsuleButton>
        </Header>
        <Content>
          {/* TODO ここでCrop出来るようにする */}
          <CropContainer>
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              classes={{
                cropAreaClassName: 'crop-area',
              }}
              onCropComplete={(_, area) => {
                setCroppedAreaPixels(area);
              }}
              showGrid={false}
            />
          </CropContainer>
          <SliderContainer>
            <ZoomOut />
            <Slider
              aria-label="ズーム"
              value={zoom}
              onChange={(_, newValue) => {
                setZoom(newValue as number);
              }}
              min={1}
              max={3}
              step={0.1}
            />
            <ZoomIn />
          </SliderContainer>
        </Content>
      </Container>
    </Dialog>
  );
}

export default function ProfileSettingModal({ open: init }: { open: boolean }) {
  const [open, setOpen] = useState(init);

  const [src, setSrc] = useState(
    'https://media.develop.cuculus.jp/profile_images/d691e7ec-5622-42a1-92c6-1f89bff87acd.png',
  );
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
        onComplete={(blob) => {
          const croppedImageUrl = URL.createObjectURL(blob);
          setSrc(croppedImageUrl);
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
                <UserIcon src={src} alt={'プロフィール画像'} />
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
                      accept="image/png, image/jpeg"
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
