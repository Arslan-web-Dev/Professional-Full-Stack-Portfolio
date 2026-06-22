import { createServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Briefcase, Zap, Award, FolderOpen, Settings, ArrowLeft,
  TrendingUp, Users, FileCode, Globe, Palette, Shield
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [projects, skills, certs, files, collabs] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact" }),
    supabase.from("skills").select("id", { count: "exact" }),
    supabase.from("certificates").select("id", { count: "exact" }),
    supabase.from("uploaded_files").select("id", { count: "exact" }),
    supabase.from("collaborations").select("id", { count: "exact" }),
  ]);

  const stats = [
    { label: "Projects",     count: projects.count || 0, icon: Briefcase,  color: "#6366f1", bg: "from-[#6366f1]/20 to-[#6366f1]/5" },
    { label: "Skills",       count: skills.count   || 0, icon: Zap,        color: "#06b6d4", bg: "from-[#06b6d4]/20 to-[#06b6d4]/5" },
    { label: "Certificates", count: certs.count    || 0, icon: Award,      color: "#f59e0b", bg: "from-[#f59e0b]/20 to-[#f59e0b]/5" },
    { label: "Files",        count: files.count    || 0, icon: FolderOpen, color: "#10b981", bg: "from-[#10b981]/20 to-[#10b981]/5" },
    { label: "Experience",   count: collabs.count  || 0, icon: TrendingUp, color: "#ec4899", bg: "from-[#ec4899]/20 to-[#ec4899]/5" },
  ];

  const sections = [
    { label: "Manage Projects",       href: "/admin/sections/projects",       color: "#6366f1", icon: FileCode, desc: "Add, edit, or remove portfolio projects" },
    { label: "Manage Skills",         href: "/admin/sections/skills",         color: "#06b6d4", icon: Zap, desc: "Update your technical skills and proficiency" },
    { label: "Manage Certificates",   href: "/admin/sections/certificates",   color: "#f59e0b", icon: Award, desc: "Add certifications and credentials" },
    { label: "Manage Collaborations", href: "/admin/sections/collaborations", color: "#10b981", icon: Users, desc: "Update work experience and education" },
    { label: "Edit Hero",             href: "/admin/sections/hero",           color: "#8b5cf6", icon: Palette, desc: "Customize hero section content" },
    { label: "Edit About",            href: "/admin/sections/about",          color: "#06b6d4", icon: Globe, desc: "Update bio and personal information" },
    { label: "File Manager",          href: "/admin/files",                   color: "#10b981", icon: FolderOpen, desc: "Upload and manage portfolio assets" },
    { label: "SEO Settings",          href: "/admin/seo",                     color: "#ec4899", icon: Shield, desc: "Configure meta tags and SEO settings" },
    { label: "Nav Items",             href: "/admin/sections/nav_items",      color: "#f59e0b", icon: Settings, desc: "Manage sidebar navigation links" },
  ];

  return (
    <div className="min-h-screen bg-[#02040a] text-white p-8 relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#6366f1]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Control Panel</h1>
            <p className="text-[#475569]">Muhammad Arslan Portfolio — Admin Dashboard</p>
          </div>
          <Link href="/" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#6366f1]/20
                                     text-[#475569] hover:text-white hover:border-[#6366f1]/40 
                                     hover:bg-[#6366f1]/10 text-sm transition-all duration-300">
            <ArrowLeft size={14} /> View Portfolio
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {stats.map(({ label, count, icon: Icon, color, bg }) => (
            <div key={label} 
                 className="glass-card-hover rounded-xl p-5 relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color, fontFamily: "Outfit, sans-serif" }}>{count}</p>
                <p className="text-[#475569] text-xs uppercase tracking-wider">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Links */}
        <h2 className="text-sm font-semibold text-[#475569] uppercase tracking-[0.2em] mb-6">Manage Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map(({ label, href, color, icon: Icon, desc }) => (
            <Link key={label} href={href}>
              <div className="glass-card-hover rounded-xl p-5 h-full group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                     style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} className="group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="text-white text-sm font-semibold mb-2 group-hover:text-[#6366f1] transition-colors">
                  {label}
                </h3>
                <p className="text-[#475569] text-xs leading-relaxed">{desc}</p>

                <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ color }}>
                  Manage <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
