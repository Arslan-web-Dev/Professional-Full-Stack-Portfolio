"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import type { SeoSettings } from "@/types";

export default function SeoPage() {
  const [seo, setSeo] = useState<Partial<SeoSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSeo();
  }, []);

  const loadSeo = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("seo_settings").select("*").eq("page", "home").single();
    if (data) setSeo(data);
    setLoading(false);
  };

  const saveSeo = async () => {
    setSaving(true); setMessage("");
    const supabase = createClient();
    const { error } = await supabase.from("seo_settings").upsert({
      page: "home",
      ...seo,
      updated_at: new Date().toISOString(),
    }, { onConflict: "page" });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("SEO settings saved successfully!");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const fields = [
    { name: "meta_title", label: "Meta Title", type: "text" },
    { name: "meta_description", label: "Meta Description", type: "textarea" },
    { name: "keywords", label: "Keywords (comma separated)", type: "text" },
    { name: "og_title", label: "OG Title", type: "text" },
    { name: "og_description", label: "OG Description", type: "textarea" },
    { name: "og_image", label: "OG Image URL", type: "text" },
    { name: "twitter_card", label: "Twitter Card", type: "text" },
    { name: "canonical_url", label: "Canonical URL", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk" }}>SEO Settings</h1>
            <p className="text-[#8892b0] text-sm mt-1">Manage homepage SEO metadata</p>
          </div>
          <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#6c63ff]/30
                                                     text-[#8892b0] hover:text-white hover:border-[#6c63ff]/60 text-sm transition-colors">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {message && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-3 rounded-lg text-sm text-center ${message.includes("Error") ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
            {message}
          </motion.div>
        )}

        {loading ? (
          <div className="text-center text-[#8892b0]">Loading...</div>
        ) : (
          <div className="bg-[#0d1424] rounded-xl p-6 border border-[#6c63ff]/20">
            <div className="grid md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <label className="block text-xs text-[#8892b0] uppercase tracking-wider mb-2">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={(seo as any)[field.name] || ""}
                      onChange={(e) => setSeo({ ...seo, [field.name]: e.target.value })}
                      rows={3}
                      className="w-full bg-[#050816] border border-[#6c63ff]/25 rounded-lg p-3
                                 text-white text-sm focus:border-[#6c63ff] focus:outline-none resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={(seo as any)[field.name] || ""}
                      onChange={(e) => setSeo({ ...seo, [field.name]: e.target.value })}
                      className="w-full bg-[#050816] border border-[#6c63ff]/25 rounded-lg p-3
                                 text-white text-sm focus:border-[#6c63ff] focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
            <motion.button onClick={saveSeo} disabled={saving}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-[#6c63ff] to-[#00d4ff]
                         text-white font-semibold text-sm flex items-center justify-center gap-2
                         disabled:opacity-60">
              <Save size={15} />
              {saving ? "Saving..." : "Save SEO Settings"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
