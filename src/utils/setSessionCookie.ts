import { Response } from "express";
import config from "../config";

/**
 * Sets the session cookie with the provided JWT token.
 * @param {Response} res - The response object to set the cookie on.
 * @param {string} token - The JWT token to set in the cookie.
 * @param {boolean} rememberMe - Indicates if the user wants to be remembered.
 */
function setSessionCookie(res: Response, token: string, rememberMe: boolean) {
  const maxAge = rememberMe ? { maxAge: config.cookieExp } : {};

  res.cookie("sessionId", token, {
    httpOnly: true,
    secure: true,
    ...maxAge,
  });
}

export default setSessionCookie;
