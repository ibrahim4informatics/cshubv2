"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to the Documents API",
    });
});
exports.default = router;
