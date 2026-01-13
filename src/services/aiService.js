const API_BASE_URL = import.meta.env.VITE_API_URL || "https://portfolio-backend-hammad.onrender.com/api";
const WS_BASE_URL = API_BASE_URL.replace("http", "ws").replace("/api", "/ws/chat");

export const processRAG = async (query, onChunk = null) => {
    try {
        const isStreaming = !!onChunk;
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: query, stream: isStreaming })
        });

        if (!response.ok) throw new Error("Backend connection failed");

        if (isStreaming) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullText += chunk;
                if (onChunk) onChunk(chunk);
            }
            return { answer: fullText, sources: [] };
        } else {
            const data = await response.json();
            return {
                answer: data.response || data.answer || "No response received",
                sources: data.sources || []
            };
        }
    } catch (error) {
        console.error("RAG API Error:", error);
        return {
            answer: "I'm having trouble connecting to my brain! Please make sure the backend is running.",
            sources: []
        };
    }
};

export const getChatWS = () => {
    return new WebSocket(WS_BASE_URL);
};

export const checkHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return await response.json();
    } catch {
        return { status: "offline" };
    }
};
