import { query } from "express-validator";

const searchValue = query("value")
  .optional()
  .isString()
  .withMessage("Search value must be a string");

const searchKey = query("key")
  .optional()
  .isString()
  .withMessage("Search key must be a string")
  .isIn(["firstName", "lastName", "fullName", "middleName", "email", "phoneNumber"])
  .withMessage(
    "Invalid search key, must be one of: firstName, lastName, fullName, email, phoneNumber"
  );

const page = query("page").optional().isInt({ min: 1 }).withMessage("Page must be >= 1");
const limit = query("limit").optional().isInt({ min: 1 }).withMessage("Limit must be >= 1");

export { searchValue, searchKey, page, limit };
