import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './database/mongoDb';
import { port } from './config/config';
import bodyParser from 'body-parser';
import cors from 'cors'
import { routes } from './route';
import dotenv from 'dotenv';
dotenv.config();


const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

app.use('/api/v1', routes)

app.get('/', (req: Request, res: Response) => {
    res.render('index.ejs')
})



export default app;
const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`server running on port ${port}`)
        })
    } catch (error) {
        console.error('failed to connect to mongodb')
        process.exit(1)
    }
}

startServer()