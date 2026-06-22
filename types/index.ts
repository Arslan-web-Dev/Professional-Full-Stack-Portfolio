export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
  image_url?: string;
  featured: boolean;
  order_index: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon_url?: string;
  order_index: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url?: string;
  image_url?: string;
  file_url?: string;
  order_index: number;
}

export interface Collaboration {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  logo_url?: string;
  order_index: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  order_index: number;
  visible: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  file_url: string;
  file_type: string;
  size_kb: number;
  label: string;
  show_in_sidebar: boolean;
  uploaded_at: string;
}

export interface SeoSettings {
  id: string;
  page: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_card: string;
  canonical_url: string;
  updated_at: string;
}

export interface PortfolioMeta {
  id: string;
  section: string;
  data: Record<string, unknown>;
  updated_at: string;
}
