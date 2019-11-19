import { Storage } from "@google-cloud/storage";
import multer from "multer";
import path from "path";

const gcp = new Storage({
  keyFilename: path.join(
    __dirname,
    "../../image-search-259413-15b62d3892fb.json"
  ),
  projectId: "image-search-259413"
});

const my_bucket = gcp.bucket("chinex_bucket");

export const uploads = multer({
  storage: multer.MemoryStorage
});

export const getPublicUrl = filename => {
  return `https://storage.cloud.google.com/chinex_bucket/${filename}`;
};

export const sendUploadToGCS = (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = my_bucket.file(gcsname);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      },
      resumable: false
    });

    stream.on("error", err => {
      req.file.cloudStorageError = err;
      next(err);
    });

    stream.on("finish", () => {
      req.file.cloudStorageObject = gcsname;
      file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
      });
    });

    stream.end(req.file.buffer);
  } catch (err) {
    throw err;
  }
};
