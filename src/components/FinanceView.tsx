import React, { useState } from 'react';
import { 
  Receipt, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Download, 
  Printer, 
  Send,
  Building2,
  Calendar
} from 'lucide-react';
import { Invoice, Scale, PortService } from '../types/maritime';

interface FinanceViewProps {
  invoices: Invoice[];
  scales: Scale[];
  portServices: PortService[];
  onOpenDisbursementModal: (scale: Scale) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  invoices,
  scales,
  portServices,
  onOpenDisbursementModal
}) => {
  const [subTab, setSubTab] = useState<'facturacion' | 'liquidaciones' | 'detracciones'>('facturacion');

  const totalInvoicedUsd = invoices
    .filter(i => i.currency === 'USD')
    .reduce((acc, i) => acc + i.total, 0);

  const totalDetractionsPen = invoices
    .filter(i => i.detractionAmount)
    .reduce((acc, i) => acc + (i.detractionAmount || 0) * 3.785, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Facturación & Finanzas</span>
            <span aria-hidden="true">·</span>
            <span>Comprobantes Electrónicos SUNAT / Detracciones Banco de la Nación</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Facturas Electrónicas, Detracciones y Disbursement Accounts
          </h1>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setSubTab('facturacion')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'facturacion' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Facturas Electrónicas ({invoices.length})
          </button>
          <button
            onClick={() => setSubTab('liquidaciones')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'liquidaciones' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Liquidación de Naves (DA)
          </button>
          <button
            onClick={() => setSubTab('detracciones')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'detracciones' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Detracciones SUNAT
          </button>
        </div>
      </div>

      {/* KPI Financial Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Total Facturado en Dólares</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            USD ${totalInvoicedUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Comprobantes válidos ante SUNAT</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Detracciones Pendientes (SPOT)</div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
            S/ {totalDetractionsPen.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Depósitos en Cta. Banco de la Nación</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Escalas con DA Abierta</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">
            {scales.filter(s => s.disbursementStatus === 'abierta').length} naves
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Disbursement accounts en curso</div>
        </div>
      </div>

      {/* SUBTAB 1: FACTURAS ELECTRÓNICAS (HU-FIN-004 / HU-FIN-005 / HU-FIN-007) */}
      {subTab === 'facturacion' && (
        <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">{inv.series}-{inv.number}</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {inv.type}
                  </span>
                  <span className="text-slate-400 font-mono">Ref: {inv.scaleReference}</span>
                </div>
                <div className="text-slate-200 mt-1 font-semibold">{inv.clientName}</div>
                <div className="text-[11px] text-slate-400">
                  RUC: <span className="font-mono text-slate-300">{inv.clientRuc}</span> · Vencimiento: {inv.dueDate}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-mono text-sm font-bold text-white">
                    {inv.currency} ${inv.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Base: ${inv.subtotal.toFixed(2)} + IGV 18%: ${inv.igv.toFixed(2)}
                  </div>
                  {inv.detractionAmount && (
                    <div className="text-[10px] text-amber-400 font-mono">
                      Detracción {inv.detractionRatePercent}%: ${inv.detractionAmount.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-semibold ${
                    inv.status === 'Pagado' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    inv.status === 'Aceptado SUNAT' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {inv.status}
                  </span>
                  <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" title="Descargar XML / CDR / PDF">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 2: LIQUIDACIÓN DE BUQUES (DISBURSEMENT ACCOUNT) (HU-FIN-013 / HU-FIN-014 / HU-FIN-015) */}
      {subTab === 'liquidaciones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scales.map((scale) => {
            const services = portServices.filter(s => s.scaleId === scale.id);
            const totalServices = services.reduce((acc, s) => acc + s.amount, 0);
            const agencyFee = 2500; // Contractual standard fee
            const estimatedDisbursement = totalServices + agencyFee;

            return (
              <div key={scale.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base font-display">{scale.vesselName}</h3>
                    <div className="text-xs font-mono text-cyan-400">{scale.scaleNumber}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Naviera: {scale.shippingLine}</div>
                  </div>
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                    scale.disbursementStatus === 'liquidada' 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  }`}>
                    DA {scale.disbursementStatus}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gastos Portuarios Comprobados:</span>
                    <span className="font-mono text-white">USD ${totalServices.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Honorarios de Agenciamiento (Fee):</span>
                    <span className="font-mono text-white">USD ${agencyFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-1 border-t border-slate-800 text-cyan-300">
                    <span>Total Disbursement Account:</span>
                    <span className="font-mono">USD ${estimatedDisbursement.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">DA Ref: {scale.disbursementNumber || 'DA-PENDIENTE'}</span>
                  <button
                    onClick={() => onOpenDisbursementModal(scale)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors"
                  >
                    Abrir Liquidación Final
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUBTAB 3: DETRACCIONES SUNAT */}
      {subTab === 'detracciones' && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold text-sm">Régimen de Detracciones SPOT (SUNAT / D.L. 940)</strong>
              Los servicios de transporte de carga y agenciamiento marítimo prestados en territorio peruano están sujetos al Sistema de Pago de Obligaciones Tributarias (SPOT). Los clientes deben depositar el porcentaje de ley (10% o 12%) en la cuenta del Banco de la Nación de la agencia antes de que se considere totalmente cancelada la obligación.
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 overflow-hidden divide-y divide-slate-800">
            {invoices.filter(i => i.detractionAmount).map((inv) => (
              <div key={inv.id} className="p-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white font-mono">{inv.series}-{inv.number} · {inv.clientName}</div>
                  <div className="text-slate-400 text-[11px]">RUC: {inv.clientRuc} · Factura total: ${inv.total.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-amber-400 font-bold">
                    S/ {((inv.detractionAmount || 0) * 3.785).toFixed(2)} (USD ${inv.detractionAmount?.toFixed(2)})
                  </div>
                  <div className="text-[10px] text-slate-400">Tasa: {inv.detractionRatePercent}% SPOT</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
