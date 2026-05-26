export const DEVELOPER = {
  name: "Nikhilesh Lavishetty",
  firstName: "NikhileshShetty ",
  title: "Developer",
  subtitle: "3rd Year Computer Science Engineering Student",
  tagline: "I build scalable web applications and intelligent digital solutions.",
  email: "nikhilesh.lavishetty@email.com",
  github: "https://github.com/nikhileshlavishetty7777",
  githubUsername: "nikhileshlavishetty7777",
  linkedin: "https://linkedin.com/in/nikhileshlavishetty",
  instagram: "https://www.instagram.com/nikhilesh__shetty__7?igsh=MW9ncTRiN2trNmdxcg%3D%3D",
  available: true,
  location: "Surat, Gujarat",
  bio: "I'm a passionate Computer Science Engineering student in my 3rd year, obsessed with building products that live at the intersection of elegant design and powerful engineering. From full-stack web applications to AI-powered systems, I craft digital experiences that solve real problems.",
  resumeUrl: "#",
};

export const PROJECTS = [
  {
    id: 1,
    title: "Food Management System",
    description:
      "A comprehensive inventory and order management platform for food businesses. Features real-time stock tracking, automated reorder alerts, supplier management, and detailed analytics dashboard.",
    longDescription:
      "Built a full-featured food management system handling inventory tracking, order processing, and supplier relationships. The system includes automated low-stock alerts, expiry date tracking, waste analytics, and a responsive admin dashboard. Supports multi-user roles with granular permissions.",
    tech: ["PHP", "JavaScript", "MySQL", "XAMPP", "Bootstrap", "jQuery"],
    category: ["web", "backend"],
    image: "🍽️",
    gradient: "from-orange-500 to-red-600",
    github: "https://github.com/nikhileshlavishetty7777/food-management",
    live: "#",
    featured: true,
    stats: { stars: 12, forks: 4 },
  },
  {
    id: 2,
    title: "Shopping Application",
    description:
      "Native Android shopping app with Firebase Authentication, real-time product catalog, cart management, and secure checkout flow with order history tracking.",
    longDescription:
      "Developed a production-ready Android shopping app featuring Firebase Authentication for secure login/signup, Firestore for real-time product updates, local cart management, push notifications for order updates, and an intuitive Material Design UI. Supports Google Sign-In and email/password authentication.",
    tech: ["Java", "XML", "Firebase", "Android Studio", "Firestore"],
    category: ["mobile", "android"],
    image: "🛒",
    gradient: "from-blue-500 to-cyan-500",
    github: "https://github.com/nikhileshlavishetty7777/shopping-app",
    live: "#",
    featured: true,
    stats: { stars: 28, forks: 9 },
  },
  {
    id: 3,
    title: "Smart Grievance System",
    description:
      "Hackathon project — AI-powered university complaint tracking system with real-time status updates, admin dashboard, and automated routing to departments.",
    longDescription:
      "Built during a 24-hour hackathon, this system modernizes the university grievance process. Students submit complaints via mobile app, which are automatically routed to relevant departments using keyword analysis. Features real-time status tracking, email notifications, admin analytics dashboard, and resolution time metrics. Won Best Innovation Award.",
    tech: ["Java", "Firebase", "Android", "Firestore", "Cloud Functions"],
    category: ["mobile", "hackathon"],
    image: "🎓",
    gradient: "from-purple-500 to-pink-600",
    github: "https://github.com/nikhileshlavishetty7777/grievance-system",
    live: "#",
    featured: true,
    badge: "🏆 Hackathon Winner",
    stats: { stars: 41, forks: 15 },
  },
];

export const SKILLS = {
  frontend: [
    { name: "React", level: 88, icon: "⚛️" },
    { name: "JavaScript", level: 92, icon: "🟨" },
    { name: "HTML/CSS", level: 95, icon: "🌐" },
    { name: "Tailwind CSS", level: 85, icon: "🎨" },
  ],
  backend: [
    { name: "PHP", level: 82, icon: "🐘" },
    { name: "Java", level: 88, icon: "☕" },
    { name: "Node.js", level: 75, icon: "💚" },
    { name: "Python", level: 70, icon: "🐍" },
  ],
  database: [
    { name: "MySQL", level: 85, icon: "🗄️" },
    { name: "Firebase", level: 90, icon: "🔥" },
    { name: "MongoDB", level: 72, icon: "🍃" },
  ],
  tools: [
    { name: "Git & GitHub", level: 90, icon: "🐙" },
    { name: "Android Studio", level: 85, icon: "📱" },
    { name: "VS Code", level: 95, icon: "💻" },
    { name: "Figma", level: 68, icon: "🎭" },
  ],
};

export const EXPERIENCE = [
  {
    year: "2026",
    title: "Hackathon Participant",
    company: "State-Level Tech Hackathon",
    description:
      "Built Smart University Grievance Management System in 24 hours. Won Best Innovation Award among 80+ teams.",
    type: "achievement",
    icon: "🏆",
  },
  {
    year: "2026",
    title: "Full Stack Developer (Academic Project)",
    company: "2nd Year Project",
    description:
      "Leading development of a scalable web platform integrating modern frontend with robust backend APIs.",
    type: "project",
    icon: "🚀",
  },
  {
    year: "2025",
    title: "Android Developer",
    company: "Personal Project",
    description:
      "Developed Shopping Application with Firebase backend, serving as a complete e-commerce solution.",
    type: "project",
    icon: "📱",
  },
  {
    year: "2025",
    title: "Web Developer",
    company: "Academic Project",
    description:
      "Built Food Management System using PHP/MySQL stack with full CRUD operations and reporting.",
    type: "project",
    icon: "🌐",
  },
  {
    year: "2025",
    title: "Started Computer Science Engineering",
    company: "University",
    description:
      "Began journey in Computer Science Engineering, diving into fundamentals of programming, DSA, and system design.",
    type: "education",
    icon: "🎓",
  },
];

