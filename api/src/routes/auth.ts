import { Router } from "express";
import { checkOtpValidation, login, passwordResetOtpSender, register } from "../controllers/auth";

const router = Router();

router.post("/login", login);


router.post("/register", register);


router.post("/reset", passwordResetOtpSender);

router.post("/reset/check", checkOtpValidation);
export default router;