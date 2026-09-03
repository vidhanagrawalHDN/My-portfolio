import { Project, Certificate, Education, Experience, SkillCategory } from '../types';

export const personalInfo = {
  name: "Vidhan Agrawal",
  photo: '/My photo Professional.png',
  title: "Full-Stack Developer & Data Science Enthusiast",
  subheading: "B.Tech in Computer Science & Engineering (CGPA: 9.3) at Lovely Professional University. Passionate about building robust web ecosystems, neural audio pipelines, and data-driven dashboards.",
  email: "vidhanagrawal0607@gmail.com",
  phone: "+91 7974406417",
  location: "Phagwara, Punjab / Mandla, MP, India",
  linkedin: "https://www.linkedin.com/in/vidhanagrawal06",
  linkedinUsername: "vidhanagrawal06",
  github: "https://github.com/vidhanagrawalHDN",
  githubUsername: "vidhanagrawalHDN",
  status: "Available for Internships & Full-Time Roles",
  about: "I am a Computer Science undergraduate with a consistent record of academic excellence (9.3 CGPA at LPU) and hands-on experience in full-stack web development, automated voice synthesis, and business intelligence. I specialize in crafting performant applications using React, Python, Supabase, and modern data platforms like Tableau, Power BI, and IBM Cognos. With strong problem-solving acumen and leadership experience, I thrive at the intersection of scalable engineering and user-centric software design."
};

export const stats = [
  { label: "B.Tech CGPA", value: "9.3", detail: "Lovely Professional University" },
  { label: "Verified Credentials", value: "6", detail: "Infosys, Saylor, iamNeo, Times" },
  { label: "Core Projects", value: "3+", detail: "Full Stack, AI & Hackathon" },
  { label: "Training Hours", value: "200+", detail: "Programming & BI Analytics" },
];

export const projects: Project[] = [
  {
    id: "mindx",
    title: "MINDX",
    badge: "Featured Ecosystem",
    dates: "Mar – Jun 2026",
    category: "fullstack",
    featured: true,
    summary: "Gamified peer-to-peer doubt-solving web ecosystem with interactive bounty rewards, reputation tiers, and real-time query resolution threads.",
    descriptionBullets: [
      "Architected a gamified peer-to-peer doubt-solving web ecosystem featuring interactive bounty rewards, reputation tiers, and real-time query resolution threads to drive student engagement.",
      "Engineered secure backend data workflows utilizing Supabase and Python services to handle instant message routing, relational state caching, and automated user authorization.",
      "Deployed responsive UI components with React and Tailwind CSS onto Vercel, reducing client layout shift while maintaining sub-second query turnaround across mobile views."
    ],
    techStack: ["React", "Tailwind CSS", "Supabase", "Python", "Vercel", "WebSockets"],
    githubUrl: "https://github.com/vidhanagrawalHDN/MindX.git"
  },
  {
    id: "voice-generator",
    title: "Voice Generator",
    badge: "Neural Audio",
    dates: "Feb 2026",
    category: "ai",
    featured: true,
    summary: "Automated neural voice synthesis ecosystem converting raw text into ultra-realistic, broadcast-grade audio narratives across diverse accents.",
    descriptionBullets: [
      "Spearheaded an automated neural voice synthesis ecosystem that converts raw text into ultra-realistic, broadcast-grade audio narratives across diverse accents.",
      "Integrated high-performance background pipelines to generate studio-quality speech streams instantly while maintaining zero-latency processing for high-volume content creators.",
      "Formulated an optimized client-facing delivery framework to render downloadable media assets with flawless pitch precision and seamless dynamic voice modulation."
    ],
    techStack: ["Python", "Neural Voice Synthesis", "Modern Web Tech", "Open Source", "Audio DSP"],
    githubUrl: "https://github.com/vidhanagrawalHDN/Voice-Generator.git"
  },
  {
    id: "tech-store",
    title: "Tech-Store",
    badge: "Hackathon Project",
    dates: "Sept 2025",
    category: "frontend",
    featured: true,
    summary: "High-performance modular e-commerce storefront with complex inventory serialization and zero visual stutter during rapid filtering.",
    descriptionBullets: [
      "Implemented a modular shopping cart state architecture using modern JavaScript (ES6+) and local storage serialization to preserve complex inventory selections during active user sessions.",
      "Designed responsive, high-fidelity user interface viewports with modern CSS3 layouts and dynamic DOM mutation pipelines, ensuring fluid cross-device navigation and zero visual stutter.",
      "Coordinated front-of-house feature delivery across a collaborative multi-contributor Git workflow to integrate interactive product catalog filters with sub-second responsive updates."
    ],
    techStack: ["JavaScript (ES6+)", "CSS3", "HTML5", "LocalStorage", "Git Workflow"],
    githubUrl: "https://github.com/vidhanagrawalHDN/Tech-store-html-project-.html.git"
  }
];

