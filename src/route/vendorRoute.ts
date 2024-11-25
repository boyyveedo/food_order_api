import { Router } from "express";
import express, { Request, Response, NextFunction } from "express";
import { VendorLoginController } from "../controller";

const router = Router()


router.route('/login').post(VendorLoginController)

// router.route('/profile').get(GetVendorProfile)
// router.route('/profile').patch(UpdateVendorProfile)
// router.route('/service').patch(UpdateVendorService)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from vendor" })
})


export { router as VendorRoute }