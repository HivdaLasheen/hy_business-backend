export default function isRequestTimeoutError(err: any): boolean {
  return err.code === "ETIMEDOUT";
}
