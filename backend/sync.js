import { db } from "./db.js";
import "./models.js";

db.sync({ force: true });
