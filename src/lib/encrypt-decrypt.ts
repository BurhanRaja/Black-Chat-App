import Cryptr from "cryptr";
let cryptrSecret = process.env.NEXT_CRYPTR_SECRET!;
const cryptr = new Cryptr(cryptrSecret);

export const encryptToken = (data: string) => {
  let token = cryptr.encrypt(data);
  return token;
};

export const decryptData = (token: string) => {
  let data = cryptr.decrypt(token);
  return data;
};
