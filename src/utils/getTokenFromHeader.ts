import jsonwebtoken from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/config';



export function getTokenFromHeader(req: Request): string {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Token not provided");
    }
    const token = authHeader.split(" ")[1];
    // Extract the token
    return token
}