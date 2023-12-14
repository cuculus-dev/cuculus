import { Area } from 'react-easy-crop';

export async function getCroppedImg(
  imageSrc: string,
  area: Area,
  maxSize: number,
): Promise<Blob> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // トリミングされた画像のサイズを取得
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const cropWidth = area.width * scaleX;
  const cropHeight = area.height * scaleY;

  // キャンバスのサイズを設定
  const aspectRatio = cropWidth / cropHeight;
  if (cropWidth > maxSize) {
    canvas.width = maxSize;
    canvas.height = maxSize / aspectRatio;
  } else if (cropHeight > maxSize) {
    canvas.height = maxSize;
    canvas.width = maxSize * aspectRatio;
  } else {
    canvas.width = cropWidth;
    canvas.height = cropHeight;
  }

  // トリミングされた画像をキャンバスに描画
  if (ctx) {
    ctx.drawImage(
      image,
      area.x * scaleX,
      area.y * scaleY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }

  // キャンバスの内容をBlobとして取得 (PNG形式)
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(
          new Error(
            'Failed to create blob from canvas. Canvas might be empty.',
          ),
        );
        return;
      }
      resolve(blob);
    }, 'image/png');
  });
}
