import catchAsyncErrors from "../utils/catchAsync";
//const { body, validationResult } = require("express-validator");
import ErrorHandler from "../utils/errorHandler";
import { apartmentService } from "../service/index";

export const listApartments = catchAsyncErrors(async (req, res, next) => {
  const listApartments = await apartmentService.listApartments();
  res.status(200).json({ success: true, data: listApartments });
});

export const create = catchAsyncErrors(async (req, res, next) => {
  const article = await apartmentService.createApartments(req.body);
  res.status(201).json({ success: true, data: article });
});

export const get = catchAsyncErrors(async (req, res, next) => {
  const apartment = await apartmentService.getApartmentById(req.params.id);
  if (!apartment) {
    return next(
      new ErrorHandler(`Can't find apartment with ID ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data: apartment });
});

export const update = catchAsyncErrors(async (req, res, next) => {
  let apartment = await apartmentService.getApartmentById(req.params.id);
  if (!apartment) {
    return next(
      new ErrorHandler(`Can't find apartment with ID ${req.params.id}`, 404)
    );
  }
  apartment = await apartmentService.updateApartment(req.params.id, req.body);
  res.status(201).json({ success: true, data: apartment });
});

export const remove = catchAsyncErrors(async (req, res, next) => {
  let apartment = await apartmentService.getApartmentById(req.params.id);
  if (!apartment) {
    return next(
      new ErrorHandler(`Can't find apartment with ID ${req.params.id}`, 404)
    );
  }
  await apartmentService.removeApartment(req.params.id);
  res.status(204).json({});
});
