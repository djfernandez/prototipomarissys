import React, { useState } from 'react';
import { 
  Compass, 
  Anchor, 
  Ship, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  MapPin, 
  AlertTriangle,
  Layers,
  Wrench,
  Users
} from 'lucide-react';
import { Scale, PortService, PortId } from '../types/maritime';

interface PortOperationsViewProps {
  currentPort: PortId;
  scales: Scale[];
  portServices: PortService[];
  onAddPortService: (service: PortService) => void;
}

export const PortOperationsView: React.FC<PortOperationsViewProps> = ({
  currentPort,
  scales,
  portServices,
  onAddPortService
}) => {
  const [selectedScaleId, setSelectedScaleId] = useState<string>(scales[0]?.id || '');
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  // New service form state
  const [serviceType, setServiceType] = useState<PortService['serviceType']>('practicaje');
  const [providerName, setProviderName] = useState('Prácticos del Callao S.A.C.');
  const [amount, setAmount] = useState(1450);

  const selectedScale = scales.find(s => s.id === selectedScaleId) || scales[0];
  const activeServices = portServices.filter(s => s.scaleId === selectedScale?.id);

  const totalServicesUsd = activeServices.reduce((acc, s) => acc + (s.currency === 'USD' ? s.amount : s.amount / 3.785), 0);

  // Terminal berths visualization state
  const berthsCallao = [
    { code: 'DPW-1A', terminal: 'DP World Muelle Sur', name: 'Amarradero 1A', length: 350, depth: 16.0, status: 'Ocupado', vessel: 'CMA CGM ALEXANDER' },
    { code: 'DPW-1B', terminal: 'DP World Muelle Sur', name: 'Amarradero 1B', length: 350, depth: 16.0, status: 'Ocupado', vessel: 'MSC INES (ESC-2026-CAL-088)' },
    { code: 'DPW-2A', terminal: 'DP World Muelle Sur (Nuevo Bicentenario)', name: 'Amarradero 2A', length: 400, depth: 16.5, status: 'Libre', nextWindow: 'Hoy 21:00 (ONE HAMBURG)' },
    { code: 'APM-5A', terminal: 'APM Terminals Muelle Norte', name: 'Muelle 5A (Contenedores)', length: 300, depth: 14.5, status: 'Libre' },
    { code: 'APM-5B', terminal: 'APM Terminals Muelle Norte', name: 'Muelle 5B (Contenedores)', length: 300, depth: 14.5, status: 'Ocupado', vessel: 'MAERSK LA PAZ (ESC-2026-CAL-089)' },
    { code: 'APM-M7', terminal: 'APM Terminals Muelle Norte', name: 'Muelle 7 (Graneles y Minerales)', length: 280, depth: 12.0, status: 'Ocupado', vessel: 'ISLAND EXPLORER' }
  ];

  const handleCreateService = () => {
    if (!selectedScale) return;
    const newService: PortService = {
      id: `srv-${Date.now()}`,
      scaleId: selectedScale.id,
      serviceType,
      providerName,
      providerRuc: '20501289412',
      date: new Date().toISOString(),
      quantity: 1,
      unit: 'Maniobra confirmada',
      currency: 'USD',
      amount: Number(amount),
      isConfirmed: true,
      reimbursableToLine: true
    };
    onAddPortService(newService);
    setShowAddServiceModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Operaciones Portuarias</span>
            <span aria-hidden="true">·</span>
            <span>APN / Capitanía / Terminales</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Control de Muelles, Practicaje, Remolcadores y Estiba
          </h1>
        </div>

        {/* Scale Switcher for Operations */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Escala de trabajo:</span>
          <select
            value={selectedScaleId}
            onChange={(e) => setSelectedScaleId(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-cyan-300 font-medium focus:outline-none focus:border-cyan-500"
          >
            {scales.map(s => (
              <option key={s.id} value={s.id}>
                {s.vesselName} ({s.scaleNumber})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* BERTHS / MUELLES REAL-TIME MAP (HU-POR-005 / HU-POR-006) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Ocupación y Disponibilidad de Muelles (Callao)</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Calados autorizados APN</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {berthsCallao.map((b) => {
            const isOccupied = b.status === 'Ocupado';
            return (
              <div 
                key={b.code}
                className={`p-3.5 rounded-xl border transition-all ${
                  isOccupied 
                    ? 'bg-slate-900/90 border-slate-800' 
                    : 'bg-cyan-950/20 border-cyan-800/40 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">{b.name}</div>
                    <div className="text-[10px] text-slate-400">{b.terminal}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isOccupied ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="mt-2.5 text-xs text-slate-300">
                  {isOccupied ? (
                    <div className="flex items-center gap-1.5 font-medium text-cyan-300 truncate">
                      <Ship className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{b.vessel}</span>
                    </div>
                  ) : (
                    <div className="text-emerald-400 text-[11px] font-medium">
                      Disponible para atraque
                      {b.nextWindow && <div className="text-[10px] text-slate-400 mt-0.5">{b.nextWindow}</div>}
                    </div>
                  )}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/60 flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Eslora máx: {b.length}m</span>
                  <span>Calado: {b.depth}m</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PORT SERVICES & DISBURSEMENT EXPENSES (HU-POR-007 to HU-POR-010) */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
              <Anchor className="w-4 h-4 text-cyan-400" />
              <span>Servicios a la Nave — Escala: {selectedScale?.vesselName} ({selectedScale?.scaleNumber})</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Gastos portuarios reembolsables a la naviera para la proforma y liquidación (Disbursement Account).
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <span className="text-slate-400">Total Servicios:</span>
              <span className="font-mono font-bold text-cyan-400 ml-1.5 text-sm">
                USD ${totalServicesUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button
              onClick={() => setShowAddServiceModal(true)}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
            >
              + Agregar Servicio
            </button>
          </div>
        </div>

        {/* Services Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden divide-y divide-slate-800">
          {activeServices.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No hay servicios registrados para esta escala.
            </div>
          ) : (
            activeServices.map((srv) => (
              <div key={srv.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white uppercase font-mono">{srv.serviceType}</span>
                    <span className="text-slate-400">· {srv.providerName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">RUC {srv.providerRuc}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {srv.unit} · Fecha: {new Date(srv.date).toLocaleString('es-PE')} {srv.invoiceNumber && `· Factura Prov: ${srv.invoiceNumber}`}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="font-mono text-white text-sm font-bold">
                    {srv.currency} ${srv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-medium">
                    Confirmado
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL: AGREGAR SERVICIO A LA NAVE */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-white text-base font-display">Registrar Servicio Portuario</h3>
            <p className="text-xs text-slate-300">
              Agrega practicaje, remolcadores, amarre o recolección a la escala de <strong>{selectedScale?.vesselName}</strong>.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Tipo de Servicio</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value="practicaje">Practicaje (Entrada / Salida)</option>
                  <option value="remolcadores">Remolcadores (Maniobra de muelle)</option>
                  <option value="amarradores">Amarradores de Muelle</option>
                  <option value="recoleccion_residuos">Recolección de Residuos MARPOL</option>
                  <option value="energia_muelle">Energía de Muelle (Cold Ironing)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Proveedor Autorizado</label>
                <input
                  type="text"
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Monto en USD</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddServiceModal(false)}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateService}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Registrar Servicio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
