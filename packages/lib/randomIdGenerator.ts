import crypto from "crypto";

export function randomIdGenerator(num: number = 10) {
  const randomId = crypto.randomBytes(num).toString("hex");
  return randomId;
}
