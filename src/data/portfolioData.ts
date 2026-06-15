export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'web' | 'ai' | 'iot' | 'all';
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  highlights?: string[];
  status: string;
  architecture?: {
    problemStatement: string;
    activeSolutions?: string;
    choiceRationale?: string;
    competitiveAdvantage?: string;
    researchPlanning: string;
    stack: string;
    process: string;
    resultsImprovements: string;
  };
}

export interface Skill {
  name: string;
  category: 'experienced' | 'knowledge' | 'learning' | 'interested';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'internship' | 'education' | 'milestone';
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'certification' | 'academic' | 'competition' | 'course';
  credentialUrl?: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Internship Journey' | 'Learning React' | 'ESP32 Experiments' | 'AI Exploration' | 'Building LUMOS Projects' | 'Cybersecurity Learning Notes' | 'Portfolio Development Updates';
  readTime: string;
  date: string;
  image?: string;
}

export const personalInfo = {
  name: "Kartik Verma",
  titles: [
    "BCA Student",
    "Technology Enthusiast",
    "Active Learner",
    "IoT Experimenter"
  ],
  bio: "I am a BCA student passionate about technology, AI, web development, and IoT systems. I enjoy experimenting with ESP8266 and ESP32 platforms, exploring AI-powered tools, and building practical projects that help me understand real-world engineering concepts.",
  resumeUrl: "/assets/resume/Kartik_Verma_Resume.pdf", 
  email: "KartikVerma0804@gmail.com",
  github: "https://github.com/kartikverma-dev",
  linkedin: "https://www.linkedin.com/in/kartik-verma-5459a5378",
  location: "India",
  mission: "To learn continuous software development practices, explore embedded microcontrollers and security baselines, and build useful visual toolings.",
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "IMS Ghaziabad (University Courses Campus)",
    duration: "2025 - 2028",
    gpa: "Active Pursuing"
  }
};

export const skills: Skill[] = [
  // Experienced With
  { name: "Python", category: "experienced" },
  { name: "C", category: "experienced" },
  { name: "MySQL", category: "experienced" },
  { name: "HTML", category: "experienced" },
  { name: "CSS", category: "experienced" },
  { name: "Git", category: "experienced" },
  { name: "GitHub", category: "experienced" },
  { name: "Windows", category: "experienced" },
  { name: "Linux", category: "experienced" },
  { name: "Kali Linux", category: "experienced" },

  // Knowledge Areas
  { name: "Cybersecurity Fundamentals", category: "knowledge" },
  { name: "Networking Basics", category: "knowledge" },
  { name: "System Awareness", category: "knowledge" },
  { name: "Responsive Web Design", category: "knowledge" },
  { name: "AI Productivity Tools", category: "knowledge" },

  // Currently Learning
  { name: "JavaScript", category: "learning" },
  { name: "Backend Development", category: "learning" },
  { name: "React", category: "learning" },
  { name: "Next.js", category: "learning" },
  { name: "ESP32 Development", category: "learning" },
  { name: "AI Engineering", category: "learning" },
  { name: "API Integration", category: "learning" },
  { name: "Embedded Systems", category: "learning" },

  // Interested In
  { name: "Artificial Intelligence", category: "interested" },
  { name: "AI Agents", category: "interested" },
  { name: "IoT Systems", category: "interested" },
  { name: "Computer Vision", category: "interested" },
  { name: "Full Stack Development", category: "interested" },
  { name: "Embedded Programming", category: "interested" },
  { name: "Automation Systems", category: "interested" }
];

