export interface Project {
  id: string;
  title: string;
  badge?: string;
  dates: string;
  summary: string;
  descriptionBullets: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  category: 'fullstack' | 'ai' | 'frontend';
  featured?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  partner?: string;
  issueDate: string;
  certificateId?: string;
  verificationUrl?: string;
  hours?: string;
  courseDuration?: string;
  grade?: string;
  ceu?: string;
  signatory?: string;
  category: 'programming' | 'ai' | 'data' | 'leadership' | 'community';
  highlightText: string;
  badgeColor: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field?: string;
  scoreLabel: string;
  scoreValue: string;
  period: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  type: string;
  descriptionBullets: string[];
  tools: string[];
}

export interface SkillCategory {
  categoryName: string;
  iconName: string;
  skills: {
    name: string;
    level?: string;
    featured?: boolean;
  }[];
}
