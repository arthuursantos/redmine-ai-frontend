import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import clsx from 'clsx';
import type { Message } from '../hooks/useChat';

interface ChatMessageProps {
    msg: Message;
    isDark: boolean;
}

export default function ChatMessage({ msg, isDark }: ChatMessageProps) {
    const isUser = msg.role === 'user';

    return (
        <div className={clsx("flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300", isUser ? "flex-row-reverse" : "")}>
            <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors border",
                isUser
                    ? (isDark ? "bg-white border-2 border-black text-black" : "bg-brand-primary border-brand-primary text-white")
                    : (isDark ? "bg-dark-panel border-brand-primary/30 text-brand-primary" : "bg-brand-primary/10 border-brand-primary/20 text-brand-primary")
            )}>
                {isUser ? <User size={18} strokeWidth={2.5} /> : <Bot size={20} />}
            </div>
            <div className={clsx("py-3 px-6 text-[15px] leading-7 shadow-sm rounded-[24px]",
                isUser
                    ? (isDark ? "bg-brand-primary text-white rounded-tr-sm" : "bg-brand-primary text-white rounded-tr-sm")
                    : (isDark ? "bg-dark-panel border border-brand-primary/20 text-gray-200 rounded-tl-sm" : "bg-white border border-border-light text-text-main rounded-tl-sm")
            )}>
                {msg.role === 'ai' && !msg.isChart ? (
                    <div className="prose prose-invert max-w-none text-inherit">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                ) : msg.content}
            </div>
        </div>
    );
}