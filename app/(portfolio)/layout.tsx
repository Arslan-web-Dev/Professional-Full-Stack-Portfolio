import { createServerClient } from "@/lib/supabase-server";
import type { Metadata } from "next";
import BackgroundCanvas from "@/components/3d/BackgroundCanvas";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: seo } = await supabase.from("seo_settings").select("*").eq("page", "home").single();
  return {
    title: seo?.meta_title || "Muhammad Arslan — Full Stack Developer",
    description: seo?.meta_description || "Full Stack Developer | COMSATS University Islamabad",
    keywords: seo?.keywords || ["Muhammad Arslan", "Full Stack Developer", "COMSATS", "Next.js"],
    openGraph: {
      title: seo?.og_title || seo?.meta_title,
      description: seo?.og_description || seo?.meta_description,
      images: seo?.og_image ? [{ url: seo.og_image }] : [],
      type: "website",
    },
    twitter: { card: (seo?.twitter_card as "summary_large_image") || "summary_large_image" },
    alternates: { canonical: seo?.canonical_url || "https://arslandev.vercel.app" },
  };
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundCanvas />
      {children}
    </>
  );
}
