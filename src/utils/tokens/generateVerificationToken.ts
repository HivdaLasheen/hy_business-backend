import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

/**
 * Generates a verification token consisting of a random alphanumeric string
 * followed by a UUID.
 *
 * The token is composed of:
 * - A random alphanumeric string of length 32.
 * - A UUID (version 4) appended to the alphanumeric string, separated by a dash.
 * - Final token length will be 32 + 1 + 36 = 69.
 *
 * @returns {string} The generated verification token.
 */
export default function generateVerificationToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  const length = 32;

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    token += characters[randomIndex];
  }
  const uuid = uuidv4();

  return `${token}-${uuid}`;
}
