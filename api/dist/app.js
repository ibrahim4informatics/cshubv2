"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
// import cors from "cors";
// import cookieParser from 'cookie-parser';
// import prisma from "./config/database";
// import authRouter from "./routes/auth";
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(cors({
//   origin: "*",
// }))
// app.use(cookieParser(process.env.COOKIE_SECRET))
// // prisma.$connect().then(() => console.log("db is connected successfully")).catch(err => console.log(`db connections fails:\n${err?.message || err}`));
// app.use("/auth", authRouter)
app.get("/", (req, res) => {
    console.log(__dirname);
});
app.listen(5000, () => {
    console.log(`Server is running on  http://${process.env.HOST}:${process.env.PORT || 3000}`);
});
