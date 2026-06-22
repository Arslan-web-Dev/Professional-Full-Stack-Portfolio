"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("error");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { 
        setStatus("success"); 
        setForm({ name: "", email: "", message: "" }); 
      }
      else setStatus("error");
    } catch {
      setStatus("error");
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus("idle"), 5000);
  };

  const contacts = [
    { icon: Mail,   label: "Email",    value: "arslan@example.com", href: "mailto:arslan@example.com" },
    { icon: Phone,  label: "Phone",    value: "+92 327 5541708", href: "tel:+923275541708" },
    { icon: MapPin, label: "Location", value: "Islamabad, Pakistan" },
  ];

  const socials = [
    { icon: Github,    label: "GitHub",   href: "https://github.com/Arslan-web-Dev", color: "#6366f1" },
    { icon: Linkedin,  label: "LinkedIn", href: "#", color: "#06b6d4" },
    { icon: Twitter,   label: "Twitter",  href: "#", color: "#8b5cf6" },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366f1]/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="Contact" subtitle="Let's work together" />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                Let's build something <span className="gradient-text">amazing</span> together
              </h3>
              <p className="text-[#94a3b8] leading-relaxed">
                Available for freelance work, internship extensions, and full-time opportunities. 
                I'm always excited to work on new projects and collaborate with talented people.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="space-y-4 mb-10">
              {contacts.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-5 p-5 rounded-xl glass-card-hover group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#06b6d4]/20 
                                  flex items-center justify-center flex-shrink-0 border border-[#6366f1]/10
                                  group-hover:border-[#6366f1]/30 transition-colors">
                    <Icon size={20} className="text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#475569] uppercase tracking-[0.2em] font-medium mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-sm font-semibold hover:text-[#6366f1] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-[10px] text-[#475569] uppercase tracking-[0.2em] font-medium mb-4">Follow Me</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl glass-card-hover flex items-center justify-center
                               text-[#64748b] hover:text-white transition-all duration-300 group"
                    style={{ "--hover-color": color } as any}
                  >
                    <Icon size={20} className="group-hover:text-[var(--hover-color)] transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4]" />

            <h3 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
              Send a Message
            </h3>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
              {[
                { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label 
                    htmlFor={field.name}
                    className={`block text-xs uppercase tracking-wider mb-2 transition-colors duration-300 font-medium
                      ${focusedField === field.name ? "text-[#6366f1]" : "text-[#475569]"}`}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      id={field.name}
                      type={field.type}
                      value={form[field.name as "name" | "email"]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-[#02040a]/80 border rounded-xl p-4
                                 text-white text-sm focus:outline-none transition-all duration-300
                                 placeholder:text-[#334155]
                                 ${focusedField === field.name ? 'border-[#6366f1]/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'border-[#6366f1]/15 hover:border-[#6366f1]/30'}`}
                      placeholder={field.placeholder}
                    />
                    {focusedField === field.name && (
                      <motion.div 
                        layoutId="focusIndicator"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-[#6366f1] to-[#06b6d4]"
                      />
                    )}
                  </div>
                </div>
              ))}

              <div className="relative">
                <label 
                  htmlFor="message"
                  className={`block text-xs uppercase tracking-wider mb-2 transition-colors duration-300 font-medium
                    ${focusedField === "message" ? "text-[#6366f1]" : "text-[#475569]"}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className={`w-full bg-[#02040a]/80 border rounded-xl p-4
                             text-white text-sm focus:outline-none transition-all duration-300 resize-none
                             placeholder:text-[#334155]
                             ${focusedField === 'message' ? 'border-[#6366f1]/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'border-[#6366f1]/15 hover:border-[#6366f1]/30'}`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl relative overflow-hidden group disabled:opacity-60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative text-white font-semibold text-sm flex items-center justify-center gap-2">
                  <AnimatePresence mode="wait">
                    {status === "sending" && (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2">
                        <CheckCircle size={16} /> Message Sent!
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2">
                        <AlertCircle size={16} /> Failed — Try Again
                      </motion.span>
                    )}
                    {status === "idle" && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2">
                        <Send size={16} /> Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 text-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6366f1]/20 to-transparent mb-8" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm"
               style={{ fontFamily: "Outfit, sans-serif" }}>
            MA
          </div>
          <p className="text-[#475569] text-sm">
            Designed & Built by <span className="text-[#6366f1] font-semibold">Muhammad Arslan</span>
          </p>
          <p className="text-[#334155] text-xs">
            COMSATS University Islamabad • {mounted ? new Date().getFullYear() : ""}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
