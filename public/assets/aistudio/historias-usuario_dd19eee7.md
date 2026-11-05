---
title: Historias de usuario — Sistema de Gestión para Agencia Marítima
version: 1.0
fecha: Noviembre 2026
pais: Perú
origen: menu.md
---

# Historias de usuario

Sistema de Gestión para Agencia Marítima. Una historia por cada opción de menú de `menu.md`, escrita para la operación de una agencia marítima en el Perú.

## Objetivo

Describir el comportamiento esperado de cada opción del menú para que operaciones, documentación, aduanas, logística, finanzas y el portal de clientes trabajen sobre la misma escala, la misma carga y la misma cuenta, con las autoridades y prácticas del comercio exterior peruano.

## Actores

| Actor | Rol en la operación |
| --- | --- |
| Operador de agencia marítima | Programa arribos, zarpes y escalas de las naves representadas. |
| Documentador | Elabora manifiestos, conocimientos de embarque y el archivo de la escala. |
| Coordinador portuario | Coordina atraque, servicios a la nave y estiba con el terminal. |
| Ejecutivo comercial | Atiende clientes, cotiza y administra contratos y tarifarios. |
| Analista de aduanas | Registra y hace seguimiento de DAM, levante y fiscalizaciones. No reemplaza a una agencia de aduana autorizada por SUNAT, salvo que la propia empresa también lo sea. |
| Contador / tesorería | Emite comprobantes electrónicos, cobra, paga y liquida la escala. |
| Jefe de operaciones o gerencia | Consulta indicadores, reportes y excepciones. |
| Administrador del sistema | Administra empresas, sucursales, usuarios, roles y parámetros. |
| Cliente del portal | Importador, exportador, consignatario o naviera. Solo ve su propia cuenta. |
| Conductor o almacén | Ejecuta el viaje terrestre o el movimiento de almacén que la agencia programó. |

## Glosario

| Término | Uso en estas historias |
| --- | --- |
| DICAPI | Dirección General de Capitanías y Guardacostas. Aviso de arribo y autorización de zarpe. |
| APN | Autoridad Portuaria Nacional. Marco de la actividad portuaria; el atraque se concreta con el terminal. |
| SUNAT | Aduanas y comprobantes de pago electrónicos. Manifiesto de carga, DAM, levante y factura electrónica. |
| DAM | Declaración Aduanera de Mercancías. La presenta la agencia de aduana autorizada. |
| Canal | Verde, naranja o rojo, asignado por SUNAT al despacho. |
| Levante | Autorización de SUNAT para disponer de la mercancía. |
| SENASA | Control sanitario agropecuario. |
| DIGESA | Control sanitario de alimentos industrializados, cosméticos y afines. |
| SANIPES | Control sanitario pesquero y acuícola. |
| DIGEMID | Control de productos farmacéuticos y dispositivos médicos. |
| MTC | Permisos de transporte y de carga sobredimensionada o con exceso de peso en vía pública. |
| Master BL / House BL | Conocimiento de embarque máster de la naviera y conocimiento hijo del consolidador o agente. |
| Telex release / sea waybill | Liberación sin original en papel, o conocimiento no negociable. |
| Liquidación de escala | Cuenta de gastos de la nave (disbursement account) a la naviera representada. |
| GRE | Guía de remisión electrónica que ampara el traslado terrestre de la carga. |
| RUC | Registro Único de Contribuyentes, identificador tributario del cliente o proveedor. |

## Reglas transversales

1. Toda operación pertenece a una empresa y a una sucursal. El usuario solo actúa sobre las empresas y sucursales que tiene asignadas.
2. El puerto de la operación sale del catálogo (Callao, Paita, Salaverry, Chimbote, Pisco, Matarani, Ilo y los demás que la administración habilite), incluido cabotaje y recintos fluviales cuando apliquen.
3. Cada acción de alta, cambio, anulación o transmisión queda en la bitácora con usuario, fecha y valor anterior.
4. El portal de clientes no muestra costos internos de la naviera, liquidaciones de otras cuentas ni datos de terceros.
5. Los importes se registran en soles o en dólares, con tipo de cambio del día cuando la historia lo exige. El IGV vigente se aplica en los comprobantes electrónicos.
6. Una nave no puede tener dos escalas abiertas en el mismo puerto y la misma fecha de arribo.

## Convenciones

- Identificador: `HU-<módulo>-<nnn>`.
- Módulos: DAS, OPE, CAR, DOC, POR, CLI, LOG, ADU, FIN, REP, ALE, RRH, ADM, PTL.
- Cada historia corresponde a una hoja del menú.

---

# 1. Dashboard

## HU-DAS-001 — Resumen de operaciones

- **Menú:** Dashboard > Resumen de operaciones
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** ver el resumen del día por sucursal y puerto
**para** saber qué escalas, cargas y pendientes concentran la atención de la agencia.

**Contexto peruano.** El resumen separa comercio exterior, cabotaje y carga fluvial, porque el aviso a DICAPI y el manifiesto ante SUNAT no se tramitan igual en los tres casos.

**Criterios de aceptación**

1. El resumen muestra, para la sucursal activa, naves en puerto, arribos y zarpes del día, cargas sin liberar y comprobantes por cobrar vencidos.
2. Cada cifra abre el listado de expedientes que la componen, filtrado por puerto del catálogo.
3. Si el usuario tiene más de una sucursal, puede cambiar de sucursal; no ve cifras de sucursales no asignadas.
4. Los datos corresponden al cierre del último movimiento registrado, con la hora de actualización visible.

## HU-DAS-002 — Buques en puerto

- **Menú:** Dashboard > Buques en puerto
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** listar las naves que ya arribaron y aún no zarparon
**para** controlar la escala mientras la nave está en el puerto peruano.

**Contexto peruano.** Una nave “en puerto” es la que tiene arribo confirmado ante la capitanía y todavía no tiene zarpe confirmado.

**Criterios de aceptación**

1. El listado incluye nave, IMO, naviera representada, puerto, terminal, muelle, fecha de arribo y estado de la escala.
2. Solo aparecen escalas con arribo confirmado y zarpe pendiente.
3. El operador distingue si falta autorización de zarpe de DICAPI, manifiesto observado o liquidación abierta.
4. Al elegir una nave se abre su escala, no un registro ajeno a la sucursal.

## HU-DAS-003 — Llegadas programadas

- **Menú:** Dashboard > Llegadas programadas
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** ver las llegadas de los próximos días
**para** preparar aviso de arribo, manifiesto y ventana de atraque antes de que la nave esté en rada.

**Contexto peruano.** La llegada prevista la informa la naviera; el ETA operativo se ajusta con el terminal y la capitanía del puerto.

**Criterios de aceptación**

1. El tablero lista arribos programados con ETA, puerto, terminal, naviera y estado del aviso a DICAPI.
2. El horizonte por defecto es de siete días y puede ampliarse sin mezclar escalas ya confirmadas.
3. Una llegada sin nave, sin puerto del catálogo o sin naviera representada se muestra como incompleta.
4. Las llegadas atrasadas respecto del ETA quedan marcadas y siguen visibles hasta su confirmación o reprogramación.

## HU-DAS-004 — Zarpes programados

- **Menú:** Dashboard > Zarpes programados
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** ver los zarpes previstos
**para** completar la autorización de DICAPI y el cierre documentario antes de que la nave deje el puerto.

**Contexto peruano.** El zarpe no se confirma en el sistema si falta la autorización de la capitanía o si el manifiesto de salida sigue observado por SUNAT.

**Criterios de aceptación**

1. El listado muestra ETD, puerto, nave, estado de la autorización de zarpe y estado del manifiesto de salida.
2. Un zarpe con autorización vencida o rechazada no se presenta como listo.
3. El operador filtra por puerto y por las siguientes 72 horas.
4. Desde el zarpe se llega a la escala y a los pendientes que lo bloquean.

## HU-DAS-005 — Indicadores operativos

- **Menú:** Dashboard > Indicadores operativos
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** consultar indicadores de la operación portuaria y documentaria
**para** detectar escalas que se alargan o cargas que no avanzan.

**Contexto peruano.** Los tiempos se miden entre aviso de arribo, atraque, término de operaciones, levante cuando aplica y zarpe, que son los hitos que la agencia explica a la naviera.

**Criterios de aceptación**

1. Los indicadores incluyen escalas abiertas, tiempo promedio en puerto, cargas de importación sin levante y exportaciones sin embarque confirmado.
2. Cada indicador se calcula con las escalas de la sucursal y el rango de fechas elegido.
3. El jefe puede abrir el detalle de las escalas que empeoran el indicador.
4. Un indicador sin datos en el periodo se muestra en cero y no toma cifras de otra sucursal.

## HU-DAS-006 — Alertas y notificaciones

- **Menú:** Dashboard > Alertas y notificaciones
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** ver en el inicio las alertas vigentes de mi sucursal
**para** atender arribos, documentos, pagos e incidencias antes de que venzan.

**Contexto peruano.** Las alertas de aduana, sanidad y zarpe tienen prioridad distinta: un zarpe sin autorización de DICAPI o una DAM en canal rojo no se tratan como un aviso informativo.

**Criterios de aceptación**

1. El recuadro muestra alertas no atendidas de arribo, zarpe, documento por vencer, pago, incidencia y aduana.
2. Cada alerta indica expediente, vencimiento y responsable.
3. Al marcarla como atendida deja de aparecer en el inicio y queda en el historial de alertas.
4. El usuario no ve alertas de sucursales o cuentas que no tiene asignadas.

---

# 2. Operaciones marítimas

## Buques

## HU-OPE-001 — Registro de buques

- **Menú:** Operaciones Marítimas > Buques > Registro de Buques
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** registrar la nave que la agencia va a atender
**para** reutilizar sus datos en arribos, manifiestos y la cuenta de la naviera.

**Contexto peruano.** La nave se identifica con número IMO, nombre, bandera, armador y tipo. Esos datos viajan al aviso de arribo y al manifiesto de carga.

**Criterios de aceptación**

1. El registro exige nombre, IMO, bandera, armador, tipo de nave y naviera representada.
2. No se guardan dos naves activas con el mismo IMO.
3. Un IMO con formato inválido o un nombre vacío impide guardar.
4. El alta queda asociada a la empresa y queda registrada en la bitácora.

## HU-OPE-002 — Consulta de buques

- **Menú:** Operaciones Marítimas > Buques > Consulta de Buques
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** buscar naves por nombre, IMO o naviera
**para** confirmar si ya existe antes de abrir una escala.

**Contexto peruano.** La misma nave puede recalar en Callao, Paita, Matarani u otro puerto del catálogo; la consulta muestra la ficha única y sus escalas por puerto.

**Criterios de aceptación**

1. La búsqueda funciona por nombre parcial, IMO exacto y naviera.
2. El resultado muestra bandera, armador, estado de la ficha y la última escala en un puerto peruano.
3. Una nave inactiva aparece en la consulta y no puede usarse en un arribo nuevo.
4. La consulta no altera datos de la nave.

## HU-OPE-003 — Estado de buques

- **Menú:** Operaciones Marítimas > Buques > Estado de Buques
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** actualizar el estado operativo de la nave
**para** distinguir si está en tránsito, en rada, atracada, en operación o ya zarpó.

**Contexto peruano.** El estado de la nave en el puerto sigue a la escala. No se marca “zarpó” si DICAPI aún no autorizó el zarpe.

**Criterios de aceptación**

1. Los estados permitidos son en tránsito, en rada, atracada, en operación, zarpada e inactiva.
2. El paso a zarpada exige zarpe confirmado de esa escala.
3. El cambio de estado guarda usuario, fecha y estado anterior.
4. El estado vigente se refleja en el listado de buques en puerto.

## HU-OPE-004 — Historial de escalas

- **Menú:** Operaciones Marítimas > Buques > Historial de Escalas
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** ver las escalas anteriores de una nave
**para** revisar cómo se atendió en puertos peruanos y qué quedó pendiente con la naviera.

**Contexto peruano.** El historial conserva puerto, terminal, fechas de arribo y zarpe, y el número de liquidación de cada recalada.

**Criterios de aceptación**

1. El historial lista las escalas de la nave ordenadas de la más reciente a la más antigua.
2. Cada fila muestra puerto, terminal, arribo, zarpe, naviera y estado de la liquidación.
3. Se puede abrir una escala cerrada en solo lectura.
4. Una nave sin escalas muestra el historial vacío y mantiene la ficha de la nave.

## Arribos

## HU-OPE-005 — Programación de arribos

- **Menú:** Operaciones Marítimas > Arribos > Programación de Arribos
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** programar el arribo con el ETA que informó la naviera
**para** iniciar el aviso a la capitanía y la coordinación con el terminal.

**Contexto peruano.** La programación es el origen del aviso de arribo a DICAPI. Debe indicar puerto, terminal previsto, procedencia y carga anunciada.

**Criterios de aceptación**

1. La programación exige nave activa, naviera, puerto del catálogo, ETA, puerto de procedencia y sucursal.
2. No se crean dos programaciones activas para la misma nave, puerto y ETA.
3. El estado inicial es programado. Desde ahí puede pasar a avisado cuando se registra el aviso a la capitanía.
4. Un ETA anterior a la fecha de trabajo solo se guarda si el operador indica que es una regularización y deja el motivo.

## HU-OPE-006 — Confirmación de arribo

- **Menú:** Operaciones Marítimas > Arribos > Confirmación de Arribo
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** confirmar la fecha y hora reales de arribo
**para** abrir la escala con el dato que reconoce la capitanía y el terminal.

**Contexto peruano.** La confirmación registra la llegada a rada o el atraque efectivo, y el número o constancia del aviso ante DICAPI cuando la capitanía ya lo tiene.

**Criterios de aceptación**

1. Solo se confirma un arribo en estado programado o avisado.
2. La confirmación exige fecha y hora reales, punto de arribo (rada o muelle) y referencia del aviso a DICAPI.
3. Al confirmar se abre la escala, la nave pasa a en rada o atracada, y el arribo queda confirmado.
4. No se confirma un arribo de una nave inactiva o de una sucursal no asignada.

## HU-OPE-007 — Control de arribos

- **Menú:** Operaciones Marítimas > Arribos > Control de Arribos
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** controlar los arribos del periodo por puerto y estado
**para** detectar programaciones vencidas o arribos sin aviso a la capitanía.

**Contexto peruano.** El control compara el ETA informado a la naviera con la hora reconocida por la capitanía del puerto.

**Criterios de aceptación**

1. El control lista arribos programados, avisados, confirmados y reprogramados del rango elegido.
2. Un arribo cuyo ETA ya pasó y sigue programado queda marcado como atrasado.
3. Se filtra por puerto, naviera y sucursal asignada.
4. Desde el control no se borra el arribo; la anulación exige motivo y deja la programación en el historial.

## Zarpes

## HU-OPE-008 — Programación de zarpe

- **Menú:** Operaciones Marítimas > Zarpes > Programación de Zarpe
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** programar el zarpe de una escala abierta
**para** preparar la solicitud ante DICAPI y avisar a la naviera el ETD.

**Contexto peruano.** El zarpe se solicita a la capitanía del puerto cuando terminan las operaciones y están regulares el manifiesto y los servicios obligatorios de la nave.

**Criterios de aceptación**

1. Solo se programa zarpe sobre una escala con arribo confirmado y sin zarpe confirmado.
2. La programación exige ETD, puerto de destino y calado o condición de salida que la capitanía suele requerir.
3. El estado inicial es programado.
4. El ETD no puede ser anterior al arribo confirmado de esa escala.

## HU-OPE-009 — Autorizaciones

- **Menú:** Operaciones Marítimas > Zarpes > Autorizaciones
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** registrar la autorización de zarpe de DICAPI
**para** no confirmar la salida de una nave que la capitanía aún no autorizó.

**Contexto peruano.** La autorización de zarpe la emite la capitanía. El sistema guarda número, fecha y resultado; no sustituye el trámite ante DICAPI.

**Criterios de aceptación**

1. La autorización se vincula a un zarpe programado y exige número, fecha y resultado: autorizado, observado o denegado.
2. Un resultado observado o denegado mantiene el zarpe como no listo para confirmar e indica el motivo.
3. Una autorización vencida respecto del ETD obliga a reprogramar antes de confirmar.
4. El registro guarda el usuario que cargó la constancia y no permite dos autorizaciones vigentes para el mismo zarpe.

## HU-OPE-010 — Confirmación de zarpe

- **Menú:** Operaciones Marítimas > Zarpes > Confirmación de Zarpe
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** confirmar la hora real de zarpe
**para** cerrar la permanencia de la nave en el puerto y habilitar la liquidación final de la escala.

**Contexto peruano.** La hora de zarpe es la que la capitanía y el terminal reconocen. Sin autorización vigente de DICAPI la confirmación no procede.

