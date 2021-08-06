import * as cors from "cors";
import * as expressRouter from "express";
import * as passport from "passport";
import { utils } from "../auth";
import { apartmentController } from "../controllers/index";
import { ROLES } from "../utils/roles";
const router = expressRouter.Router();

router.post("/add", passport.authenticate("jwt", {failureRedirect: "/loginuser"}), cors(), apartmentController.create);

router.post("/edit/:id", passport.authenticate("jwt", {failureRedirect: "/loginuser"}), cors(), apartmentController.update);

router.get("/getlist", apartmentController.listApartments);

router.get("/:id",  apartmentController.get);

router.put("/:id", passport.authenticate("jwt", {failureRedirect: "/loginuser"}), cors(), apartmentController.update);

router.delete("/:id", passport.authenticate("jwt", {failureRedirect: "/loginuser"}), cors(), apartmentController.remove);

export default router;
