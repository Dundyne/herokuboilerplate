import email from "./routes/email.route";
import apartment from "./routes/apartment.route";
import uploadimage from "./routes/image.route";
import loginroute from "./routes/login.route";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as helmet from "helmet";
import * as compression from "compression";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import connectDatabase from "./config/db";
const mongoose = require("mongoose");
var Grid = require("gridfs-stream");
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
//const swaggerUi = require("swagger-ui-express");
//const swaggerDocument = require("../swagger.json");
import { ROLES } from "./utils";
import { initialiseAuthentication, utils } from "./auth";
import middlewareCount from "./utils/middlewareCount";
import { isValidObjectId } from "mongoose";
dotenv.config();
class App {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(cookieParser());
    this.express.use(passport.initialize());
    this.express.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
    this.express.use(compression());
    //router.use("/api-docs", swaggerUi.serve);
    //router.get("/api-docs", swaggerUi.setup(swaggerDocument));
    this.express.use(
      express.static(path.resolve(__dirname, "../react-app/build"))
    );

    connectDatabase();

    let conn = mongoose.connection;
    let gfs;
    let gridFSBucket;
    conn.once("open", () => {
      //initialize our stream
      gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
      });
      gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
      });
      gfs = Grid(conn.db, mongoose.mongo);

      gfs.collection("uploads");
    });
   

this.express.get(process.env.API_key + 'multer/images/:filename', cors(), (req, res) => {

  gfs.exist({filename:'' + req.params.filename, root:'uploads'}, function(err, found)
  {
    if(found)
    {
      res.status(200).json({success:true, message: "Images has been found."})
    }
    else {
      res.status(404).json({success:false, message: "Image has not been found."})
    }
  }
  )
});


this.express.delete(process.env.API_KEY +'multer/images/del/:id',  cors(), (req, res) => {
  
  gfs.exist({filename: req.body, root:'uploads'}, function (err, found) {
   if(found){
    
          gfs.remove({filename:'' + req.params.id, root:"uploads"}, function (err, gridStore) {
             if (err) console.log(err);
             res.status(200).json({sucess:true, message: "Image has been deleted."})
             });
   }
   else{
      console.log('does not exist',err);
     res.status(404).json({success:false, message:"Images has not been found"})
   }
   });
  });
  
    router.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.resolve(__dirname, "../react-app/build", "index.html"));
    });
    initialiseAuthentication(this.express);

    /* //Only allows authenticated users to access page but uses Next.js instead of CRA
    this.express.get(
      "/pdf",
      passport.authenticate("jwt", { failureRedirect: "/loginuser" }),
      utils.checkIsInRole(ROLES.Admin),
      (req, res) => {
        res.redirect("/loginuser");
      }
    ); */
    //this.express.use(middlewareCount);
    this.express.use("/", router);
    this.express.use("/contact/", cors(), email);
    this.express.use(process.env.API_KEY + "auth/", cors(), authRoutes);

    //Example usage of authentication
    /*this.express.use(
      process.env.API_KEY + "apartments/",
      passport.authenticate("jwt", { failureRedirect: "/loginuser" }),
      utils.checkIsInRole(ROLES.Admin),
      cors(),
      apartment
    );
    */
    //Example usage of authentication

    this.express.use(process.env.API_KEY + "apartments/", cors(), apartment);
    this.express.use(
      process.env.API_KEY + "login/",
      passport.authenticate("jwt", { failureRedirect: "/loginuser" }),
      cors(),
      loginroute
    );
    this.express.use(process.env.API_KEY + "multer/", passport.authenticate("jwt", {failureRedirect: "/loginuser"}), cors(), uploadimage);

    this.express.get(
      process.env.API_KEY + "files/:filename",
      cors(),
      (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
          if (!file || file.length === 0) {
            return res.status(404).json({ err: "No file exists" });
          }
          if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/png"
          ) {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
          } else {
            res.status(404).json({ err: "Not an image" });
          }
        });
      }
    );

    this.express.get(process.env.API_KEY + "files", cors(), (req, res) => {
      gfs.files.find().toArray((err, files) => {
        //check if files exist
        if (!files || files.length == 0) {
          return res.status(404).json({
            err: "No files exist",
          });
        }
        // files exist
        return res.json(files);
      });
    });

    this.express.get(
      process.env.API_KEY + "image/:filename",
      cors(),
      (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
          //check if files exist
          if (!file || file.length == 0) {
            return res.status(404).json({
              err: "No files exist",
            });
          }
          //check if image
          if (
            file.contentType === "image/jpeg" ||
            file.contentType === "img/png"
          ) {
            //read output to browser
            const readStream = gridFSBucket.openDownloadStreamByName(
              file.filename
            );
            readStream.pipe(res);
            console.log("file found");
          } else {
            res.status(404).json({
              err: "Not an image",
            });
          }
        });
      }
    );

    this.express.post("/api/world", (req, res) => {
      console.log(req.body);
      res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`
      );
    });
  }
}

export default new App().express;