**Criterios de aceptación**

1. La confirmación exige autorización de zarpe en estado autorizado y hora real de salida.
2. Al confirmar, la escala pasa a zarpada, la nave sale del listado de buques en puerto y el zarpe queda confirmado.
3. Si el manifiesto de salida está observado, la confirmación se bloquea y se indica ese pendiente.
4. La hora real no puede ser anterior al arribo confirmado ni posterior al momento del registro, salvo regularización con motivo.

## Escalas

## HU-OPE-011 — Escalas programadas

- **Menú:** Operaciones Marítimas > Escalas > Escalas Programadas
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** consultar las escalas aún no zarpadas
**para** seguir la recalada desde el aviso hasta el zarpe.

**Contexto peruano.** La escala es la unidad que agrupa arribo, atraque, carga, manifiesto y gastos de la nave en un puerto peruano.

**Criterios de aceptación**

1. El listado muestra escalas programadas o abiertas, con nave, puerto, terminal, ETA o arribo, ETD y naviera.
2. Se excluyen las escalas ya zarpadas y anuladas.
3. El operador filtra por puerto, naviera y rango de ETA.
4. Al abrir una escala se ven sus arribos, zarpes y pendientes documentarios.

## HU-OPE-012 — Escalas históricas

- **Menú:** Operaciones Marítimas > Escalas > Escalas Históricas
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** consultar escalas ya zarpadas o anuladas
**para** responder a la naviera por una recalada anterior y revisar su liquidación.

**Contexto peruano.** La escala histórica conserva el número de liquidación y los documentos transmitidos a SUNAT y presentados a la capitanía.

**Criterios de aceptación**

1. Solo aparecen escalas en estado zarpada o anulada.
2. Cada registro muestra puerto, arribo, zarpe, naviera y estado de la liquidación.
3. La consulta es de solo lectura; un cambio posterior se hace por rectificación con motivo, no editando el cierre.
4. Se puede buscar por nave, número de escala, puerto y rango de zarpe.

## HU-OPE-013 — Control de operaciones

- **Menú:** Operaciones Marítimas > Escalas > Control de Operaciones
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** controlar las tareas abiertas de cada escala
**para** saber si faltan atraque, servicios a la nave, manifiesto o cierre de carga.

**Contexto peruano.** El control reúne los pendientes que la agencia debe explicar al terminal, a DICAPI y a la naviera antes del zarpe.

**Criterios de aceptación**

1. Por cada escala abierta se listan pendientes de atraque, practicaje, remolque, amarre, manifiesto, carga y zarpe.
2. Un pendiente bloqueante impide marcar la escala como lista para zarpe.
3. El coordinador puede dar por cumplida una tarea propia de su rol y debe indicar la evidencia o el número de constancia.
4. El control no muestra escalas de sucursales no asignadas.

---

# 3. Gestión de carga

## Importaciones

## HU-CAR-001 — Registro de importaciones

- **Menú:** Gestión de Carga > Importaciones > Registro de Importaciones
- **Actor:** Documentador

**Como** documentador
**quiero** registrar la carga de importación de una escala
**para** vincular el conocimiento de embarque, el consignatario y el puerto de descarga.

**Contexto peruano.** La importación se descarga en un puerto peruano y queda identificada con el BL, el consignatario (RUC o documento) y la descripción que luego irá al manifiesto de ingreso.

**Criterios de aceptación**

1. El registro exige escala de ingreso, puerto de descarga, consignatario, descripción de la mercancía, peso, bultos o contenedores y número de BL.
2. El mismo número de BL no se registra dos veces en la misma escala.
3. El estado inicial es manifestada en borrador hasta que el manifiesto sea aceptado.
4. Si la carga es refrigerada, peligrosa o sobredimensionada, el registro obliga a clasificarla para las opciones de carga especial.

## HU-CAR-002 — Seguimiento de cargas

- **Menú:** Gestión de Carga > Importaciones > Seguimiento de Cargas
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** seguir cada importación desde el manifiesto hasta la entrega
**para** informar al consignatario en qué punto está su carga.

**Contexto peruano.** El seguimiento usa hitos locales: manifiesto aceptado, descarga, DAM numerada, canal, levante, y salida del terminal o del almacén.

**Criterios de aceptación**

1. Cada carga muestra la secuencia manifiesto, descarga, dam, canal, levante y entrega, con fecha del último hito.
2. Un hito no puede registrarse si falta el anterior, salvo regularización con motivo.
3. El operador filtra por consignatario, BL, contenedor, puerto y escala.
4. El estado visible para el cliente del portal es el mismo que figura en este seguimiento, sin costos internos.

## HU-CAR-003 — Liberación de mercancías

- **Menú:** Gestión de Carga > Importaciones > Liberación de Mercancías
- **Actor:** Documentador

**Como** documentador
**quiero** registrar la liberación de la mercancía de importación
**para** dejar constancia de que el consignatario ya puede disponer de ella frente a la nave y al terminal.

**Contexto peruano.** La liberación comercial (BL original, telex release o sea waybill, y flete pagado si corresponde) es distinta del levante aduanero de SUNAT. Las dos deben constar antes de la salida de carga de importación.

**Criterios de aceptación**

1. La liberación exige tipo (original, telex release o sea waybill), fecha y referencia del BL.
2. No queda liberada comercialmente si el BL está en disputa o el flete figura pendiente según el tarifario de la naviera.
3. La salida del terminal además exige levante aduanero registrado, salvo régimen que no lo requiera y quede identificado.
4. La liberación guarda usuario y no se reversa sin motivo y sin permiso del documentador responsable.

## Exportaciones

## HU-CAR-004 — Registro de exportaciones

- **Menú:** Gestión de Carga > Exportaciones > Registro de Exportaciones
- **Actor:** Documentador

**Como** documentador
**quiero** registrar la carga de exportación que se embarcará en la escala
**para** reservar espacio y preparar el manifiesto de salida.

**Contexto peruano.** La exportación sale por un puerto peruano. El registro toma al embarcador, el puerto de destino, el booking de la naviera y la mercancía.

**Criterios de aceptación**

1. El registro exige escala de salida, embarcador, puerto de destino, booking, descripción, peso y bultos o contenedores.
2. El booking no se duplica en estado activo para la misma nave y viaje.
3. El estado inicial es reservado.
4. La mercancía sujeta a certificado sanitario, de origen o permiso especial no pasa a embarcada si ese certificado no está vigente en el expediente.

## HU-CAR-005 — Control de embarques

- **Menú:** Gestión de Carga > Exportaciones > Control de Embarques
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** controlar qué exportaciones ya ingresaron al puerto y cuáles se embarcaron
**para** cuadrar el plano de estiba con la carga realmente a bordo.

**Contexto peruano.** El control compara el booking, el ingreso al terminal y el embarque efectivo antes de transmitir el manifiesto de salida a SUNAT.

**Criterios de aceptación**

1. Cada exportación figura como reservada, ingresada al terminal, embarcada o cortada.
2. No se marca embarcada si no hay ingreso al terminal o cut-off vigente de la nave.
3. Una carga cortada exige motivo y deja de sumar al manifiesto de salida.
4. El total embarcado por escala cuadra en bultos, peso y contenedores con lo que el documentador enviará en el manifiesto.

## HU-CAR-006 — Seguimiento de exportaciones

- **Menú:** Gestión de Carga > Exportaciones > Seguimiento de Exportaciones
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** seguir la exportación de un cliente hasta el zarpe
**para** responder si su carga zarpó, quedó en tierra o espera documento.

**Contexto peruano.** El cliente exportador necesita saber booking, ingreso al puerto, embarque y número de BL, que es lo que luego usa ante el banco o el comprador del exterior.

**Criterios de aceptación**

1. El seguimiento muestra booking, escala, estado de embarque, BL cuando ya existe y pendientes documentarios.
2. Se busca por embarcador, booking, contenedor o escala.
3. Una exportación cortada muestra el motivo y no aparece como embarcada.
4. El ejecutivo no modifica el embarque desde esta consulta.

## Contenedores

## HU-CAR-007 — Registro de contenedores

- **Menú:** Gestión de Carga > Contenedores > Registro de Contenedores
- **Actor:** Documentador

**Como** documentador
**quiero** registrar cada contenedor de la carga
**para** identificar equipo, precinto, tipo y condición en el manifiesto y en el terminal.

**Contexto peruano.** El contenedor se informa a SUNAT y al terminal con número, tipo (20, 40, reefer, open top u otro), tara, precinto y condición lleno o vacío.

**Criterios de aceptación**

1. El registro exige número de contenedor, tipo, condición, precinto cuando va lleno, escala y BL o booking asociado.
2. El número cumple el formato internacional de contenedor; si no cumple, no se guarda.
3. El mismo número no queda activo dos veces en la misma escala y el mismo movimiento.
4. Un reefer obliga a indicar set point antes de guardar.

## HU-CAR-008 — Tracking de contenedores

- **Menú:** Gestión de Carga > Contenedores > Tracking de Contenedores
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** ubicar un contenedor por su número
**para** decir si está a bordo, en el terminal, en almacén o en ruta terrestre.

**Contexto peruano.** El tracking refleja los movimientos del equipo en el puerto peruano y, si la agencia programó el viaje, el traslado amparado por guía de remisión.

**Criterios de aceptación**

1. La búsqueda por número muestra el último movimiento, la escala, el BL o booking y el puerto.
2. La línea de tiempo incluye descarga o embarque, gate in, gate out y, si existe, ingreso a almacén o entrega.
3. Un contenedor sin movimientos muestra solo su registro y el estado inicial.
4. El cliente del portal ve esta misma ubicación de sus contenedores, sin movimientos de otros clientes.

## HU-CAR-009 — Control de movimientos

- **Menú:** Gestión de Carga > Contenedores > Control de Movimientos
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar y controlar los movimientos del contenedor
**para** cuadrar el equipo que entra y sale del terminal con lo manifestado.

**Contexto peruano.** Los movimientos relevantes son embarque, descarga, gate in, gate out y traslado a depósito temporal o almacén aduanero.

**Criterios de aceptación**

1. Cada movimiento exige contenedor, tipo de movimiento, fecha, lugar y escala.
2. No se registra gate out de un lleno de importación si no hay liberación comercial y levante, salvo régimen identificado que lo permita.
3. El movimiento guarda usuario y no se elimina; una corrección genera un contra-movimiento con motivo.
4. El saldo del contenedor por escala coincide con el último movimiento válido.

## Carga especial

## HU-CAR-010 — Carga refrigerada

- **Menú:** Gestión de Carga > Carga Especial > Carga Refrigerada
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** controlar la carga refrigerada de la escala
**para** mantener la cadena de frío que exigen el terminal y, cuando corresponde, SENASA o SANIPES.

**Contexto peruano.** Productos perecibles, hidrobiológicos y congelados suelen requerir set point, conexión en patio y certificado sanitario vigente antes del embarque o del levante.

**Criterios de aceptación**

1. Cada reefer de la escala muestra set point, rango tolerado, conexión o desconexión y última lectura.
2. Una lectura fuera de rango genera una incidencia operativa vinculada al contenedor.
3. No se confirma el embarque de exportación refrigerada si el certificado sanitario exigido está vencido.
4. El registro identifica si el control sanitario es SENASA, SANIPES u otro.

## HU-CAR-011 — Carga peligrosa

- **Menú:** Gestión de Carga > Carga Especial > Carga Peligrosa
- **Actor:** Documentador

**Como** documentador
**quiero** registrar la carga peligrosa con su clasificación
**para** declararla en el manifiesto y avisar al terminal antes de la operación.

**Contexto peruano.** La carga peligrosa se declara con clase IMO, número UN y grupo de embalaje. El terminal y la capitanía pueden condicionar el atraque o la estiba si la declaración no está completa.

**Criterios de aceptación**

1. El registro exige clase IMO, número UN, grupo de embalaje, cantidad y BL o booking.
2. No se transmite el manifiesto de esa carga si falta alguno de esos datos.
3. La carga peligrosa queda marcada en la escala para el coordinador portuario y para la planificación de estiba.
4. Una corrección de clase o número UN después de transmitido el manifiesto obliga a rectificatoria, no a un cambio silencioso.

## HU-CAR-012 — Carga sobredimensionada

- **Menú:** Gestión de Carga > Carga Especial > Carga Sobredimensionada
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar la carga que excede medidas o peso
**para** coordinar el izaje en el terminal y el permiso de transporte en vía pública.

**Contexto peruano.** El exceso de peso o dimensión en el traslado terrestre requiere permiso del MTC o de la autoridad vial competente, además de la ventana del terminal.

**Criterios de aceptación**

1. El registro exige largo, ancho, alto, peso, BL o booking y si el traslado sale a vía pública.
2. Si sale a vía pública, no se programa el viaje terrestre sin número de permiso vigente.
3. La pieza queda identificada en la planificación de estiba como carga no contenerizada o break bulk especial.
4. Las medidas en cero o incompletas impiden guardar.

---

# 4. Documentación

## Manifiestos

## HU-DOC-001 — Crear manifiesto

- **Menú:** Documentación > Manifiestos > Crear Manifiesto
- **Actor:** Documentador

**Como** documentador
**quiero** armar el manifiesto de ingreso o de salida de la escala
**para** declarar ante SUNAT la carga que la nave trae o se lleva.

**Contexto peruano.** El manifiesto de carga se transmite a SUNAT. Debe cuadrar con los BL o bookings, los contenedores, los pesos y el puerto peruano de la escala.

**Criterios de aceptación**

1. El manifiesto exige tipo (ingreso o salida), escala, nave, viaje, puerto y la relación de conocimientos o bookings.
2. El estado inicial es borrador. En borrador se puede agregar o retirar carga.
3. No pasa de borrador si hay BL duplicado, contenedor inválido o peso en cero.
4. La carga peligrosa y la refrigerada arrastran su clasificación al detalle del manifiesto.

## HU-DOC-002 — Consulta de manifiestos

- **Menú:** Documentación > Manifiestos > Consulta de Manifiestos
- **Actor:** Documentador

**Como** documentador
**quiero** consultar manifiestos por escala, número o estado
**para** revisar qué se transmitió a SUNAT y qué sigue en borrador u observado.

**Contexto peruano.** Los estados útiles para la agencia son borrador, transmitido, aceptado y observado, que son los que determinan si la nave puede cerrar carga.

**Criterios de aceptación**

1. La consulta filtra por escala, puerto, tipo, número y estado.
2. Un manifiesto aceptado se abre en solo lectura, con el número de aceptación de SUNAT.
3. Un manifiesto observado muestra el motivo registrado.
4. La consulta no cambia el estado ni reenvía el documento.

## HU-DOC-003 — Envío a autoridades

- **Menú:** Documentación > Manifiestos > Envío a Autoridades
- **Actor:** Documentador

**Como** documentador
**quiero** registrar la transmisión del manifiesto a SUNAT y su resultado
**para** distinguir un borrador de un manifiesto aceptado u observado.

**Contexto peruano.** La transmisión oficial es hacia SUNAT. El sistema guarda número de ticket o aceptación, fecha y mensajes de observación; la constancia no se da por enviada solo con el borrador.

**Criterios de aceptación**

1. Solo se envía un manifiesto en borrador o observado, completo según las validaciones de creación.
2. Al transmitir, el estado pasa a transmitido y, al recibir resultado, a aceptado u observado.
3. El resultado exige número de constancia o de aceptación, fecha y, si es observado, el detalle del error.
4. Un manifiesto aceptado no se reenvía; la corrección se hace por rectificatoria vinculada al número original.

## Bill of Lading

## HU-DOC-004 — Master BL

- **Menú:** Documentación > Bill of Lading (BL) > Master BL
- **Actor:** Documentador

**Como** documentador
**quiero** registrar el Master BL de la naviera
**para** amparar la carga de la nave frente al manifiesto y a la cuenta de flete.

**Contexto peruano.** El Master BL lo emite la naviera representada. Identifica embarcador, consignatario, puerto de carga, puerto de descarga peruano o extranjero, flete y contenedores.

**Criterios de aceptación**

1. El Master BL exige número, escala o viaje, puertos, embarcador, consignatario, flete y detalle de carga.
2. El número no se repite para la misma naviera y viaje.
3. El estado puede ser emitido, enmendado o anulado. La anulación exige motivo y no borra el número.
4. Los contenedores del Master BL deben existir en el registro de contenedores de esa escala.

## HU-DOC-005 — House BL

- **Menú:** Documentación > Bill of Lading (BL) > House BL
- **Actor:** Documentador

**Como** documentador
**quiero** registrar los House BL asociados a un Master
**para** identificar a cada consignatario o embarcador de una consolidación.

