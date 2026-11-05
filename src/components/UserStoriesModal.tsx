import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  X, 
  CheckCircle2, 
  Filter, 
  FileText, 
  User, 
  Compass, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { USER_STORIES_CATALOG } from '../data/userStoriesData';
import { UserStory } from '../types/maritime';

interface UserStoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserStoriesModal: React.FC<UserStoriesModalProps> = ({
  isOpen,
  onClose
}) => {
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedStory, setSelectedStory] = useState<UserStory>(USER_STORIES_CATALOG[0]);

  if (!isOpen) return null;

  const modules = Array.from(new Set(USER_STORIES_CATALOG.map(s => s.module)));

  const filteredStories = USER_STORIES_CATALOG.filter(s => {
    if (selectedModule !== 'all' && s.module !== selectedModule) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.id.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.actor.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.menuPath.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-base font-display">
                  Catálogo Oficial de Historias de Usuario (145 HUs)
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800">
                  Perú · Noviembre 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sistema de Gestión para Agencia Marítima: APN, DICAPI, SUNAT, SENASA, DIGESA y Prácticas Portuarias
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 px-6 bg-slate-950/40 border-b border-slate-800/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por código HU, título, actor, regla..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 shrink-0">Módulo:</span>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Todos los módulos</option>
              {modules.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content Area: Split 2 columns (Master list & Detail pane) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left: Stories List (5 cols) */}
          <div className="md:col-span-5 border-r border-slate-800 overflow-y-auto divide-y divide-slate-800/60 bg-slate-950/30">
            {filteredStories.map((story) => {
              const isSelected = selectedStory.id === story.id;
              return (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className={`w-full text-left p-3.5 text-xs transition-colors flex items-start justify-between gap-2 ${
                    isSelected 
                      ? 'bg-indigo-950/40 border-l-2 border-indigo-500 text-white' 
                      : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-cyan-400">{story.id}</span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[130px]">{story.module}</span>
                    </div>
                    <div className="font-semibold text-slate-200">{story.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-500" />
                      <span>{story.actor}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Story Specification Detail (7 cols) */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-5 bg-slate-900/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {selectedStory.id}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedStory.menuPath}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-display mt-2">
                {selectedStory.title}
              </h3>
              <div className="text-xs text-indigo-400 font-medium mt-1">
                Actor Principal: {selectedStory.actor}
              </div>
            </div>

            {/* User Story Prose */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 leading-relaxed">
              <span className="text-slate-400 uppercase font-mono text-[10px] block">Descripción de la Historia:</span>
              <p className="text-slate-200">
                {selectedStory.description}
              </p>
            </div>

            {/* Peruvian Context */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs space-y-1.5 leading-relaxed">
              <span className="text-cyan-400 uppercase font-mono text-[10px] block font-bold">
                Contexto Regulatorio y Marítimo Peruano:
              </span>
              <p className="text-slate-300">
                {selectedStory.peruvianContext}
              </p>
            </div>

            {/* Acceptance Criteria */}
            <div className="space-y-2 text-xs">
              <span className="text-slate-400 uppercase font-mono text-[10px] block font-semibold">
                Criterios de Aceptación (Verificación Operativa):
              </span>
              <div className="space-y-2">
                {selectedStory.criteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 px-6 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Total de 145 Historias de Usuario integradas según historias-usuario.md</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
