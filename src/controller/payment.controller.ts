import { Request, Response } from "express";
import { createStripeCheckout } from "../services/payment.service";

// Controller to handle creating a Stripe checkout session
export async function createCheckoutSessionController(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body; // Assume userId is passed in the request body

    try {
        // Call the service to create the Stripe Checkout session
        const sessionUrl = await createStripeCheckout(userId);

        // Respond with the session URL to redirect the user
        return res.status(200).json({ sessionUrl }); // Return the session URL
    } catch (error) {
        console.error("Error creating Checkout Session in controller:", error);
        return res.status(500).json({ error: "Failed to create Checkout Session" });
    }
}
