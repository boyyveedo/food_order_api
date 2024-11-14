import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config'; // Adjust the import path as needed

const generateToken = (email: string, id: string): string => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        return jsonwebtoken.sign({ email, id }, JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Could not generate token');
    }
};

export default generateToken;