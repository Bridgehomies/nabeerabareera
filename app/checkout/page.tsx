// // "use client"

// // import { useState } from "react"
// // import Link from "next/link"
// // import { ChevronRight, CreditCard, Clock } from "lucide-react"
// // import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
// // import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

// // export default function CheckoutPage() {
// //   const [step, setStep] = useState(1)

// //   return (
// //     <div className="min-h-screen pt-20 relative">
// //       <ScrollingGrid />

// //       <div className="container mx-auto px-4 py-8 relative z-10">
// //         <div className="flex items-center text-sm mb-6">
// //           <Link href="/" className="hover:text-gray-700">
// //             Home
// //           </Link>
// //           <ChevronRight className="h-4 w-4 mx-1" />
// //           <Link href="/cart" className="hover:text-gray-700">
// //             Cart
// //           </Link>
// //           <ChevronRight className="h-4 w-4 mx-1" />
// //           <span className="text-gray-900 font-bold">Checkout</span>
// //         </div>

// //         <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">Checkout</h1>

// //         <div className="flex mb-8 border-4 border-black">
// //           <button
// //             className={`flex-1 py-4 uppercase font-bold ${step === 1 ? "bg-black text-white" : "bg-white"}`}
// //             onClick={() => setStep(1)}
// //           >
// //             1. Shipping
// //           </button>
// //           <button
// //             className={`flex-1 py-4 uppercase font-bold border-l-4 border-black ${step === 2 ? "bg-black text-white" : "bg-white"}`}
// //             onClick={() => setStep(2)}
// //           >
// //             2. Payment
// //           </button>
// //           <button
// //             className={`flex-1 py-4 uppercase font-bold border-l-4 border-black ${step === 3 ? "bg-black text-white" : "bg-white"}`}
// //             onClick={() => setStep(3)}
// //           >
// //             3. Review
// //           </button>
// //         </div>

// //         {step === 1 && (
// //           <div className="brutalist-container bg-white">
// //             <h2 className="text-2xl font-bold mb-6 uppercase">Shipping Information</h2>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block mb-2 uppercase font-bold">First Name *</label>
// //                 <input type="text" className="w-full brutalist-input" required />
// //               </div>
// //               <div>
// //                 <label className="block mb-2 uppercase font-bold">Last Name *</label>
// //                 <input type="text" className="w-full brutalist-input" required />
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="block mb-2 uppercase font-bold">Email Address *</label>
// //                 <input type="email" className="w-full brutalist-input" required />
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="block mb-2 uppercase font-bold">Street Address *</label>
// //                 <input type="text" className="w-full brutalist-input" required />
// //               </div>
// //               <div>
// //                 <label className="block mb-2 uppercase font-bold">City *</label>
// //                 <input type="text" className="w-full brutalist-input" required />
// //               </div>
// //               <div>
// //                 <label className="block mb-2 uppercase font-bold">Postal Code *</label>
// //                 <input type="text" className="w-full brutalist-input" required />
// //               </div>
// //               <div>
// //                 <label className="block mb-2 uppercase font-bold">Country *</label>
// //                 <select className="w-full brutalist-input" required>
// //                   <option value="">Select Country</option>
// //                   <option value="US">United States</option>
// //                   <option value="CA">Canada</option>
// //                   <option value="UK">United Kingdom</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block mb-2 uppercase font-bold">Phone Number *</label>
// //                 <input type="tel" className="w-full brutalist-input" required />
// //               </div>
// //             </div>

// //             <div className="flex justify-between mt-8">
// //               <ThreeDButton href="/cart">BACK TO CART</ThreeDButton>
// //               <ThreeDButton onClick={() => setStep(2)}>CONTINUE TO PAYMENT</ThreeDButton>
// //             </div>
// //           </div>
// //         )}

// //         {step === 2 && (
// //           <div className="brutalist-container bg-white">
// //             <h2 className="text-2xl font-bold mb-6 uppercase">Payment Information</h2>

