"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, CreditCard, Clock } from "lucide-react";
import { ThreeDButton } from "@/components/ui-brutalist/threed-button";
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  // Prevent checkout if cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 border-4 border-black bg-red-100">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="mb-6">Please add some products before proceeding to checkout.</p>
          <ThreeDButton href="/products">Continue Shopping</ThreeDButton>
        </div>
      </div>
    );
  }

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = 15;
  const total = subtotal + tax + shipping;

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash"); // cash or card
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^(?:\+923\d{9}|03\d{9})$/;
    return re.test(phone);
  };

  const canProceedToPayment = () => {
    const { firstName, lastName, email, address, city, phone } = shippingData;
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      address.trim() !== "" &&
      city.trim() !== "" &&
      phone.trim() !== "" &&
      validateEmail(email) &&
      validatePhone(phone)
    );
  };

  const handleContinueToPayment = () => {
    if (!canProceedToPayment()) {
      toast.error("Please fill all required fields with valid information");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!shippingData.email || !validateEmail(shippingData.email)) {
      toast.error("Please enter a valid email address (e.g., example@domain.com)");
      return;
    }

    if (!shippingData.phone || !validatePhone(shippingData.phone)) {
      toast.error("Please enter a valid Pakistani phone number (e.g., +923xxxxxxxxx or 03xxxxxxxxx)");
      return;
    }

    setSubmitting(true);

    const order = {
      shippingInfo: {
        ...shippingData,
        country: "Pakistan",
      },
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : undefined,
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
    };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Order placed successfully!");
        clearCart();
        window.location.href = "/order-confirmation";
      } else {
        const error = await res.json();
        toast.error("Order failed: " + error.message);
      }
    } catch (err: any) {
      toast.error("Server error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 relative">
      <ScrollingGrid />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/cart" className="hover:text-gray-700">Cart</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900 font-bold">Checkout</span>
        </div>

        <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">
          Checkout
        </h1>

        {/* Step navigation */}
        <div className="flex mb-8 border-4 border-black">
          {["Shipping", "Payment", "Review"].map((label, index) => (
            <button
              key={index}
              className={`flex-1 py-4 uppercase font-bold ${
                step === index + 1 ? "bg-black text-white" : "bg-white"
              } ${index !== 0 ? "border-l-4 border-black" : ""}`}
              onClick={() => setStep(index + 1)}
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>

        {/* Step 1 - Shipping */}
        {step === 1 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(["firstName", "lastName", "email", "address", "city", "phone"] as Array<
                keyof typeof shippingData
              >).map((field, idx) => (
                <div key={idx} className={["email", "address"].includes(field) ? "md:col-span-2" : ""}>
                  <label className="block mb-2 uppercase font-bold">
                    {field.replace(/([A-Z])/g, " $1")} *
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    className="w-full brutalist-input"
                    required
                    pattern={
                      field === "email"
                        ? "[^\\s@]+@[^\\s@]+\\.[^\\s@]+"
                        : field === "phone"
                        ? "(?:\\+923\\d{9}|03\\d{9})"
                        : undefined
                    }
                    value={shippingData[field]}
                    onChange={handleShippingChange}
                    placeholder={
                      field === "email"
                        ? "example@domain.com"
                        : field === "phone"
                        ? "+923xxxxxxxxx or 03xxxxxxxxx"
                        : undefined
                    }
                  />
                </div>
              ))}
              <div>
                <label className="block mb-2 uppercase font-bold">Country *</label>
                <input
                  type="text"
                  value="Pakistan"
                  readOnly
                  className="w-full brutalist-input bg-gray-100"
                />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <ThreeDButton href="/cart">BACK TO CART</ThreeDButton>
              <ThreeDButton onClick={handleContinueToPayment} disabled={!canProceedToPayment()}>
                CONTINUE TO PAYMENT
              </ThreeDButton>
            </div>
          </div>
        )}

        {/* Step 2 - Payment */}
        {step === 2 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Payment Method</h2>
            <div className="mb-6 space-y-4">
              {/* Cash on Delivery */}
              <div className="border-4 border-black p-4">
                <label className="flex items-center uppercase font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="mr-2"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {/* Card Payment */}
              <div className="border-4 border-black p-4 group">
                <label className="flex items-center uppercase font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="mr-2"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Card Payment</span>
                </label>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-3 pl-6">
                    <div>
                      <label className="block mb-1">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        placeholder="1234 5678 9012 3456"
                        className="w-full brutalist-input"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          className="w-full brutalist-input"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          className="w-full brutalist-input"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1">Name on Card</label>
                      <input
                        type="text"
                        name="nameOnCard"
                        placeholder="John Doe"
                        className="w-full brutalist-input"
                        value={cardDetails.nameOnCard}
                        onChange={handleCardChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <ThreeDButton onClick={() => setStep(1)}>BACK TO SHIPPING</ThreeDButton>
              <ThreeDButton onClick={() => setStep(3)}>REVIEW ORDER</ThreeDButton>
            </div>
          </div>
        )}

        {/* Step 3 - Review */}
        {step === 3 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Review Your Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase">Shipping Address</h3>
                <div className="border-4 border-black p-4 space-y-1">
                  <p className="uppercase">{shippingData.firstName} {shippingData.lastName}</p>
                  <p>{shippingData.address}</p>
                  <p>{shippingData.city}, Pakistan</p>
                  <p>{shippingData.phone}</p>
                </div>
              </div>
              <div>

                <h3 className="text-xl font-bold mb-4 uppercase">Payment Method</h3>
                <div className="border-4 border-black p-4 flex items-center">
                  <span>{paymentMethod === "cash" ? "Cash on Delivery" : "Credit Card"}</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 uppercase">Order Items</h3>
              <div className="border-4 border-black">
                <div className="p-4 space-y-2">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between border-b-2 border-black pb-2 last:border-b-0">
                      <span className="uppercase">{item.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 uppercase">Order Summary</h3>
              <div className="border-4 border-black">
                <div className="p-4 border-b-4 border-black bg-black text-white">
                  <div className="flex justify-between uppercase">
                    <span>{cart.length} Items</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between uppercase">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl border-t-4 border-black pt-2 uppercase font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <ThreeDButton onClick={() => setStep(2)}>BACK TO PAYMENT</ThreeDButton>
              <ThreeDButton onClick={handleSubmit} disabled={submitting}>
                {submitting ? "PLACING ORDER..." : "PLACE ORDER"}
              </ThreeDButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}