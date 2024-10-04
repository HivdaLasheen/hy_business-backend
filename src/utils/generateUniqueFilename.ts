import crypto from "crypto";

export default function generateUniqueFilename(
  extension: string = "",
  extensionPrefix: string = ""
): string {
  const timestamp = Date.now();
  const randomHash = crypto.randomBytes(8).toString("hex");
  return `${timestamp}-${randomHash}${extensionPrefix ? "-" + extensionPrefix : ""}${
    extension ? "." + extension : ""
  }`;
}