// //             <div className="mb-6">
// //               <div className="border-4 border-black p-4 mb-4">
// //                 <label className="flex items-center uppercase font-bold">
// //                   <input type="radio" name="paymentMethod" className="mr-2" defaultChecked />
// //                   <CreditCard className="mr-2" /> Credit Card
// //                 </label>
// //               </div>
// //               <div className="border-4 border-black p-4">
// //                 <label className="flex items-center uppercase font-bold">
// //                   <input type="radio" name="paymentMethod" className="mr-2" />
// //                   <Clock className="mr-2" /> Pay Later
// //                 </label>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="md:col-span-2">
// //                 <label className="block mb-2 uppercase font-bold">Card Number *</label>
// //                 <input type="text" className="w-full brutalist-input" placeholder="XXXX XXXX XXXX XXXX" required />
// //               </div>
// //               <div>
// //                 <label className="block mb-2 uppercase font-bold">Expiration Date *</label>
// //                 <input type="text" className="w-full brutalist-input" placeholder="MM/YY" required />
// //               </div>
// //               <div>
// //                 <label className="block mb-2 uppercase font-bold">CVV *</label>
// //                 <input type="text" className="w-full brutalist-input" placeholder="123" required />
// //               </div>
// //               <div className="md:col-span-2">
// //                 <label className="block mb-2 uppercase font-bold">Name on Card *</label>
// //                 <input type="text" className="w-full brutalist-input" required />
// //               </div>
// //             </div>

// //             <div className="flex justify-between mt-8">
// //               <ThreeDButton onClick={() => setStep(1)}>BACK TO SHIPPING</ThreeDButton>
// //               <ThreeDButton onClick={() => setStep(3)}>REVIEW ORDER</ThreeDButton>
// //             </div>
// //           </div>
// //         )}

// //         {step === 3 && (
// //           <div className="brutalist-container bg-white">
// //             <h2 className="text-2xl font-bold mb-6 uppercase">Review Your Order</h2>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //               <div>
// //                 <h3 className="text-xl font-bold mb-4 uppercase">Shipping Address</h3>
// //                 <div className="border-4 border-black p-4">
// //                   <p className="uppercase">John Doe</p>
// //                   <p>123 Brutalism Street</p>
// //                   <p>New York, NY 10001</p>
// //                   <p>United States</p>
// //                   <p>+1 (555) 123-4567</p>
// //                 </div>
// //               </div>
// //               <div>
// //                 <h3 className="text-xl font-bold mb-4 uppercase">Payment Method</h3>
// //                 <div className="border-4 border-black p-4 flex items-center">
// //                   <CreditCard className="mr-2" />
// //                   <div>
// //                     <p className="uppercase font-bold">Credit Card</p>
// //                     <p>**** **** **** 1234</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-8">
// //               <h3 className="text-xl font-bold mb-4 uppercase">Order Summary</h3>
// //               <div className="border-4 border-black">
// //                 <div className="p-4 border-b-4 border-black bg-black text-white">
// //                   <div className="flex justify-between uppercase">
// //                     <span>3 Items</span>
// //                     <span>$329.97</span>
// //                   </div>
// //                 </div>
// //                 <div className="p-4 space-y-2">
// //                   <div className="flex justify-between uppercase">
// //                     <span>Subtotal</span>
// //                     <span>$329.97</span>
// //                   </div>
// //                   <div className="flex justify-between uppercase">
// //                     <span>Tax</span>
// //                     <span>$33.00</span>
// //                   </div>
// //                   <div className="flex justify-between uppercase">
// //                     <span>Shipping</span>
// //                     <span>$15.00</span>
// //                   </div>
// //                   <div className="flex justify-between text-xl border-t-4 border-black pt-2 uppercase font-bold">
// //                     <span>Total</span>
// //                     <span>$377.97</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex justify-between mt-8">
// //               <ThreeDButton onClick={() => setStep(2)}>BACK TO PAYMENT</ThreeDButton>
// //               <ThreeDButton onClick={() => (window.location.href = "/order-confirmation")}>PLACE ORDER</ThreeDButton>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { ChevronRight, CreditCard, Clock } from "lucide-react"
// import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
// import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

// export default function CheckoutPage() {
//   const [step, setStep] = useState(1)

//   const [shippingData, setShippingData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     phone: "",
//   })

//   const [paymentMethod, setPaymentMethod] = useState("card") // or "later"
//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     expiry: "",
//     cvv: "",
//     nameOnCard: "",
//   })

//   const [submitting, setSubmitting] = useState(false)

