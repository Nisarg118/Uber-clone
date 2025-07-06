const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  fullname,
  email,
  password,
  vehicle,
}) => {
  const { firstname, lastname } = fullname;
  const { color, plate, capacity, vehicleType } = vehicle;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};
