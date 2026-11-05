import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  Ship, 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  Ban, 
  ShieldCheck, 
  Anchor, 
  MapPin, 
  DollarSign, 
  Package,
  Layers,
  Info
} from 'lucide-react';
import { MasterBLDetailed, Scale, Container } from '../types/maritime';

interface MasterBLViewModalProps {
  masterBL: MasterBLDetailed | null;
  scales: Scale[];
  containers: Container[];
  onClose: () => void;
  onUpdateMasterBL: (updated: MasterBLDetailed) => void;
}

export const MasterBLViewModal: React.FC<MasterBLViewModalProps> = ({
  masterBL,
  scales,
  containers,
  onClose,
  onUpdateMasterBL
}) => {
  const [isAmending, setIsAmending] = useState(false);
  const [isAnnulling, setIsAnnulling] = useState(false);
  const [amendmentText, setAmendmentText] = useState('');
  const [annulmentReasonText, setAnnulmentReasonText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!masterBL) return null;

  // Criterion 4 verification: verify containers exist in the scale's container registry
  const scaleContainers = containers.filter(c => c.scaleId === masterBL.scaleId);
  const scaleContainerNumbers = new Set(scaleContainers.map(c => c.number));
  const missingContainers = masterBL.containers.filter(c => !scaleContainerNumbers.has(c.containerNumber));
  const allContainersExistInScale = missingContainers.length === 0;

  // Total freight calculation
  const totalFreight = masterBL.freightCharges.reduce((acc, f) => acc + f.rate, 0);

  const handleSaveAmendment = () => {
    if (!amendmentText.trim()) {
      setErrorMessage('Debes indicar el detalle o motivo de la enmienda.');
      return;
    }
    const updated: MasterBLDetailed = {
      ...masterBL,
      status: 'enmendado',
      amendmentNotes: `${masterBL.amendmentNotes ? masterBL.amendmentNotes + ' | ' : ''}Enmienda (${new Date().toLocaleDateString('es-PE')}): ${amendmentText.trim()}`
    };
    onUpdateMasterBL(updated);
    setIsAmending(false);
    setAmendmentText('');
    setErrorMessage('');
  };

  const handleConfirmAnnulment = () => {
    if (!annulmentReasonText.trim()) {
      setErrorMessage('Criterio de aceptación 3: La anulación exige motivo obligatorio y no borra el número.');
      return;
    }
    const updated: MasterBLDetailed = {
      ...masterBL,
      status: 'anulado',
      annulmentReason: `Anulado el ${new Date().toLocaleString('es-PE')}. Motivo: ${annulmentReasonText.trim()}`
    };
    onUpdateMasterBL(updated);
    setIsAnnulling(false);
    setAnnulmentReasonText('');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top App Header */}
        <div className="p-4 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-bold text-white text-base sm:text-lg font-display">
                  Master Bill of Lading (Master BL) — Vista Detallada
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  HU-DOC-004-01
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Documento de Embarque Marítimo Internacional · Regulado por APN, DICAPI y SUNAT Aduanas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Imprimir copia Master BL"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-300 bg-slate-900/60">
          
          {/* Top Status & Controls Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Estado del Documento</span>
                <div className="flex items-center gap-2 mt-0.5">
                  {masterBL.status === 'emitido' && (
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      EMITIDO Y VIGENTE
                    </span>
                  )}
                  {masterBL.status === 'enmendado' && (
                    <span className="px-2.5 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-blue-300 font-bold text-xs flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                      ENMENDADO
                    </span>
                  )}
                  {masterBL.status === 'anulado' && (
                    <span className="px-2.5 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-300 font-bold text-xs flex items-center gap-1.5">
                      <Ban className="w-3.5 h-3.5 text-rose-400" />
                      ANULADO (N° {masterBL.masterBLNumber} CONSERVADO)
                    </span>
                  )}
                </div>
              </div>

              <div className="h-7 w-px bg-slate-800 hidden sm:block" />

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Línea Naviera Representada</span>
                <span className="font-semibold text-white">{masterBL.shippingLine}</span>
              </div>
            </div>

            {/* Quick Actions (Amend / Annull) */}
            {masterBL.status !== 'anulado' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAmending(true);
                    setIsAnnulling(false);
                    setErrorMessage('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Enmendar BL</span>
                </button>

                <button
                  onClick={() => {
                    setIsAnnulling(true);
                    setIsAmending(false);
                    setErrorMessage('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-medium transition-colors flex items-center gap-1.5"
                >
                  <Ban className="w-3.5 h-3.5 text-rose-400" />
                  <span>Anular con Motivo</span>
                </button>
              </div>
            )}
          </div>

          {/* Annulment / Amendment Banners if active */}
          {masterBL.status === 'anulado' && masterBL.annulmentReason && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-rose-300">Constancia de Anulación Formal (Criterio 3):</strong>
                <p className="mt-0.5 text-rose-200 leading-relaxed font-mono text-[11px]">{masterBL.annulmentReason}</p>
              </div>
            </div>
          )}

          {masterBL.amendmentNotes && (
            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/50 text-blue-200 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-blue-300">Historial de Enmiendas Documentarias:</strong>
                <p className="mt-0.5 text-blue-100 font-mono text-[11px]">{masterBL.amendmentNotes}</p>
              </div>
            </div>
          )}

          {/* Interactive Amendment Dialog Form */}
          {isAmending && (
            <div className="p-4 rounded-xl bg-slate-950 border border-blue-800/80 space-y-3">
              <div className="flex items-center justify-between text-blue-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4" />
                  <span>Registrar Enmienda al Master BL</span>
                </span>
                <button onClick={() => setIsAmending(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-slate-300">
                Indica los cambios efectuados (descripción, bultos, flete o instrucciones). La enmienda quedará asentada en la bitácora conservando el historial.
              </p>
              <textarea
                value={amendmentText}
                onChange={(e) => setAmendmentText(e.target.value)}
                placeholder="Ejemplo: Rectificación en la descripción arancelaria a solicitud de aduanas..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs resize-none focus:outline-none focus:border-blue-500"
              />
              {errorMessage && <p className="text-rose-400 text-[11px]">{errorMessage}</p>}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAmending(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveAmendment}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
                >
                  Guardar Enmienda
                </button>
              </div>
            </div>
          )}

          {/* Interactive Annulment Dialog Form */}
          {isAnnulling && (
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-800/80 space-y-3">
              <div className="flex items-center justify-between text-rose-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Ban className="w-4 h-4" />
                  <span>Anulación del Master BL (Criterio 3: Exige motivo y conserva el registro)</span>
                </span>
                <button onClick={() => setIsAnnulling(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-slate-300">
                La anulación no eliminará el registro ni liberará el número arbitrariamente. Debe justificarse el motivo formal ante la naviera y SUNAT.
              </p>
              <textarea
                value={annulmentReasonText}
                onChange={(e) => setAnnulmentReasonText(e.target.value)}
                placeholder="Indica el motivo de anulación (ej: Carga reasignada a nuevo viaje por cut-off de terminal, error de emisión en origen, etc.)..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs resize-none focus:outline-none focus:border-rose-500"
                required
              />
              {errorMessage && <p className="text-rose-400 text-[11px]">{errorMessage}</p>}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAnnulling(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmAnnulment}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
                >
                  Confirmar Anulación
                </button>
              </div>
            </div>
          )}

          {/* THE MASTER BILL OF LADING DOCUMENT CANVAS */}
          <div className="border border-slate-700/80 rounded-xl bg-slate-950 overflow-hidden shadow-xl text-slate-200">
            
            {/* Top Document Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-bold block">
                  {masterBL.shippingLine}
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  NON-NEGOTIABLE COPY · BILL OF LADING FOR OCEAN TRANSPORT
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">B/L NUMBER</span>
                <span className="font-mono text-base font-extrabold text-cyan-400 tracking-wider">
                  {masterBL.masterBLNumber}
                </span>
              </div>
            </div>

            {/* Zone A: Parties Grid (Shipper, Consignee, Notify) */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 border-b border-slate-800">
              
              {/* Shipper */}
              <div className="p-4 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                  1. Embarcador / Shipper
                </span>
                <div className="font-bold text-white text-xs">{masterBL.shipper.name}</div>
                <div className="text-[11px] text-slate-400 leading-snug">{masterBL.shipper.address}</div>
                <div className="text-[11px] text-slate-300 font-medium">{masterBL.shipper.country}</div>
                {masterBL.shipper.taxId && (
                  <div className="text-[10px] font-mono text-slate-400">{masterBL.shipper.taxId}</div>
                )}
              </div>

              {/* Consignee */}
              <div className="p-4 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                  2. Consignatario / Consignee
                </span>
                <div className="font-bold text-white text-xs">{masterBL.consignee.name}</div>
                <div className="text-cyan-400 font-mono text-xs font-semibold">RUC: {masterBL.consignee.ruc}</div>
                <div className="text-[11px] text-slate-400 leading-snug">{masterBL.consignee.address}</div>
                <div className="text-[11px] text-slate-300">{masterBL.consignee.city}, {masterBL.consignee.country}</div>
              </div>

              {/* Notify Party */}
              <div className="p-4 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                  3. Notificador / Notify Party
                </span>
                <div className="font-bold text-white text-xs">{masterBL.notifyParty.name}</div>
                {masterBL.notifyParty.ruc && (
                  <div className="text-slate-400 font-mono text-[11px]">RUC: {masterBL.notifyParty.ruc}</div>
                )}
                <div className="text-[11px] text-slate-400 leading-snug">{masterBL.notifyParty.address}</div>
                <div className="text-[10px] text-cyan-300 mt-1 leading-snug">{masterBL.notifyParty.contact}</div>
              </div>
            </div>

            {/* Zone B: Voyage, Ports & Route (Criterio 1: Escala o viaje, origen, descarga, puerto final) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border-b border-slate-800 p-3 bg-slate-950/70 text-xs">
              <div className="p-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Buque & Viaje / Escala</span>
                <div className="font-bold text-white mt-0.5">{masterBL.vesselName}</div>
                <div className="font-mono text-cyan-400 text-[11px]">Viaje {masterBL.voyageNumber} · {masterBL.scaleNumber}</div>
              </div>

              <div className="p-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Puerto de Origen / Carga</span>
                <div className="font-semibold text-white mt-0.5">{masterBL.originPort}</div>
              </div>

              <div className="p-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Puerto de Descarga</span>
                <div className="font-semibold text-white mt-0.5">{masterBL.dischargePort}</div>
              </div>

              <div className="p-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Puerto Final / Entrega</span>
                <div className="font-semibold text-white mt-0.5">{masterBL.finalDestinationPort}</div>
              </div>
            </div>

            {/* Zone C: Marks, Numbers & Goods Description (Criterio 1: Marcas y Números, Descripción, Peso, Volumen, Bultos) */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800 border-b border-slate-800">
              
              {/* Marcas y Números */}
              <div className="md:col-span-4 p-4 space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                  Marcas y Números / Marks & Numbers
                </span>
                <div className="font-mono text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                  {masterBL.marksAndNumbers}
                </div>
              </div>

              {/* Descripción de Mercadería */}
              <div className="md:col-span-5 p-4 space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                  Descripción de la Mercadería / Description of Goods
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  {masterBL.goodsDescription}
                </p>
                <div className="text-[11px] text-slate-400">
                  Tipo de empaque declarado: <strong className="text-white">{masterBL.packageType}</strong>
                </div>
              </div>

              {/* Totales: Bultos, Peso y Volumen */}
              <div className="md:col-span-3 p-4 space-y-3 bg-slate-900/30">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                  Totales Consolidados
                </span>

                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Total Bultos</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {masterBL.totalPackages.toLocaleString()} Bultos
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Total Peso Bruto</span>
                    <span className="font-mono font-bold text-cyan-300 text-sm">
                      {masterBL.totalGrossWeightKg.toLocaleString()} KGS
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      ({(masterBL.totalGrossWeightKg / 1000).toFixed(2)} TM)
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Total Volumen</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {masterBL.totalVolumeCbm.toFixed(2)} CBM (m³)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone D: Fletes Detallados (Criterio 1: Fletes, detalla 3 mínimo) */}
            <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-xs uppercase tracking-wider font-mono text-white">
                    Desglose de Fletes y Recargos Navieros (Mínimo 3 ítems detallados)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Modalidad de Pago:</span>
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {masterBL.freightPaymentTerm}
                  </span>
                </div>
              </div>

              {/* Freight table */}
              <div className="rounded-lg border border-slate-800 overflow-hidden divide-y divide-slate-800 text-xs">
                <div className="grid grid-cols-12 p-2.5 font-semibold text-slate-400 bg-slate-900/90 text-[11px] font-mono">
                  <div className="col-span-6">Concepto de Flete / Recargo</div>
                  <div className="col-span-3 text-center">Condición</div>
                  <div className="col-span-3 text-right">Importe</div>
                </div>

                {masterBL.freightCharges.map((f, i) => (
                  <div key={i} className="grid grid-cols-12 p-2.5 items-center hover:bg-slate-900/40">
                    <div className="col-span-6 font-medium text-slate-200">{f.concept}</div>
                    <div className="col-span-3 text-center">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {f.prepaidOrCollect}
                      </span>
                    </div>
                    <div className="col-span-3 text-right font-mono font-bold text-white">
                      {f.currency} ${f.rate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-12 p-3 items-center bg-slate-900 text-xs font-bold border-t border-slate-700">
                  <div className="col-span-9 text-slate-300 uppercase font-mono">Total Flete y Gastos Marítimos:</div>
                  <div className="col-span-3 text-right font-mono text-cyan-300 text-sm">
                    USD ${totalFreight.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>

            {/* Zone E: Listado de Contenedores (Criterio 1: número, tamaño, tipo y precinto, 5 mínimo; Criterio 4: existencia en escala) */}
            <div className="p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-xs uppercase tracking-wider font-mono text-white">
                    Listado de Contenedores Asociados ({masterBL.containers.length} equipos · Mínimo 5 exigidos)
                  </span>
                </div>

                {/* Criterion 4 Verification Badge */}
                {allContainersExistInScale ? (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Registro Conforme: Todos los contenedores existen en la escala {masterBL.scaleNumber}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Advertencia: Hay contenedores no registrados en la escala activa</span>
                  </div>
                )}
              </div>

              {/* Containers Table */}
              <div className="rounded-lg border border-slate-800 overflow-hidden divide-y divide-slate-800 text-xs">
                <div className="grid grid-cols-12 p-2.5 font-semibold text-slate-400 bg-slate-900/90 text-[11px] font-mono">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-3">N° de Contenedor</div>
                  <div className="col-span-2">Tamaño / Tipo</div>
                  <div className="col-span-3">N° de Precinto (Seal)</div>
                  <div className="col-span-3 text-right">Tara / Carga Neta</div>
                </div>

                {masterBL.containers.map((cnt, idx) => {
                  const existsInScale = scaleContainerNumbers.has(cnt.containerNumber);
                  return (
                    <div key={cnt.containerNumber} className="grid grid-cols-12 p-2.5 items-center hover:bg-slate-900/40 font-mono">
                      <div className="col-span-1 text-center text-slate-500 font-sans">{idx + 1}</div>
                      
                      <div className="col-span-3 font-bold text-white flex items-center gap-1.5">
                        <span>{cnt.containerNumber}</span>
                        {existsInScale && (
                          <span title="Verificado en la escala" className="text-emerald-400 text-xs font-sans">✓</span>
                        )}
                      </div>

                      <div className="col-span-2 text-slate-300">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px]">
                          {cnt.size} {cnt.type}
                        </span>
                      </div>

                      <div className="col-span-3 text-slate-300">
                        <span className="font-semibold text-slate-100">{cnt.sealNumber}</span>
                      </div>

                      <div className="col-span-3 text-right text-slate-400 text-[11px]">
                        Tara: {cnt.tareKg} kg · Net: <strong className="text-white">{cnt.payloadKg.toLocaleString()} kg</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Document Signature & Issue Place */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] text-slate-400">
              <div>
                <span>Lugar y Fecha de Emisión:</span>
                <div className="font-medium text-white mt-0.5">
                  {masterBL.issuePlace} · {new Date(masterBL.issueDate).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span>Agente Marítimo Emisor en Perú:</span>
                <div className="font-bold text-cyan-300 mt-0.5">
                  MARISYS PERÚ S.A.C. as Agents for the Carrier {masterBL.shippingLine}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400">
            Regla de Negocio: <strong className="text-white font-mono">{masterBL.masterBLNumber}</strong> (Unicidad verificada por naviera y viaje según Criterio 2).
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
            >
              Cerrar Vista
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Copia PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
