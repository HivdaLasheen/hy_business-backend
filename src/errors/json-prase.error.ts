export default function isJsonParseError(err: any): boolean {
  return err instanceof SyntaxError && "body" in err;
}
