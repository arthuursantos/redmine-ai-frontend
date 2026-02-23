import ReactECharts from 'echarts-for-react';
import { BarChart2, FileImage, FileText, Type, Eraser } from 'lucide-react';
import { getChartTheme } from '../utils/chartTheme';
import { downloadChartImage, downloadChartPDF } from '../utils/exportUtils';
import { useRef, useMemo } from 'react';
import clsx from 'clsx';
import type { EChartsOption, ECharts } from 'echarts';

interface ChartViewerProps {
    chartConfig: EChartsOption | null;
    isDark: boolean;
    lastAiMessage: string;
    includeText: boolean;
    setIncludeText: (val: boolean) => void;
}

interface FormatterParams {
    name: string;
    value: string | number;
    percent: number;
}

interface GenericSeries {
    type?: string;
    radius?: string[];
    label?: Record<string, unknown>;
    [key: string]: unknown;
}

export default function ChartViewer({ chartConfig, isDark, lastAiMessage, includeText, setIncludeText }: ChartViewerProps) {
    const echartsRef = useRef<ReactECharts>(null);
    const localDate = useMemo(() => new Date().toLocaleDateString(), []);

    const finalOption = useMemo<EChartsOption | null>(() => {
        if (!chartConfig) return null;
        const textColor = isDark ? '#e5e7eb' : '#374151';

        return {
            ...chartConfig,
            title: chartConfig.title ? {
                ...(chartConfig.title as object),
                textStyle: { color: textColor, fontSize: 16 }
            } : undefined,
            legend: chartConfig.legend ? {
                ...(chartConfig.legend as object),
                textStyle: { color: textColor, fontSize: 12 }
            } : undefined,

            series: Array.isArray(chartConfig.series)
                ? (chartConfig.series as GenericSeries[]).map((s) => {
                    if (s.type === 'pie') {
                        return {
                            ...s,
                            radius: ['40%', '60%'],
                            label: {
                                ...(s.label || {}),
                                show: true,
                                formatter: (p: FormatterParams) =>
                                    `${p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name}\n${p.value} (${p.percent}%)`,
                                color: isDark ? '#ffffff' : '#1f2937'
                            }
                        };
                    }
                    return s;
                }) as EChartsOption['series']
                : chartConfig.series
        } as EChartsOption;
    }, [chartConfig, isDark]);

    const getEchartInstance = (): ECharts | undefined => echartsRef.current?.getEchartsInstance();

    return (
        <div className={clsx("w-1/2 relative flex flex-col justify-center items-center p-12 transition-colors",
            isDark ? "bg-dark-bg" : "bg-light-bg")}>

            {chartConfig && (
                <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                    <ActionButton
                        onClick={() => setIncludeText(!includeText)}
                        active={includeText}
                        icon={includeText ? <Type size={14} /> : <Eraser size={14} />}
                        label={`Análise: ${includeText ? 'ON' : 'OFF'}`}
                        isDark={isDark}
                    />
                    <div className="h-6 w-px bg-gray-500/20 mx-1" />
                    <IconButton
                        onClick={() => downloadChartImage(getEchartInstance(), isDark, localDate)}
                        icon={<FileImage size={18}/>}
                        isDark={isDark}
                    />
                    <IconButton
                        onClick={() => downloadChartPDF(getEchartInstance(), finalOption, includeText, lastAiMessage, localDate)}
                        icon={<FileText size={18}/>}
                        isDark={isDark}
                    />
                </div>
            )}

            {chartConfig ? (
                <div className="w-full h-full animate-in zoom-in-95 fade-in duration-500">
                    <ReactECharts ref={echartsRef} option={finalOption!} theme={getChartTheme(isDark)} style={{ height: '100%' }} notMerge />
                </div>
            ) : (
                <EmptyState isDark={isDark} />
            )}
        </div>
    );
}

interface ActionButtonProps {
    onClick: () => void;
    active: boolean;
    icon: React.ReactNode;
    label: string;
    isDark: boolean;
}

const ActionButton = ({ onClick, active, icon, label, isDark }: ActionButtonProps) => (
    <button onClick={onClick} className={clsx("flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all",
        active ? "bg-brand-primary text-white" : (isDark ? "bg-slate-800 text-slate-400 border-slate-700" : "bg-white text-slate-600 border-slate-200"))}>
        {icon} {label}
    </button>
);

interface IconButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    isDark: boolean;
}

const IconButton = ({ onClick, icon, isDark }: IconButtonProps) => (
    <button onClick={onClick} className={clsx("p-2 rounded-lg border transition-all",
        isDark ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700" : "bg-white text-slate-700 border-slate-200 hover:bg-gray-50")}>
        {icon}
    </button>
);

const EmptyState = ({ isDark }: { isDark: boolean }) => (
    <div className="flex flex-col items-center justify-center opacity-50">
        <BarChart2 size={48} className={isDark ? "text-brand-primary" : "text-gray-300"} />
        <h3 className="text-2xl font-medium mt-4">VILT Group</h3>
    </div>
);