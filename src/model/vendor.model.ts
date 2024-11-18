
import mongoose, { Document } from "mongoose";


export interface IVendor extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImage: [string]
    rating: number;
    foods: any
}

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },

    foodType: {
        type: [String],
    },
    pincode: {
        type: String,
    },
    address: {
        type: String,
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    salt: {
        type: String,
        required: false
    },

    serviceAvailable: {  // Corrected typo: servive -> service
        type: Boolean,
        required: false
    },
    coverImage: {
        type: [String],
    },
    rating: {
        type: Number,
        required: false
    },
    // foods: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Food',
    // }],
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
        }
    },
    timestamps: true
});

export const Vendor = mongoose.model<IVendor>('Vendor', VendorSchema);