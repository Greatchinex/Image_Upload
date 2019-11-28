import automl from "@google-cloud/automl";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const client = new automl.v1beta1.PredictionServiceClient({
  keyFilename: path.join(
    __dirname,
    "../../../image-search-259413-15b62d3892fb.json"
  )
});

// console.log(client);

const projectId = process.env.PROJECT_ID;
const computeRegion = process.env.COMPUTE_REGION;
const modelId = process.env.MODEL_ID;
const scoreThreshold = "0.5";

export default {
  // Get the image class name and class score of an image
  prediction: async (req, res, next) => {
    try {
      // Model path
      const modelFullId = client.modelPath(projectId, computeRegion, modelId);

      // Read the file content for prediction.
      const content = req.file.buffer;

      const params = {};

      // If there is a score threshold assign to d params object
      if (scoreThreshold) {
        params.score_threshold = scoreThreshold;
      }

      const payload = {};

      // Assign uploaded image to payload
      payload.image = { imageBytes: content };

      const [response] = await client.predict({
        name: modelFullId,
        payload: payload,
        params: params
      });

      // Empty arrays to push d className and classScore to...
      const className = [];
      const classScore = [];

      response.payload.forEach(result => className.push(result.displayName));

      response.payload.forEach(result =>
        classScore.push(result.classification.score)
      );

      // Response
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
