import express from "express"
import login, { detectCredits, logout, updateUserPayment } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/login', login);

router.get('/logout', logout);
router.post('/detect-credits', detectCredits)
router.post('/update-plan', updateUserPayment)

export default router;