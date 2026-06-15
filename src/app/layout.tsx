import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kartik Verma | Future Software Engineer & Tech Creator",
  description: "BCA student, technology enthusiast, full-stack web developer, AI experimenter, and ESP32/ESP8266 IoT builder. Explore my skills, projects, and connect with Kartik AI.",
  keywords: ["Kartik Verma", "Web Developer Portfolio", "ESP32", "ESP8266", "BCA Student", "AI Chatbot Portfolio", "IoT Developer", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Kartik Verma" }],
  creator: "Kartik Verma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kartikverma.dev", // Replaceable default
    title: "Kartik Verma | Future Software Engineer & Tech Creator",
    description: "BCA Student, Full-Stack Web Developer, and AI/IoT builder. Interact with Kartik AI to discover his skill catalog and highlighted projects.",
    siteName: "Kartik Verma Portfolio",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Kartik Verma AI Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartik Verma | Future Software Engineer & Tech Creator",
    description: "BCA Student, Full-Stack Web Developer, and AI/IoT builder. Interact with Kartik AI to discover his skill catalog.",
    images: ["/og-image.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-gray-200 bg-[#030014] selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Glow ambient background rings */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary glow-orb" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent glow-orb" />
          <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] bg-purple-900/20 glow-orb" />
          <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-cyan-900/10 glow-orb" />
          {/* Subtle noise grid pattern overlay */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        </div>
        
        {/* Site content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}
