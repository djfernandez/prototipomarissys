import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Ship, 
  Package, 
  FileText, 
  ShieldCheck, 
  BookOpen, 
  X, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Scale, CargoItem, Container, DamRecord, UserStory } from '../types/maritime';
import { USER_STORIES_CATALOG } from '../data/userStoriesData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  scales: Scale[];
  cargoItems: CargoItem[];
  containers: Container[];
  damRecords: DamRecord[];
  onSelectScale: (scale: Scale) => void;
  onSelectUserStory: (story: UserStory) => void;
  onNavigateToTab: (tab: any) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  scales,
  cargoItems,
  containers,
  damRecords,
  onSelectScale,
  onSelectUserStory,
  onNavigateToTab
}) => {
  const [query, setQuery] = useState('');

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Matched results
  const matchedScales = q ? scales.filter(s => 
    s.vesselName.toLowerCase().includes(q) ||
    s.scaleNumber.toLowerCase().includes(q) ||
    s.imo.includes(q)
  ) : scales.slice(0, 3);

  const matchedCargo = q ? cargoItems.filter(c => 
    c.blNumber.toLowerCase().includes(q) ||
    c.consigneeOrShipper.toLowerCase().includes(q) ||
    c.consigneeRuc.includes(q)
  ) : [];

  const matchedContainers = q ? containers.filter(c => 
    c.number.toLowerCase().includes(q) ||
    c.sealNumber.toLowerCase().includes(q)
  ) : [];

  const matchedDams = q ? damRecords.filter(d => 
    d.damNumber.toLowerCase().includes(q) ||
    d.consigneeName.toLowerCase().includes(q)
  ) : [];

  const matchedStories = q ? USER_STORIES_CATALOG.filter(s => 
    s.id.toLowerCase().includes(q) ||
    s.title.toLowerCase().includes(q) ||
    s.menuPath.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        
        {/* Search input field */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar nave, IMO, BL, DAM, contenedor o historia de usuario (HU-)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">ESC</kbd>
        </div>

        {/* Results container */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          
          {/* Scales & Vessels */}
          {matchedScales.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Escalas y Buques
              </div>
              <div className="space-y-1">
                {matchedScales.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectScale(s);
                      onNavigateToTab('operaciones');
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-800/80 text-left flex items-center justify-between text-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Ship className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300">
                          {s.vesselName} <span className="font-mono text-xs text-slate-400">({s.scaleNumber})</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          IMO: {s.imo} · Puerto: {s.portName} · Estado: {s.status}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cargo & BL */}
          {matchedCargo.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Conocimientos de Embarque (BL)
              </div>
              <div className="space-y-1">
                {matchedCargo.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onNavigateToTab('carga');
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-800/80 text-left flex items-center justify-between text-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Package className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="font-mono font-semibold text-white group-hover:text-blue-300">
                          {c.blNumber}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {c.consigneeOrShipper} (RUC: {c.consigneeRuc})
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Containers */}
          {matchedContainers.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Contenedores & Tracking
              </div>
              <div className="space-y-1">
                {matchedContainers.map((cnt) => (
                  <button
                    key={cnt.number}
                    onClick={() => {
                      onNavigateToTab('carga');
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-800/80 text-left flex items-center justify-between text-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Package className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-mono font-semibold text-white">
                          {cnt.number} <span className="text-slate-400 text-xs">({cnt.type})</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Ubicación: {cnt.currentLocation} · Precinto: {cnt.sealNumber}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* DAM Records */}
          {matchedDams.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Declaraciones Aduaneras (DAM)
              </div>
              <div className="space-y-1">
                {matchedDams.map((dam) => (
                  <button
                    key={dam.id}
                    onClick={() => {
                      onNavigateToTab('aduanas');
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-800/80 text-left flex items-center justify-between text-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="font-mono font-semibold text-white">
                          {dam.damNumber} <span className="uppercase text-[10px] px-1.5 rounded bg-slate-800 text-amber-300">Canal {dam.channel}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {dam.consigneeName} · {dam.status}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User Stories */}
          {matchedStories.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Historias de Usuario (Documentación de Requisitos)
              </div>
              <div className="space-y-1">
                {matchedStories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => {
                      onSelectUserStory(story);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-slate-800/80 text-left flex items-center justify-between text-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <div>
                        <div className="font-semibold text-white">
                          <span className="font-mono text-cyan-400">{story.id}</span> · {story.title}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {story.menuPath} · {story.actor}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && matchedScales.length === 0 && matchedCargo.length === 0 && matchedContainers.length === 0 && matchedDams.length === 0 && matchedStories.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No se encontraron coincidencias para &quot;{query}&quot;.
            </div>
          )}

        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>MARISYS Quick Lookup</span>
          <div className="flex items-center gap-3">
            <span>↑↓ para navegar</span>
            <span>↵ para seleccionar</span>
            <span>ESC para cerrar</span>
          </div>
        </div>

      </div>
    </div>
  );
};
