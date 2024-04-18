import StripeApi from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = StripeApi(process.env.STRIPE_SECRET_KEY)

const createPaymentIntent = async (amount) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id }
}


export default createPaymentIntent

