import express from "express";
import dotenv from "dotenv";
import loginRouter from "./router/loginRouter.js";
import connectDB from "./config/connectDB.js";
import cors from "cors";
import registerError from "./error/registerError.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log("SERVER LISTENING ON PORT", process.env.PORT);
});

app.use("/api", loginRouter);
app.use(registerError);
