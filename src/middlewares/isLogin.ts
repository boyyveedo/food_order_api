import jsonwebtoken from 'jsonwebtoken';
import { getTokenFromHeader } from '../utils';
import express, { Request, Response, NextFunction, response } from "express";
import { JWT_SECRET } from '../config/config';



export const isLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
        const token = getTokenFromHeader(req)
        if (!token) {
            return res.json({
                message: "Token not provided, please login"
            })
        }
        const decoded = jsonwebtoken.verify(token, JWT_SECRET as string)
        req.user = decoded

        next()

    } catch (error) {
        console.error("Authorization error")
        return res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }

}