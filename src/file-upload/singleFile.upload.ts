import fs from "fs";
import multer, { FileFilterCallback, MulterError } from "multer";
import { Request, RequestHandler } from "express";
import generateUniqueFilename from "../utils/generateUniqueFilename";

const SIZE_LIMIT = 1024 * 1024 * 2; // 2MB

type storageOptions = {
  path: string;
  filename: string;
};

type filterOptions = {
  mimetype?: string;
  mimetypeRegex?: RegExp;
  mimetypes?: string[];
  sizeLimit?: number;
};

export default function singleFileUpload(
  fieldName: string,
  storageOpt: storageOptions,
  filterOpt: filterOptions
): RequestHandler {
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      if (!fs.existsSync(storageOpt.path)) {
        fs.mkdirSync(storageOpt.path, { recursive: true });
      }

      cb(null, storageOpt.path);
    },
    filename: function (_req, file, cb) {
      const fileExtension = file.originalname.split(".")[1];
      const filename = generateUniqueFilename(fileExtension, storageOpt.filename);
      cb(null, filename);
    },
  });

  const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const matchFunc = () => {
      if (filterOpt.mimetype) return file.mimetype === filterOpt.mimetype;
      if (filterOpt.mimetypes) return filterOpt.mimetypes.includes(file.mimetype);
      if (filterOpt.mimetypeRegex) return filterOpt.mimetypeRegex.test(file.mimetype);
      return false;
    };

    if (matchFunc()) cb(null, true);
    else cb(null, false);
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: filterOpt.sizeLimit ?? SIZE_LIMIT },
  }).single(fieldName);
}
