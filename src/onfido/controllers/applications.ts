import { Onfido, OnfidoApiError, Region } from "@onfido/api";
import { Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import {
  ApplicationRequestSchema,
  extractionsRequestSchema,
  performCheckRequestSchema,
  tokenRequestSchema,
  validateImageRequestSchema,
} from "../../shema/application";

const onfido = new Onfido({
  apiToken: `${process.env.ONFIDO_API}`,
  region: Region.EU,
});

//create application in onfido
export const createApplication = async (
  req: ValidatedRequest<ApplicationRequestSchema>,
  res: Response
) => {
  try {
    const { firstName, lastName, email, dob } = req.body;
    const applicant = await onfido.applicant.create({
      firstName,
      lastName,
      email,
      dob,
    });

    if (applicant) {
      return res.status(200).json(applicant);
    }
    return res.status(400).json({ message: "Uanble to create application" });
  } catch (e) {
    if (e instanceof OnfidoApiError) {
      console.log(e);
      console.log(e.type);
      console.log(e.isClientError());
      return e;
    }
    console.log(e);
  }
};

export const createSdkToken = async (
  req: ValidatedRequest<tokenRequestSchema>,
  res: Response
) => {
  try {
    const { applicantId } = req.query;
    const referrer: string = "http://*/*";
    const sdkToken = await onfido.sdkToken.generate({
      applicantId,
      referrer,
    });
    if (sdkToken) {
      return res.status(200).json({ sdkToken });
    }
    return res.status(400).json({ message: "Unable to create a token" });
  } catch (e) {
    if (e instanceof OnfidoApiError) {
      console.log(e);
      console.log(e.type);
      console.log(e.isClientError());
      return e;
    }
    console.log(e);
  }
};

export const exTractData = async (
  req: ValidatedRequest<extractionsRequestSchema>,
  res: Response
) => {
  try {
    const { documentId } = req.query;
    const extractedData = await onfido.autofill.perform(documentId);
    if (extractedData) {
      return res.status(200).json(exTractData);
    }
    return res
      .status(400)
      .json({ message: "There is something error in our end" });
  } catch (e) {
    if (e instanceof OnfidoApiError) {
      console.log(e);
      console.log(e.type);
      console.log(e.isClientError());
      return e;
    }
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const performCheck = async (
  req: ValidatedRequest<performCheckRequestSchema>,
  res: Response
) => {
  try {
    const { applicantId, reportNames, webhookIds } = req.body;
    const checkData = await onfido.check.create({
      applicantId,
      reportNames,
      webhookIds,
    });
    if (checkData) {
      return res.status(200).json();
    }
    return res.status(400).json({ message: "Unable to perform check" });
  } catch (e) {
    if (e instanceof OnfidoApiError) {
      console.log(e);
      console.log(e.type);
      console.log(e.isClientError());
      return e;
    }
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const validateImage = async (
  req: ValidatedRequest<validateImageRequestSchema>,
  res: Response
) => {
  const {
    file,
    type,
    applicantId,
    validateImageQuality,
    issuingCountry,
    side,
  } = req.body;
  try {
    const uploadedDocument = await onfido.document.upload({
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
  } catch (e) {
    if (e instanceof OnfidoApiError) {
      console.log(e);
      console.log(e.type);
      console.log(e.isClientError());
      return e;
    }
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
