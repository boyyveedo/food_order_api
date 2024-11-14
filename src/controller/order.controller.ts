import { createOrder } from "../services/order.service";
import { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose"
type OrderItem = {
    foodItem: mongoose.Schema.Types.ObjectId,
    quantity: number
}

export async function createOrderController(req: Request, res: Response): Promise<Response> {
    try {
        const userId: mongoose.Schema.Types.ObjectId = req.body.userId;
        const items: OrderItem[] = req.body.items

        const order = await createOrder(userId, items)
        return res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ error: "Failed to create order" });
    }
}