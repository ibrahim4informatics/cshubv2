"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/login", (req, res) => {
    return res.status(200).json({ message: "auth route" });
});
router.post("/register", auth_1.register);
exports.default = router;
