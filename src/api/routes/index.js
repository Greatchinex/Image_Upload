import { imgsRouter } from "./imgs";
import { predictRouter } from "./imgPrediction";

export default app => {
  app.use(imgsRouter);
  app.use(predictRouter);
};
