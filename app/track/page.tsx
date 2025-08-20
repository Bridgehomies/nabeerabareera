"use client";
import React, { useState, useEffect } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';

// Define TypeScript interfaces
interface TrackingItem {
  name: string;
  size?: string;
  quantity: number;
  price: number;
}

interface TimelineEvent {
  status: string;
  date: string;
  time: string;
  description: string;
  active: boolean;
}

interface ShippingAddress {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

interface TrackingData {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  items: TrackingItem[];
  timeline: TimelineEvent[];
  shippingAddress: ShippingAddress;
}

interface OrderHistory {
  orderNumber: string;
  date: string;
  status: string;
  total: number;
}

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  // Mock tracking data
  const mockTrackingData: TrackingData = {
    orderNumber: '#BR20241125001',
    status: 'IN_TRANSIT',
    estimatedDelivery: '2025-08-22',
    carrier: 'BRUTALIST LOGISTICS',
    trackingNumber: 'BL123456789US',
    items: [
      { name: 'CONCRETE HOODIE', size: 'L', quantity: 1, price: 89.00 },
      { name: 'BRUTALIST TOTE BAG', quantity: 2, price: 45.00 }
    ],
    timeline: [
      { status: 'ORDERED', date: '2025-08-18', time: '14:30', description: 'ORDER PLACED AND CONFIRMED', active: true },
      { status: 'PROCESSING', date: '2025-08-18', time: '16:45', description: 'ORDER BEING PREPARED', active: true },
      { status: 'SHIPPED', date: '2025-08-19', time: '09:15', description: 'PACKAGE DISPATCHED FROM WAREHOUSE', active: true },
      { status: 'IN_TRANSIT', date: '2025-08-20', time: '11:30', description: 'PACKAGE IN TRANSIT TO DESTINATION', active: true },
      { status: 'OUT_FOR_DELIVERY', date: '', time: '', description: 'OUT FOR DELIVERY', active: false },
      { status: 'DELIVERED', date: '', time: '', description: 'PACKAGE DELIVERED', active: false }
    ],
    shippingAddress: {
      name: 'JOHN BRUTALIST',
      address1: '456 MODERNIST AVENUE',
      address2: 'APT 7B',
      city: 'NEW YORK',
      state: 'NY',
      zip: '10002'
    }
  };

  const mockOrderHistory: OrderHistory[] = [
    { orderNumber: '#BR20241120001', date: '2025-08-15', status: 'DELIVERED', total: 156.00 },
    { orderNumber: '#BR20241118001', date: '2025-08-10', status: 'DELIVERED', total: 89.00 },
    { orderNumber: '#BR20241115001', date: '2025-08-05', status: 'RETURNED', total: 234.00 }
  ];

  const handleTrack = () => {
    setError('');
    if (!orderNumber.trim()) {
      setError('ORDER NUMBER REQUIRED');
      return;
    }
    if (!email.trim()) {
      setError('EMAIL REQUIRED');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: string, active: boolean) => {
    const iconClass = `w-8 h-8 ${active ? 'text-red-500' : 'text-gray-400'}`;
    
    switch (status) {
      case 'ORDERED':
        return <CheckCircle className={iconClass} />;
      case 'PROCESSING':
        return <Clock className={iconClass} />;
      case 'SHIPPED':
        return <Package className={iconClass} />;
      case 'IN_TRANSIT':
        return <Truck className={iconClass} />;
      case 'OUT_FOR_DELIVERY':
        return <Truck className={iconClass} />;
      case 'DELIVERED':
        return <CheckCircle className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 border-8 border-red-500 mx-auto mb-8 flex items-center justify-center animate-pulse">
            <Truck className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tighter">TRACKING</h1>
          <h2 className="text-4xl font-black mb-8 tracking-tighter">ORDER...</h2>
          <div className="font-mono text-xl">PLEASE WAIT</div>
        </div>
      </div>
    );
  }

  if (trackingData) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-6xl font-black tracking-tighter mb-2">ORDER</h1>
              <h2 className="text-6xl font-black tracking-tighter text-red-500">{trackingData.orderNumber}</h2>
            </div>
            <button
              onClick={() => setTrackingData(null)}
              className="bg-red-500 text-black px-6 py-3 text-xl font-black hover:bg-white transition-all duration-200"
            >
              TRACK ANOTHER
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Status Overview */}
          <div className="mb-12 grid md:grid-cols-3 gap-8">
            <div className="bg-black text-white p-6">
              <h3 className="text-2xl font-black mb-4">CURRENT STATUS</h3>
              <div className="text-4xl font-black text-red-500 mb-2">{trackingData.status.replace('_', ' ')}</div>
              <div className="font-mono">TRACKING: {trackingData.trackingNumber}</div>
            </div>
            
            <div className="bg-red-500 text-black p-6">
              <h3 className="text-2xl font-black mb-4">ESTIMATED DELIVERY</h3>
              <div className="text-4xl font-black mb-2">AUG 22</div>
              <div className="font-mono font-black">2025 - THURSDAY</div>
            </div>
            
