import { type Request, type Response } from "express";
import { Router } from "express";
import { login, register } from "./controller/user-controller.js";

export const router = Router();

router.post("/login", login);
router.post("/register", register);