//   const handleShippingChange = (e: { target: { name: any; value: any } }) => {
//     setShippingData({ ...shippingData, [e.target.name]: e.target.value })
//   }

//   const handleCardChange = (e: { target: { name: any; value: any } }) => {
//     setCardDetails({ ...cardDetails, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async () => {
//     setSubmitting(true)

//     const order = {
//       shippingInfo: shippingData,
//       paymentMethod,
//       cardDetails: paymentMethod === "card" ? cardDetails : {},
//       items: [
//         // This should come from your cart state
//         { productId: "123", name: "Brutalist T-Shirt", price: 99.99, quantity: 1 }
//       ],
//       total: 377.97, // You can calculate it dynamically
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(order),
//       })

//       if (res.ok) {
//         const data = await res.json()
//         alert("Order placed successfully!")
//         window.location.href = "/order-confirmation"
//       } else {
//         const error = await res.json()
//         alert("Order failed: " + error.message)
//       }
//     } catch (err) {
//       alert("Server error: " + err.message)
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen pt-20 relative">
//       <ScrollingGrid />

//       <div className="container mx-auto px-4 py-8 relative z-10">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm mb-6">
//           <Link href="/" className="hover:text-gray-700">Home</Link>
//           <ChevronRight className="h-4 w-4 mx-1" />
//           <Link href="/cart" className="hover:text-gray-700">Cart</Link>
//           <ChevronRight className="h-4 w-4 mx-1" />
//           <span className="text-gray-900 font-bold">Checkout</span>
//         </div>

//         <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">Checkout</h1>

//         {/* Step navigation */}
//         <div className="flex mb-8 border-4 border-black">
//           {["Shipping", "Payment", "Review"].map((label, index) => (
//             <button
//               key={index}
//               className={`flex-1 py-4 uppercase font-bold ${step === index + 1 ? "bg-black text-white" : "bg-white"} ${index !== 0 && "border-l-4 border-black"}`}
//               onClick={() => setStep(index + 1)}
//             >
//               {index + 1}. {label}
//             </button>
//           ))}
//         </div>

//         {/* Step 1 - Shipping */}
//         {step === 1 && (
//           <div className="brutalist-container bg-white">
//             <h2 className="text-2xl font-bold mb-6 uppercase">Shipping Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {["firstName", "lastName", "email", "address", "city", "postalCode", "country", "phone"].map((field, idx) => (
//                 <div key={idx} className={["email", "address"].includes(field) ? "md:col-span-2" : ""}>
//                   <label className="block mb-2 uppercase font-bold">
//                     {field.replace(/([A-Z])/g, " $1")} *
//                   </label>
//                   {field === "country" ? (
//                     <select name={field} className="w-full brutalist-input" required value={shippingData[field]} onChange={handleShippingChange}>
//                       <option value="">Select Country</option>
//                       <option value="US">United States</option>
//                       <option value="CA">Canada</option>
//                       <option value="UK">United Kingdom</option>
//                     </select>
//                   ) : (
//                     <input
//                       type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
//                       name={field}
//                       className="w-full brutalist-input"
//                       required
//                       value={shippingData[field]}
//                       onChange={handleShippingChange}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-between mt-8">
//               <ThreeDButton href="/cart">BACK TO CART</ThreeDButton>
//               <ThreeDButton onClick={() => setStep(2)}>CONTINUE TO PAYMENT</ThreeDButton>
//             </div>
//           </div>
//         )}

//         {/* Step 2 - Payment */}
//         {step === 2 && (
//           <div className="brutalist-container bg-white">
//             <h2 className="text-2xl font-bold mb-6 uppercase">Payment Information</h2>
//             <div className="mb-6">
//               {["card", "later"].map((method) => (
//                 <div key={method} className="border-4 border-black p-4 mb-4">
//                   <label className="flex items-center uppercase font-bold">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       className="mr-2"
//                       value={method}
//                       checked={paymentMethod === method}
//                       onChange={() => setPaymentMethod(method)}
//                     />
//                     {method === "card" ? <CreditCard className="mr-2" /> : <Clock className="mr-2" />}
//                     {method === "card" ? "Credit Card" : "Pay Later"}
//                   </label>
//                 </div>
//               ))}
//             </div>

