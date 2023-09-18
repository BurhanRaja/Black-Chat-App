export function encodeHex(data: string) {
  return Buffer.from(data, "utf-8").toString("hex");
}

export function decodeHex(data: string) {
  return Buffer.from(data, "hex").toString("utf-8");
}
