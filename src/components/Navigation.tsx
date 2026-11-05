import React from 'react';
import { 
  LayoutDashboard, 
  Ship, 
  Package, 
  FileText, 
  Compass, 
  Users, 
  Truck, 
  ShieldCheck, 
  Receipt, 
  BarChart3, 
  BellRing, 
  BookOpen, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard'
  | 'operaciones'
  | 'carga'
  | 'documentacion'
  | 'portuarias'
  | 'clientes'
  | 'logistica'
  | 'aduanas'
  | 'finanzas'
  | 'reportes'
  | 'alertas'
  | 'portal_cliente'
  | 'historias_usuario';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  vesselsInPortCount: number;
  openScalesCount: number;
  pendingLevanteCount: number;
  unreadAlertsCount: number;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeColor?: string;
  group: 'operacion' | 'comercial' | 'sistema';
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  vesselsInPortCount,
  openScalesCount,
  pendingLevanteCount,
  unreadAlertsCount
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard General', icon: LayoutDashboard, group: 'operacion' },
    { id: 'operaciones', label: 'Operaciones Marítimas', icon: Ship, badge: vesselsInPortCount, badgeColor: 'bg-cyan-500/20 text-cyan-400', group: 'operacion' },
    { id: 'carga', label: 'Gestión de Carga', icon: Package, group: 'operacion' },
    { id: 'documentacion', label: 'Documentación y BL', icon: FileText, group: 'operacion' },
    { id: 'portuarias', label: 'Operaciones Portuarias', icon: Compass, group: 'operacion' },
    { id: 'aduanas', label: 'Aduanas SUNAT / DAM', icon: ShieldCheck, badge: pendingLevanteCount, badgeColor: 'bg-amber-500/20 text-amber-400', group: 'operacion' },
    { id: 'logistica', label: 'Logística y Transporte', icon: Truck, group: 'operacion' },
    
    { id: 'clientes', label: 'Clientes y Navieras', icon: Users, group: 'comercial' },
    { id: 'finanzas', label: 'Facturación y Liquidación', icon: Receipt, group: 'comercial' },
    { id: 'reportes', label: 'Reportes y KPIs', icon: BarChart3, group: 'comercial' },
    
    { id: 'alertas', label: 'Alertas y Vencimientos', icon: BellRing, badge: unreadAlertsCount, badgeColor: 'bg-rose-500/20 text-rose-400', group: 'sistema' },
    { id: 'portal_cliente', label: 'Portal de Clientes', icon: ExternalLink, group: 'sistema' },
    { id: 'historias_usuario', label: '145 Historias de Usuario', icon: BookOpen, group: 'sistema' }
  ];

  return (
    <aside className="w-64 bg-slate-950/70 border-r border-slate-800/80 flex flex-col shrink-0 min-h-[calc(100vh-61px)]">
      
      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        
        {/* Operaciones Core */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
            Operaciones & Escalas
          </div>
          <div className="space-y-0.5">
            {navItems.filter(i => i.group === 'operacion').map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-950/70 to-blue-950/40 text-cyan-300 border border-cyan-800/50 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comercial & Finanzas */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
            Comercial & Finanzas
          </div>
          <div className="space-y-0.5">
            {navItems.filter(i => i.group === 'comercial').map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-950/70 to-blue-950/40 text-cyan-300 border border-cyan-800/50 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sistema & Portal */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
            Control & Portal
          </div>
          <div className="space-y-0.5">
            {navItems.filter(i => i.group === 'sistema').map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-950/70 to-blue-950/40 text-cyan-300 border border-cyan-800/50 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer System Status Banner */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950">
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Escalas Activas</span>
            <span className="font-mono font-semibold text-cyan-400">{openScalesCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Tipo de Cambio USD</span>
            <span className="font-mono text-slate-300">S/ 3.785</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/70 text-[10px]">
            <span className="text-slate-400">APN / SUNAT / DICAPI</span>
            <span className="text-emerald-400 font-medium">En línea</span>
          </div>
        </div>
      </div>

    </aside>
  );
};