//             {paymentMethod === "card" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="md:col-span-2">
//                   <label className="block mb-2 uppercase font-bold">Card Number *</label>
//                   <input
//                     name="number"
//                     type="text"
//                     className="w-full brutalist-input"
//                     value={cardDetails.number}
//                     onChange={handleCardChange}
//                     placeholder="XXXX XXXX XXXX XXXX"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 uppercase font-bold">Expiration Date *</label>
//                   <input
//                     name="expiry"
//                     type="text"
//                     className="w-full brutalist-input"
//                     value={cardDetails.expiry}
//                     onChange={handleCardChange}
//                     placeholder="MM/YY"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 uppercase font-bold">CVV *</label>
//                   <input
//                     name="cvv"
//                     type="text"
//                     className="w-full brutalist-input"
//                     value={cardDetails.cvv}
//                     onChange={handleCardChange}
//                     placeholder="123"
//                     required
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block mb-2 uppercase font-bold">Name on Card *</label>
//                   <input
//                     name="nameOnCard"
//                     type="text"
//                     className="w-full brutalist-input"
//                     value={cardDetails.nameOnCard}
//                     onChange={handleCardChange}
//                     required
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-between mt-8">
//               <ThreeDButton onClick={() => setStep(1)}>BACK TO SHIPPING</ThreeDButton>
//               <ThreeDButton onClick={() => setStep(3)}>REVIEW ORDER</ThreeDButton>
//             </div>
//           </div>
//         )}

