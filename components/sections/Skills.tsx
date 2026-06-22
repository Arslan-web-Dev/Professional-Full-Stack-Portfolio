"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { Skill } from "@/types";

function CircularProgress({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card-hover rounded-2xl p-6 flex flex-col items-center text-center group"
    >
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
          {/* Background circle */}
          <circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke="rgba(99, 102, 241, 0.1)"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <motion.circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset } : {}}
            transition={{ delay: index * 0.1 + 0.3, duration: 1.2, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px rgba(99, 102, 241, 0.5))" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.8 }}
            className="text-lg font-bold text-white"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>

      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#6366f1] transition-colors">
        {skill.name}
      </h4>
      <span className="text-[10px] text-[#475569] uppercase tracking-wider">{skill.category}</span>
    </motion.div>
  );
}

function LinearSkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}} 
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="mb-5 group"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm text-white font-medium group-hover:text-[#6366f1] transition-colors">{skill.name}</span>
        <span className="text-xs text-[#6366f1] font-semibold">{skill.level}%</span>
      </div>
      <div className="h-2 bg-[#02040a] rounded-full overflow-hidden border border-[#6366f1]/10 relative">
        <div className="absolute inset-0 shimmer opacity-30" />
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: index * 0.08 + 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative"
          style={{ 
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)"
          }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="py-32 px-6 relative">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#06b6d4]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="Skills" subtitle="Technologies I work with" />

        {/* Featured skills with circular progress */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {skills.slice(0, 5).map((skill, i) => (
            <CircularProgress key={skill.id} skill={skill} index={i} />
          ))}
        </div>

        {/* Category-based linear bars */}
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <motion.div 
              key={cat} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#06b6d4] opacity-50" />

              <h3 className="text-[#6366f1] text-xs uppercase tracking-[0.2em] mb-6 font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#6366f1] glow-dot" />
                {cat}
              </h3>

              {skills.filter((s) => s.category === cat).map((skill, i) => (
                <LinearSkillBar key={skill.id} skill={skill} index={i} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
