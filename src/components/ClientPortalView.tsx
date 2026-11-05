import React, { useState } from 'react';
import { 
  Building2, 
  Package, 
  FileText, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  Download, 
  Send, 
  ExternalLink,
  ShieldCheck,
  Search,
  MessageSquare
} from 'lucide-react';
import { CargoItem, Invoice } from '../types/maritime';

interface ClientPortalViewProps {
  cargoItems: CargoItem[];
  invoices: Invoice[];
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  cargoItems,
  invoices
}) => {
  const [activePortalTab, setActivePortalTab] = useState<'cargas' | 'documentos' | 'facturacion' | 'solicitud'>('cargas');
  const [requestedService, setRequestedService] = useState('');
  const [requestComment, setRequestComment] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Client view is filtered to ALICORP S.A.A. (RUC 20100055237) as representative user
  const clientCargo = cargoItems.filter(c => c.consigneeRuc === '20100055237');
  const clientInvoices = invoices.filter(i => i.clientRuc === '20100055237');

  const handleSendServiceRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedService) return;
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setRequestedService('');
      setRequestComment('');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Client Portal Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
          <Building2 className="w-4 h-4" />
          <span>PORTAL DE AUTOCONSULTA DE CLIENTES (HU-PTL-001 ~ HU-PTL-009)</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-display">
          Bienvenido, ALICORP S.A.A.
        </h1>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Consulta en tiempo real la trazabilidad de tus embarques marítimos, estado de liberación de conocimientos (BL), canal aduanero SUNAT, levante y comprobantes electrónicos sin intermediarios.
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
          <span>RUC: 20100055237</span>
          <span aria-hidden="true">·</span>
          <span>Sede Principal Callao</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-medium">Cuenta Activa</span>
        </div>
      </div>

      {/* Portal Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActivePortalTab('cargas')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activePortalTab === 'cargas' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Mis Cargas en Tránsito ({clientCargo.length})</span>
        </button>
        <button
          onClick={() => setActivePortalTab('documentos')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activePortalTab === 'documentos' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Documentos y BLs</span>
        </button>
        <button
          onClick={() => setActivePortalTab('facturacion')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activePortalTab === 'facturacion' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Facturación & Pagos ({clientInvoices.length})</span>
        </button>
        <button
          onClick={() => setActivePortalTab('solicitud')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activePortalTab === 'solicitud' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Solicitud de Servicios</span>
        </button>
      </div>

      {/* PORTAL TAB 1: CARGAS */}
      {activePortalTab === 'cargas' && (
        <div className="space-y-4">
          {clientCargo.map((c) => (
            <div key={c.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base font-mono">{c.blNumber}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Importación Callao
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{c.goodsDescription}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {c.commercialReleaseStatus === 'liberado' && c.damLevante ? (
                    <span className="px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Listo para Retiro (Gate Out)</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-md bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>En Trámite Operativo</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-slate-800">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block uppercase">1. Manifiesto SUNAT</span>
                  <span className="font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Aceptado
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block uppercase">2. Descarga Terminal</span>
                  <span className="font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Descargado (DP World)
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block uppercase">3. Canal & Levante</span>
                  <span className="font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Canal Verde (Levante OK)
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block uppercase">4. Liberación BL</span>
                  <span className="font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {c.commercialReleaseType || 'Liberado'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                <div>
                  Contenedores: <strong className="text-white font-mono">{c.containerNumbers?.join(', ')}</strong>
                </div>
                <div className="text-[11px] font-mono">
                  {c.packagesCount} bultos · {(c.grossWeightKg / 1000).toFixed(1)} TM
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PORTAL TAB 2: DOCUMENTOS */}
      {activePortalTab === 'documentos' && (
        <div className="space-y-4">
          <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden">
            <div className="p-4 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white">Copia no negociable Conocimiento de Embarque (Bill of Lading)</div>
                <div className="text-slate-400 text-[11px]">MSCUPE7829101 · Modalidad: Telex Release autorizado</div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200">
                <Download className="w-3.5 h-3.5" />
                <span>Descargar PDF</span>
              </button>
            </div>

            <div className="p-4 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white">Constancia de Levante Aduanero SUNAT</div>
                <div className="text-slate-400 text-[11px]">DAM 118-2026-10-184920 · Canal Verde</div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200">
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Constancia</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PORTAL TAB 3: FACTURACIÓN */}
      {activePortalTab === 'facturacion' && (
        <div className="space-y-4">
          <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden">
            {clientInvoices.map((inv) => (
              <div key={inv.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white font-mono">{inv.series}-{inv.number}</div>
                  <div className="text-slate-400 text-[11px]">Emisión: {inv.issueDate} · Vencimiento: {inv.dueDate}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-mono font-bold text-white">USD ${inv.total.toFixed(2)}</div>
                    <div className="text-[10px] text-amber-400">Detracción 12%: ${inv.detractionAmount?.toFixed(2)}</div>
                  </div>
                  <span className="px-2 py-1 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PORTAL TAB 4: SOLICITUD DE SERVICIOS */}
      {activePortalTab === 'solicitud' && (
        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 max-w-xl mx-auto space-y-4 text-xs">
          <h3 className="font-bold text-white text-base font-display">Solicitar Servicio Operativo a la Agencia</h3>
          <p className="text-slate-400">
            Envía tu requerimiento de transporte terrestre con Guía de Remisión, coordinación de balanza o visto bueno documental a nuestro equipo.
          </p>

          <form onSubmit={handleSendServiceRequest} className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1">Tipo de Servicio Solicitado</label>
              <select
                value={requestedService}
                onChange={(e) => setRequestedService(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                required
              >
                <option value="">Selecciona un servicio...</option>
                <option value="transporte">Transporte Terrestre Puerto - Planta Callao (con GRE)</option>
                <option value="visto_bueno">Emisión de Visto Bueno Documentario</option>
                <option value="inspeccion">Coordinación de Cuadrilla de Reconocimiento</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Comentarios / Referencia de Carga</label>
              <textarea
                value={requestComment}
                onChange={(e) => setRequestComment(e.target.value)}
                placeholder="Indica el número de contenedor o fecha solicitada de retiro..."
                rows={3}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white resize-none"
              />
            </div>

            {requestSubmitted ? (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solicitud registrada exitosamente con Ticket REQ-2026-0819. La agencia te notificará en breve.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Solicitud a Operaciones</span>
              </button>
            )}
          </form>
        </div>
      )}

    </div>
  );
};
