/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortId, UserRole, Scale, CargoItem, Container, Manifest, DamRecord, PortService, Invoice, AlertNotification, UserStory, MasterBLDetailed } from './types/maritime';
import { 
  INITIAL_SCALES, 
  INITIAL_VESSELS, 
  INITIAL_CARGO, 
  INITIAL_CONTAINERS, 
  INITIAL_MANIFESTS, 
  INITIAL_DAMS, 
  INITIAL_PORT_SERVICES, 
  INITIAL_INVOICES, 
  INITIAL_ALERTS, 
  INITIAL_MASTER_BLS,
  PORTS_CATALOG 
} from './data/mockData';
import { USER_STORIES_CATALOG } from './data/userStoriesData';

import { Header } from './components/Header';
import { Navigation, ActiveTab } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { MaritimeOperationsView } from './components/MaritimeOperationsView';
import { CargoManagementView } from './components/CargoManagementView';
import { DocumentationView } from './components/DocumentationView';
import { PortOperationsView } from './components/PortOperationsView';
import { CustomsView } from './components/CustomsView';
import { FinanceView } from './components/FinanceView';
import { ClientsView } from './components/ClientsView';
import { LogisticsView } from './components/LogisticsView';
import { ReportsView } from './components/ReportsView';
import { AlertsView } from './components/AlertsView';
import { ClientPortalView } from './components/ClientPortalView';
import { UserStoriesModal } from './components/UserStoriesModal';
import { NewScaleModal } from './components/NewScaleModal';
import { DisbursementModal } from './components/DisbursementModal';
import { ScaleDetailModal } from './components/ScaleDetailModal';
import { CommandPalette } from './components/CommandPalette';

