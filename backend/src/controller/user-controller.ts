import { type Request, type Response } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email ou senha não são válidos." });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado.",
      });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({
        message: "Email ou senha inválidos.",
      });
    }

    const userInfos = {
      id: user.id,
      name: user.name,
      email: user.email,
      cep: user.cep,
    };

    if (!process.env.JWT_SECRET) {
      return;
    }
    const token = jwt.sign(userInfos, process.env.JWT_SECRET);

    res.cookie("user", token, {
      maxAge: 18000000,
    });

    res.status(200).json(userInfos);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor. " + error });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name || !email || !password || !cep) {
      res.status(400).json({ message: "Todos os campos são obrigatórios." });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user?.email) {
      res.status(409).json({ message: "Email já cadastrado." });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
        cep: cep,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
    return;
  }
};

export const auth = async (req: Request, res: Response) => {
  try {
    const user = req.cookies.user;

    if (!process.env.JWT_SECRET) return;
    const decoded = jwt.verify(user, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({
        message: "Usuário não autorizado.",
      });
    }

    res.json(decoded);
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor.",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { user } = req.cookies;

  if (user) {
    res.clearCookie("user");
    res.json({ message: "usuario deslogado" });
  }

  console.log(user);
};
