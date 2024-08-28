import { requestSchema } from "../validations/mailServiceValidations";
import { Request, Response, NextFunction } from 'express';

export const emailValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = requestSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Invalid request data', details: error.details });
    }
    next()
}