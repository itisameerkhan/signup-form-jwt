import bcrypt from "bcryptjs";
import Register from "../model/registerModel.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All fields required");
    }

    const isMatch = await Register.findOne({ email: email });
    if (isMatch !== null) {
      throw new Error("Resource Already Existed");
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const userData = {
      username,
      email,
      password: hashPassword,
    };

    const data = await Register.create(userData);

    const jwtToken = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // res.cookie("jwt", jwtToken, { httpOnly: true });

    res.status(200).json({
      success: true,
      message: "user created successfully",
      data: data,
      jwtToken: jwtToken,
    });
  } catch (err) {
    next(err);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await Register.findOne({ email: email });
    if (!data) {
      throw new Error("Email not Found!");
    }
    const hashedPassword = await bcrypt.compare(password, data.password);
    if (!hashedPassword) {
      throw new Error("Invalid Password");
    }

    const jwtToken = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "login successfull",
      data: data,
      jwtToken: jwtToken,
    });
  } catch (err) {
    next(err);
  }
};

export const authenticateToken = async (req, res, next) => {
  try {
    const jwtToken = req.headers["authorization"].split(" ")[1];
    const jwtData = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const mongoData = await Register.findOne({ email: jwtData.data.email });
    res.json({
      success: true,
      message: "authenication sucessfull",
      data: jwtData.data,
    });
  } catch (err) {
    next(err);
  }
};
