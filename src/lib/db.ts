export interface Project {
  id: string;
  title: string;
  category: "Graphics Design" | "Digital Marketing" | "Social Media" | "Website Development" | "Branding";
  subCategory: string; // e.g., "Logo Design", "Stationery", "Packaging"
  description: string;
  image: string; // Featured image
  gallery?: string[]; // Multiple images
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  published: boolean;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

// Initial Mock Data
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "EcoBrand Identity",
    category: "Graphics Design",
    subCategory: "Logo Design",
    description: "Full visual identity and logo design for a sustainable tech company. We focused on minimalism and earth tones to reflect their core values.",
    image: "https://images.unsplash.com/photo-1541462608141-ad4d0b942085?auto=format&fit=crop&q=80&w=2426",
    featured: true,
  },
  {
    id: "2",
    title: "FinTech Platform",
    category: "Website Development",
    subCategory: "Web App",
    description: "Corporate banking platform with high security and rapid performance, designed for the modern financial sector.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
    featured: true,
  }
];

export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Design in 2026",
    excerpt: "Exploring the intersection of AI, speed, and minimalism.",
    content: "Full content about the future of web design...",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2426",
    date: "April 15, 2026",
    published: true,
  }
];
