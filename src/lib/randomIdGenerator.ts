import crypto from "crypto";

export const randomIdGenerator = (num: number = 10) => {
  return crypto.randomBytes(num).toString("hex");
};
