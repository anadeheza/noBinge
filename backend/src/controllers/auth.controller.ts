import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma  from "../lib/prisma";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body 

    if(!email || !password || !name) {
        res.status(400).json({ error: 'All fields are required' })
        return
    }

    try {
        const existe = await prisma.user.findUnique({ where: {email} })
        if(existe) {
            res.status(409).json({ error: 'That email is already registered :/'})
            return
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { email, password: hashed, name},
        })

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET!, {expiresIn: '7d'})

        res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name }})
    } catch(error) {
        res.status(500).json({ erorr: 'Internal server error... sorry :('})
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password } = req.body

    if (!email || !password) {
        res.status(400).json({error: 'Email and password required'})
        return
    }

    try {
        const user = await prisma.user.findUnique({ where: {email} })
        if(!user) {
            res.status(401).json({ error: 'Invalid credentials' })
            return
        }

        const valido = await bcrypt.compare(password, user.password)

        if(!valido) {
            res.status(401).json({ error: 'Invalid credentials' })
            return
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })

        res.json({ token, user: {id: user.id, email: user.email, name: user.name } })
    } catch (error) {
        res.status(500).json({ error: 'Server error... sorry :,('})
    }
}

export const me = async (req: any, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId},
            select: { id: true, email: true, name: true, createdAt: true }
        })

        if(!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }
    } catch {
        res.status(500).json({error: 'Internal server error :/'})
    }
}