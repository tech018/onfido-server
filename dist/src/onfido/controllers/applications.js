"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImage = exports.performCheck = exports.exTractData = exports.createSdkToken = exports.createApplication = void 0;
const api_1 = require("@onfido/api");
const onfido = new api_1.Onfido({
    apiToken: `${process.env.ONFIDO_API}`,
    region: api_1.Region.EU,
});
//create application in onfido
const createApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, dob } = req.body;
        const applicant = yield onfido.applicant.create({
            firstName,
            lastName,
            email,
            dob,
        });
        if (applicant) {
            return res.status(200).json(applicant);
        }
        return res.status(400).json({ message: "Uanble to create application" });
    }
    catch (e) {
        if (e instanceof api_1.OnfidoApiError) {
            console.log(e);
            console.log(e.type);
            console.log(e.isClientError());
            return e;
        }
        console.log(e);
    }
});
exports.createApplication = createApplication;
const createSdkToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicantId } = req.query;
        const referrer = "http://*/*";
        const sdkToken = yield onfido.sdkToken.generate({
            applicantId,
            referrer,
        });
        if (sdkToken) {
            return res.status(200).json(sdkToken);
        }
        return res.status(400).json({ message: "Unable to create a token" });
    }
    catch (e) {
        if (e instanceof api_1.OnfidoApiError) {
            console.log(e);
            console.log(e.type);
            console.log(e.isClientError());
            return e;
        }
        console.log(e);
    }
});
exports.createSdkToken = createSdkToken;
const exTractData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentId } = req.query;
        const extractedData = yield onfido.autofill.perform(documentId);
        if (extractedData) {
            return res.status(200).json(exports.exTractData);
        }
        return res
            .status(400)
            .json({ message: "There is something error in our end" });
    }
    catch (e) {
        if (e instanceof api_1.OnfidoApiError) {
            console.log(e);
            console.log(e.type);
            console.log(e.isClientError());
            return e;
        }
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.exTractData = exTractData;
const performCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicantId, reportNames, webhookIds } = req.body;
        const checkData = yield onfido.check.create({
            applicantId,
            reportNames,
            webhookIds,
        });
        if (checkData) {
            return res.status(200).json();
        }
        return res.status(400).json({ message: "Unable to perform check" });
    }
    catch (e) {
        if (e instanceof api_1.OnfidoApiError) {
            console.log(e);
            console.log(e.type);
            console.log(e.isClientError());
            return e;
        }
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.performCheck = performCheck;
const validateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file, type, applicantId, validateImageQuality, issuingCountry, side, } = req.body;
    try {
        const uploadedDocument = yield onfido.document.upload({
            file,
            type,
            applicantId,
            validateImageQuality,
            issuingCountry,
            side,
        });
        if (uploadedDocument) {
            return res.status(200).json(uploadedDocument);
        }
        return res.status(400).json({ message: "Unable to perform this task" });
    }
    catch (e) {
        if (e instanceof api_1.OnfidoApiError) {
            console.log(e);
            console.log(e.type);
            console.log(e.isClientError());
            return e;
        }
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.validateImage = validateImage;
