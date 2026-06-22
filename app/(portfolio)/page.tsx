import { createServerClient } from "@/lib/supabase-server";
import ClientLayoutWrapper from "@/components/shared/ClientLayoutWrapper";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Collaborations from "@/components/sections/Collaborations";
import Contact from "@/components/sections/Contact";

export const revalidate = 0;

export default async function PortfolioPage() {
  const supabase = createServerClient();

  const [
    projectsRes,
    skillsRes,
    certsRes,
    collabsRes,
    heroMetaRes,
    aboutMetaRes,
  ] = await Promise.all([
    supabase.from("projects").select("*").order("order_index"),
    supabase.from("skills").select("*").order("order_index"),
    supabase.from("certificates").select("*").order("order_index"),
    supabase.from("collaborations").select("*").order("order_index"),
    supabase.from("portfolio_meta").select("data").eq("section", "hero").single(),
    supabase.from("portfolio_meta").select("data").eq("section", "about").single(),
  ]);

  if (projectsRes.error) console.error("Projects Error:", projectsRes.error);
  if (skillsRes.error) console.error("Skills Error:", skillsRes.error);
  if (certsRes.error) console.error("Certs Error:", certsRes.error);
  if (collabsRes.error) console.error("Collabs Error:", collabsRes.error);

  console.log("Fetched Projects Count:", projectsRes.data?.length);
  console.log("Fetched Skills Count:", skillsRes.data?.length);

  const projects = projectsRes.data;
  const skills = skillsRes.data;
  const certs = certsRes.data;
  const collabs = collabsRes.data;
  const heroMeta = heroMetaRes.data;
  const aboutMeta = aboutMetaRes.data;

  return (
    <ClientLayoutWrapper>
      <Hero data={heroMeta?.data as Record<string, string> | null} />
      <About data={aboutMeta?.data as Record<string, string> | null} />
      <Skills skills={skills || []} />
      <Projects projects={projects || []} />
      <Certificates certs={certs || []} />
      <Collaborations collabs={collabs || []} />
      <Contact />
    </ClientLayoutWrapper>
  );
}
