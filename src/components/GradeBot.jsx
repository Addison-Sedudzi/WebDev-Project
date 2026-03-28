import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = 'llama-3.1-8b-instant';

const SYSTEM_PROMPT = `You are Gradey, a friendly and knowledgeable academic advisor built into GradeSync — a GPA tool for KNUST (Kwame Nkrumah University of Science and Technology) students in Ghana.

Your expertise covers:
- KNUST's CWA (Cumulative Weighted Average) grading system: 70+ = First Class, 60–69 = Second Class Upper (2:1), 50–59 = Second Class Lower (2:2), 45–49 = Pass, below 45 = Fail
- Converting CWA to GPA on a 4.0 scale (e.g. 70 CWA ≈ 4.0, 65 ≈ 3.5, 60 ≈ 3.0, 55 ≈ 2.5)
- International grading systems (US 4.0, UK Honours, Germany 1–5, Canada, Australia)
- Graduate school admissions, GPA requirements, holistic review, SOPs, LORs
- Scholarships: Chevening, Fulbright, MasterCard Foundation, DAAD, and others
- Study tips, academic planning, and improving grades

Rules:
- Keep answers concise and conversational — 2 to 4 sentences max unless a detailed breakdown is asked
- Be warm, encouraging, and student-friendly
- If asked about something unrelated to academics, politely redirect to your area of expertise
- Never make up specific scholarship deadlines or university admission statistics — advise students to verify on official websites`;

