import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  await fs.promises.unlink(filename);
};
