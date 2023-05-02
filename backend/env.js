import dotenv from "dotenv";

dotenv.config();

const { PORT: portString, DB_URI } = process.env;

export { DB_URI };
export const PORT = parseInt(portString, 10) || 3001;
