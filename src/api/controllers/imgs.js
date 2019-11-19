import vision from "@google-cloud/vision";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(
    __dirname,
    "../../../image-search-259413-15b62d3892fb.json"
  )
});

export default {
  // Get labels after Image upload
  imgUpload: async (req, res, next) => {
    try {
      const label_array = [];

      // Performs label detection on the image file
      const [result] = await client.labelDetection(req.file.buffer);
      const labels = result.labelAnnotations;

      labels.forEach(label => label_array.push(label.description));

      console.log(result);

      // Response
      res.status(201).json({ labels: label_array });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
};
