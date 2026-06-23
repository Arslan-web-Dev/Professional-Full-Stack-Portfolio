"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Github, GraduationCap, Briefcase, Code2, Layers, Cpu } from "lucide-react";

export default function About({ data }: { data: Record<string, string> | null }) {
  const info = [
    { icon: GraduationCap, label: "University", value: data?.university || "COMSATS University Islamabad" },
    { icon: Briefcase,    label: "Internship",  value: data?.internship  || "Full Stack Developer Intern" },
    { icon: MapPin,        label: "Location",    value: data?.location    || "Islamabad, Pakistan", href: "https://maps.google.com/?q=Islamabad,+Pakistan" },
    { icon: Phone,         label: "Phone",       value: data?.phone       || "+92 327 5541708", href: "https://wa.me/923275541708" },
    { icon: Github,        label: "GitHub",      value: data?.github      || "Arslan-web-Dev", href: "https://github.com/Arslan-web-Dev" },
  ];

  const stats = [
    { icon: Code2, value: "5+", label: "Projects Built" },
    { icon: Layers, value: "10+", label: "Technologies" },
    { icon: Cpu, value: "3+", label: "Years Coding" },
  ];

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#6366f1]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#6366f1] text-[10px] uppercase tracking-[0.3em] mb-4 font-mono font-medium"
          >
            Get to know me
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto w-20 h-[2px] bg-gradient-to-r from-[#6366f1] to-[#06b6d4] rounded-full"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card-hover rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"
                  style={{ fontFamily: "Outfit, sans-serif" }}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                  <Code2 size={16} className="text-white" />
                </div>
                My Story
              </h3>
              <p className="text-[#94a3b8] leading-relaxed text-base mb-6">
                {data?.bio || "I am a Full Stack Developer and final-semester BSCS student at COMSATS University Islamabad. I specialize in building scalable SaaS applications using the MERN stack, Next.js, TypeScript, Supabase, and AI API integration."}
              </p>
              <p className="text-[#94a3b8] leading-relaxed text-base">
                Passionate about creating clean, efficient code and delivering exceptional user experiences. 
                I enjoy tackling complex problems and turning ideas into reality through code.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card-hover rounded-xl p-5 text-center"
                >
                  <Icon size={20} className="text-[#6366f1] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{value}</div>
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"
                style={{ fontFamily: "Outfit, sans-serif" }}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06b6d4] to-[#6366f1] flex items-center justify-center">
                <Layers size={16} className="text-white" />
              </div>
              Quick Info
            </h3>

            {info.map(({ icon: Icon, label, value, href }, i) => {
              const cardContent = (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 p-5 rounded-xl glass-card-hover transition-all duration-300 ${href ? "cursor-pointer group" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#06b6d4]/20 
                                  flex items-center justify-center flex-shrink-0 border border-[#6366f1]/10">
                    <Icon size={18} className="text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#475569] uppercase tracking-[0.2em] font-medium mb-1">{label}</p>
                    <p className={`text-white text-sm font-semibold transition-colors ${href ? "group-hover:text-[#6366f1]" : ""}`}>{value}</p>
                  </div>
                </motion.div>
              );

              return href ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block">
                  {cardContent}
                </a>
              ) : (
                <div key={label} className="block">
                  {cardContent}
                </div>
              );
            })}

            {/* Tech tags */}
            <div className="pt-6">
              <p className="text-[10px] text-[#475569] uppercase tracking-[0.2em] font-medium mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {["MERN Stack", "TypeScript", "Supabase", "AI Integration", "SaaS Architecture", "RBAC Systems", "Next.js", "PostgreSQL"].map((tag, i) => (
                  <motion.span 
                    key={tag} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 rounded-xl text-xs font-medium
                               bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 
                               text-[#6366f1] border border-[#6366f1]/20
                               hover:border-[#6366f1]/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]
                               transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
