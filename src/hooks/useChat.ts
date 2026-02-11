import { useState } from 'react';
import axios from 'axios';
import type { EChartsOption } from 'echarts';

export type Message = {
    id: string;
    role: 'user' | 'ai';
    content: string;
    isChart?: boolean;
};

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [chartConfig, setChartConfig] = useState<EChartsOption | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (userText: string, isChartMode: boolean) => {
        if (!userText.trim()) return;

        setIsLoading(true);
        setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content: userText }]);

        try {
            const endpoint = isChartMode ? '/api/prompt/chart' : '/api/prompt/chat';
            const response = await axios.post(endpoint, { prompt: userText });

            if (isChartMode) {
                let config = response.data;
                if (typeof config === 'string') {
                    const jsonMatch = config.match(/\{[\s\S]*\}/);
                    config = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(config);
                }

                setChartConfig(config);
                setMessages((prev) => [...prev, {
                    id: Date.now().toString(),
                    role: 'ai',
                    content: `Gráfico gerado para: "${userText}"`,
                    isChart: true
                }]);
            } else {
                setMessages((prev) => [...prev, {
                    id: Date.now().toString(),
                    role: 'ai',
                    content: response.data
                }]);
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, {
                id: Date.now().toString(),
                role: 'ai',
                content: "**Erro:** Não foi possível conectar ao servidor backend ou processar a resposta."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, chartConfig, isLoading, sendMessage };
};