import React from 'react';
import { 
  X, 
  Ship, 
  Anchor, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Package, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  MapPin,
  Calendar
} from 'lucide-react';
import { Scale, CargoItem, PortService } from '../types/maritime';

interface ScaleDetailModalProps {
  scale: Scale | null;
  cargoItems: CargoItem[];
  portServices: PortService[];
  onClose: () => void;
  onOpenDisbursement: (scale: Scale) => void;
}

export const ScaleDetailModal: React.FC<ScaleDetailModalProps> = ({
  scale,
  cargoItems,
  portServices,
  onClose,
  onOpenDisbursement
}) => {
  if (!scale) return null;

  const scaleCargo = cargoItems.filter(c => c.scaleId === scale.id);
  const scaleServices = portServices.filter(s => s.scaleId === scale.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-lg font-display">{scale.vesselName}</h2>
                <span className="font-mono text-xs text-cyan-400 font-semibold">{scale.scaleNumber}</span>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {scale.portName}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {scale.shippingLine} · IMO: <span className="font-mono text-slate-300">{scale.imo}</span>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          
          {/* Timeline of Peruvian Regulatory Milestones */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Línea de Tiempo Regulatoria & Operativa
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">1. Aviso Arribo DICAPI</span>
                <div className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{scale.dicapiArrivalNotice}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">{scale.dicapiArrivalNoticeNumber || 'Pendiente'}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">2. Manifiesto SUNAT</span>
                <div className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{scale.sunatManifestInStatus}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">{scale.sunatManifestInNumber || 'En borrador'}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">3. Autorización Zarpe</span>
                <div className={`font-semibold flex items-center gap-1 ${scale.dicapiDepartureAuth === 'autorizado' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {scale.dicapiDepartureAuth === 'autorizado' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  <span>{scale.dicapiDepartureAuth}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">{scale.dicapiDepartureAuthNumber || 'En trámite'}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">4. Disbursement Account</span>
                <div className="font-semibold text-cyan-400 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{scale.disbursementStatus}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">{scale.disbursementNumber || 'DA Abierta'}</div>
              </div>
            </div>
          </div>

          {/* Operational Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Terminal & Muelle</span>
              <span className="font-semibold text-white mt-0.5 block">{scale.terminal}</span>
              <span className="text-[11px] text-slate-400 font-mono">{scale.berth || 'Muelle en confirmación'}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Procedencia & Destino</span>
              <span className="font-semibold text-white mt-0.5 block">{scale.originPort}</span>
              <span className="text-[11px] text-cyan-400">Hacia: {scale.nextPort}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Horarios Operacionales</span>
              <span className="font-mono text-slate-200 block mt-0.5">
                Arribo: {new Date(scale.actualArrival || scale.eta).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="font-mono text-slate-400">
                Zarpe: {new Date(scale.actualDeparture || scale.etd).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Volumen de Carga</span>
              <span className="font-mono text-white block mt-0.5">
                Desc: <strong className="text-cyan-400">{scale.containersIn}</strong> / Emb: <strong className="text-blue-400">{scale.containersOut}</strong>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">{scale.totalWeightTons.toLocaleString()} TM Totales</span>
            </div>
          </div>

          {/* Associated Cargo Items */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Cargas y Conocimientos de Embarque Vinculados ({scaleCargo.length})
            </h4>

            {scaleCargo.length === 0 ? (
              <p className="text-slate-500 italic">No hay conocimientos individuales cargados en la vista previa para esta escala.</p>
            ) : (
              <div className="divide-y divide-slate-800 rounded-lg border border-slate-800 overflow-hidden bg-slate-950">
                {scaleCargo.map((c) => (
                  <div key={c.id} className="p-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{c.blNumber}</span>
                        <span className="text-[10px] uppercase px-1.5 py-0.2 bg-slate-800 text-cyan-300 rounded font-mono">{c.type}</span>
                      </div>
                      <div className="text-[11px] text-slate-300">{c.consigneeOrShipper} · {c.goodsDescription}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-white">{c.grossWeightKg.toLocaleString()} kg</div>
                      <div className={`text-[10px] font-semibold ${c.damLevante ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {c.damLevante ? 'Levante Conforme' : 'Sin Levante'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          {scale.notes && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Bitácora de Observaciones</span>
              <p className="text-slate-300 mt-1">{scale.notes}</p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Progreso general: <strong className="text-cyan-400 font-mono">{scale.tasksCompleted}/{scale.tasksTotal} hitos cumplidos</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenDisbursement(scale);
              }}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Ver Disbursement Account</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
