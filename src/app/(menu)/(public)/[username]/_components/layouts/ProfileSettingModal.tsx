'use client';

import {
  Alert,
  Box,
  Dialog as MuiDialog,
  Slider,
  Snackbar,
  styled,
  TextField,
} from '@mui/material';
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
import { useProfileUpdate } from '@/swr/client/account';
import CapsuleLoadingButton from '@/app/_components/button/CapsuleLoadingButton';

const HEADER_HEIGHT = '50px';
const SLIDER_HEIGHT = '50px';

const Dialog = styled(MuiDialog)`
  .MuiDialog-paper {
    width: 100vw;
    max-height: 100dvh;
    margin: 0;

    ${({ theme }) => theme.breakpoints.up('tablet')} {
      max-width: 598px;
    }

    ${({ theme }) => theme.breakpoints.down('tablet')} {
      border-radius: 0;
      height: 100dvh;
    }
  }
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;
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
  height: calc(100dvh - ${HEADER_HEIGHT} - ${SLIDER_HEIGHT});

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    max-height: 600px;
  }

  .crop-area {
    border-radius: 9999px;
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

const VFlex = styled(Flex)`
  flex-direction: column;
`;

/**
 * アイコンを編集するモーダル
 * @param src
 * @param onClose
 * @param onComplete
 * @constructor
 */
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
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // 適用処理
  const handleApply = useCallback(async () => {
    if (!croppedAreaPixels || !src) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels, 400);
      onComplete(croppedImage);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  }, [croppedAreaPixels, onComplete, src]);

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
            aria-label="適用"
            disabled={isProcessing}
            onClick={() => {
              void handleApply();
            }}
          >
            適用
          </CapsuleButton>
        </Header>
        <div>
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
        </div>
      </Container>
    </Dialog>
  );
}

/**
 * プロフィールを編集するモーダル
 * @param init
 * @constructor
 */
export default function ProfileSettingModal({
  open,
  onClose,
  src: initSrc,
  displayName: initDisplayName,
  bio: initBio,
}: {
  open: boolean;
  onClose: () => void;
  src?: string;
  displayName: string;
  bio: string;
}) {
  const [src, setSrc] = useState<string | undefined>(initSrc);
  const [blob, setBlob] = useState<Blob | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string>(initDisplayName);
  const [bio, setBio] = useState<string>(initBio);
  const [iconSrc, setIconSrc] = useState<string | undefined>(undefined);
  const { trigger, isMutating } = useProfileUpdate();

  const [errorMessage, setErrorMesssage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    onClose();
  };

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
          setIconSrc(undefined);
        }}
        onComplete={(blob) => {
          const croppedImageUrl = URL.createObjectURL(blob);
          setSrc(croppedImageUrl);
          setBlob(blob);
          setIconSrc(undefined);
        }}
      />
      <Dialog open={open && !iconSrc} onClose={handleClose}>
        <Container>
          <Header>
            <IconButton aria-label="閉じる" onClick={handleClose}>
              <Close />
            </IconButton>
            <span style={{ fontWeight: 'bold' }}>プロフィールを編集</span>
            <div style={{ marginLeft: 'auto' }} />
            <CapsuleLoadingButton
              variant="contained"
              aria-label="保存"
              onClick={() => {
                const request = {
                  bio: initBio !== bio ? bio : undefined,
                  name:
                    initDisplayName !== displayName ? displayName : undefined,
                  profileImage: blob,
                };
                const isAllUndefined = Object.values(request).every(
                  (value) => value === undefined,
                );
                if (isAllUndefined) {
                  handleClose();
                } else {
                  void trigger(request)
                    .then(() => {
                      setSuccessMessage('プロフィールを更新しました。');
                      handleClose();
                    })
                    .catch(() => {
                      setErrorMesssage('プロフィールの更新に失敗しました。');
                    });
                }
              }}
              loading={isMutating}
            >
              保存
            </CapsuleLoadingButton>
          </Header>
          <div>
            <HeaderImage />
            <div style={{ padding: '12px 16px 16px' }}>
              <HFlex>
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
              <VFlex sx={{ padding: '12px 16px', gap: '24px' }}>
                <TextField
                  label="名前"
                  variant="outlined"
                  aria-label="表示名"
                  name="displayName"
                  size="small"
                  value={displayName}
                  onChange={(event) => {
                    setDisplayName(event.target.value);
                  }}
                />
                <TextField
                  label="自己紹介"
                  variant="outlined"
                  aria-label="自己紹介"
                  name="bio"
                  multiline
                  rows={4}
                  size="small"
                  value={bio}
                  onChange={(event) => {
                    setBio(event.target.value);
                  }}
                />
              </VFlex>
            </div>
          </div>
        </Container>
      </Dialog>

      <Snackbar
        open={!!errorMessage.length}
        onClose={() => setErrorMesssage('')}
        autoHideDuration={2_000}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={!!successMessage.length}
        onClose={() => setSuccessMessage('')}
        autoHideDuration={2_000}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </>
  );
}
