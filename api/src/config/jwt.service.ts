import jwt, { type SignOptions } from "jsonwebtoken";
export class JwtService {


    public static async generateToken(payload: {}, secretKey: string, options?: SignOptions) {
        return await jwt.sign({ ...payload }, secretKey, options);
    }

    public static async verifyToken(token: string, secretKey: string) {
        try {
            const payload = await jwt.verify(token, secretKey);
            return payload;
        }
        catch {
            return null;
        }
    }
}