import { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';

interface RedmineItem {
    id: number | string;
    name: string;
}

interface FilterBarProps {
    isDark: boolean;
    selectedProjectId: string;
    setSelectedProjectId: (val: string) => void;
    selectedCategoryId: string;
    setSelectedCategoryId: (val: string) => void;
}

export default function FilterBar({
                                      isDark,
                                      selectedProjectId,
                                      setSelectedProjectId,
                                      selectedCategoryId,
                                      setSelectedCategoryId
                                  }: FilterBarProps) {
    const [projects, setProjects] = useState<RedmineItem[]>([]);
    const [categories, setCategories] = useState<RedmineItem[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/redmine/project?limit=100')
            .then(res => setProjects(res.data.projects || []))
            .catch(err => console.error("Erro ao buscar projetos:", err));
    }, []);

    useEffect(() => {
        if (!selectedProjectId) return;

        axios.get(`http://localhost:8080/api/redmine/project/${selectedProjectId}/category`)
            .then(res => setCategories(res.data.issue_categories || []))
            .catch(err => console.error("Erro ao buscar categorias:", err));
    }, [selectedProjectId]);

    const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProjectId = e.target.value;
        setSelectedProjectId(newProjectId);
        setSelectedCategoryId('');
        if (!newProjectId) {
            setCategories([]);
        }
    };

    return (
        <div className={clsx("px-8 py-4 border-b flex gap-4 text-sm z-20 shrink-0",
            isDark ? "border-gray-800 bg-slate-900/50" : "border-gray-200 bg-gray-50"
        )}>
            <div className="flex flex-col gap-1 w-1/2">
                <label className={clsx("text-xs font-semibold", isDark ? "text-gray-400" : "text-gray-500")}>
                    Projeto
                </label>
                <select
                    className={clsx("p-2 rounded border outline-none cursor-pointer transition-colors",
                        isDark ? "bg-slate-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-800"
                    )}
                    value={selectedProjectId}
                    onChange={handleProjectChange}
                >
                    <option value="">Todos os Projetos</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1 w-1/2">
                <label className={clsx("text-xs font-semibold", isDark ? "text-gray-400" : "text-gray-500")}>
                    Categoria
                </label>
                <select
                    className={clsx("p-2 rounded border outline-none transition-colors",
                        isDark ? "bg-slate-800 border-gray-700 text-white disabled:bg-slate-900 disabled:text-gray-600" : "bg-white border-gray-300 text-gray-800 disabled:bg-gray-100 disabled:text-gray-400",
                        (!selectedProjectId || categories.length === 0) && "opacity-50 cursor-not-allowed"
                    )}
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    disabled={!selectedProjectId || categories.length === 0}
                >
                    <option value="">Todas as Categorias</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}