import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search,
  Radio,
  FileText
} from 'lucide-react';
import { AlertNotification } from '../types/maritime';

interface AlertsViewProps {
  alerts: AlertNotification[];
  onMarkAlertRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onMarkAlertRead,
  onMarkAllRead
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAlerts = alerts.filter(a => {
    if (filterType !== 'all' && a.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Alertas y Notificaciones</span>
            <span aria-hidden="true">·</span>
            <span>Centro de Notificaciones Operativas (HU-ALE-001 ~ 006)</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Vencimientos, Avisos DICAPI y Alertas Aduaneras
          </h1>
        </div>

        <button
          onClick={onMarkAllRead}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold self-start md:self-auto transition-colors"
        >
          Marcar todas como atendidas
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto pb-1 sm:pb-1">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filterType === 'all' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Todas ({alerts.length})
        </button>
        <button
          onClick={() => setFilterType('dicapi')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filterType === 'dicapi' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          DICAPI & Zarpes
        </button>
        <button
          onClick={() => setFilterType('aduana')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filterType === 'aduana' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Aduana & Canales
        </button>
        <button
          onClick={() => setFilterType('cadena_frio')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filterType === 'cadena_frio' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Cadena de Frío
        </button>
        <button
          onClick={() => setFilterType('sunat')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filterType === 'sunat' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Manifiestos SUNAT
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400">
            No hay alertas activas en esta categoría.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isHigh = alert.severity === 'alta';

            return (
              <div 
                key={alert.id}
                className={`p-4 rounded-xl border transition-all text-xs space-y-2 ${
                  alert.isRead 
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-60' 
                    : isHigh 
                      ? 'bg-rose-950/20 border-rose-800/40' 
                      : 'bg-amber-950/20 border-amber-800/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    {isHigh ? (
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span>{alert.title}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 font-mono">{alert.timestamp}</span>
                    {!alert.isRead ? (
                      <button
                        onClick={() => onMarkAlertRead(alert.id)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium"
                      >
                        Marcar Atendida
                      </button>
                    ) : (
                      <span className="text-slate-500 font-medium text-[11px]">Atendida</span>
                    )}
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed text-xs">
                  {alert.description}
                </p>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    {alert.scaleNumber && (
                      <span>Escala: <strong className="font-mono text-cyan-400">{alert.scaleNumber}</strong></span>
                    )}
                    {alert.referenceId && (
                      <span>Ref: <strong className="font-mono text-slate-200">{alert.referenceId}</strong></span>
                    )}
                  </div>
                  <span className="text-slate-400">Rol asignado: <strong className="text-white">{alert.responsibleRole}</strong></span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
