import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  ShieldCheck, 
  Plus, 
  FileCheck2, 
  FileCode, 
  Search, 
  Eye, 
  Layers, 
  DollarSign, 
  Package, 
  Edit3,
  Ban
} from 'lucide-react';
import { Manifest, CargoItem, Scale, MasterBLDetailed, Container } from '../types/maritime';
import { MasterBLViewModal } from './MasterBLViewModal';

interface DocumentationViewProps {
  manifests: Manifest[];
  cargoItems: CargoItem[];
  scales: Scale[];
  masterBLs: MasterBLDetailed[];
  containers: Container[];
  onUpdateManifest: (updated: Manifest) => void;
  onUpdateMasterBL: (updated: MasterBLDetailed) => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  manifests,
  cargoItems,
  scales,
  masterBLs,
  containers,
  onUpdateManifest,
  onUpdateMasterBL
}) => {
  const [subTab, setSubTab] = useState<'manifiestos' | 'master_bl' | 'house_bl' | 'certificados'>('master_bl');
  const [transmittingManifestId, setTransmittingManifestId] = useState<string | null>(null);
  const [selectedMasterBL, setSelectedMasterBL] = useState<MasterBLDetailed | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTransmitSunat = (manifest: Manifest) => {
    setTransmittingManifestId(manifest.id);
    setTimeout(() => {
      const updated: Manifest = {
        ...manifest,
        status: 'aceptado',
        sunatTicket: `SUNAT-RC-${Math.floor(1000000 + Math.random() * 9000000)}`,
        sunatAcceptanceDate: new Date().toISOString()
      };
      onUpdateManifest(updated);
      setTransmittingManifestId(null);
    }, 1200);
  };

  const filteredMasterBLs = masterBLs.filter(m => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        m.masterBLNumber.toLowerCase().includes(q) ||
        m.consignee.name.toLowerCase().includes(q) ||
        m.consignee.ruc.includes(q) ||
        m.vesselName.toLowerCase().includes(q) ||
        m.voyageNumber.toLowerCase().includes(q) ||
        m.shippingLine.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Documentación Marítima</span>
            <span aria-hidden="true">·</span>
            <span>SUNAT Aduanas / DICAPI</span>
            <span aria-hidden="true">·</span>
            <span>Bill of Lading (Master & House)</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Manifiestos, Conocimientos Master BL y Certificados
          </h1>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto self-start md:self-auto">
          <button
            onClick={() => setSubTab('master_bl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              subTab === 'master_bl' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Master BL - Vista ({masterBLs.length})
          </button>
          <button
            onClick={() => setSubTab('manifiestos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              subTab === 'manifiestos' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Manifiestos SUNAT ({manifests.length})
          </button>
          <button
            onClick={() => setSubTab('house_bl')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              subTab === 'house_bl' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            House BL Consolidados
          </button>
          <button
            onClick={() => setSubTab('certificados')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              subTab === 'certificados' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Certificados (SENASA / DIGESA)
          </button>
        </div>
      </div>

      {/* SUBTAB: MASTER BL - VISTA (HU-DOC-004-01) */}
      {subTab === 'master_bl' && (
        <div className="space-y-4">
          
          {/* Regulatory Context Banner */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <strong className="text-white font-semibold">HU-DOC-004-01 — Master BL - Vista</strong>
                <span className="text-[10px] font-mono px-2 py-0.2 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">
                  Actor: Documentador
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Revisa la información completa y detallada del Master BL emitido por la naviera representada (escala, viaje, puertos de origen, descarga y final, embarcador, consignatario, notificador, marcas y números, descripción de mercadería, totales de peso, volumen y bultos, fletes desglosados y contenedores con precintos).
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por Master BL, naviera, consignatario RUC o nave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="text-xs text-slate-400">
              Mostrando <strong className="text-white font-mono">{filteredMasterBLs.length}</strong> Master BLs emitidos
            </div>
          </div>

          {/* Master BL List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredMasterBLs.map((mbl) => {
              const isEmitted = mbl.status === 'emitido';
              const isAmended = mbl.status === 'enmendado';
              const isAnnulled = mbl.status === 'anulado';

              return (
                <div 
                  key={mbl.id}
                  className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-extrabold text-base text-cyan-300 tracking-wider">
                          {mbl.masterBLNumber}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          Master BL
                        </span>
                        
                        {/* Status badge */}
                        {isEmitted && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            Emitido
                          </span>
                        )}
                        {isAmended && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                            Enmendado
                          </span>
                        )}
                        {isAnnulled && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                            Anulado
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-300 mt-1">
                        Naviera: <strong className="text-white">{mbl.shippingLine}</strong> · Buque: <span className="font-semibold">{mbl.vesselName}</span> (Viaje: {mbl.voyageNumber} · Escala: {mbl.scaleNumber})
                      </div>
                    </div>

                    {/* Primary Button to Open Detailed View (HU-DOC-004-01) */}
                    <button
                      onClick={() => setSelectedMasterBL(mbl)}
                      className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-cyan-600/20 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Master BL Detallado</span>
                    </button>
                  </div>

                  {/* Summary Grid with Parties and Routes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Embarcador / Shipper</span>
                      <div className="font-semibold text-slate-200 truncate mt-0.5">{mbl.shipper.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{mbl.shipper.country}</div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Consignatario / Consignee</span>
                      <div className="font-semibold text-white truncate mt-0.5">{mbl.consignee.name}</div>
                      <div className="text-[11px] text-cyan-400 font-mono">RUC: {mbl.consignee.ruc}</div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Ruta Marítima</span>
                      <div className="text-slate-200 truncate mt-0.5">
                        {mbl.originPort} → <strong className="text-cyan-300">{mbl.dischargePort}</strong>
                      </div>
                      <div className="text-[11px] text-slate-400">Destino final: {mbl.finalDestinationPort}</div>
                    </div>
                  </div>

                  {/* Cargo & Containers summary row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800/60 bg-slate-950/40 p-2.5 rounded-lg">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Bultos Declarados</span>
                      <span className="font-mono font-bold text-white">{mbl.totalPackages} {mbl.packageType}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Peso Bruto & Volumen</span>
                      <span className="font-mono font-bold text-white">
                        {(mbl.totalGrossWeightKg / 1000).toFixed(2)} TM · {mbl.totalVolumeCbm} CBM
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Contenedores</span>
                      <span className="font-mono font-bold text-cyan-300">
                        {mbl.containers.length} equipos (40HC/20GP)
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Fletes ({mbl.freightCharges.length} conceptos)</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {mbl.freightPaymentTerm}
                      </span>
                    </div>
                  </div>

                  {isAnnulled && mbl.annulmentReason && (
                    <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-[11px] font-mono">
                      {mbl.annulmentReason}
                    </div>
                  )}

                  {isAmended && mbl.amendmentNotes && (
                    <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-800 text-blue-300 text-[11px] font-mono">
                      {mbl.amendmentNotes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* SUBTAB 2: MANIFIESTOS SUNAT (HU-DOC-001 / HU-DOC-002 / HU-DOC-003) */}
      {subTab === 'manifiestos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <FileCode className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Transmisión Telemática de Manifiesto de Carga ante SUNAT</strong>
              El manifiesto de ingreso o salida consolida los conocimientos de embarque, contenedores y pesos de la nave. Debe transmitirse antes del arribo (ingreso) o previo al zarpe (salida) según el procedimiento aduanero DESPA-PG.09 de SUNAT.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {manifests.map((m) => {
              const isAccepted = m.status === 'aceptado';
              const isDraft = m.status === 'borrador';
              const isTransmitted = m.status === 'transmitido';

              return (
                <div 
                  key={m.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white font-mono">{m.manifestNumber}</span>
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                          m.type === 'ingreso' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }`}>
                          Manifiesto de {m.type}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Viaje: {m.voyageNumber}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Buque: <strong className="text-slate-200">{m.vesselName}</strong> · Puerto del Callao (Aduana 118)
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {isDraft && (
                        <button
                          disabled={transmittingManifestId === m.id}
                          onClick={() => handleTransmitSunat(m)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{transmittingManifestId === m.id ? 'Transmitiendo a SUNAT...' : 'Transmitir a SUNAT'}</span>
                        </button>
                      )}

                      {isTransmitted && (
                        <span className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          En Evaluación SUNAT
                        </span>
                      )}

                      {isAccepted && (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Aceptado por SUNAT
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Total Conocimientos (BL)</span>
                      <span className="font-mono font-medium text-slate-200">{m.totalBLs} BLs declarados</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Total Contenedores</span>
                      <span className="font-mono font-medium text-slate-200">{m.totalContainers} equipos</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Peso Bruto Total</span>
                      <span className="font-mono font-medium text-slate-200">{(m.totalWeightKg / 1000).toLocaleString()} TM</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Constancia / Ticket SUNAT</span>
                      <span className="font-mono font-medium text-cyan-400">{m.sunatTicket || 'En preparación'}</span>
                    </div>
                  </div>

                  {m.observationDetails && (
                    <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-300">
                      <strong>Observación de Cierre:</strong> {m.observationDetails}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: HOUSE BL */}
      {subTab === 'house_bl' && (
        <div className="space-y-4">
          <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden">
            {cargoItems.map((c) => (
              <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{c.blNumber}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">House BL</span>
                    <span className="text-slate-400">· {c.type === 'importacion' ? 'Descarga Callao' : 'Embarque Callao'}</span>
                  </div>
                  <div className="text-slate-300 mt-1 font-medium">{c.consigneeOrShipper}</div>
                  <div className="text-[11px] text-slate-400">{c.goodsDescription}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400 font-mono">{c.packagesCount} bultos · {c.grossWeightKg.toLocaleString()} kg</div>
                    <div className="text-[11px] font-medium text-cyan-400 mt-0.5">
                      {c.commercialReleaseStatus === 'liberado' ? (
                        <span className="text-emerald-400">Liberado ({c.commercialReleaseType})</span>
                      ) : (
                        <span className="text-amber-400">Flete / Documento Retenido</span>
                      )}
                    </div>
                  </div>

                  <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" title="Descargar copia PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: CERTIFICADOS */}
      {subTab === 'certificados' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  SENASA · Sanidad Agraria
                </span>
                <h3 className="font-bold text-white text-sm mt-1.5">Certificado Fitosanitario de Exportación</h3>
                <div className="text-xs font-mono text-cyan-400">SENASA-CL-2026-09418</div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Vigente
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Ampara 108,000 kg de Palta Hass fresca de CAMPOSOL S.A. para destino en Róterdam (Países Bajos).
            </p>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex justify-between">
              <span>Vencimiento: 28 Nov 2026</span>
              <span className="text-cyan-400 font-mono">BL: MSCUPE7829201</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  DIGESA · Inocuidad Alimentaria
                </span>
                <h3 className="font-bold text-white text-sm mt-1.5">Autorización Sanitaria de Insumos</h3>
                <div className="text-xs font-mono text-cyan-400">DIGESA-AUT-2026-8819</div>
              </div>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Inspección requerida
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Sujeto a toma de muestras en depósito temporal para QUÍMICA SUIZA S.A.C. (Canal Rojo aduanero).
            </p>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex justify-between">
              <span>Vencimiento: 15 Dic 2026</span>
              <span className="text-cyan-400 font-mono">BL: MAEU481029481</span>
            </div>
          </div>
        </div>
      )}

      {/* MASTER BL DETAILED MODAL (HU-DOC-004-01) */}
      <MasterBLViewModal
        masterBL={selectedMasterBL}
        scales={scales}
        containers={containers}
        onClose={() => setSelectedMasterBL(null)}
        onUpdateMasterBL={(updated) => {
          onUpdateMasterBL(updated);
          setSelectedMasterBL(updated);
        }}
      />

    </div>
  );
};
