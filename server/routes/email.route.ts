import * as express from "express";
import { emailController } from "../controllers/index";
const router = express.Router();

router.post("/sendmail", emailController.sendMails);

export default router;
