import React, { useState } from 'react';
import { 
  Anchor, 
  MapPin, 
  UserCheck, 
  Bell, 
  Search, 
  Plus, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  ChevronDown 
} from 'lucide-react';
import { PortId, UserRole, AlertNotification } from '../types/maritime';
import { PORTS_CATALOG } from '../data/mockData';

interface HeaderProps {
  currentPort: PortId;
  onPortChange: (port: PortId) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  alerts: AlertNotification[];
  onOpenNewScaleModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenUserStoriesModal: () => void;
  onMarkAlertRead: (id: string) => void;
}

const ROLES_INFO: Record<UserRole, { name: string; title: string; color: string }> = {
  jefe_operaciones: { name: 'Carlos Mendoza', title: 'Jefe de Operaciones', color: 'text-cyan-400' },
  operador_agencia: { name: 'Diego Alva', title: 'Operador de Agencia', color: 'text-sky-400' },
  documentador: { name: 'Valeria Morales', title: 'Documentador Marítimo', color: 'text-indigo-400' },
  coordinador_portuario: { name: 'Jorge Salazar', title: 'Coordinador Portuario', color: 'text-amber-400' },
  analista_aduanas: { name: 'Rosa Quintana', title: 'Analista de Aduanas', color: 'text-emerald-400' },
  contador: { name: 'Mariano Rivas', title: 'Contador / Tesorería', color: 'text-violet-400' },
  cliente_portal: { name: 'Alicorp S.A.A. (Portal)', title: 'Consignatario / Cliente', color: 'text-teal-400' }
};

export const Header: React.FC<HeaderProps> = ({
  currentPort,
  onPortChange,
  currentRole,
  onRoleChange,
  alerts,
  onOpenNewScaleModal,
  onOpenCommandPalette,
  onOpenUserStoriesModal,
  onMarkAlertRead
}) => {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isPortDropdownOpen, setIsPortDropdownOpen] = useState(false);

  const unreadAlerts = alerts.filter(a => !a.isRead);
  const activePort = PORTS_CATALOG.find(p => p.id === currentPort) || PORTS_CATALOG[0];
  const activeRoleInfo = ROLES_INFO[currentRole];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Port Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white font-display">MARISYS</span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                  PERÚ
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Agencia Marítima · APN / DICAPI / SUNAT</p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden md:block" />

          {/* Port Selector */}
          <div className="relative">
            <button
              onClick={() => setIsPortDropdownOpen(!isPortDropdownOpen)}
              className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activePort.name}</span>
              <span className="text-[10px] font-mono text-slate-400 hidden lg:inline">({activePort.code})</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isPortDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setIsPortDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                  Catálogo de Puertos Nacionales
                </div>
                {PORTS_CATALOG.map((port) => (
                  <button
                    key={port.id}
                    onClick={() => {
                      onPortChange(port.id as PortId);
                      setIsPortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                      currentPort === port.id ? 'bg-cyan-950/40 text-cyan-300 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{port.name}</div>
                      <div className="text-[10px] text-slate-400">{port.region}</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{port.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Trigger (Command Palette) */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-900/80 border border-slate-800/90 rounded-lg hover:border-cyan-500/40 hover:text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <span>Buscar nave, IMO, BL, DAM, contenedor, escala...</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">⌘K</kbd>
          </button>
        </div>

        {/* Right: User Role Switcher, HU Inspector, Notifications, New Scale Button */}
        <div className="flex items-center gap-2.5">
          
          {/* Quick search button for mobile */}
          <button
            onClick={onOpenCommandPalette}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 lg:hidden"
            title="Buscar"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Stories Inspector Button */}
          <button
            onClick={onOpenUserStoriesModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 hover:bg-indigo-900/60 text-xs font-medium transition-colors"
            title="Ver catálogo de 145 historias de usuario"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">145 HUs</span>
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-colors"
            >
              <UserCheck className={`w-3.5 h-3.5 ${activeRoleInfo.color}`} />
              <div className="text-left hidden md:block">
                <div className="text-[11px] font-semibold leading-tight text-white">{activeRoleInfo.name}</div>
                <div className="text-[9px] text-slate-400 leading-tight">{activeRoleInfo.title}</div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                  Cambiar Perfil de Usuario (Simulación de Roles)
                </div>
                {(Object.keys(ROLES_INFO) as UserRole[]).map((r) => {
                  const info = ROLES_INFO[r];
                  const isCurrent = currentRole === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        onRoleChange(r);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                        isCurrent ? 'bg-cyan-950/50 text-white font-medium' : 'text-slate-300'
                      }`}
                    >
                      <div>
                        <div className={`font-semibold ${info.color}`}>{info.name}</div>
                        <div className="text-[10px] text-slate-400">{info.title}</div>
                      </div>
                      {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsAlertsOpen(!isAlertsOpen)}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
              title="Notificaciones y Alertas"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {unreadAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center font-mono animate-pulse">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {isAlertsOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50"
                onMouseLeave={() => setIsAlertsOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                    <span className="text-xs font-semibold text-white">Alertas Operativas Activas</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{unreadAlerts.length} pendientes</span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                  {alerts.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-slate-400">
                      No hay alertas activas en esta sucursal.
                    </div>
                  ) : (
                    alerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`p-3 text-xs transition-colors hover:bg-slate-800/40 ${alert.isRead ? 'opacity-60' : 'bg-slate-900'}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                            {alert.severity === 'alta' ? (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            )}
                            <span>{alert.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 shrink-0 font-mono">{alert.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{alert.description}</p>
                        
                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                          {alert.scaleNumber && (
                            <span className="font-mono text-cyan-400">{alert.scaleNumber}</span>
                          )}
                          {!alert.isRead && (
                            <button
                              onClick={() => onMarkAlertRead(alert.id)}
                              className="text-cyan-400 hover:text-cyan-300 font-medium ml-auto"
                            >
                              Marcar como atendida
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button: + Nueva Escala */}
          <button
            onClick={onOpenNewScaleModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nueva Escala</span>
          </button>

        </div>

      </div>
    </header>
  );
};
