"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const validator = (0, express_joi_validation_1.createValidator)();
const router = express_1.default.Router();
const applications_1 = require("../controllers/applications");
const application_1 = require("../../shema/application");
const application_2 = require("../../shema/application");
router
    .route("/create")
    .post(validator.body(application_1.applicationSchema), applications_1.createApplication);
router.route("/sdk_token").get(validator.query(application_2.tokenSchema), applications_1.createSdkToken);
router.route("/extract").get(validator.body(application_1.extractionSchema), applications_1.exTractData);
router.route("/check").post(validator.body(application_1.performCheckSchema), applications_1.performCheck);
router
    .route("/validateImage")
    .post(validator.body(application_1.validateImageSchema), applications_1.validateImage);
exports.default = router;
