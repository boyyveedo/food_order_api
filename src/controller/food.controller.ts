import { Request, Response } from "express";
import { getFoodItems } from "../services/food.service";
import { createFood } from "../services/food.service";


export async function getFoodItemsController(req: Request, res: Response): Promise<Response> {
    try {
        const foodItems = await getFoodItems()
        return res.status(200).json(foodItems);
    } catch (error) {
        console.error("Error in food controller:", error);
        return res.status(500).json({ error: "Failed to fetch food items" });
    }
}

export async function createFoodController(req: Request, res: Response): Promise<Response> {
    try {
        const { name, description, price, category } = req.body;

        // Validate required fields
        if (!name || !description) {
            return res.status(400).json({ error: "Missing required fields: name or description" });
        }

        // Create the new order with the provided data
        const newFood = await createFood({ name, description, price, category });

        // if (!newFood) {
        //     return res.status(500).json({ error: "Failed to create food" });
        // }

        return res.status(201).json(newFood);
    } catch (error) {
        console.error("Error creating food:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}