import jsonwebtoken from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/config';




export async function getTokenFromHeader(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: "token not provided" })
        }
        const token = authHeader.split(' ')[1]
        const decoded = jsonwebtoken.verify(token, JWT_SECRET as string)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized: Invalid token" });

    }
}