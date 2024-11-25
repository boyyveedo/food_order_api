import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/config";


if (!STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not defined in the environment variables");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-10-28.acacia" });

// Service function to create a Stripe checkout session
export async function createStripeCheckout(userId: string): Promise<string | null> {
    try {
        // Create a checkout session with the provided userId
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Order #" + userId },
                        unit_amount: 2000, // 
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3030/complete", 
            cancel_url: "http://localhost:3030/cancel", //  
            metadata: { userId }, // Store userId in metadata for reference
        });

        return session.url; // Return the checkout session URL
    } catch (error) {
        console.error("Error creating Stripe Checkout Session:", error);
        throw new Error("Failed to create Stripe Checkout Session");
    }
}
