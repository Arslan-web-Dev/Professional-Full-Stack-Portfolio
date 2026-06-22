"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink, FileText, Calendar, Building } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { Certificate } from "@/types";

export default function Certificates({ certs }: { certs: Certificate[] }) {
  if (!certs || certs.length === 0) return null;

  return (
    <section id="certificates" className="py-32 px-6 relative">
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-[#f59e0b]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="Certificates" subtitle="My credentials & achievements" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert, i) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group glass-card-hover rounded-2xl p-6 flex gap-5 items-start transition-all duration-400 relative overflow-hidden"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#fbbf24]/10 
                              border border-[#f59e0b]/20 flex items-center justify-center flex-shrink-0
                              group-hover:border-[#f59e0b]/40 transition-colors duration-300">
                <Award size={24} className="text-[#f59e0b]" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-base font-semibold mb-2 group-hover:text-[#f59e0b] transition-colors truncate"
                    style={{ fontFamily: "Outfit, sans-serif" }}>
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <Building size={12} className="text-[#475569]" />
                  <p className="text-[#64748b] text-xs">{cert.issuer}</p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={12} className="text-[#475569]" />
                  <p className="text-[#475569] text-xs">{cert.issue_date}</p>
                </div>

                <div className="flex gap-3">
                  {cert.credential_url && (
                    <motion.a 
                      href={cert.credential_url} 
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-1.5 text-xs text-[#6366f1] hover:text-[#8b5cf6] transition-colors font-medium"
                    >
                      <ExternalLink size={12} /> Verify Credential
                    </motion.a>
                  )}
                  {cert.file_url && (
                    <motion.a 
                      href={cert.file_url} 
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-1.5 text-xs text-[#06b6d4] hover:text-[#22d3ee] transition-colors font-medium"
                    >
                      <FileText size={12} /> View PDF
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
