"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const users_1 = require("../schemas/users");
const register = (req, res) => {
    const user = users_1.RegisterUserSchema.safeParse(req.body);
    console.log(user);
    return res.status(user.success ? 200 : 400);
};
exports.register = register;
const login = (req, res) => { };
const passwordResetOtpSetter = (request, res) => { };
const passwordResetSubmition = (req, res) => { };
const userStatus = (req, res) => { };
