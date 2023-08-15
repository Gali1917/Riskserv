import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";

export const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("userId is required"));
    }


    jwt.sign({ id: userId }, SECRET_KEY, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};
