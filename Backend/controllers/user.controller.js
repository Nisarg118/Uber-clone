const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");

module.exports.registerUser = async (req, res) => {
  console.log("Register route hit"); // Add this line
  console.log("Body:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken(); // ✅ spelling fix
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
