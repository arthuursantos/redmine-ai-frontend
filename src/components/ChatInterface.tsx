import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useChat } from '../hooks/useChat';
import Header from './Header';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import ChartViewer from './ChartViewer';

export default function ChatInterface() {
    const [isDark, setIsDark] = useState(true);
    const [isChartMode, setIsChartMode] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { messages, chartConfig, isLoading, sendMessage } = useChat();

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [isDark]);

    const handleSend = () => {
        if (!inputValue.trim() || isLoading) return;
        sendMessage(inputValue, isChartMode);
        setInputValue('');
    };

    return (
        <div className={clsx("flex flex-col size-full h-screen w-screen overflow-hidden transition-colors duration-300 font-sans",
            isDark ? "bg-dark-bg text-white" : "bg-light-bg text-text-main"
        )}>
            <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

            <div className="flex flex-1 overflow-hidden">

                <div className={clsx("w-1/2 flex flex-col border-r z-10 transition-colors flex-shrink-0",
                    isDark ? "bg-dark-panel border-brand-primary/10" : "bg-white border-border-light"
                )}>
                    <ChatList
                        messages={messages}
                        isDark={isDark}
                        isLoading={isLoading}
                    />

                    <ChatInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSend={handleSend}
                        isChartMode={isChartMode}
                        setIsChartMode={setIsChartMode}
                        isDark={isDark}
                        isLoading={isLoading}
                    />
                </div>

                <ChartViewer
                    chartConfig={chartConfig}
                    isDark={isDark}
                />
            </div>
        </div>
    );
}