export const experienceData: Experience[] = [
  {
    id: "ibm-training",
    role: "Summer Trainee – Business Intelligence & Data Visualization",
    organization: "IBM – Summer Training Program",
    location: "Virtual / Industry Training",
    period: "Jun 2026 – Aug 2026",
    type: "Professional Training",
    descriptionBullets: [
      "Completed practical, hands-on training in business intelligence, data transformation, exploratory data analysis, and executive interactive dashboard development.",
      "Utilized IBM Cognos Analytics, Tableau, and Microsoft Power BI to ingest large datasets, model relational schemas, apply dynamic filters, and deliver actionable visual dashboards.",
      "Formulated analytical frameworks to identify trends, forecast key metrics, and present meaningful business insights for data-driven strategic decision-making."
    ],
    tools: ["IBM Cognos Analytics", "Tableau", "Power BI", "Data Modeling", "ETL Pipelines", "Business Intelligence"]
  },
  {
    id: "times-foundation",
    role: "Community Development Project Member",
    organization: "Times Foundation × Lovely Professional University",
    location: "Punjab, India",
    period: "2025 – 2026",
    type: "Social Impact & Leadership",
    descriptionBullets: [
      "Actively contributed to grassroots community-focused initiatives demonstrating commitment, responsibility, teamwork, and a strong spirit of social impact.",
      "Collaborated with university peers and community organizers to solve regional operational challenges, earning formal certification under CSR Bennett, Coleman & Co. Ltd."
    ],
    tools: ["Leadership", "Project Management", "Stakeholder Communication", "Community Engagement"]
  }
];

export const certificates: Certificate[] = [
  {
    id: "iamneo-programming",
    title: "Computer Programming",
    issuer: "iamneo (An NIIT Venture)",
    partner: "neo colab • Lovely Professional University",
    issueDate: "21-May-2026",
    courseDuration: "18-Jan-2026 to 20-May-2026",
    certificateId: "18dh7Ci2A10b65DJ3BK1",
    hours: "150 Hours",
    signatory: "SENTHIKUMAR TP",
    category: "programming",
    highlightText: "Duration: 150 Hours (18-Jan-2026 to 20-May-2026) • Consistency & Excellence in Programming",
    badgeColor: "rose",
    skills: ["Computer Programming", "Data Structures", "Algorithmic Problem Solving", "Code Consistency"]
  },
  {
    id: "saylor-ai",
    title: "CS205: Building with Artificial Intelligence",
    issuer: "Saylor Academy",
    issueDate: "January 14, 2026",
    certificateId: "1750906435VA",
    hours: "48 hours",
    ceu: "4.8",
    grade: "84.31 %",
    signatory: "Michael J Saylor",
    category: "ai",
    highlightText: "Grade: 84.31% • 48 Course Hours • 4.8 Continuing Education Units",
    badgeColor: "blue",
    skills: ["Artificial Intelligence", "Model Architectures", "Prompt Engineering", "AI Systems"]
  },
  {
    id: "infosys-bigdata",
    title: "Big Data",
    issuer: "Infosys | Springboard",
    partner: "Infosys Navigate your next",
    issueDate: "April 3, 2026",
    verificationUrl: "https://verify.onwingspan.com",
    signatory: "Satheesha B. Nanjappa (Senior Vice President & Head Education, Training and Assessment, Infosys Limited)",
    category: "data",
    highlightText: "Certified in Big Data • Issued by Infosys Springboard on April 3, 2026",
    badgeColor: "indigo",
    skills: ["Big Data", "Distributed Processing", "Data Pipelines", "Hadoop Ecosystem"]
  },
  {
    id: "infosys-datascience",
    title: "Data Science",
    issuer: "Infosys | Springboard",
    partner: "Infosys Navigate your next",
    issueDate: "April 3, 2026",
    verificationUrl: "https://verify.onwingspan.com",
    signatory: "Satheesha B. Nanjappa (Senior Vice President & Head Education, Training and Assessment, Infosys Limited)",
    category: "data",
    highlightText: "Certified in Data Science • Issued by Infosys Springboard on April 3, 2026",
    badgeColor: "indigo",
    skills: ["Data Science", "Statistical Analysis", "Predictive Analytics", "Machine Learning"]
  },
  {
    id: "saylor-leadership",
    title: "PRDV224: Leadership and Teams",
    issuer: "Saylor Academy",
    issueDate: "October 29, 2025",
    certificateId: "7139089043VA",
    hours: "9 Hours",
    ceu: "0.9",
    grade: "80.00",
    signatory: "Michael J Saylor",
    category: "leadership",
    highlightText: "Grade: 80.00 • 9 Course Hours • 0.9 Continuing Education Units",
    badgeColor: "amber",
    skills: ["Leadership and Teams", "Conflict Resolution", "Agile Collaboration", "Team Dynamics"]
  },
  {
    id: "times-community",
    title: "Community Development Project",
    issuer: "Times Foundation",
    partner: "in collaboration with Lovely Professional University",
    issueDate: "2025 – 2026",
    verificationUrl: "https://verification.givemycertificate.com/v/9a09e1e1-7e97-4926-81e5-c502c1b86d72",
    signatory: "Lieutenant Sanjiv Kaura (CEO-Corporate Social Responsibility, Bennett, Coleman & Co. Ltd.)",
    category: "community",
    highlightText: "Committed to Community Impact • Social Welfare & Leadership under Times of India",
    badgeColor: "amber",
    skills: ["Community Development", "Social Service", "Leadership", "Public Impact"]
  }
];

