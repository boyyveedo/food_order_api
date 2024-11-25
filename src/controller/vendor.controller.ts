import express, { Request, Response, NextFunction } from "express";
import { Vendor } from "../model/vendor.model";
import { CreateVendorInput, VendorLoginInput } from "../dto";
import { VendorLoginService } from "../services/Vendor.service";
import generateToken from "../utils/generateToken";

export async function VendorLoginController(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
        const { email, password } = req.body
        const VendorFound = await VendorLoginService({ email, password })
        if (!VendorFound) {
            return res.status(401).json({ msg: "invalid credentials please login" })
        }
        return res.status(200).json({
            msg: "vendor logged in sucessfully",
            data: {
                email: VendorFound.email,
                token: generateToken(VendorFound.id.toString(), VendorFound.email)
            }
        })
    } catch (error) {
        console.error('Error in lingVendor:', (error as Error).message);
        return res.status(500).json({ msg: 'Internal server error occurred' })
    }
}

// export async function GetVendorProfile(req: Request, res: Response, next: NextFunction): Promise<Response> {
//     try {

//     } catch (error) {

//     }
// }


// export async function UpdateVendorProfile(req: Request, res: Response, next: NextFunction): Promise<Response> {
//     try {

//     } catch (error) {

//     }
// }



// export async function UpdateVendorService(req: Request, res: Response, next: NextFunction): Promise<Response> {
//     try {

//     } catch (error) {

//     }
// }
