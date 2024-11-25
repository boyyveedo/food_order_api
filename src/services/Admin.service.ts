import { IVendor, Vendor } from "../model/vendor.model";
import bcrypt from 'bcrypt';



export async function CreateVendorService(vendorData: Partial<IVendor>): Promise<IVendor | null> {
    try {
        const { name, address, pincode, foodType, email, password, ownerName, phone, serviceAvailable, rating } = vendorData;

        // Check if vendor already exists (use findOne instead of find)
        const isVendorExist = await Vendor.findOne({ email });
        if (isVendorExist !== null) {
            throw new Error('Vendor already exists');
        }

        const hashedPassword = await bcrypt.hash(password as string, 10);

        // Create the new vendor
        const newVendor = await Vendor.create({
            name,
            address,
            pincode,
            foodType,
            email,
            password: hashedPassword,
            ownerName,
            phone,
            serviceAvailable,
            rating
        });

        // Return the newly created vendor
        return newVendor;
    } catch (error) {
        console.error('Error creating vendor:', (error as Error).message);
        return null;
    }
}




export async function GetVendorByIdService(vendorId: string): Promise<IVendor | null> {
    try {
        const vendor = await Vendor.findById(vendorId)

        if (!vendor) {
            throw new Error(`Vendor with id: ${vendorId} does not exist`);
        }
        return vendor
    } catch (error) {
        console.error('Error finding vendor:', (error as Error).message);
        return null;

    }
}




export async function GetAllVendorsService(): Promise<IVendor[] | null> {
    try {
        const vendors = await Vendor.find({})
        if (!vendors) {
            throw new Error('No vendors found');
        }
        return vendors
    } catch (error) {
        console.error('Error finding vendor:', (error as Error).message);
        return null;
    }
}