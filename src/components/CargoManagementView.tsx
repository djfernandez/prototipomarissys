import React, { useState } from 'react';
import { 
  Package, 
  Thermometer, 
  Flame, 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileCheck, 
  ShieldAlert, 
  Filter,
  Plus,
  ArrowRight,
  Snowflake,
  ExternalLink
} from 'lucide-react';
import { CargoItem, Container, Scale } from '../types/maritime';

interface CargoManagementViewProps {
  cargoItems: CargoItem[];
  containers: Container[];
  scales: Scale[];
  onUpdateCargoItem: (updated: CargoItem) => void;
  onUpdateContainer: (updated: Container) => void;
}

export const CargoManagementView: React.FC<CargoManagementViewProps> = ({
  cargoItems,
  containers,
  scales,
  onUpdateCargoItem,
  onUpdateContainer
}) => {
  const [activeCategory, setActiveCategory] = useState<'importaciones' | 'exportaciones' | 'contenedores' | 'especial'>('importaciones');
  const [searchQuery, setSearchQuery] = useState('');
  const [releasingCargo, setReleasingCargo] = useState<CargoItem | null>(null);
  const [releaseType, setReleaseType] = useState<'Original BL' | 'Telex Release' | 'Sea Waybill'>('Telex Release');

  const filteredCargo = cargoItems.filter(item => {
    if (activeCategory === 'importaciones' && item.type !== 'importacion') return false;
    if (activeCategory === 'exportaciones' && item.type !== 'exportacion') return false;
    if (activeCategory === 'especial' && !item.isReefer && !item.isDangerous && !item.isOversized) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.blNumber.toLowerCase().includes(q) ||
        item.consigneeOrShipper.toLowerCase().includes(q) ||
        item.consigneeRuc.includes(q) ||
        item.goodsDescription.toLowerCase().includes(q) ||
        (item.containerNumbers && item.containerNumbers.some(c => c.toLowerCase().includes(q)))
      );
    }
    return true;
  });

  const filteredContainers = containers.filter(c => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.number.toLowerCase().includes(q) ||
        c.blNumber.toLowerCase().includes(q) ||
        c.sealNumber.toLowerCase().includes(q) ||
        c.currentLocation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleConfirmRelease = () => {
    if (!releasingCargo) return;
    const updated: CargoItem = {
      ...releasingCargo,
      commercialReleaseStatus: 'liberado',
      commercialReleaseType: releaseType,
      commercialReleaseDate: new Date().toISOString()
    };
    onUpdateCargoItem(updated);
    setReleasingCargo(null);
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Gestión de Carga</span>
            <span aria-hidden="true">·</span>
            <span>Comercio Exterior Perú</span>
            <span aria-hidden="true">·</span>
            <span>SUNAT / SENASA / MTC</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Control de Mercancías, Contenedores y Cargas Especiales
          </h1>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setActiveCategory('importaciones')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeCategory === 'importaciones' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Importaciones
          </button>
          <button
            onClick={() => setActiveCategory('exportaciones')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeCategory === 'exportaciones' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Exportaciones
          </button>
          <button
            onClick={() => setActiveCategory('contenedores')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeCategory === 'contenedores' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Contenedores & Tracking
          </button>
          <button
            onClick={() => setActiveCategory('especial')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeCategory === 'especial' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Carga Especial (Reefer/IMO/MTC)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por BL, RUC, cliente, contenedor o mercancía..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="text-xs text-slate-400">
          Mostrando <strong className="text-white font-mono">{activeCategory === 'contenedores' ? filteredContainers.length : filteredCargo.length}</strong> registros
        </div>
      </div>

      {/* CATEGORY: IMPORTACIONES & EXPORTACIONES & ESPECIAL */}
      {activeCategory !== 'contenedores' ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredCargo.map((item) => {
            const isReleasedCommercial = item.commercialReleaseStatus === 'liberado';
            const hasLevante = item.damLevante;
            const canExitTerminal = isReleasedCommercial && hasLevante;

            return (
              <div 
                key={item.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-white text-base font-display">{item.consigneeOrShipper}</span>
                      <span className="text-xs font-mono text-cyan-400">RUC {item.consigneeRuc}</span>
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
                        item.type === 'importacion' 
                          ? 'bg-blue-950/70 border border-blue-800/60 text-blue-300' 
                          : 'bg-emerald-950/70 border border-emerald-800/60 text-emerald-300'
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 mt-1">
                      {item.goodsDescription}
                    </div>
                  </div>

                  {/* Actions & Commercial Release */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {item.type === 'importacion' && !isReleasedCommercial && (
                      <button
                        onClick={() => setReleasingCargo(item)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
                      >
                        Liberar BL Comercial
                      </button>
                    )}
                    {isReleasedCommercial && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.commercialReleaseType || 'Liberado'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Logistics Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Conocimiento / BL</span>
                    <span className="font-mono font-medium text-slate-200">{item.blNumber}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">Bultos / Peso Bruto</span>
                    <span className="font-mono text-slate-200">
                      {item.packagesCount.toLocaleString()} bultos · {item.grossWeightKg.toLocaleString()} kg
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">DAM Aduanera SUNAT</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-mono text-slate-200">{item.damNumber || 'Pendiente'}</span>
                      {item.damChannel && (
                        <span className={`text-[9px] font-bold uppercase px-1 rounded ${
                          item.damChannel === 'verde' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          item.damChannel === 'naranja' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {item.damChannel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">Salida Terminal (Gate Out)</span>
                    <div className="mt-0.5">
                      {canExitTerminal ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Habilitado con Levante
                        </span>
                      ) : (
                        <span className="text-amber-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Bloqueado (Falta levante o BL)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Special Tags: Reefer, Dangerous, Oversized */}
                {(item.isReefer || item.isDangerous || item.isOversized) && (
                  <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
                    {item.isReefer && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-[11px] font-mono">
                        <Snowflake className="w-3 h-3" />
                        Reefer: {item.reeferTempC}°C (Cadena Frío SENASA)
                      </span>
                    )}
                    {item.isDangerous && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800/80 text-rose-300 text-[11px] font-mono">
                        <Flame className="w-3 h-3" />
                        IMO Peligrosa: {item.imoClass} · {item.unNumber}
                      </span>
                    )}
                    {item.isOversized && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/80 text-amber-300 text-[11px] font-mono">
                        <Truck className="w-3 h-3" />
                        Sobredimensionada · Permiso {item.mtcPermitNumber}
                      </span>
                    )}
                  </div>
                )}

                {/* Associated Containers */}
                {item.containerNumbers && item.containerNumbers.length > 0 && (
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span>Contenedores asociados:</span>
                    {item.containerNumbers.map(cn => (
                      <span key={cn} className="font-mono px-1.5 py-0.2 bg-slate-800 text-slate-200 rounded">
                        {cn}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* CATEGORY: CONTENEDORES & TRACKING (HU-CAR-007 / HU-CAR-008 / HU-CAR-009) */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContainers.map((c) => (
              <div 
                key={c.number}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base font-mono">{c.number}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-mono">
                        {c.type}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {c.condition}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      BL: <span className="font-mono text-slate-300">{c.blNumber}</span> · Precinto: <span className="font-mono text-slate-300">{c.sealNumber}</span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {c.currentLocation}
                  </span>
                </div>

                {/* Reefer Details if Applicable */}
                {c.type === '40RF' && (
                  <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-cyan-300">
                      <Thermometer className="w-4 h-4" />
                      <span>Temperatura Actual: <strong>{c.temperatureC}°C</strong></span>
                    </div>
                    <div className="text-slate-400">
                      Set Point: <span className="font-mono text-white">{c.setPointC}°C</span> · {c.powerStatus}
                    </div>
                  </div>
                )}

                {/* Movement History Timeline */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    Trazabilidad de Movimientos
                  </div>
                  {c.movementHistory.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="font-medium text-slate-200">{m.action}</div>
                        <div className="text-[11px] text-slate-400">
                          {m.location} · {m.operator} · <span className="font-mono">{new Date(m.time).toLocaleString('es-PE')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: LIBERACIÓN COMERCIAL DE BL (HU-CAR-003 / HU-DOC-006) */}
      {releasingCargo && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-display text-base">
              <FileCheck className="w-5 h-5" />
              <span>Liberación Comercial de Mercancía / BL</span>
            </div>

            <p className="text-xs text-slate-300">
              Registra la liberación comercial del conocimiento de embarque <strong>{releasingCargo.blNumber}</strong> a nombre del consignatario <strong>{releasingCargo.consigneeOrShipper}</strong>.
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400">Regla de Comercio Exterior Peruano:</div>
              <p className="text-slate-300 text-[11px]">
                La liberación comercial autoriza la entrega frente a la nave y al terminal. Para el retiro físico (gate out) se requerirá además el registro del levante aduanero de SUNAT.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Modalidad de Liberación</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setReleaseType('Telex Release')}
                    className={`py-2 text-center rounded-lg border font-medium ${
                      releaseType === 'Telex Release' 
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Telex Release
                  </button>
                  <button
                    type="button"
                    onClick={() => setReleaseType('Original BL')}
                    className={`py-2 text-center rounded-lg border font-medium ${
                      releaseType === 'Original BL' 
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Original BL
                  </button>
                  <button
                    type="button"
                    onClick={() => setReleaseType('Sea Waybill')}
                    className={`py-2 text-center rounded-lg border font-medium ${
                      releaseType === 'Sea Waybill' 
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Sea Waybill
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Verificación de Flete</label>
                <div className="text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Flete prepaid / acreditado ante la línea naviera</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setReleasingCargo(null)}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmRelease}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Confirmar Liberación
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
