export default function createErrorObject(
  msg: string,
  value: string,
  path: string,
  location: string = "body",
  type: string = "field"
) {
  return {
    msg,
    value,
    path,
    location,
    type,
  };
}
