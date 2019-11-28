import express from "express";

import imgPredict from "../controllers/imgPrediction";
import { uploads } from "../../services/fileUpload";
import { sendUploadToGCS } from "../../services/fileUpload";

const router = express.Router();

router.post(
  "/predict",
  uploads.single("image"),
  // sendUploadToGCS,
  imgPredict.prediction
);

export { router as predictRouter };
