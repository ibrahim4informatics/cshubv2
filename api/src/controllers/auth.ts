import { Request, Response } from "express";
import { LoginUserSchema, RegisterUserSchema } from "../schemas/users";
import { z } from "zod";
import prisma from "../config/database";
import { BcryptService } from "../config/bcrypt.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "../config/jwt.service";
function errorExtractor(errorObj: z.ZodError) {
    return errorObj.issues.map(err => { return { field: err.path.join(), message: err.message } });
}
const register = async (req: Request, res: Response): Promise<any> => {
    const { success, error, data: user_data } = RegisterUserSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ errors: errorExtractor(error) });
    }
    try {
        const newUser = await prisma.user.create({
            data: {
                email: user_data.email,
                password: await BcryptService.hash(user_data.password),
                role: user_data.role || undefined,
                profile: {
                    create: {
                        first_name: user_data.first_name,
                        last_name: user_data.last_name,
                        bio: user_data.bio || undefined,
                    }
                }


            }
        });
        return res.status(201).json({
            user: newUser,
            message: "create user success"
        });
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res.status(400).json({ errors: [{ email: "email is already used by another user" }] })
            }
        }
        return res.status(500).json({ message: "user is not created" });
    }
}
const login = async (req: Request, res: Response): Promise<any> => {
    const { data, success, error } = LoginUserSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ errors: errorExtractor(error) });
    }
    try {

        // cheking if user is existing
        const user = await prisma.user.findUnique({ where: { email: data.email }, select: { password: true, email: true, id: true } });
        if (!user) {
            return res.status(403).json({ message: "invalid email or password" })
        }

        //cheking password is correct or not
        if (!await BcryptService.verify(data.password, user.password)) {
            return res.status(403).json({ message: "invalid email or password" });
        }

        // generate tokens
        const access_token = await JwtService.generateToken({ user_id: user.id }, process.env.JWT_ACCESS_KEY!, { expiresIn: "15m" });
        const refresh_token = await JwtService.generateToken({ user_id: user.id }, process.env.JWT_REFRESH_KEY!, { expiresIn: "30d" });
        res.cookie("access", access_token, { httpOnly: true, secure: process.env.MODE === "production" ? true : false, signed: true, sameSite: "lax", maxAge: 1000 * 60 * 15 });
        res.cookie("refresh", refresh_token, { httpOnly: true, secure: process.env.MODE === "production" ? true : false, signed: true, sameSite: "lax", maxAge: 100 * 60 * 60 * 24 * 30 });
        return res.status(200).json({ message: "user is logged in" });

    }
    catch (error) {
        return res.status(500).json({ error })
    }
}
const passwordResetOtpSetter = (request: Request, res: Response) => { }
const passwordResetSubmition = (req: Request, res: Response) => { }
const userStatus = (req: Request, res: Response) => { }



export { register, login }