**Contexto peruano.** En carga consolidada, el House BL individualiza al importador o exportador peruano y debe cuadrar en peso y bultos con el Master.

**Criterios de aceptación**

1. Cada House BL exige número, Master BL padre, consignatario o embarcador propio, peso y bultos.
2. La suma de pesos de los House activos no supera el peso del Master, salvo tolerancia registrada en parámetros.
3. Un House sin Master no se guarda.
4. La anulación de un House no anula el Master y queda en el historial.

## HU-DOC-006 — Liberación de BL

- **Menú:** Documentación > Bill of Lading (BL) > Liberación de BL
- **Actor:** Documentador

**Como** documentador
**quiero** liberar un conocimiento de embarque
**para** autorizar la entrega de la carga cuando se cumplió la condición de la naviera.

**Contexto peruano.** La liberación puede ser por original endosado, telex release o sea waybill. Es un acto de la agencia frente a la naviera y no reemplaza el levante de SUNAT.

**Criterios de aceptación**

1. La liberación exige BL, modalidad (original, telex release o sea waybill), fecha y quién autoriza.
2. No se libera si hay carta de garantía pendiente o flete impago cuando el contrato de la naviera así lo exige.
3. Al liberar, la mercancía asociada puede continuar a liberación de mercancías; antes de eso la salida permanece bloqueada.
4. La reversión exige motivo, permiso y registro en la bitácora.

## Certificados

## HU-DOC-007 — Certificados de origen

- **Menú:** Documentación > Certificados > Certificados de Origen
- **Actor:** Documentador

**Como** documentador
**quiero** archivar el certificado de origen de la carga
**para** dejarlo disponible al exportador, al importador y al despacho aduanero.

**Contexto peruano.** El certificado de origen respalda preferencias arancelarias. La agencia lo custodia y lo asocia al BL; no lo emite si no es la entidad competente.

**Criterios de aceptación**

1. El registro exige número, entidad emisora, país, vigencia, BL o booking y archivo digital.
2. Un certificado vencido no se marca como vigente.
3. Queda visible para el cliente del portal dueño de esa carga y para el analista de aduanas del expediente.
4. No se puede asociar el mismo número vigente a dos BL de clientes distintos.

## HU-DOC-008 — Certificados sanitarios

- **Menú:** Documentación > Certificados > Certificados Sanitarios
- **Actor:** Documentador

**Como** documentador
**quiero** registrar el certificado sanitario de la mercancía
**para** cumplir el control de SENASA, DIGESA o SANIPES antes del embarque o de la entrega.

**Contexto peruano.** Alimentos agropecuarios, hidrobiológicos y productos industrializados de consumo humano llevan certificados de autoridades distintas. El tipo de autoridad forma parte del registro.

**Criterios de aceptación**

1. El certificado exige autoridad (SENASA, DIGESA, SANIPES u otra), número, producto, vigencia y BL o booking.
2. Si está vencido, la carga no avanza a embarque ni se informa como lista para entrega.
3. El archivo digital queda ligado al expediente y disponible para la fiscalización correspondiente.
4. Cambiar la autoridad emisora después de usado en un embarque exige rectificación con motivo.

## HU-DOC-009 — Certificados especiales

- **Menú:** Documentación > Certificados > Certificados Especiales
- **Actor:** Documentador

**Como** documentador
**quiero** registrar certificados distintos del origen y del sanitario
**para** cubrir fumigación, seguros, pesos u otros documentos que pide el cliente o la autoridad.

**Contexto peruano.** En la práctica portuaria peruana suelen pedirse certificado de fumigación, de peso, póliza de seguro o autorización sectorial. El tipo queda catalogado para no mezclarlos con el certificado de origen.

**Criterios de aceptación**

1. El registro exige tipo de certificado, emisor, número, vigencia si aplica, y BL, booking o escala.
2. El tipo sale de un catálogo administrable; un tipo nuevo lo crea el administrador, no el documentador en texto libre.
3. Si el tipo está marcado como bloqueante, la carga no se embarca ni se entrega sin un certificado vigente.
4. El documento digital queda en el expediente de la carga.

## Archivo documental

## HU-DOC-010 — Gestión documental

- **Menú:** Documentación > Archivo Documental > Gestión Documental
- **Actor:** Documentador

**Como** documentador
**quiero** organizar los documentos de la escala y de la carga
**para** encontrar el BL, el manifiesto, la autorización de zarpe y los certificados en un solo expediente.

**Contexto peruano.** El expediente de la escala reúne lo presentado a DICAPI, lo transmitido a SUNAT y lo entregado al cliente, con su estado de vigencia.

**Criterios de aceptación**

1. Cada documento se clasifica por expediente (escala, carga o cliente), tipo y estado: vigente, vencido o anulado.
2. Un documento anulado sigue visible y no se ofrece como descarga vigente en el portal.
3. El documentador asocia el archivo a la escala o al BL correcto; no queda un archivo huérfano.
4. El acceso respeta el rol: el cliente solo ve documentos de su cuenta marcados como compartibles.

## HU-DOC-011 — Digitalización

- **Menú:** Documentación > Archivo Documental > Digitalización
- **Actor:** Documentador

**Como** documentador
**quiero** incorporar la imagen o el PDF del documento físico
**para** conservar la constancia de capitanía, el BL original escaneado o el certificado recibido en mesa de partes.

**Contexto peruano.** Varias constancias de DICAPI, terminales y entidades sanitarias todavía llegan en PDF o en papel. La copia digital queda unida al número del documento.

**Criterios de aceptación**

1. La digitalización exige expediente, tipo de documento, archivo y fecha de recepción.
2. Se aceptan los formatos definidos en parámetros; un archivo vacío o de tipo no permitido se rechaza.
3. El archivo queda ligado al documento lógico y no reemplaza una versión anterior sin dejar la previa en historial.
4. La acción queda en la bitácora con usuario y fecha.

## HU-DOC-012 — Consulta histórica

- **Menú:** Documentación > Archivo Documental > Consulta Histórica
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** consultar documentos de escalas ya cerradas
**para** atender un reclamo de la naviera o una fiscalización posterior.

**Contexto peruano.** SUNAT, la capitanía o el cliente pueden pedir constancias de una recalada anterior. La consulta histórica no reabre la escala.

**Criterios de aceptación**

1. La búsqueda cubre escalas zarpadas y anuladas por nave, BL, número de manifiesto o rango de fechas.
2. Los documentos se abren en solo lectura, incluida la versión que estuvo vigente al zarpe.
3. Un documento anulado se distingue del vigente en su momento.
4. La consulta queda registrada como acceso al expediente histórico.

---

# 5. Operaciones portuarias

## Atención de naves

## HU-POR-001 — Programación de atención

- **Menú:** Operaciones Portuarias > Atención de Naves > Programación de Atención
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** programar la atención de la nave en el terminal
**para** ordenar ventana, servicios y personal antes del atraque.

**Contexto peruano.** La atención se acuerda con el terminal del puerto (por ejemplo los terminales del Callao, Paita o Matarani) y toma como base la escala ya programada.

**Criterios de aceptación**

1. La programación exige escala abierta, terminal, ventana prevista y tipo de operación (descarga, embarque o ambas).
2. No se programan dos atenciones activas para la misma escala y la misma ventana.
3. El estado inicial es programada y pasa a en ejecución cuando inicia la operación en muelle.
4. Una escala sin arribo programado no puede recibir atención portuaria.

## HU-POR-002 — Asignación de recursos

- **Menú:** Operaciones Portuarias > Atención de Naves > Asignación de Recursos
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** asignar personal y proveedores a la atención de la nave
**para** cubrir la escala con los recursos que la agencia comprometió con la naviera.

**Contexto peruano.** Los recursos propios (boarding officer, documentador de turno) se distinguen de los servicios contratados al terminal, al práctico o al remolcador, que luego se liquidan a la nave.

**Criterios de aceptación**

1. Cada asignación exige atención, recurso (personal interno o proveedor), inicio y fin previstos.
2. Un empleado no se asigna a dos atenciones cuyas ventanas se cruzan.
3. Un proveedor solo se asigna si está activo y tiene el servicio contratado vigente.
4. La asignación queda vinculada a la escala para que sus costos puedan pasar a la liquidación.

## HU-POR-003 — Seguimiento operativo

- **Menú:** Operaciones Portuarias > Atención de Naves > Seguimiento Operativo
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar el avance de la atención
**para** informar a la naviera hora de inicio, interrupciones y término de operaciones.

**Contexto peruano.** El término de operaciones es un hito de la escala: a partir de ahí se preparan zarpe, manifiesto definitivo y liquidación de gastos portuarios.

**Criterios de aceptación**

1. El seguimiento registra inicio, interrupciones con motivo y término de operaciones sobre una atención programada.
2. No se registra término si no hay inicio.
3. Una interrupción mayor al tiempo definido en parámetros genera una incidencia operativa.
4. El término actualiza el estado de la atención y queda visible en el control de la escala.

## Atraques

## HU-POR-004 — Solicitudes de atraque

- **Menú:** Operaciones Portuarias > Atraques > Solicitudes de Atraque
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar la solicitud de atraque ante el terminal
**para** reservar muelle y ventana para la nave representada.

**Contexto peruano.** El atraque lo asigna el terminal, en el marco de la APN y del reglamento del puerto. La agencia solicita y guarda la respuesta; no asigna el muelle por su cuenta.

**Criterios de aceptación**

1. La solicitud exige escala, terminal, ETA, eslora, calado y tipo de carga anunciada.
2. Los estados son solicitada, confirmada, rechazada y reprogramada.
3. Una solicitud rechazada exige motivo y no deja el muelle como reservado.
4. La confirmación guarda número de ventana o de reserva del terminal, muelle y hora.

## HU-POR-005 — Control de muelles

- **Menú:** Operaciones Portuarias > Atraques > Control de Muelles
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** controlar qué nave está en cada muelle
**para** no cruzar ventanas ni perder la referencia del sitio durante la escala.

**Contexto peruano.** El muelle pertenece a un terminal del puerto. El control refleja la ocupación informada por el terminal, no un plano inventado por la agencia.

**Criterios de aceptación**

1. Cada muelle del terminal muestra libre, reservado u ocupado, y la nave cuando no está libre.
2. No se confirma la ocupación de un muelle ya ocupado por otra escala abierta.
3. Al confirmar el zarpe, el muelle de esa escala pasa a libre.
4. El coordinador filtra por puerto y terminal de su sucursal.

## HU-POR-006 — Disponibilidad de espacios

- **Menú:** Operaciones Portuarias > Atraques > Disponibilidad de Espacios
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** consultar los espacios disponibles en el horizonte de arribos
**para** proponer a la naviera una ventana antes de confirmar el atraque.

**Contexto peruano.** La disponibilidad es la que el terminal comunicó a la agencia para los próximos días en ese puerto.

**Criterios de aceptación**

1. La consulta muestra, por terminal y muelle, las ventanas libres y las ya reservadas del rango elegido.
2. Una ventana reservada identifica la nave y no se ofrece como libre.
3. El coordinador no crea muelles desde esta consulta; los muelles salen del catálogo del puerto.
4. Si el terminal no informó disponibilidad, el resultado lo indica y no muestra espacios ficticios.

## Servicios portuarios

## HU-POR-007 — Practicaje

- **Menú:** Operaciones Portuarias > Servicios Portuarios > Practicaje
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar el practicaje de entrada y de salida
**para** dejar constancia del servicio obligatorio y de su costo en la liquidación de la nave.

**Contexto peruano.** El practicaje en los puertos peruanos lo presta el práctico autorizado. La agencia registra hora, práctico y tarifa que luego cobra o reembolsa la naviera.

**Criterios de aceptación**

1. Cada servicio exige escala, tipo (entrada o salida), fecha, práctico o empresa y monto.
2. No se confirma el zarpe si el puerto exige practicaje de salida y este no está registrado, salvo exoneración documentada.
3. El monto y la moneda quedan disponibles para gastos portuarios de la liquidación.
4. Una corrección de monto después de incluida en una liquidación cerrada genera un ajuste, no un cambio del cierre.

## HU-POR-008 — Remolcadores

- **Menú:** Operaciones Portuarias > Servicios Portuarios > Remolcadores
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar los remolcadores usados en la maniobra
**para** sustentar el gasto ante la naviera y el terminal.

**Contexto peruano.** La maniobra de atraque o desatraque puede exigir uno o más remolcadores según eslora, condición de la nave y disposición del puerto.

**Criterios de aceptación**

1. El registro exige escala, maniobra (atraque o desatraque), cantidad de remolcadores, empresa, hora y monto.
2. La cantidad no puede ser cero.
3. El gasto queda asociado a la escala para la liquidación.
4. Se puede consultar el historial de remolcadores de la nave en ese puerto.

## HU-POR-009 — Amarradores

- **Menú:** Operaciones Portuarias > Servicios Portuarios > Amarradores
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar el servicio de amarradores
**para** completar los servicios de maniobra que se liquidan con la escala.

**Contexto peruano.** El amarre y desamarre los realiza el personal autorizado del puerto. Su costo entra a la cuenta de gastos de la nave junto con práctico y remolcador.

**Criterios de aceptación**

1. El registro exige escala, tipo (amarre o desamarre), cuadrilla o empresa, hora y monto.
2. El servicio se vincula al atraque confirmado de esa escala.
3. El monto pasa a gastos portuarios solo cuando el servicio está confirmado.
4. No se duplica un amarre confirmado para la misma hora y la misma escala.

## HU-POR-010 — Servicios especiales

- **Menú:** Operaciones Portuarias > Servicios Portuarios > Servicios Especiales
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar servicios de nave distintos del practicaje, el remolque y el amarre
**para** incluir lancha, avituallamiento, basura, agua o energía en la liquidación.

**Contexto peruano.** La naviera suele reembolsar estos servicios contra constancia del proveedor local. El tipo sale del catálogo para que la liquidación los agrupe igual en cada puerto.

**Criterios de aceptación**

1. El registro exige escala, tipo de servicio del catálogo, proveedor, fecha, cantidad y monto.
2. Un tipo que no está en el catálogo no se guarda como texto libre.
3. El proveedor debe estar activo y evaluable.
4. El servicio confirmado queda disponible para la liquidación de la escala y no se borra si ya fue incluido en un borrador de liquidación; se anula con motivo.

## Estiba y desestiba

## HU-POR-011 — Planificación

- **Menú:** Operaciones Portuarias > Estiba y Desestiba > Planificación
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** registrar el plan de estiba o desestiba de la escala
**para** acordar con el terminal la secuencia de contenedores y de carga suelta.

**Contexto peruano.** El plan lo trabaja el terminal con la información de bahía y de carga que entrega la agencia. La carga peligrosa y la sobredimensionada deben verse en el plan.

**Criterios de aceptación**

1. El plan exige escala, tipo (estiba o desestiba), versión y relación de contenedores o bultos.
2. La carga peligrosa y la sobredimensionada de esa escala aparecen identificadas en el plan.
3. Una versión nueva no borra la anterior; la vigente es la última confirmada con el terminal.
4. No se confirma el plan si hay contenedores del manifiesto que no están en la relación ni excluidos con motivo.

## HU-POR-012 — Seguimiento

- **Menú:** Operaciones Portuarias > Estiba y Desestiba > Seguimiento
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** seguir el avance de la estiba o desestiba contra el plan
**para** conocer lo movido, lo pendiente y lo cortado antes del cierre de bodega.

**Contexto peruano.** El avance se concilia con los movimientos del terminal y con lo que el documentador declarará en el manifiesto definitivo.

**Criterios de aceptación**

1. El seguimiento muestra planificado, movido, pendiente y cortado por escala.
2. Un movimiento real se apoya en un contenedor o bulto ya registrado.
3. Lo cortado exige motivo y deja de contar como embarcado o descargado.
4. El total movido no supera lo planificado más las incorporaciones de última hora registradas como cambio de plan.

## HU-POR-013 — Control de costos

- **Menú:** Operaciones Portuarias > Estiba y Desestiba > Control de Costos
- **Actor:** Contador / tesorería

**Como** contador
**quiero** controlar el costo de estiba y desestiba de la escala
**para** separar lo que asume la naviera de lo que se cobra al dueño de la carga.

**Contexto peruano.** La tarifa de estiba depende del terminal y del contrato con la naviera. El costo se expresa en soles o en dólares y entra a la liquidación o a la factura del cliente según a quién corresponda.

**Criterios de aceptación**

1. Cada costo exige escala, concepto, moneda, monto, responsable del gasto (naviera o cliente de la carga) y proveedor.
2. El concepto usa el tarifario vigente del terminal o el acuerdo de la naviera.
3. Un costo ya incluido en una liquidación cerrada o en una factura emitida no se modifica; se ajusta con nota o con la siguiente liquidación.
4. El control muestra el total por escala y por responsable del gasto.

