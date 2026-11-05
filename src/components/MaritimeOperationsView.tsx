import React, { useState } from 'react';
import { 
  Ship, 
  Anchor, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Search, 
  CheckCircle2, 
  FileText, 
  Compass, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Scale, Vessel, PortId } from '../types/maritime';

interface MaritimeOperationsViewProps {
  currentPort: PortId;
  scales: Scale[];
  vessels: Vessel[];
  onSelectScale: (scale: Scale) => void;
  onOpenNewScaleModal: () => void;
  onUpdateScale: (updatedScale: Scale) => void;
}

export const MaritimeOperationsView: React.FC<MaritimeOperationsViewProps> = ({
  currentPort,
  scales,
  vessels,
  onSelectScale,
  onOpenNewScaleModal,
  onUpdateScale
}) => {
  const [subTab, setSubTab] = useState<'escalas' | 'arribos' | 'zarpes' | 'buques'>('escalas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive modal state for DICAPI Zarpe Authorization
  const [authorizingScale, setAuthorizingScale] = useState<Scale | null>(null);
  const [dicapiAuthNumber, setDicapiAuthNumber] = useState('');
  const [authResult, setAuthResult] = useState<'autorizado' | 'observado' | 'denegado'>('autorizado');

  // Interactive modal state for Arrival Confirmation
  const [confirmingArrivalScale, setConfirmingArrivalScale] = useState<Scale | null>(null);
  const [arrivalBerth, setArrivalBerth] = useState('Muelle Sur - Amarradero 1B');
  const [arrivalNoticeRef, setArrivalNoticeRef] = useState('DICAPI-ARR-2026-');

  const filteredScales = scales.filter(s => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.vesselName.toLowerCase().includes(q) ||
        s.scaleNumber.toLowerCase().includes(q) ||
        s.imo.includes(q) ||
        s.shippingLine.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAuthorizeZarpe = () => {
    if (!authorizingScale) return;
    const updated: Scale = {
      ...authorizingScale,
      dicapiDepartureAuth: authResult,
      dicapiDepartureAuthNumber: dicapiAuthNumber || `DICAPI-ZAR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      tasksCompleted: authResult === 'autorizado' ? Math.min(authorizingScale.tasksTotal, authorizingScale.tasksCompleted + 1) : authorizingScale.tasksCompleted
    };
    onUpdateScale(updated);
    setAuthorizingScale(null);
    setDicapiAuthNumber('');
  };

  const handleConfirmArrival = () => {
    if (!confirmingArrivalScale) return;
    const nowIso = new Date().toISOString();
    const updated: Scale = {
      ...confirmingArrivalScale,
      status: 'atracada',
      actualArrival: nowIso,
      berth: arrivalBerth,
      dicapiArrivalNotice: 'autorizado',
      dicapiArrivalNoticeNumber: arrivalNoticeRef || `DICAPI-ARR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      tasksCompleted: Math.min(confirmingArrivalScale.tasksTotal, confirmingArrivalScale.tasksCompleted + 1)
    };
    onUpdateScale(updated);
    setConfirmingArrivalScale(null);
  };

  const handleConfirmZarpe = (scale: Scale) => {
    if (scale.dicapiDepartureAuth !== 'autorizado') {
      alert('Regla Operativa DICAPI: No se puede confirmar el zarpe sin la autorización previa aprobada por la Capitanía de Puerto.');
      return;
    }
    if (scale.sunatManifestOutStatus === 'observado') {
      alert('Regla Operativa SUNAT: El manifiesto de salida se encuentra observado por aduanas.');
      return;
    }
    const updated: Scale = {
      ...scale,
      status: 'zarpada',
      actualDeparture: new Date().toISOString(),
      tasksCompleted: scale.tasksTotal
    };
    onUpdateScale(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* View Header with Sub-Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Operaciones Marítimas</span>
            <span aria-hidden="true">·</span>
            <span>DICAPI / APN / Terminales</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Control de Escalas, Arribos y Zarpes
          </h1>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenNewScaleModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold self-start md:self-auto transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Registrar Arribo / Escala</span>
        </button>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setSubTab('escalas')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'escalas' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Escalas ({scales.length})
          </button>
          <button
            onClick={() => setSubTab('arribos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'arribos' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Arribos & DICAPI ({scales.filter(s => s.status !== 'zarpada').length})
          </button>
          <button
            onClick={() => setSubTab('zarpes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'zarpes' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Zarpes & Salidas ({scales.filter(s => s.status === 'atracada' || s.status === 'en_operacion').length})
          </button>
          <button
            onClick={() => setSubTab('buques')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'buques' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Padrón de Buques ({vessels.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por buque, IMO, escala..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* SUBTAB 1: ESCALAS */}
      {subTab === 'escalas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {filteredScales.map((scale) => (
              <div 
                key={scale.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 font-bold">
                      <Ship className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white font-display">{scale.vesselName}</span>
                        <span className="text-xs font-mono text-cyan-400">{scale.scaleNumber}</span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {scale.portName}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Línea: {scale.shippingLine} · IMO: <span className="font-mono">{scale.imo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => onSelectScale(scale)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                    >
                      Ver Expediente
                    </button>
                    {scale.status === 'programada' && (
                      <button
                        onClick={() => setConfirmingArrivalScale(scale)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition-colors"
                      >
                        Confirmar Arribo
                      </button>
                    )}
                    {(scale.status === 'atracada' || scale.status === 'en_operacion') && (
                      <button
                        onClick={() => setAuthorizingScale(scale)}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-medium text-white transition-colors"
                      >
                        Autorización DICAPI
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800/70">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Terminal Portuario</span>
                    <span className="font-medium text-slate-200">{scale.terminal}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">ETA / Arribo</span>
                    <span className="font-mono text-slate-200">
                      {new Date(scale.actualArrival || scale.eta).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">ETD / Zarpe</span>
                    <span className="font-mono text-slate-200">
                      {new Date(scale.actualDeparture || scale.etd).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Hitos & Tareas</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 rounded-full" 
                          style={{ width: `${(scale.tasksCompleted / scale.tasksTotal) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-slate-300">{scale.tasksCompleted}/{scale.tasksTotal}</span>
                    </div>
                  </div>
                </div>

                {/* DICAPI and SUNAT Status Footer */}
                <div className="pt-2 border-t border-slate-800/50 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>Aviso DICAPI: <strong className={scale.dicapiArrivalNotice === 'autorizado' ? 'text-emerald-400' : 'text-amber-400'}>{scale.dicapiArrivalNotice}</strong></span>
                    <span>Manifiesto SUNAT: <strong className={scale.sunatManifestInStatus === 'aceptado' ? 'text-emerald-400' : 'text-cyan-400'}>{scale.sunatManifestInStatus}</strong></span>
                    <span>Zarpe DICAPI: <strong className={scale.dicapiDepartureAuth === 'autorizado' ? 'text-emerald-400' : 'text-slate-400'}>{scale.dicapiDepartureAuth}</strong></span>
                  </div>
                  <span className="font-mono text-slate-400">{scale.notes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: ARRIBOS Y AVISO DICAPI */}
      {subTab === 'arribos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Normativa DICAPI — Aviso de Arribo de Naves (HU-OPE-005 / HU-OPE-006)</strong>
              El aviso de arribo debe transmitirse con anticipación a la Capitanía de Puerto respectiva con puerto de procedencia, ETA operacional y datos del armador. Al confirmar la llegada a rada o muelle, se genera el registro oficial de escala.
            </div>
          </div>

          <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden">
            {scales.map((scale) => (
              <div key={scale.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{scale.vesselName}</span>
                    <span className="font-mono text-slate-400">{scale.scaleNumber}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{scale.portName}</span>
                  </div>
                  <div className="text-slate-400 mt-1">
                    Procedencia: <strong className="text-slate-200">{scale.originPort}</strong> · ETA: <span className="font-mono text-cyan-400">{new Date(scale.eta).toLocaleString('es-PE')}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Constancia DICAPI: <span className="font-mono text-slate-300">{scale.dicapiArrivalNoticeNumber || 'Pendiente de radicación'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-[11px] text-slate-400">Estado Arribo</div>
                    <div className="font-semibold text-emerald-400 uppercase text-xs">{scale.status}</div>
                  </div>

                  {scale.status === 'programada' ? (
                    <button
                      onClick={() => setConfirmingArrivalScale(scale)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors"
                    >
                      Confirmar Arribo Real
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-medium">
                      Arribo Confirmado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: ZARPES Y AUTORIZACIÓN DICAPI */}
      {subTab === 'zarpes' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Regulación de Zarpe DICAPI & Manifiesto SUNAT (HU-OPE-008 / HU-OPE-009 / HU-OPE-010)</strong>
              La autorización de zarpe la expide la Capitanía de Puerto una vez concluidas las faenas portuarias, verificados los calados de salida y sin observaciones en el manifiesto de salida de aduanas.
            </div>
          </div>

          <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden">
            {scales.filter(s => s.status !== 'programada').map((scale) => {
              const canConfirmZarpe = scale.dicapiDepartureAuth === 'autorizado' && scale.status !== 'zarpada';
              
              return (
                <div key={scale.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{scale.vesselName}</span>
                      <span className="font-mono text-cyan-400">{scale.scaleNumber}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{scale.portName}</span>
                    </div>
                    <div className="text-slate-400 mt-1">
                      Destino: <strong className="text-slate-200">{scale.nextPort}</strong> · ETD: <span className="font-mono text-slate-300">{new Date(scale.etd).toLocaleString('es-PE')}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>Autorización DICAPI: <strong className={scale.dicapiDepartureAuth === 'autorizado' ? 'text-emerald-400' : 'text-amber-400'}>{scale.dicapiDepartureAuth}</strong> ({scale.dicapiDepartureAuthNumber || 'Sin número'})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {scale.status !== 'zarpada' && (
                      <button
                        onClick={() => setAuthorizingScale(scale)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                      >
                        Cargar DICAPI
                      </button>
                    )}

                    {scale.status === 'zarpada' ? (
                      <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 font-medium">
                        Zarpado {scale.actualDeparture && `(${new Date(scale.actualDeparture).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })})`}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleConfirmZarpe(scale)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          canConfirmZarpe 
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                            : 'bg-slate-800/80 text-slate-500 cursor-not-allowed'
                        }`}
                        title={!canConfirmZarpe ? 'Requiere autorización DICAPI aprobada' : 'Confirmar salida de puerto'}
                      >
                        Confirmar Zarpe
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 4: BUQUES */}
      {subTab === 'buques' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vessels.map((ves) => (
            <div key={ves.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base font-display">{ves.name}</h3>
                  <div className="text-xs font-mono text-cyan-400">IMO {ves.imo}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {ves.flag}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipo de nave:</span>
                  <span className="font-medium text-white">{ves.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Armador:</span>
                  <span className="text-slate-200 truncate max-w-[170px]">{ves.shipowner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Línea Naviera:</span>
                  <span className="text-slate-200 truncate max-w-[170px]">{ves.shippingLine}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Eslora / Manga:</span>
                  <span>{ves.lengthOverallMeters}m / {ves.beamMeters}m</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Calado máx.:</span>
                  <span>{ves.draftMeters}m</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Último puerto: {ves.lastPort}</span>
                <span className="text-emerald-400 font-medium">Activo en padrón</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: REGISTRAR AUTORIZACIÓN DICAPI DE ZARPE */}
      {authorizingScale && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-display text-base">
              <ShieldCheck className="w-5 h-5" />
              <span>Autorización de Zarpe DICAPI</span>
            </div>

            <p className="text-xs text-slate-300">
              Registra la resolución o constancia de autorización emitida por la Capitanía de Puerto para la nave <strong>{authorizingScale.vesselName}</strong> (Escala: {authorizingScale.scaleNumber}).
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">N° de Autorización DICAPI</label>
                <input
                  type="text"
                  placeholder="Ej: DICAPI-ZAR-2026-0418"
                  value={dicapiAuthNumber}
                  onChange={(e) => setDicapiAuthNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Resultado de Capitanía</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthResult('autorizado')}
                    className={`py-2 text-center rounded-lg border font-medium ${
                      authResult === 'autorizado' 
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Autorizado
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthResult('observado')}
                    className={`py-2 text-center rounded-lg border font-medium ${
                      authResult === 'observado' 
                        ? 'bg-amber-950 border-amber-500 text-amber-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Observado
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthResult('denegado')}
                    className={`py-2 text-center rounded-lg border font-medium ${
                      authResult === 'denegado' 
                        ? 'bg-rose-950 border-rose-500 text-rose-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Denegado
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setAuthorizingScale(null)}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAuthorizeZarpe}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Guardar Autorización
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMAR ARRIBO REAL */}
      {confirmingArrivalScale && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-display text-base">
              <Anchor className="w-5 h-5" />
              <span>Confirmación de Arribo a Puerto</span>
            </div>

            <p className="text-xs text-slate-300">
              Confirmar la fecha y hora reales de arribo para la nave <strong>{confirmingArrivalScale.vesselName}</strong> en el puerto del <strong>{confirmingArrivalScale.portName}</strong>.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Punto de Arribo / Muelle</label>
                <input
                  type="text"
                  value={arrivalBerth}
                  onChange={(e) => setArrivalBerth(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Referencia / Constancia de Aviso DICAPI</label>
                <input
                  type="text"
                  placeholder="Ej: DICAPI-ARR-2026-0955"
                  value={arrivalNoticeRef}
                  onChange={(e) => setArrivalNoticeRef(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmingArrivalScale(null)}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmArrival}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Confirmar Arribo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
