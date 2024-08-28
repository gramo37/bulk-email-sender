import { Request, Response } from 'express';
import { sendMail } from '../utils';
import { template } from '../views/template1';
import { IMailBody } from '../validations/mailServiceValidations';

export async function mailService(req: Request<{}, {}, IMailBody>, res: Response) {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: 'Invalid data format' });
    }

    const results = [];
    let allSent = true;

    for (const item of data) {
        const { to, subject, contentData } = item;
        const html = template({ ...contentData });
        const isMailSent = await sendMail(to, subject, html);
        if (!isMailSent) allSent = false;
        results.push({
            to,
            status: isMailSent ? "Success" : "Fail"
        })
    }

    if (allSent) {
        res.status(200).json({
            message: 'All email sent successfully',
            results
        })
    } else {
        res.status(500).json({
            message: "Some emails failed",
            results
        })
    }
}