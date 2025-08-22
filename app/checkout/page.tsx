"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ThreeDButton } from "@/components/ui-brutalist/threed-button";
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  // Always declare all hooks at the top level
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  // Ensure component only renders client-specific content after mounting
  useEffect(() => {
    setIsClient(true);
    setHasRendered(true);
  }, []);

  // Load saved data from localStorage (only on client)
  useEffect(() => {
    if (isClient) {
      const saved = localStorage.getItem("shippingData");
      if (saved) setShippingData(JSON.parse(saved));
    }
  }, [isClient]);

  // Save data to localStorage (only on client)
  useEffect(() => {
    if (isClient && hasRendered) {
      localStorage.setItem("shippingData", JSON.stringify(shippingData));
    }
  }, [shippingData, isClient, hasRendered]);

  // Don't render anything that depends on cart state until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  // Prevent checkout if cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center p-6 border-4 border-black bg-red-100 max-w-md w-full">
          <div className="mb-6">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="mb-6 text-gray-700">Please add some products before proceeding to checkout.</p>
          </div>
          <ThreeDButton href="/products" className="w-full sm:w-auto">Continue Shopping</ThreeDButton>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = 15;
  const total = subtotal + tax + shipping;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone number to auto-prepend +92
    if (name === "phone") {
      let phoneNumber = value.replace(/\D/g, ''); // Remove non-digits
      
      // If user types starting digits, ensure it begins with 3
      if (phoneNumber.length > 0 && !phoneNumber.startsWith('3')) {
        phoneNumber = '3' + phoneNumber;
      }
      
      // Limit to 10 digits after +92
      if (phoneNumber.length > 10) {
        phoneNumber = phoneNumber.substring(0, 10);
      }
      
      setShippingData({ ...shippingData, [name]: phoneNumber });
    } else {
      setShippingData({ ...shippingData, [name]: value });
    }
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
    // Must be exactly 10 digits starting with 3
    const re = /^3\d{9}$/;
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
      toast.error("Please enter a valid Pakistani phone number (10 digits starting with 3)");
      return;
    }

    setSubmitting(true);

    const order = {
      shippingInfo: {
        ...shippingData,
        country: "Pakistan",
        phone: "+92" + shippingData.phone // Prepend +92 for storage
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
        
        // Analytics tracking
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "purchase", {
            transaction_id: data.orderId,
            value: total,
            currency: "PKR",
            items: cart.map((item) => ({
              item_id: item.id,
              item_name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          });
        }
        
        toast.success("Order placed successfully!");
        clearCart();
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem("shippingData");
        }
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

  // Inline validation helpers
  const getEmailError = () => {
    if (shippingData.email && !validateEmail(shippingData.email)) {
      return "Invalid email format";
    }
    return "";
  };

  const getPhoneError = () => {
    if (shippingData.phone && !validatePhone(shippingData.phone)) {
      if (shippingData.phone.length !== 10) {
        return "Must be exactly 10 digits";
      }
      if (!shippingData.phone.startsWith('3')) {
        return "Must start with 3";
      }
      return "Invalid phone number";
    }
    return "";
  };

  return (
    <div className="min-h-screen pt-20 relative">
      <ScrollingGrid />
      
      {/* Persistent Cart Icon */}
      <div className="fixed top-4 right-4 z-50">
        <Link 
          href="/cart" 
          className="bg-black text-white p-3 border-2 border-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="font-bold">🛒 {cart.length}</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6 overflow-x-auto">
          <Link href="/" className="hover:text-gray-700 transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
          <Link href="/cart" className="hover:text-gray-700 transition-colors whitespace-nowrap">Cart</Link>
          <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
          <span className="text-gray-900 font-bold whitespace-nowrap">Checkout</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">
          Checkout
        </h1>

        {/* Step navigation */}
        <div className="flex mb-8 border-4 border-black flex-wrap">
          {["Shipping", "Payment", "Review"].map((label, index) => (
            <button
              key={index}
              className={`flex-1 py-3 sm:py-4 uppercase font-bold transition-colors min-w-[120px] ${
                step === index + 1 ? "bg-black text-white" : "bg-white hover:bg-gray-100"
              } ${index !== 0 ? "border-t-4 sm:border-t-0 sm:border-l-4 border-black" : ""}`}
              onClick={() => setStep(index + 1)}
            >
              <span className="block sm:inline">{index + 1}.</span> {label}
            </button>
          ))}
        </div>

        {/* Enhanced Trust Information */}
        <div className="mb-6 p-4 sm:p-6 border-2 border-dashed border-gray-300 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center bg-white px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow-sm">
                <span className="text-lg sm:text-xl mr-1 sm:mr-2">🛡️</span>
                <span className="font-medium text-xs sm:text-sm">Secure checkout</span>
              </div>
              <div className="flex items-center bg-white px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow-sm">
                <span className="text-lg sm:text-xl mr-1 sm:mr-2">🚚</span>
                <span className="font-medium text-xs sm:text-sm">3-5 business days</span>
              </div>
              <div className="flex items-center bg-white px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow-sm">
                <span className="text-lg sm:text-xl mr-1 sm:mr-2">💰</span>
                <span className="font-medium text-xs sm:text-sm">Cash on Delivery</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 text-right min-w-[200px]">
              <p>
                By placing your order, you agree to our{" "}
                <Link href="/shipping-policy" className="underline hover:text-blue-600 transition-colors">
                  Shipping
                </Link>{" "}
                and{" "}
                <Link href="/returns-policy" className="underline hover:text-blue-600 transition-colors">
                  Returns Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Step 1 - Shipping */}
        {step === 1 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(["firstName", "lastName", "email", "address", "city"] as Array<
                keyof typeof shippingData
              >).map((field, idx) => (
                <div key={idx} className={["email", "address"].includes(field) ? "md:col-span-2" : ""}>
                  <label className="block mb-2 uppercase font-bold">
                    {field.replace(/([A-Z])/g, " $1")} *
                  </label>
                  <input
                    autoFocus={idx === 0}
                    type={
                      field === "email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    className="w-full brutalist-input"
                    required
                    value={shippingData[field]}
                    onChange={handleShippingChange}
                    placeholder={
                      field === "email"
                        ? "example@domain.com"
                        : undefined
                    }
                  />
                  {field === "email" && getEmailError() && (
                    <p className="text-red-500 text-sm mt-1">{getEmailError()}</p>
                  )}
                </div>
              ))}
              
              {/* Phone Number Field with Pakistan Flag */}
              <div className="md:col-span-2">
                <label className="block mb-2 uppercase font-bold">Phone Number *</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center">
                    <div className="flex items-center px-3 py-2 brutalist-input bg-gray-100 whitespace-nowrap">
                      <span className="text-lg">🇵🇰 +92</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full brutalist-input flex-1"
                      required
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      placeholder="3xxxxxxxxx"
                      maxLength={10}
                    />
                  </div>
                </div>
                {getPhoneError() && (
                  <p className="text-red-500 text-sm mt-1">{getPhoneError()}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">(e.g., 3331234567)</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-2 uppercase font-bold">Country *</label>
                <input
                  type="text"
                  value="Pakistan"
                  readOnly
                  className="w-full brutalist-input bg-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <ThreeDButton href="/cart" className="w-full sm:w-auto">BACK TO CART</ThreeDButton>
              <ThreeDButton 
                onClick={handleContinueToPayment} 
                disabled={!canProceedToPayment()}
                className="w-full sm:w-auto"
              >
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
              <div className="border-4 border-black p-4 hover:bg-gray-50 transition-colors">
                <label className="flex items-center uppercase font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="mr-2 h-5 w-5"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <span className="flex items-center">
                    <span className="mr-2">💰</span>
                    Cash on Delivery
                  </span>
                </label>
              </div>

              {/* Card Payment - Disabled with Tooltip */}
              <div className="border-4 border-gray-400 p-4 bg-gray-100 relative group opacity-90">
                <label className="flex items-center uppercase font-bold cursor-not-allowed">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="mr-2 h-5 w-5"
                    disabled
                  />
                  <span className="flex items-center">
                    <span className="mr-2">💳</span>
                    Card Payment
                    <span className="ml-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </span>
                </label>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-2 px-3 whitespace-nowrap z-50 shadow-lg">
                  Card payments will be available soon!
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-3 pl-6 opacity-50">
                    <div>
                      <label className="block mb-1">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        placeholder="1234 5678 9012 3456"
                        className="w-full brutalist-input"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          className="w-full brutalist-input"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          disabled
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
                          disabled
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
                        disabled
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <ThreeDButton onClick={() => setStep(1)} className="w-full sm:w-auto">BACK TO SHIPPING</ThreeDButton>
              <ThreeDButton onClick={() => setStep(3)} className="w-full sm:w-auto">REVIEW ORDER</ThreeDButton>
            </div>
          </div>
        )}

        {/* Step 3 - Review */}
        {step === 3 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Review Your Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase">Shipping Address</h3>
                <div className="border-4 border-black p-4 space-y-1">
                  <p className="uppercase font-bold">{shippingData.firstName} {shippingData.lastName}</p>
                  <p>{shippingData.address}</p>
                  <p>{shippingData.city}, Pakistan</p>
                  <p className="flex items-center">
                    <span className="mr-2">🇵🇰</span>
                    <span>+92{shippingData.phone}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase">Payment Method</h3>
                <div className="border-4 border-black p-4 flex items-center">
                  <span className="flex items-center">
                    {paymentMethod === "cash" ? (
                      <>
                        <span className="mr-2">💰</span>
                        Cash on Delivery
                      </>
                    ) : (
                      <>
                        <span className="mr-2">💳</span>
                        Credit Card
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8">
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
            <div className="mt-6 sm:mt-8">
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
                    <span>Tax (10%)</span>
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
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <ThreeDButton onClick={() => setStep(2)} className="w-full sm:w-auto">BACK TO PAYMENT</ThreeDButton>
              <ThreeDButton 
                onClick={handleSubmit} 
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⏳</span>
                    PLACING ORDER...
                  </span>
                ) : (
                  "PLACE ORDER"
                )}
              </ThreeDButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}