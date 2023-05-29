import * as Joi from "joi";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { FileLike } from "@onfido/api";

//CREATE APPLICATION
export interface ApplicationRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
  };
}

export const applicationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  dob: Joi.string().isoDate().required(),
});

//GENERATE TOKEN
export interface tokenRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    applicantId: string;
  };
}
export const tokenSchema = Joi.object({
  applicantId: Joi.string().required(),
});
//data extractions
export interface extractionsRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    documentId: string;
  };
}

export const extractionSchema = Joi.object({
  documentId: Joi.string().required(),
});

//PERFORM CHECK
export interface performCheckRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    applicantId: string;
    reportNames: Array<string>;
    webhookIds: Array<string>;
  };
}

export const performCheckSchema = Joi.object({
  documentId: Joi.string().required(),
  reportNames: Joi.array().items(Joi.string()).required(),
  webhookIds: Joi.array().items(Joi.string()).required(),
});

//validate image
export interface validateImageRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    type: string;
    file: FileLike;
    issuingCountry: string;
    side: string;
    applicantId: string;
    validateImageQuality: boolean | null | undefined;
  };
}

export const validateImageSchema = Joi.object({
  type: Joi.boolean().required(),
  issuingCountry: Joi.string().required(),
  side: Joi.string().required(),
  applicantId: Joi.string().required(),
  validateImageQuality: Joi.boolean().required(),
});
