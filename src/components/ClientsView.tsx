import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  Ship, 
  FileCheck, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Globe 
} from 'lucide-react';

export const ClientsView: React.FC = () => {
  const [subTab, setSubTab] = useState<'importadores' | 'exportadores' | 'navieras' | 'tarifarios'>('importadores');
  const [search, setSearch] = useState('');

  const importadores = [
    { ruc: '20100055237', name: 'ALICORP S.A.A.', contact: 'Gerencia de Comercio Exterior', email: 'comex@alicorp.com.pe', phone: '(01) 315-0800', port: 'Callao', portalAccess: true },
    { ruc: '20370146994', name: 'CORPORACIÓN ACEROS AREQUIPA S.A.', contact: 'Logística de Importaciones', email: 'import@acerosarequipa.com', phone: '(01) 517-1800', port: 'Callao / Pisco', portalAccess: true },
    { ruc: '20100155967', name: 'QUÍMICA SUIZA S.A.C.', contact: 'Comercio Exterior y Aduanas', email: 'aduanas@quimicasuiza.com.pe', phone: '(01) 211-4000', port: 'Callao', portalAccess: true },
    { ruc: '20100190797', name: 'GLORIA S.A.', contact: 'Aprovisionamiento Internacional', email: 'importaciones@gloria.com.pe', phone: '(01) 470-7170', port: 'Callao / Matarani', portalAccess: true }
  ];

  const exportadores = [
    { ruc: '20340584237', name: 'CAMPOSOL S.A.', contact: 'Operaciones Logísticas de Exportación', email: 'export@camposol.com.pe', sector: 'Agroexportación (Palta, Arándano, Mango)', port: 'Callao / Paita' },
    { ruc: '20170040938', name: 'DANPER TRUJILLO S.A.C.', contact: 'Jefatura de Embarques Marítimos', email: 'logistica@danper.com', sector: 'Agroindustria congelados y conservas', port: 'Salaverry / Callao' },
    { ruc: '20453744820', name: 'SOCIEDAD MINERA CERRO VERDE S.A.A.', contact: 'Despacho de Concentrados', email: 'logistics@cerroverde.pe', sector: 'Minería (Cobre a granel)', port: 'Matarani' }
  ];

  const navieras = [
    { code: 'MSC', name: 'Mediterranean Shipping Company S.A.', country: 'Suiza', ports: 'Callao, Paita', agencyFeeUsd: 2500, contact: 'line-ops@msc.com' },
    { code: 'MAERSK', name: 'A.P. Møller - Mærsk A/S', country: 'Dinamarca', ports: 'Callao, Paita', agencyFeeUsd: 2400, contact: 'peru.ops@maersk.com' },
    { code: 'ONE', name: 'Ocean Network Express Pte. Ltd.', country: 'Singapur / Japón', ports: 'Callao', agencyFeeUsd: 2300, contact: 'operations.pe@one-line.com' },
    { code: 'HAPAG', name: 'Hapag-Lloyd AG', country: 'Alemania', ports: 'Callao, Paita', agencyFeeUsd: 2350, contact: 'callao@hlag.com' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Clientes y Representadas</span>
            <span aria-hidden="true">·</span>
            <span>Padrón RUC SUNAT / Contratos de Agenciamiento</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Importadores, Exportadores y Líneas Navieras
          </h1>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setSubTab('importadores')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'importadores' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Importadores ({importadores.length})
          </button>
          <button
            onClick={() => setSubTab('exportadores')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'exportadores' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Exportadores ({exportadores.length})
          </button>
          <button
            onClick={() => setSubTab('navieras')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'navieras' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Navieras Representadas ({navieras.length})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: IMPORTADORES */}
      {subTab === 'importadores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {importadores.map((imp) => (
            <div key={imp.ruc} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm font-display">{imp.name}</h3>
                  <div className="font-mono text-cyan-400 text-xs">RUC: {imp.ruc}</div>
                </div>
                {imp.portalAccess && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Portal Habilitado
                  </span>
                )}
              </div>

              <div className="space-y-1 text-slate-300">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{imp.contact}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{imp.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{imp.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>Puertos de operación: <strong>{imp.port}</strong></span>
                <span className="text-emerald-400 font-medium">Habido SUNAT</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 2: EXPORTADORES */}
      {subTab === 'exportadores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportadores.map((exp) => (
            <div key={exp.ruc} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm font-display">{exp.name}</h3>
                  <div className="font-mono text-cyan-400 text-xs">RUC: {exp.ruc}</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Exportador Activo
                </span>
              </div>

              <div className="text-slate-300 font-medium">
                {exp.sector}
              </div>

              <div className="space-y-1 text-slate-400">
                <div>Contacto: {exp.contact}</div>
                <div>Correo: {exp.email}</div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>Puertos de embarque: <strong>{exp.port}</strong></span>
                <span className="text-cyan-400 font-medium">Certificado SENASA</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: NAVIERAS */}
      {subTab === 'navieras' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {navieras.map((nav) => (
            <div key={nav.code} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">
                    {nav.code}
                  </span>
                  <h3 className="font-bold text-white text-sm font-display mt-1">{nav.name}</h3>
                </div>
                <span className="text-slate-400 font-mono text-xs">{nav.country}</span>
              </div>

              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Puertos con contrato:</span>
                  <span className="text-white font-medium">{nav.ports}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Agency Fee estándar:</span>
                  <span className="text-cyan-400 font-bold">USD ${nav.agencyFeeUsd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contacto operativo:</span>
                  <span className="text-slate-300">{nav.contact}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>Representación Marítima Autorizada APN</span>
                <span className="text-emerald-400 font-medium">Contrato Vigente</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
