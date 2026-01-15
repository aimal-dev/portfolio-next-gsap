"use client";

import { useRef, useState } from 'react';
import styles from './ChatBot.module.scss';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
        { role: 'bot', text: 'Hi! I am Alex\'s AI Assistant. How can I help you today?' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const containerRef = useRef(null);
    const chatWindowRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(chatWindowRef.current, 
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
            );
        }
    }, [isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // User message
        setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
        const userText = inputValue.toLowerCase();
        setInputValue("");

        // Simple rule-based "AI" response
        setTimeout(() => {
            let botResponse = "I'm not sure about that. Try asking about 'skills', 'projects', or 'contact'.";
            
            if (userText.includes('hello') || userText.includes('hi')) {
                botResponse = "Hello! 👋";
            } else if (userText.includes('skill') || userText.includes('stack')) {
                botResponse = "I work with React, Next.js, GSAP, TypeScript, and Node.js. 🚀";
            } else if (userText.includes('project') || userText.includes('work')) {
                 botResponse = "You can check out my projects in the _projects tab! I have built dashboards, e-commerce sites, and more.";
            } else if (userText.includes('contact') || userText.includes('email')) {
                 botResponse = "You can reach me at user@gmail.com or use the contact form.";
            } else if (userText.includes('experience')) {
                botResponse = "I have 5 years of experience in frontend development.";
            }

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        }, 600);
    };

    return (
        <div className={styles.container} ref={containerRef}>
            {isOpen && (
                <div className={styles.chatWindow} ref={chatWindowRef}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <Bot size={18} />
                            <span>AI Assistant</span>
                        </div>
                        <button onClick={toggleChat} className={styles.closeBtn}>
                            <X size={16} />
                        </button>
                    </div>
                    
                    <div className={styles.messages}>
                        {messages.map((m, i) => (
                            <div key={i} className={`${styles.message} ${m.role === 'user' ? styles.user : styles.bot}`}>
                                {m.text}
                            </div>
                        ))}
                    </div>
                    
                    <div className={styles.inputArea}>
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..." 
                            className={styles.input}
                        />
                        <button onClick={handleSend} className={styles.sendBtn}>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
            
            <button className={`${styles.fab} ${isOpen ? styles.hidden : ''}`} onClick={toggleChat}>
                <MessageSquare size={24} />
            </button>
        </div>
    );
}
