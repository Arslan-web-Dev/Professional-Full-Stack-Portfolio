"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import {
  Menu, X, Home, User, Briefcase, Award, Mail,
  FolderOpen, Settings, File, Zap, Users, ChevronRight
} from "lucide-react";
import type { NavItem, UploadedFile } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Home, User, Briefcase, Award, Mail, FolderOpen, Settings, File, Zap, Users
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: '1', label: 'Home', icon: 'Home', href: '#hero', order_index: 1, visible: true },
  { id: '2', label: 'About', icon: 'User', href: '#about', order_index: 2, visible: true },
  { id: '3', label: 'Skills', icon: 'Zap', href: '#skills', order_index: 3, visible: true },
  { id: '4', label: 'Projects', icon: 'Briefcase', href: '#projects', order_index: 4, visible: true },
  { id: '5', label: 'Certificates', icon: 'Award', href: '#certificates', order_index: 5, visible: true },
  { id: '6', label: 'Collaborations', icon: 'Users', href: '#collaborations', order_index: 6, visible: true },
  { id: '7', label: 'Contact', icon: 'Mail', href: '#contact', order_index: 7, visible: true },
];

export default function Sidebar({ isOpen = false, setIsOpen = () => {} }: { isOpen?: boolean; setIsOpen?: (val: boolean) => void }) {
  const [activeSection, setActiveSection] = useState("");
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      try {
        const { data: navData, error: navError } = await supabase.from("nav_items").select("*").eq("visible", true).order("order_index");
        if (navError || !navData || navData.length === 0) {
          setNavItems(DEFAULT_NAV_ITEMS);
        } else {
          setNavItems(navData);
        }

        const { data: fileData, error: fileError } = await supabase.from("uploaded_files").select("*").eq("show_in_sidebar", true).order("uploaded_at", { ascending: false });
        if (!fileError && fileData) {
          setUploadedFiles(fileData);
        }
      } catch (err) {
        console.error("Error fetching sidebar data:", err);
        setNavItems(DEFAULT_NAV_ITEMS);
      }
    })();
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "certificates", "collaborations", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sidebarVariants = {
    closed: { width: "4.5rem" },
    open: { width: "16rem" },
  };

  return (
    <>
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 h-screen z-50 flex flex-col
                   bg-[#0a0e1a]/70 backdrop-blur-2xl
                   border-r border-[#6366f1]/10 overflow-hidden"
        style={{ boxShadow: isOpen ? "0 0 60px rgba(99, 102, 241, 0.1)" : "none" }}
      >
        {/* Logo / Toggle */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-[#6366f1]/10">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#06b6d4] 
                                flex items-center justify-center text-white font-bold text-sm"
                     style={{ fontFamily: "Outfit, sans-serif" }}>
                  MA
                </div>
                <span className="text-sm font-semibold text-white truncate"
                      style={{ fontFamily: "Outfit, sans-serif" }}>
                  Arslan
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20
                       flex items-center justify-center text-[#6366f1]
                       hover:bg-[#6366f1]/20 hover:border-[#6366f1]/40 
                       transition-all duration-300 flex-shrink-0 ml-auto"
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isOpen ? <X size={15} /> : <Menu size={15} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto overflow-x-hidden">
          <AnimatePresence>
            {isOpen && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-[10px] text-[#475569] uppercase tracking-[0.2em] px-3 mb-4 font-medium"
              >
                Navigation
              </motion.p>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            {navItems.map((item, idx) => {
              const Icon = ICON_MAP[item.icon] || Home;
              const isActive = activeSection === item.href;

              return (
                <Link key={item.id} href={item.href} onClick={() => { if (window.innerWidth < 768) setIsOpen(false); }}>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className={`flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 relative group
                      ${isActive 
                        ? "bg-gradient-to-r from-[#6366f1]/20 to-transparent border border-[#6366f1]/30" 
                        : "hover:bg-[#6366f1]/10 border border-transparent"
                      }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 
                                   bg-gradient-to-b from-[#6366f1] to-[#06b6d4] rounded-r-full"
                      />
                    )}

                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300
                      ${isActive ? "bg-[#6366f1]/20" : "bg-transparent group-hover:bg-[#6366f1]/10"}`}>
                      <Icon size={16} className={`transition-colors duration-300 flex-shrink-0
                        ${isActive ? "text-[#6366f1]" : "text-[#475569] group-hover:text-[#6366f1]"}`} />
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -12 }} 
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25, delay: idx * 0.03 }}
                          className="ml-3 flex items-center justify-between flex-1"
                        >
                          <span className={`text-sm whitespace-nowrap transition-colors duration-300 font-medium
                            ${isActive ? "text-white" : "text-[#64748b] group-hover:text-white"}`}>
                            {item.label}
                          </span>
                          {isActive && (
                            <ChevronRight size={12} className="text-[#6366f1]" />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-8">
              <AnimatePresence>
                {isOpen && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-[#475569] uppercase tracking-[0.2em] px-3 mb-4 font-medium"
                  >
                    Resources
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-1">
                {uploadedFiles.map((file) => (
                  <a key={file.id} href={file.file_url} target="_blank" rel="noreferrer">
                    <motion.div whileHover={{ x: 4 }}
                      className="flex items-center px-3 py-2.5 rounded-xl hover:bg-[#06b6d4]/10 
                                 group cursor-pointer transition-all duration-300 border border-transparent hover:border-[#06b6d4]/20">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#06b6d4]/10 group-hover:bg-[#06b6d4]/20 transition-colors">
                        <File size={14} className="text-[#06b6d4]/60 flex-shrink-0 group-hover:text-[#06b6d4] transition-colors" />
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span 
                            initial={{ opacity: 0, x: -12 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0 }}
                            className="ml-3 text-xs text-[#64748b] group-hover:text-white whitespace-nowrap truncate max-w-[150px] transition-colors font-medium"
                          >
                            {file.label || file.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Admin Link */}
        <div className="py-4 px-3 border-t border-[#6366f1]/10">
          <Link href="/admin/dashboard">
            <motion.div whileHover={{ x: 4 }}
              className="flex items-center px-3 py-3 rounded-xl hover:bg-[#6366f1]/10 
                         group cursor-pointer transition-all duration-300 border border-transparent hover:border-[#6366f1]/20">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#6366f1]/10 group-hover:bg-[#6366f1]/20 transition-colors">
                <Settings size={16} className="text-[#475569] flex-shrink-0 group-hover:text-[#6366f1] transition-colors" />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -12 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0 }}
                    className="ml-3 text-sm text-[#64748b] group-hover:text-white whitespace-nowrap font-medium transition-colors"
                  >
                    Admin Panel
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" 
          />
        )}
      </AnimatePresence>
    </>
  );
}
