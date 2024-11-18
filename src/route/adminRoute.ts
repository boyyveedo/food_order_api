import { Router } from "express";
import express, { Request, Response, NextFunction } from "express";
import { CreateVendorController, GetVendorById, GetVendors } from "../controller"

const router = Router()


router.route('/vendor').post(CreateVendorController)
router.route('/vendors').get(GetVendors)
router.route('/vendor/:id').get(GetVendorById)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from admin" })
})



export { router as AdminRoute }  