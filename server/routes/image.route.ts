import * as cors from "cors";
import * as expressRouter from "express";
import * as multer from "multer";
import * as dotenv from "dotenv";
const path = require('path');
dotenv.config;
const router = expressRouter.Router();
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoURI = process.env.MONGODB_URI!;
const crypto = require("crypto");
//Jeg lar denne være da det bare er en funksjon

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./react-app/public/uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
//const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};
//const upload = multer({ storage: storage, fileFilter: fileFilter });
*/

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        //const filename = buf.toString('hex') + path.extname(file.originalname);
        const filename = file.originalname;
        const fileInfo = { filename: filename, bucketName: "uploads" };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });


router.post("/uploadimage", upload.array("image", 10), (req, res, next) =>  {
  try {
    console.log(req.files.length);
    
    return res.status(200).json({
      success: true,
      message: '${req.files.length} files uploaded successfully',
      
    });
  } catch (error) {
    console.error(error);
  }
});





export default router;
