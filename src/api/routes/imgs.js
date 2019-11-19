import express from "express";

import imgs from "../controllers/imgs";
import { uploads } from "../../services/fileUpload";
import { sendUploadToGCS } from "../../services/fileUpload";

const router = express.Router();

router.post(
  "/imageupload",
  uploads.single("image"),
  sendUploadToGCS,
  imgs.imgUpload
);

export { router as imgsRouter };