---

# 6. Clientes y representadas

## Clientes

## HU-CLI-001 — Importadores

- **Menú:** Clientes y Representadas > Clientes > Importadores
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** mantener el padrón de importadores
**para** asociar sus embarques, su RUC y sus usuarios del portal a la cuenta correcta.

**Contexto peruano.** El importador se identifica con RUC. Es quien figura como consignatario o como dueño de la mercancía y quien recibe la factura electrónica.

**Criterios de aceptación**

1. El alta exige razón social, RUC válido de 11 dígitos, domicilio y sucursal comercial que lo atiende.
2. No hay dos importadores activos con el mismo RUC en la misma empresa.
3. Un importador inactivo no se usa en un BL nuevo ni recibe factura.
4. La ficha indica si tiene acceso al portal y qué cuentas puede ver.

## HU-CLI-002 — Exportadores

- **Menú:** Clientes y Representadas > Clientes > Exportadores
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** mantener el padrón de exportadores
**para** reservar bookings y facturar el servicio de la agencia al embarcador correcto.

**Contexto peruano.** El exportador peruano se identifica con RUC y es el embarcador del House BL o del booking de exportación.

**Criterios de aceptación**

1. El alta exige razón social, RUC válido, domicilio y contacto operativo.
2. El RUC no se duplica entre exportadores activos de la empresa.
3. El exportador puede ser también importador; la ficha lo indica sin crear un tercero distinto con el mismo RUC.
4. Un exportador inactivo no admite un booking nuevo.

## HU-CLI-003 — Consignatarios

- **Menú:** Clientes y Representadas > Clientes > Consignatarios
- **Actor:** Documentador

**Como** documentador
**quiero** registrar al consignatario del conocimiento de embarque
**para** notificar el arribo y liberar la carga a quien corresponde.

**Contexto peruano.** El consignatario del BL puede ser el importador, un banco (a la orden) o un agente. Para notificar y facturar se necesita su documento: RUC, carné de extranjería o el que corresponda si es un consignatario del exterior.

**Criterios de aceptación**

1. El registro exige nombre o razón social, tipo y número de documento, y si es “a la orden”.
2. Si es “a la orden”, la liberación exige el endoso o la instrucción de la naviera antes de entregar.
3. El consignatario se puede vincular a un importador ya padroneado cuando son la misma persona.
4. Cambiar el consignatario de un BL ya transmitido en el manifiesto exige rectificatoria.

## Navieras

## HU-CLI-004 — Registro de navieras

- **Menú:** Clientes y Representadas > Navieras > Registro de Navieras
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** registrar las navieras que la agencia representa
**para** atribuir cada nave, cada manifiesto y cada liquidación a la cuenta correcta.

**Contexto peruano.** La agencia marítima actúa por cuenta de la naviera representada. La ficha identifica razón social, país y el contacto al que se envía la liquidación de la escala.

**Criterios de aceptación**

1. El alta exige nombre, identificador tributario o código interno, país y correo de liquidaciones.
2. No se crean dos navieras activas con el mismo código en la empresa.
3. Una naviera inactiva no se asigna a un arribo nuevo y conserva sus escalas históricas.
4. La ficha indica las sucursales peruanas donde la agencia la representa.

## HU-CLI-005 — Contratos

- **Menú:** Clientes y Representadas > Navieras > Contratos
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** registrar el contrato de representación con la naviera
**para** saber vigencia, puertos cubiertos y condiciones de facturación de la escala.

**Contexto peruano.** El contrato de agenciamiento define en qué puertos peruanos se representa a la nave y cómo se cobra el agency fee y los gastos reembolsables.

**Criterios de aceptación**

1. El contrato exige naviera, número, inicio, fin, puertos del catálogo y moneda de liquidación.
2. No hay dos contratos vigentes superpuestos para la misma naviera y el mismo puerto.
3. Un arribo en un puerto fuera del contrato vigente queda observado hasta que el comercial lo regularice.
4. El vencimiento del contrato no borra las escalas ya abiertas; impide abrir escalas nuevas bajo ese contrato.

## HU-CLI-006 — Tarifarios

- **Menú:** Clientes y Representadas > Navieras > Tarifarios
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** mantener el tarifario acordado con la naviera
**para** aplicar agency fee, documentación y gastos según el puerto y el tipo de nave.

**Contexto peruano.** Las tarifas de agenciamiento suelen diferenciar puerto (Callao frente a puertos regionales), tipo de nave y si la escala es de línea regular o de tramp.

**Criterios de aceptación**

1. Cada tarifa exige naviera, concepto, puerto o “todos”, vigencia, moneda e importe.
2. En una fecha dada solo hay una tarifa vigente por naviera, concepto y puerto.
3. La liquidación de la escala toma la tarifa vigente en la fecha de arribo.
4. Un cambio de importe no reescribe liquidaciones ya cerradas.

## Agentes internacionales

## HU-CLI-007 — Registro

- **Menú:** Clientes y Representadas > Agentes Internacionales > Registro
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** registrar a los agentes del exterior con los que la agencia se corresponde
**para** nominar carga, proteger cuentas y coordinar el BL en origen o destino.

**Contexto peruano.** El agente extranjero es el corresponsal de la carga en el puerto de origen o de destino. No es un proveedor local ni una naviera representada.

**Criterios de aceptación**

1. El alta exige nombre, país, puerto habitual y correo operativo.
2. El agente se puede marcar como corresponsal de una o varias navieras.
3. Un agente inactivo no se nomina en un BL nuevo.
4. El registro no le otorga acceso al portal de clientes salvo que se le cree un usuario aparte.

## HU-CLI-008 — Convenios

- **Menú:** Clientes y Representadas > Agentes Internacionales > Convenios
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** registrar el convenio con el agente internacional
**para** aplicar la condición de nominación y la participación acordada.

**Contexto peruano.** El convenio fija si el agente protege la cuenta del importador peruano y qué comunicación se le debe sobre el arribo y el BL.

**Criterios de aceptación**

1. El convenio exige agente, inicio, fin y condición de nominación.
2. No hay dos convenios vigentes con el mismo agente y el mismo alcance.
3. Una carga nominada a un agente sin convenio vigente queda observada para el comercial.
4. El fin del convenio no altera BL ya emitidos; sí impide nominaciones nuevas.

## HU-CLI-009 — Contactos

- **Menú:** Clientes y Representadas > Agentes Internacionales > Contactos
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** mantener los contactos del agente internacional
**para** enviar prealertas, BL y avisos de arribo a la persona correcta.

**Contexto peruano.** La operación con el corresponsal depende del contacto de documentación y del de operaciones, a menudo en huso horario distinto al del Perú.

**Criterios de aceptación**

1. Cada contacto exige agente, nombre, correo y rol (operaciones, documentación o finanzas).
2. Debe existir al menos un contacto de documentación para nominar carga a ese agente.
3. Un contacto dado de baja no recibe notificaciones nuevas y permanece en el historial.
4. El correo se valida en formato y no se duplica en estado activo para el mismo agente y rol.

## Proveedores

## HU-CLI-010 — Registro de proveedores

- **Menú:** Clientes y Representadas > Proveedores > Registro de Proveedores
- **Actor:** Contador / tesorería

**Como** contador
**quiero** registrar a los proveedores de la agencia
**para** asociar prácticos, remolcadores, transportistas y terminales a sus comprobantes.

**Contexto peruano.** El proveedor local se identifica con RUC. Es a quien se le registra la factura de compra y, cuando corresponde, la detracción del servicio.

**Criterios de aceptación**

1. El alta exige razón social, RUC válido, tipo de servicio y moneda habitual.
2. No hay dos proveedores activos con el mismo RUC en la empresa.
3. Un proveedor inactivo no se asigna a un servicio nuevo y conserva sus obligaciones pendientes.
4. La ficha indica si el servicio está sujeto a detracción según el parámetro vigente.

## HU-CLI-011 — Servicios contratados

- **Menú:** Clientes y Representadas > Proveedores > Servicios Contratados
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** ver y registrar los servicios contratados con cada proveedor
**para** usar solo contratos vigentes al atender la nave o mover la carga.

**Contexto peruano.** El contrato puede ser de practicaje, remolque, transporte terrestre, depósito o estiba, con tarifa por puerto.

**Criterios de aceptación**

1. El servicio contratado exige proveedor, tipo, puerto, vigencia y tarifa o forma de cálculo.
2. Al asignar el servicio en una escala se usa el contrato vigente para ese puerto.
3. Un contrato vencido no se ofrece en asignaciones nuevas.
4. La tarifa del contrato es la referencia del costo; un monto distinto exige motivo.

## HU-CLI-012 — Evaluación de proveedores

- **Menú:** Clientes y Representadas > Proveedores > Evaluación de Proveedores
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** evaluar al proveedor después del servicio
**para** decidir si sigue atendiéndose naves y carga con él.

**Contexto peruano.** La evaluación mira cumplimiento de la ventana en el puerto, incidencias de la carga y conformidad del comprobante. No sustituye un proceso de homologación legal externo.

**Criterios de aceptación**

1. La evaluación exige proveedor, periodo o escala, criterio y resultado.
2. Un resultado deficiente reiterado, según el parámetro, marca al proveedor como observado.
3. Un proveedor observado no se asigna a una escala nueva sin autorización del jefe de operaciones.
4. Cada evaluación guarda evaluador y fecha, y no se borra; se rectifica con motivo.

---

# 7. Logística y transporte

## Transporte terrestre

## HU-LOG-001 — Programación de viajes

- **Menú:** Logística y Transporte > Transporte Terrestre > Programación de Viajes
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** programar el viaje terrestre de la carga
**para** llevar el contenedor o la carga suelta entre el terminal, el almacén y el local del cliente.

**Contexto peruano.** El traslado de bienes se ampara con guía de remisión electrónica cuando corresponde. La programación identifica origen, destino, unidad, conductor y la carga.

**Criterios de aceptación**

1. El viaje exige carga o contenedor, origen, destino, fecha, vehículo y conductor.
2. No se programa la salida de una importación sin liberación comercial y levante, salvo régimen identificado.
3. La carga sobredimensionada que usa vía pública exige permiso vigente antes de confirmar el viaje.
4. Al confirmar el viaje queda pendiente la guía de remisión; el viaje no se cierra como ejecutado sin ella cuando el parámetro lo exige.

## HU-LOG-002 — Control de vehículos

- **Menú:** Logística y Transporte > Transporte Terrestre > Control de Vehículos
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** controlar las unidades que mueven la carga
**para** asignar solo vehículos habilitados y disponibles.

**Contexto peruano.** La unidad se identifica con placa. Si es de un transportista, el proveedor debe estar activo; la tarjeta de circulación y la revisión técnica vigentes se registran como condición para programar.

**Criterios de aceptación**

1. Cada vehículo exige placa, tipo, propietario (propio o proveedor) y estado: disponible, en viaje o fuera de servicio.
2. No se asigna a un viaje una unidad en viaje o fuera de servicio.
3. Una unidad con revisión técnica vencida, si ese dato está cargado, no se programa.
4. Al cerrar el viaje la unidad vuelve a disponible, salvo que se la marque fuera de servicio con motivo.

## HU-LOG-003 — Seguimiento GPS

- **Menú:** Logística y Transporte > Transporte Terrestre > Seguimiento GPS
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** seguir la posición del viaje en curso
**para** avisar al cliente y al almacén si la unidad se desvía o se detiene.

**Contexto peruano.** El seguimiento corresponde a viajes programados por la agencia dentro del territorio peruano, desde el puerto hasta el destino declarado en la guía.

**Criterios de aceptación**

1. El seguimiento muestra solo viajes en estado en ruta, con última posición, hora y placa.
2. Si no hay señal dentro del tiempo definido en parámetros, el viaje queda como sin señal y se genera una incidencia.
3. El cliente del portal ve el estado de su viaje (en ruta, llegado o sin señal), no la flota completa de la agencia.
4. Un viaje ya recepcionado deja de reportarse como posición activa.

## Despachos

## HU-LOG-004 — Programación

- **Menú:** Logística y Transporte > Despachos > Programación
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** programar el despacho de la carga al cliente o al almacén
**para** coordinar entrega, conductor y documentos de salida.

**Contexto peruano.** El despacho de importación sale del terminal o del depósito temporal hacia el local del consignatario, con levante y guía de remisión cuando corresponden.

**Criterios de aceptación**

1. El despacho exige carga, lugar de recojo, lugar de entrega, fecha y destinatario.
2. No se programa si la carga no está liberada según las reglas de liberación de mercancías.
3. El despacho puede generar un viaje terrestre vinculado, sin duplicar la carga en dos despachos activos.
4. El estado inicial es programado.

## HU-LOG-005 — Control de entregas

- **Menú:** Logística y Transporte > Despachos > Control de Entregas
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** controlar las entregas del día
**para** saber qué despachos salieron, cuáles están en ruta y cuáles no llegaron.

**Contexto peruano.** El control cuadra el contenedor o los bultos que salieron del puerto con lo que el cliente debe recibir, y con la guía de remisión del traslado.

**Criterios de aceptación**

1. El control lista despachos programados, en ruta, entregados y fallidos del rango elegido.
2. Un despacho fallido exige motivo y deja la carga disponible para reprogramar.
3. Se filtra por cliente, puerto de origen y sucursal.
4. El operador no marca entregado desde este control si falta la confirmación de recepción.

## HU-LOG-006 — Confirmación de recepción

- **Menú:** Logística y Transporte > Despachos > Confirmación de Recepción
- **Actor:** Conductor o almacén

**Como** responsable de almacén o el operador que registra la conformidad del conductor
**quiero** confirmar que el destinatario recibió la carga
**para** cerrar el despacho y dejar constancia de bultos y novedades.

**Contexto peruano.** La conformidad cierra el traslado amparado por la guía. Una diferencia de bultos o un daño se registra antes de dar la carga por entregada.

**Criterios de aceptación**

1. La confirmación exige despacho en ruta, fecha, receptor y resultado: conforme o con novedad.
2. Si hay novedad, se indica bultos recibidos, diferencia y si genera incidencia.
3. Al confirmar conforme, el despacho pasa a entregado y el viaje asociado puede cerrarse.
4. No se confirma un despacho de otra sucursal o de un cliente que el usuario no atiende.

## Almacenes

## HU-LOG-007 — Ingresos

- **Menú:** Logística y Transporte > Almacenes > Ingresos
- **Actor:** Conductor o almacén

**Como** responsable de almacén
**quiero** registrar el ingreso de carga al almacén
**para** tomar responsabilidad sobre bultos, contenedor y documento de traslado.

**Contexto peruano.** El ingreso puede venir del terminal portuario o de un depósito temporal. Queda amparado por la guía de remisión y, si sigue bajo control aduanero, por la condición del régimen.

**Criterios de aceptación**

1. El ingreso exige almacén, carga o contenedor, fecha, bultos o equipo y documento de traslado.
2. No se ingresa una importación que aún no tiene levante si el almacén no está habilitado para esa condición, y el sistema lo indica.
3. El ingreso aumenta el inventario de esa carga en ese almacén.
4. Un ingreso anulado exige motivo y revierte el inventario solo si la carga no tuvo después una salida.

## HU-LOG-008 — Salidas

- **Menú:** Logística y Transporte > Almacenes > Salidas
- **Actor:** Conductor o almacén

**Como** responsable de almacén
**quiero** registrar la salida de carga del almacén
**para** entregar al cliente o despachar al terminal con el saldo correcto.

**Contexto peruano.** La salida hacia el puerto de exportación o hacia el local del cliente debe coincidir con el despacho programado y con la guía de remisión.

**Criterios de aceptación**

1. La salida exige almacén, carga, cantidad y destino.
2. No se retira más de lo que hay en inventario.
3. La salida de exportación queda vinculada al booking o al despacho hacia el terminal.
4. Cada salida guarda usuario, fecha y documento de traslado.

## HU-LOG-009 — Inventario de carga

- **Menú:** Logística y Transporte > Almacenes > Inventario de Carga
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** consultar el inventario de carga por almacén
**para** conocer saldo, antigüedad y a qué cliente o BL pertenece.

**Contexto peruano.** El inventario de la agencia no reemplaza el stock del depósito aduanero autorizado; refleja la carga que la agencia tiene bajo su coordinación en almacenes propios o de terceros.

**Criterios de aceptación**

1. El inventario muestra almacén, carga, cliente, BL o booking, cantidad y fecha de ingreso.
2. El saldo es ingresos menos salidas válidas; una anulación ya aplicada no vuelve a sumar.
3. Se filtra por cliente, contenedor, almacén y sucursal.
4. La consulta no modifica existencias. El cliente del portal solo ve su propio saldo.

