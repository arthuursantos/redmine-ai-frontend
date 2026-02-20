import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useChat } from '../hooks/useChat';
import Header from './Header';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import ChartViewer from './ChartViewer';
import FilterBar from './FilterBar';

export default function ChatInterface() {
    const [isDark, setIsDark] = useState(true);
    const [isChartMode, setIsChartMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [includeTextInExport, setIncludeTextInExport] = useState(false);

    const [selectedProjectId, setSelectedProjectId] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

    const { messages, chartConfig, isLoading, sendMessage } = useChat();

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [isDark]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        const currentInput = inputValue;
        setInputValue('');

        await sendMessage(currentInput, isChartMode, isDark, selectedProjectId, selectedCategoryId);
    };

    const lastAiMessage = messages.filter(m => m.role === 'ai').pop()?.content || '';

    return (
        <div className={clsx("flex flex-col size-full h-screen w-screen overflow-hidden transition-colors duration-300 font-sans",
            isDark ? "bg-dark-bg text-white" : "bg-light-bg text-text-main"
        )}>
            <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

            <div className="flex flex-1 overflow-hidden">
                <div className={clsx("w-1/2 flex flex-col border-r z-10 transition-colors shrink-0 relative",
                    isDark ? "bg-dark-panel border-brand-primary/10" : "bg-white border-border-light"
                )}>
                    <FilterBar
                        isDark={isDark}
                        selectedProjectId={selectedProjectId}
                        setSelectedProjectId={setSelectedProjectId}
                        selectedCategoryId={selectedCategoryId}
                        setSelectedCategoryId={setSelectedCategoryId}
                    />
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
                    lastAiMessage={lastAiMessage}
                    includeText={includeTextInExport}
                    setIncludeText={setIncludeTextInExport}
                />
            </div>
        </div>
    );
}