// models/Order.ts
import mongoose, { Document } from "mongoose";
import { IFoodItem } from "./food.model";
import { Iuser } from "./user.model";

export interface IOrder extends Document {
    user: Iuser["_id"];  // Reference to the user placing the order
    items: {
        foodItem: IFoodItem["_id"];
        quantity: number;
    }[];
    totalPrice: number;
    status: string;  // e.g., "pending", "paid"
}

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        default: "pending"
    }
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
