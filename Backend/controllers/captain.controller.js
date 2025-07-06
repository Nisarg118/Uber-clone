const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");

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
