import * as express from "express";
import { authController } from "../controllers/index";
import { userController } from "../controllers/index";

const router = express.Router();

router.get("/getlistUsers", userController.listUsers);

router.get("/me", userController.get);

export default router;