export const educationList: Education[] = [
  {
    id: "lpu-btech",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    scoreLabel: "CGPA",
    scoreValue: "9.3 / 10.0",
    period: "Aug 2025 – Present",
    highlights: [
      "Top-tier academic standing with 9.3 CGPA in core computer science curriculum.",
      "Active participant in technical hackathons, coding workshops, and project showcases.",
      "Completed specialized 150-hour programming immersion in C and data structures."
    ]
  },
  {
    id: "bj-intermediate",
    institution: "Bharat Jyoti Hr. Sec. School",
    location: "Mandla, Madhya Pradesh",
    degree: "Senior Secondary (Class XII)",
    field: "Physics, Chemistry, Mathematics (PCM)",
    scoreLabel: "Percentage",
    scoreValue: "90.8%",
    period: "Feb – Mar 2025",
    highlights: [
      "Distinction in Science stream with deep analytical grounding in advanced mathematics.",
      "Represented school in regional academic quizzes and science exhibitions."
    ]
  },
  {
    id: "bj-matriculation",
    institution: "Bharat Jyoti Hr. Sec. School",
    location: "Mandla, Madhya Pradesh",
    degree: "High School (Class X)",
    scoreLabel: "Percentage",
    scoreValue: "93.2%",
    period: "March 2023",
    highlights: [
      "High academic honor roll with 93.2% aggregate score across all core subjects.",
      "Foundation in mathematics, sciences, and introductory computer studies."
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    categoryName: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Python", featured: true, level: "Advanced" },
      { name: "C", featured: true, level: "Proficient" },
      { name: "JavaScript (ES6+)", featured: true, level: "Advanced" },
      { name: "TypeScript", level: "Proficient" },
      { name: "JSON", level: "Expert" }
    ]
  },
  {
    categoryName: "Web & Full-Stack",
    iconName: "Globe",
    skills: [
      { name: "React", featured: true, level: "Advanced" },
      { name: "Node.js", featured: true, level: "Proficient" },
      { name: "HTML5 & CSS3", featured: true, level: "Expert" },
      { name: "Tailwind CSS", featured: true, level: "Advanced" },
      { name: "REST APIs", level: "Proficient" },
      { name: "Supabase", featured: true, level: "Proficient" }
    ]
  },
  {
    categoryName: "BI & Data Visualization",
    iconName: "BarChart3",
    skills: [
      { name: "Tableau", featured: true, level: "Proficient" },
      { name: "Power BI", featured: true, level: "Proficient" },
      { name: "IBM Cognos", featured: true, level: "Trained" },
      { name: "MS SQL Server", featured: true, level: "Proficient" },
      { name: "Big Data (Hadoop)", level: "Certified" },
      { name: "Data Modeling", level: "Proficient" }
    ]
  },
  {
    categoryName: "Cloud, DevOps & Creative Tools",
    iconName: "Layers",
    skills: [
      { name: "Vercel", level: "Deployment" },
      { name: "GitHub / Git", featured: true, level: "Advanced" },
      { name: "Render", level: "Deployment" },
      { name: "Figma", level: "UI/UX Design" },
      { name: "CapCut", level: "Media Editing" },
      { name: "AI Tools & APIs", featured: true, level: "Integration" }
    ]
  },
  {
    categoryName: "Leadership & Soft Skills",
    iconName: "Users",
    skills: [
      { name: "Team Leader", featured: true },
      { name: "Project Management", featured: true },
      { name: "Time Management", featured: true },
      { name: "Active Listener" },
      { name: "Adaptability" },
      { name: "Analytical Problem Solving" }
    ]
  }
];
