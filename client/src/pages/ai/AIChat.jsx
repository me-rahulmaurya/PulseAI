import { useEffect, useRef, useState } from "react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { sendMessage } from "../../services/ai.service";

const suggestions = [
    "How much water should I drink today?",
    "Suggest a healthy breakfast.",
    "How can I improve my sleep?",
    "Give me a workout tip.",
];

export default function AIChat() {

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState(() => {

        const saved = localStorage.getItem("pulseai-chat");

        return saved
            ? JSON.parse(saved)
            : [
                {
                    role: "assistant",
                    text: "Hi! I'm PulseAI 👋\nI'm your personal AI health assistant. Ask me anything about your health, nutrition, fitness or wellness."
                }
            ];

    });

    const bottomRef = useRef(null);

    useEffect(() => {

        localStorage.setItem(
            "pulseai-chat",
            JSON.stringify(messages)
        );

    }, [messages]);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    const handleSend = async () => {

        if (!message.trim() || loading) return;

        const text = message;

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text,
            },
        ]);

        setMessage("");

        try {

            setLoading(true);

            const data = await sendMessage(text);

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: data.reply,
                },
            ]);

        }

        catch (err) {

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text:
                        err.response?.data?.message ||
                        "Something went wrong.",
                },
            ]);

        }

        finally {

            setLoading(false);

        }

    };

    const clearChat = () => {

        localStorage.removeItem("pulseai-chat");

        setMessages([
            {
                role: "assistant",
                text: "Hi! I'm PulseAI 👋\nI'm your personal AI health assistant. Ask me anything about your health, nutrition, fitness or wellness."
            }
        ]);

    };

    return (

        <div className="mx-auto flex h-[85vh] max-w-6xl flex-col">

            <Card className="flex h-full flex-col">

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">

                            PulseAI Assistant 🤖

                        </h1>

                        <p className="mt-1 text-slate-500">

                            Your personal AI healthcare companion

                        </p>

                    </div>

                    <Button
                        variant="secondary"
                        onClick={clearChat}
                    >
                        Clear Chat
                    </Button>

                </div>

                {
                    messages.length === 1 && (

                        <div className="mb-6">

                            <p className="mb-4 text-slate-500">

                                Try asking:

                            </p>

                            <div className="flex flex-wrap gap-3">

                                {
                                    suggestions.map((item) => (

                                        <button
                                            key={item}
                                            onClick={() => setMessage(item)}
                                            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm transition hover:bg-slate-100"
                                        >
                                            {item}
                                        </button>

                                    ))
                                }

                            </div>

                        </div>

                    )
                }

                <div className="flex-1 space-y-4 overflow-y-auto rounded-xl bg-slate-50 p-4">

                    {
                        messages.map((item, index) => (

                            <div
                                key={index}
                                className={`flex ${item.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}
                            >

                                <div
                                    className={`max-w-[75%] rounded-2xl px-5 py-3 whitespace-pre-wrap ${item.role === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-white shadow-sm"
                                        }`}
                                >

                                    {item.text}

                                </div>

                            </div>

                        ))
                    }

                    {
                        loading && (

                            <div className="flex">

                                <div className="animate-pulse rounded-2xl bg-white px-5 py-3 shadow">

                                    PulseAI is thinking...

                                </div>

                            </div>

                        )
                    }

                    <div ref={bottomRef} />

                </div>

                <div className="mt-6 flex gap-4">

                    <Input

                        value={message}

                        placeholder="Ask PulseAI anything..."

                        onChange={(e) =>
                            setMessage(e.target.value)
                        }

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                handleSend();

                            }

                        }}

                    />

                    <Button

                        onClick={handleSend}

                        disabled={loading || !message.trim()}

                    >

                        Send

                    </Button>

                </div>

            </Card>

        </div>

    );

}