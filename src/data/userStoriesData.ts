import { UserStory } from '../types/maritime';

export const USER_STORIES_CATALOG: UserStory[] = [
  // 1. Dashboard
  {
    id: 'HU-DAS-001',
    module: 'Dashboard',
    title: 'Resumen de operaciones',
    menuPath: 'Dashboard > Resumen de operaciones',
    actor: 'Jefe de operaciones',
    roleKey: 'jefe_operaciones',
    description: 'Ver el resumen del día por sucursal y puerto para saber qué escalas, cargas y pendientes concentran la atención de la agencia.',
    peruvianContext: 'Separa comercio exterior, cabotaje y carga fluvial, porque el aviso a DICAPI y el manifiesto ante SUNAT no se tramitan igual en los tres casos.',
    criteria: [
      'Muestra naves en puerto, arribos y zarpes del día, cargas sin liberar y comprobantes por cobrar vencidos para la sucursal activa.',
      'Cada cifra abre el listado de expedientes que la componen, filtrado por puerto del catálogo.',
      'Permite cambiar de sucursal asignada.',
      'Datos corresponden al cierre del último movimiento registrado, con hora visible.'
    ]
  },
  {
    id: 'HU-DAS-002',
    module: 'Dashboard',
    title: 'Buques en puerto',
    menuPath: 'Dashboard > Buques en puerto',
    actor: 'Operador de agencia marítima',
    roleKey: 'operador_agencia',
    description: 'Listar las naves que ya arribaron y aún no zarparon para controlar la escala mientras la nave está en el puerto peruano.',
    peruvianContext: 'Una nave "en puerto" es la que tiene arribo confirmado ante la capitanía (DICAPI) y todavía no tiene zarpe confirmado.',
    criteria: [
      'Listado incluye nave, IMO, naviera, puerto, terminal, muelle, fecha de arribo y estado de la escala.',
      'Solo escalas con arribo confirmado y zarpe pendiente.',
      'Distingue si falta autorización de zarpe de DICAPI, manifiesto observado o liquidación abierta.',
      'Abre la escala seleccionada.'
    ]
  },
  {
    id: 'HU-DAS-003',
    module: 'Dashboard',
    title: 'Llegadas programadas',
    menuPath: 'Dashboard > Llegadas programadas',
    actor: 'Operador de agencia marítima',
    roleKey: 'operador_agencia',
    description: 'Ver las llegadas de los próximos días para preparar aviso de arribo, manifiesto y ventana de atraque antes de que la nave esté en rada.',
    peruvianContext: 'La llegada prevista la informa la naviera; el ETA operativo se ajusta con el terminal y la capitanía del puerto.',
    criteria: [
      'Lista arribos con ETA, puerto, terminal, naviera y estado del aviso a DICAPI.',
      'Horizonte por defecto de 7 días ampliable.',
      'Marca llegadas incompletas si falta nave o naviera.',
      'Llegadas atrasadas respecto de ETA quedan marcadas hasta regularización.'
    ]
  },
  {
    id: 'HU-DAS-004',
    module: 'Dashboard',
    title: 'Zarpes programados',
    menuPath: 'Dashboard > Zarpes programados',
    actor: 'Operador de agencia marítima',
    roleKey: 'operador_agencia',
    description: 'Ver los zarpes previstos para completar la autorización de DICAPI y el cierre documentario antes de que la nave deje el puerto.',
    peruvianContext: 'El zarpe no se confirma si falta autorización de la capitanía o si el manifiesto de salida sigue observado por SUNAT.',
    criteria: [
      'Muestra ETD, puerto, nave, estado de autorización de zarpe y manifiesto de salida.',
      'Zarpe con autorización vencida o rechazada no se presenta como listo.',
      'Filtro por puerto y próximas 72 horas.',
      'Acceso directo a escala y bloqueos.'
    ]
  },
  {
    id: 'HU-DAS-005',
    module: 'Dashboard',
    title: 'Indicadores operativos',
    menuPath: 'Dashboard > Indicadores operativos',
    actor: 'Jefe de operaciones',
    roleKey: 'jefe_operaciones',
    description: 'Consultar indicadores de la operación portuaria y documentaria para detectar escalas que se alargan o cargas que no avanzan.',
    peruvianContext: 'Tiempos medidos entre aviso de arribo, atraque, término de operaciones, levante aduanero y zarpe ante DICAPI.',
    criteria: [
      'Escalas abiertas, tiempo promedio en puerto, importaciones sin levante y exportaciones sin embarque.',
      'Cálculo por sucursal y rango de fechas.',
      'Desglose de escalas críticas.',
      'Cifras aisladas por sucursal.'
    ]
  },
  {
    id: 'HU-DAS-006',
    module: 'Dashboard',
    title: 'Alertas y notificaciones',
    menuPath: 'Dashboard > Alertas y notificaciones',
    actor: 'Jefe de operaciones',
    roleKey: 'jefe_operaciones',
    description: 'Ver en el inicio las alertas vigentes de mi sucursal para atender arribos, documentos, pagos e incidencias antes de que venzan.',
    peruvianContext: 'Alertas de aduana, sanidad y zarpe priorizadas: zarpe sin DICAPI o DAM en canal rojo son críticas.',
    criteria: [
      'Alertas no atendidas de arribo, zarpe, vencimiento documental, pagos e incidencias.',
      'Indica expediente, vencimiento y responsable.',
      'Marcar como atendida la traslada al historial.'
    ]
  },

  // 2. Operaciones Marítimas
  {
    id: 'HU-OPE-001',
    module: 'Operaciones Marítimas',
    title: 'Registro de buques',
    menuPath: 'Operaciones Marítimas > Buques > Registro de Buques',
    actor: 'Operador de agencia marítima',
    roleKey: 'operador_agencia',
    description: 'Registrar la nave que la agencia va a atender para reutilizar sus datos en arribos, manifiestos y la cuenta de la naviera.',
    peruvianContext: 'Identificación con número IMO internacional, nombre, bandera, armador y tipo para trámites DICAPI y SUNAT.',
    criteria: [
      'Exige nombre, IMO, bandera, armador, tipo de nave y naviera representada.',
      'No se permiten dos naves activas con el mismo IMO.',
      'Valida formato de IMO y campos obligatorios.'
    ]
  },
  {
    id: 'HU-OPE-005',
    module: 'Operaciones Marítimas',
    title: 'Programación de arribos',
    menuPath: 'Operaciones Marítimas > Arribos > Programación de Arribos',
    actor: 'Operador de agencia marítima',
    roleKey: 'operador_agencia',
    description: 'Programar el arribo con el ETA que informó la naviera para iniciar el aviso a la capitanía y la coordinación con el terminal.',
    peruvianContext: 'Es el origen del aviso de arribo a DICAPI. Indica puerto, terminal previsto, procedencia y carga anunciada.',
    criteria: [
      'Exige nave activa, naviera, puerto del catálogo, ETA, procedencia y sucursal.',
      'No se duplican arribos para la misma nave, puerto y ETA.',
      'Estado inicial programado, pasa a avisado al enviar constancia DICAPI.'
    ]
  },
  {
    id: 'HU-OPE-006',
    module: 'Operaciones Marítimas',
    title: 'Confirmación de arribo',
    menuPath: 'Operaciones Marítimas > Arribos > Confirmación de Arribo',
    actor: 'Operador de agencia marítima',
    roleKey: 'operador_agencia',
    description: 'Confirmar la fecha y hora reales de arribo para abrir la escala con el dato que reconoce la capitanía y el terminal.',
    peruvianContext: 'Registra llegada a rada o atraque efectivo, y constancia del aviso ante DICAPI.',
    criteria: [
      'Solo se confirma arribo en estado programado o avisado.',
      'Exige fecha y hora real, punto de arribo (rada o muelle) y referencia DICAPI.',
      'Al confirmar abre la escala y la nave pasa a en rada o atracada.'
    ]
  },
  {
    id: 'HU-OPE-009',
    module: 'Operaciones Marítimas',
    title: 'Autorizaciones de zarpe',
    menuPath: 'Operaciones Marítimas > Zarpes > Autorizaciones',
    actor: 'Operador de agencia marítima',
    roleKey: 'operador_agencia',
    description: 'Registrar la autorización de zarpe de DICAPI para no confirmar la salida de una nave que la capitanía aún no autorizó.',
    peruvianContext: 'La autorización de zarpe la emite la capitanía (DICAPI). El sistema guarda número, fecha y resultado (autorizado, observado, denegado).',
    criteria: [
      'Vinculada a zarpe programado: número, fecha y resultado.',
      'Resultado observado o denegado bloquea confirmación de salida.',
      'Autorización vencida obliga a reprogramar.'
    ]
  },
  {
    id: 'HU-OPE-010',
    module: 'Operaciones Marítimas',
    title: 'Confirmación de zarpe',
    menuPath: 'Operaciones Marítimas > Zarpes > Confirmación de Zarpe',
    actor: 'Operador de agencia marítima',
    roleKey: 'operador_agencia',
    description: 'Confirmar la hora real de zarpe para cerrar la permanencia de la nave en el puerto y habilitar la liquidación final.',
    peruvianContext: 'Hora reconocida por DICAPI y el terminal. Sin autorización vigente de DICAPI la confirmación no procede.',
    criteria: [
      'Exige autorización de zarpe autorizada y hora real.',
      'Escala pasa a zarpada y nave sale del listado en puerto.',
      'Si el manifiesto de salida está observado por SUNAT, se bloquea la confirmación.'
    ]
  },

  // 3. Gestión de Carga
  {
    id: 'HU-CAR-001',
    module: 'Gestión de Carga',
    title: 'Registro de importaciones',
    menuPath: 'Gestión de Carga > Importaciones > Registro de Importaciones',
    actor: 'Documentador',
    roleKey: 'documentador',
    description: 'Registrar la carga de importación de una escala para vincular BL, consignatario y puerto de descarga.',
    peruvianContext: 'Se descarga en puerto peruano con RUC del consignatario y descripción para el manifiesto de ingreso SUNAT.',
    criteria: [
      'Exige escala de ingreso, puerto de descarga, consignatario RUC, descripción, peso y BL.',
      'No se duplica el número de BL en la misma escala.',
      'Clasificación obligatoria para refrigerada, peligrosa o sobredimensionada.'
    ]
  },
  {
    id: 'HU-CAR-003',
    module: 'Gestión de Carga',
    title: 'Liberación de mercancías',
    menuPath: 'Gestión de Carga > Importaciones > Liberación de Mercancías',
    actor: 'Documentador',
    roleKey: 'documentador',
    description: 'Registrar la liberación comercial de la mercancía de importación para autorizar retiro.',
    peruvianContext: 'La liberación comercial (Original BL, Telex Release o Sea Waybill) es distinta del levante aduanero de SUNAT. Ambas son requeridas para retiro.',
    criteria: [
      'Exige tipo de liberación, fecha y referencia de BL.',
      'No libera comercialmente si hay flete pendiente o disputa.',
      'Salida del terminal requiere además levante aduanero registrado.'
    ]
  },
  {
    id: 'HU-CAR-010',
    module: 'Gestión de Carga',
    title: 'Carga refrigerada',
    menuPath: 'Gestión de Carga > Carga Especial > Carga Refrigerada',
    actor: 'Coordinador portuario',
    roleKey: 'coordinador_portuario',
    description: 'Controlar la carga refrigerada de la escala para mantener la cadena de frío que exigen el terminal y SENASA / SANIPES.',
    peruvianContext: 'Perecibles e hidrobiológicos exigen set point, conexión en patio y certificado sanitario SENASA/SANIPES.',
    criteria: [
      'Muestra set point, rango tolerado, conexión/desconexión y última lectura.',
      'Lectura fuera de rango genera incidencia operativa.',
      'No se confirma embarque si el certificado sanitario está vencido.'
    ]
  },
  {
    id: 'HU-CAR-011',
    module: 'Gestión de Carga',
    title: 'Carga peligrosa',
    menuPath: 'Gestión de Carga > Carga Especial > Carga Peligrosa',
    actor: 'Documentador',
    roleKey: 'documentador',
    description: 'Registrar la carga peligrosa con su clasificación para declararla en el manifiesto y avisar al terminal antes de la operación.',
    peruvianContext: 'Declaración con Clase IMO, número UN y grupo de embalaje ante capitanía y terminal portuario.',
    criteria: [
      'Exige clase IMO, número UN, grupo de embalaje, cantidad y BL/booking.',
      'No se transmite manifiesto si falta alguno de esos datos.',
      'Queda señalizada en la planificación de estiba.'
    ]
  },

  // 4. Documentación
  {
    id: 'HU-DOC-001',
    module: 'Documentación',
    title: 'Crear manifiesto',
    menuPath: 'Documentación > Manifiestos > Crear Manifiesto',
    actor: 'Documentador',
    roleKey: 'documentador',
    description: 'Armar el manifiesto de ingreso o de salida de la escala para declarar ante SUNAT la carga que la nave trae o se lleva.',
    peruvianContext: 'Transmitido telemáticamente a SUNAT Aduanas. Debe cuadrar con BLs, contenedores y pesos de la escala.',
    criteria: [
      'Exige tipo (ingreso o salida), escala, nave, viaje, puerto y relación de BLs.',
      'Estado inicial borrador editable.',
      'No valida con BL duplicado, contenedor erróneo o peso en cero.'
    ]
  },
  {
    id: 'HU-DOC-003',
    module: 'Documentación',
    title: 'Envío a autoridades (SUNAT)',
    menuPath: 'Documentación > Manifiestos > Envío a Autoridades',
    actor: 'Documentador',
    roleKey: 'documentador',
    description: 'Registrar la transmisión del manifiesto a SUNAT y su resultado para distinguir un borrador de un manifiesto aceptado u observado.',
    peruvianContext: 'Guarda número de ticket de transmisión, constancia de recepción de SUNAT y observaciones aduaneras.',
    criteria: [
      'Transmisión pasa a estado transmitido y luego a aceptado u observado.',
      'Exige constancia y fecha de aceptación oficial.',
      'Correcciones se realizan mediante rectificatoria formal.'
    ]
  },
  {
    id: 'HU-DOC-004',
    module: 'Documentación',
    title: 'Master BL',
    menuPath: 'Documentación > Bill of Lading (BL) > Master BL',
    actor: 'Documentador',
    roleKey: 'documentador',
    description: 'Registrar el Master BL de la naviera para amparar la carga frente al manifiesto y a la cuenta de flete.',
    peruvianContext: 'Emitido por la naviera representada, ampara los contenedores a bordo frente a SUNAT.',
    criteria: [
      'Exige número, escala o viaje, puertos, embarcador, consignatario y flete.',
      'Contenedores deben existir en el registro de contenedores de la escala.'
    ]
  },
  {
    id: 'HU-DOC-004-01',
    module: 'Documentación',
    title: 'Master BL - Vista',
    menuPath: 'Documentación > Bill of Lading (BL) > Master BL > Vista',
    actor: 'Documentador',
    roleKey: 'documentador',
    description: 'Revisar información detallada del Master BL de la naviera para amparar la carga de la nave frente al manifiesto y a la cuenta de flete.',
    peruvianContext: 'El Master BL lo emite la naviera representada. Identifica embarcador, consignatario, puerto de carga, puerto de descarga peruano o extranjero, flete y contenedores.',
    criteria: [
      'Se debe mostrar la siguiente información: Master BL, escala o viaje, puerto origen, puerto descarga y puerto final, embarcador, consignatario, notificador, Marcas y Números, Descripción de mercadería, total peso, total volumen, total bultos, fletes (detalla 3 mínimo), Listado de contenedores (número, tamaño, tipo y precintos, 5 mínimo).',
      'El número no se repite para la misma naviera y viaje.',
      'El estado puede ser emitido, enmendado o anulado. La anulación exige motivo y no borra el número.',
      'Los contenedores del Master BL deben existir en el registro de contenedores de esa escala.'
    ]
  },

  // 5. Operaciones Portuarias
  {
    id: 'HU-POR-004',
    module: 'Operaciones Portuarias',
    title: 'Solicitudes de atraque',
    menuPath: 'Operaciones Portuarias > Atraques > Solicitudes de Atraque',
    actor: 'Coordinador portuario',
    roleKey: 'coordinador_portuario',
    description: 'Registrar la solicitud de atraque ante el terminal para reservar muelle y ventana para la nave representada.',
    peruvianContext: 'Atraque asignado por el terminal portuario (DP World, APM Terminals, TISUR, TPE) en el marco de la APN.',
    criteria: [
      'Exige escala, terminal, ETA, eslora, calado y tipo de carga anunciada.',
      'Estados: solicitada, confirmada, rechazada, reprogramada.',
      'Confirmación registra ventana, muelle y hora fijada.'
    ]
  },
  {
    id: 'HU-POR-007',
    module: 'Operaciones Portuarias',
    title: 'Practicaje',
    menuPath: 'Operaciones Portuarias > Servicios Portuarios > Practicaje',
    actor: 'Coordinador portuario',
    roleKey: 'coordinador_portuario',
    description: 'Registrar el practicaje de entrada y de salida para dejar constancia del servicio obligatorio y su costo.',
    peruvianContext: 'Prestado por prácticos autorizados por DICAPI. Su costo entra a la liquidación de la nave (Disbursement Account).',
    criteria: [
      'Exige escala, tipo (entrada o salida), fecha, práctico y monto en USD.',
      'No se confirma zarpe sin practicaje de salida registrado salvo exoneración legal.'
    ]
  },

  // 8. Aduanas
  {
    id: 'HU-ADU-001',
    module: 'Aduanas',
    title: 'Registro DAM',
    menuPath: 'Aduanas > DAM > Registro DAM',
    actor: 'Analista de aduanas',
    roleKey: 'analista_aduanas',
    description: 'Registrar la DAM asociada a la carga para vincular el despacho aduanero al BL, al consignatario y a la escala.',
    peruvianContext: 'Declaración Aduanera de Mercancías ante SUNAT tramitada por la agencia de aduana autorizada.',
    criteria: [
      'Exige carga o BL, número de DAM, régimen aduanero, aduana de despacho y agencia de aduana.',
      'Consignatario de la DAM coincide con el de la carga.'
    ]
  },
  {
    id: 'HU-ADU-003',
    module: 'Aduanas',
    title: 'Seguimiento de DAM y Canales',
    menuPath: 'Aduanas > DAM > Seguimiento',
    actor: 'Analista de aduanas',
    roleKey: 'analista_aduanas',
    description: 'Seguir la DAM desde su numeración hasta el levante para anticipar aforo, reconocimiento o una observación de SUNAT.',
    peruvianContext: 'Canal Verde (levante directo), Canal Naranja (revisión documentaria / aforo), Canal Rojo (reconocimiento físico en muelle o depósito).',
    criteria: [
      'Muestra numerada, canal asignado, aforo, reconocimiento, observada y con levante.',
      'Canal no se borra, queda en historial.',
      'Actualiza en tiempo real el seguimiento de la carga.'
    ]
  },
  {
    id: 'HU-ADU-004',
    module: 'Aduanas',
    title: 'Levante aduanero',
    menuPath: 'Aduanas > Despachos Aduaneros > Levante Aduanero',
    actor: 'Analista de aduanas',
    roleKey: 'analista_aduanas',
    description: 'Registrar el levante de SUNAT para habilitar la salida de la mercancía del terminal o depósito.',
    peruvianContext: 'El levante autoriza la disposición legal de la mercancía. Junto con la liberación comercial habilita el gate out.',
    criteria: [
      'Exige DAM, fecha, constancia y carga cubierta.',
      'DAM pasa a con levante y habilita salida del terminal.',
      'Permite levantes parciales identificando bultos o series.'
    ]
  },

  // 9. Facturación y Finanzas
  {
    id: 'HU-FIN-004',
    module: 'Facturación y Finanzas',
    title: 'Emisión de facturas electrónicas',
    menuPath: 'Facturación y Finanzas > Facturación > Emisión de Facturas',
    actor: 'Contador / tesorería',
    roleKey: 'contador',
    description: 'Emitir la factura electrónica del servicio para cobrar al cliente o a la naviera con comprobante válido ante SUNAT.',
    peruvianContext: 'Lleva RUC del emisor, serie autorizada (F001/F002), RUC de adquirente, IGV (18%) y cálculo de detracción (10% o 12%).',
    criteria: [
      'Exige cliente con RUC activo, serie vigente, moneda (USD o PEN), base imponible e IGV.',
      'Comprobante aceptado entra a cuentas por cobrar.',
      'Muestra porcentaje y monto de detracción tributaria para el Banco de la Nación.'
    ]
  },
  {
    id: 'HU-FIN-015',
    module: 'Facturación y Finanzas',
    title: 'Liquidación final de buques (Disbursement Account)',
    menuPath: 'Facturación y Finanzas > Liquidación de Buques > Liquidación Final',
    actor: 'Contador / tesorería',
    roleKey: 'contador',
    description: 'Cerrar la liquidación final de la escala para enviar a la naviera la cuenta definitiva de gastos y servicios después del zarpe.',
    peruvianContext: 'Disbursement account consolidada: prácticos, remolcadores, uso de muelle, recolección de basura, agency fee en USD.',
    criteria: [
      'Exige escala zarpada, relación de gastos con comprobantes de proveedores y agency fee contractual.',
      'Calcula total por moneda y saldo contra anticipos recibidos.',
      'Genera estado de cuenta final para armador.'
    ]
  },

  // 14. Portal de Clientes
  {
    id: 'HU-PTL-001',
    module: 'Portal de Clientes',
    title: 'Estado de carga en portal',
    menuPath: 'Portal de Clientes > Consultas > Estado de Carga',
    actor: 'Cliente del portal',
    roleKey: 'cliente_portal',
    description: 'Consultar el estado de mi carga para saber si está a bordo, en el terminal, liberada o entregada sin ver datos de terceros.',
    peruvianContext: 'Aislado por RUC del importador/exportador. Muestra manifiesto, descarga, canal aduanero, levante y entrega sin costos internos de la agencia.',
    criteria: [
      'Búsqueda por BL, booking o contenedor de su propia cuenta.',
      'Muestra último hito y fecha.',
      'No permite acceder a datos de otros clientes ni costos de naviera.'
    ]
  }
];
