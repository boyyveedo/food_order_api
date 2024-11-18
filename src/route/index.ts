import { Router } from "express";
import { registerUser, loginUserController, getUserByIdController, getAllUsersController, updateUserController, deleteUserController } from "../controller/user.controller";
import { createOrderController } from "../controller/order.controller";
import { getFoodItemsController, createFoodController } from "../controller/food.controller";
import { createCheckoutSessionController } from "../controller/payment.controller";
export * from './vendorRoute'
export * from './adminRoute'
export const routes = Router()


routes.route('/checkout').post(createCheckoutSessionController)
routes.route('/create').post(createOrderController)
routes.route('/get-food').get(getFoodItemsController)
routes.route('/new-food').post(createFoodController)
routes.route('/signup').post(registerUser)
routes.route('/login').post(loginUserController)
routes.route('/users').get(getAllUsersController)
routes.route('/:id').get(getUserByIdController).patch(updateUserController).delete(deleteUserController)



