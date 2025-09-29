import React, { useState } from "react";

function AIModal() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/startChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: updatedMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI response");

      const data = await res.json();
      // Assuming `data.response` contains AI reply text
      const aiReply = { role: "ai", content: data.response || "No response" };
      setMessages([...updatedMessages, aiReply]);
    } catch (err) {
      console.error("AI chat error:", err);
      setMessages([
        ...updatedMessages,
        { role: "ai", content: "Error: Could not get AI response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-modal p-4 border rounded-md">
      <div className="chat-box h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
            <p className="inline-block p-1 rounded-md bg-gray-200">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="input-box flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-md"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default AIModal;
