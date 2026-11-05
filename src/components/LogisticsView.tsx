import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Search, 
  Plus, 
  Radio, 
  AlertTriangle,
  Building2
} from 'lucide-react';

interface TransportTrip {
  id: string;
  greNumber: string; // Guía de Remisión Electrónica
  plateNumber: string;
  driverName: string;
  driverDni: string;
  carrierName: string;
  origin: string;
  destination: string;
  cargoDescription: string;
  containerNumber: string;
  departureTime: string;
  status: 'en_ruta' | 'entregado' | 'programado' | 'sin_senal';
  lastGpsUpdate: string;
  currentRoad: string;
}

export const LogisticsView: React.FC = () => {
  const [subTab, setSubTab] = useState<'viajes' | 'vehiculos' | 'almacenes'>('viajes');

  const trips: TransportTrip[] = [
    {
      id: 'viaje-01',
      greNumber: 'GRE T001-000491',
      plateNumber: 'D3E-892',
      driverName: 'José Quispe Huamán',
      driverDni: '44819201',
      carrierName: 'Transportes Marítimos del Pacífico S.A.C.',
      origin: 'DP World Callao (Puerta 2)',
      destination: 'Planta ALICORP Frecuencia (Callao)',
      cargoDescription: 'Aceite de soya refinado flexitanque (24 TM)',
      containerNumber: 'MSCU8921045',
      departureTime: '2026-11-04T11:15:00',
      status: 'en_ruta',
      lastGpsUpdate: 'Hace 4 min',
      currentRoad: 'Av. Néstor Gambetta Km 6.5 (Velocidad: 42 km/h)'
    },
    {
      id: 'viaje-02',
      greNumber: 'GRE T001-000492',
      plateNumber: 'B8K-710',
      driverName: 'Marcos Fernández Vega',
      driverDni: '41920412',
      carrierName: 'Logística Terrestre del Sur S.R.L.',
      origin: 'APM Terminals Callao',
      destination: 'Almacén Central Aceros Arequipa (Pisco)',
      cargoDescription: 'Bobina de acero laminado (Permiso MTC)',
      containerNumber: 'MSCU4829102',
      departureTime: '2026-11-04T09:30:00',
      status: 'en_ruta',
      lastGpsUpdate: 'Hace 8 min',
      currentRoad: 'Panamericana Sur Km 142 (Cañete)'
    },
    {
      id: 'viaje-03',
      greNumber: 'GRE T001-000488',
      plateNumber: 'A1M-902',
      driverName: 'Carlos Ramírez Soto',
      driverDni: '40192841',
      carrierName: 'Transportes Transpesa S.A.',
      origin: 'Planta CAMPOSOL Chao (La Libertad)',
      destination: 'DP World Callao Patio Reefer',
      cargoDescription: 'Palta Hass exportación (40RF conectado)',
      containerNumber: 'MSCU9901482',
      departureTime: '2026-11-03T18:00:00',
      status: 'entregado',
      lastGpsUpdate: '2026-11-03T23:05:00',
      currentRoad: 'Entregado en balanza portuaria'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Logística y Transporte</span>
            <span aria-hidden="true">·</span>
            <span>MTC / Guía de Remisión Electrónica SUNAT (GRE)</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 font-display">
            Transporte Terrestre, Guías GRE y Seguimiento GPS
          </h1>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setSubTab('viajes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'viajes' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Viajes en Ruta ({trips.filter(t => t.status === 'en_ruta').length})
          </button>
          <button
            onClick={() => setSubTab('vehiculos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'vehiculos' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Flota Habilitada MTC
          </button>
          <button
            onClick={() => setSubTab('almacenes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subTab === 'almacenes' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Almacenes & Depósitos
          </button>
        </div>
      </div>

      {/* SUBTAB 1: VIAJES EN RUTA */}
      {subTab === 'viajes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {trips.map((trip) => {
              const isEnRuta = trip.status === 'en_ruta';

              return (
                <div key={trip.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-white text-base">{trip.greNumber}</span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                          Placa: {trip.plateNumber}
                        </span>
                        <span className="text-slate-400 font-mono">Contenedor: {trip.containerNumber}</span>
                      </div>
                      <div className="text-slate-300 mt-1">
                        Conductor: <strong>{trip.driverName}</strong> (DNI: {trip.driverDni}) · {trip.carrierName}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {isEnRuta ? (
                        <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold flex items-center gap-1.5">
                          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                          <span>En Ruta GPS</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Entregado Conforme</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Route & GPS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">Origen & Destino</span>
                      <div className="font-medium text-slate-200 mt-0.5">{trip.origin}</div>
                      <div className="text-slate-400 mt-0.5 flex items-center gap-1">
                        <span>Hacia:</span>
                        <span className="text-cyan-300 font-semibold">{trip.destination}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">Posicionamiento Satelital GPS</span>
                      <div className="font-medium text-emerald-400 mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{trip.currentRoad}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                        Última señal: {trip.lastGpsUpdate}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex justify-between items-center pt-1">
                    <span>Mercancía amparada: {trip.cargoDescription}</span>
                    <span className="text-slate-400 font-mono">Salida: {new Date(trip.departureTime).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: VEHÍCULOS */}
      {subTab === 'vehiculos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold text-white text-base">D3E-892</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Disponible</span>
            </div>
            <div className="text-slate-300">Tractocamión Volvo FH 460 6x4</div>
            <div className="text-slate-400">Revisión Técnica: Vigente hasta Sep 2027</div>
            <div className="text-slate-400 font-mono text-[11px]">Tarjeta MTC: 1502941-LIMA</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold text-white text-base">B8K-710</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">En Viaje</span>
            </div>
            <div className="text-slate-300">Semirremolque Plataforma 3 Ejes (Cama Baja)</div>
            <div className="text-slate-400">Permiso Especial MTC: Sobredimensionado</div>
            <div className="text-slate-400 font-mono text-[11px]">Tarjeta MTC: 1849102-CALLAO</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold text-white text-base">A1M-902</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Disponible</span>
            </div>
            <div className="text-slate-300">Tractocamión Scania R500 Genset Reefer</div>
            <div className="text-slate-400">Habilitación Sanitaria SENASA para Perecibles</div>
            <div className="text-slate-400 font-mono text-[11px]">Tarjeta MTC: 1948102-LIMA</div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: ALMACENES */}
      {subTab === 'almacenes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm">Depósito Temporal Alconsa Callao</h3>
            <div className="text-slate-400">Av. Néstor Gambetta 1240, Callao · Código Aduanero: 3041</div>
            <div className="text-slate-300">Capacidad: 1,800 TEUs · Racks Reefer: 120 tomas activas</div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-slate-400 text-[11px]">
              <span>Contenedores de agencia en custodia: <strong className="text-cyan-400">42</strong></span>
              <span className="text-emerald-400 font-medium">Autorizado SUNAT</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm">Almacén Aduanero Ransa Gambetta</h3>
            <div className="text-slate-400">Av. Gambetta Km 3.8, Callao · Código Aduanero: 2810</div>
            <div className="text-slate-300">Cámara frigorífica certificada SENASA y DIGESA</div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-slate-400 text-[11px]">
              <span>Contenedores de agencia en custodia: <strong className="text-cyan-400">18</strong></span>
              <span className="text-emerald-400 font-medium">Autorizado SUNAT</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
