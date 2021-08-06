import catchAsyncErrors from "../utils/catchAsync";
import ErrorHandler from "../utils/errorHandler";
import { userService } from "../service/index";
import * as express from "express";
import { to } from "await-to-js";
import { verifyPassword, hashPassword, getRedirectUrl } from "../auth/utils";
import { login } from "../auth/strategies/jwt";
import {
  createUser,
  getUserByEmail,
  updateUser,
} from "../service/user.service";
import * as cors from "cors";
import { userController } from "../controllers/index";
import { sendMail } from "../utils/sendEmail";
const crypto = require("crypto");
const { promisify } = require("util");
import * as dotenv from "dotenv";
import User from "../model/userSchema";
dotenv.config();

export const resetPass = catchAsyncErrors(async (req, res) => {
  const token = (await promisify(crypto.randomBytes)(20)).toString("hex");
  const { email } = req.body;
  const [err, user]: any = await to(getUserByEmail(email));

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;

  updateUser(user.id, user);

  const resetEmail = {
    subject: "Node.js Password Reset",
    text: `
      You are receiving this because you (or someone else) have requested the reset of the password for your account.
      Please click on the following link, or paste this into your browser to complete the process:
      http://${req.headers.host}/reset/${token}
      If you did not request this, please ignore this email and your password will remain unchanged.
    `,
  };

  await sendMail(resetEmail);

  return res.status(201).json({
    success: true,
    data: "Mail Sent!",
  });
});

export const reset = catchAsyncErrors(async (req, res) => {
  /*const user = await User.findOne(
    (u) =>
      u.resetPasswordExpires > Date.now() &&
      crypto.timingSafeEqual(
        Buffer.from(u.resetPasswordToken),
        Buffer.from(req.params.token)
      )
  );*/
  const { email } = req.body;
  const token = req.params.token;
  const [err, user]: any = await to(getUserByEmail(email));

  if (
    user.resetPasswordExpires > Date.now() &&
    crypto.timingSafeEqual(
      Buffer.from(user.resetPasswordToken),
      Buffer.from(req.params.token)
    )
  ) {
    user.password = await hashPassword(req.body.password);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    updateUser(user.id, user);
    const resetEmail = {
      subject: "Your password has been changed",
      text: `
        This is a confirmation that the password for your account "${user.email}" has just been changed.
      `,
    };

    await sendMail(resetEmail);
    return res.status(201).json({
      success: true,
      data: "Password successfully changed!",
    });
  } else {
    return res.status(500).json({
      success: false,
      data: "Password reset token is invalid or has expired",
    });
  }
});

export const userLogin = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  const [err, user]: any = await to(getUserByEmail(email));

  const authenticationError = () => {
    return res
      .status(500)
      .json({ success: false, data: "Authentication error!" });
  };

  if (!(await verifyPassword(password, user.password))) {
    console.error("Passwords do not match");
    return authenticationError();
  }

  const [loginErr, token] = await to(login(req, user));

  if (loginErr) {
    console.error("Log in error", loginErr);
    return authenticationError();
  }

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true,
    })
    .json({
      success: true,
      data: getRedirectUrl(user.role),
    });
});

export const userRegister = catchAsyncErrors(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log(email);
  if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
    return res
      .status(500)
      .json({ success: false, data: "Enter a valid email address." });
  } else if (password.length < 5 || password.length > 20) {
    return res.status(500).json({
      success: false,
      data: "Password must be between 5 and 20 characters.",
    });
  }

  let [err, user]: any = await to(
    createUser({
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
      role,
    })
  );
  if (err) {
    return res.status(500).json({
      success: false,
      data: "Epost addresse er allerede tatt, vennligst velg en annen epost addresse!",
    });
  }

  return res.status(201).json({
    success: true,
    data: "Registrert!",
  });
});
