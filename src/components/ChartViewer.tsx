import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { BarChart2 } from 'lucide-react';
import { getChartTheme } from '../utils/chartTheme';
import clsx from 'clsx';

interface ChartViewerProps {
    chartConfig: EChartsOption | null;
    isDark: boolean;
}

export default function ChartViewer({ chartConfig, isDark }: ChartViewerProps) {
    return (
        <div className={clsx("w-1/2 relative flex flex-col justify-center items-center p-12 transition-colors",
            isDark ? "bg-dark-bg" : "bg-light-bg"
        )}>
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                 style={{ backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}>
            </div>

            {chartConfig ? (
                <div className="w-full h-full animate-in zoom-in-95 fade-in duration-500">
                    <ReactECharts
                        option={chartConfig}
                        theme={getChartTheme(isDark)}
                        style={{ height: '100%', width: '100%' }}
                        notMerge={true}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center select-none opacity-50">
                    <div className={clsx("w-28 h-28 rounded-3xl mb-6 flex items-center justify-center transform rotate-6 transition-colors",
                        isDark ? "bg-dark-panel border border-brand-primary/20" : "bg-white shadow-xl border border-border-light"
                    )}>
                        <BarChart2 size={48} className="text-brand-primary" />
                    </div>
                    <h3 className={clsx("text-2xl font-medium tracking-tight", isDark ? "text-gray-200" : "text-gray-400")}>
                        Analytics Dashboard
                    </h3>
                </div>
            )}
        </div>
    );
}