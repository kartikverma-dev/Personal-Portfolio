import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { personalInfo, skills, projects, experiences, achievements, blogPosts } from "@/data/portfolioData";
import aiKnowledge from "@/data/aiKnowledge.json";

// Compile all profile data into a structured knowledge base corpus
const getKnowledgeCorpus = (): string[] => {
  const corpus: string[] = [];

  // 1. Personal Info
  corpus.push(`Kartik Verma General Profile: A Bachelor of Computer Applications (BCA) student at IMS Ghaziabad (University Courses Campus), batch 2025 - 2028. Pursuing an active internship at CredgeSoul AI.`);
  corpus.push(`Kartik Verma Bio & Objective: ${personalInfo.bio}`);
  corpus.push(`Kartik Verma Mission: ${personalInfo.mission}`);
  corpus.push(`Kartik Verma Location: Based in ${personalInfo.location}.`);

  // 2. Skills
  const expSkills = skills.filter(s => s.category === "experienced").map(s => s.name).join(", ");
  const knowSkills = skills.filter(s => s.category === "knowledge").map(s => s.name).join(", ");
  const learnSkills = skills.filter(s => s.category === "learning").map(s => s.name).join(", ");
  const intSkills = skills.filter(s => s.category === "interested").map(s => s.name).join(", ");
  
  corpus.push(`Kartik Verma Experienced Skills: Experienced with programming languages and tools including ${expSkills}.`);
  corpus.push(`Kartik Verma Knowledge Areas: Fundamentals and concepts in ${knowSkills}.`);
  corpus.push(`Kartik Verma Currently Learning: Studying and acquiring skills in ${learnSkills}.`);
  corpus.push(`Kartik Verma Future Interests: Fascinated by and planning to explore ${intSkills}.`);

  // 3. Projects
  projects.forEach(p => {
    corpus.push(`Project "${p.title}" details:
- Description: ${p.description}
- Full Scope: ${p.longDescription || ""}
- Status: ${p.status}
- Category: ${p.category}
- Tech Stack: ${p.tags.join(", ")}
- Highlights: ${p.highlights?.join("; ") || ""}
- Architecture:
  * Problem Statement: ${p.architecture?.problemStatement || ""}
  * Research & Planning: ${p.architecture?.researchPlanning || ""}
  * Setup/Stack: ${p.architecture?.stack || ""}
  * Process: ${p.architecture?.process || ""}
  * Results & Upgrades: ${p.architecture?.resultsImprovements || ""}
- GitHub Repository: ${p.githubUrl}`);
  });

  // 4. Experiences
  experiences.forEach(exp => {
    corpus.push(`Experience / Career History - Role: ${exp.role} at ${exp.company} (${exp.period}):
- Description details: ${exp.description.join(". ")}
- Type of event: ${exp.type}`);
  });

  // 5. Certifications & Achievements
  achievements.forEach(ach => {
    corpus.push(`Certification / Achievement: "${ach.title}" issued by "${ach.issuer}" (${ach.date}). Category: ${ach.category}. Verified Credential status.`);
  });

  // 6. Blog & Writings
  blogPosts.forEach(post => {
    corpus.push(`Blog Post / Technical Note: "${post.title}" under category "${post.category}" (${post.date}). Excerpt: ${post.excerpt}. Read time: ${post.readTime}.`);
  });

  // 7. General QA from JSON
  aiKnowledge.knowledge.forEach(k => {
    corpus.push(`Question: ${k.question} -> Answer: ${k.answer}`);
  });

  return corpus;
};

// Simple TF-IDF/Keyword frequency context retriever
const retrieveContext = (query: string, corpus: string[]): string => {
  const queryWords = query
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2); // filter out short words

  if (queryWords.length === 0) {
    // Fallback to top-level profile information
    return corpus.slice(0, 4).join("\n\n");
  }

  const scored = corpus.map(doc => {
    let score = 0;
    const lowerDoc = doc.toLowerCase();
    
    queryWords.forEach(word => {
      if (lowerDoc.includes(word)) {
        score += 1;
        // Boost score for exact word boundaries
        const regex = new RegExp(`\\b${word}\\b`, "g");
        const matches = lowerDoc.match(regex);
        if (matches) {
          score += matches.length * 1.5;
        }
      }
    });

    return { doc, score };
  });

  // Sort by relevance score, filter out non-matching documents, and take top 5 entries
  const matches = scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.doc)
    .slice(0, 5);

  if (matches.length === 0) {
    return corpus.slice(0, 3).join("\n\n");
  }

  return matches.join("\n\n");
};

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    const corpus = getKnowledgeCorpus();
    const context = retrieveContext(message, corpus);

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Initialize Gemini Client
      const genAI = new GoogleGenerativeAI(apiKey);
      // Using gemini-1.5-flash as the standard, fast, free-tier model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are Kartik AI, a helpful, professional, and friendly virtual assistant representing Kartik Verma.
You are tasked with answering queries from website visitors (recruiters, developers, and peers) using only the provided facts about Kartik Verma.

Rules:
1. Provide accurate, concise, and direct answers in a human-like conversation style.
2. Ground your answers strictly in the context below. Do not make up or assume details not in the context.
3. If the context does not contain enough information to answer the question, state politely that Kartik is currently learning and expanding his knowledge in that area, and direct them to Kartik's contact details (Email: KartikVerma0804@gmail.com, LinkedIn: https://www.linkedin.com/in/kartik-verma-5459a5378).
4. Never exaggerate Kartik's roles or responsibilities. Keep it honest and authentic.

Context Facts:
${context}

User Query: ${message}
Answer:`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      return NextResponse.json({ text });
    } else {
      // Fallback: If no API key is specified, build a smart keyword-matched simulated response
      // Find matching QA from local knowledge base or display the top context match directly
      const cleanMsg = message.toLowerCase().replace(/[^\w\s]/g, "");
      const matchedQA = aiKnowledge.knowledge.find(k => 
        k.keywords.some(kw => cleanMsg.includes(kw))
      );

      if (matchedQA) {
        return NextResponse.json({ text: matchedQA.answer });
      }

      // If no QA matched directly, present the top context facts beautifully
      const summaryText = `I found the following details in Kartik's profile that might answer your query:

${context.split("\n\n")[0]}

For more specific inquiries, feel free to connect with Kartik directly via Email at KartikVerma0804@gmail.com.`;

      return NextResponse.json({ text: summaryText });
    }
  } catch (err: any) {
    console.error("RAG api route error:", err);
    return NextResponse.json({ error: "Failed to generate AI response: " + err.message }, { status: 500 });
  }
}
