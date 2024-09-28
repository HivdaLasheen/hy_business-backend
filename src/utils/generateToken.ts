import jwt from "jsonwebtoken";
import config from "../config";

/**
 * Generates a JWT token based on the provided user information.
 * @param {object} payload - The payload of the token
 * @param {boolean} rememberMe - Indicates if the user wants to be remembered.
 * @returns {string} The generated JWT token.
 * @throws {Error} If the secret key is not provided.
 */

function generateToken(payload: {}, rememberMe?: boolean): string {
  const secretKey: string = config.secretKey;
  const tokenMaxAge = rememberMe
    ? { expiresIn: config.jwtTokenExpMax }
    : { expiresIn: config.jwtTokenExp };

  return jwt.sign(payload, secretKey, tokenMaxAge);
}

export default generateToken;
