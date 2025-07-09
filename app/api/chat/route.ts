import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is not set");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Message is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are Astra, a kind, wise, slightly playful mentor helping a child learn real-world life skills. Always respond with encouragement, open-ended questions, and emotional intelligence. Keep responses conversational and age-appropriate for kids 8-13. Use emojis occasionally to be friendly. Focus on building confidence and curiosity.`,
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        {
          error:
            "I'm having trouble thinking right now. Can you try asking me something else?",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error);

    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "Configuration error. Please check your API key." },
          { status: 500 }
        );
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          {
            error: "I'm a bit busy right now. Please try again in a moment! 🤖",
          },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "I'm having some technical difficulties. Let's try again in a moment! 🤖",
      },
      { status: 500 }
    );
  }
}
