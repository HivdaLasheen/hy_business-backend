import jwt from "jsonwebtoken";
import config from "../../config";

export default function verifyJwtToken(token: string) {
  try {
    return jwt.verify(token, config.secretKey);
  } catch (error) {
    return null;
  }
}
