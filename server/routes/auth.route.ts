import * as cors from "cors";
import * as express from "express";
import * as passport from "passport";
import { authController } from "../controllers/index";
import { userController } from "../controllers/index";

const router = express.Router();

router.post("/login", authController.userLogin);
router.post("/forgot", authController.resetPass);
router.post("/reset/:token", authController.reset);
//router.post("/register", passport.authenticate("jwt", {failureRedirect: "/loginuser"}), cors(), authController.userRegister, );
router.post("/register", cors(), authController.userRegister, );
router.get("/getlistUsers", passport.authenticate("jwt", {failureRedirect: "/loginuser"}), cors(), userController.listUsers);
//router.get("/:id", userController.get);
router.get("/me", passport.authenticate("jwt", {failureRedirect: "/loginuser"}), cors(), userController.me);
//router.get("/logout", userController.logout);

router.get("/logout", function (req, res) {
  req.logOut();
  delete req.session;
  res.cookie("jwt", { expires: new Date(0) });
  res.clearCookie("jwt");
  res.redirect("/loginuser");
  console.log(req);
});

export default router;
