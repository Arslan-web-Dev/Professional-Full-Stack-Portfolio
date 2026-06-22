"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Phone, MapPin, ArrowDown, Sparkles } from "lucide-react";

export default function Hero({ data }: { data: Record<string, string> | null }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#6366f1]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] text-xs font-medium">
            <Sparkles size={12} />
            Available for opportunities
          </span>
        </motion.div>

        {/* Avatar */}
        <motion.div
          variants={itemVariants}
          className="relative w-36 h-36 mx-auto mb-10"
        >
          {/* Glow rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6366f1] to-[#06b6d4] opacity-20 blur-xl animate-pulse" />
          <div className="absolute -inset-2 rounded-full border border-[#6366f1]/20 animate-ping" style={{ animationDuration: "3s" }} />

          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-full h-full rounded-full
                       bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#06b6d4]
                       flex items-center justify-center text-5xl font-bold text-white
                       shadow-[0_0_80px_rgba(99,102,241,0.4)] border-2 border-white/10"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {data?.initials || "MA"}
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {data?.name || "Muhammad Arslan"}
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl mb-8 h-10 flex items-center justify-center gap-2"
          style={{ fontFamily: "Fira Code, monospace" }}
        >
          <span className="text-[#475569]">I build</span>
          <span className="gradient-text font-semibold">
            <TypeAnimation
              sequence={[
                "SaaS Platforms", 2000,
                "AI-Powered Apps", 2000,
                "Enterprise Systems", 2000,
                "Scalable APIs", 2000,
                "Modern Web Apps", 2000,
              ]}
              repeat={Infinity}
              speed={50}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-[#94a3b8] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {data?.tagline || "Full Stack Developer specializing in MERN stack, TypeScript, Supabase & AI integration. Final year BSCS student at COMSATS University Islamabad."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-4 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative text-white font-semibold text-sm tracking-wide flex items-center gap-2">
              View Projects
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                →
              </motion.span>
            </span>
          </motion.a>

          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl border border-[#6366f1]/30
                       text-[#94a3b8] font-semibold text-sm tracking-wide
                       hover:border-[#6366f1]/60 hover:text-white hover:bg-[#6366f1]/10
                       transition-all duration-300"
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 text-sm text-[#64748b]"
        >
          {[
            { icon: MapPin, text: "Islamabad, Pakistan" },
            { icon: Github, text: "Arslan-web-Dev" },
            { icon: Phone, text: "+92 327 5541708" },
          ].map(({ icon: Icon, text }) => (
            <motion.span 
              key={text}
              whileHover={{ y: -2, color: "#94a3b8" }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5
                         hover:border-[#6366f1]/20 transition-all duration-300 cursor-default"
            >
              <Icon size={14} className="text-[#6366f1]" />
              {text}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-20 flex flex-col items-center text-[#475569] text-xs gap-3"
        >
          <span className="tracking-[0.3em] uppercase text-[10px] font-medium">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-[#6366f1]/30 flex items-start justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 rounded-full bg-gradient-to-b from-[#6366f1] to-[#06b6d4]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
