import { IVendor, Vendor } from "../model/vendor.model";
import bcrypt from 'bcrypt';


export async function VendorLoginService(VendorLoginInput: Partial<IVendor>): Promise<IVendor | null> {
    try {
        const { email, password } = VendorLoginInput
        const VendorFound = await Vendor.findOne({ email })
        if (!VendorFound) {
            throw new Error('invalid credentials, please login')
        }
        const isPasswordMatched = await bcrypt.compare(password || '', VendorFound.password || '')
        if (!isPasswordMatched) {
            throw new Error('invalid credentials, please login');

        }
        return VendorFound
    } catch (error) {
        console.error('Error login in  vendor:', (error as Error).message);
        return null;
    }
}