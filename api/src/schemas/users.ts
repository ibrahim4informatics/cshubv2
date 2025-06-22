import { z } from "zod";

const RegisterUserSchema = z.object({
    first_name: z.string().min(5, { message: "the first name should contain at least 5 chars" }).max(35, { message: "the first name is too long" }),
    last_name: z.string().min(5, { message: "the last name should contain at least 5 chars" }).max(35, { message: "the last name is too long" }),
    bio: z.string().min(10, { message: "the is too short" }).max(500, { message: "bio is too long" }).optional(),
    email: z.string().email({ message: "email is not valid" }),
    password: z.string().min(8, { message: "password is too short" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: "password should contain at least 1 capital letter,1 special character" }),
    confirm: z.string(),
    role: z.enum(["STUDENT", "ADMIN", "INSTRUCTOR"]).optional()
}).refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "password doesn't match"
})



const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
})


const UserResetPasswordSchema = z.object({
    email: z.string().email()
});

const UserSubmitPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(4),
    new_password: z.string().min(8, { message: "password is too short" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: "password should contain at least 1 capital letter,1 special character" }),
    confirm_new_password: z.string(),
}).refine(data => data.new_password === data.confirm_new_password, { message: "password does not match", path: ["confirm_new_password"] });

export { UserResetPasswordSchema, RegisterUserSchema, LoginUserSchema, UserSubmitPasswordSchema }