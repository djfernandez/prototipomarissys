import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  DollarSign, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Ship,
  Send
} from 'lucide-react';
import { Scale, PortService } from '../types/maritime';

interface DisbursementModalProps {
  scale: Scale | null;
  portServices: PortService[];
  onClose: () => void;
  onFinalizeDisbursement: (scaleId: string) => void;
}

export const DisbursementModal: React.FC<DisbursementModalProps> = ({
  scale,
  portServices,
  onClose,
  onFinalizeDisbursement
}) => {
  if (!scale) return null;

  const services = portServices.filter(s => s.scaleId === scale.id);
  const totalPortServices = services.reduce((acc, s) => acc + s.amount, 0);
  const agencyFee = 2500.00;
  const documentationFee = 450.00;
  const totalDisbursementUsd = totalPortServices + agencyFee + documentationFee;
  const advanceFundsReceived = 10000.00; // Simulated advance funds from line
  const balanceDue = totalDisbursementUsd - advanceFundsReceived;

  const handleFinalize = () => {
    onFinalizeDisbursement(scale.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base font-display">
                Cuenta de Liquidación de Escala (Disbursement Account)
              </h2>
              <div className="text-xs text-slate-400">
                {scale.vesselName} · Escala: {scale.scaleNumber} · {scale.portName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Imprimir liquidación"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Statement Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs text-slate-200">
          
          {/* Agency & Principal Lockup */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Agencia Marítima Emisora:</span>
              <strong className="text-white text-sm">MARISYS PERÚ S.A.C.</strong>
              <div className="text-slate-400 mt-0.5">RUC: 20601849201</div>
              <div className="text-slate-400">Av. Manco Cápac 340, Callao - Perú</div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Armador / Naviera Principal:</span>
              <strong className="text-white text-sm">{scale.shippingLine}</strong>
              <div className="text-slate-400 mt-0.5">Ref DA: {scale.disbursementNumber || 'DA-2026-CAL-088'}</div>
              <div className="text-cyan-400 font-mono">Moneda: USD (Dólares Americanos)</div>
            </div>
          </div>

          {/* Scale Summary Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400 block">Buque</span>
              <span className="font-semibold text-white">{scale.vesselName} (IMO {scale.imo})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Puerto / Terminal</span>
              <span className="font-semibold text-white">{scale.terminal}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Arribo / Zarpe</span>
              <span className="font-mono text-slate-300">
                {new Date(scale.actualArrival || scale.eta).toLocaleDateString('es-PE')} - {new Date(scale.actualDeparture || scale.etd).toLocaleDateString('es-PE')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Operación Carga</span>
              <span className="font-mono text-slate-300">
                Desc: {scale.containersIn} / Emb: {scale.containersOut} ctrs
              </span>
            </div>
          </div>

          {/* Itemized Disbursement Expenses Table */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm uppercase tracking-wide font-mono">
              Desglose de Gastos Portuarios y Servicios
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800 bg-slate-950/40">
              {/* Header row */}
              <div className="grid grid-cols-12 p-3 font-semibold text-slate-400 text-[11px] bg-slate-950">
                <div className="col-span-6">Concepto de Gasto / Servicio</div>
                <div className="col-span-3">Proveedor / Comprobante</div>
                <div className="col-span-3 text-right">Importe USD</div>
              </div>

              {/* Service rows */}
              {services.map((s) => (
                <div key={s.id} className="grid grid-cols-12 p-3 text-xs items-center hover:bg-slate-900/50">
                  <div className="col-span-6">
                    <div className="font-medium text-white capitalize">{s.serviceType.replace('_', ' ')}</div>
                    <div className="text-[10px] text-slate-400">{s.unit}</div>
                  </div>
                  <div className="col-span-3 font-mono text-slate-300">
                    <div>{s.providerName}</div>
                    <div className="text-[10px] text-slate-400">{s.invoiceNumber || 'Factura por adjuntar'}</div>
                  </div>
                  <div className="col-span-3 text-right font-mono font-semibold text-white">
                    ${s.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}

              {/* Agency Fees */}
              <div className="grid grid-cols-12 p-3 text-xs items-center bg-cyan-950/20">
                <div className="col-span-6">
                  <div className="font-medium text-cyan-300">Agency Attendance Fee (Honorarios de Agenciamiento)</div>
                  <div className="text-[10px] text-slate-400">Tarifario de Representación Marítima Callao</div>
                </div>
                <div className="col-span-3 text-slate-400 font-mono">MARISYS PERÚ</div>
                <div className="col-span-3 text-right font-mono font-semibold text-cyan-300">
                  ${agencyFee.toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-12 p-3 text-xs items-center bg-cyan-950/20">
                <div className="col-span-6">
                  <div className="font-medium text-cyan-300">Gastos Documentarios y Despacho SUNAT / DICAPI</div>
                  <div className="text-[10px] text-slate-400">Transmisión telemática y archivo de escala</div>
                </div>
                <div className="col-span-3 text-slate-400 font-mono">MARISYS PERÚ</div>
                <div className="col-span-3 text-right font-mono font-semibold text-cyan-300">
                  ${documentationFee.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Totals & Advance Account Reconciliation */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Total Liquidación de Escala (Disbursement Total):</span>
              <span className="font-mono font-bold text-white text-sm">
                USD ${totalDisbursementUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span>Anticipo de Fondos Recibido (Cash to Master / Pre-funding):</span>
              <span className="font-mono text-emerald-400">
                (-) USD ${advanceFundsReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
              <span className={balanceDue >= 0 ? 'text-amber-400' : 'text-emerald-400'}>
                {balanceDue >= 0 ? 'Saldo Exigible a la Naviera (Balance Due to Agents):' : 'Saldo a Favor del Armador (Refund to Principal):'}
              </span>
              <span className="font-mono text-cyan-300">
                USD ${Math.abs(balanceDue).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Estado de Liquidación: <strong className="text-white uppercase font-mono">{scale.disbursementStatus}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
            >
              Cerrar
            </button>
            {scale.disbursementStatus !== 'cerrada' && (
              <button
                onClick={handleFinalize}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cerrar Liquidación Final y Enviar a Naviera</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
