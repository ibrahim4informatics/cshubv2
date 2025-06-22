import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import prisma from "./config/database";
import authRouter from "./routes/auth";


function bootstrap(): void {


  const app = express();
  app.use(express.json())
  app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
    
  }))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  prisma.$connect().then(() => console.log("db is connected successfully")).catch(err => console.log(`db connections fails:\n${err?.message || err}`));
  
  app.use("/auth", authRouter)



  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on  http://${process.env.HOST}:${process.env.PORT || 3000}`);
  });


}

bootstrap();