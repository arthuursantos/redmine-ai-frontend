import { Sparkles, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

interface HeaderProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
    return (
        <header className={clsx("h-16 flex items-center justify-between px-8 border-b shrink-0 z-20 transition-colors",
            isDark ? "border-brand-primary/20 bg-dark-bg" : "border-border-light bg-white"
        )}>
            <div className="flex items-center gap-3">
                <div className="bg-brand-primary p-2 rounded-xl text-white shadow-lg shadow-brand-primary/20">
                    <Sparkles size={18} />
                </div>
                <span className="font-semibold text-xl tracking-tight">Hermes</span>
            </div>

            <button
                onClick={toggleTheme}
                className={clsx("p-2.5 rounded-full transition-all duration-300 border",
                    isDark
                        ? "bg-dark-panel border-brand-primary/30 text-brand-tertiary hover:bg-brand-primary/20"
                        : "bg-white border-border-light text-text-main hover:bg-gray-50 shadow-sm"
                )}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </header>
    );
}