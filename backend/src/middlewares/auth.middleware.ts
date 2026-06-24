import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: number
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization
    console.log('Auth header:', authHeader)
    const token = authHeader?.split(' ')[1]
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)

    if(!token) {
        res.status(401).json({ error: 'Token required'})
        return 
    }

    try {
    const verif = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
    req.userId = verif.userId
    next()
} catch (err) {
    console.log('JWT error:', err) 
    res.status(401).json({ error: 'Invalid Token' })
}
}