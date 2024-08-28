import express from 'express';
import { mailService } from '../services/mailService';
import { emailValidator } from '../middlewares/emailValidator';

const router = express.Router();

router.post("/send-email", emailValidator, mailService)

export default router;