export const projects: Project[] = [
  {
    id: "lumos-rf",
    title: "LUMOS RF",
    description: "Experimental RF sensing platform using ESP8266/ESP32 concepts for motion and environmental activity analysis through wireless signal behavior.",
    longDescription: "An experimental research prototype designed to explore wireless signal disruptions for motion tracking. By monitoring wireless channel variations, it investigates non-intrusive room occupancy and activity recognition. Purpose: Motion analysis. Technologies: ESP8266, ESP32, Python. Progress: Experimental prototype. Future Roadmap: Signal processing filters and logging dashboards.",
    category: "iot",
    image: "/projects/wifi-sensing.png",
    tags: ["ESP8266", "ESP32", "RF Sensing", "Python", "Wireless Signals"],
    githubUrl: "https://github.com/kartikverma-dev/LUMOS-RF",
    featured: true,
    highlights: [
      "Purpose: Occupancy & environmental activity recognition",
      "Technologies: ESP8266, ESP32, RF concepts",
      "Current Progress: Signal disruption research & basic data logging",
      "Future Roadmap: Noise-reduction filters and Web Dashboard integration"
    ],
    status: "Research / Prototype",
    architecture: {
      problemStatement: "Traditional motion tracking relies on cameras, which invade privacy, or expensive specialized sensors.",
      activeSolutions: "1. Commercial microwave/radar-based occupancy sensors (such as Xandar Kardian). 2. Proprietary mesh WiFi Sensing routers (like ASUS AiMesh / Linksys Aware).",
      choiceRationale: "Traditional camera-based security violates personal privacy, while dedicated radar modules are costly to scale. Leveraging ambient WiFi signals via commodity ESP microcontrollers provides a completely passive, privacy-safe, and zero-hardware-overhead way to monitor motion.",
      competitiveAdvantage: "Unlike commercial solutions that require expensive proprietary mesh systems or specialized radar arrays, my approach utilizes ultra-low-cost, widely accessible ESP8266/ESP32 microcontrollers. It is entirely open-source, customizable, and runs local signal processing without sending sensitive data to external corporate clouds.",
      researchPlanning: "Investigate wireless signal disruptions (Channel State Information - CSI) for non-intrusive room occupancy tracking using ESP8266/ESP32 microcontrollers.",
      stack: "ESP8266/ESP32 modules, Python (for data logging and analysis), C/C++ (firmware).",
      process: "Set up CSI data collection firmware, build a Python listener script, analyze signal variance patterns.",
      resultsImprovements: "Achieved basic motion logging and occupancy detection; planned upgrades include noise-reduction filters and a real-time web dashboard."
    }
  },
  {
    id: "lumos-rover",
    title: "LUMOS ROVER",
    description: "Smart rover platform designed for experimentation, learning, remote control systems, sensors, and embedded development.",
    longDescription: "An in-progress robotics experimentation platform. Built to gain hands-on experience with microcontroller motor controls, sensor telemetry, and wireless transmission systems. Hardware stack: ESP32/ESP8266, motor drivers, ultrasonic range sensors, rechargeable cells. Learning Objectives: Telemetry capture, obstacle avoidance logic. Future Upgrades: Autonomous pathfinding, web controller dashboard.",
    category: "iot",
    image: "/projects/rover.png",
    tags: ["ESP32", "Robotics", "Motor Drivers", "Sensors", "Embedded C++"],
    githubUrl: "https://github.com/kartikverma-dev/lumos-AI-Rover",
    featured: true,
    highlights: [
      "Hardware Stack: ESP32/ESP8266, L298N driver, sensors",
      "Learning Objectives: Real-time telemetry, motor controls, and signal delays",
      "Future Upgrades: Video stream mapping and autonomous steering navigation"
    ],
    status: "In Progress",
    architecture: {
      problemStatement: "Exploring robotics controls, telemetry, and wireless transmission systems requires a hands-on, customizable platform.",
      activeSolutions: "1. Enterprise-grade ROS (Robot Operating System) research platforms (like TurtleBot). 2. Proprietary, closed-source consumer/educational robotics kits (like DJI Robomaster).",
      choiceRationale: "Industrial ROS systems present a steep learning curve and prohibitive hardware costs, while consumer kits offer no low-level control. An ESP32-centric rover provides the perfect entry point to master bare-metal motor control, real-time sensor telemetry, and low-latency wireless communication.",
      competitiveAdvantage: "Instead of relying on heavy operating system frameworks or locked commercial firmware, my solution utilizes a bare-metal C++ codebase and lightweight WebSockets. It delivers sub-millisecond control latency, exposes direct hardware diagnostics, and costs a fraction of commercial educational kits.",
      researchPlanning: "Build an open-source, mobile robotics platform to study microcontroller motor driver interface logic and real-time sensor integration.",
      stack: "ESP32/ESP8266, L298N motor driver, ultrasonic sensors, rechargeable batteries, C++ (embedded).",
      process: "Assemble chassis and wire drivers/sensors, program motor control logic, implement telemetry broadcast over WiFi/WebSockets.",
      resultsImprovements: "Successfully built motor and sensor interface telemetry; future plans include video streaming and autonomous pathfinding/navigation."
    }
  },
  {
    id: "lumos-ai-pin",
    title: "LUMOS AI PIN",
    description: "Personal AI assistant device concept exploring AI interaction, portability, voice-based assistance, and embedded intelligence.",
    longDescription: "A prototype/concept project investigating mobile hardware voice interaction. Features research into microphone buffering, lightweight wireless API queries, and Edge speech generation models. Concept: Hand-held AI assistant. Research goals: Sound latency minimization. Planned features: Standalone WiFi agent client, compact visual indicators.",
    category: "ai",
    image: "/projects/ai-pin.png",
    tags: ["AI Wearable", "API Integration", "ESP32-S3 Concept", "Voice Assistance"],
    githubUrl: "https://github.com/kartikverma-dev/LUMOS-AI-PIN",
    featured: true,
    highlights: [
      "Concept: Wearable or compact AI voice assistant node",
      "Research Goals: Reducing response latency and optimizing API streams",
      "Planned Features: Standalone Web Socket query & physical casing shell design"
    ],
    status: "Prototype / Research",
    architecture: {
      problemStatement: "Modern AI voice assistants are typically locked to heavy mobile phones or desktop environments rather than portable dedicated devices.",
      activeSolutions: "1. Commercial standalone AI wearables (such as the Humane AI Pin or Rabbit R1). 2. Mobile-based voice assistants (like Apple Siri or Google Assistant) integrated into smartphones.",
      choiceRationale: "Smartphones distract users with screen-locking loops, and commercial AI wearables lock hardware behind expensive monthly subscriptions. I wanted to research how an open, subscription-free, ultra-lightweight hardware node can stream voice commands directly to LLMs.",
      competitiveAdvantage: "Rather than requiring custom mobile processors or proprietary cellular service plans, my system operates on a low-cost ($5) ESP32-S3 microcontroller using standard WiFi. It connects to open-source APIs, incurs zero subscription fees, and allows users to self-host their LLM backend for absolute privacy.",
      researchPlanning: "Conceptualize a lightweight wearable voice agent node, optimizing for audio latency, microphone buffering, and wireless API calls.",
      stack: "ESP32-S3 concept, digital microphone, Speaker/DAC, WebSockets, OpenAI/Open-source LLM APIs.",
      process: "Design audio streaming buffer firmware, establish WebSocket connection to AI agent endpoint, test text-to-speech rendering on device.",
      resultsImprovements: "Working prototype with basic audio interaction; planned upgrades include battery management and a custom compact physical casing shell."
    }
  }
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Intern",
    company: "CredgeSoul AI",
    period: "Active Internship",
    description: [
      "Currently pursuing an internship at CredgeSoul AI.",
      "Gaining exposure to professional workflows, AI-assisted technologies, and software development environments.",
      "Do not claim exaggerated responsibilities."
    ],
    type: "internship",
    icon: "cpu"
  },
  {
    id: "exp-2",
    role: "BCA Student",
    company: "IMS Ghaziabad (University Courses Campus)",
    period: "2024 - 2027",
    description: [
      "Enrolled in the Bachelor of Computer Applications program.",
      "Studying computer fundamentals, database models (MySQL), OOP principles (C/C++), and data structures."
    ],
    type: "education",
    icon: "book-open"
  },
  {
    id: "exp-3",
    role: "Discipline In-Charge & Student Leadership",
    company: "Secondary & Senior Schooling",
    period: "Classes XI & XII",
    description: [
      "Managed classroom organization and enforced guidelines during morning assemblies and events.",
      "Represented class bodies in student council discussions."
    ],
    type: "milestone",
    icon: "award"
  }
];

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "AI for All – AI & Cybersecurity Awareness",
    issuer: "Awareness Program",
    date: "Completed",
    category: "certification"
  },
  {
    id: "ach-2",
    title: "Internet of Things (IoT)",
    issuer: "E&ICT Academy, IIT Kanpur",
    date: "Completed",
    category: "certification"
  },
  {
    id: "ach-3",
    title: "Completion of AI for All Program",
    issuer: "AI & Cybersecurity Initiative",
    date: "Completed",
    category: "academic"
  },
  {
    id: "ach-4",
    title: "Completion of IoT Student Development Program",
    issuer: "E&ICT Academy, IIT Kanpur",
    date: "Completed",
    category: "academic"
  },
  {
    id: "ach-5",
    title: "Active Internship Participation",
    issuer: "CredgeSoul AI",
    date: "Ongoing",
    category: "academic"
  },
  {
    id: "ach-6",
    title: "Self-driven Technical Learning Journey",
    issuer: "Personal Projects",
    date: "Ongoing",
    category: "academic"
  },
  {
    id: "ach-7",
    title: "Discipline In-Charge Roles",
    issuer: "School Administration (Classes XI & XII)",
    date: "Completed",
    category: "competition"
  },
  {
    id: "ach-8",
    title: "School-Level Skating Competition Awards",
    issuer: "Inter-House Sports Meet",
    date: "Completed",
    category: "competition"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Internship Journey: Getting Started at CredgeSoul AI",
    excerpt: "An overview of entering a professional workspace, adjusting to collaboration tools, and studying code bases.",
    content: "Currently preparing. This entry will share my experience working with developmental environments, learning code standards, and collaborating with seniors.",
    category: "Internship Journey",
    readTime: "Planned / Coming Soon",
    date: "Upcoming Entry"
  },
  {
    id: "blog-2",
    title: "Building LUMOS RF: Wireless signal disturbances",
    excerpt: "Exploring Channel State Information (CSI) concepts on ESP8266 modules for motion detection.",
    content: "Currently researching. This article will document the hardware setups and Python log files tracking RF interference.",
    category: "Building LUMOS Projects",
    readTime: "Planned",
    date: "Upcoming Entry"
  },
  {
    id: "blog-3",
    title: "Journey into React & Next.js Basics",
    excerpt: "Transitioning from HTML and CSS styles into React hooks, state variables, and folder routing structures.",
    content: "Currently drafting. This post details my first single page app layouts, understanding props, and styling panels.",
    category: "Learning React",
    readTime: "Drafting",
    date: "Upcoming Entry"
  },
  {
    id: "blog-4",
    title: "Cybersecurity Notes: Kali Linux & Network Basics",
    excerpt: "Learning commands, port scans, and network architectures.",
    content: "Currently preparing. A compilation of my notes from laboratories, documenting terminal commands and protocol suites.",
    category: "Cybersecurity Learning Notes",
    readTime: "Planned",
    date: "Upcoming Entry"
  }
];