---

# 8. Aduanas

La agencia registra y hace seguimiento de los hitos aduaneros. La numeración y la presentación de la DAM ante SUNAT las realiza la agencia de aduana autorizada. Si la propia empresa también cuenta con esa autorización, el analista lo indica en el expediente; el sistema no da por presentada una DAM solo por haberla registrado.

## DAM

## HU-ADU-001 — Registro DAM

- **Menú:** Aduanas > DAM > Registro DAM
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** registrar la DAM asociada a la carga
**para** vincular el despacho aduanero al BL, al consignatario y a la escala.

**Contexto peruano.** La DAM es la declaración de mercancías ante SUNAT. El registro guarda número, régimen, aduana de despacho y agencia de aduana responsable.

**Criterios de aceptación**

1. El registro exige carga o BL, número de DAM, régimen, aduana, fecha y agencia de aduana.
2. El mismo número de DAM no se asocia dos veces en estado activo.
3. El estado inicial es numerada. No se marca presentada ante SUNAT si falta el número.
4. El consignatario de la DAM debe coincidir con el de la carga o quedar justificada la diferencia.

## HU-ADU-002 — Consulta DAM

- **Menú:** Aduanas > DAM > Consulta DAM
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** consultar DAM por número, BL o consignatario
**para** responder el estado del despacho sin alterar la declaración.

**Contexto peruano.** La consulta muestra régimen, aduana operativa, canal y si ya hay levante, que es lo que el consignatario pregunta a la agencia.

**Criterios de aceptación**

1. La búsqueda funciona por número de DAM, BL, consignatario y rango de fechas.
2. El resultado muestra régimen, canal, agencia de aduana y último hito.
3. La consulta es de solo lectura.
4. El analista no ve DAM de sucursales o clientes que no tiene asignados.

## HU-ADU-003 — Seguimiento

- **Menú:** Aduanas > DAM > Seguimiento
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** seguir la DAM desde su numeración hasta el levante
**para** anticipar aforo, reconocimiento o una observación de SUNAT.

**Contexto peruano.** El canal verde, naranja o rojo define si el despacho sigue directo, con revisión documentaria o con reconocimiento físico.

**Criterios de aceptación**

1. El seguimiento muestra numerada, canal asignado, en aforo, en reconocimiento, observada, con levante o dejada sin efecto.
2. El canal se registra una vez conocido y no se borra; un cambio de canal queda en el historial.
3. No se informa levante si el estado anterior no lo permite, salvo regularización con motivo y constancia.
4. El hito vigente de la DAM actualiza el seguimiento de la carga de importación.

## Despachos aduaneros

## HU-ADU-004 — Levante aduanero

- **Menú:** Aduanas > Despachos Aduaneros > Levante Aduanero
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** registrar el levante de SUNAT
**para** habilitar la salida de la mercancía del terminal o del depósito.

**Contexto peruano.** El levante autoriza a disponer de la mercancía. Sin ese registro, la liberación comercial del BL no basta para programar el despacho de una importación sujeta a despacho.

**Criterios de aceptación**

1. El levante exige DAM, fecha, número de constancia y carga cubierta.
2. Al registrarlo, la DAM pasa a con levante y la carga queda habilitada para la salida, si la liberación comercial también está conforme.
3. Un levante parcial identifica los bultos o series cubiertos y no libera el saldo restante.
4. La anulación del levante exige motivo, bloquea despachos no ejecutados y queda en la bitácora.

## HU-ADU-005 — Aforos

- **Menú:** Aduanas > Despachos Aduaneros > Aforos
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** registrar el aforo de la DAM
**para** controlar la revisión documentaria y los requerimientos de SUNAT.

**Contexto peruano.** El aforo corresponde sobre todo al canal naranja. La agencia anota el requerimiento y la respuesta que coordina con la agencia de aduana y el consignatario.

**Criterios de aceptación**

1. El aforo exige DAM, fecha de asignación, resultado (en revisión, requerido, conforme u observado) y detalle si hay requerimiento.
2. Una DAM en canal verde no se marca en aforo salvo que SUNAT la reasigne y ese cambio quede registrado.
3. Mientras el resultado sea requerido u observado, la carga no figura lista para levante.
4. Cada respuesta al requerimiento se agrega al expediente sin borrar el pedido original.

## HU-ADU-006 — Reconocimientos

- **Menú:** Aduanas > Despachos Aduaneros > Reconocimientos
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** registrar el reconocimiento físico de la mercancía
**para** coordinar la presencia en el terminal y el resultado del canal rojo.

**Contexto peruano.** El reconocimiento físico lo dispone SUNAT. La agencia coordina horario en el puerto o en el depósito y guarda el acta o la constancia.

**Criterios de aceptación**

1. El reconocimiento exige DAM, lugar, fecha programada, fecha realizada y resultado.
2. La carga asociada queda marcada en reconocimiento y no se programa su salida mientras el resultado no sea conforme o con levante.
3. La constancia digital queda en el expediente de la carga.
4. Una inasistencia o un reconocimiento fallido exige motivo y reprogramación; no se da por realizado.

## Fiscalizaciones

## HU-ADU-007 — SUNAT

- **Menú:** Aduanas > Fiscalizaciones > SUNAT
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** registrar las fiscalizaciones y requerimientos de SUNAT distintos del despacho ordinario
**para** no perder plazos de una acción de control posterior al levante.

**Contexto peruano.** SUNAT puede fiscalizar valor, clasificación o el propio manifiesto después del despacho. El expediente guarda el documento, el plazo y el responsable interno.

**Criterios de aceptación**

1. El registro exige tipo de acción, número de documento, fecha de notificación, plazo y carga o escala afectada.
2. Una acción dentro del plazo de alerta genera una alerta aduanera al responsable.
3. El cierre exige resultado y constancia; no se cierra vencida sin indicar la respuesta enviada o el motivo del atraso.
4. La fiscalización no modifica por sí sola el levante ya registrado.

## HU-ADU-008 — SENASA

- **Menú:** Aduanas > Fiscalizaciones > SENASA
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** registrar la inspección o el certificado de SENASA
**para** retener la carga agropecuaria hasta que el control sanitario esté conforme.

**Contexto peruano.** SENASA interviene en plantas, animales, productos agropecuarios y embalajes de madera. Su conformidad es independiente del levante de SUNAT cuando la mercancía está sujeta a ese control.

**Criterios de aceptación**

1. El registro exige carga, tipo de control, fecha, resultado (pendiente, conforme, observado) y número de certificado si ya existe.
2. Con resultado pendiente u observado, la carga no se informa como entregable aunque tenga levante.
3. El certificado conforme se vincula al certificado sanitario del expediente.
4. El cierre guarda la constancia y al usuario que la registró.

## HU-ADU-009 — DIGESA

- **Menú:** Aduanas > Fiscalizaciones > DIGESA
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** registrar el control de DIGESA sobre la mercancía
**para** cumplir la condición sanitaria de alimentos industrializados, cosméticos y afines antes de la entrega.

**Contexto peruano.** DIGESA autoriza el ingreso o la comercialización de bienes de consumo humano distintos de los que ve SENASA o SANIPES. El registro no sustituye el trámite ante DIGESA.

**Criterios de aceptación**

1. El registro exige carga, número de expediente o autorización, fecha y resultado.
2. Si el resultado no es conforme, el despacho al cliente permanece bloqueado y el motivo es visible en el seguimiento.
3. La autorización vigente queda disponible para el cliente del portal dueño de esa carga.
4. No se reutiliza una autorización vencida en un ingreso nuevo.

## HU-ADU-010 — Otras entidades

- **Menú:** Aduanas > Fiscalizaciones > Otras Entidades
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** registrar controles de autoridades distintas de SUNAT, SENASA y DIGESA
**para** cubrir SANIPES, DIGEMID, MTC u otra entidad que condicione la carga.

**Contexto peruano.** La carga pesquera puede depender de SANIPES, los productos farmacéuticos de DIGEMID y el transporte excepcional del MTC. La entidad sale de un catálogo para no perder el tipo de control.

**Criterios de aceptación**

1. El registro exige entidad del catálogo, carga, número, fecha y resultado.
2. Si la entidad está marcada como bloqueante para ese tipo de mercancía, la entrega o el embarque esperan el resultado conforme.
3. Una entidad que no está en el catálogo la agrega el administrador antes de usarla.
4. El control queda en el expediente y puede generar una alerta aduanera según su plazo.

---

# 9. Facturación y finanzas

## Comercial

## HU-FIN-001 — Cotizaciones

- **Menú:** Facturación y Finanzas > Comercial > Cotizaciones
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** emitir una cotización al importador, exportador o naviera
**para** ofrecer el servicio de la agencia antes de operar la carga o la escala.

**Contexto peruano.** La cotización se expresa en soles o en dólares, indica si los importes incluyen IGV y identifica al cliente con RUC cuando es una empresa peruana.

**Criterios de aceptación**

1. La cotización exige cliente, vigencia, moneda, conceptos e importes.
2. Los estados son borrador, enviada, aceptada, rechazada y vencida.
3. Una cotización aceptada puede originar el contrato o la orden de servicio; una vencida no se acepta sin ampliar la vigencia.
4. El cliente del portal consulta las cotizaciones de su cuenta y no las de otros clientes.

## HU-FIN-002 — Tarifarios

- **Menú:** Facturación y Finanzas > Comercial > Tarifarios
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** mantener el tarifario comercial de servicios al cliente
**para** cotizar y facturar con la tarifa vigente de documentación, transporte o agency fee.

**Contexto peruano.** Este tarifario es el de servicios a importadores y exportadores. Es distinto del tarifario de la naviera representada, aunque un concepto puede existir en los dos.

**Criterios de aceptación**

1. Cada ítem exige concepto, cliente o “tarifa general”, puerto si aplica, vigencia, moneda e importe.
2. En una fecha solo hay un importe vigente por concepto, cliente y puerto.
3. La factura toma el tarifario vigente y deja constancia de la tarifa aplicada.
4. Cambiar un importe no modifica comprobantes ya emitidos.

## HU-FIN-003 — Contratos

- **Menú:** Facturación y Finanzas > Comercial > Contratos
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** registrar el contrato comercial con el cliente
**para** facturar según las condiciones pactadas y no según una cotización aislada.

**Contexto peruano.** El contrato con el cliente peruano identifica RUC, moneda, forma de pago y si el servicio se factura por embarque o por periodo.

**Criterios de aceptación**

1. El contrato exige cliente, número, vigencia, moneda y condiciones de facturación.
2. No hay dos contratos vigentes del mismo alcance para el mismo cliente.
3. Una factura a ese cliente dentro de la vigencia advierte si el concepto no está cubierto por el contrato.
4. El vencimiento impide nuevas órdenes bajo ese contrato y no anula deudas ya emitidas.

## Facturación

## HU-FIN-004 — Emisión de facturas

- **Menú:** Facturación y Finanzas > Facturación > Emisión de Facturas
- **Actor:** Contador / tesorería

**Como** contador
**quiero** emitir la factura electrónica del servicio
**para** cobrar al cliente o a la naviera con un comprobante válido ante SUNAT.

**Contexto peruano.** La factura electrónica lleva RUC del emisor, serie y número autorizados, RUC del adquirente, IGV y la constancia de aceptación de SUNAT. El servicio de transporte puede estar sujeto a detracción según el parámetro.

**Criterios de aceptación**

1. La emisión exige cliente con RUC activo, serie vigente, moneda, detalle, base e IGV.
2. Al aceptarse el comprobante, el estado pasa a emitido y el importe entra a cuentas por cobrar.
3. Si SUNAT observa el comprobante, no queda como cobrable y se conserva el motivo.
4. No se emite una segunda factura por el mismo concepto, la misma escala y el mismo cliente si ya existe una emitida, salvo que la anterior esté anulada con nota de crédito.

## HU-FIN-005 — Notas de crédito

- **Menú:** Facturación y Finanzas > Facturación > Notas de Crédito
- **Actor:** Contador / tesorería

**Como** contador
**quiero** emitir una nota de crédito electrónica
**para** anular o reducir una factura aceptada por SUNAT sin borrar el comprobante original.

**Contexto peruano.** La nota de crédito electrónica referencia la factura de origen, su serie y el motivo. El efecto en la cobranza es la disminución del saldo.

**Criterios de aceptación**

1. La nota exige factura emitida, motivo, importe y serie de nota de crédito.
2. El importe no supera el saldo facturado de esa factura.
3. Al aceptarse, reduce las cuentas por cobrar de esa factura.
4. Una nota observada por SUNAT no reduce el saldo.

## HU-FIN-006 — Notas de débito

- **Menú:** Facturación y Finanzas > Facturación > Notas de Débito
- **Actor:** Contador / tesorería

**Como** contador
**quiero** emitir una nota de débito electrónica
**para** incrementar el importe de una factura ya aceptada cuando corresponde un cargo adicional.

**Contexto peruano.** La nota de débito electrónica también referencia la factura original y queda afecta al IGV cuando el cargo lo está.

**Criterios de aceptación**

1. La nota exige factura emitida, motivo, importe y serie de nota de débito.
2. Al aceptarse, aumenta el saldo por cobrar de esa factura.
3. Una nota observada no aumenta el saldo.
4. El cargo adicional queda explicado en el expediente de la escala o del cliente.

## Cuentas por cobrar

## HU-FIN-007 — Estado de cuenta

- **Menú:** Facturación y Finanzas > Cuentas por Cobrar > Estado de Cuenta
- **Actor:** Contador / tesorería

**Como** contador
**quiero** consultar el estado de cuenta del cliente o de la naviera
**para** conocer facturas, notas y saldo en soles y en dólares.

**Contexto peruano.** El estado de cuenta separa moneda y muestra el comprobante electrónico con su serie y número. El tipo de cambio no convierte el saldo histórico de otra moneda sin dejar la moneda original.

**Criterios de aceptación**

1. El estado de cuenta exige cliente o naviera y muestra documentos emitidos, cobrados y pendientes por moneda.
2. El saldo es facturas más notas de débito menos notas de crédito y cobranzas aplicadas.
3. Un comprobante observado o anulado no suma al saldo exigible.
4. El cliente del portal ve solo su estado de cuenta, con los mismos saldos exigibles.

## HU-FIN-008 — Cobranza

- **Menú:** Facturación y Finanzas > Cuentas por Cobrar > Cobranza
- **Actor:** Contador / tesorería

**Como** contador
**quiero** registrar la cobranza de una factura
**para** aplicar el abono del cliente o de la naviera al documento correcto.

**Contexto peruano.** El abono puede llegar en soles o en dólares, por transferencia. Si la factura está en otra moneda, la aplicación deja el tipo de cambio usado y la diferencia de cambio identificada.

**Criterios de aceptación**

1. La cobranza exige cliente, fecha, moneda, importe, medio y documentos a los que se aplica.
2. No se aplica más que el saldo del documento.
3. Una aplicación parcial deja el saldo restante pendiente y visible en el estado de cuenta.
4. La anulación de una cobranza exige motivo y restituye el saldo; no borra el movimiento.

## HU-FIN-009 — Reportes

- **Menú:** Facturación y Finanzas > Cuentas por Cobrar > Reportes
- **Actor:** Contador / tesorería

**Como** contador
**quiero** reportar la cartera por cobrar
**para** distinguir deuda vigente, vencida y por cliente o naviera.

**Contexto peruano.** La antigüedad se calcula desde la fecha de vencimiento del comprobante electrónico, en la moneda del documento.

**Criterios de aceptación**

1. El reporte filtra por sucursal, cliente, naviera, moneda y antigüedad.
2. Separa saldo vigente y vencido, y totaliza por moneda sin sumar soles con dólares.
3. Cada línea abre el comprobante que la origina.
4. El reporte no modifica saldos y solo incluye documentos de las sucursales asignadas.

## Cuentas por pagar

## HU-FIN-010 — Proveedores

- **Menú:** Facturación y Finanzas > Cuentas por Pagar > Proveedores
- **Actor:** Contador / tesorería

**Como** contador
**quiero** ver las obligaciones agrupadas por proveedor
**para** programar el pago de prácticos, transportistas y demás servicios de la escala.

**Contexto peruano.** El proveedor se identifica con RUC. El resumen muestra el comprobante de compra recibido y si el servicio está afecto a detracción.

**Criterios de aceptación**

1. El listado muestra proveedor, RUC, saldo por moneda y documentos pendientes.
2. Solo incluye proveedores registrados y activos o con saldo aunque estén inactivos.
3. Desde el proveedor se abren sus obligaciones sin mezclar las de otro RUC.
4. Un proveedor sin saldo aparece con saldo cero si se lo busca de forma explícita.

