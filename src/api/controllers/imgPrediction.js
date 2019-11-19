import automl from "@google-cloud/automl";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const client = new automl.PredictionServiceClient({
  keyFilename: path.join(
    __dirname,
    "../../../image-search-259413-15b62d3892fb.json"
  )
});
const projectId = process.env.PROJECT_ID;
const computeRegion = "us-central1";
const modelId = process.env.MODEL_ID;
// const filePath = `local text file path of content to be classified, e.g. "./resources/test.txt"`;
const scoreThreshold = "0.5";
const filePath = path.join(__dirname, "../../resources/lion.jpeg");

export default {
  prediction: async (req, res, next) => {
    try {
      // Model path
      const modelFullId = client.modelPath(projectId, computeRegion, modelId);

      // Read the file content for prediction.
      const content = fs.readFileSync(filePath, "base64");

      const params = {};

      if (scoreThreshold) {
        params.score_threshold = scoreThreshold;
      }

      const payload = {};
      payload.image = { imageBytes: content };

      const [response] = await client.predict({
        name: modelFullId,
        payload: payload,
        params: params
      });

      const className = [];
      const classScore = [];

      response.payload.forEach(result => className.push(result.displayName));

      response.payload.forEach(result =>
        classScore.push(result.classification.score)
      );

      console.log(className);
      console.log(classScore);

      res.status(200).json({
        Predicted_class_name: className,
        Predicted_class_score: classScore
      });
    } catch (err) {
      throw err;
      //   return res.status(500).json({ msg: err });
    }
  }
};
