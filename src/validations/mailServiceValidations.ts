import Joi from 'joi';

const contentDataSchema = Joi.object({
    company_name: Joi.string().min(1).required(),
    role: Joi.string().min(1).required(),
    source: Joi.string().min(1).required(),
    initial_name: Joi.string().min(1).required()
});

const emailSchema = Joi.object({
    to: Joi.string().email().required(),
    subject: Joi.string().min(1).required(),
    contentData: contentDataSchema.required(),
});

export const requestSchema = Joi.object({
    data: Joi.array().items(emailSchema).required(),
});

export interface IContentData {
    company_name: string;
    role: string;
    source: string;
    initial_name: string;
}

export interface IEmailData {
    to: string;
    subject: string;
    contentData: IContentData;
}

export interface IMailBody {
    data: IEmailData[];
}