## HU-FIN-011 — Obligaciones

- **Menú:** Facturación y Finanzas > Cuentas por Pagar > Obligaciones
- **Actor:** Contador / tesorería

**Como** contador
**quiero** registrar la obligación por el comprobante del proveedor
**para** reconocer el gasto de la escala o del servicio al cliente.

**Contexto peruano.** La obligación se apoya en la factura electrónica del proveedor, con serie, número, moneda e IGV. Si hay detracción, el monto a depositar queda identificado y no se confunde con el neto a pagar al proveedor.

**Criterios de aceptación**

1. La obligación exige proveedor, comprobante, fecha, moneda, base, IGV, escala o expediente, y detracción si el parámetro del servicio la marca.
2. El mismo comprobante del mismo proveedor no se registra dos veces.
3. El gasto puede marcarse como reembolsable a la naviera para entrar en la liquidación.
4. Una obligación observada no queda lista para pago hasta su regularización.

## HU-FIN-012 — Pagos

- **Menú:** Facturación y Finanzas > Cuentas por Pagar > Pagos
- **Actor:** Contador / tesorería

**Como** contador
**quiero** registrar el pago al proveedor
**para** cancelar la obligación y, si aplica, dejar constancia del depósito de la detracción.

**Contexto peruano.** El pago al proveedor y el depósito de detracción son movimientos distintos. Los dos se asocian a la misma obligación cuando el servicio está sujeto a detracción.

**Criterios de aceptación**

1. El pago exige obligación, fecha, moneda, importe y medio.
2. No se paga más que el saldo de la obligación.
3. Si hay detracción pendiente, el sistema no marca la obligación como totalmente pagada hasta registrar también ese depósito.
4. La anulación del pago exige motivo y reabre el saldo.

## Liquidación de buques

## HU-FIN-013 — Gastos portuarios

- **Menú:** Facturación y Finanzas > Liquidación de Buques > Gastos Portuarios
- **Actor:** Contador / tesorería

**Como** contador
**quiero** reunir los gastos portuarios de la escala
**para** cobrarle a la naviera lo que la agencia pagó por práctico, remolque, muelle y servicios de nave.

**Contexto peruano.** Estos gastos forman la proforma o la liquidación de la escala (disbursement account). Cada línea conserva el proveedor, el comprobante y la moneda.

**Criterios de aceptación**

1. La relación toma los servicios portuarios confirmados y las obligaciones marcadas como reembolsables de esa escala.
2. Cada línea muestra concepto, proveedor, moneda e importe, y si ya tiene comprobante.
3. Un gasto sin comprobante queda pendiente y no entra a una liquidación final cerrada.
4. No se incorporan gastos de otra escala o de otra naviera.

## HU-FIN-014 — Servicios prestados

- **Menú:** Facturación y Finanzas > Liquidación de Buques > Servicios Prestados
- **Actor:** Contador / tesorería

**Como** contador
**quiero** incluir en la cuenta de la nave los servicios propios de la agencia
**para** cobrar el agency fee y los conceptos del tarifario de la naviera.

**Contexto peruano.** El agency fee y los servicios de documentación se calculan con el tarifario vigente de la naviera en la fecha de arribo, en la moneda del contrato.

**Criterios de aceptación**

1. Los servicios prestados exigen escala, concepto del tarifario, cantidad e importe.
2. El importe propuesto sale del tarifario vigente; un importe distinto exige motivo.
3. Estos servicios se distinguen de los gastos reembolsables en la liquidación.
4. Un servicio ya facturado a la naviera no se vuelve a proponer como pendiente del mismo concepto y la misma escala.

## HU-FIN-015 — Liquidación final

- **Menú:** Facturación y Finanzas > Liquidación de Buques > Liquidación Final
- **Actor:** Contador / tesorería

**Como** contador
**quiero** cerrar la liquidación final de la escala
**para** enviar a la naviera la cuenta definitiva de gastos y servicios después del zarpe.

**Contexto peruano.** La liquidación final se emite cuando la nave zarpó y los gastos portuarios tienen respaldo. Puede quedar un saldo a favor de la naviera o de la agencia, en la moneda del contrato.

**Criterios de aceptación**

1. La liquidación final exige escala zarpada, relación de gastos con comprobante y servicios prestados.
2. El cierre calcula el total por moneda y el saldo contra los anticipos registrados.
3. Una liquidación cerrada no se edita; un ajuste posterior se hace con una liquidación complementaria vinculada.
4. La naviera, si tiene acceso al portal, descarga su liquidación y no ve la de otras cuentas.

---

# 10. Reportes

## Operativos

## HU-REP-001 — Movimientos por buque

- **Menú:** Reportes > Operativos > Movimientos por Buque
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** reportar los movimientos de una nave en un periodo
**para** explicar a la naviera cuántas recaladas tuvo en puertos peruanos y qué carga movió.

**Contexto peruano.** El reporte junta escalas, puertos, contenedores y toneladas de las naves representadas, separados por ingreso y salida.

**Criterios de aceptación**

1. El reporte filtra por nave, naviera, puerto y rango de fechas.
2. Cada escala muestra arribo, zarpe, movimientos de carga y estado de la liquidación.
3. Las escalas anuladas se listan aparte y no suman carga.
4. El usuario solo incluye sucursales asignadas.

## HU-REP-002 — Escalas atendidas

- **Menú:** Reportes > Operativos > Escalas Atendidas
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** reportar las escalas atendidas
**para** medir la actividad de la agencia por puerto, terminal y naviera.

**Contexto peruano.** Una escala atendida es la que tuvo arribo confirmado. El reporte distingue las que ya zarparon de las que siguen abiertas.

**Criterios de aceptación**

1. El reporte cuenta escalas con arribo confirmado en el periodo, por puerto y naviera.
2. Separa abiertas, zarpadas y anuladas.
3. El total por puerto usa el catálogo de puertos y no un nombre libre.
4. Desde el total se abre el listado de escalas que lo componen.

## HU-REP-003 — Tiempos operativos

- **Menú:** Reportes > Operativos > Tiempos Operativos
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** medir los tiempos de la escala
**para** detectar esperas en rada, en muelle o en el cierre documentario.

**Contexto peruano.** Los tramos son aviso a arribo, arribo a atraque, atraque a término de operaciones y término de operaciones a zarpe, que son los que la naviera compara entre puertos peruanos.

**Criterios de aceptación**

1. El reporte calcula esos tramos para escalas con los hitos registrados.
2. Si falta un hito, el tramo se muestra incompleto y no se imputa como cero.
3. Se puede agrupar por puerto, terminal y naviera.
4. El reporte no altera las fechas de la escala.

## Comerciales

## HU-REP-004 — Clientes activos

- **Menú:** Reportes > Comerciales > Clientes Activos
- **Actor:** Ejecutivo comercial

**Como** ejecutivo comercial
**quiero** reportar los clientes activos del periodo
**para** ver qué importadores y exportadores movieron carga o tuvieron un contrato vigente.

**Contexto peruano.** Un cliente activo es el que tuvo al menos un BL, booking o factura en el periodo, o un contrato vigente, identificado por RUC.

**Criterios de aceptación**

1. El reporte lista clientes con movimiento o contrato vigente en el rango, con RUC y tipo.
2. Un cliente inactivo sin movimiento no aparece como activo.
3. Se distingue importador, exportador y naviera.
4. El ejecutivo no ve clientes de sucursales no asignadas.

## HU-REP-005 — Facturación

- **Menú:** Reportes > Comerciales > Facturación
- **Actor:** Contador / tesorería

**Como** contador
**quiero** reportar la facturación emitida
**para** conciliar comprobantes electrónicos por serie, cliente y periodo.

**Contexto peruano.** El reporte toma facturas, notas de crédito y notas de débito aceptadas por SUNAT, en su moneda, con serie y número.

**Criterios de aceptación**

1. El reporte filtra por sucursal, serie, cliente, moneda y rango de emisión.
2. Las notas de crédito restan y las de débito suman dentro de la misma moneda.
3. Los comprobantes observados o anulados se listan aparte y no entran al total aceptado.
4. Cada línea referencia el comprobante de origen.

## HU-REP-006 — Rentabilidad

- **Menú:** Reportes > Comerciales > Rentabilidad
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** ver la rentabilidad por escala o por cliente
**para** comparar ingresos de la agencia con los costos que no son reembolsables.

**Contexto peruano.** Los gastos reembolsables a la naviera no se tratan como ingreso. La rentabilidad usa los servicios propios facturados menos el costo interno asociado.

**Criterios de aceptación**

1. El reporte exige periodo y agrupación por escala, cliente o naviera.
2. Separa ingreso propio, gasto reembolsable y costo no reembolsable.
3. Los montos se totalizan por moneda.
4. Una escala sin factura ni costo aparece con rentabilidad en cero y sigue en el listado si tuvo operación.

## Aduaneros

## HU-REP-007 — Importaciones

- **Menú:** Reportes > Aduaneros > Importaciones
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** reportar las importaciones del periodo
**para** conocer bultos, contenedores, DAM y las que siguen sin levante.

**Contexto peruano.** El reporte cruza manifiesto de ingreso, BL y DAM. Una importación sin DAM o sin levante queda identificada.

**Criterios de aceptación**

1. El reporte filtra por puerto, consignatario, régimen y rango de arribo.
2. Muestra BL, DAM, canal, levante y peso o contenedores.
3. Las cargas sin levante se pueden listar solas.
4. El total no incluye cargas anuladas.

## HU-REP-008 — Exportaciones

- **Menú:** Reportes > Aduaneros > Exportaciones
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** reportar las exportaciones embarcadas
**para** cuadrar bookings, manifiestos de salida y certificados exigidos.

**Contexto peruano.** El reporte distingue lo reservado, lo embarcado y lo cortado, y señala la exportación que zarpó sin certificado bloqueante vigente.

**Criterios de aceptación**

1. El reporte filtra por puerto de salida, embarcador y rango de zarpe o de embarque.
2. Separa reservado, embarcado y cortado.
3. Una exportación embarcada sin el certificado bloqueante exigido queda marcada.
4. El total embarcado cuadra con el criterio del control de embarques de esas escalas.

## HU-REP-009 — Estadísticas

- **Menú:** Reportes > Aduaneros > Estadísticas
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** ver estadísticas aduaneras agregadas
**para** conocer el peso del canal rojo, de las observaciones y de las entidades sanitarias en la carga atendida.

**Contexto peruano.** Las estadísticas resumen DAM por canal, tiempos hasta el levante y controles de SENASA, DIGESA y demás entidades, sin sustituir la información oficial de SUNAT.

**Criterios de aceptación**

1. El reporte agrega por periodo, puerto y canal.
2. Calcula la cantidad de DAM con levante y el tiempo medio desde la numeración cuando ambas fechas existen.
3. Cuenta fiscalizaciones por entidad.
4. El detalle de una cifra abre las DAM que la componen, respetando la sucursal del usuario.

## Gerenciales

## HU-REP-010 — KPIs

- **Menú:** Reportes > Gerenciales > KPIs
- **Actor:** Jefe de operaciones

**Como** gerencia
**quiero** consultar los indicadores definidos para la agencia
**para** revisar cumplimiento de zarpe, levante y cobranza en una sola vista.

**Contexto peruano.** Los KPI de la operación peruana incluyen escalas zarpadas a tiempo, manifiestos observados, cargas sin levante y facturas vencidas.

**Criterios de aceptación**

1. Cada KPI muestra meta, valor del periodo y sucursal.
2. La meta sale de parámetros y el valor, de los expedientes del periodo.
3. Un KPI sin datos suficientes se muestra sin valor y explica qué hito falta.
4. La gerencia puede abrir el detalle, sin editar expedientes desde el indicador.

## HU-REP-011 — Indicadores

- **Menú:** Reportes > Gerenciales > Indicadores
- **Actor:** Jefe de operaciones

**Como** gerencia
**quiero** comparar indicadores entre puertos y periodos
**para** ver si Callao, Paita, Matarani u otro puerto del catálogo se desvía de la operación habitual.

**Contexto peruano.** La comparación usa el mismo criterio de tiempo en puerto y de observaciones documentarias en cada puerto peruano donde la agencia opera.

**Criterios de aceptación**

1. El reporte compara al menos dos periodos o dos puertos con la misma definición de indicador.
2. Los puertos salen del catálogo.
3. La diferencia se calcula solo cuando ambos lados tienen datos.
4. El reporte no mezcla sucursales que el usuario no tiene asignadas.

## HU-REP-012 — Dashboard ejecutivo

- **Menú:** Reportes > Gerenciales > Dashboard Ejecutivo
- **Actor:** Jefe de operaciones

**Como** gerencia
**quiero** abrir un tablero ejecutivo de la empresa
**para** ver operación, cartera y excepciones aduaneras sin entrar a cada expediente.

**Contexto peruano.** El tablero resume naves atendidas, carga de importación y exportación, comprobantes por cobrar y alertas de DICAPI o SUNAT que siguen abiertas.

**Criterios de aceptación**

1. El tablero muestra los KPI vigentes, la cartera por moneda y las excepciones abiertas.
2. Respeta empresa y sucursales del usuario.
3. Cada bloque lleva al reporte que lo sustenta.
4. No permite modificar escalas, facturas ni manifiestos.

---

# 11. Alertas y notificaciones

## HU-ALE-001 — Próximos arribos

- **Menú:** Alertas y Notificaciones > Próximos Arribos
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** recibir alerta de los arribos próximos
**para** presentar el aviso a DICAPI y coordinar el terminal a tiempo.

**Contexto peruano.** La alerta se dispara según las horas previas al ETA definidas en parámetros, y se refuerza si el aviso a la capitanía sigue pendiente.

**Criterios de aceptación**

1. La alerta se genera para arribos programados que entran en el horizonte configurado.
2. Identifica nave, puerto, ETA y si el aviso a DICAPI está pendiente.
3. Deja de notificarse como pendiente cuando el arribo se confirma o se reprograma fuera del horizonte.
4. Llega al operador de la sucursal responsable y queda en el recuadro del inicio.

## HU-ALE-002 — Próximos zarpes

- **Menú:** Alertas y Notificaciones > Próximos Zarpes
- **Actor:** Operador de agencia marítima

**Como** operador de agencia marítima
**quiero** recibir alerta de los zarpes próximos
**para** completar la autorización de DICAPI y el manifiesto antes del ETD.

**Contexto peruano.** La alerta distingue un zarpe sin autorización de capitanía de uno que solo espera confirmación de hora.

**Criterios de aceptación**

1. La alerta se genera para zarpes programados dentro del horizonte configurado.
2. Indica si falta autorización de DICAPI o si el manifiesto de salida está observado.
3. Un zarpe confirmado cierra la alerta.
4. La alerta no se emite para escalas de otra sucursal.

## HU-ALE-003 — Documentos por vencer

- **Menú:** Alertas y Notificaciones > Documentos por Vencer
- **Actor:** Documentador

**Como** documentador
**quiero** recibir alerta de documentos próximos a vencer
**para** renovar certificados sanitarios, de origen o autorizaciones antes del embarque o la entrega.

**Contexto peruano.** El vencimiento de un certificado de SENASA, DIGESA, SANIPES o de un permiso del MTC puede bloquear la carga. La alerta antecede a ese bloqueo.

**Criterios de aceptación**

1. La alerta lista documentos vigentes cuya fecha de fin cae dentro del plazo configurado.
2. Identifica expediente, tipo, autoridad y fecha de vencimiento.
3. Un documento renovado cierra la alerta anterior y deja vigente el nuevo.
4. El documentador de la sucursal es el destinatario; el cliente solo recibe aviso si el documento es suyo y está marcado como compartible.

## HU-ALE-004 — Pagos pendientes

- **Menú:** Alertas y Notificaciones > Pagos Pendientes
- **Actor:** Contador / tesorería

**Como** contador
**quiero** recibir alerta de cobranzas y pagos vencidos
**para** gestionar la cartera y las obligaciones a proveedores sin esperar al cierre del mes.

**Contexto peruano.** La alerta usa la fecha de vencimiento del comprobante electrónico y separa lo por cobrar al cliente de lo por pagar al proveedor, por moneda.

**Criterios de aceptación**

1. La alerta incluye facturas por cobrar vencidas y obligaciones por pagar vencidas de la sucursal.
2. Muestra cliente o proveedor, documento, moneda, saldo y días de atraso.
3. Al aplicarse el cobro o el pago que deja el saldo en cero, la alerta se cierra.
4. No suma soles y dólares en un único importe.

## HU-ALE-005 — Incidencias operativas

- **Menú:** Alertas y Notificaciones > Incidencias Operativas
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** recibir y registrar incidencias de la operación
**para** atender una ruptura de cadena de frío, un corte de carga o una demora de maniobra.

