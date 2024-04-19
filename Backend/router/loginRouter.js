import express from "express";
import { userRegister, userLogin, authenticateToken } from "../controller/userRegister.js";

const router = express.Router();

router.route("/signup").post(userRegister);
router.route("/login").post(userLogin);
router.route("/auth").get(authenticateToken)

export default router;