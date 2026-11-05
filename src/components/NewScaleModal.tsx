import React, { useState } from 'react';
import { 
  Anchor, 
  X, 
  Calendar, 
  MapPin, 
  Ship, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { Scale, PortId, Vessel } from '../types/maritime';
import { PORTS_CATALOG } from '../data/mockData';

interface NewScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vessels: Vessel[];
  onAddScale: (scale: Scale) => void;
}

export const NewScaleModal: React.FC<NewScaleModalProps> = ({
  isOpen,
  onClose,
  vessels,
  onAddScale
}) => {
  const [selectedVesselId, setSelectedVesselId] = useState(vessels[0]?.id || '');
  const [port, setPort] = useState<PortId>('callao');
  const [terminal, setTerminal] = useState('DP World Callao (Muelle Sur)');
  const [eta, setEta] = useState('2026-11-08T08:00');
  const [etd, setEtd] = useState('2026-11-10T18:00');
  const [originPort, setOriginPort] = useState('Guayaquil (ECGYE)');
  const [nextPort, setNextPort] = useState('San Antonio (CLSAI)');
  const [shippingLine, setShippingLine] = useState('MSC Mediterranean Shipping');
  const [containersIn, setContainersIn] = useState(450);
  const [containersOut, setContainersOut] = useState(380);
  const [notes, setNotes] = useState('Escala programada regular de línea.');

  if (!isOpen) return null;

  const activeVessel = vessels.find(v => v.id === selectedVesselId) || vessels[0];
  const activePortObj = PORTS_CATALOG.find(p => p.id === port) || PORTS_CATALOG[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScale: Scale = {
      id: `esc-${Date.now()}`,
      scaleNumber: `ESC-2026-${port.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      vesselId: activeVessel.id,
      vesselName: activeVessel.name,
      imo: activeVessel.imo,
      shippingLine,
      port,
      portName: activePortObj.name,
      terminal,
      eta,
      etd,
      status: 'programada',
      originPort,
      nextPort,
      dicapiArrivalNotice: 'pendiente',
      dicapiDepartureAuth: 'pendiente',
      sunatManifestInStatus: 'borrador',
      sunatManifestOutStatus: 'borrador',
      containersIn: Number(containersIn),
      containersOut: Number(containersOut),
      totalWeightTons: Math.round((Number(containersIn) + Number(containersOut)) * 14.5),
      disbursementStatus: 'abierta',
      notes,
      tasksCompleted: 1,
      tasksTotal: 8
    };

    onAddScale(newScale);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-display text-base">
            <Anchor className="w-5 h-5" />
            <span>Programación de Arribo / Nueva Escala</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Vessel Selection */}
          <div>
            <label className="text-slate-400 block mb-1">Buque / Nave Representada</label>
            <select
              value={selectedVesselId}
              onChange={(e) => {
                setSelectedVesselId(e.target.value);
                const found = vessels.find(v => v.id === e.target.value);
                if (found) setShippingLine(found.shippingLine);
              }}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-medium focus:border-cyan-500 focus:outline-none"
            >
              {vessels.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name} (IMO: {v.imo} - {v.flag})
                </option>
              ))}
            </select>
          </div>

          {/* Port and Terminal */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Puerto de Escala</label>
              <select
                value={port}
                onChange={(e) => {
                  const p = e.target.value as PortId;
                  setPort(p);
                  const pObj = PORTS_CATALOG.find(x => x.id === p);
                  if (pObj && pObj.terminals.length > 0) {
                    setTerminal(pObj.terminals[0]);
                  }
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                {PORTS_CATALOG.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Terminal Previsto</label>
              <select
                value={terminal}
                onChange={(e) => setTerminal(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white truncate focus:border-cyan-500 focus:outline-none"
              >
                {activePortObj.terminals.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ETA & ETD */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">ETA (Llegada Prevista)</label>
              <input
                type="datetime-local"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">ETD (Zarpe Estimado)</label>
              <input
                type="datetime-local"
                value={etd}
                onChange={(e) => setEtd(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Origin & Next Port */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Puerto de Procedencia</label>
              <input
                type="text"
                value={originPort}
                onChange={(e) => setOriginPort(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Siguiente Puerto Destino</label>
              <input
                type="text"
                value={nextPort}
                onChange={(e) => setNextPort(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Container movements estimated */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Descarga Est. (Contenedores)</label>
              <input
                type="number"
                value={containersIn}
                onChange={(e) => setContainersIn(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Embarque Est. (Contenedores)</label>
              <input
                type="number"
                value={containersOut}
                onChange={(e) => setContainersOut(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Observaciones Operativas</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20"
            >
              Guardar y Programar Arribo
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
