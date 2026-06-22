"use client";
import { motion } from "framer-motion";

export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-20 relative"
    >
      {/* Decorative line above */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-12 h-px bg-gradient-to-r from-transparent via-[#6366f1] to-transparent mx-auto mb-6"
      />

      <motion.p 
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-[#6366f1] text-[10px] uppercase tracking-[0.3em] mb-4 font-mono font-medium"
      >
        {subtitle}
      </motion.p>

      <h2 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white relative inline-block"
        style={{ fontFamily: "Outfit, Space Grotesk, sans-serif" }}
      >
        <span className="relative z-10">{title}</span>
        <motion.span
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-1 left-0 h-3 bg-gradient-to-r from-[#6366f1]/20 to-[#06b6d4]/20 -z-0 rounded-sm"
        />
      </h2>

      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-6 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[#6366f1] to-[#06b6d4] rounded-full opacity-60"
      />
    </motion.div>
  );
}
