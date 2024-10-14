export default function (reason: any, promise: Promise<any>): string {
  const timestamp = new Date().toISOString();
  let log = `${timestamp} Unhandled Rejection at:\n`;

  const stack = reason.stack;
  if (stack) log += `\tStack: ${stack}\n`;

  const name = reason.name;
  if (name) log += `\tName: ${name}\n`;

  const reasonMessage = reason.toString();
  if (reasonMessage) log += `\tMessage: ${reasonMessage}\n`;

  const code = reason.code;
  if (code) log += `\tCode: ${code}\n`;

  return log;
}
