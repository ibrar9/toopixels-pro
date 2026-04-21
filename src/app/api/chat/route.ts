import { NextResponse } from 'next/server';
import { getConfig, getData } from '@/lib/store';

// This is the Personality and Knowledge Base of the AI
async function getSystemPrompt() {
  const config = await getConfig();
  const data = await getData();
  
  const projectList = data.projects?.map((p: any) => p.title).join(", ");
  const services = Object.keys(config.portfolioCategories || {}).join(", ");

  return `
    You are a professional Creative Assistant at Toopixels, a premium design and marketing agency in UAE.
    
    KNOWLEDGE BASE:
    - Agency Name: Toopixels
    - Core Services: ${services}
    - Location: Dubai / UAE
    - Hero Message: ${config.home.heroTitle}
    - Mission: ${config.about.mission}
    - Recent Projects: ${projectList}
    
    PRICING GUIDELINES (Use these to guide users):
    - Logo Design: Starts at 99 AED
    - Company Profile: Starts at 20 AED per page
    - SMM Design: Starts at 30 AED per post
    - Website Development: Ranges from 1,500 AED (Landing Pages) to 25,000 AED+ (Complex Apps)
    
    YOUR RULES:
    1. Be polite, concise, and helpful.
    2. Sound like a real person working at the agency.
    3. If a user asks for prices, ALWAYS suggest using the "Cost Calculator" on our website.
    4. If a user wants to start a project, ask for their contact details or suggest the "Contact Us" page.
    5. NEVER mention that you are an AI model. You are "Pixel", the Toopixels Assistant.
  `;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const systemPrompt = await getSystemPrompt();

    // NOTE: This requires an API Key. 
    // For now, if no API key is set, we return a "Smart Simulated Response"
    // that uses the system prompt to filter logic.
    
    if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
       // SIMULATION LOGIC for Local Testing without API Key
       const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
       let response = "I'm sorry, I didn't quite catch that. Could you tell me more about your project?";
       
       if (lastUserMessage.includes("hi") || lastUserMessage.includes("hello")) {
         response = "Hello! I'm Pixel from Toopixels. How can I help you elevate your brand today?";
       } else if (lastUserMessage.includes("price") || lastUserMessage.includes("cost") || lastUserMessage.includes("how much")) {
         response = "Our prices are very competitive! For example, Logo Design starts at just 99 AED. The best way to get a total estimate is to use our 'Cost Calculator' which you can find in the menu.";
       } else if (lastUserMessage.includes("logo")) {
         response = "We specialize in premium Logo & Branding! Our packages start from 99 AED and include multiple revisions. Would you like to check our calculator for a custom quote?";
       } else if (lastUserMessage.includes("website") || lastUserMessage.includes("web")) {
         response = "Our web team builds everything from Landing Pages (1,500 AED) to E-commerce stores. We focus on speed and SEO.";
       }

       return NextResponse.json({ role: "assistant", content: response });
    }

    // REAL AI INTEGRATION (If API key exists)
    // You can swap this with OpenAI or Gemini SDK calls here.
    return NextResponse.json({ role: "assistant", content: "AI API Integration pending. Please provide an API key." });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
