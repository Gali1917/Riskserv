import dotenv from "dotenv";

dotenv.config();

export const DB_MONGO = process.env.DB_MONGO || "mongodb://localhost/testdb";
export const PORT = process.env.PORT || 5005;

export const SECRET_KEY = process.env.SECRET_KEY || "";

