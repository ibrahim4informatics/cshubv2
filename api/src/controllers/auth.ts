import { Request, Response } from "express";
import { LoginUserSchema, RegisterUserSchema, UserResetPasswordSchema, UserSubmitPasswordSchema } from "../schemas/users";
import { z } from "zod";
import prisma from "../config/database";
import { BcryptService } from "../config/bcrypt.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import otpGenerator from "otp-generator";
import { JwtService } from "../config/jwt.service";
import { Mailer } from "../config/nodemailer.service";
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
const passwordResetOtpSender = async (request: Request, res: Response): Promise<any> => {
    const body = UserResetPasswordSchema.safeParse(request.body);

    if (!body.success) {
        return res.status(400).json({ message: "Otp is not sent due to data format", errors: errorExtractor(body.error) });
    }

    try {

        const user = await prisma.user.findUnique({ where: { email: body.data.email } });
        if (!user) {
            return res.status(404).json({ message: "Otp is not sent no user matche the email provided" });
        }


        const otp = otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        try {

            await prisma.user.update({ where: { email: body.data.email }, data: { otp_code: otp, reset_attempts: 0 } });

            //todo : send using nodemailer

            const mailSender = Mailer.getMailer();

            mailSender.sendMail({
                from: 'CSHUB <ibrahimelkhalilbenyahia@gmail.com>',
                subject: "Reset Password Otp",
                to: user.email,
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CSHUB OTP Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
          <tr>
            <td style="background-color: #007BFF; padding: 20px; color: #ffffff; text-align: center;">
              <h1 style="margin: 0;">CSHUB</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: center;">
              <h2 style="color: #333;">Reset Your Password</h2>
              <p style="color: #555;">Use the OTP below to reset your password. It is valid for the next 10 minutes.</p>
              <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; margin: 20px auto; color: #007BFF;">${otp}</div>
              <p style="color: #777;">If you didn’t request this, you can ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              © 2025 CSHUB. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
            })

            return res.status(200).json({ message: "Otp is sent successfully" });

        }

        catch (error) {
            return res.status(500).json({ message: "Server error otp is not sent", error: error || null })
        }
    }

    catch (error) {

        return res.status(500).json({ message: "Server error otp is not sent", error: error || null });
    }


}


const checkOtpValidation = async (req: Request, res: Response): Promise<any> => {

    const schemas = z.object({
        code: z.string().length(4),
        email: z.string().email()
    })
    const body = schemas.safeParse(req.body);

    if (!body.success) {
        return res.status(400).json({ errors: errorExtractor(body.error) });
    }


    const user = await prisma.user.findUnique({ where: { email: body.data.email } });

    if (!user) {
        return res.status(401).json({ errors: "invalid email or otp" });
    }

    if (user.reset_attempts >= 3) {

        await prisma.user.update({ where: { email: user.email }, data: { otp_code: null, reset_attempts: 0 } });
        return res.status(401).json({ message: "you have entered the code to many times try again later" });

    }

    if (user.otp_code !== body.data.code) {
        await prisma.user.update({ where: { email: user.email }, data: { reset_attempts: user.reset_attempts + 1 } });
        return res.status(401).json({ errors: "invalid email or otp" })
    }

    return res.status(200).json({ message: "this is valid email and otp" });





}


const passwordResetSubmition = async (req: Request, res: Response): Promise<any> => {

    const body = UserSubmitPasswordSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ errors: errorExtractor(body.error) });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email: body.data.email } });

        if (!user) return res.status(404).json({ errors: "invalid data" })
        if (user.otp_code && user.otp_code === body.data.otp) {
            await prisma.user.update({ where: { email: body.data.email }, data: { password: await BcryptService.hash(body.data.new_password), otp_code: null, reset_attempts: 0 } });
            return res.status(200).json({ message: "password changed success" });
        }

        else {
            await prisma.user.update({ where: { email: user.email }, data: { reset_attempts: user.reset_attempts + 1 } });
            return res.status(401).json({ errors: "invalid otp code" });
        }
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err || "unknown internal server error" });
    }


}
const userStatus = (req: Request, res: Response) => { }



export { register, login, passwordResetOtpSender, checkOtpValidation, passwordResetSubmition }