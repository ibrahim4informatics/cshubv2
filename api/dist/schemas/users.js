"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserSchema = void 0;
const zod_1 = require("zod");
const RegisterUserSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(5, { message: "the first name should contain at least 5 chars" }).max(35, { message: "the first name is too long" }),
    last_name: zod_1.z.string().min(5, { message: "the last name should contain at least 5 chars" }).max(35, { message: "the last name is too long" }),
    bio: zod_1.z.string().min(10, { message: "the is too short" }).max(500, { message: "bio is too long" }).optional(),
    email: zod_1.z.string().email({ message: "email is not valid" }),
    password: zod_1.z.string().min(8, { message: "password is too short" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: "password should contain at least 1 capital letter,1 special character" }),
    confirm: zod_1.z.string()
}).refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "password doesn't match"
});
exports.RegisterUserSchema = RegisterUserSchema;
