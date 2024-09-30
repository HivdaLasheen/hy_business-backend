import { Response } from "express";
import config from "../config";

/**
 * Sets the a cookie with the provided data token.
 * @param {string} cookieKey - The key to set the cookie on.
 * @param {Response} res - The response object to set the cookie on.
 * @param {string} data - The data to set in the cookie.
 * @param {boolean} rememberMe - Indicates if the cookie should be a session cookie or have a specific age.
 */
export default function setCookie(
  cookieKey: string,
  res: Response,
  data: string,
  rememberMe: boolean
) {
  const maxAge = rememberMe ? { maxAge: config.cookie.expTimeMax } : {};

  res.cookie(cookieKey, data, {
    httpOnly: true,
    secure: config.envType === "production",
    sameSite: "strict",
    ...maxAge,
  });
}
