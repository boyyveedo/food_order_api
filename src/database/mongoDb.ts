import mongoose from 'mongoose'
import { MongoURI } from '../config/config'

export async function connectDB(): Promise<void> {
    try {
        if (!MongoURI) {
            throw new Error('connection not found')
        }

        if (MongoURI) {
            await mongoose.connect(MongoURI)
            console.log('mongodb connected sucessfully')
        }
    } catch (error) {
        console.error('failed to connect')
    }
}