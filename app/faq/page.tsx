"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const categories = ['ALL', 'ORDERS', 'PRODUCTS', 'PAYMENTS', 'SHIPPING', 'RETURNS', 'TECHNICAL'];

  const faqData = [
    {
      id: 1,
      category: 'ORDERS',
      question: 'HOW DO I PLACE AN ORDER?',
      answer: 'Navigate to the product page, select your size and quantity, then click "ADD TO CART". Proceed to checkout and complete payment. You will receive an order confirmation email immediately.'
    },
    {
      id: 2,
      category: 'ORDERS',
      question: 'CAN I MODIFY MY ORDER AFTER PLACING IT?',
      answer: 'Orders can only be modified within 30 minutes of placement. Contact our support team immediately at help@brutalist.store or call +1 (555) 123-4567.'
    },
    {
      id: 3,
      category: 'ORDERS',
      question: 'HOW DO I CANCEL AN ORDER?',
      answer: 'Orders can be cancelled within 1 hour of placement if not yet processed. Log into your account and select "Cancel Order" or contact support immediately.'
    },
    {
      id: 4,
      category: 'PRODUCTS',
      question: 'ARE YOUR PRODUCTS AUTHENTIC?',
      answer: 'All products are 100% authentic and sourced directly from authorized distributors. We provide authenticity certificates upon request.'
    },
    {
      id: 5,
      category: 'PRODUCTS',
      question: 'DO YOU RESTOCK SOLD OUT ITEMS?',
      answer: 'Most items are restocked within 2-4 weeks. Subscribe to restock notifications on the product page to be notified immediately when available.'
    },
    {
      id: 6,
      category: 'PAYMENTS',
      question: 'WHAT PAYMENT METHODS DO YOU ACCEPT?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and cryptocurrency (Bitcoin, Ethereum).'
    },
    {
      id: 7,
      category: 'PAYMENTS',
      question: 'IS MY PAYMENT INFORMATION SECURE?',
      answer: 'Yes. We use 256-bit SSL encryption and PCI DSS compliance. Payment data is processed through secure third-party processors and never stored on our servers.'
    },
    {
      id: 8,
      category: 'SHIPPING',
      question: 'HOW LONG DOES SHIPPING TAKE?',
      answer: 'Standard shipping: 3-7 business days. Express shipping: 1-2 business days. International shipping: 7-14 business days. Free shipping on orders over $100.'
    },
    {
      id: 9,
      category: 'SHIPPING',
      question: 'DO YOU SHIP INTERNATIONALLY?',
      answer: 'Yes, we ship to over 50 countries. International shipping rates calculated at checkout. Customs duties and taxes may apply.'
    },
    {
      id: 10,
      category: 'RETURNS',
      question: 'WHAT IS YOUR RETURN POLICY?',
      answer: '30-day return window for unworn items with original tags. Items must be in original packaging. Return shipping cost is $15 unless defective.'
    },
    {
      id: 11,
      category: 'RETURNS',
      question: 'HOW DO I INITIATE A RETURN?',
      answer: 'Log into your account, go to "Order History", select the order, and click "Return Items". Print the prepaid return label and drop off at any courier location.'
    },
    {
      id: 12,
      category: 'TECHNICAL',
      question: 'THE WEBSITE IS NOT WORKING PROPERLY',
      answer: 'Clear your browser cache and cookies. Try a different browser or device. If issues persist, contact technical support at tech@brutalist.store.'
    },
    {
      id: 13,
      category: 'TECHNICAL',
      question: 'I CANNOT ACCESS MY ACCOUNT',
      answer: 'Use the "Forgot Password" link on the login page. If you continue having issues, contact support with your email address for account recovery.'
    }
  ];

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesCategory = selectedCategory === 'ALL' || faq.category === selectedCategory;
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-8 mt-10">
        <h2 className="text-8xl font-black tracking-tighter mb-2">FREQUENTLY</h2>
        <h2 className="text-8xl font-black tracking-tighter text-red-500">ASKED</h2>
        <h2 className="text-8xl font-black tracking-tighter">QUESTIONS</h2>
        <div className="mt-8 text-2xl font-mono">
          TOTAL QUESTIONS: <span className="text-red-500 font-black">{filteredFAQs.length}</span>
        </div>
      </div>

      <div className="p-8">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="flex">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 text-black" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="SEARCH QUESTIONS..."
                  className="w-full pl-16 pr-4 py-6 border-4 border-black text-2xl font-mono focus:border-red-500 focus:outline-none"
                />
              </div>
              {(searchTerm || selectedCategory !== 'ALL') && (
                <Button
                  onClick={clearSearch}
                  className="ml-4 px-6 bg-red-500 text-white border-4 border-red-500 hover:bg-black hover:border-black transition-all duration-200"
                >
                  <X className="w-8 h-8" />
                </Button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-8 h-8" />
              <span className="text-2xl font-black">FILTER BY CATEGORY:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 border-4 text-xl font-black transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-red-500 hover:text-white hover:border-red-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="border-4 border-black">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 bg-white hover:bg-gray-100 text-left flex items-center justify-between transition-all duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-black text-white px-3 py-1 text-xl font-black min-w-fit">
                      {String(faq.id).padStart(2, '0')}
                    </div>
                    <div>
                      <div className="text-sm font-black text-red-500 mb-2">
                        {faq.category}
                      </div>
                      <h3 className="text-2xl font-black tracking-tight text-left">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div className="ml-4">
                    {openItems.has(faq.id) ? (
                      <ChevronDown className="w-8 h-8 text-red-500" />
                    ) : (
                      <ChevronRight className="w-8 h-8 text-black" />
                    )}
                  </div>
                </button>
                
                {openItems.has(faq.id) && (
                  <div className="border-t-4 border-black bg-black text-white p-6">
                    <p className="text-xl font-mono leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 border-8 border-red-500 mx-auto mb-8 flex items-center justify-center">
              <X className="w-16 h-16 text-red-500" />
            </div>
            <h3 className="text-4xl font-black mb-4 tracking-tight">NO RESULTS FOUND</h3>
            <p className="text-xl font-mono mb-8">
              TRY DIFFERENT SEARCH TERMS OR CATEGORY
            </p>
            <button
              onClick={clearSearch}
              className="bg-black text-white px-8 py-4 border-4 border-black hover:bg-red-500 hover:border-red-500 transition-all duration-200 text-xl font-black"
            >
              CLEAR FILTERS
            </button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-black text-white p-8">
            <h3 className="text-4xl font-black mb-6 tracking-tight">STILL NEED HELP?</h3>
            <p className="text-xl font-mono mb-6">
              CAN'T FIND THE ANSWER YOU'RE LOOKING FOR?
            </p>
            <div className="space-y-4">
              <div className="border-l-8 border-red-500 pl-4">
                <div className="text-lg font-black">EMAIL SUPPORT</div>
                <div className="font-mono">HELP@BRUTALIST.STORE</div>
                <div className="text-sm text-red-500">RESPONSE TIME: 24H</div>
              </div>
              <div className="border-l-8 border-red-500 pl-4">
                <div className="text-lg font-black">PHONE SUPPORT</div>
                <div className="font-mono">+1 (555) 123-4567</div>
                <div className="text-sm text-red-500">MON-FRI 9AM-6PM EST</div>
              </div>
            </div>
          </div>

          <div className="bg-red-500 text-black p-8">
            <h3 className="text-4xl font-black mb-6 tracking-tight">QUICK LINKS</h3>
            <div className="space-y-4">
              <a href="/contact" className="block text-xl font-black hover:underline">
                → CONTACT US
              </a>
              <a href="/track-order" className="block text-xl font-black hover:underline">
                → TRACK YOUR ORDER
              </a>
              <a href="/shipping-returns" className="block text-xl font-black hover:underline">
                → SHIPPING & RETURNS
              </a>
              <a href="/size-guide" className="block text-xl font-black hover:underline">
                → SIZE GUIDE
              </a>
              <a href="/account" className="block text-xl font-black hover:underline">
                → YOUR ACCOUNT
              </a>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 border-8 border-black p-8">
          <h3 className="text-4xl font-black mb-8 text-center tracking-tight">FAQ STATISTICS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-black text-red-500">{faqData.length}</div>
              <div className="text-lg font-black">TOTAL QUESTIONS</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-red-500">24H</div>
              <div className="text-lg font-black">AVG RESPONSE TIME</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-red-500">95%</div>
              <div className="text-lg font-black">RESOLUTION RATE</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-red-500">7</div>
              <div className="text-lg font-black">CATEGORIES</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;