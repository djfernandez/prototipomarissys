export type PortId = 'callao' | 'paita' | 'matarani' | 'salaverry' | 'pisco' | 'chimbote' | 'ilo';

export type UserRole = 
  | 'jefe_operaciones' 
  | 'operador_agencia' 
  | 'documentador' 
  | 'coordinador_portuario' 
  | 'analista_aduanas' 
  | 'contador' 
  | 'cliente_portal';

export type ScaleStatus = 'programada' | 'en_rada' | 'atracada' | 'en_operacion' | 'zarpada' | 'anulada';
export type DicapiStatus = 'pendiente' | 'avisado' | 'autorizado' | 'observado' | 'denegado';
export type SunatStatus = 'borrador' | 'transmitido' | 'aceptado' | 'observado';
export type AduanaChannel = 'verde' | 'naranja' | 'rojo';

export interface Vessel {
  id: string;
  name: string;
  imo: string;
  flag: string;
  flagCode: string;
  shipowner: string;
  shippingLine: string;
  type: 'Portacontenedores' | 'Granelero' | 'Tanquero' | 'Carga General' | 'Reefer';
  lengthOverallMeters: number; // Eslora
  beamMeters: number; // Manga
  draftMeters: number; // Calado
  status: 'en_transito' | 'en_rada' | 'atracado' | 'en_operacion' | 'zarpado';
  lastPort?: string;
  active: boolean;
}

export interface Scale {
  id: string;
  scaleNumber: string; // e.g. ESC-2026-CAL-042
  vesselId: string;
  vesselName: string;
  imo: string;
  shippingLine: string;
  port: PortId;
  portName: string;
  terminal: string; // e.g. 'DP World Callao (Muelle Sur)'
  berth?: string; // Muelle e.g. 'Muelle Sur - Puesto 1'
  eta: string;
  etd: string;
  actualArrival?: string;
  actualDeparture?: string;
  status: ScaleStatus;
  originPort: string;
  nextPort: string;
  dicapiArrivalNotice: DicapiStatus;
  dicapiArrivalNoticeNumber?: string;
  dicapiDepartureAuth: DicapiStatus;
  dicapiDepartureAuthNumber?: string;
  sunatManifestInStatus: SunatStatus;
  sunatManifestInNumber?: string;
  sunatManifestOutStatus: SunatStatus;
  sunatManifestOutNumber?: string;
  containersIn: number;
  containersOut: number;
  totalWeightTons: number;
  disbursementStatus: 'abierta' | 'en_revision' | 'liquidada' | 'cerrada';
  disbursementNumber?: string;
  notes?: string;
  tasksCompleted: number;
  tasksTotal: number;
}

export interface CargoItem {
  id: string;
  scaleId: string;
  type: 'importacion' | 'exportacion';
  blNumber: string; // Master or House BL
  bookingNumber?: string;
  consigneeOrShipper: string;
  consigneeRuc: string;
  goodsDescription: string;
  packagesCount: number;
  grossWeightKg: number;
  volumeCbm?: number;
  containerNumbers: string[];
  isReefer: boolean;
  reeferTempC?: number;
  isDangerous: boolean;
  imoClass?: string;
  unNumber?: string;
  isOversized: boolean;
  mtcPermitNumber?: string;
  status: 'borrador' | 'manifestada' | 'descargada' | 'embarcada' | 'en_almacen' | 'entregada';
  commercialReleaseStatus: 'retenido' | 'liberado';
  commercialReleaseType?: 'Original BL' | 'Telex Release' | 'Sea Waybill';
  commercialReleaseDate?: string;
  damNumber?: string;
  damChannel?: AduanaChannel;
  damLevante: boolean;
  damLevanteDate?: string;
}

export interface FreightCharge {
  concept: string;
  currency: 'USD' | 'EUR';
  rate: number;
  prepaidOrCollect: 'Prepaid' | 'Collect';
}

export interface MasterBLContainer {
  containerNumber: string;
  size: '20\'' | '40\'';
  type: '40HC' | '20GP' | '40RF' | '40OT';
  sealNumber: string;
  tareKg: number;
  payloadKg: number;
  packages: number;
}

export type MasterBLStatus = 'emitido' | 'enmendado' | 'anulado';

