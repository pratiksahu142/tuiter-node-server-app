import express from 'express'
import cors from 'cors'
import session from "express-session";
import mongoose from "mongoose";
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";

mongoose.connect("mongodb+srv://pratik:vO0HCot51O1w5u8j@cluster0.5gu9nsu.mongodb.net/tuiter?retryWrites=true&w=majority").then(
    console.log('Mongo connected')
);
const app = express()
app.use(cors({
    credentials: true,
    origin: "https://a6--celadon-crepe-ab1bc3.netlify.app"
  })
);
app.use(express.json())
app.use(
    session({
          secret: "any string",
          resave: false,
          saveUninitialized: true,
        }
    )
);
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);