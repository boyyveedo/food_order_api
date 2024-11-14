import { Food, IFoodItem } from "../model/food.model";



export async function getFoodItems(): Promise<IFoodItem[] | null> {
    try {
        const foodItems = await Food.find()
        return foodItems;
    } catch (error) {
        console.error('Error fetching food items', error);
        throw error;
    }
}


export async function createFood(foodData: Partial<IFoodItem>): Promise<IFoodItem | null> {
    try {
        // Ensure items and totalPrice are provided
        if (!foodData.name || !foodData.description) {
            console.error("Missing required fields: items or totalPrice");
            return null;
        }

        const { name, description, price, category } = foodData;
        // Create the order with required fields
        const food = await Food.create({ name, description, price, category });
        return food;
    } catch (error) {
        console.error("Error creating order:", (error as Error).message);
        return null;
    }
}