            <div className="border-4 border-black p-6">
              <h3 className="text-2xl font-black mb-4">CARRIER</h3>
              <div className="text-2xl font-black mb-2">{trackingData.carrier}</div>
              <div className="font-mono">EXPEDITED SHIPPING</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h3 className="text-4xl font-black mb-8 tracking-tight">TRACKING TIMELINE</h3>
            <div className="space-y-4">
              {trackingData.timeline.map((event: TimelineEvent, index: number) => (
                <div key={index} className={`border-l-8 ${event.active ? 'border-red-500 bg-black text-white' : 'border-gray-300 bg-gray-100'} p-6`}>
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(event.status, event.active)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-2xl font-black">{event.status.replace('_', ' ')}</h4>
                          <p className={`text-lg font-mono ${event.active ? 'text-red-500' : 'text-gray-600'}`}>
                            {event.description}
                          </p>
                        </div>
                        {event.date && (
                          <div className="text-right font-mono">
                            <div className="text-lg font-black">{event.date}</div>
                            <div className="text-sm">{event.time}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">ORDER ITEMS</h3>
              <div className="space-y-4">
                {trackingData.items.map((item: TrackingItem, index: number) => (
                  <div key={index} className="border-4 border-black p-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-black">{item.name}</h4>
                      <div className="font-mono">
                        {item.size && `SIZE: ${item.size} | `}QTY: {item.quantity}
                      </div>
                    </div>
                    <div className="text-2xl font-black">${item.price.toFixed(2)}</div>
                  </div>
                ))}
                <div className="bg-black text-white p-4 flex justify-between items-center">
                  <div className="text-2xl font-black">TOTAL</div>
                  <div className="text-2xl font-black text-red-500">
                    ${trackingData.items.reduce((sum: number, item: TrackingItem) => sum + (item.price * item.quantity), 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">DELIVERY ADDRESS</h3>
              <div className="border-4 border-black p-6">
                <div className="font-mono text-xl space-y-2">
                  <div className="font-black">{trackingData.shippingAddress.name}</div>
                  <div>{trackingData.shippingAddress.address1}</div>
                  {trackingData.shippingAddress.address2 && <div>{trackingData.shippingAddress.address2}</div>}
                  <div>
                    {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state} {trackingData.shippingAddress.zip}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order History Toggle */}
          <div className="border-t-8 border-black pt-8">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full bg-red-500 text-black p-6 text-2xl font-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center space-x-4"
            >
              <Eye className="w-8 h-8" />
              <span>{showHistory ? 'HIDE' : 'SHOW'} ORDER HISTORY</span>
            </button>

            {showHistory && (
              <div className="mt-8">
                <h3 className="text-4xl font-black mb-6 tracking-tight">PREVIOUS ORDERS</h3>
                <div className="space-y-4">
                  {mockOrderHistory.map((order: OrderHistory, index: number) => (
                    <div key={index} className="border-4 border-black p-4 flex justify-between items-center hover:bg-gray-100 transition-all duration-200">
                      <div>
                        <div className="text-xl font-black">{order.orderNumber}</div>
                        <div className="font-mono">{order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-black ${order.status === 'DELIVERED' ? 'text-green-600' : order.status === 'RETURNED' ? 'text-red-500' : 'text-yellow-600'}`}>
                          {order.status}
                        </div>
                        <div className="text-xl font-black">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-8 mt-10">
        <h2 className="text-8xl font-black tracking-tighter mb-2">TRACK</h2>
        <h2 className="text-8xl font-black tracking-tighter text-red-500">ORDER</h2>
      </div>

      <div className="p-8">
        {/* Tracking Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-black text-white p-8 mb-8">
            <h3 className="text-4xl font-black mb-6 tracking-tight">ENTER ORDER DETAILS</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-2xl font-black mb-2">ORDER NUMBER *</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="#BR20241125001"
                  className="w-full p-4 border-4 border-white bg-black text-white text-xl font-mono focus:border-red-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-2xl font-black mb-2">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full p-4 border-4 border-white bg-black text-white text-xl font-mono focus:border-red-500 focus:outline-none"
                />
              </div>

              {error && (
                <div className="bg-red-500 text-black p-4 border-4 border-red-500">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-6 h-6" />
                    <span className="text-xl font-black">{error}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleTrack}
                className="w-full bg-red-500 text-black py-6 px-8 text-2xl font-black hover:bg-white transition-all duration-200 flex items-center justify-center space-x-4"
              >
                <Search className="w-8 h-8" />
                <span>TRACK ORDER</span>
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-4 border-black p-6">
              <h4 className="text-2xl font-black mb-4">NEED HELP?</h4>
              <div className="space-y-2 font-mono">
                <div>EMAIL: HELP@BRUTALIST.STORE</div>
                <div>PHONE: +1 (555) 123-4567</div>
                <div className="text-red-500 font-black">24/7 SUPPORT AVAILABLE</div>
              </div>
            </div>
            
            <div className="bg-red-500 text-black p-6">
              <h4 className="text-2xl font-black mb-4">ORDER TIPS</h4>
              <div className="space-y-2 font-mono font-black">
                <div>• ORDER NUMBERS START WITH #BR</div>
                <div>• USE EMAIL FROM CONFIRMATION</div>
                <div>• ALLOW 24H FOR TRACKING UPDATE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;