import { Order, IOrder } from "../model/order.model";
import { IFoodItem, Food } from "../model/food.model";
import mongoose from "mongoose";
type OrderItem = {
    foodItem: mongoose.Schema.Types.ObjectId,
    quantity: number
}

export async function createOrder(userId: mongoose.Schema.Types.ObjectId, items: OrderItem[]): Promise<IOrder | null> {
    //calculate the totalprice of each item
    let totalPrice = 0
    for (const item of items) {
        const food = await Food.findById(item.foodItem)
        if (!food) {
            throw new Error(`Food item with ID ${item.foodItem} not found`);
        }
        totalPrice += food.price * item.quantity
    }
    //create order
    const order = await Order.create({
        user: userId,
        items: items.map((item) => ({
            foodItem: item.foodItem,
            quantity: item.quantity
        })),
        totalPrice,
        status: "pending"
    });
    return order
}




export async function getOrders(userId: string): Promise<IOrder[] | null> {
    try {
        const order = await Order.find({ user: userId }).populate('user items.foodItem');
        if (!order || order.length === 0) {
            console.log('No orders found');
            return null;
        }
        return order;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
}