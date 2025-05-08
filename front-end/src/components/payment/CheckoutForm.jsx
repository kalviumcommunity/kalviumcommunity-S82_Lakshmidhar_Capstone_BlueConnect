import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("Payment successful! 🎉");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay ₹{amount}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
