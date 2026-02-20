/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bot, User } from 'lucide-react';
import clsx from 'clsx';
import type { Message } from '../hooks/useChat';
import ReactMarkdown, { type Components } from 'react-markdown';

interface ChatMessageProps {
    msg: Message;
    isDark: boolean;
}

export default function ChatMessage({ msg, isDark }: ChatMessageProps) {
    const isAi = msg.role === 'ai';

    const markdownComponents: Components = {
        h2: ({ node, ...props }) => (
            <h2 className={clsx("text-base font-bold mt-4 mb-2 border-b pb-1",
                isAi ? (isDark ? "border-gray-700 text-blue-400" : "border-gray-200 text-blue-700") : "text-white border-white/20"
            )} {...props} />
        ),
        h3: ({ node, ...props }) => (
            <h3 className="text-sm font-bold mt-3 mb-1 opacity-90" {...props} />
        ),
        strong: ({ node, ...props }) => (
            <span className="font-bold opacity-100" {...props} />
        ),
        ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />
        ),
        li: ({ node, ...props }) => (
            <li className="marker:opacity-70" {...props} />
        ),
        p: ({ node, ...props }) => (
            <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
        )
    };

    return (
        <div className={clsx("flex gap-4 fade-in", isAi ? "flex-row" : "flex-row-reverse")}>
            <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                isAi
                    ? (isDark ? "bg-brand-primary/20 border-brand-primary text-brand-primary" : "bg-blue-100 border-blue-200 text-blue-600")
                    : (isDark ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-gray-100 border-gray-200 text-gray-500")
            )}>
                {isAi ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={clsx("p-4 rounded-2xl max-w-[85%] shadow-sm text-sm border",
                isAi
                    ? (isDark ? "bg-dark-panel border-gray-700 text-gray-100" : "bg-white border-gray-100 text-gray-800")
                    : (isDark ? "bg-brand-primary/20 border-brand-primary/30 text-white" : "bg-blue-600 border-blue-600 text-white")
            )}>

                <ReactMarkdown components={markdownComponents}>
                    {msg.content}
                </ReactMarkdown>

            </div>
        </div>
    );
}