export const STATS = [
  { label: "Projects Built", value: 15, suffix: "+" },
  { label: "Technologies", value: 12, suffix: "+" },
  { label: "Hackathons", value: 3, suffix: "" },
  { label: "GitHub Repos", value: 20, suffix: "+" },
];

export const CHATBOT_RESPONSES = {
  greetings: [
    "Hi there! 👋 I'm Nikhilesh's portfolio assistant. Ask me anything about his skills, projects, or how to get in touch!",
    "Hello! I'm here to help you learn more about Nikhilesh Lavishetty. What would you like to know?",
  ],
  projects: {
    keywords: ["project", "built", "made", "created", "work", "portfolio"],
    response:
      "Nikhilesh has built 3 major projects:\n\n🍽️ **Food Management System** — PHP, MySQL, JavaScript\n🛒 **Shopping App** — Java, Firebase, Android\n🎓 **Smart Grievance System** — Java, Firebase (Hackathon Winner!)\n\nWant details on any specific project?",
  },
  food: {
    keywords: ["food", "inventory", "order", "restaurant"],
    response:
      "🍽️ **Food Management System**\n\nA full-stack web app for food business operations.\n\n**Features:**\n• Real-time inventory tracking\n• Order management\n• Automated reorder alerts\n• Analytics dashboard\n\n**Stack:** PHP, JavaScript, MySQL, XAMPP\n\nGreat for restaurant/food business use cases!",
  },
  shopping: {
    keywords: ["shopping", "cart", "android", "mobile", "ecommerce"],
    response:
      "🛒 **Shopping Application**\n\nA native Android e-commerce app.\n\n**Features:**\n• Firebase Authentication\n• Real-time product catalog\n• Shopping cart\n• Order history\n• Google Sign-In\n\n**Stack:** Java, XML, Firebase, Android Studio",
  },
  grievance: {
    keywords: ["grievance", "university", "complaint", "hackathon", "winner"],
    response:
      "🎓 **Smart University Grievance System**\n\nBuilt in 24 hours at a hackathon — won **Best Innovation Award**!\n\n**Features:**\n• Student complaint submission\n• Auto-routing to departments\n• Real-time status tracking\n• Admin analytics dashboard\n\n**Stack:** Java, Firebase, Android\n\nNikhilesh is really proud of this one! 🏆",
  },
  skills: {
    keywords: ["skill", "technology", "tech", "know", "language", "framework", "stack"],
    response:
      "💻 **Nikhilesh's Tech Stack:**\n\n**Frontend:** React, JavaScript, HTML/CSS, Tailwind\n**Backend:** PHP, Java, Node.js, Python\n**Mobile:** Android (Java), Firebase\n**Database:** MySQL, Firebase, MongoDB\n**Tools:** Git, GitHub, VS Code, Android Studio\n\nHe's strongest in JavaScript, Java, and Firebase!",
  },
  contact: {
    keywords: ["contact", "email", "reach", "hire", "connect", "touch"],
    response:
      "📬 **How to reach Nikhilesh:**\n\n📧 Email: nikhilesh@email.com\n💼 LinkedIn: linkedin.com/in/nikhileshlavishetty\n🐙 GitHub: github.com/nikhileshlavishetty\n\nNikhilesh is currently **available for internships** and open to exciting opportunities! Feel free to reach out. 🚀",
  },
  github: {
    keywords: ["github", "repo", "repository", "code", "open source"],
    response:
      "🐙 **Nikhilesh's GitHub:** github.com/nikhileshlavishetty\n\nYou can find all his projects there including:\n• Food Management System\n• Shopping Application\n• Smart Grievance System\n• And more personal projects!\n\nHe's quite active — check out his contribution graph on this page! 📊",
  },
  experience: {
    keywords: ["experience", "intern", "work", "job", "background", "history"],
    response:
      "📋 **Nikhilesh's Experience:**\n\n🏆 Hackathon winner (Best Innovation, 2026)\n🚀 3rd Year Project Lead (Full Stack)\n📱 Android App Developer (Personal Projects)\n🌐 Web Developer (Academic + Personal)\n\nCurrently in 3rd year of Computer Science Engineering and **looking for internships**!",
  },
  available: {
    keywords: ["available", "hire", "internship", "job", "opportunity", "open"],
    response:
      "✅ **Yes! Nikhilesh is available for opportunities!**\n\nHe's looking for:\n• Full Stack Developer internships\n• Frontend/Backend roles\n• Mobile development positions\n• Part-time freelance projects\n\nReach out via email or LinkedIn — he responds fast! 📬",
  },
  default: [
    "Hmm, I'm not sure about that! Try asking about Nikhilesh's **projects**, **skills**, **experience**, or **contact info**. 😊",
    "I didn't quite catch that! You can ask me about Nikhilesh's tech stack, his projects, hackathon experience, or how to hire him!",
    "Great question! But I need a bit more context. Try: 'What projects has Nikhilesh built?' or 'What technologies does he know?'",
  ],
};