const SUGGESTIONS = [
    'What is a GPA?',
    'How do I convert my CWA?',
    'What GPA do I need for scholarships?',
    'What is a holistic review?',
    'What is Second Class Upper?',
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const getInitials = (fullName) => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const GradeBot = () => {
    const { currentUser } = useAuth();
    const { isDark } = useTheme();
    const initials = getInitials(currentUser?.fullName);
    const s = getStyles(isDark);

    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: "Hi! I'm Gradey 🤖 Ask me anything about GPA, CWA, scholarships, or grad school applications.",
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesRef = useRef(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const send = async (text) => {
        const q = text.trim();
        if (!q || isTyping) return;

        const userMsg = { from: 'user', text: q };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Build conversation history for OpenAI (exclude the greeting)
            const history = [...messages.slice(1), userMsg]
                .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

            const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
                    max_tokens: 300,
                    temperature: 0.7,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error?.message || `API error ${res.status}`);
            }

            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content?.trim() || "I didn't get a response. Please try again.";
            setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { from: 'bot', text: `⚠️ ${err.message}. Please check your API key in .env and restart the dev server.` },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send(input);
        }
    };

    return (
        <div style={s.wrapper}>
            {/* Header */}
            <div style={s.header}>
                <div style={s.botAvatar}>
                    <Bot size={16} color="white" />
                </div>
                <div>
                    <div style={s.botName}>Gradey</div>
                    <div style={s.botStatus}>
                        <span style={s.dot} /> Powered by Groq
                    </div>
                </div>
                <Sparkles size={16} color="var(--color-highlight)" style={{ marginLeft: 'auto' }} />
            </div>

            {/* Messages */}
            <div style={s.messages} ref={messagesRef}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                        {msg.from === 'bot' && (
                            <div style={s.botIconSmall}>
                                <Bot size={12} color="white" />
                            </div>
                        )}
                        <div style={msg.from === 'bot' ? s.botBubble : s.userBubble}>
                            {msg.text}
                        </div>
                        {msg.from === 'user' && (
                            <div style={s.userIconSmall}>
                                <span style={s.userInitials}>{initials}</span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '10px' }}>
                        <div style={s.botIconSmall}>
                            <Bot size={12} color="white" />
                        </div>
                        <div style={s.typingBubble}>
                            <span style={s.typingDot} />
                            <span style={{ ...s.typingDot, animationDelay: '0.2s' }} />
                            <span style={{ ...s.typingDot, animationDelay: '0.4s' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Suggestions — shown until the user sends their first message */}
            {messages.length <= 1 && (
                <div style={s.suggestions}>
                    {SUGGESTIONS.map((q) => (
                        <button key={q} onClick={() => send(q)} style={s.chip} disabled={isTyping}>
                            {q}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div style={s.inputRow}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about GPA, scholarships..."
                    style={s.input}
                    disabled={isTyping}
                />
                <button onClick={() => send(input)} style={{ ...s.sendBtn, opacity: (!input.trim() || isTyping) ? 0.5 : 1 }} disabled={!input.trim() || isTyping}>
                    <Send size={16} />
                </button>
            </div>

            <style>{`
                @keyframes gradebotBounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                    40% { transform: translateY(-5px); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

const getStyles = (isDark) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: isDark ? '1px solid rgba(129,199,132,0.15)' : '1px solid #E5E7EB',
        overflow: 'hidden',
        backgroundColor: 'var(--color-white)',
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.06)',
        height: '480px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 16px',
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
        color: 'white',
        flexShrink: 0,
    },
    botAvatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    botName: {
        fontWeight: 700,
        fontSize: '14px',
    },
    botStatus: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        opacity: 0.85,
    },
    dot: {
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: '#A5D6A7',
    },
    messages: {
        flex: 1,
        overflowY: 'auto',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDark ? '#061a0d' : 'transparent',
    },
    botIconSmall: {
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1B5E20, #43A047)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        alignSelf: 'flex-end',
        marginRight: '6px',
    },
    userIconSmall: {
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        alignSelf: 'flex-end',
        marginLeft: '6px',
    },
    userInitials: {
        fontSize: '9px',
        fontWeight: 700,
        color: 'white',
        letterSpacing: '0.3px',
        lineHeight: 1,
        fontFamily: "'Poppins', sans-serif",
    },
    botBubble: {
        maxWidth: '80%',
        padding: '10px 14px',
        borderRadius: '16px 16px 16px 4px',
        backgroundColor: isDark ? '#0d2416' : '#F0FDF4',
        border: isDark ? '1px solid rgba(110,231,183,0.15)' : '1px solid #BBF7D0',
        fontSize: '13px',
        lineHeight: 1.55,
        color: 'var(--color-text)',
    },
    userBubble: {
        maxWidth: '80%',
        padding: '10px 14px',
        borderRadius: '16px 16px 4px 16px',
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
        color: 'white',
        fontSize: '13px',
        lineHeight: 1.55,
    },
    suggestions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        padding: '6px 14px 10px',
        flexShrink: 0,
        backgroundColor: isDark ? '#061a0d' : 'transparent',
        borderTop: isDark ? '1px solid rgba(110,231,183,0.08)' : 'none',
    },
    chip: {
        padding: '5px 12px',
        borderRadius: '20px',
        border: isDark ? '1px solid rgba(110,231,183,0.2)' : '1px solid #A7F3D0',
        backgroundColor: isDark ? '#0d2416' : '#F0FDF4',
        color: isDark ? '#6EE7B7' : '#1B5E20',
        fontSize: '11px',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        transition: 'background-color 0.2s ease',
        whiteSpace: 'nowrap',
    },
    inputRow: {
        display: 'flex',
        gap: '8px',
        padding: '12px 14px',
        borderTop: isDark ? '1px solid rgba(110,231,183,0.08)' : '1px solid #E5E7EB',
        flexShrink: 0,
        backgroundColor: isDark ? '#061a0d' : 'transparent',
    },
    input: {
        flex: 1,
        padding: '10px 14px',
        borderRadius: '10px',
        border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #E5E7EB',
        fontSize: '13px',
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: isDark ? '#0d2416' : 'var(--color-background)',
        color: 'var(--color-text)',
        outline: 'none',
        margin: 0,
    },
    sendBtn: {
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        border: 'none',
        background: 'linear-gradient(135deg, #1B5E20, #43A047)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'opacity 0.2s ease',
    },
    typingBubble: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '10px 14px',
        borderRadius: '16px 16px 16px 4px',
        backgroundColor: isDark ? '#0d2416' : '#F0FDF4',
        border: isDark ? '1px solid rgba(110,231,183,0.15)' : '1px solid #BBF7D0',
    },
    typingDot: {
        display: 'inline-block',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        backgroundColor: '#2E7D32',
        animation: 'gradebotBounce 1.2s ease-in-out infinite',
    },
});

export default GradeBot;
