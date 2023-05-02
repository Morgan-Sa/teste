import { db } from "./db.js";
import { DataTypes } from "sequelize";

export const BloodCenter = db.define(
  "BloodCenter",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    point: {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: false,
    },
  },
  {}
);
