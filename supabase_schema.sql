-- SUPABASE SQL SCHEMA FOR PORTFOLIO
-- Run this entire script in your Supabase SQL Editor

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER DEFAULT 0,
  icon_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_url TEXT,
  image_url TEXT,
  file_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Collaborations (Experience) Table
CREATE TABLE IF NOT EXISTS public.collaborations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Portfolio Meta Table (For Hero, About, SEO settings)
CREATE TABLE IF NOT EXISTS public.portfolio_meta (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Uploaded Files Table
CREATE TABLE IF NOT EXISTS public.uploaded_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER DEFAULT 0,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Create Nav Items Table (For Sidebar)
CREATE TABLE IF NOT EXISTS public.nav_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  href TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nav_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tables (Anyone can see your portfolio)
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read access on collaborations" ON public.collaborations FOR SELECT USING (true);
CREATE POLICY "Allow public read access on portfolio_meta" ON public.portfolio_meta FOR SELECT USING (true);
CREATE POLICY "Allow public read access on uploaded_files" ON public.uploaded_files FOR SELECT USING (true);
CREATE POLICY "Allow public read access on nav_items" ON public.nav_items FOR SELECT USING (true);

-- Allow authenticated users (Admin) to insert/update/delete
-- Projects
CREATE POLICY "Allow admin all access on projects" ON public.projects AS PERMISSIVE FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Skills
CREATE POLICY "Allow admin all access on skills" ON public.skills AS PERMISSIVE FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Certificates
CREATE POLICY "Allow admin all access on certificates" ON public.certificates AS PERMISSIVE FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Collaborations
CREATE POLICY "Allow admin all access on collaborations" ON public.collaborations AS PERMISSIVE FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Portfolio Meta
CREATE POLICY "Allow admin all access on portfolio_meta" ON public.portfolio_meta AS PERMISSIVE FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Uploaded Files
CREATE POLICY "Allow admin all access on uploaded_files" ON public.uploaded_files AS PERMISSIVE FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Nav Items
CREATE POLICY "Allow admin all access on nav_items" ON public.nav_items AS PERMISSIVE FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==========================================
-- INSERT DEMO DATA FOR ALL TABLES
-- ==========================================

-- 1. Nav Items (Sidebar Links)
INSERT INTO public.nav_items (label, icon, href, order_index, visible) VALUES 
('Home', 'Home', '#hero', 1, true),
('About', 'User', '#about', 2, true),
('Skills', 'Zap', '#skills', 3, true),
('Projects', 'Briefcase', '#projects', 4, true),
('Certificates', 'Award', '#certificates', 5, true),
('Collaborations', 'Users', '#collaborations', 6, true),
('Contact', 'Mail', '#contact', 7, true)
ON CONFLICT DO NOTHING;

-- 2. Portfolio Meta (Hero & About Sections)
INSERT INTO public.portfolio_meta (section, data) VALUES 
('hero', '{"name": "Muhammad Arslan", "tagline": "Full Stack Developer building modern web applications.", "initials": "MA"}'),
('about', '{"bio": "I am a passionate software engineer with experience in React, Next.js, and Supabase. I love solving complex problems and creating intuitive digital experiences.", "email": "arslan@example.com", "phone": "+92 300 0000000", "github": "Arslan-web-Dev", "location": "Islamabad, Pakistan", "university": "COMSATS University Islamabad", "internship": "Tech Innovators"}')
ON CONFLICT (section) DO UPDATE SET data = EXCLUDED.data;

-- 3. Skills
INSERT INTO public.skills (name, category, level, icon_url, order_index) VALUES 
('React.js', 'Frontend', 90, null, 1),
('Next.js', 'Frontend', 85, null, 2),
('Tailwind CSS', 'Frontend', 95, null, 3),
('Node.js', 'Backend', 80, null, 4),
('Supabase', 'Database', 75, null, 5),
('PostgreSQL', 'Database', 80, null, 6);

-- 4. Projects
INSERT INTO public.projects (title, description, tech_stack, live_url, github_url, image_url, featured, order_index) VALUES 
('E-Commerce Platform', 'A fully functional modern e-commerce application with secure checkout and user authentication.', '{"Next.js", "Stripe", "Supabase"}', 'https://demo.com', 'https://github.com', null, true, 1),
('Task Management Dashboard', 'An intuitive dashboard for team collaboration and task tracking with real-time updates.', '{"React", "Firebase", "Tailwind"}', 'https://demo.com', 'https://github.com', null, false, 2),
('AI Content Generator', 'A SaaS tool that uses OpenAI API to generate marketing copy and blog posts automatically.', '{"Next.js", "OpenAI", "PostgreSQL"}', 'https://demo.com', 'https://github.com', null, true, 3);

-- 5. Certificates
INSERT INTO public.certificates (title, issuer, issue_date, credential_url, image_url, file_url, order_index) VALUES 
('Full Stack Web Development', 'Coursera', 'August 2023', 'https://coursera.org', null, null, 1),
('React Native Mobile App Development', 'Udemy', 'January 2024', 'https://udemy.com', null, null, 2);

-- 6. Collaborations (Experience & Education)
INSERT INTO public.collaborations (company, role, duration, description, logo_url, order_index) VALUES 
('Tech Solutions Inc.', 'Frontend Developer Intern', 'June 2023 - Aug 2023', 'Developed user interfaces for internal dashboards and improved site performance by 30%.', null, 1),
('COMSATS University', 'BS Computer Science', '2021 - 2025', 'Leading a team of 3 to develop an AI-based career counseling platform for students as Final Year Project.', null, 2);
