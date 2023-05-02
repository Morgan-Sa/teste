import { DB_URI } from "./env.js";
import { Sequelize } from "sequelize";

export const db = new Sequelize(DB_URI, {dialect:'postgres'});
