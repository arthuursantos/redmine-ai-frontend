import { Send } from 'lucide-react';
import clsx from 'clsx';

interface ChatInputProps {
    inputValue: string;
    setInputValue: (val: string) => void;
    handleSend: () => void;
    isChartMode: boolean;
    setIsChartMode: (val: boolean) => void;
    isDark: boolean;
    isLoading: boolean;
}

export default function ChatInput({
                                      inputValue, setInputValue, handleSend, isDark, isLoading
                                  }: ChatInputProps) {

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={clsx("p-8 pt-4", isDark ? "bg-dark-panel" : "bg-white")}>
            <div className={clsx("flex flex-col border rounded-[28px] transition-all focus-within:ring-2 focus-within:ring-brand-primary/30 shadow-sm",
                isDark ? "bg-darker-panel border-2 border-black" : "border-border-light bg-white"
            )}>
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={"Digite sua mensagem..."}
                    className={clsx("w-full p-5 resize-none outline-none bg-transparent text-[15px]",
                        isDark ? "text-gray-200 placeholder:text-gray-400" : "text-text-main placeholder:text-gray-400"
                    )}
                    rows={1}
                    style={{ minHeight: '60px', maxHeight: '140px' }}
                />

                <div className="flex justify-between items-center px-4 pb-4">
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isLoading}
                        className={clsx("p-3 rounded-full transition-all duration-200 flex items-center justify-center",
                            inputValue.trim()
                                ? "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md shadow-brand-primary/20"
                                : "bg-transparent text-gray-400"
                        )}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}