**Contexto peruano.** La incidencia queda ligada a la escala, al contenedor o al viaje, y sirve de respaldo frente al terminal, la naviera o el cliente.

**Criterios de aceptación**

1. La incidencia exige origen (escala, contenedor o viaje), tipo, fecha y descripción.
2. Los estados son abierta, en atención y cerrada. El cierre exige resultado.
3. Una incidencia de temperatura fuera de rango o de carga cortada se genera también desde esos módulos y no se duplica para el mismo hecho.
4. La incidencia abierta aparece en el inicio de la sucursal responsable.

## HU-ALE-006 — Alertas aduaneras

- **Menú:** Alertas y Notificaciones > Alertas Aduaneras
- **Actor:** Analista de aduanas

**Como** analista de aduanas
**quiero** recibir alertas de canal, aforo, reconocimiento y plazos de fiscalización
**para** coordinar con la agencia de aduana y el consignatario antes de que venza el requerimiento.

**Contexto peruano.** Una DAM en canal rojo, un aforo con requerimiento o un plazo de SUNAT, SENASA o DIGESA no se notifican como un aviso genérico: la alerta identifica la autoridad y la fecha límite.

**Criterios de aceptación**

1. La alerta se genera al asignarse canal rojo o naranja, al registrarse un requerimiento o al acercarse el plazo de una fiscalización.
2. Muestra DAM o expediente, autoridad, plazo y responsable.
3. Se cierra cuando el hito que la originó queda conforme, con levante o cerrado.
4. El cliente del portal solo ve la alerta de su carga y no el detalle interno de otras cuentas.

---

# 12. Recursos humanos

El módulo cubre al personal de la agencia y su asignación a la operación. No reemplaza la planilla, el T-Registro ni la declaración ante SUNAT.

## Personal

## HU-RRH-001 — Empleados

- **Menú:** Recursos Humanos > Personal > Empleados
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** registrar a los empleados de la agencia
**para** asignarlos a turnos, escalas y usuarios del sistema.

**Contexto peruano.** El empleado se identifica con DNI, carné de extranjería u otro documento válido, y pertenece a una empresa y sucursal de la agencia.

**Criterios de aceptación**

1. El alta exige nombres, tipo y número de documento, cargo, empresa y sucursal.
2. No hay dos empleados activos con el mismo tipo y número de documento en la empresa.
3. Un empleado de baja no se asigna a turnos ni a escalas nuevas y conserva su historial.
4. El registro no calcula remuneración ni genera un archivo de planilla.

## HU-RRH-002 — Contratos

- **Menú:** Recursos Humanos > Personal > Contratos
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** registrar el contrato del empleado
**para** saber si está vigente al momento de asignarlo a una escala.

**Contexto peruano.** El contrato de trabajo puede ser a plazo indeterminado o sujeto a modalidad. La vigencia condiciona la asignación operativa; el detalle laboral completo permanece fuera de este sistema.

**Criterios de aceptación**

1. El contrato exige empleado, tipo, fecha de inicio y fecha de fin si el tipo la requiere.
2. No hay dos contratos vigentes superpuestos para el mismo empleado.
3. Un empleado sin contrato vigente no se asigna a una atención de nave nueva.
4. La baja del contrato no borra asignaciones ya cumplidas.

## HU-RRH-003 — Asistencia

- **Menú:** Recursos Humanos > Personal > Asistencia
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** registrar la asistencia del personal operativo
**para** saber quién estuvo disponible en el puerto durante la escala.

**Contexto peruano.** La asistencia de la agencia respalda la cobertura del oficial de a bordo y de la guardia en terminal. No sustituye el control de SUNAFIL ni el cálculo de sobretiempo de planilla.

**Criterios de aceptación**

1. El registro exige empleado, fecha, sucursal y marca de ingreso y salida, o la inasistencia con motivo.
2. No se cargan dos asistencias para el mismo empleado y la misma fecha en la misma sucursal.
3. Una inasistencia en un día con turno asignado deja esa asignación observada.
4. El historial de asistencia se consulta por empleado y periodo, y cada corrección guarda el valor anterior.

## Operaciones

## HU-RRH-004 — Turnos

- **Menú:** Recursos Humanos > Operaciones > Turnos
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** definir los turnos de la sucursal
**para** cubrir la atención de naves en muelle, incluidos fines de semana y feriados portuarios.

**Contexto peruano.** La operación en puerto no sigue solo el horario de oficina. El turno indica sucursal, puerto si aplica, hora de inicio y hora de fin.

**Criterios de aceptación**

1. El turno exige sucursal, nombre, hora de inicio y hora de fin.
2. Dos turnos de la misma sucursal no se crean con el mismo nombre vigente.
3. Un turno puede cruzar la medianoche y se considera un solo bloque de trabajo.
4. Un turno dado de baja no admite asignaciones nuevas y mantiene las pasadas.

## HU-RRH-005 — Asignación de personal

- **Menú:** Recursos Humanos > Operaciones > Asignación de Personal
- **Actor:** Coordinador portuario

**Como** coordinador portuario
**quiero** asignar empleados a un turno o a una escala
**para** dejar identificado al responsable de la nave en el terminal.

**Contexto peruano.** La asignación operativa nombra al boarding officer o al documentador de guardia que la naviera y el terminal pueden ubicar durante la escala.

**Criterios de aceptación**

1. La asignación exige empleado con contrato vigente, turno o escala, y horario.
2. El empleado no queda en dos asignaciones que se superponen.
3. La asignación a una escala se refleja en los recursos de la atención de esa nave.
4. Quitar una asignación ya iniciada exige motivo y no borra la traza de quién estuvo asignado.

## HU-RRH-006 — Evaluaciones

- **Menú:** Recursos Humanos > Operaciones > Evaluaciones
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** evaluar al personal asignado a la operación
**para** registrar el desempeño en la atención de la nave o en el periodo.

**Contexto peruano.** La evaluación es interna de la agencia. Se apoya en la escala o el turno cumplido y no genera por sí sola un efecto de planilla.

**Criterios de aceptación**

1. La evaluación exige empleado, periodo o escala, criterio y resultado.
2. Solo se evalúa a quien tuvo asignación en ese periodo o esa escala.
3. El resultado queda visible para jefatura y para el administrador, no para el cliente del portal.
4. Una evaluación registrada no se elimina; se rectifica con motivo.

---

# 13. Administración

## Seguridad

## HU-ADM-001 — Usuarios

- **Menú:** Administración > Seguridad > Usuarios
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** administrar los usuarios internos y del portal
**para** que cada persona entre con su cuenta y vea solo sus empresas y clientes.

**Contexto peruano.** El usuario interno se vincula a un empleado cuando corresponde. El usuario de portal se vincula a un importador, exportador, consignatario o naviera, identificado por RUC.

**Criterios de aceptación**

1. El alta exige identificación única, nombre, tipo (interno o portal) y empresa.
2. Un usuario de portal exige al menos un cliente o naviera asignados.
3. Un usuario deshabilitado no ingresa y conserva su historial de accesos.
4. El administrador no ve la contraseña ni la clave del usuario; el desbloqueo deja constancia en el log.

## HU-ADM-002 — Roles

- **Menú:** Administración > Seguridad > Roles
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** definir roles de la agencia y del portal
**para** agrupar permisos de operación, documentación, aduanas, finanzas y consulta de cliente.

**Contexto peruano.** Los roles separan al personal de la agencia del cliente. Un rol de portal no incluye liquidaciones de otras navieras ni parámetros del sistema.

**Criterios de aceptación**

1. El rol exige nombre único en la empresa y tipo interno o portal.
2. Un rol se puede asignar a varios usuarios.
3. Desactivar un rol impide usarlo en asignaciones nuevas y retira su acceso en el siguiente ingreso de quien lo tenía.
4. El rol de portal no admite permisos marcados como exclusivos de la agencia.

## HU-ADM-003 — Permisos

- **Menú:** Administración > Seguridad > Permisos
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** asignar permisos de menú a cada rol
**para** limitar altas, transmisiones, cobranzas y consultas según la función.

**Contexto peruano.** Transmitir un manifiesto, liberar un BL, emitir una factura electrónica o cerrar una liquidación son permisos distintos de la simple consulta.

**Criterios de aceptación**

1. Cada opción de menú tiene permisos separables de consultar, crear, modificar, anular y, cuando aplica, transmitir o aprobar.
2. Un usuario sin permiso de la acción no ejecuta esa acción aunque conozca el expediente.
3. El cambio de permisos queda en la auditoría con el valor anterior.
4. Los permisos se evalúan junto con la sucursal y el cliente asignados.

## Configuración

## HU-ADM-004 — Empresas

- **Menú:** Administración > Configuración > Empresas
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** registrar las empresas de la agencia
**para** separar RUC, series de comprobantes y operaciones de cada razón social.

**Contexto peruano.** Cada empresa emisora tiene su RUC y sus series de factura, nota de crédito y nota de débito. La operación de una no se mezcla con la de otra.

**Criterios de aceptación**

1. El alta exige razón social, RUC válido y estado.
2. No hay dos empresas activas con el mismo RUC.
3. Los comprobantes electrónicos salen solo de las series de la empresa emisora.
4. Desactivar la empresa impide operaciones nuevas y conserva el historial.

## HU-ADM-005 — Sucursales

- **Menú:** Administración > Configuración > Sucursales
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** registrar las sucursales de cada empresa
**para** atribuir escalas y usuarios a la oficina que atiende el puerto.

**Contexto peruano.** Una sucursal puede atender uno o varios puertos, por ejemplo la oficina de Callao y una oficina en el sur para Matarani e Ilo.

**Criterios de aceptación**

1. La sucursal exige empresa, nombre y al menos un puerto del catálogo.
2. El nombre es único dentro de la empresa.
3. El usuario solo opera en las sucursales que tiene asignadas.
4. Una sucursal inactiva no recibe arribos nuevos y mantiene sus escalas históricas.

## HU-ADM-006 — Puertos

- **Menú:** Administración > Configuración > Puertos
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** mantener el catálogo de puertos
**para** usar códigos únicos en arribos, manifiestos y tarifarios.

**Contexto peruano.** El catálogo incluye puertos marítimos nacionales como Callao, Paita, Salaverry, Chimbote, Pisco, Matarani e Ilo, y los fluviales o de cabotaje que la agencia atienda, con su terminal y sus muelles.

**Criterios de aceptación**

1. El puerto exige nombre, tipo (marítimo o fluvial), país y código único.
2. Los terminales y muelles se registran dentro del puerto y no como puertos distintos.
3. Un puerto extranjero puede existir como procedencia o destino, marcado como no operable por la agencia.
4. Desactivar un puerto impide usarlo en programaciones nuevas y no altera escalas ya grabadas.

## HU-ADM-007 — Parámetros del sistema

- **Menú:** Administración > Configuración > Parámetros del Sistema
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** mantener los parámetros operativos
**para** fijar horizontes de alerta, tolerancia de peso del House BL, IGV y marcas de detracción sin cambiar el programa.

**Contexto peruano.** Entre los parámetros están el porcentaje de IGV, los servicios sujetos a detracción, las horas de anticipación de arribo y zarpe, y la tolerancia de cuadre del manifiesto.

**Criterios de aceptación**

1. Cada parámetro exige código, valor, vigencia y empresa o alcance general.
2. En una fecha solo hay un valor vigente por código y alcance.
3. Las historias que dependen de un parámetro usan el valor vigente en la fecha del hecho.
4. El cambio de un parámetro queda auditado y no reescribe documentos ya cerrados.

## Auditoría

## HU-ADM-008 — Log de accesos

- **Menú:** Administración > Auditoría > Log de Accesos
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** consultar los accesos de los usuarios
**para** revisar ingresos, fallos y cierres de sesión de la agencia y del portal.

**Contexto peruano.** El log permite responder qué usuario interno o qué cliente del portal entró cuando se consulta un expediente de carga o una factura.

**Criterios de aceptación**

1. Cada acceso registra usuario, fecha, resultado (correcto o rechazado) y origen.
2. La consulta filtra por usuario, rango y resultado.
3. El log no se modifica ni se borra desde esta opción.
4. Un usuario que no es administrador no consulta accesos de otras cuentas.

## HU-ADM-009 — Auditoría de cambios

- **Menú:** Administración > Auditoría > Auditoría de Cambios
- **Actor:** Administrador del sistema

**Como** administrador del sistema
**quiero** consultar los cambios de los expedientes
**para** ver quién modificó un BL, una tarifa, un permiso o un parámetro, y cuál era el valor anterior.

**Contexto peruano.** La bitácora sostiene la trazabilidad que la agencia necesita frente a la naviera, al cliente y a un requerimiento de SUNAT o de la capitanía.

**Criterios de aceptación**

1. Cada cambio de alta, modificación o anulación registra usuario, fecha, campo, valor anterior y valor nuevo.
2. La consulta filtra por expediente, usuario y rango.
3. Los registros de auditoría no se editan desde el menú.
4. La consulta de un expediente histórico también aparece como acceso, según la historia de consulta histórica.

## HU-ADM-010 — Trazabilidad

- **Menú:** Administración > Auditoría > Trazabilidad
- **Actor:** Jefe de operaciones

**Como** jefe de operaciones
**quiero** seguir la traza completa de una escala, un BL o un contenedor
**para** reconstruir arribo, manifiesto, levante, entrega y liquidación en orden.

**Contexto peruano.** La traza une los hitos de DICAPI, del terminal, de SUNAT y de la facturación de esa carga o esa nave, que es lo que se pide en un reclamo o una fiscalización.

**Criterios de aceptación**

1. La consulta exige escala, BL o contenedor y muestra los hitos en orden cronológico.
2. Cada hito indica módulo de origen, usuario y fecha.
3. Un expediente sin movimientos muestra solo su alta.
4. La traza es de consulta y no reabre una escala zarpada ni una liquidación cerrada.

---

# 14. Portal de clientes

El portal lo usa el importador, el exportador, el consignatario o la naviera. Solo ve la cuenta que tiene asignada.

## Consultas

## HU-PTL-001 — Estado de carga

- **Menú:** Portal de Clientes > Consultas > Estado de Carga
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** consultar el estado de mi carga
**para** saber si está a bordo, en el terminal, liberada o entregada.

**Contexto peruano.** El estado replica el seguimiento interno: manifiesto, descarga o embarque, canal, levante y entrega. No muestra carga de otro RUC.

**Criterios de aceptación**

1. El cliente busca por BL, booking o contenedor de su cuenta.
2. El resultado muestra el último hito y la fecha, iguales a los del seguimiento interno.
3. Una búsqueda de un documento de otro cliente no devuelve datos.
4. La consulta no modifica la carga.

## HU-PTL-002 — Estado documentario

- **Menú:** Portal de Clientes > Consultas > Estado Documentario
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** ver el estado de los documentos de mi carga
**para** saber si el BL está liberado y si los certificados siguen vigentes.

**Contexto peruano.** El cliente ve la liberación del BL y la vigencia del certificado de origen o sanitario. No ve borradores internos del manifiesto ni documentos de otra cuenta.

**Criterios de aceptación**

1. La consulta lista documentos compartibles del expediente del cliente, con tipo, número y estado.
2. Un BL liberado se muestra con su modalidad: original, telex release o sea waybill.
3. Un certificado vencido aparece como vencido y no como vigente.
4. Los documentos anulados o no compartibles no se listan como disponibles.

## HU-PTL-003 — Estado de facturación

- **Menú:** Portal de Clientes > Consultas > Estado de Facturación
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** consultar mis facturas y mi saldo
**para** conocer lo emitido, lo pagado y lo pendiente en soles o en dólares.

**Contexto peruano.** El estado muestra la factura electrónica, las notas y el saldo exigible de su RUC. La naviera ve sus liquidaciones; no ve la cuenta de otra naviera.

**Criterios de aceptación**

1. El cliente ve comprobantes emitidos de su cuenta, con serie, número, moneda y saldo.
2. Los saldos coinciden con el estado de cuenta interno de ese cliente.
3. Los comprobantes observados no se presentan como deuda exigible.
4. No se muestran costos internos no facturados ni obligaciones con proveedores.

## Servicios

## HU-PTL-004 — Solicitud de servicios

- **Menú:** Portal de Clientes > Servicios > Solicitud de Servicios
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** solicitar un servicio a la agencia
**para** pedir transporte, visto de documentos o atención de un embarque sin llamar a la mesa de operaciones.

**Contexto peruano.** La solicitud queda como pedido del importador o exportador. La agencia la convierte en viaje, despacho o expediente; el portal no programa el zarpe ni transmite el manifiesto.

**Criterios de aceptación**

