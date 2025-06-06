'use server';

import { verifyLoginSession } from '@/libs/login/manage-login';
import { writeFile, mkdir } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  fomrData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(fomrData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = fomrData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  const uploadMaxSize =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

  if (file.size > uploadMaxSize) {
    return makeResult({ error: 'Arquivo muito grande.' });
  }

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imágem inválida' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads';
  const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);

  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const imgServerUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
  const url = `${imgServerUrl}/${uniqueImageName}`;

  return makeResult({ url });
}
