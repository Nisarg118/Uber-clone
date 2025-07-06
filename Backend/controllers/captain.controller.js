const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("Registering captain:", req.body);

  const { fullname, email, password, vehicle } = req.body;
  const isCaptainExists = await captainModel.findOne({ email });
  if (isCaptainExists) {
    return res.status(400).json({ error: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    fullname,
    email,
    password: hashedPassword,
    vehicle,
  });

  const token = await captain.generateAuthToken();
  return res.status(201).cookie("token", token).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  console.log("Logging in captain:", req.body);

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain || !(await captain.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = await captain.generateAuthToken();
  return res.status(200).cookie("token", token).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res) => {
  const captain = req.user;
  if (!captain) {
    return res.status(404).json({ error: "Captain not found" });
  }
  return res.status(200).json({ captain });
};

module.exports.logoutCaptain = async (req, res) => {
  res.clearCookie("token");
  const token = req.headers?.authorization?.split(" ")[1] || req.cookies.token;
  await blackListTokenModel.create({ token });
  return res.status(200).json({ message: "Logged out successfully" });
};
