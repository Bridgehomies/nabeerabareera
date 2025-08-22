"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const SizeChart = () => {
  const [activeCategory, setActiveCategory] = useState('mens');

  // Size chart data
  const mensCoats = [
    { size: 'S', chest: '36-38"', waist: '30-32"', hip: '36-38"', shoulder: '16"', sleeve: '33"' },
    { size: 'M', chest: '39-41"', waist: '33-35"', hip: '39-41"', shoulder: '16.5"', sleeve: '33.5"' },
    { size: 'L', chest: '42-44"', waist: '36-38"', hip: '42-44"', shoulder: '17"', sleeve: '34"' },
    { size: 'XL', chest: '45-47"', waist: '39-41"', hip: '45-47"', shoulder: '17.5"', sleeve: '34.5"' },
    { size: 'XXL', chest: '48-50"', waist: '42-44"', hip: '48-50"', shoulder: '18"', sleeve: '35"' },
  ];

  const womensCoats = [
    { size: 'XS', chest: '32-34"', waist: '26-28"', hip: '34-36"', shoulder: '15"', sleeve: '32"' },
    { size: 'S', chest: '35-37"', waist: '29-31"', hip: '37-39"', shoulder: '15.5"', sleeve: '32.5"' },
    { size: 'M', chest: '38-40"', waist: '32-34"', hip: '40-42"', shoulder: '16"', sleeve: '33"' },
    { size: 'L', chest: '41-43"', waist: '35-37"', hip: '43-45"', shoulder: '16.5"', sleeve: '33.5"' },
    { size: 'XL', chest: '44-46"', waist: '38-40"', hip: '46-48"', shoulder: '17"', sleeve: '34"' },
  ];

  const kidsClothes = [
    { size: '2-3Y', height: '90-100cm', chest: '52-56cm', waist: '50-54cm' },
    { size: '4-5Y', height: '100-110cm', chest: '56-60cm', waist: '54-58cm' },
    { size: '6-7Y', height: '110-120cm', chest: '60-64cm', waist: '58-62cm' },
    { size: '8-9Y', height: '120-130cm', chest: '64-68cm', waist: '62-66cm' },
    { size: '10-11Y', height: '130-140cm', chest: '68-72cm', waist: '66-70cm' },
    { size: '12-13Y', height: '140-150cm', chest: '72-76cm', waist: '70-74cm' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6 md:p-8 mt-10">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-2">SIZE</h2>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-red-500">CHART</h2>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 p-4 md:p-6">
        <a href="/" className="hover:text-gray-700 focus:underline">Home</a>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900">Size Chart</span>
      </div>

      <div className="p-4 md:p-8">
        {/* Category Tabs */}
        <div className="border-b-8 border-black mb-12">
          <div className="flex flex-wrap">
            <button
              onClick={() => setActiveCategory('mens')}
              className={`px-6 py-4 text-lg md:text-2xl font-black transition-all duration-200 ${
                activeCategory === 'mens'
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-red-500 hover:text-white'
              }`}
              aria-label="View men's coat sizes"
            >
              MEN'S COATS
            </button>
            <button
              onClick={() => setActiveCategory('womens')}
              className={`px-6 py-4 text-lg md:text-2xl font-black transition-all duration-200 ${
                activeCategory === 'womens'
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-red-500 hover:text-white'
              }`}
              aria-label="View women's coat sizes"
            >
              WOMEN'S COATS
            </button>
            <button
              onClick={() => setActiveCategory('kids')}
              className={`px-6 py-4 text-lg md:text-2xl font-black transition-all duration-200 ${
                activeCategory === 'kids'
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-red-500 hover:text-white'
              }`}
              aria-label="View kids' clothing sizes"
            >
              KIDS' CLOTHING
            </button>
          </div>
        </div>

        {/* Size Chart Content */}
        <div className="space-y-12">
          {/* Measurement Guide */}
          <div className="bg-black text-white p-6 md:p-8">
            <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight">HOW TO MEASURE</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-4 border-white p-4">
                <div className="text-5xl font-black text-red-500 mb-4">01</div>
                <h4 className="text-xl font-black mb-2">CHEST/BUST</h4>
                <p className="font-mono">Measure around the fullest part of your chest/bust</p>
              </div>
              <div className="border-4 border-white p-4">
                <div className="text-5xl font-black text-red-500 mb-4">02</div>
                <h4 className="text-xl font-black mb-2">WAIST</h4>
                <p className="font-mono">Measure around your natural waistline</p>
              </div>
              <div className="border-4 border-white p-4">
                <div className="text-5xl font-black text-red-500 mb-4">03</div>
                <h4 className="text-xl font-black mb-2">HIPS</h4>
                <p className="font-mono">Measure around the fullest part of your hips</p>
              </div>
            </div>
          </div>

          {/* Size Charts */}
          {activeCategory === 'mens' && (
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">MEN'S COAT SIZES</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-4 border-black">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="p-4 text-left text-lg md:text-xl font-black">SIZE</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">CHEST (INCH)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">WAIST (INCH)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">HIP (INCH)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">SHOULDER (INCH)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">SLEEVE (INCH)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mensCoats.map((item, index) => (
                      <tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                      >
                        <td className="p-4 border-t-4 border-black font-black text-lg">{item.size}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.chest}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.waist}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.hip}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.shoulder}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeCategory === 'womens' && (
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">WOMEN'S COAT SIZES</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-4 border-black">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="p-4 text-left text-lg md:text-xl font-black">SIZE</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">CHEST (INCH)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">WAIST (INCH)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">HIP (INCH)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">SHOULDER (INCH)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">SLEEVE (INCH)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {womensCoats.map((item, index) => (
                      <tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                      >
                        <td className="p-4 border-t-4 border-black font-black text-lg">{item.size}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.chest}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.waist}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.hip}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.shoulder}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeCategory === 'kids' && (
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">KIDS' CLOTHING SIZES</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-4 border-black">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="p-4 text-left text-lg md:text-xl font-black">AGE</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">HEIGHT (CM)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">CHEST (CM)</th>
                      <th className="p-4 text-left text-lg md:text-xl font-black">WAIST (CM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kidsClothes.map((item, index) => (
                      <tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                      >
                        <td className="p-4 border-t-4 border-black font-black text-lg">{item.size}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.height}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.chest}</td>
                        <td className="p-4 border-t-4 border-black font-mono">{item.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-red-500 text-black p-6 md:p-8">
            <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight">IMPORTANT NOTES</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <span className="font-black text-xl">•</span>
                  <span className="font-mono text-lg">Measurements are in inches unless specified</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-black text-xl">•</span>
                  <span className="font-mono text-lg">All measurements are body measurements, not garment measurements</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-black text-xl">•</span>
                  <span className="font-mono text-lg">Sizes may vary slightly between collections</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <span className="font-black text-xl">•</span>
                  <span className="font-mono text-lg">If between sizes, size up for a looser fit or size down for a tighter fit</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-black text-xl">•</span>
                  <span className="font-mono text-lg">For kids, consider growth when selecting size</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-black text-xl">•</span>
                  <span className="font-mono text-lg">Contact us if you need help choosing the right size</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-4 border-black p-6 md:p-8">
            <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight">NEED HELP?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-xl font-black mb-2">EMAIL SUPPORT</h4>
                <div className="font-mono text-lg">SUPPORT@NABEERABAREERA.COM</div>
                <div className="font-mono text-sm">Response within 24 hours</div>
              </div>
              <div>
                <h4 className="text-xl font-black mb-2">WHATSAPP</h4>
                <div className="font-mono text-lg">+92 300 0000000</div>
                <div className="font-mono text-sm">Mon-Sat 9AM-7PM PKT</div>
              </div>
              <div>
                <h4 className="text-xl font-black mb-2">LIVE CHAT</h4>
                <div className="font-mono text-lg">Available on website</div>
                <div className="font-mono text-sm">Mon-Sat 9AM-9PM PKT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;