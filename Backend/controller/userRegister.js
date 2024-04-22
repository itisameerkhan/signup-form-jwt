import bcrypt from "bcryptjs";
import Register from "../model/registerModel.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "12h" });
};

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

    const jwtToken = generateAccessToken(userData);

    // const jwtToken = jwt.sign({ userData }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    const jwtRefreshToken = jwt.sign(userData, process.env.JWT_REFRESH_SECRET);

    const data = await Register.create({
      username,
      email: email,
      password: hashPassword,
      refreshToken: jwtRefreshToken,
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

    const userData = {
      email,
      password,
    };
    const jwtToken = generateAccessToken(userData);

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

export const refreshToken = async (req, res) => {
  console.log("req.body /refreshtoken", req.body);
  const { username, email, password } = req.body;
  // res.json(mongoData);
  const jwtToken = generateAccessToken({ username, email, password });

  res.json({
    success: true,
    jwtToken: jwtToken,
  });
};
