import jwt from "jsonwebtoken";
import config from "../../config";

/**
 * Generates a JWT token based on the provided user information.
 * @param {object} payload - The payload of the token
 * @param {boolean} rememberMe - Indicates if the user wants to be remembered.
 * @returns {string} The generated JWT token.
 */
function generateJwtToken(payload: {}, rememberMe?: boolean): string {
  const secretKey: string = config.secretKey;

  const tokenMaxAge = rememberMe ? config.jwt.tokenExpMax : config.jwt.tokenExp;

  return jwt.sign(payload, secretKey, {
    expiresIn: tokenMaxAge,
  });
}

export default generateJwtToken;
