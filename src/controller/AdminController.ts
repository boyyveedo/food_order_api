import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { CreateVendorService, GetAllVendorsService, GetVendorByIdService } from "../services";
import { Vendor } from "../model/vendor.model";


export async function CreateVendorController(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
        const { name, address, pincode, foodType, email, password, ownerName, phone, serviceAvailable, rating } = <CreateVendorInput>req.body;
        const newVendor = await CreateVendorService({
            name,
            address,
            pincode,
            foodType,
            email,
            password,
            ownerName,
            phone,
            serviceAvailable,
            rating
        });

        if (!newVendor) {
            return res.status(400).json({ msg: 'User already exists or could not be created' });
        }

        return res.status(201).json({ msg: 'User successfully created', vendor: newVendor });
    } catch (error) {
        console.error('Error in CreateVendorController:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });
    }
}




export async function GetVendors(req: Request, res: Response, next: NextFunction) {
    try {
        const vendors = await GetAllVendorsService()
        if (!vendors) {
            return res.status(401).json({ msg: "could not fetch vendors " })
        }
        return res.status(201).json({ vendors })
    } catch (error) {
        console.error('Error in fetching vendors:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });
    }
}







export async function GetVendorById(req: Request, res: Response, next: NextFunction) {
    try {
        const vendorId = req.params.id
        const vendor = await GetVendorByIdService(vendorId)
        if (!vendor) {
            return res.status(401).json({ msg: "vendor with id:  does not exist" })
        }
        return res.status(201).json(vendor)
    } catch (error) {
        console.error('Error finding vendor with id:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' });
    }
}  