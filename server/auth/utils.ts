import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import User from "../model/userSchema";
import { ROLES } from "../utils";

const setup = () => {
  passport.serializeUser((user: any, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
};

const signToken = (user) => {
  return jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: 604800,
  });
};

const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password was not provided");
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate, actual) => {
  return await bcrypt.compare(candidate, actual);
};

const checkIsInRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.redirect("/loginuser");
  }

  const hasRole = roles.find((role) => req.user.role === role);
  if (!hasRole) {
    return res.redirect("/loginuser");
  }

  return next();
};

const getRedirectUrl = (role) => {
  switch (role) {
    case ROLES.Admin:
      return "/admin-dashboard";
    case ROLES.Customer:
      return "/customer-dashboard";
    default:
      return "/";
  }
};

export {
  setup,
  signToken,
  hashPassword,
  verifyPassword,
  checkIsInRole,
  getRedirectUrl,
};
