"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

// Define form data type
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderNumber: string;
};

// Define errors type
type FormErrors = Partial<Record<keyof FormData, string>>;

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    orderNumber: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "NAME REQUIRED";
    if (!formData.email.trim()) newErrors.email = "EMAIL REQUIRED";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "INVALID EMAIL";
    if (!formData.subject.trim()) newErrors.subject = "SUBJECT REQUIRED";
    if (!formData.message.trim()) newErrors.message = "MESSAGE REQUIRED";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      // Simulate form submission
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-32 h-32 border-8 border-red-500 mx-auto mb-8 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-500"></div>
          </div>
          <h1 className="text-6xl font-black mb-4 tracking-tighter">MESSAGE</h1>
          <h2 className="text-6xl font-black mb-8 tracking-tighter">SENT</h2>
          <p className="text-xl font-mono">WE WILL RESPOND WITHIN 24 HOURS</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-8 mt-10">
        <h2 className="text-8xl font-black tracking-tighter mb-2">CONTACT</h2>
        <h2 className="text-8xl font-black tracking-tighter text-red-500">US</h2>
      </div>

      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Contact Information */}
        <div className="bg-black text-white p-8 lg:p-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">
                STORE LOCATION
              </h3>
              <div className="border-l-8 border-red-500 pl-6">
                <div className="flex items-start space-x-4 mb-4">
                  <MapPin className="w-8 h-8 mt-1 text-red-500" />
                  <div>
                    <p className="text-xl font-mono leading-tight">
                      123 BRUTALIST STREET
                      <br />
                      CONCRETE DISTRICT
                      <br />
                      NEW YORK, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">
                CONTACT INFO
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="w-8 h-8 text-red-500" />
                  <span className="text-2xl font-mono">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-8 h-8 text-red-500" />
                  <span className="text-2xl font-mono">HELP@BRUTALIST.STORE</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">HOURS</h3>
              <div className="border-8 border-white p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 text-red-500 mt-1" />
                  <div className="font-mono text-xl space-y-2">
                    <div className="flex justify-between">
                      <span>MON-FRI:</span>
                      <span>09:00-18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SAT:</span>
                      <span>10:00-16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SUN:</span>
                      <span className="text-red-500">CLOSED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 lg:p-16 border-l-8 border-black">
          <h3 className="text-6xl font-black mb-8 tracking-tighter">
            SEND MESSAGE
          </h3>

          <div className="space-y-8">
            {/* NAME */}
            <div>
              <label className="block text-2xl font-black mb-2 tracking-tight">
                NAME *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-4 border-4 border-black bg-white text-xl font-mono focus:border-red-500 focus:outline-none ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="YOUR NAME"
              />
              {errors.name && (
                <p className="text-red-500 font-black text-sm mt-2">
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-2xl font-black mb-2 tracking-tight">
                EMAIL *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-4 border-4 border-black bg-white text-xl font-mono focus:border-red-500 focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="YOUR@EMAIL.COM"
              />
              {errors.email && (
                <p className="text-red-500 font-black text-sm mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* ORDER NUMBER (optional) */}
            <div>
              <label className="block text-2xl font-black mb-2 tracking-tight">
                ORDER NUMBER
              </label>
              <input
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                className="w-full p-4 border-4 border-black bg-white text-xl font-mono focus:border-red-500 focus:outline-none"
                placeholder="#12345678 (OPTIONAL)"
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label 
                htmlFor="subject" 
                className="block text-2xl font-black mb-2 tracking-tight"
              >
                SUBJECT *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full p-4 border-4 border-black bg-white text-xl font-mono focus:border-red-500 focus:outline-none appearance-none ${
                  errors.subject ? "border-red-500" : ""
                }`}
                aria-required="true"
              >
                <option value="">SELECT SUBJECT</option>
                <option value="order">ORDER ISSUE</option>
                <option value="product">PRODUCT QUESTION</option>
                <option value="shipping">SHIPPING INQUIRY</option>
                <option value="return">RETURN REQUEST</option>
                <option value="technical">TECHNICAL SUPPORT</option>
                <option value="other">OTHER</option>
              </select>
              {errors.subject && (
                <p className="text-red-500 font-black text-sm mt-2">{errors.subject}</p>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <label 
                htmlFor="message" 
                className="block text-2xl font-black mb-2 tracking-tight"
              >
                MESSAGE *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full p-4 border-4 border-black bg-white text-xl font-mono focus:border-red-500 focus:outline-none resize-none ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder="TYPE YOUR MESSAGE HERE..."
                aria-required="true"
              />
              {errors.message && (
                <p className="text-red-500 font-black text-sm mt-2">
                  {errors.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-6 px-8 border-4 border-black hover:bg-red-500 hover:border-red-500 transition-all duration-200 text-2xl font-black tracking-tight flex items-center justify-center space-x-4"
            >
              <Send className="w-8 h-8" />
              <span>SEND MESSAGE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;