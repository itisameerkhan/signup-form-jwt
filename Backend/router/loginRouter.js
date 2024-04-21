import express from "express";
import { userRegister, userLogin, refreshToken } from "../controller/userRegister.js";
import { authenticateToken } from "../middlewares/tokenMiddleware.js";

const router = express.Router();

router.route("/signup").post(userRegister);
router.route("/login").post(userLogin);
router.route("/auth").get(authenticateToken);
router.route("/refreshtoken").post(refreshToken);

export default router;
