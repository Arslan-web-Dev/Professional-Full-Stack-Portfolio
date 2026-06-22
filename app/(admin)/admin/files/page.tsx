"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { ArrowLeft, Upload, File, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { UploadedFile } from "@/types";

export default function FilesPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("uploaded_files").select("*").order("uploaded_at", { ascending: false });
    setFiles(data || []);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setMessage("");

    const supabase = createClient();
    const fileName = `${Date.now()}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(fileName, file);

    if (uploadError) {
      setMessage("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("portfolio-assets").getPublicUrl(fileName);

    const { error: dbError } = await supabase.from("uploaded_files").insert({
      name: file.name,
      file_url: urlData.publicUrl,
      file_type: file.type,
      size_kb: Math.round(file.size / 1024),
      label: file.name,
      show_in_sidebar: true,
    });

    if (dbError) {
      setMessage("Database error: " + dbError.message);
    } else {
      setMessage("File uploaded successfully!");
      loadFiles();
    }
    setUploading(false);
  };

  const deleteFile = async (id: string, fileUrl: string) => {
    const supabase = createClient();
    const fileName = fileUrl.split("/").pop();
    if (fileName) {
      await supabase.storage.from("portfolio-assets").remove([fileName]);
    }
    await supabase.from("uploaded_files").delete().eq("id", id);
    loadFiles();
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk" }}>File Manager</h1>
            <p className="text-[#8892b0] text-sm mt-1">Upload and manage portfolio assets</p>
          </div>
          <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#6c63ff]/30
                                                     text-[#8892b0] hover:text-white hover:border-[#6c63ff]/60 text-sm transition-colors">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {message && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-3 rounded-lg text-sm text-center ${message.includes("failed") || message.includes("error") ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
            {message}
          </motion.div>
        )}

        <div className="mb-8">
          <label className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-[#6c63ff]/30
                             text-[#6c63ff] hover:bg-[#6c63ff]/10 cursor-pointer transition-colors">
            <Upload size={20} />
            <span className="text-sm font-medium">{uploading ? "Uploading..." : "Click to upload file"}</span>
            <input type="file" onChange={handleUpload} disabled={uploading} className="hidden" />
          </label>
        </div>

        <div className="grid gap-3">
          {files.map((file) => (
            <motion.div key={file.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#0d1424] border border-[#6c63ff]/20">
              <div className="w-10 h-10 rounded-lg bg-[#6c63ff]/15 flex items-center justify-center flex-shrink-0">
                <File size={18} className="text-[#6c63ff]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{file.label || file.name}</p>
                <p className="text-[#8892b0] text-xs">{file.file_type} • {file.size_kb} KB</p>
              </div>
              <div className="flex items-center gap-2">
                <a href={file.file_url} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg bg-[#6c63ff]/10 text-[#6c63ff] hover:bg-[#6c63ff]/20 transition-colors">
                  <ExternalLink size={14} />
                </a>
                <button onClick={() => deleteFile(file.id, file.file_url)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
