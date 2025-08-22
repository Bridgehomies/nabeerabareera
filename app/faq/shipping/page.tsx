"use client";
import React, { useState } from 'react';
import { Truck, Package, Clock, Calculator, AlertTriangle, CheckCircle, X, ArrowRight, FileText } from 'lucide-react';

// Define types for our state
type ShippingCalculator = {
  city: string;
  weight: number;
  total: number;
};

type CalculatedShipping = {
  standard: number;
  express: number;
  estimatedDays: {
    standard: string;
    express: string;
  };
} | null;

const ShippingReturns = () => {
  const [shippingCalculator, setShippingCalculator] = useState<ShippingCalculator>({
    city: '',
    weight: 1,
    total: 0
  });
  const [calculatedShipping, setCalculatedShipping] = useState<CalculatedShipping>(null);
  const [activeTab, setActiveTab] = useState('SHIPPING');
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    email: '',
    reason: '',
    comments: ''
  });

  const calculateShipping = () => {
    if (!shippingCalculator.city.trim()) return;
    
    // Mock calculation logic for Pakistan
    let baseRate = 150; // PKR
    if (shippingCalculator.total >= 5000) baseRate = 0; // Free shipping over 5000 PKR
    if (shippingCalculator.weight > 5) baseRate += 100;

    const express = baseRate > 0 ? baseRate + 200 : 250;

    setCalculatedShipping({
      standard: baseRate,
      express: express,
      estimatedDays: {
        standard: '3-5',
        express: '1-2'
      }
    });
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this form to your backend
    alert('Return request submitted successfully! We will contact you shortly.');
    setReturnForm({
      orderNumber: '',
      email: '',
      reason: '',
      comments: ''
    });
  };

  const shippingInfo = [
    { city: 'KARACHI', time: '1-2 DAYS', cost: 'RS. 150' },
    { city: 'LAHORE', time: '1-2 DAYS', cost: 'RS. 150' },
    { city: 'ISLAMABAD', time: '2-3 DAYS', cost: 'RS. 150' },
    { city: 'RAWALPINDI', time: '2-3 DAYS', cost: 'RS. 150' },
    { city: 'OTHER CITIES', time: '3-5 DAYS', cost: 'RS. 200' }
  ];

  const returnReasons = [
    'Wrong size/color received',
    'Product damaged/defective',
    'Item not as described',
    'Changed my mind',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-8 mt-10">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-2">SHIPPING</h2>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-red-500">&</h2>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter">RETURNS</h2>
      </div>

      {/* Tab Navigation */}
      <div className="border-b-8 border-black">
        <div className="flex">
          <button
            onClick={() => setActiveTab('SHIPPING')}
            className={`flex-1 py-6 text-2xl md:text-3xl font-black transition-all duration-200 ${
              activeTab === 'SHIPPING'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-red-500 hover:text-white'
            }`}
            aria-label="View shipping policy"
          >
            SHIPPING POLICY
          </button>
          <button
            onClick={() => setActiveTab('RETURNS')}
            className={`flex-1 py-6 text-2xl md:text-3xl font-black transition-all duration-200 ${
              activeTab === 'RETURNS'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-red-500 hover:text-white'
            }`}
            aria-label="View returns policy"
          >
            RETURNS POLICY
          </button>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {activeTab === 'SHIPPING' && (
          <div className="space-y-12">
            {/* Shipping Calculator */}
            <div className="bg-black text-white p-6 md:p-8">
              <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight flex items-center">
                <Calculator className="w-8 h-8 md:w-10 md:h-10 mr-4" />
                SHIPPING CALCULATOR
              </h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="city" className="block text-lg md:text-xl font-black mb-2">CITY</label>
                  <input
                    id="city"
                    type="text"
                    value={shippingCalculator.city}
                    onChange={(e) => setShippingCalculator(prev => ({...prev, city: e.target.value}))}
                    className="w-full p-3 border-4 border-white bg-black text-white font-mono focus:border-red-500 focus:outline-none"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-lg md:text-xl font-black mb-2">WEIGHT (KGS)</label>
                  <input
                    id="weight"
                    type="number"
                    value={shippingCalculator.weight}
                    onChange={(e) => setShippingCalculator(prev => ({...prev, weight: parseFloat(e.target.value) || 0}))}
                    className="w-full p-3 border-4 border-white bg-black text-white font-mono focus:border-red-500 focus:outline-none"
                    min="0.1"
                    step="0.1"
                    aria-label="Enter package weight in kilograms"
                  />
                </div>
                <div>
                  <label htmlFor="total" className="block text-lg md:text-xl font-black mb-2">ORDER TOTAL (PKR)</label>
                  <input
                    id="total"
                    type="number"
                    value={shippingCalculator.total}
                    onChange={(e) => setShippingCalculator(prev => ({...prev, total: parseFloat(e.target.value) || 0}))}
                    className="w-full p-3 border-4 border-white bg-black text-white font-mono focus:border-red-500 focus:outline-none"
                    min="0"
                    step="1"
                    placeholder="0"
                    aria-label="Enter order total amount in PKR"
                  />
                </div>
              </div>
              <button
                onClick={calculateShipping}
                className="w-full bg-red-500 text-black py-3 md:py-4 text-xl md:text-2xl font-black hover:bg-white transition-all duration-200"
                aria-label="Calculate shipping costs"
              >
                CALCULATE SHIPPING
              </button>

              {calculatedShipping && (
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <div className="border-4 border-white p-4">
                    <h4 className="text-xl md:text-2xl font-black mb-2">STANDARD DELIVERY</h4>
                    <div className="text-2xl md:text-3xl font-black text-red-500">
                      RS. {calculatedShipping.standard}
                    </div>
                    <div className="font-mono">{calculatedShipping.estimatedDays.standard} BUSINESS DAYS</div>
                  </div>
                  <div className="border-4 border-red-500 bg-red-500 text-black p-4">
                    <h4 className="text-xl md:text-2xl font-black mb-2">EXPRESS DELIVERY</h4>
                    <div className="text-2xl md:text-3xl font-black">
                      RS. {calculatedShipping.express}
                    </div>
                    <div className="font-mono font-black">{calculatedShipping.estimatedDays.express} BUSINESS DAY</div>
                  </div>
                </div>
              )}
            </div>

            {/* Pakistan Shipping Info */}
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">DELIVERY INFORMATION</h3>
              <div className="space-y-4">
                {shippingInfo.map((info, index) => (
                  <div key={index} className="border-4 border-black p-4 md:p-6 grid md:grid-cols-3 gap-4 items-center">
                    <div className="bg-black text-white px-3 py-1 md:px-4 md:py-2 text-center">
                      <div className="text-lg md:text-2xl font-black text-red-500">{info.city}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                      <span className="font-mono text-base md:text-lg">{info.time} BUSINESS DAYS</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-black text-red-500">{info.cost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Policies */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">SHIPPING RULES</h3>
                <div className="space-y-4">
                  <div className="border-l-8 border-red-500 pl-4 md:pl-6 py-3 md:py-4">
                    <h4 className="text-xl md:text-2xl font-black mb-2">FREE DELIVERY</h4>
                    <p className="font-mono text-base md:text-lg">Orders over RS. 5000 qualify for free standard delivery anywhere in Pakistan.</p>
                  </div>
                  <div className="border-l-8 border-black pl-4 md:pl-6 py-3 md:py-4">
                    <h4 className="text-xl md:text-2xl font-black mb-2">PROCESSING TIME</h4>
                    <p className="font-mono text-base md:text-lg">1-2 business days. Orders placed after 5PM PKT ship next business day.</p>
                  </div>
                  <div className="border-l-8 border-black pl-4 md:pl-6 py-3 md:py-4">
                    <h4 className="text-xl md:text-2xl font-black mb-2">DELIVERY HOURS</h4>
                    <p className="font-mono text-base md:text-lg">9AM to 8PM, Monday through Saturday. No deliveries on Sundays and public holidays.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500 text-black p-6 md:p-8">
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">IMPORTANT NOTES</h3>
                <div className="space-y-4 font-mono text-base md:text-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 mt-1" />
                    <span><strong>INTERNATIONAL:</strong> Shipping to other countries coming soon!</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 mt-1" />
                    <span><strong>CASH ON DELIVERY:</strong> Available for all orders</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 mt-1" />
                    <span><strong>TRACKING:</strong> All shipments include tracking number</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 mt-1" />
                    <span><strong>RESTRICTED ITEMS:</strong> Certain items may have delivery limitations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'RETURNS' && (
          <div className="space-y-12">
            {/* Return Process */}
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">EASY RETURN PROCESS</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="relative">
                  <div className="bg-black text-white p-4 md:p-6 h-full">
                    <div className="text-4xl md:text-6xl font-black text-red-500 mb-4">01</div>
                    <h4 className="text-xl md:text-2xl font-black mb-4">FILL RETURN FORM</h4>
                    <p className="font-mono text-base md:text-lg">Complete our simple online return form with order details</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-black text-white p-4 md:p-6 h-full">
                    <div className="text-4xl md:text-6xl font-black text-red-500 mb-4">02</div>
                    <h4 className="text-xl md:text-2xl font-black mb-4">GET APPROVAL</h4>
                    <p className="font-mono text-base md:text-lg">We'll review and approve your return request within 24 hours</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-black text-white p-4 md:p-6 h-full">
                    <div className="text-4xl md:text-6xl font-black text-red-500 mb-4">03</div>
                    <h4 className="text-xl md:text-2xl font-black mb-4">SHIP ITEM BACK</h4>
                    <p className="font-mono text-base md:text-lg">Send item back using our prepaid shipping label</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Form */}
            <div className="bg-black text-white p-6 md:p-8">
              <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight flex items-center">
                <FileText className="w-8 h-8 md:w-10 md:h-10 mr-4" />
                RETURN REQUEST FORM
              </h3>
              <form onSubmit={handleReturnSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="orderNumber" className="block text-lg md:text-xl font-black mb-2">ORDER NUMBER *</label>
                    <input
                      id="orderNumber"
                      type="text"
                      value={returnForm.orderNumber}
                      onChange={(e) => setReturnForm(prev => ({...prev, orderNumber: e.target.value}))}
                      className="w-full p-3 border-4 border-white bg-black text-white font-mono focus:border-red-500 focus:outline-none"
                      placeholder="Enter your order number"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg md:text-xl font-black mb-2">EMAIL ADDRESS *</label>
                    <input
                      id="email"
                      type="email"
                      value={returnForm.email}
                      onChange={(e) => setReturnForm(prev => ({...prev, email: e.target.value}))}
                      className="w-full p-3 border-4 border-white bg-black text-white font-mono focus:border-red-500 focus:outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-lg md:text-xl font-black mb-2">REASON FOR RETURN *</label>
                  <select
                    id="reason"
                    value={returnForm.reason}
                    onChange={(e) => setReturnForm(prev => ({...prev, reason: e.target.value}))}
                    className="w-full p-3 border-4 border-white bg-black text-white font-mono focus:border-red-500 focus:outline-none"
                    required
                    aria-label="Select reason for return"
                  >
                    <option value="">Select a reason</option>
                    {returnReasons.map((reason, index) => (
                      <option key={index} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="comments" className="block text-lg md:text-xl font-black mb-2">ADDITIONAL COMMENTS</label>
                  <textarea
                    id="comments"
                    value={returnForm.comments}
                    onChange={(e) => setReturnForm(prev => ({...prev, comments: e.target.value}))}
                    className="w-full p-3 border-4 border-white bg-black text-white font-mono focus:border-red-500 focus:outline-none h-32"
                    placeholder="Any additional details about your return..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-red-500 text-black py-4 text-xl md:text-2xl font-black hover:bg-white transition-all duration-200"
                >
                  SUBMIT RETURN REQUEST
                </button>
              </form>
            </div>

            {/* Return Policies */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">RETURN POLICY</h3>
                <div className="space-y-4">
                  <div className="border-4 border-green-500 bg-green-500 text-black p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-lg md:text-xl font-black">ELIGIBLE FOR RETURNS</span>
                    </div>
                    <ul className="font-mono text-base md:text-lg space-y-1">
                      <li>• Within 14 days of delivery</li>
                      <li>• Original tags attached</li>
                      <li>• Unworn/unwashed condition</li>
                      <li>• Original packaging</li>
                    </ul>
                  </div>

                  <div className="border-4 border-red-500 bg-red-500 text-black p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <X className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-lg md:text-xl font-black">NOT RETURNABLE</span>
                    </div>
                    <ul className="font-mono text-base md:text-lg space-y-1">
                      <li>• Undergarments and swimwear</li>
                      <li>• Personalized/custom items</li>
                      <li>• Final sale items</li>
                      <li>• Items with signs of use</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">REFUND INFORMATION</h3>
                <div className="space-y-4">
                  <div className="border-4 border-black p-4">
                    <h4 className="text-xl md:text-2xl font-black mb-2">REFUND METHOD</h4>
                    <div className="font-mono text-base md:text-lg">Original payment method (5-7 business days)</div>
                  </div>
                  <div className="border-4 border-black p-4">
                    <h4 className="text-xl md:text-2xl font-black mb-2">RETURN SHIPPING</h4>
                    <div className="font-mono text-base md:text-lg">Free return shipping for all items</div>
                  </div>
                  <div className="border-4 border-black p-4">
                    <h4 className="text-xl md:text-2xl font-black mb-2">PROCESSING TIME</h4>
                    <div className="font-mono text-base md:text-lg">Refunds processed within 3-5 business days after we receive the item</div>
                  </div>
                </div>

                <div className="mt-6 bg-red-500 text-black p-4 md:p-6">
                  <h4 className="text-xl md:text-2xl font-black mb-4">NEED HELP?</h4>
                  <div className="space-y-3 font-mono text-base md:text-lg">
                    <div>
                      <span className="font-black">EMAIL:</span> returns@nabeerabareera.com
                    </div>
                    <div>
                      <span className="font-black">WHATSAPP:</span> +92 300 0000000
                    </div>
                    <div>
                      <span className="font-black">RESPONSE TIME:</span> Within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingReturns;