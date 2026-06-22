"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface SectionItem {
  id?: string;
  [key: string]: any;
}

const SECTION_CONFIG: Record<string, { table: string; title: string; fields: { name: string; type: string; label: string }[] }> = {
  projects: {
    table: "projects",
    title: "Manage Projects",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "tech_stack", type: "text", label: "Tech Stack (comma separated)" },
      { name: "live_url", type: "text", label: "Live URL" },
      { name: "github_url", type: "text", label: "GitHub URL" },
      { name: "image_url", type: "text", label: "Image URL" },
      { name: "featured", type: "checkbox", label: "Featured" },
      { name: "order_index", type: "number", label: "Order" },
    ],
  },
  skills: {
    table: "skills",
    title: "Manage Skills",
    fields: [
      { name: "name", type: "text", label: "Name" },
      { name: "category", type: "text", label: "Category" },
      { name: "level", type: "number", label: "Level (1-100)" },
      { name: "icon_url", type: "text", label: "Icon URL" },
      { name: "order_index", type: "number", label: "Order" },
    ],
  },
  certificates: {
    table: "certificates",
    title: "Manage Certificates",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "issuer", type: "text", label: "Issuer" },
      { name: "issue_date", type: "text", label: "Issue Date" },
      { name: "credential_url", type: "text", label: "Credential URL" },
      { name: "image_url", type: "text", label: "Image URL" },
      { name: "file_url", type: "text", label: "File URL" },
      { name: "order_index", type: "number", label: "Order" },
    ],
  },
  collaborations: {
    table: "collaborations",
    title: "Manage Collaborations",
    fields: [
      { name: "company", type: "text", label: "Company" },
      { name: "role", type: "text", label: "Role" },
      { name: "duration", type: "text", label: "Duration" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "logo_url", type: "text", label: "Logo URL" },
      { name: "order_index", type: "number", label: "Order" },
    ],
  },
  hero: {
    table: "portfolio_meta",
    title: "Edit Hero Section",
    fields: [
      { name: "name", type: "text", label: "Full Name" },
      { name: "initials", type: "text", label: "Initials" },
      { name: "tagline", type: "textarea", label: "Tagline" },
    ],
  },
  about: {
    table: "portfolio_meta",
    title: "Edit About Section",
    fields: [
      { name: "bio", type: "textarea", label: "Bio" },
      { name: "email", type: "text", label: "Email" },
      { name: "phone", type: "text", label: "Phone" },
      { name: "location", type: "text", label: "Location" },
      { name: "github", type: "text", label: "GitHub Username" },
      { name: "university", type: "text", label: "University" },
      { name: "internship", type: "text", label: "Internship Location" },
    ],
  },
  nav_items: {
    table: "nav_items",
    title: "Manage Navigation Links",
    fields: [
      { name: "label", type: "text", label: "Label" },
      { name: "icon", type: "text", label: "Icon Name (e.g. Home, Zap, Award)" },
      { name: "href", type: "text", label: "Link/Href (e.g. #hero)" },
      { name: "order_index", type: "number", label: "Order Index" },
      { name: "visible", type: "checkbox", label: "Visible" },
    ],
  },
};

export default function SectionEditorPage() {
  const params = useParams();
  const router = useRouter();
  const section = params.section as string;
  const config = SECTION_CONFIG[section];

  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!config) return;
    loadItems();
  }, [section]);

  const loadItems = async () => {
    setLoading(true);
    const supabase = createClient();

    if (config.table === "portfolio_meta") {
      const { data } = await supabase.from("portfolio_meta").select("*").eq("section", section).single();
      if (data) {
        const merged = { ...data.data, id: data.id };
        setItems([merged]);
      } else {
        setItems([{}]);
      }
    } else {
      const { data } = await supabase.from(config.table).select("*").order("order_index");
      setItems(data || []);
    }
    setLoading(false);
  };

  const updateField = (index: number, field: string, value: any) => {
    const newItems = [...items];
    if (field === "tech_stack" && typeof value === "string") {
      newItems[index][field] = value.split(",").map((s: string) => s.trim());
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, {}]);
  };

  const removeItem = async (index: number) => {
    const item = items[index];
    if (item.id && config.table !== "portfolio_meta") {
      const supabase = createClient();
      await supabase.from(config.table).delete().eq("id", item.id);
    }
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const saveAll = async () => {
    setSaving(true); setMessage("");
    const supabase = createClient();

    try {
      if (config.table === "portfolio_meta") {
        const data = { ...items[0] };
        delete data.id;
        const { error } = await supabase.from("portfolio_meta").upsert({
          section,
          data,
        }, { onConflict: "section" });
        if (error) throw error;
      } else {
        for (const item of items) {
          const payload = { ...item };
          if (payload.tech_stack && typeof payload.tech_stack === "string") {
            payload.tech_stack = payload.tech_stack.split(",").map((s: string) => s.trim());
          }
          if (item.id) {
            await supabase.from(config.table).update(payload).eq("id", item.id);
          } else {
            await supabase.from(config.table).insert(payload);
          }
        }
      }
      setMessage("Saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("Error: " + err.message);
    }
    setSaving(false);
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-[#050816] text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Section not found</h1>
          <Link href="/admin/dashboard" className="text-[#6c63ff] hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk" }}>{config.title}</h1>
            <p className="text-[#8892b0] text-sm mt-1">Table: {config.table}</p>
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
          <div className="space-y-6">
            {items.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-[#0d1424] rounded-xl p-6 border border-[#6c63ff]/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#6c63ff]">Item #{index + 1}</h3>
                  <button onClick={() => removeItem(index)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {config.fields.map((field) => (
                    <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                      <label className="block text-xs text-[#8892b0] uppercase tracking-wider mb-2">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          value={item[field.name] || ""}
                          onChange={(e) => updateField(index, field.name, e.target.value)}
                          rows={3}
                          className="w-full bg-[#050816] border border-[#6c63ff]/25 rounded-lg p-3
                                     text-white text-sm focus:border-[#6c63ff] focus:outline-none resize-none"
                        />
                      ) : field.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          checked={item[field.name] || false}
                          onChange={(e) => updateField(index, field.name, e.target.checked)}
                          className="w-5 h-5 rounded border-[#6c63ff]/25 bg-[#050816] text-[#6c63ff]"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={item[field.name] || ""}
                          onChange={(e) => updateField(index, field.name, e.target.value)}
                          className="w-full bg-[#050816] border border-[#6c63ff]/25 rounded-lg p-3
                                     text-white text-sm focus:border-[#6c63ff] focus:outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {config.table !== "portfolio_meta" && (
              <motion.button onClick={addItem} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg border border-dashed border-[#6c63ff]/40
                           text-[#6c63ff] hover:bg-[#6c63ff]/10 transition-colors flex items-center justify-center gap-2">
                <Plus size={16} /> Add New Item
              </motion.button>
            )}

            <motion.button onClick={saveAll} disabled={saving}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#6c63ff] to-[#00d4ff]
                         text-white font-semibold text-sm flex items-center justify-center gap-2
                         disabled:opacity-60">
              <Save size={15} />
              {saving ? "Saving..." : "Save All Changes"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
