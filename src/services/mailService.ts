import { Request, Response } from "express";
import { sendMail } from "../utils";
import { template } from "../views/template1";
import { IMailBody } from "../validations/mailServiceValidations";

export async function mailService(
  req: Request<{}, {}, IMailBody>,
  res: Response
) {
  const { data } = req.body;

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const results = [];
  let allSent = true;
  const promises: Array<
    Promise<{
      to: string;
      status: boolean;
    }>
  > = [];

  for (const item of data) {
    const { to, contentData } = item;
    const { html, subject } = template({ ...contentData });
    promises.push(sendMail(to, subject, html));
  }

  const res2 = await Promise.all(promises);

  for (const item of res2) {
    if (!item.status) allSent = false;
    results.push({
      to: item.to,
      status: item.status ? "Success" : "Fail",
    });
  }

  if (allSent) {
    res.status(200).json({
      message: "All email sent successfully",
      results,
    });
  } else {
    res.status(500).json({
      message: "Some emails failed",
      results,
    });
  }
}
