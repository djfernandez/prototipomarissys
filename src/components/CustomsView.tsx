import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  FileCheck2, 
  Sparkles, 
  Eye, 
  Calendar,
  Building2
} from 'lucide-react';
import { DamRecord, AduanaChannel } from '../types/maritime';

interface CustomsViewProps {
  damRecords: DamRecord[];
  onUpdateDamRecord: (updated: DamRecord) => void;
}

export const CustomsView: React.FC<CustomsViewProps> = ({
  damRecords,
  onUpdateDamRecord
}) => {
  const [filterChannel, setFilterChannel] = useState<'all' | AduanaChannel>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDam, setEditingDam] = useState<DamRecord | null>(null);

  const filteredDams = damRecords.filter(d => {
    if (filterChannel !== 'all' && d.channel !== filterChannel) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        d.damNumber.toLowerCase().includes(q) ||
        d.consigneeName.toLowerCase().includes(q) ||
        d.consigneeRuc.includes(q) ||
        d.blNumber.toLowerCase().includes(q) ||
        d.customsBrokerAgency.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleGrantLevante = (dam: DamRecord) => {
    const updated: DamRecord = {
      ...dam,
      levante: true,
      levanteDate: new Date().toISOString(),
      status: 'Con Levante'
    };
    onUpdateDamRecord(updated);
  };

  const handleChangeChannel = (dam: DamRecord, newChannel: AduanaChannel) => {
    const updated: DamRecord = {
      ...dam,
      channel: newChannel,
      status: newChannel === 'verde' ? 'Con Levante' : newChannel === 'naranja' ? 'En Aforo' : 'En Reconocimiento Físico',
      levante: newChannel === 'verde' ? true : dam.levante
    };
    onUpdateDamRecord(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Aduanas Perú</span>
            <span aria-hidden="true">·</span>
            <span>SUNAT / Intendencia Aduana Marítima Callao (118)</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Declaración Aduanera de Mercancías (DAM) y Semáforo
          </h1>
        </div>

        {/* Channel Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setFilterChannel('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterChannel === 'all' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos ({damRecords.length})
          </button>
          <button
            onClick={() => setFilterChannel('verde')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterChannel === 'verde' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Verde ({damRecords.filter(d => d.channel === 'verde').length})
          </button>
          <button
            onClick={() => setFilterChannel('naranja')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterChannel === 'naranja' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Naranja ({damRecords.filter(d => d.channel === 'naranja').length})
          </button>
          <button
            onClick={() => setFilterChannel('rojo')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterChannel === 'rojo' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rojo ({damRecords.filter(d => d.channel === 'rojo').length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por N° DAM, RUC, cliente, BL o agencia de aduana..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="text-xs text-slate-400 hidden sm:block">
          Mostrando <strong className="text-white font-mono">{filteredDams.length}</strong> declaraciones aduaneras
        </div>
      </div>

      {/* DAM Records Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDams.map((dam) => {
          const isGreen = dam.channel === 'verde';
          const isOrange = dam.channel === 'naranja';
          const isRed = dam.channel === 'rojo';

          return (
            <div 
              key={dam.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-base text-white">{dam.damNumber}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      isGreen ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      isOrange ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      Canal {dam.channel}
                    </span>
                    <span className="text-xs text-slate-400">{dam.regime}</span>
                  </div>

                  <div className="text-xs text-slate-300 mt-1">
                    Consignatario: <strong className="text-white">{dam.consigneeName}</strong> (RUC: {dam.consigneeRuc})
                  </div>
                </div>

                {/* Levante Action / Status */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {!dam.levante ? (
                    <button
                      onClick={() => handleGrantLevante(dam)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Registrar Levante SUNAT</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Con Levante ({new Date(dam.levanteDate || '').toLocaleDateString('es-PE')})</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Grid with Customs Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block">Agencia de Aduana</span>
                  <span className="font-medium text-slate-200 truncate block">{dam.customsBrokerAgency}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Conocimiento (BL)</span>
                  <span className="font-mono font-medium text-cyan-400">{dam.blNumber}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Fecha Numeración</span>
                  <span className="font-mono text-slate-200">
                    {new Date(dam.numberedDate).toLocaleDateString('es-PE')}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Intendencia de Aduana</span>
                  <span className="text-slate-200">{dam.customsOffice}</span>
                </div>
              </div>

              {/* Sanitary Entity Tag if Required */}
              {dam.sanitaryEntity && (
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                      {dam.sanitaryEntity}
                    </span>
                    <span className="text-slate-300">Certificado: <strong className="font-mono text-cyan-300">{dam.sanitaryCertNumber}</strong></span>
                  </div>
                  <span className={`text-[11px] font-medium ${dam.sanitaryStatus === 'Conforme' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {dam.sanitaryStatus}
                  </span>
                </div>
              )}

              {/* Quick Channel Simulator */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Simular cambio de canal SUNAT:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleChangeChannel(dam, 'verde')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 text-slate-400 font-medium"
                  >
                    Verde
                  </button>
                  <button
                    onClick={() => handleChangeChannel(dam, 'naranja')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-950 hover:text-amber-300 text-slate-400 font-medium"
                  >
                    Naranja
                  </button>
                  <button
                    onClick={() => handleChangeChannel(dam, 'rojo')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 font-medium"
                  >
                    Rojo
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
