import { createHash, randomBytes } from "node:crypto";

export function createSalt(){
    return randomBytes(128).toString('base64');
}
export 
function hashPassword(password: string, salt: string) {
    return createHash('sha256').update(password+salt).digest('hex');
}