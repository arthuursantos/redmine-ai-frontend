
export const cleanAndParseChartConfig = (rawString: string): any => {
    try {
        return JSON.parse(rawString);
    } catch (e) {
        const jsonMatch = rawString.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch (innerError) {
                console.error("Falha ao parsear JSON limpo:", innerError);
                throw new Error("A estrutura retornada pela IA não é um JSON válido.");
            }
        }
        throw new Error("Nenhum objeto JSON encontrado na resposta.");
    }
};
