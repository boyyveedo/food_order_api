import dotenv from 'dotenv';

dotenv.config();
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
export const MongoURI = process.env.MongoURI;
export const port = process.env.PORT || 3030; // Default to 3030 if not provided
export const JWT_SECRET = process.env.JWT_SECRET;

if (!MongoURI || !JWT_SECRET || !STRIPE_SECRET_KEY) {
    throw new Error('Configuration values are missing');
}
