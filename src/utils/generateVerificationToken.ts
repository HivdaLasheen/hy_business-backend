import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export default function generateVerificationToken(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    token += characters[randomIndex];
  }
  const uuid = uuidv4();

  return `${token}-${uuid}`;
}
