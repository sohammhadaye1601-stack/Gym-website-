export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  iconName: string;
  image: string;
}

export interface ClassItem {
  id: string;
  name: string;
  days: string;
  time: string;
  trainer: string;
  capacity?: string;
  image: string;
  intensity: 'Medium' | 'High' | 'All Levels';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Gym' | 'Training' | 'Group Classes' | 'Sports' | 'Team' | 'Events';
  image: string;
  aspect?: 'tall' | 'wide' | 'square';
}

export interface TransformationItem {
  id: string;
  title: string;
  duration: string;
  achievement: string;
  imageBefore?: string;
  imageAfter: string;
  notes?: string;
  isPlaceholder?: boolean;
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  specialization: string;
  image: string;
}

export interface InstagramPost {
  id: string;
  caption: string;
  image: string;
  likes?: string;
  url: string;
}

export interface EnquirySubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  timestamp: string;
}

export interface WebsiteContent {
  businessName: string;
  fullName: string;
  tagline: string;
  category: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagramUrl: string;
  instagramHandle: string;
  websiteUrl: string;
  followersCount: string;
  postsCount: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  
  logoImage?: string; // custom uploaded logo if any

  hero: {
    heading: string;
    subheadline: string;
    secondaryLine: string;
    locationBadge: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroImage: string;
  };

  about: {
    heading: string;
    description: string;
    features: {
      number: string;
      title: string;
      desc: string;
      image: string;
    }[];
  };

  servicesHeading: string;
  servicesSubtitle: string;
  services: ServiceItem[];

  whySlam: {
    heading: string;
    subtitle: string;
    points: {
      title: string;
      desc: string;
    }[];
  };

  trainingExperience: {
    heading: string;
    subtitle: string;
    images: {
      id: string;
      title: string;
      category: string;
      image: string;
    }[];
  };

  groupClasses: {
    heading: string;
    description: string;
    classes: ClassItem[];
  };

  results: {
    heading: string;
    subheading: string;
    badge: string;
    items: TransformationItem[];
  };

  trainers: TrainerItem[];

  instagramSection: {
    heading: string;
    handle: string;
    posts: InstagramPost[];
  };

  gallery: GalleryItem[];

  cta: {
    headline: string;
    subheading: string;
    buttonEnquire: string;
    buttonWhatsapp: string;
  };
}
