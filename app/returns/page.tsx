"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Package, RefreshCw, Ban, Receipt, RotateCcw } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="w-full">
      {/* Full-width Hero Banner */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src="/banners/returns-banner.jpg" // <-- place your banner in /public/banners/
          alt="Returns Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 text-neutral-800">
        <div className="px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Package className="w-12 h-12 text-neutral-400 mx-auto mb-6" />
            <h1 className="text-4xl font-light tracking-wide mb-4">
              Returns & Exchanges
            </h1>
            <p className="max-w-2xl mx-auto text-neutral-600 text-lg leading-relaxed">
              Shop with confidence. Our return process is designed to be{" "}
              <span className="font-medium text-neutral-900">simple</span>,{" "}
              <span className="font-medium text-neutral-900">secure</span>, and{" "}
              <span className="font-medium text-neutral-900">hassle-free</span>.
            </p>
          </motion.div>
        </div>

        
        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-neutral-600 text-center max-w-2xl mx-auto leading-relaxed mb-16"
        >
          At <span className="font-medium text-neutral-900">Nabeera Bareera</span>,
          we want you to feel completely confident in your purchase. If your piece
          isn’t quite right, our returns process is designed to be simple and
          reassuring.
        </motion.p>

        <div className="space-y-20">
          {/* Eligibility */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <Package className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-3">Eligibility</h2>
            <p className="text-neutral-600 leading-relaxed">
              We accept returns and exchanges within{" "}
              <span className="font-semibold text-neutral-900">7 days</span> of
              receiving your order, provided the item is{" "}
              <span className="font-semibold text-neutral-900">
                unused, unworn, and in original packaging
              </span>
              . Due to hygiene standards,{" "}
              <span className="italic">earrings cannot be returned</span>.
            </p>
            <div className="h-px bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-100 mt-12" />
          </motion.section>

          {/* Proof of Purchase */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center"
          >
            <Receipt className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-3">Proof of Purchase</h2>
            <p className="text-neutral-600 leading-relaxed">
              A valid order confirmation, receipt, or packing slip is required to
              process any return or exchange.
            </p>
            <div className="h-px bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-100 mt-12" />
          </motion.section>

          {/* Process */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <RotateCcw className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-center mb-6">
              Return Process
            </h2>
            <div className="space-y-4">
              <div className="rounded-2xl bg-neutral-50 p-6 shadow-sm border border-neutral-100">
                <p className="text-neutral-700">
                  1. Contact our team at{" "}
                  <span className="font-semibold text-neutral-900">
                    support@nabeerabareera.com
                  </span>{" "}
                  within 7 days of receiving your order.
                </p>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-6 shadow-sm border border-neutral-100">
                <p className="text-neutral-700">
                  2. Securely pack the item in its original packaging and ship it
                  back to us. Return shipping costs are the responsibility of the
                  customer unless the product was faulty or incorrect.
                </p>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-6 shadow-sm border border-neutral-100">
                <p className="text-neutral-700">
                  3. Once received, our team will inspect the item and process
                  your return or exchange within{" "}
                  <span className="font-semibold text-neutral-900">
                    5 business days
                  </span>
                  .
                </p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-100 mt-12" />
          </motion.section>

          {/* Refunds */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <Package className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-3">Refunds</h2>
            <p className="text-neutral-600 leading-relaxed">
              Refunds will be issued to your original method of payment once the
              item has passed inspection. Shipping fees are{" "}
              <span className="italic">non-refundable</span>.
            </p>
            <div className="h-px bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-100 mt-12" />
          </motion.section>

          {/* Exchanges */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center"
          >
            <RefreshCw className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-3">Exchanges</h2>
            <p className="text-neutral-600 leading-relaxed">
              If you wish to exchange an item, please mention the replacement item
              details when contacting our support team. Exchanges are subject to
              availability.
            </p>
            <div className="h-px bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-100 mt-12" />
          </motion.section>

          {/* Non-Returnable Items */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center"
          >
            <Ban className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-3">Non-Returnable Items</h2>
            <ul className="list-disc pl-6 text-left text-neutral-600 leading-relaxed space-y-2 inline-block text-start">
              <li>Earrings (due to hygiene reasons)</li>
              <li>Final sale or clearance items</li>
              <li>Customized or personalized products</li>
            </ul>
          </motion.section>
        </div>

        {/* Outro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg text-neutral-600 text-center max-w-2xl mx-auto leading-relaxed mt-20"
        >
          If you have any questions regarding returns or exchanges, please reach
          out to our support team. We are here to assist you with care and
          attention.
        </motion.p>
      </div>
    </div>
  )
}
