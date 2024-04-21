import jwt from "jsonwebtoken";
import Register from "../model/registerModel.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const jwtToken = req.headers["authorization"].split(" ")[1];
    const jwtData = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("jwtData from /auth", jwtData);
    const mongoData = await Register.findOne({ email: jwtData.email });
    res.json({
      success: true,
      message: "authenication sucessfull",
      data: mongoData,
    });
  } catch (err) {
    next(err);
  }
};