export interface MasterBLDetailed {
  id: string;
  masterBLNumber: string;
  shippingLine: string;
  scaleId: string;
  scaleNumber: string;
  voyageNumber: string;
  vesselName: string;
  originPort: string;
  dischargePort: string;
  finalDestinationPort: string;
  shipper: {
    name: string;
    address: string;
    country: string;
    taxId?: string;
  };
  consignee: {
    name: string;
    ruc: string;
    address: string;
    city: string;
    country: string;
  };
  notifyParty: {
    name: string;
    ruc?: string;
    address: string;
    contact: string;
  };
  marksAndNumbers: string;
  goodsDescription: string;
  totalGrossWeightKg: number;
  totalVolumeCbm: number;
  totalPackages: number;
  packageType: string;
  freightPaymentTerm: 'FREIGHT PREPAID' | 'FREIGHT COLLECT';
  freightCharges: FreightCharge[]; // Mínimo 3 componentes
  containers: MasterBLContainer[]; // Mínimo 5 contenedores
  status: MasterBLStatus;
  issueDate: string;
  issuePlace: string;
  amendmentNotes?: string;
  annulmentReason?: string;
}

export interface Container {
  number: string; // e.g. MSCU7849201
  type: '20GP' | '40HC' | '40RF' | '40OT';
  condition: 'Lleno' | 'Vacío';
  sealNumber: string;
  scaleId: string;
  blNumber: string;
  currentLocation: 'A bordo' | 'Patio DP World' | 'Patio APM' | 'Depósito Temporal Alconsa' | 'En Ruta (GRE)' | 'Entregado Consignatario';
  temperatureC?: number;
  setPointC?: number;
  powerStatus?: 'Conectado' | 'Desconectado';
  lastMovementTime: string;
  movementHistory: {
    time: string;
    action: string;
    location: string;
    operator: string;
  }[];
}

export interface Manifest {
  id: string;
  manifestNumber: string;
  type: 'ingreso' | 'salida';
  scaleId: string;
  vesselName: string;
  voyageNumber: string;
  port: PortId;
  totalBLs: number;
  totalContainers: number;
  totalWeightKg: number;
  status: SunatStatus;
  sunatTicket?: string;
  sunatAcceptanceDate?: string;
  observationDetails?: string;
}

export interface DamRecord {
  id: string;
  damNumber: string; // e.g. 118-2026-10-184920
  customsOffice: string; // 'Aduana Marítima del Callao (118)'
  regime: '10 - Importación para el Consumo' | '40 - Exportación Definitiva' | '70 - Depósito Aduanero';
  customsBrokerAgency: string; // e.g. 'Agencia de Aduana Scharff S.A.'
  consigneeName: string;
  consigneeRuc: string;
  blNumber: string;
  scaleId: string;
  channel: AduanaChannel;
  levante: boolean;
  levanteDate?: string;
  numberedDate: string;
  status: 'Numerada' | 'En Aforo' | 'En Reconocimiento Físico' | 'Con Levante' | 'Observada';
  sanitaryEntity?: 'SENASA' | 'DIGESA' | 'SANIPES' | 'DIGEMID';
  sanitaryCertNumber?: string;
  sanitaryStatus?: 'Conforme' | 'Inspección Pendiente' | 'Observado';
}

export interface PortService {
  id: string;
  scaleId: string;
  serviceType: 'practicaje' | 'remolcadores' | 'amarradores' | 'lancha' | 'recoleccion_residuos' | 'energia_muelle';
  providerName: string;
  providerRuc: string;
  date: string;
  quantity: number;
  unit: string;
  currency: 'USD' | 'PEN';
  amount: number;
  invoiceNumber?: string;
  isConfirmed: boolean;
  reimbursableToLine: boolean;
}

export interface Invoice {
  id: string;
  series: string; // e.g. F001
  number: string; // e.g. 0004928
  clientName: string;
  clientRuc: string;
  issueDate: string;
  dueDate: string;
  currency: 'USD' | 'PEN';
  subtotal: number;
  igv: number; // 18%
  total: number;
  detractionRatePercent?: number; // 10% o 12%
  detractionAmount?: number;
  status: 'Emitido' | 'Aceptado SUNAT' | 'Pagado' | 'Vencido' | 'Observado';
  type: 'Factura Electrónica' | 'Nota de Crédito' | 'Nota de Débito';
  scaleReference?: string;
}

export interface AlertNotification {
  id: string;
  type: 'dicapi' | 'sunat' | 'aduana' | 'cadena_frio' | 'pago' | 'documento';
  severity: 'alta' | 'media' | 'info';
  title: string;
  description: string;
  timestamp: string;
  scaleNumber?: string;
  referenceId?: string;
  responsibleRole: UserRole;
  isRead: boolean;
}

export interface UserStory {
  id: string;
  module: string;
  title: string;
  menuPath: string;
  actor: string;
  roleKey: UserRole;
  description: string;
  peruvianContext: string;
  criteria: string[];
}
