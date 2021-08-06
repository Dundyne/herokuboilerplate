import catchAsyncErrors from "../utils/catchAsync";
//import * as utils from "../auth/utils"
//const { body, validationResult } = require("express-validator");
import jwt_decode from "jwt-decode";
import ErrorHandler from "../utils/errorHandler";
import { userService } from "../service/index";
import { utils } from "../auth";
import passport from "passport";
import userSchema from "../model/userSchema";
import { request } from "express";

export const listUsers = catchAsyncErrors(async (req, res, next) => {
  const listUsers = await userService.listUsers();
  res.status(200).json({ success: true, data: listUsers });
});

export const create = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

export const get = catchAsyncErrors(async (req, res, next) => {
  const cookie = req.cookies["jwt"];
  if (!cookie) {
    res.status(401).json({ success: false });
  }
  const userjwt = jwt_decode(cookie) as any;
  const user = await userService.getUserById(userjwt.data._id);
  if (!user) {
    return next(
      new ErrorHandler(`Can't find apartment with ID ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data: user });
});

var get_cookies = function (request) {
  var cookies = {};
  request.headers &&
    request.headers.cookie.split(";").forEach(function (cookie) {
      var parts = cookie.match(/(.?)=(.)$/);
      cookies[parts[1].trim()] = (parts[2] || "").trim();
    });
  return cookies;
};

export const me = catchAsyncErrors(async (req, res, next) => {
  //const user = await userService.getUserById(req.params.id);
  //var decoded = jwt_decode(req.cookie);
  console.log(req.cookies["jwt"]);
  const cookie = req.cookies["jwt"];
  if (!cookie) {
    res.status(401).json({ success: false });
  }
  const user = jwt_decode(cookie) as any;
  console.log(user);
  const now = new Date().getTime();

  //Sjekk expiry date av token må fikses
  if (user.exp * 1000 < now) {
    res.status(401).json({ success: false });
  }

  res.status(200).json({ success: true, data: user.data });
});

export const update = catchAsyncErrors(async (req, res, next) => {
  let user = await userService.getUserById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`Can't find apartment with ID ${req.params.id}`, 404)
    );
  }
  user = await userService.updateUser(req.params.id, req.body);
  res.status(201).json({ success: true, data: user });
});

export const remove = catchAsyncErrors(async (req, res, next) => {
  let user = await userService.getUserById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`Can't find apartment with ID ${req.params.id}`, 404)
    );
  }
  await userService.removeUser(req.params.id);
  res.status(204).json({});
});
