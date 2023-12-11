import * as crypto from "crypto";

export const hashPwd = (p: string, salt: string): string => {
	const hmac = crypto.createHmac("sha512", salt);
	hmac.update(p);
	return hmac.digest("hex");
};
export const randomSalt = (size: number) => {
	const salt = crypto.randomBytes(size);
	return salt.toString();
};
