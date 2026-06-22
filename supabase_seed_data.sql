-- ==========================================
-- RUN THIS FILE SEPARATELY IN SUPABASE SQL EDITOR
-- This inserts demo data into ALL tables
-- (Tables must already be created from supabase_schema.sql)
-- ==========================================

-- 1. Nav Items (Sidebar Links)
INSERT INTO public.nav_items (label, icon, href, order_index, visible) VALUES 
('Home', 'Home', '#hero', 1, true),
('About', 'User', '#about', 2, true),
('Skills', 'Zap', '#skills', 3, true),
('Projects', 'Briefcase', '#projects', 4, true),
('Certificates', 'Award', '#certificates', 5, true),
('Collaborations', 'Users', '#collaborations', 6, true),
('Contact', 'Mail', '#contact', 7, true);

-- 2. Portfolio Meta (Hero & About Sections)
INSERT INTO public.portfolio_meta (section, data) VALUES 
('hero', '{"name": "Muhammad Arslan", "tagline": "Full Stack Developer specializing in MERN stack, TypeScript, Supabase & AI integration. Final year BSCS student at COMSATS University Islamabad.", "initials": "MA"}'),
('about', '{"bio": "I am a passionate Full Stack Developer with hands-on experience in React, Next.js, Node.js, and Supabase. I love solving complex problems and creating intuitive digital experiences that make a difference.", "email": "muhammadarslan.cs.web@gmail.com", "phone": "+92 327 5541708", "github": "Arslan-web-Dev", "location": "Islamabad, Pakistan", "university": "COMSATS University Islamabad", "internship": "Tech Innovators"}')
ON CONFLICT (section) DO UPDATE SET data = EXCLUDED.data;

-- 3. Skills (6 skills across 3 categories)
INSERT INTO public.skills (name, category, level, icon_url, order_index) VALUES 
('React.js', 'Frontend', 90, null, 1),
('Next.js', 'Frontend', 85, null, 2),
('Tailwind CSS', 'Frontend', 95, null, 3),
('TypeScript', 'Frontend', 80, null, 4),
('Node.js', 'Backend', 80, null, 5),
('Express.js', 'Backend', 75, null, 6),
('Supabase', 'Database', 85, null, 7),
('PostgreSQL', 'Database', 75, null, 8),
('MongoDB', 'Database', 70, null, 9),
('Git & GitHub', 'Tools', 90, null, 10);

-- 4. Projects (3 projects)
INSERT INTO public.projects (title, description, tech_stack, live_url, github_url, image_url, featured, order_index) VALUES 
('E-Commerce Platform', 'A fully functional modern e-commerce application with product catalog, shopping cart, secure Stripe checkout, and user authentication dashboard.', '{"Next.js", "Stripe", "Supabase", "Tailwind CSS"}', 'https://demo.com', 'https://github.com/Arslan-web-Dev', null, true, 1),
('AI Content Generator', 'A SaaS tool that leverages OpenAI API to automatically generate high-quality marketing copy, blog posts, and social media content.', '{"Next.js", "OpenAI API", "PostgreSQL", "Vercel"}', 'https://demo.com', 'https://github.com/Arslan-web-Dev', null, true, 2),
('Task Management Dashboard', 'An intuitive real-time dashboard for team collaboration and task tracking with drag-and-drop Kanban boards and role-based access.', '{"React", "Firebase", "Tailwind CSS", "DnD Kit"}', 'https://demo.com', 'https://github.com/Arslan-web-Dev', null, false, 3),
('Portfolio Website', 'A stunning 3D interactive portfolio built with Three.js, Framer Motion, and Supabase-powered admin panel for full content management.', '{"Next.js", "Three.js", "Framer Motion", "Supabase"}', 'https://demo.com', 'https://github.com/Arslan-web-Dev', null, false, 4);

-- 5. Certificates (3 certificates)
INSERT INTO public.certificates (title, issuer, issue_date, credential_url, image_url, file_url, order_index) VALUES 
('Full Stack Web Development', 'Coursera', 'August 2023', 'https://coursera.org/verify', null, null, 1),
('React Native Mobile Development', 'Udemy', 'January 2024', 'https://udemy.com/certificate', null, null, 2),
('JavaScript Algorithms & Data Structures', 'freeCodeCamp', 'March 2023', 'https://freecodecamp.org/certification', null, null, 3);

-- 6. Collaborations / Experience (3 entries)
INSERT INTO public.collaborations (company, role, duration, description, logo_url, order_index) VALUES 
('Tech Solutions Inc.', 'Frontend Developer Intern', 'June 2023 - Aug 2023', 'Developed responsive user interfaces for internal dashboards using React and Tailwind CSS. Improved overall site performance by 30% through code optimization and lazy loading.', null, 1),
('Freelance', 'Full Stack Developer', 'Sep 2023 - Present', 'Built multiple client projects including e-commerce stores, portfolio websites, and SaaS dashboards. Delivered 10+ projects with 5-star client satisfaction.', null, 2),
('COMSATS University Islamabad', 'BS Computer Science', '2021 - 2025', 'Final year student with focus on software engineering. Leading a team of 3 to develop an AI-based career counseling platform as Final Year Project.', null, 3);
