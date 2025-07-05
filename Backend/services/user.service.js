  const userModel = require("../models/user.model");

  module.exports.createUser = async ({ fullname, email, password }) => {
    const { firstname, lastname } = fullname;

    if (!firstname || !lastname || !email || !password) {
      throw new Error("All fields are required");
    }

    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    return user;
  };
