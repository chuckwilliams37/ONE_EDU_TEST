export async function chatWithAstra(message: string): Promise<string> {
  try {
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return "Please provide a message to chat with Astra!";
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.trim() }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data.error || `HTTP ${response.status}`);
      return (
        data.error ||
        "I'm having some technical difficulties. Let's try again in a moment! 🤖"
      );
    }

    if (!data.reply || typeof data.reply !== "string") {
      console.error("Invalid response format:", data);
      return "I'm having trouble thinking right now. Can you try asking me something else?";
    }

    return data.reply;
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return "I'm having trouble connecting right now. Please check your internet connection and try again! 🌐";
    }

    return "I'm having some technical difficulties. Let's try again in a moment! 🤖";
  }
}
