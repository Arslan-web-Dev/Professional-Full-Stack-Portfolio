"use client";
import { motion } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { Collaboration } from "@/types";

export default function Collaborations({ collabs }: { collabs: Collaboration[] }) {
  if (!collabs || collabs.length === 0) return null;

  return (
    <section id="collaborations" className="py-32 px-6 relative">
      <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-[#10b981]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader title="Experience" subtitle="Where I've worked & studied" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] opacity-30" />

          <div className="space-y-10">
            {collabs.map((collab, i) => (
              <motion.div 
                key={collab.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-14"
              >
                {/* Timeline dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                  className="absolute left-0 top-1 w-10 h-10 rounded-xl 
                             bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]
                             flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                >
                  <Building2 size={18} className="text-white" />
                </motion.div>

                {/* Card */}
                <motion.div 
                  whileHover={{ x: 4 }}
                  className="glass-card-hover rounded-2xl p-6 relative overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg group-hover:text-[#6366f1] transition-colors"
                            style={{ fontFamily: "Outfit, sans-serif" }}>
                          {collab.company}
                        </h3>
                        <p className="text-[#8b5cf6] text-sm font-medium mt-1">{collab.role}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#94a3b8] 
                                       bg-[#6366f1]/10 px-4 py-2 rounded-full border border-[#6366f1]/15">
                        <Calendar size={12} className="text-[#6366f1]" />
                        {collab.duration}
                      </span>
                    </div>

                    <p className="text-[#64748b] text-sm leading-relaxed">{collab.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
