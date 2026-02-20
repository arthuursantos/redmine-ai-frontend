import { useState, useCallback } from 'react';
import axios from 'axios';
import type { EChartsOption } from 'echarts';

export type Message = {
    id: string;
    role: 'user' | 'ai';
    content: string;
    isChart?: boolean;
};

interface ChartSeriesGeneric {
    type?: string;
    radius?: string | string[];
    center?: string | string[];
    avoidLabelOverlap?: boolean;
    label?: {
        show?: boolean;
        position?: string;
        formatter?: string | ((params: unknown) => string);
        color?: string;
        fontWeight?: string | number;
        fontSize?: number;
        textBorderColor?: string;
        textBorderWidth?: number;
    };
    labelLine?: {
        show?: boolean;
        lineStyle?: {
            color?: string;
        };
    };
    [key: string]: unknown;
}

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [chartConfig, setChartConfig] = useState<EChartsOption | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (
        userText: string,
        isChartMode: boolean,
        isDark: boolean,
        projectId: string = "",
        categoryId: string = ""
    ) => {
        if (!userText.trim()) return;

        setIsLoading(true);
        setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content: userText }]);

        try {
            const endpoint = isChartMode ? 'http://localhost:8080/api/prompt/chart' : 'http://localhost:8080/api/prompt/chat';

            const payload = {
                prompt: userText,
                projectId: projectId,
                categoryId: categoryId
            };

            const response = await axios.post(endpoint, payload);

            if (isChartMode) {
                const { message, chartConfig: rawConfig } = response.data;
                const config = { ...rawConfig } as EChartsOption;

                const textColor = isDark ? '#e5e7eb' : '#374151';

                if (config.title && !Array.isArray(config.title)) {
                    config.title.left = 'center';
                    config.title.top = 20;
                    config.title.textStyle = { color: textColor };
                }

                if (config.legend && !Array.isArray(config.legend)) {
                    config.legend.top = 'bottom';
                    config.legend.textStyle = { color: textColor };
                }

                if (config.series) {
                    const seriesList = Array.isArray(config.series)
                        ? (config.series as ChartSeriesGeneric[])
                        : [config.series as ChartSeriesGeneric];

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    seriesList.forEach((s: any) => {
                        if (s.type === 'pie') {
                            s.radius = ['40%', '70%'];
                            s.avoidLabelOverlap = true;
                            s.label = {
                                show: true,
                                position: 'outside',
                                formatter: '{b}: {c} ({d}%)'
                            };
                        }
                    });
                }

                setChartConfig(config);
                setMessages((prev) => [...prev, {
                    id: (Date.now() + 1).toString(),
                    role: 'ai',
                    content: message || `Gráfico gerado.`,
                    isChart: true
                }]);
            } else {
                setMessages((prev) => [...prev, {
                    id: Date.now().toString(),
                    role: 'ai',
                    content: typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
                }]);
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, {
                id: Date.now().toString(),
                role: 'ai',
                content: "⚠️ **Erro:** Não foi possível conectar ao servidor ou processar a resposta da IA."
            }]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { messages, chartConfig, isLoading, sendMessage, setMessages };
};