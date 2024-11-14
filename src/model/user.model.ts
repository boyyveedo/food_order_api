import mongoose, { Document } from "mongoose";


export interface Iuser extends Document {
    fullName: string;
    email: string;
    password: string
    role: string
    orders: mongoose.Schema.Types.ObjectId
    favorites: {
        name: string;
        description: string;
        image: string[];
    }[];
    addresses: string
}

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, 'Must provide name'],
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    email: {
        type: String,

    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['customer', 'vendor', 'admin'],
        default: 'customer',
        required: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders"
        }
    ],
    favorites: [{
        name: String,
        description: String,
        image: []
    }],

    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Addresses"
        }
    ]
}, {
    timestamps: true
});

// Create and export the Task model
export const User = mongoose.model<Iuser>('User', UserSchema);
