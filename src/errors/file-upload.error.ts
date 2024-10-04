import { MulterError } from "multer";

export default function isFileUploadError(err: any): boolean {
  return err instanceof MulterError;
}
