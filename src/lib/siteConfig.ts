export interface SiteConfig {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    stats: { label: string; value: string }[];
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    image: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export const defaultSiteConfig: SiteConfig = {
  home: {
    heroTitle: "Build your premium Digital Brand",
    heroSubtitle: "toopixels is your partner for high-end web development, creative design, and result-driven digital marketing.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2301",
    stats: [
      { label: "Working Since", value: "2018" },
      { label: "Customers served", value: "1.8k+" },
      { label: "Global Presence", value: "12" }
    ]
  },
  about: {
    title: "Building Digital Futures Since 2018",
    description: "toopixels has been helping brands scale with custom design, innovative technology, and result-driven digital strategies.",
    mission: "To help businesses grow with creative design and technology.",
    vision: "To become a leading creative agency.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2426"
  },
  contact: {
    email: "hello@toppixels.pro",
    phone: "+1 (555) 000-0000",
    address: "Business Bay, Dubai, UAE"
  }
};
