import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { faqData } from '../data';

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-12"
    >
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-accent-red tracking-widest uppercase">
          FAQ RESOURCE
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-black text-gray-950">
          الأسئلة الشائعة حول منظومة Shavi
        </h2>
        <p className="text-xs text-gray-500 max-w-lg mx-auto">
          كل ما تود معرفته عن برنامجنا التشغيلي وطرق تفعيل الأتمتة والذكاء الاصطناعي بمشروعك.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => {
          const isOpen = activeFaq === index;
          return (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-right font-bold text-sm text-gray-900 hover:bg-gray-50/50 transition-all focus:outline-none"
              >
                <span className="text-accent-red">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
                <span>{faq.question}</span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-gray-500 leading-relaxed border-t border-gray-50 animate-fade-in text-right">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
