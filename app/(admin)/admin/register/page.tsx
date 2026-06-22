"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { UserPlus, Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true); setError(""); setSuccess("");
    const supabase = createClient();
    const { error: err, data } = await supabase.auth.signUp({ email, password });
    
    if (err) { 
      setError(err.message); 
      setLoading(false); 
      return; 
    }
    
    if (data?.user?.identities?.length === 0) {
      setError("User already exists. Please log in.");
      setLoading(false);
      return;
    }

    setSuccess("Registration successful! You can now log in.");
    setLoading(false);
    setTimeout(() => {
      router.push("/admin/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ec4899]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#475569] hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div className="glass-card rounded-2xl p-8 border border-[#ec4899]/20 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6]" />

          <div className="flex items-center justify-center w-16 h-16 rounded-2xl
                          bg-gradient-to-br from-[#ec4899]/20 to-[#8b5cf6]/10 
                          border border-[#ec4899]/20 mx-auto mb-6">
            <Shield size={28} className="text-[#ec4899]" />
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
            Admin Registration
          </h1>
          <p className="text-[#475569] text-sm text-center mb-8">Create an account to manage your portfolio</p>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">
            <div>
              <label className="block text-xs text-[#475569] uppercase tracking-wider mb-2 font-medium">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#02040a]/80 border border-[#ec4899]/20 rounded-xl p-4
                           text-white text-sm focus:border-[#ec4899]/50 focus:outline-none transition-all duration-300
                           placeholder:text-[#334155]"
                placeholder="admin@email.com" 
              />
            </div>
            <div>
              <label className="block text-xs text-[#475569] uppercase tracking-wider mb-2 font-medium">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                  className="w-full bg-[#02040a]/80 border border-[#ec4899]/20 rounded-xl p-4 pr-12
                             text-white text-sm focus:border-[#ec4899]/50 focus:outline-none transition-all duration-300
                             placeholder:text-[#334155]"
                  placeholder="••••••••" 
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              onClick={handleRegister} 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl relative overflow-hidden group disabled:opacity-60 mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative text-white font-semibold text-sm flex items-center justify-center gap-2">
                <UserPlus size={16} />
                {loading ? "Registering..." : "Create Account"}
              </span>
            </motion.button>
          </div>
          
          <div className="mt-6 text-center text-sm text-[#475569]">
            Already have an account?{" "}
            <Link href="/admin/login" className="text-[#ec4899] hover:text-[#f472b6] font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        <p className="text-center text-[#334155] text-xs mt-6">
          Protected by Supabase Auth
        </p>
      </motion.div>
    </div>
  );
}
