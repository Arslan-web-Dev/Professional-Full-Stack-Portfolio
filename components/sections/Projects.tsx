"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className="group relative glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e1b4b]">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-bold text-[#6366f1]/20" style={{ fontFamily: "Outfit, sans-serif" }}>
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-60" />

        {/* Featured badge */}
        {project.featured && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                       bg-[#f59e0b]/15 border border-[#f59e0b]/30 backdrop-blur-md"
          >
            <Star size={12} className="text-[#f59e0b]" />
            <span className="text-[10px] font-semibold text-[#f59e0b] uppercase tracking-wider">Featured</span>
          </motion.div>
        )}

        {/* Hover overlay with links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-[#02040a]/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {project.live_url && (
            <motion.a 
              href={project.live_url} 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-[#6366f1]/20 border border-[#6366f1]/40 
                         flex items-center justify-center text-[#6366f1] hover:bg-[#6366f1]/30 transition-colors"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
          {project.github_url && (
            <motion.a 
              href={project.github_url} 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/20 
                         flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <Github size={20} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-semibold text-lg group-hover:text-[#6366f1] transition-colors duration-300" 
              style={{ fontFamily: "Outfit, sans-serif" }}>
            {project.title}
          </h3>
          <ArrowUpRight size={16} className="text-[#475569] group-hover:text-[#6366f1] transition-colors flex-shrink-0 mt-1" />
        </div>

        <p className="text-[#64748b] text-sm mb-5 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech_stack?.map((tech) => (
            <span key={tech} 
                  className="px-3 py-1 rounded-lg text-[10px] font-medium
                             bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/15
                             hover:border-[#6366f1]/30 hover:bg-[#6366f1]/15 transition-all duration-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-[#8b5cf6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Projects" subtitle="Things I've built" />

        {/* Featured projects - larger cards */}
        {featured.length > 0 && (
          <div className="mb-12">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] text-[#475569] uppercase tracking-[0.3em] mb-6 font-medium"
            >
              Featured Work
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        )}

        {/* Other projects */}
        {others.length > 0 && (
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] text-[#475569] uppercase tracking-[0.3em] mb-6 font-medium"
            >
              More Projects
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i + featured.length} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
