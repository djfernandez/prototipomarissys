import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Ship, 
  CheckCircle2, 
  Download, 
  Filter,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Scale } from '../types/maritime';

interface ReportsViewProps {
  scales: Scale[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ scales }) => {
  const [reportType, setReportType] = useState<'tiempos' | 'movimientos' | 'rentabilidad'>('tiempos');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Reportes Gerenciales & Estadísticas</span>
            <span aria-hidden="true">·</span>
            <span>KPIs Operativos & Portuarios Perú</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Indicadores de Desempeño, Tiempos y Movimientos
          </h1>
        </div>

        {/* Report Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setReportType('tiempos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              reportType === 'tiempos' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tiempos en Puerto (KPIs)
          </button>
          <button
            onClick={() => setReportType('movimientos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              reportType === 'movimientos' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Movimientos por Buque
          </button>
          <button
            onClick={() => setReportType('rentabilidad')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              reportType === 'rentabilidad' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rentabilidad de Escalas
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Tiempo Medio en Puerto</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">32.4 hrs</div>
          <div className="text-[11px] text-emerald-400 mt-1">Cumplimiento de ventana: 96.2%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Tiempo de Espera en Rada</span>
          <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">4.2 hrs</div>
          <div className="text-[11px] text-slate-400 mt-1">Desde aviso DICAPI a atraque</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Productividad Muelle (STS)</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">28.5 mvts/hr</div>
          <div className="text-[11px] text-cyan-400 mt-1">Grúas pórtico DP World / APM</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Levante Aduanero Oportuno</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">91.8%</div>
          <div className="text-[11px] text-slate-400 mt-1">Canal Verde antes de descarga</div>
        </div>
      </div>

      {/* REPORT 1: TIEMPOS OPERATIVOS (HU-REP-003) */}
      {reportType === 'tiempos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm font-display">Tiempos Operativos por Escala (Tramos DICAPI / Terminal)</h3>
            <p className="text-xs text-slate-400">
              Desglose de horas entre aviso de arribo, fondeo en rada, atraque efectivo, término de faena y autorización de zarpe.
            </p>

            <div className="divide-y divide-slate-800 rounded-lg border border-slate-800 overflow-hidden text-xs">
              {scales.map((s) => (
                <div key={s.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-sm">{s.vesselName}</div>
                    <div className="text-slate-400 font-mono text-[11px]">{s.scaleNumber} · {s.terminal}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-sans">Rada a Muelle</div>
                      <div className="text-cyan-300 font-semibold mt-0.5">3.5 hrs</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-sans">Operación Grúa</div>
                      <div className="text-white font-semibold mt-0.5">26.0 hrs</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-sans">Cierre DICAPI</div>
                      <div className="text-emerald-400 font-semibold mt-0.5">1.8 hrs</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REPORT 2: MOVIMIENTOS POR BUQUE (HU-REP-001) */}
      {reportType === 'movimientos' && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-sm font-display">Resumen de Contenedores y Carga por Nave</h3>
          <div className="divide-y divide-slate-800 rounded-lg border border-slate-800 overflow-hidden text-xs">
            {scales.map((s) => (
              <div key={s.id} className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{s.vesselName} (IMO: {s.imo})</div>
                  <div className="text-slate-400 font-mono">{s.shippingLine} · {s.portName}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-white font-bold">{s.containersIn + s.containersOut} Contenedores</div>
                  <div className="text-slate-400 text-[11px]">{(s.totalWeightTons).toLocaleString()} TM Movilizadas</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORT 3: RENTABILIDAD (HU-REP-006) */}
      {reportType === 'rentabilidad' && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-white text-sm font-display">Margen Operativo y Facturación Propia</h3>
          <p className="text-slate-400">
            Distingue ingresos propios de la agencia marítima (Agency fee, visto bueno, documentación) de los gastos portuarios reembolsables de la naviera.
          </p>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Ingresos Propios Facturados:</span>
              <span className="font-mono font-bold text-emerald-400">USD $18,450.00</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Gastos Portuarios Reembolsables (Pass-through):</span>
              <span className="font-mono text-slate-300">USD $64,280.00</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Costo Operativo Interno (Personal/Guardias):</span>
              <span className="font-mono text-slate-300">USD $5,920.00</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-cyan-300 text-sm">
              <span>Margen Operativo Neto:</span>
              <span className="font-mono">USD $12,530.00 (67.9%)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