//         {/* Step 3 - Review */}
//         {step === 3 && (
//           <div className="brutalist-container bg-white">
//             <h2 className="text-2xl font-bold mb-6 uppercase">Review Your Order</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <h3 className="text-xl font-bold mb-4 uppercase">Shipping Address</h3>
//                 <div className="border-4 border-black p-4 space-y-1">
//                   <p className="uppercase">{shippingData.firstName} {shippingData.lastName}</p>
//                   <p>{shippingData.address}</p>
//                   <p>{shippingData.city}, {shippingData.postalCode}</p>
//                   <p>{shippingData.country}</p>
//                   <p>{shippingData.phone}</p>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold mb-4 uppercase">Payment Method</h3>
//                 <div className="border-4 border-black p-4 flex items-center">
//                   {paymentMethod === "card" ? (
//                     <>
//                       <CreditCard className="mr-2" />
//                       <div>
//                         <p className="uppercase font-bold">Credit Card</p>
//                         <p>**** **** **** {cardDetails.number.slice(-4)}</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <Clock className="mr-2" />
//                       <p className="uppercase font-bold">Pay Later</p>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <h3 className="text-xl font-bold mb-4 uppercase">Order Summary</h3>
//               <div className="border-4 border-black">
//                 <div className="p-4 border-b-4 border-black bg-black text-white">
//                   <div className="flex justify-between uppercase">
//                     <span>3 Items</span>
//                     <span>$329.97</span>
//                   </div>
//                 </div>
//                 <div className="p-4 space-y-2">
//                   <div className="flex justify-between uppercase">
//                     <span>Subtotal</span>
//                     <span>$329.97</span>
//                   </div>
//                   <div className="flex justify-between uppercase">
//                     <span>Tax</span>
//                     <span>$33.00</span>
//                   </div>
//                   <div className="flex justify-between uppercase">
//                     <span>Shipping</span>
//                     <span>$15.00</span>
//                   </div>
//                   <div className="flex justify-between text-xl border-t-4 border-black pt-2 uppercase font-bold">
//                     <span>Total</span>
//                     <span>$377.97</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between mt-8">
//               <ThreeDButton onClick={() => setStep(2)}>BACK TO PAYMENT</ThreeDButton>
//               <ThreeDButton onClick={handleSubmit} disabled={submitting}>
//                 {submitting ? "PLACING ORDER..." : "PLACE ORDER"}
//               </ThreeDButton>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, CreditCard, Clock } from "lucide-react";
import { ThreeDButton } from "@/components/ui-brutalist/threed-button";
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card"); // or "later"
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const order = {
      shippingInfo: shippingData,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : {},
      items: [
        { productId: "123", name: "Brutalist T-Shirt", price: 99.99, quantity: 3 }
      ],
      total: 299.97,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        const data = await res.json();
        alert("Order placed successfully! Order ID: " + data.orderId);
        window.location.href = "/order-confirmation";
      } else {
        const error = await res.json();
        alert("Order failed: " + error.message);
      }
    } catch (err: any) {
      alert("Server error: " + err.message);
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

        <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">Checkout</h1>

        {/* Step navigation */}
        <div className="flex mb-8 border-4 border-black">
          {["Shipping", "Payment", "Review"].map((label, index) => (
            <button
              key={index}
              className={`flex-1 py-4 uppercase font-bold ${step === index + 1 ? "bg-black text-white" : "bg-white"} ${index !== 0 ? "border-l-4 border-black" : ""}`}
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
              {["firstName", "lastName", "email", "address", "city", "postalCode", "country", "phone"].map((field, idx) => (
                <div key={idx} className={["email", "address"].includes(field) ? "md:col-span-2" : ""}>
                  <label className="block mb-2 uppercase font-bold">
                    {field.replace(/([A-Z])/g, " $1")} *
                  </label>
                  {field === "country" ? (
                    <select name={field} className="w-full brutalist-input" required value={shippingData[field]} onChange={handleShippingChange}>
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  ) : (
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      name={field}
                      className="w-full brutalist-input"
                      required
                      value={shippingData[field]}
                      onChange={handleShippingChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <ThreeDButton href="/cart">BACK TO CART</ThreeDButton>
              <ThreeDButton onClick={() => setStep(2)}>CONTINUE TO PAYMENT</ThreeDButton>
            </div>
          </div>
        )}

        {/* Step 2 - Payment */}
        {step === 2 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Payment Information</h2>
            <div className="mb-6">
              {["card", "later"].map((method) => (
                <div key={method} className="border-4 border-black p-4 mb-4">
                  <label className="flex items-center uppercase font-bold cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="mr-2"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    {method === "card" ? <CreditCard className="mr-2" /> : <Clock className="mr-2" />}
                    {method === "card" ? "Credit Card" : "Pay Later"}
                  </label>
                </div>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block mb-2 uppercase font-bold">Card Number *</label>
                  <input
                    name="number"
                    type="text"
                    className="w-full brutalist-input"
                    value={cardDetails.number}
                    onChange={handleCardChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 uppercase font-bold">Expiration Date *</label>
                  <input
                    name="expiry"
                    type="text"
                    className="w-full brutalist-input"
                    value={cardDetails.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 uppercase font-bold">CVV *</label>
                  <input
                    name="cvv"
                    type="text"
                    className="w-full brutalist-input"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 uppercase font-bold">Name on Card *</label>
                  <input
                    name="nameOnCard"
                    type="text"
                    className="w-full brutalist-input"
                    value={cardDetails.nameOnCard}
                    onChange={handleCardChange}
                    required
                  />
                </div>
              </div>
            )}

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
                  <p>{shippingData.city}, {shippingData.postalCode}</p>
                  <p>{shippingData.country}</p>
                  <p>{shippingData.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase">Payment Method</h3>
                <div className="border-4 border-black p-4 flex items-center">
                  {paymentMethod === "card" ? (
                    <>
                      <CreditCard className="mr-2" />
                      <div>
                        <p className="uppercase font-bold">Credit Card</p>
                        <p>**** **** **** {cardDetails.number.slice(-4)}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Clock className="mr-2" />
                      <p className="uppercase font-bold">Pay Later</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 uppercase">Order Summary</h3>
              <div className="border-4 border-black">
                <div className="p-4 border-b-4 border-black bg-black text-white">
                  <div className="flex justify-between uppercase">
                    <span>{orderItemsCount()} Items</span>
                    <span>${orderTotal().toFixed(2)}</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between uppercase">
                    <span>Subtotal</span>
                    <span>${orderTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Tax</span>
                    <span>${(orderTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Shipping</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between text-xl border-t-4 border-black pt-2 uppercase font-bold">
                    <span>Total</span>
                    <span>${(orderTotal() * 1.1 + 15).toFixed(2)}</span>
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

  // Helper functions
  function orderItemsCount() {
    return 3; // hardcoded for demo
  }
  function orderTotal() {
    return 299.97; // hardcoded for demo
  }
}