export default function App() {
  // Application State
  const [currentPort, setCurrentPort] = useState<PortId>('callao');
  const [currentRole, setCurrentRole] = useState<UserRole>('jefe_operaciones');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Maritime Data State
  const [scales, setScales] = useState<Scale[]>(INITIAL_SCALES);
  const [vessels, setVessels] = useState(INITIAL_VESSELS);
  const [cargoItems, setCargoItems] = useState<CargoItem[]>(INITIAL_CARGO);
  const [containers, setContainers] = useState<Container[]>(INITIAL_CONTAINERS);
  const [manifests, setManifests] = useState<Manifest[]>(INITIAL_MANIFESTS);
  const [damRecords, setDamRecords] = useState<DamRecord[]>(INITIAL_DAMS);
  const [portServices, setPortServices] = useState<PortService[]>(INITIAL_PORT_SERVICES);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [alerts, setAlerts] = useState<AlertNotification[]>(INITIAL_ALERTS);
  const [masterBLs, setMasterBLs] = useState<MasterBLDetailed[]>(INITIAL_MASTER_BLS);

  // Modals State
  const [isNewScaleModalOpen, setIsNewScaleModalOpen] = useState(false);
  const [isUserStoriesModalOpen, setIsUserStoriesModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedScaleDetail, setSelectedScaleDetail] = useState<Scale | null>(null);
  const [selectedScaleDisbursement, setSelectedScaleDisbursement] = useState<Scale | null>(null);

  // Handlers
  const handleAddScale = (newScale: Scale) => {
    setScales(prev => [newScale, ...prev]);
  };

  const handleUpdateScale = (updated: Scale) => {
    setScales(prev => prev.map(s => s.id === updated.id ? updated : s));
    if (selectedScaleDetail && selectedScaleDetail.id === updated.id) {
      setSelectedScaleDetail(updated);
    }
  };

  const handleUpdateCargoItem = (updated: CargoItem) => {
    setCargoItems(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleUpdateContainer = (updated: Container) => {
    setContainers(prev => prev.map(c => c.number === updated.number ? updated : c));
  };

  const handleUpdateManifest = (updated: Manifest) => {
    setManifests(prev => prev.map(m => m.id === updated.id ? updated : m));
  };

  const handleUpdateDamRecord = (updated: DamRecord) => {
    setDamRecords(prev => prev.map(d => d.id === updated.id ? updated : d));
    // Also update associated cargo item if levante is granted
    if (updated.levante) {
      setCargoItems(prev => prev.map(c => {
        if (c.damNumber === updated.damNumber) {
          return { ...c, damLevante: true, damLevanteDate: updated.levanteDate };
        }
        return c;
      }));
    }
  };

  const handleAddPortService = (newService: PortService) => {
    setPortServices(prev => [newService, ...prev]);
  };

  const handleMarkAlertRead = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isRead: true } : a));
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  const handleFinalizeDisbursement = (scaleId: string) => {
    setScales(prev => prev.map(s => {
      if (s.id === scaleId) {
        return { ...s, disbursementStatus: 'cerrada' };
      }
      return s;
    }));
  };

  const handleUpdateMasterBL = (updated: MasterBLDetailed) => {
    setMasterBLs(prev => prev.map(bl => bl.id === updated.id ? updated : bl));
  };

  // Switch role logic
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'cliente_portal') {
      setActiveTab('portal_cliente');
    }
  };

  // Dynamic counts for sidebar badges
  const vesselsInPortCount = scales.filter(s => s.status === 'atracada' || s.status === 'en_operacion' || s.status === 'en_rada').length;
  const openScalesCount = scales.filter(s => s.status !== 'zarpada' && s.status !== 'anulada').length;
  const pendingLevanteCount = damRecords.filter(d => !d.levante).length;
  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Header */}
      <Header
        currentPort={currentPort}
        onPortChange={setCurrentPort}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        alerts={alerts}
        onOpenNewScaleModal={() => setIsNewScaleModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenUserStoriesModal={() => setIsUserStoriesModalOpen(true)}
        onMarkAlertRead={handleMarkAlertRead}
      />

      {/* Main Layout Area: Sidebar Navigation + Main Viewport */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation */}
        <Navigation
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'historias_usuario') {
              setIsUserStoriesModalOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          vesselsInPortCount={vesselsInPortCount}
          openScalesCount={openScalesCount}
          pendingLevanteCount={pendingLevanteCount}
          unreadAlertsCount={unreadAlertsCount}
        />

        {/* Central Viewport */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-[1520px] mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              currentPort={currentPort}
              scales={scales}
              vessels={vessels}
              cargoItems={cargoItems}
              damRecords={damRecords}
              alerts={alerts}
              onSelectScale={(scale) => setSelectedScaleDetail(scale)}
              onNavigateToTab={setActiveTab}
              onOpenNewScaleModal={() => setIsNewScaleModalOpen(true)}
            />
          )}

          {activeTab === 'operaciones' && (
            <MaritimeOperationsView
              currentPort={currentPort}
              scales={scales}
              vessels={vessels}
              onSelectScale={(scale) => setSelectedScaleDetail(scale)}
              onOpenNewScaleModal={() => setIsNewScaleModalOpen(true)}
              onUpdateScale={handleUpdateScale}
            />
          )}

          {activeTab === 'carga' && (
            <CargoManagementView
              cargoItems={cargoItems}
              containers={containers}
              scales={scales}
              onUpdateCargoItem={handleUpdateCargoItem}
              onUpdateContainer={handleUpdateContainer}
            />
          )}

          {activeTab === 'documentacion' && (
            <DocumentationView
              manifests={manifests}
              cargoItems={cargoItems}
              scales={scales}
              masterBLs={masterBLs}
              containers={containers}
              onUpdateManifest={handleUpdateManifest}
              onUpdateMasterBL={handleUpdateMasterBL}
            />
          )}

          {activeTab === 'portuarias' && (
            <PortOperationsView
              currentPort={currentPort}
              scales={scales}
              portServices={portServices}
              onAddPortService={handleAddPortService}
            />
          )}

          {activeTab === 'aduanas' && (
            <CustomsView
              damRecords={damRecords}
              onUpdateDamRecord={handleUpdateDamRecord}
            />
          )}

          {activeTab === 'finanzas' && (
            <FinanceView
              invoices={invoices}
              scales={scales}
              portServices={portServices}
              onOpenDisbursementModal={(scale) => setSelectedScaleDisbursement(scale)}
            />
          )}

          {activeTab === 'clientes' && (
            <ClientsView />
          )}

          {activeTab === 'logistica' && (
            <LogisticsView />
          )}

          {activeTab === 'reportes' && (
            <ReportsView scales={scales} />
          )}

          {activeTab === 'alertas' && (
            <AlertsView
              alerts={alerts}
              onMarkAlertRead={handleMarkAlertRead}
              onMarkAllRead={handleMarkAllAlertsRead}
            />
          )}

          {activeTab === 'portal_cliente' && (
            <ClientPortalView
              cargoItems={cargoItems}
              invoices={invoices}
            />
          )}
        </main>

      </div>

      {/* Global Modals */}
      <NewScaleModal
        isOpen={isNewScaleModalOpen}
        onClose={() => setIsNewScaleModalOpen(false)}
        vessels={vessels}
        onAddScale={handleAddScale}
      />

      <UserStoriesModal
        isOpen={isUserStoriesModalOpen}
        onClose={() => setIsUserStoriesModalOpen(false)}
      />

      <DisbursementModal
        scale={selectedScaleDisbursement}
        portServices={portServices}
        onClose={() => setSelectedScaleDisbursement(null)}
        onFinalizeDisbursement={handleFinalizeDisbursement}
      />

      <ScaleDetailModal
        scale={selectedScaleDetail}
        cargoItems={cargoItems}
        portServices={portServices}
        onClose={() => setSelectedScaleDetail(null)}
        onOpenDisbursement={(scale) => setSelectedScaleDisbursement(scale)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        scales={scales}
        cargoItems={cargoItems}
        containers={containers}
        damRecords={damRecords}
        onSelectScale={(scale) => setSelectedScaleDetail(scale)}
        onSelectUserStory={(story) => setIsUserStoriesModalOpen(true)}
        onNavigateToTab={setActiveTab}
      />

    </div>
  );
}
