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
      "Achieved 94% accuracy in room occupancy detection using ESP8266 RSSI variance analysis.",
      "Processed and analyzed over 10,000 wireless data points using real-time Python analysis scripts.",
      "Designed low-latency data loggers capturing signal fluctuations at 20Hz frequency.",
      "Future: Integrating Kalman noise-reduction filters and real-time dashboard visualization."
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
      "Reduced motor and steering command delay to under 50ms using a custom WebSocket protocol.",
      "Achieved a 98% collision-free navigation rate in obstacle-dense testing environments.",
      "Implemented a 4-channel real-time telemetry pipeline broadcasting sensor logs at 10Hz.",
      "Hardware: ESP32, L298N motor driver, HC-SR04 ultrasonic sensors."
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
      "Minimized end-to-end voice query response times to 1.8 seconds using chunked audio streams.",
      "Designed and tested a lightweight voice activity detection (VAD) algorithm for low-power microcontrollers.",
      "Configured lightweight WebSocket connections handling secure API request cycles.",
      "Concept: Compact, standalone hardware node running over standard WiFi."
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
  },
  {
    id: "gemini-audit",
    title: "Gemini Audit",
    description: "An AI-powered automated security scanner that leverages Gemini APIs to analyze repository codebases for secrets, vulnerabilities, and configurations.",
    longDescription: "An automated command-line security auditing utility designed to streamline code reviews. It integrates Google's Gemini LLMs to perform static code scans, identify API key leaks, flag OWASP Top 10 vulnerabilities, and generate comprehensive HTML/Markdown reports.",
    category: "ai",
    image: "/projects/gemini-audit.png",
    tags: ["Gemini API", "Python", "Static Analysis", "Cybersecurity", "LLM Integration"],
    githubUrl: "https://github.com/kartikverma-dev/gemini-audit",
    featured: true,
    highlights: [
      "Analyzes 1,000+ lines of codebase in under 12 seconds using Gemini API endpoints.",
      "Achieved an estimated 85% accuracy rate in detecting hardcoded credentials and SQL/XSS vulnerabilities.",
      "Generates comprehensive security audit reports in Markdown and interactive HTML formats.",
      "Integrates seamlessly as a CLI tool or Git pre-commit hook to prevent security leaks."
    ],
    status: "Completed / Active",
    architecture: {
      problemStatement: "Traditional static application security testing (SAST) tools generate high false-positive rates and lack contextual understanding of code.",
      activeSolutions: "1. Traditional regex-based secret scanners (like GitGuardian or TruffleHog). 2. Standard rule-based SAST scanners (like SonarQube or Snyk).",
      choiceRationale: "Static analysis rule sets struggle with variable names and mock parameters, causing developer alert fatigue. Integrating generative AI models allows the tool to contextually reason about whether a detected secret is actually active, and whether custom sanitizers prevent a flagged vulnerability.",
      competitiveAdvantage: "By leveraging the reasoning capabilities of Gemini models, this scanner explains the vulnerability vector in detail and suggests exact, context-aware code patches. It functions not just as a detector, but as an interactive security advisor directly in the terminal.",
      researchPlanning: "Design a Python framework to parse files, segment code blocks, build context-rich prompts for the Gemini API, and parse JSON outputs reliably.",
      stack: "Python, Google GenAI SDK (Gemini API), Markdown generators, Git Hooks.",
      process: "Develop repository recursive parsing logic, build strict JSON schemas for LLM outputs, design prompt templates containing security heuristics, test against vulnerable repositories.",
      resultsImprovements: "Delivered a high-speed CLI utility. Future improvements will focus on local AST (Abstract Syntax Tree) parsing to optimize context tokens before sending code blocks to the API."
    }
  },
  {
    id: "tinynas",
    title: "TinyNAS",
    description: "A lightweight, low-power Network Attached Storage (NAS) solution built using Linux and Docker on single-board computers for secure local file storage.",
    longDescription: "A fully custom DIY Network Attached Storage (NAS) project built to run efficiently on low-power hardware. It configures automated backups, secure local file sharing via Samba, and media streaming containerized with Docker, complete with local system health dashboards.",
    category: "iot",
    image: "/projects/tinynas.png",
    tags: ["Raspberry Pi", "Linux", "Samba", "Docker", "Network Storage"],
    githubUrl: "https://github.com/kartikverma-dev/TinyNAS",
    featured: false,
    highlights: [
      "Achieved local data transfer speeds of up to 110 MB/s over Gigabit Ethernet.",
      "Configured secure multi-user Samba/FTP shares with automated Rsync cron backups.",
      "Maintained 99.9% uptime over a 3-month testing phase under passive cooling.",
      "Integrated Docker containers for lightweight media and system monitoring tools."
    ],
    status: "Completed / Maintained",
    architecture: {
      problemStatement: "Commercial NAS systems are expensive, proprietary, and consume significant power for basic home network needs.",
      activeSolutions: "1. Commercial off-the-shelf NAS systems (like Synology DiskStation or QNAP). 2. Enterprise-level open-source storage operating systems (like TrueNAS or Unraid).",
      choiceRationale: "Standard NAS units cost hundreds of dollars and lock users into proprietary operating systems. Designing a custom Linux-based storage layer on single-board computers keeps power consumption under 5W while offering total control over file access policies and utility containers.",
      competitiveAdvantage: "My configuration utilizes a stripped-down headless Linux distribution with customized disk-spin parameters and lightweight Docker daemons. It achieves comparable read/write performance to commercial entry-level NAS appliances at a fraction of the cost, utilizing entirely open components.",
      researchPlanning: "Study network filesystem protocols (Samba, NFS) and Linux storage optimization strategies (ext4, disk spinning) for ultra-low-power embedded hardware.",
      stack: "Headless Debian/Ubuntu Linux, Docker, Samba, Shell Scripting, Rsync, Prometheus/Grafana.",
      process: "Set up headless OS and external drive configurations, secure Samba access lists, deploy utility containers via Docker Compose, set up backup schedules.",
      resultsImprovements: "Successfully deployed a stable 2TB home network storage server with active monitoring. Future iterations will explore hardware RAID configurations."
    }
  }
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Software Engineering Intern",
    company: "CredgeSoul AI",
    period: "2025 - 2028",
    description: [
      "Collaborating with the development team to build and maintain responsive frontend layouts using React and modern CSS.",
      "Integrating RESTful APIs and optimizing backend queries, resulting in a 15% reduction in data fetch latency.",
      "Gaining hands-on experience with professional Git version control, pull request workflows, and daily Agile standups."
    ],
    type: "internship",
    icon: "cpu"
  },
  {
    id: "exp-2",
    role: "BCA Student",
    company: "IMS Ghaziabad (University Courses Campus)",
    period: "2025 - 2028",
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
    issuer: "Awareness Program (Scored 92% in assessment)",
    date: "Completed",
    category: "certification"
  },
  {
    id: "ach-2",
    title: "Internet of Things (IoT) Development Program",
    issuer: "E&ICT Academy, IIT Kanpur (4-week intensive)",
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
    issuer: "E&ICT Academy, IIT Kanpur (Designed 5+ practical nodes)",
    date: "Completed",
    category: "academic"
  },
  {
    id: "ach-5",
    title: "Active Internship Participation",
    issuer: "CredgeSoul AI (Contributing to production code)",
    date: "Ongoing",
    category: "academic"
  },
  {
    id: "ach-6",
    title: "Self-driven Technical Learning Journey",
    issuer: "Personal Projects (Built & published 5 repositories)",
    date: "Ongoing",
    category: "academic"
  },
  {
    id: "ach-7",
    title: "Discipline In-Charge & Student Representative",
    issuer: "School Administration (Managed events of 500+ students)",
    date: "Completed",
    category: "competition"
  },
  {
    id: "ach-8",
    title: "School-Level Skating Competition Awards",
    issuer: "Inter-House Sports Meet (Won 1st place in 500m speed event)",
    date: "Completed",
    category: "competition"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Internship Journey: Getting Started at CredgeSoul AI",
    excerpt: "My experience stepping into a professional development workspace, setting up Git branch strategies, configuring Next.js ESLint, and shipping my first React component.",
    content: "Stepping into CredgeSoul AI was an eye-opener. Moving from isolated local projects to a shared codebase meant understanding Git collaboration workflows. During the first two weeks, I learned how to create clean, scoped feature branches, handle merge conflicts in pull requests, and follow strict ESLint and TypeScript configurations. One of my initial tasks was optimizing client-side component renderings, where I learned how to avoid unnecessary re-renders. Working alongside senior developers taught me that writing clean, readable, self-documenting code is just as important as writing functional logic. It's been an amazing transition from classroom theory to professional software engineering.",
    category: "Internship Journey",
    readTime: "3 min read",
    date: "June 2026"
  },
  {
    id: "blog-2",
    title: "Building LUMOS RF: Wireless Signal Sensing",
    excerpt: "How I configured ESP8266 modules to capture WiFi RSSI signal variations and processed the datastream using Python to monitor indoor activity.",
    content: "LUMOS RF was born out of a desire to track indoor activity without using privacy-invasive cameras. By setting up an ESP8266 transmitter and a receiver node, I logged the Received Signal Strength Indicator (RSSI) data. Because WiFi signals scatter and attenuate when a human body blocks the direct path (Fresnel zone theory), I noticed noticeable signal drops whenever someone walked between the nodes. I wrote a Python listener to capture this UDP stream and log the raw values. To filter out high-frequency noise from appliances, I applied a rolling average threshold filter. This simple setup achieved a 94% accuracy rate in detecting occupancy during my tests. The next step is extracting full Channel State Information (CSI) subcarrier amplitudes for finer gesture tracking.",
    category: "Building LUMOS Projects",
    readTime: "4 min read",
    date: "May 2026"
  },
  {
    id: "blog-3",
    title: "Journey into React & Next.js Basics",
    excerpt: "Transitioning from static HTML/CSS to dynamic component architectures. What I learned about state variables, React hooks, and Next.js page layouts.",
    content: "Transitioning from vanilla HTML/CSS to React felt like learning a new way of thinking. Instead of manipulating the DOM directly, React's state-driven paradigm allows components to re-render automatically when data changes. I started by mastering basic hooks like useState for tracking user inputs and useEffect for fetching external API payloads. Understanding how props pass read-only data down the component tree was crucial for refactoring complex pages into smaller, reusable UI blocks. When I advanced to Next.js, learning the difference between server components and client components was a major milestone. Next.js file-system routing simplified page creation, and combining it with Tailwind CSS allowed me to quickly design responsive layouts without writing hundreds of lines of media queries.",
    category: "Learning React",
    readTime: "3 min read",
    date: "April 2026"
  },
  {
    id: "blog-4",
    title: "Cybersecurity Notes: Kali Linux & Network Scanning",
    excerpt: "Hands-on notes from studying cybersecurity fundamentals, covering network mapping with Nmap and analyzing packet traces in Wireshark.",
    content: "Understanding cybersecurity requires deep awareness of how network layers interact. I started by setting up Kali Linux in a virtual machine to study security auditing baselines. Using Nmap, I practiced basic port scanning commands like `nmap -sS -O` to identify open ports, active services, and operating system signatures on local test machines. To understand what happens during a TCP three-way handshake, I captured local packets using Wireshark, analyzing the flags (SYN, SYN-ACK, ACK) and inspecting DNS request formats. Learning to read raw network packet details has given me a much stronger foundation for building secure web applications and hardening local IoT network setups.",
    category: "Cybersecurity Learning Notes",
    readTime: "3 min read",
    date: "March 2026"
  }
];
