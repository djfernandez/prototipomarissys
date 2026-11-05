import React, { useState } from 'react';
import { 
  Ship, 
  Clock, 
  Anchor, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ArrowUpRight, 
  Layers, 
  TrendingUp, 
  Filter, 
  FileCheck2,
  Calendar,
  Waves
} from 'lucide-react';
import { Scale, PortId, Vessel, CargoItem, DamRecord, AlertNotification } from '../types/maritime';
import { PORTS_CATALOG } from '../data/mockData';

interface DashboardViewProps {
  currentPort: PortId;
  scales: Scale[];
  vessels: Vessel[];
  cargoItems: CargoItem[];
  damRecords: DamRecord[];
  alerts: AlertNotification[];
  onSelectScale: (scale: Scale) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenNewScaleModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentPort,
  scales,
  vessels,
  cargoItems,
  damRecords,
  alerts,
  onSelectScale,
  onNavigateToTab,
  onOpenNewScaleModal
}) => {
  const [filterPort, setFilterPort] = useState<string>('all');

  // Filter scales
  const activeScales = scales.filter(s => {
    if (filterPort !== 'all' && s.port !== filterPort) return false;
    return true;
  });

  const vesselsInPort = activeScales.filter(s => s.status === 'atracada' || s.status === 'en_operacion' || s.status === 'en_rada');
  const arrivalsPlanned = activeScales.filter(s => s.status === 'programada' || s.status === 'en_rada');
  const unreleasedCargo = cargoItems.filter(c => c.type === 'importacion' && (!c.damLevante || c.commercialReleaseStatus === 'retenido'));
  const criticalAlerts = alerts.filter(a => a.severity === 'alta' && !a.isRead);

  const portName = filterPort === 'all' 
    ? 'Todos los Puertos (Callao, Paita, Matarani)' 
    : PORTS_CATALOG.find(p => p.id === filterPort)?.name || filterPort;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & KPI Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Operaciones Marítimas</span>
            <span aria-hidden="true">·</span>
            <span>Comercio Exterior Perú</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400 font-mono">Actualizado hoy 14:05</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Resumen Operativo de Agencia
          </h1>
        </div>

        {/* Port Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setFilterPort('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filterPort === 'all' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterPort('callao')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filterPort === 'callao' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Callao
          </button>
          <button
            onClick={() => setFilterPort('paita')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filterPort === 'paita' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Paita
          </button>
          <button
            onClick={() => setFilterPort('matarani')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filterPort === 'matarani' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Matarani
          </button>
        </div>
      </div>

      {/* 4 Vibrant Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Buques en Puerto */}
        <div 
          onClick={() => onNavigateToTab('operaciones')}
          className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Buques en Puerto</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-950/70 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <Ship className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              {vesselsInPort.length}
            </span>
            <span className="text-xs text-cyan-400 font-medium">naves activas</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span>Rada o Muelle confirmado</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Metric 2: Arribos Programados ETA */}
        <div 
          onClick={() => onNavigateToTab('operaciones')}
          className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Arribos Próximos (ETA)</span>
            <div className="w-7 h-7 rounded-lg bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              {arrivalsPlanned.length}
            </span>
            <span className="text-xs text-blue-400 font-medium">próximos 7 días</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span>Avisos DICAPI en trámite</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Metric 3: Cargas sin Levante / Retenidas */}
        <div 
          onClick={() => onNavigateToTab('aduanas')}
          className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Cargas sin Levante SUNAT</span>
            <div className="w-7 h-7 rounded-lg bg-amber-950/70 border border-amber-800/60 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              {unreleasedCargo.length}
            </span>
            <span className="text-xs text-amber-400 font-medium">DAM en proceso</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span>Canales Verde / Naranja / Rojo</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Metric 4: Alertas Prioritarias */}
        <div 
          onClick={() => onNavigateToTab('alertas')}
          className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Alertas Críticas</span>
            <div className="w-7 h-7 rounded-lg bg-rose-950/70 border border-rose-800/60 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              {criticalAlerts.length}
            </span>
            <span className="text-xs text-rose-400 font-medium">requieren acción</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span>DICAPI, SUNAT y cadena frío</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

      </div>

      {/* Main Grid: Escalas Activas en Puerto & Tablero de Control de Hitos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2 Cols: Escalas y Buques en Puerto (HU-DAS-002) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white font-display">Escalas en Puerto y Tránsito</h2>
              <span className="text-xs text-slate-400">({portName})</span>
            </div>
            <button
              onClick={() => onNavigateToTab('operaciones')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <span>Ver todas las escalas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeScales.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                <Ship className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-300">No hay escalas activas para el puerto seleccionado.</p>
                <button
                  onClick={onOpenNewScaleModal}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-medium hover:bg-cyan-500"
                >
                  Registrar nueva escala
                </button>
              </div>
            ) : (
              activeScales.map((scale) => {
                const isUnderOperation = scale.status === 'en_operacion';
                const isAtAnchor = scale.status === 'en_rada';
                const isBerthed = scale.status === 'atracada';
                
                return (
                  <div
                    key={scale.id}
                    onClick={() => onSelectScale(scale)}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900 cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-sm text-white font-display group-hover:text-cyan-300 transition-colors">
                            {scale.vesselName}
                          </span>
                          <span className="text-xs font-mono text-slate-400">IMO {scale.imo}</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {scale.portName}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>{scale.shippingLine}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-slate-400">{scale.scaleNumber}</span>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        {isUnderOperation && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            En Operación
                          </span>
                        )}
                        {isBerthed && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            Atracado
                          </span>
                        )}
                        {isAtAnchor && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            En Rada
                          </span>
                        )}
                        {scale.status === 'programada' && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-800/60 text-blue-300 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            Programado
                          </span>
                        )}
                        {scale.status === 'zarpada' && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
                            Zarpada
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Operational Details Row */}
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-[11px] text-slate-400">Terminal & Muelle</div>
                        <div className="font-medium text-slate-200 truncate mt-0.5">{scale.terminal}</div>
                        {scale.berth && <div className="text-[10px] text-slate-400 truncate">{scale.berth}</div>}
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-400">ETA / Arribo Real</div>
                        <div className="font-mono text-slate-200 mt-0.5">
                          {new Date(scale.actualArrival || scale.eta).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-[10px] text-slate-400">Desde: {scale.originPort}</div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-400">Contenedores Mvto.</div>
                        <div className="font-mono text-slate-200 mt-0.5">
                          Desc: <span className="text-cyan-400">{scale.containersIn}</span> / Emb: <span className="text-blue-400">{scale.containersOut}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{scale.totalWeightTons.toLocaleString()} TM Totales</div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-400">Cumplimiento Escala</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                              style={{ width: `${(scale.tasksCompleted / scale.tasksTotal) * 100}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-slate-300">
                            {scale.tasksCompleted}/{scale.tasksTotal}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Regulatory Badges Strip (DICAPI, SUNAT, APN) */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center gap-3 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">Aviso DICAPI:</span>
                        {scale.dicapiArrivalNotice === 'autorizado' ? (
                          <span className="text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Conforme
                          </span>
                        ) : (
                          <span className="text-amber-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> En Trámite
                          </span>
                        )}
                      </div>

                      <span className="text-slate-700" aria-hidden="true">·</span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">Manifiesto SUNAT:</span>
                        {scale.sunatManifestInStatus === 'aceptado' ? (
                          <span className="text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Aceptado
                          </span>
                        ) : (
                          <span className="text-cyan-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Transmitido
                          </span>
                        )}
                      </div>

                      <span className="text-slate-700" aria-hidden="true">·</span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">Zarpe DICAPI:</span>
                        {scale.dicapiDepartureAuth === 'autorizado' ? (
                          <span className="text-emerald-400 font-medium">Autorizado</span>
                        ) : (
                          <span className="text-amber-400 font-medium">Pendiente solicitud</span>
                        )}
                      </div>

                      <span className="text-slate-700 ml-auto hidden sm:inline" aria-hidden="true">·</span>

                      <div className="text-slate-400 text-[10px] hidden sm:block">
                        Disbursement: <span className="font-mono text-slate-300">{scale.disbursementStatus}</span>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 1 Col: Urgent Priorities & Peruvian Customs Radar */}
        <div className="space-y-6">
          
          {/* Urgent Notices Panel */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white font-display">Alertas Operativas Activas</h3>
              </div>
              <button 
                onClick={() => onNavigateToTab('alertas')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Ver todas ({alerts.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {alerts.slice(0, 3).map((alert) => (
                <div 
                  key={alert.id}
                  className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs space-y-1 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-semibold text-slate-200">{alert.title}</span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{alert.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Customs (DAM) Semaphore Radar */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-display">Semáforo Aduanero SUNAT</h3>
              </div>
              <button 
                onClick={() => onNavigateToTab('aduanas')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Módulo DAM
              </button>
            </div>

            <div className="space-y-2">
              {damRecords.slice(0, 3).map((dam) => {
                const isGreen = dam.channel === 'verde';
                const isOrange = dam.channel === 'naranja';
                const isRed = dam.channel === 'rojo';

                return (
                  <div 
                    key={dam.id}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-mono text-slate-200 text-[11px] font-medium">{dam.damNumber}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{dam.consigneeName}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isGreen && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                          VERDE
                        </span>
                      )}
                      {isOrange && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60">
                          NARANJA
                        </span>
                      )}
                      {isRed && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800/60">
                          ROJO
                        </span>
                      )}

                      {dam.levante ? (
                        <span className="text-[10px] text-emerald-400 font-semibold">Levante OK</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Sin Levante</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Control Sanitario:</span>
              <span className="text-cyan-400 font-medium">SENASA / DIGESA activos</span>
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-800/40 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Gestión Operativa Rápida</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inicia trámites de aviso de arribo a Capitanía (DICAPI) o transmisión telemática de manifiesto de carga a SUNAT.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenNewScaleModal}
                className="w-full py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold text-center transition-colors"
              >
                + Registrar Nueva Escala / Arribo
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
