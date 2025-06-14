
import bcrypt from "bcrypt";
export class BcryptService {

    private static readonly round: number = 12;


    public static async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.round);
    }


    public static async verify(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}