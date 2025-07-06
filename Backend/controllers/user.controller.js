const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const blackListTokenModel = require("../models/blackListToken.model");
module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await userService.createUser({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = user.generateAuthToken();

    res.status(200).cookie("token", token).json({ token, user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getUserProfile = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token = req.headers?.authorization?.split(" ")[1] || req.cookies.token;
  await blackListTokenModel.create({ token });
  return res.status(200).json({ message: "Logged out successfully" });
};
