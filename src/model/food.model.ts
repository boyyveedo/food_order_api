import mongoose, { Document } from "mongoose";


export interface IFoodItem extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
}

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Must provide name'],
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    description: {
        type: String,

    },
    price: {
        type: Number,
    },
    category: {
        type: String,
        required: true
    }


});

export const Food = mongoose.model<IFoodItem>('Food', FoodSchema);
