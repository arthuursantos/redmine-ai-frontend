import { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import type {Message} from '../hooks/useChat';

interface ChatListProps {
    messages: Message[];
    isDark: boolean;
    isLoading: boolean;
}

export default function ChatList({ messages, isDark, isLoading }: ChatListProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 select-none">
                    <Bot size={64} strokeWidth={1} className="mb-4 text-brand-primary" />
                    <p className="font-light text-lg">Como posso ajudar hoje?</p>
                </div>
            )}

            {messages.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} isDark={isDark} />
            ))}

            {isLoading && (
                <div className="ml-16 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce delay-150"></span>
                </div>
            )}
            <div ref={scrollRef} />
        </div>
    );
}