1. La solicitud exige tipo de servicio, referencia de carga si ya existe, fecha requerida y comentario.
2. El estado inicial es recibida. Pasa a en atención o rechazada con motivo cuando la agencia la revisa.
3. El cliente ve solo sus solicitudes.
4. Una solicitud rechazada no genera un viaje ni una factura por sí sola.

## HU-PTL-005 — Seguimiento de operaciones

- **Menú:** Portal de Clientes > Servicios > Seguimiento de Operaciones
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** seguir las operaciones que la agencia atiende para mí
**para** ver arribo, embarque, despacho o solicitud en el mismo lugar.

**Contexto peruano.** El importador sigue la descarga y el levante; el exportador sigue el booking y el zarpe; la naviera sigue sus escalas y no las de otra representada.

**Criterios de aceptación**

1. El seguimiento lista operaciones de la cuenta, con tipo, referencia y último hito.
2. Una solicitud propia aparece junto con los embarques ya registrados a su nombre.
3. La naviera ve sus escalas y el estado de la liquidación que ya se le publicó.
4. No se muestran operaciones de otros clientes ni tareas internas de personal.

## HU-PTL-006 — Descarga de documentos

- **Menú:** Portal de Clientes > Servicios > Descarga de Documentos
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** descargar los documentos que la agencia compartió
**para** obtener el BL, el certificado o la factura electrónica de mi embarque.

**Contexto peruano.** La descarga entrega la copia vigente del documento compartido, incluida la representación de la factura electrónica aceptada. No entrega constancias internas de otras cuentas.

**Criterios de aceptación**

1. Solo se descargan documentos marcados como compartibles y pertenecientes a la cuenta.
2. Un documento anulado o reemplazado no se descarga como vigente; se ofrece la versión vigente.
3. La descarga queda registrada en el log de accesos del expediente.
4. Un archivo inexistente informa el error y no entrega otro documento del repositorio.

## Comunicaciones

## HU-PTL-007 — Mensajes

- **Menú:** Portal de Clientes > Comunicaciones > Mensajes
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** enviar y recibir mensajes sobre mi embarque
**para** coordinar con la agencia dejando constancia en el expediente.

**Contexto peruano.** El mensaje se ata a un BL, booking o escala de la cuenta. La agencia responde desde la operación; el cliente no escribe en expedientes ajenos.

**Criterios de aceptación**

1. El mensaje exige expediente de la cuenta, texto y remitente.
2. El cliente ve el hilo de sus expedientes y la agencia lo ve en ese mismo expediente.
3. No se puede dirigir un mensaje a un expediente de otro cliente.
4. El mensaje enviado no se borra; una corrección se hace con un mensaje nuevo.

## HU-PTL-008 — Notificaciones

- **Menú:** Portal de Clientes > Comunicaciones > Notificaciones
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** ver las notificaciones de mi cuenta
**para** enterarme de un arribo, un levante, un documento por vencer o una factura emitida.

**Contexto peruano.** Las notificaciones del portal son el subconjunto de alertas que corresponden a su carga o su cuenta, no la cola interna de la sucursal.

**Criterios de aceptación**

1. La bandeja muestra notificaciones de la cuenta, con fecha, expediente y tipo.
2. Una notificación leída deja de figurar como pendiente y permanece en el historial.
3. No llegan notificaciones de otros RUC ni alertas internas de personal o de proveedores.
4. El contenido es coherente con el hito que la originó en la operación.

## HU-PTL-009 — Soporte

- **Menú:** Portal de Clientes > Comunicaciones > Soporte
- **Actor:** Cliente del portal

**Como** cliente del portal
**quiero** registrar un pedido de soporte
**para** reportar un problema de acceso, de un documento o de una factura de mi cuenta.

**Contexto peruano.** El pedido lo atiende la agencia. Si se refiere a un comprobante, conserva serie y número; si se refiere a la carga, conserva el BL o el contenedor.

**Criterios de aceptación**

1. El pedido exige tipo, descripción y, si aplica, la referencia del expediente o del comprobante propio.
2. Los estados son abierto, en atención y cerrado. El cierre exige respuesta.
3. El cliente ve el estado de sus pedidos y no los de otras cuentas.
4. Un pedido cerrado permanece consultable y no se reabre; un tema nuevo genera otro pedido.

---

# Cobertura del menú

Cada hoja de `menu.md` tiene una historia. Las secciones del índice que solo agrupan no tienen historia propia.

| Módulo | Opción de menú | Historia |
| --- | --- | --- |
| Dashboard | Resumen de operaciones | HU-DAS-001 |
| Dashboard | Buques en puerto | HU-DAS-002 |
| Dashboard | Llegadas programadas | HU-DAS-003 |
| Dashboard | Zarpes programados | HU-DAS-004 |
| Dashboard | Indicadores operativos | HU-DAS-005 |
| Dashboard | Alertas y notificaciones | HU-DAS-006 |
| Operaciones Marítimas | Buques > Registro de Buques | HU-OPE-001 |
| Operaciones Marítimas | Buques > Consulta de Buques | HU-OPE-002 |
| Operaciones Marítimas | Buques > Estado de Buques | HU-OPE-003 |
| Operaciones Marítimas | Buques > Historial de Escalas | HU-OPE-004 |
| Operaciones Marítimas | Arribos > Programación de Arribos | HU-OPE-005 |
| Operaciones Marítimas | Arribos > Confirmación de Arribo | HU-OPE-006 |
| Operaciones Marítimas | Arribos > Control de Arribos | HU-OPE-007 |
| Operaciones Marítimas | Zarpes > Programación de Zarpe | HU-OPE-008 |
| Operaciones Marítimas | Zarpes > Autorizaciones | HU-OPE-009 |
| Operaciones Marítimas | Zarpes > Confirmación de Zarpe | HU-OPE-010 |
| Operaciones Marítimas | Escalas > Escalas Programadas | HU-OPE-011 |
| Operaciones Marítimas | Escalas > Escalas Históricas | HU-OPE-012 |
| Operaciones Marítimas | Escalas > Control de Operaciones | HU-OPE-013 |
| Gestión de Carga | Importaciones > Registro de Importaciones | HU-CAR-001 |
| Gestión de Carga | Importaciones > Seguimiento de Cargas | HU-CAR-002 |
| Gestión de Carga | Importaciones > Liberación de Mercancías | HU-CAR-003 |
| Gestión de Carga | Exportaciones > Registro de Exportaciones | HU-CAR-004 |
| Gestión de Carga | Exportaciones > Control de Embarques | HU-CAR-005 |
| Gestión de Carga | Exportaciones > Seguimiento de Exportaciones | HU-CAR-006 |
| Gestión de Carga | Contenedores > Registro de Contenedores | HU-CAR-007 |
| Gestión de Carga | Contenedores > Tracking de Contenedores | HU-CAR-008 |
| Gestión de Carga | Contenedores > Control de Movimientos | HU-CAR-009 |
| Gestión de Carga | Carga Especial > Carga Refrigerada | HU-CAR-010 |
| Gestión de Carga | Carga Especial > Carga Peligrosa | HU-CAR-011 |
| Gestión de Carga | Carga Especial > Carga Sobredimensionada | HU-CAR-012 |
| Documentación | Manifiestos > Crear Manifiesto | HU-DOC-001 |
| Documentación | Manifiestos > Consulta de Manifiestos | HU-DOC-002 |
| Documentación | Manifiestos > Envío a Autoridades | HU-DOC-003 |
| Documentación | Bill of Lading (BL) > Master BL | HU-DOC-004 |
| Documentación | Bill of Lading (BL) > House BL | HU-DOC-005 |
| Documentación | Bill of Lading (BL) > Liberación de BL | HU-DOC-006 |
| Documentación | Certificados > Certificados de Origen | HU-DOC-007 |
| Documentación | Certificados > Certificados Sanitarios | HU-DOC-008 |
| Documentación | Certificados > Certificados Especiales | HU-DOC-009 |
| Documentación | Archivo Documental > Gestión Documental | HU-DOC-010 |
| Documentación | Archivo Documental > Digitalización | HU-DOC-011 |
| Documentación | Archivo Documental > Consulta Histórica | HU-DOC-012 |
| Operaciones Portuarias | Atención de Naves > Programación de Atención | HU-POR-001 |
| Operaciones Portuarias | Atención de Naves > Asignación de Recursos | HU-POR-002 |
| Operaciones Portuarias | Atención de Naves > Seguimiento Operativo | HU-POR-003 |
| Operaciones Portuarias | Atraques > Solicitudes de Atraque | HU-POR-004 |
| Operaciones Portuarias | Atraques > Control de Muelles | HU-POR-005 |
| Operaciones Portuarias | Atraques > Disponibilidad de Espacios | HU-POR-006 |
| Operaciones Portuarias | Servicios Portuarios > Practicaje | HU-POR-007 |
| Operaciones Portuarias | Servicios Portuarios > Remolcadores | HU-POR-008 |
| Operaciones Portuarias | Servicios Portuarios > Amarradores | HU-POR-009 |
| Operaciones Portuarias | Servicios Portuarios > Servicios Especiales | HU-POR-010 |
| Operaciones Portuarias | Estiba y Desestiba > Planificación | HU-POR-011 |
| Operaciones Portuarias | Estiba y Desestiba > Seguimiento | HU-POR-012 |
| Operaciones Portuarias | Estiba y Desestiba > Control de Costos | HU-POR-013 |
| Clientes y Representadas | Clientes > Importadores | HU-CLI-001 |
| Clientes y Representadas | Clientes > Exportadores | HU-CLI-002 |
| Clientes y Representadas | Clientes > Consignatarios | HU-CLI-003 |
| Clientes y Representadas | Navieras > Registro de Navieras | HU-CLI-004 |
| Clientes y Representadas | Navieras > Contratos | HU-CLI-005 |
| Clientes y Representadas | Navieras > Tarifarios | HU-CLI-006 |
| Clientes y Representadas | Agentes Internacionales > Registro | HU-CLI-007 |
| Clientes y Representadas | Agentes Internacionales > Convenios | HU-CLI-008 |
| Clientes y Representadas | Agentes Internacionales > Contactos | HU-CLI-009 |
| Clientes y Representadas | Proveedores > Registro de Proveedores | HU-CLI-010 |
| Clientes y Representadas | Proveedores > Servicios Contratados | HU-CLI-011 |
| Clientes y Representadas | Proveedores > Evaluación de Proveedores | HU-CLI-012 |
| Logística y Transporte | Transporte Terrestre > Programación de Viajes | HU-LOG-001 |
| Logística y Transporte | Transporte Terrestre > Control de Vehículos | HU-LOG-002 |
| Logística y Transporte | Transporte Terrestre > Seguimiento GPS | HU-LOG-003 |
| Logística y Transporte | Despachos > Programación | HU-LOG-004 |
| Logística y Transporte | Despachos > Control de Entregas | HU-LOG-005 |
| Logística y Transporte | Despachos > Confirmación de Recepción | HU-LOG-006 |
| Logística y Transporte | Almacenes > Ingresos | HU-LOG-007 |
| Logística y Transporte | Almacenes > Salidas | HU-LOG-008 |
| Logística y Transporte | Almacenes > Inventario de Carga | HU-LOG-009 |
| Aduanas | DAM > Registro DAM | HU-ADU-001 |
| Aduanas | DAM > Consulta DAM | HU-ADU-002 |
| Aduanas | DAM > Seguimiento | HU-ADU-003 |
| Aduanas | Despachos Aduaneros > Levante Aduanero | HU-ADU-004 |
| Aduanas | Despachos Aduaneros > Aforos | HU-ADU-005 |
| Aduanas | Despachos Aduaneros > Reconocimientos | HU-ADU-006 |
| Aduanas | Fiscalizaciones > SUNAT | HU-ADU-007 |
| Aduanas | Fiscalizaciones > SENASA | HU-ADU-008 |
| Aduanas | Fiscalizaciones > DIGESA | HU-ADU-009 |
| Aduanas | Fiscalizaciones > Otras Entidades | HU-ADU-010 |
| Facturación y Finanzas | Comercial > Cotizaciones | HU-FIN-001 |
| Facturación y Finanzas | Comercial > Tarifarios | HU-FIN-002 |
| Facturación y Finanzas | Comercial > Contratos | HU-FIN-003 |
| Facturación y Finanzas | Facturación > Emisión de Facturas | HU-FIN-004 |
| Facturación y Finanzas | Facturación > Notas de Crédito | HU-FIN-005 |
| Facturación y Finanzas | Facturación > Notas de Débito | HU-FIN-006 |
| Facturación y Finanzas | Cuentas por Cobrar > Estado de Cuenta | HU-FIN-007 |
| Facturación y Finanzas | Cuentas por Cobrar > Cobranza | HU-FIN-008 |
| Facturación y Finanzas | Cuentas por Cobrar > Reportes | HU-FIN-009 |
| Facturación y Finanzas | Cuentas por Pagar > Proveedores | HU-FIN-010 |
| Facturación y Finanzas | Cuentas por Pagar > Obligaciones | HU-FIN-011 |
| Facturación y Finanzas | Cuentas por Pagar > Pagos | HU-FIN-012 |
| Facturación y Finanzas | Liquidación de Buques > Gastos Portuarios | HU-FIN-013 |
| Facturación y Finanzas | Liquidación de Buques > Servicios Prestados | HU-FIN-014 |
| Facturación y Finanzas | Liquidación de Buques > Liquidación Final | HU-FIN-015 |
| Reportes | Operativos > Movimientos por Buque | HU-REP-001 |
| Reportes | Operativos > Escalas Atendidas | HU-REP-002 |
| Reportes | Operativos > Tiempos Operativos | HU-REP-003 |
| Reportes | Comerciales > Clientes Activos | HU-REP-004 |
| Reportes | Comerciales > Facturación | HU-REP-005 |
| Reportes | Comerciales > Rentabilidad | HU-REP-006 |
| Reportes | Aduaneros > Importaciones | HU-REP-007 |
| Reportes | Aduaneros > Exportaciones | HU-REP-008 |
| Reportes | Aduaneros > Estadísticas | HU-REP-009 |
| Reportes | Gerenciales > KPIs | HU-REP-010 |
| Reportes | Gerenciales > Indicadores | HU-REP-011 |
| Reportes | Gerenciales > Dashboard Ejecutivo | HU-REP-012 |
| Alertas y Notificaciones | Próximos Arribos | HU-ALE-001 |
| Alertas y Notificaciones | Próximos Zarpes | HU-ALE-002 |
| Alertas y Notificaciones | Documentos por Vencer | HU-ALE-003 |
| Alertas y Notificaciones | Pagos Pendientes | HU-ALE-004 |
| Alertas y Notificaciones | Incidencias Operativas | HU-ALE-005 |
| Alertas y Notificaciones | Alertas Aduaneras | HU-ALE-006 |
| Recursos Humanos | Personal > Empleados | HU-RRH-001 |
| Recursos Humanos | Personal > Contratos | HU-RRH-002 |
| Recursos Humanos | Personal > Asistencia | HU-RRH-003 |
| Recursos Humanos | Operaciones > Turnos | HU-RRH-004 |
| Recursos Humanos | Operaciones > Asignación de Personal | HU-RRH-005 |
| Recursos Humanos | Operaciones > Evaluaciones | HU-RRH-006 |
| Administración | Seguridad > Usuarios | HU-ADM-001 |
| Administración | Seguridad > Roles | HU-ADM-002 |
| Administración | Seguridad > Permisos | HU-ADM-003 |
| Administración | Configuración > Empresas | HU-ADM-004 |
| Administración | Configuración > Sucursales | HU-ADM-005 |
| Administración | Configuración > Puertos | HU-ADM-006 |
| Administración | Configuración > Parámetros del Sistema | HU-ADM-007 |
| Administración | Auditoría > Log de Accesos | HU-ADM-008 |
| Administración | Auditoría > Auditoría de Cambios | HU-ADM-009 |
| Administración | Auditoría > Trazabilidad | HU-ADM-010 |
| Portal de Clientes | Consultas > Estado de Carga | HU-PTL-001 |
| Portal de Clientes | Consultas > Estado Documentario | HU-PTL-002 |
| Portal de Clientes | Consultas > Estado de Facturación | HU-PTL-003 |
| Portal de Clientes | Servicios > Solicitud de Servicios | HU-PTL-004 |
| Portal de Clientes | Servicios > Seguimiento de Operaciones | HU-PTL-005 |
| Portal de Clientes | Servicios > Descarga de Documentos | HU-PTL-006 |
| Portal de Clientes | Comunicaciones > Mensajes | HU-PTL-007 |
| Portal de Clientes | Comunicaciones > Notificaciones | HU-PTL-008 |
| Portal de Clientes | Comunicaciones > Soporte | HU-PTL-009 |

Total: 145 historias, una por cada opción hoja del menú.


