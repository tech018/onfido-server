import express from "express";
import { createValidator } from "express-joi-validation";
const validator = createValidator();
const router = express.Router();

import {
  createApplication,
  createSdkToken,
  exTractData,
  performCheck,
  validateImage,
} from "../controllers/applications";
import {
  applicationSchema,
  extractionSchema,
  performCheckSchema,
  validateImageSchema,
} from "../../shema/application";
import { tokenSchema } from "../../shema/application";

router
  .route("/create")
  .post(validator.body(applicationSchema), createApplication);

router.route("/sdk_token").post(validator.body(tokenSchema), createSdkToken);

router.route("/extract").get(validator.body(extractionSchema), exTractData);

router.route("/check").post(validator.body(performCheckSchema), performCheck);

router
  .route("/validateImage")
  .post(validator.body(validateImageSchema), validateImage);

export default router;
