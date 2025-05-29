export function decodeJwt(token: string): any {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString();
    return JSON.parse(payload);
  } catch (err) {
    return err;
  }
}
