import { Router } from "express";

const router = Router();

router.get("/", (req, res): any => {

    return res.status(200).json({
        message: "Welcome to the Documents API",
    });
});



export default router;