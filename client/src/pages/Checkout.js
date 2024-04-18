import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createPaymentIntent } from '../Features/orders/orderSlice';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe("pk_test_51LWvllHqA5OzLGdNdcipvmDPAiLIe5YYTFQAWIVyRL1Fq2SOtHyx3qP2XD3q6IIEogamMV0VfJdYTafY5Vs4IzQo00gKlnxR7p");
const Checkout = () => {
    const { clientSecret } = useSelector(store => store.orders)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(createPaymentIntent())
    }, [])
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <div className='container center' style={{ marginTop: '10rem' }}>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default Checkout
