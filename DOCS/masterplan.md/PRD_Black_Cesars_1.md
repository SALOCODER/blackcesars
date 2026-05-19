# PRD — Black Cesars
## Sistema de Comando Operativo-Financiero para Gestión de Fondos Inmobiliarios

---

**Versión:** 1.0
**Fecha:** Mayo 2026
**Autor:** César (Founder, Black Cesars)
**Destinatario de implementación:** Claude Code
**Status:** Listo para desarrollo

---

## 1. Resumen Ejecutivo

Black Cesars es una empresa de inversión inmobiliaria especializada en la adquisición de inmuebles problemáticos en España (principalmente con okupas), su saneamiento mediante un equipo táctico especializado, y su posterior comercialización. Opera mediante fondos donde participan inversionistas externos.

Actualmente Black Cesars enfrenta un problema operativo crítico: el **Fondo 2** (25 propiedades en múltiples regiones de España) presenta serios desafíos de rentabilidad, tiempo y coordinación. El founder reside en México mientras el equipo opera en España, lo que genera asimetría de información, dependencia narrativa del equipo táctico, y dificultad para tomar decisiones objetivas y oportunas.

Este sistema, **Black Cesars Operating System (Black Cesars OS)**, busca convertir la operación distribuida y fragmentada en WhatsApp en un sistema de comando ejecutivo con visibilidad completa de:

- Estado operativo de cada propiedad (semáforo + detalle)
- P&L individual y consolidado por fondo
- Waterfall de retornos a inversionistas y socios
- Desviaciones contra presupuesto y proyecciones
- Alertas proactivas y oportunidades de decisión
- Módulo de análisis asistido por IA para decisiones críticas

El objetivo prioritario inmediato es **rescatar el Fondo 2** maximizando recuperación de capital y rentabilidad, con arquitectura preparada para escalar a los otros 5 fondos existentes y fondos futuros.

---

## 2. Problema a Resolver

### 2.1 Síntomas actuales

1. **Asimetría de información:** El founder no tiene visibilidad objetiva del estado de cada propiedad. Depende de mensajes fragmentados en WhatsApp y de la narrativa del equipo táctico, que puede sesgar decisiones.

2. **Cuellos de botella invisibles:** Casos documentados de propiedades desokupadas donde el equipo táctico tardó semanas en entregar llaves al equipo de ventas (4 propiedades del Fondo 2). El problema solo se detectó cuando el founder fue escalado manualmente.

3. **Falta de P&L individualizado:** No existe un cuadro consolidado que muestre costo acumulado por propiedad (adquisición + liberación + mejoras + servicios + comisiones) contra precio de mercado estimado, ni la rentabilidad proyectada individualizada.

4. **Reportes huecos:** Los reportes semanales y mensuales actuales (elaborados con Xenia) tienen "muchas palabras y poca visibilidad de avance, control y proyección".

5. **Decisiones reactivas y sin contexto legal:** El founder toma decisiones bajo presión del día a día sin tener visión completa de implicaciones legales (régimen español), económicas (impacto en waterfall del fondo) o prácticas.

6. **Adopción fallida de sistemas previos:** Se intentó implementar un sistema operado por Simón que el equipo no adoptó. La hipótesis principal: pedirle al equipo que abandone WhatsApp es contranatural.

7. **Coordinación entre áreas deficiente:** Equipo táctico (Paco, Samuel, Jonathan), administración (Renata, Simón), comercial (Hernán), PR (Xenia) y técnica (Elizabeth, arquitecta) operan en silos con WhatsApp como único pegamento.

### 2.2 Costo del problema

- Ventas a pérdida tomadas bajo presión narrativa sin análisis frío de alternativas
- Tiempo de ciclo extendido (semanas perdidas en transferencias internas)
- Re-okupaciones por demoras post-liberación
- Riesgo reputacional ante inversionistas del Fondo 2
- Energía ejecutiva del founder consumida en operación diaria en lugar de estrategia

---

## 3. Objetivos del Sistema

### 3.1 Objetivos primarios (V1)

1. **Devolver objetividad al founder:** Una pantalla principal donde, en menos de 30 segundos, sepa el estado real de las 25 propiedades del Fondo 2 sin depender de la narrativa de nadie.

2. **P&L individualizado en tiempo real:** Cada propiedad muestra costo acumulado, precio estimado de venta, rentabilidad proyectada, y **desviación contra presupuesto original**.

3. **Waterfall automático del fondo:** Cálculo continuo de cuánto recibiría cada parte (inversionistas, socios) si el fondo se liquidara hoy a precios estimados actuales.

4. **Capturar información sin cambiar hábitos del equipo:** El equipo táctico sigue usando WhatsApp. Un bot operado desde un número virtual dedicado vive en el grupo, hace preguntas proactivas diarias, y procesa respuestas (texto, voz, foto) para alimentar el sistema.

5. **Eliminar cuellos de botella invisibles:** Alertas automáticas cuando una propiedad lleva X días sin avance, cuando hay handoffs pendientes entre áreas, o cuando se cruzan umbrales de costo.

6. **Módulo de decisiones asistidas por Claude:** Una sección donde el founder describe una situación que requiere decisión, el sistema le presenta automáticamente todos los datos relevantes de la propiedad/fondo, y Claude analiza implicaciones legales, financieras y prácticas antes de la instrucción final.

### 3.2 Objetivos secundarios (V2-V3)

- Integración bidireccional con el sistema administrativo de Renata
- Reportes ejecutivos automáticos para inversionistas
- Replicación de la arquitectura para Fondos 1, 3, 4, 5, 6
- Módulo de evaluación pre-compra (due diligence) para futuros fondos
- Migración a WhatsApp Business API oficial cuando el volumen lo justifique

### 3.3 No-objetivos (fuera de scope)

- No es un CRM inmobiliario tradicional (gestión de leads, marketing, etc.)
- No reemplaza el sistema administrativo de Renata (lo complementa)
- No gestiona la relación con inversionistas (captación, KYC, contratos) — eso vive en otro proceso
- No automatiza decisiones críticas; siempre hay un humano (César) en el loop

---

## 4. Usuarios y Roles

### 4.1 Usuario primario

**César (Founder, México)**
- Acceso total al sistema
- Toma decisiones finales sobre propiedades, ventas, inversión adicional, gastos extraordinarios
- Usa el dashboard ejecutivo varias veces al día
- Usa el módulo de decisiones asistidas para casos complejos
- Recibe alertas proactivas

### 4.2 Usuarios operativos

**Simón (Socio, España)**
- Captura manual durante Fase 1 (mientras se conecta WhatsApp)
- Gestión administrativa-financiera del fondo
- Vista financiera del fondo
- Coordinación con Renata

**Renata (Administración, España)**
- Mantiene su sistema actual sin disrupción
- En Fase 2 se conecta o sincroniza con Black Cesars OS
- Aporta datos de costos, precios de adquisición, registros legales

**Hernán (VP de Ventas, España)**
- Captura/actualiza precios estimados de venta por propiedad
- Reporta ofertas recibidas, negociaciones, ventas cerradas
- Recibe notificación cuando una propiedad pasa a "Lista para venta"

**Equipo Táctico (Paco, Samuel, Jonathan, España)**
- Interactúa exclusivamente vía WhatsApp con el bot
- Responde encuestas diarias proactivas (1-tap cuando posible)
- Manda fotos, videos, audios al grupo (procesados automáticamente)
- Reporta incidencias y avances

**Xenia (PR Manager, España)**
- Aporta información de relaciones públicas y autoridades
- Recibe automáticamente los datos para reportes semanales y mensuales

**Elizabeth (Arquitecta, España)**
- Aporta evaluaciones técnicas y urbanísticas bajo demanda
- Sus reportes se asocian a propiedades específicas

### 4.3 Matriz de permisos (resumen)

| Rol | Ver dashboard | Editar P&L | Cambiar estado propiedad | Aprobar gastos | Decisiones de venta |
|-----|--------------|------------|--------------------------|----------------|---------------------|
| César | ✓ | ✓ | ✓ | ✓ | ✓ |
| Simón | ✓ | ✓ | ✓ | Hasta umbral | Recomendar |
| Renata | ✓ (admin) | ✓ | — | — | — |
| Hernán | ✓ (comercial) | Solo precio venta | Solo a "vendida" | — | Recomendar |
| Equipo Táctico | Limitado a su propiedad | — | Avance operativo | — | — |
| Xenia | ✓ (reportes) | — | — | — | — |
| Elizabeth | Limitado | — | — | — | — |

---

## 5. Funcionalidades del Sistema

### 5.1 Módulo 1 — Dashboard Ejecutivo

**Pantalla principal del founder.** Carga en menos de 2 segundos. Muestra:

#### 5.1.1 Header — Vista de Fondo
- Selector de fondo (Fondo 1, Fondo 2 default, Fondo 3-6, Todos)
- Para el fondo seleccionado:
  - Capital total levantado
  - Capital invertido a la fecha
  - Costo acumulado total (adquisición + operación + mejoras + servicios)
  - Valor estimado de venta total (suma de precios estimados de Hernán)
  - **Rentabilidad proyectada del fondo** (con waterfall aplicado)
  - **Desviación contra plan original** (en € y %)
  - Semáforo global del fondo (Verde / Amarillo / Rojo)

#### 5.1.2 Tabla central — Propiedades
Cada renglón = una propiedad. Columnas:

| Columna | Descripción |
|---------|-------------|
| Semáforo | Indicador visual Verde/Amarillo/Rojo basado en reglas (ver 5.6) |
| ID | Identificador interno |
| Nombre / Dirección | Ej: "Carabanchel Goya 14" |
| Ciudad / Región | Madrid, Málaga, Zaragoza, Castellón... |
| Estado | Adquirida, En desokupación, Libre, En rehabilitación, Lista venta, En negociación, Vendida, Reokupada, Bloqueada legal, Demolición pendiente, Decisión pendiente |
| Días en estado actual | Para detectar estancamiento |
| Costo acumulado € | Sumatoria de todos los costos |
| Precio estimado venta € | Última valoración de Hernán |
| Rentabilidad proyectada % | (Precio venta − Costo) / Costo |
| Desviación vs. plan | En € y %, color codificado |
| Responsable actual | Quién tiene la bola ahora (Paco / Hernán / Legal / etc.) |
| Última actualización | Timestamp + fuente (WhatsApp Paco, captura César, etc.) |
| Acción sugerida | Generada por el sistema (ver 5.6) |

Filtros disponibles: por estado, por ciudad, por semáforo, por responsable, por "necesita decisión".

Ordenamientos: por mayor pérdida proyectada, por días en estado, por valor, alfabético.

#### 5.1.3 Panel lateral — Alertas y pendientes
- Propiedades en rojo que requieren decisión
- Handoffs pendientes (ej: "Goya 14 desokupada hace 8 días, llaves no entregadas a Hernán")
- Costos que cruzaron umbrales
- Propiedades sin actualización en > 7 días
- Decisiones del founder pendientes de instrucción

### 5.2 Módulo 2 — Vista Detalle de Propiedad

Al hacer clic en una propiedad, se abre vista completa con:

#### 5.2.1 Información general
- Foto principal + galería completa (alimentada desde WhatsApp)
- Dirección completa, registro catastral, m², características
- Fondo al que pertenece
- Fecha de adquisición
- Agencia vendedora original (relevante para Fondo 2 — vicios ocultos)
- Documentos asociados (escrituras, contratos, denuncias) — links

#### 5.2.2 Línea de tiempo de eventos
Cronología completa: adquirida, primera visita ocular, contacto con okupas, ofertas cash for keys, desokupación, instalación de medidas (puerta antiokupa, alarma, cámaras), rehabilitación, valoración, ofertas, etc. Cada evento con timestamp, responsable y fuente.

#### 5.2.3 P&L individual
Desglose por categoría (todas las categorías están abiertas para captura desde el inicio):

- Precio de adquisición
- Gastos legales y notariales de compra
- Costos del equipo táctico (desokupación)
- Honorarios legales (denuncias, juicios, defensa)
- Cash for keys pagado
- Rehabilitación / obra
- Mantenimiento y servicios (luz, agua, comunidad, IBI)
- Puerta antiokupa
- Alarmas y cámaras
- Seguros
- Limpieza general
- Comercialización (fotos, anuncios, Hernán)
- Comisiones de venta
- Impuestos sobre venta
- Gastos diversos menores (categoría flexible para imprevistos)

Total acumulado y comparación contra **presupuesto original asignado a esa propiedad**. Desviación en € y %.

#### 5.2.4 Valoración y rentabilidad
- Precio estimado actual (Hernán)
- Historial de valoraciones (cómo ha cambiado en el tiempo)
- Rentabilidad proyectada hoy
- Tiempo estimado para venta
- Probabilidad de re-okupación (criterio cualitativo del equipo táctico)

#### 5.2.5 Notas y observaciones
- Mensajes relevantes del equipo táctico (extraídos de WhatsApp)
- Notas técnicas de Elizabeth
- Notas de Hernán sobre el mercado local
- Notas de Xenia sobre relaciones con autoridades

#### 5.2.6 Decisiones tomadas y pendientes
Log histórico de decisiones del founder + decisiones actualmente pendientes para esa propiedad.

### 5.3 Módulo 3 — P&L y Waterfall del Fondo

#### 5.3.1 Vista financiera del fondo (Fondo 2 prioritario)

Cuadro consolidado:
- Capital levantado de inversionistas
- Capital invertido en propiedades (suma de adquisiciones)
- Costo operativo acumulado (suma de todos los costos no-adquisición)
- Costo total = Capital invertido + Costo operativo
- Valor estimado actual del portafolio (suma de precios estimados Hernán)
- Ventas realizadas a la fecha (suma de ventas cerradas)
- Caja remanente del fondo

#### 5.3.2 Waterfall automático

Cálculo continuo del orden de pago bajo dos escenarios:
- **Escenario A — Liquidación hoy:** ¿Cuánto recibe cada parte si vendiéramos TODO al precio estimado de Hernán hoy?
- **Escenario B — Plan original:** ¿Cuánto debería recibir cada parte según el plan?

Estructura del waterfall (programar exactamente así):

1. **Retorno de capital a inversionistas** (100% del capital aportado)
2. **Retorno preferente** (13% anual sobre capital aportado) a inversionistas
3. **Catch-up** (8%) a Simón y César
4. **Split del excedente:** 50% inversionistas, 50% Simón y César

El sistema muestra cuánto recibe cada parte en ambos escenarios y la desviación.

#### 5.3.3 Desviación proyectada

Indicador crítico: el sistema proyecta, basándose en la trayectoria actual de cada propiedad, si la rentabilidad del fondo terminará por encima o por debajo del plan original. Esto permite anticipación, no reacción.

### 5.4 Módulo 4 — Bot de WhatsApp

#### 5.4.1 Arquitectura técnica

- **Número:** virtual (Twilio, MessageBird o equivalente) — NO requiere SIM ni teléfono físico adicional
- **Conexión:** vía librerías tipo whatsapp-web.js / Baileys en Fase 1, migrable a WhatsApp Business API oficial en Fase 3
- **Acceso humano de respaldo:** vía WhatsApp Web desde laptop si se requiere intervención manual
- **Grupo objetivo:** "Equipo Táctico Black Cesars" (existente) + creación de canales 1-a-1 con cada responsable según necesidad

#### 5.4.2 Modo proactivo (principal)

El bot, según calendario y reglas configurables, manda mensajes al grupo o a usuarios individuales:

**Ejemplos:**

> *"Buenos días Paco. ¿Hubo avance en Goya 14 (Carabanchel)? Responde con un número:*
> *1️⃣ Sin cambios*
> *2️⃣ Avance positivo (cuéntame en texto/audio)*
> *3️⃣ Problema nuevo (cuéntame)*
> *4️⃣ Reokupación*
> *5️⃣ Llaves listas para entregar a Hernán"*

> *"Hernán, hace 12 días Goya 14 está marcada como Lista para venta. ¿Hay novedades comerciales?*
> *1️⃣ Sin movimiento*
> *2️⃣ Visitas programadas*
> *3️⃣ Oferta recibida (detalla)*
> *4️⃣ Necesito ajustar precio (detalla)"*

> *"Samuel, ¿la puerta antiokupa de Málaga San Andrés ya está instalada? Responde sí/no/parcial + foto si puedes."*

#### 5.4.3 Modo reactivo

Cualquier mensaje libre que el equipo mande al grupo o al bot es procesado:

- **Texto:** clasificación automática por NLP (qué propiedad, qué tipo de evento, qué áreas involucra)
- **Audios:** transcripción automática y misma clasificación
- **Fotos / videos:** asociación a la propiedad correspondiente (el bot pregunta si no está claro), almacenamiento en galería de la propiedad
- **Si la clasificación es ambigua, el bot pregunta:** *"Recibí tu mensaje. ¿Es sobre cuál propiedad? Responde con el número: 1) Goya 14, 2) San Andrés 22, 3) Otra (detalla)"*

#### 5.4.4 Resumen diario al founder

Cada noche (hora México), el bot envía a César un mensaje privado tipo:

> *"Resumen del día — Fondo 2:*
> *• 3 propiedades con avance positivo: Goya 14, Sevilla Triana, Castellón Centro*
> *• 1 propiedad con problema nuevo: Zaragoza Delicias (detalle en sistema)*
> *• 2 handoffs pendientes: llaves Málaga San Andrés (Paco→Hernán), valoración Valencia (Hernán pendiente)*
> *• 1 decisión pendiente tu instrucción: oferta recibida Madrid Vallecas — €78k vs estimado €92k*
> *• Costo del día: €4.230 (detalle por propiedad en sistema)*
> *Abre el dashboard: [link]"*

#### 5.4.5 Comandos directos para el founder

César puede mandar al bot en privado comandos como:
- `/estado Goya 14` → recibe resumen instantáneo
- `/fondo 2` → resumen del fondo
- `/alertas` → solo lo crítico
- `/decisión Vallecas` → abre el módulo de decisión asistida para esa propiedad

### 5.5 Módulo 5 — Decisiones Asistidas por Claude

Este es el módulo diferencial del sistema.

#### 5.5.1 Flujo de uso

1. César abre el módulo (desde dashboard o vía comando WhatsApp)
2. Selecciona la propiedad o situación
3. El sistema **carga automáticamente todo el contexto**:
   - P&L completo de la propiedad
   - Historial de eventos
   - Posición de esa propiedad dentro del waterfall del fondo
   - Notas relevantes del equipo
   - Documentos asociados
4. César describe la situación o pregunta: *"Hernán recomienda demandar a la agencia vendedora por vicios ocultos en Zaragoza Delicias. Elizabeth confirmó problema urbanístico. ¿Qué hago?"*
5. **Claude analiza** considerando:
   - Marco legal español relevante (vicios ocultos, art. 1484 CC español, plazos, costes procesales típicos)
   - Impacto financiero: costo legal estimado vs. probabilidad de éxito vs. recuperación esperada
   - Impacto en waterfall del Fondo 2
   - Comparables (qué pasó en casos similares)
   - Riesgos prácticos (tiempo, distracción del equipo)
6. Claude entrega un análisis estructurado:
   - Resumen ejecutivo (3 líneas)
   - Opciones disponibles (típicamente 2-4)
   - Pros y contras de cada una
   - Impacto financiero estimado de cada opción
   - Recomendación con razonamiento
   - Riesgos y consideraciones
   - Preguntas que César debería responder/investigar antes de decidir
7. César puede contra-preguntar las veces que necesite
8. Cuando César decide, el sistema:
   - Registra la decisión y su razonamiento
   - Genera el mensaje/instrucción para el responsable correspondiente (Hernán, Paco, abogado, etc.)
   - Crea recordatorios de seguimiento

#### 5.5.2 Tipos de decisiones típicas (Fondo 2)

- Vender a pérdida vs. seguir invirtiendo
- Demandar agencia vendedora vs. asumir pérdida
- Cash for keys vs. vía judicial
- Inversión en rehabilitación vs. venta as-is
- Aceptar oferta actual vs. esperar
- Adquirir propiedad adicional para rentabilizar fondo

#### 5.5.3 Memoria de decisiones

El sistema mantiene historial de todas las decisiones, sus razonamientos y sus resultados eventuales, para aprendizaje y consistencia.

### 5.6 Módulo 6 — Reglas de Semáforo y Alertas

#### 5.6.1 Lógica del semáforo por propiedad

**🟢 Verde:**
- Estado avanza según plan original
- Costo acumulado dentro de presupuesto
- Sin handoffs pendientes > 5 días
- Última actualización < 7 días

**🟡 Amarillo:**
- Estancada > 14 días en mismo estado, o
- Costo acumulado al 80-100% de presupuesto, o
- Handoff pendiente 5-10 días, o
- Sin actualización 7-14 días, o
- Rentabilidad proyectada bajó entre 5% y 15% vs. plan

**🔴 Rojo:**
- Estancada > 30 días, o
- Costo acumulado > 100% de presupuesto, o
- Handoff pendiente > 10 días, o
- Sin actualización > 14 días, o
- Rentabilidad proyectada bajó > 15% vs. plan, o
- Re-okupación, o
- Bloqueo legal / urbanístico identificado, o
- Marcada manualmente por César/Simón como crítica

(Todos los umbrales son configurables.)

#### 5.6.2 Alertas proactivas

El sistema dispara alertas (notificación en dashboard + mensaje WhatsApp al founder) cuando:

- Una propiedad cambia a 🔴
- Una propiedad cruza el 80% del presupuesto (preventivo)
- Una propiedad lleva 90 días sin avance significativo
- Una propiedad fue desokupada y a los 7 días no se ha entregado llaves a Hernán
- Hernán reporta una oferta recibida
- Una propiedad es re-okupada
- Elizabeth reporta un problema técnico o urbanístico
- El fondo en agregado cruza umbrales (50%, 75%, 100% del costo presupuestado)
- Hay una decisión pendiente del founder > 48 horas

### 5.7 Módulo 7 — Reportes

#### 5.7.1 Reporte semanal automático

Generado cada lunes a las 8am hora España. Estructura:

- **Snapshot del Fondo 2**: P&L consolidado, waterfall estimado hoy, desviación
- **Propiedades activas por estado** (conteo + lista)
- **Avances de la semana** (cambios de estado, costos registrados, ventas)
- **Top 3 propiedades en 🔴** con acción sugerida
- **Decisiones tomadas la semana anterior** y su tracking
- **Handoffs cerrados / pendientes**
- **Próximos hitos previstos**

Reemplaza el reporte hueco actual de Xenia. Xenia revisa, complementa con contexto cualitativo donde aporte, y distribuye.

#### 5.7.2 Reporte mensual ejecutivo

Versión más densa del semanal + comparativa contra mes anterior + proyección a 90 días + recomendaciones estratégicas.

#### 5.7.3 Reporte para inversionistas (V2)

Versión filtrada, presentable, con narrativa estructurada. Fuera de scope V1 pero el sistema debe tener los datos listos para producirlo.

---

## 6. Arquitectura y Stack Técnico Sugerido

### 6.1 Componentes

- **Frontend (dashboard):** aplicación web responsive (móvil y desktop). Sugerencia: React + Tailwind, o Next.js para SSR. Debe funcionar bien desde el celular del founder.
- **Backend:** Node.js o Python (FastAPI). API REST.
- **Base de datos:** PostgreSQL para datos estructurados (propiedades, eventos, costos). Almacenamiento de archivos (fotos/audios/videos) en S3 o equivalente.
- **Bot de WhatsApp:** Fase 1 vía whatsapp-web.js (Node) o equivalente Python, conectado a número virtual. Fase 3 migración a WhatsApp Business API oficial.
- **Transcripción de audios:** Whisper de OpenAI o equivalente.
- **Capa de IA / decisiones asistidas:** API de Anthropic (Claude). El módulo de decisiones manda el contexto estructurado + pregunta del founder al modelo y devuelve análisis.
- **Autenticación:** Login simple con email + 2FA. Sesiones diferenciadas por rol.
- **Hosting:** una opción simple tipo Railway, Render o Vercel. AWS si se quiere robustez desde el inicio.

### 6.2 Integraciones

- **Sistema de Renata:** Fase 2. Determinar en kickoff qué construyó (probablemente vía artefactos de Claude) y diseñar conector (API, sync por archivo, o absorción).
- **Email blackcesars@:** Importación inicial de archivos de Hernán (precios estimados) y posibles cargas periódicas.
- **Google Drive / Dropbox:** para documentos legales asociados a propiedades (Fase 2).

### 6.3 Consideraciones de seguridad

- Cifrado en tránsito (HTTPS) y en reposo
- Backups diarios automáticos
- Logs de auditoría (quién hizo qué y cuándo)
- Rol-based access control estricto
- No exponer datos financieros sensibles a roles que no los necesitan

---

## 7. Plan de Implementación por Fases

### Fase 0 — Setup (Semana 0, antes de desarrollo)

- César adquiere número virtual (Twilio o similar) — 30 minutos
- Reunión de kickoff con Simón para entender el sistema actual de Renata
- Recolección de archivos base: listado de 25 propiedades del Fondo 2, archivo de precios de Hernán, cualquier registro de costos de Renata
- Definir umbrales iniciales de semáforo con César y Simón

### Fase 1 — MVP funcional (Semanas 1-3)

**Objetivo:** dashboard usable + captura manual + módulo de decisiones operando.

Entregables:
- Base de datos con las 25 propiedades del Fondo 2 cargadas
- Dashboard ejecutivo (Módulo 1) funcional
- Vista detalle de propiedad (Módulo 2) funcional
- P&L y waterfall del Fondo 2 (Módulo 3) funcional
- Sistema de captura manual: Simón ingresa actualizaciones diarias desde España, basándose en lo que ve en WhatsApp existente
- Módulo de decisiones asistidas (Módulo 5) en versión beta
- Reglas básicas de semáforo (Módulo 6)
- Acceso para César, Simón. Vistas restringidas para Hernán y Renata.

**Hito de éxito Fase 1:** César abre el sistema desde México y, sin preguntarle a nadie, sabe el estado real del Fondo 2 en menos de 30 segundos.

### Fase 2 — Automatización WhatsApp + Integración Renata (Semanas 4-6)

Entregables:
- Bot WhatsApp con número virtual operando en el grupo "Equipo Táctico"
- Modo proactivo (preguntas diarias) y reactivo (procesamiento de mensajes libres)
- Transcripción automática de audios
- Resumen diario nocturno al founder
- Alertas automáticas funcionando (Módulo 6.2)
- Integración con sistema de Renata definida e implementada
- Reporte semanal automático (Módulo 7.1) operando
- Onboarding de equipo táctico, Hernán, Xenia, Elizabeth

**Hito de éxito Fase 2:** Simón deja de hacer captura manual. El sistema se auto-alimenta desde el WhatsApp del equipo. César recibe su resumen diario sin pedirlo.

### Fase 3 — Madurez y escalamiento (Semanas 7-12)

Entregables:
- Reporte mensual ejecutivo
- Reporte para inversionistas (base)
- Replicación de arquitectura para Fondos 1, 3, 4, 5, 6
- Migración a WhatsApp Business API oficial si el volumen lo justifica
- Refinamiento del módulo de decisiones con base en uso real
- Histórico y aprendizaje (módulo de memoria de decisiones)

### Fase 4 — Pre-compra y nuevos fondos (post-rescate Fondo 2)

Entregables:
- Módulo de evaluación pre-compra (due diligence)
- Checklist de visita ocular obligatoria
- Análisis de zona automatizado
- Comparables de mercado integrados
- Workflow de aprobación de compra

---

## 8. Criterios de Éxito

### 8.1 Adopción

- 80%+ de actualizaciones de propiedades llegan vía WhatsApp (no requieren captura manual) al finalizar Fase 2
- Equipo táctico responde a las preguntas proactivas del bot en > 70% de los casos dentro del día
- César abre el dashboard al menos 1 vez al día durante las primeras 4 semanas

### 8.2 Operativos

- Tiempo entre desokupación y entrega de llaves a Hernán: de "semanas" a < 5 días
- Tiempo de respuesta a decisiones pendientes del founder: < 24 horas (vs. actual no medido)
- Cero propiedades sin actualización > 14 días al finalizar Fase 2

### 8.3 Financieros

- Visibilidad 100% del P&L de cada propiedad del Fondo 2 al final de Fase 1
- Recuperación del Fondo 2: meta a definir con Simón en kickoff (recuperación de capital + cuánto del retorno preferente)
- Reducción de pérdidas por decisiones reactivas mal informadas (cualitativo, medido por percepción de César al final de Fase 2)

### 8.4 Calidad de decisiones

- 100% de las decisiones críticas del founder (vender a pérdida, demandar, inversión adicional) pasan por el módulo de decisiones asistidas antes de instrucción final
- Historial completo y consultable de decisiones tomadas

---

## 9. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| El equipo táctico no adopta el bot de WhatsApp | Media | Alto | Diseño en formato pregunta-rápida (1 tap). Onboarding personalizado. Simón hace seguimiento las primeras 2 semanas. Resúmenes visibles para que el equipo vea el valor. |
| Bloqueo del número virtual por Meta | Baja | Medio | Uso de número dedicado (no personal de César). Patrones de mensajeo humanizados. Plan de contingencia: dar de alta nuevo número en < 1 día. Migración a WhatsApp Business API en Fase 3. |
| Sistema de Renata no se puede integrar limpiamente | Media | Medio | Plan B: convivencia con sincronización manual o por exportación de archivos. No se bloquea el proyecto. |
| Precios estimados de Hernán están desactualizados | Alta | Alto | Workflow obligatorio: re-valoración de cada propiedad del Fondo 2 en las primeras 2 semanas. Re-valoración trimestral automática (recordatorio). |
| Calidad de transcripciones de audio insuficiente para español con acentos regionales | Media | Bajo | Whisper maneja bien español. Si falla, fallback a confirmación manual. |
| El módulo de decisiones asistidas da consejos incorrectos en temas legales | Media | Alto | Disclaimer claro: "El análisis no sustituye asesoría legal profesional". Para decisiones de alto impacto legal, sistema sugiere consulta con abogado especializado. Histórico auditable. |
| César no tiene tiempo para usar el sistema | Baja | Alto | Onboarding personalizado. Resumen diario por WhatsApp (donde ya vive). Sistema diseñado para uso < 10 min/día. |

---

## 10. Apéndices

### 10.1 Listado de stakeholders y contactos

(A completar en kickoff con datos reales)

- César — Founder — México
- Simón — Socio — España
- Renata — Administración — España
- Hernán — VP de Ventas — España
- Paco — Líder Equipo Táctico — España
- Samuel — Equipo Táctico — España
- Jonathan — Equipo Táctico — España
- Xenia — PR Manager — España
- Elizabeth — Arquitecta consultora — España

### 10.2 Datos iniciales a cargar

- Listado de 25 propiedades del Fondo 2 (Renata / archivos existentes)
- Precios estimados de venta por propiedad (Hernán / email blackcesars@)
- Costos acumulados conocidos por propiedad (Renata)
- Estructura de fondos 1-6 (capital levantado, inversionistas, propiedades asignadas)
- Reporte semanal y mensual actuales (Xenia) — como referencia de lo que NO se quiere

### 10.3 Estructura del waterfall (referencia exacta)

Por orden de pago en cada fondo:

1. **Devolución de capital aportado al 100%** a los inversionistas
2. **Retorno preferente del 13%** a los inversionistas (sobre capital aportado)
3. **Catch-up del 8%** para Simón y César
4. **Excedente:** 50% para inversionistas, 50% para Simón y César

### 10.4 Estados posibles de una propiedad

1. Identificada (pre-compra) — *fuera de scope V1*
2. Adquirida
3. En proceso de desokupación
4. Libre (desokupada)
5. En rehabilitación
6. Lista para venta
7. En negociación
8. Vendida
9. Reokupada
10. Bloqueada legal
11. Problema urbanístico / Demolición pendiente
12. Decisión pendiente del founder

### 10.5 Categorías de costo

(Lista abierta desde V1, expandible)

- Precio de adquisición
- Gastos legales y notariales de compra
- Costos del equipo táctico
- Honorarios legales (denuncias, juicios)
- Cash for keys
- Rehabilitación / obra
- Mantenimiento y servicios (luz, agua, comunidad, IBI)
- Puerta antiokupa
- Alarmas y cámaras
- Seguros
- Limpieza general
- Comercialización
- Comisiones de venta
- Impuestos sobre venta
- Gastos diversos menores

### 10.6 Decisiones clave pendientes de definir en kickoff

- Umbrales exactos del semáforo (días, %, € por categoría)
- Presupuesto original asignado a cada propiedad del Fondo 2 (para calcular desviaciones)
- Niveles de aprobación de gasto (a partir de qué € requiere autorización de César)
- Frecuencia exacta del bot proactivo (¿diario? ¿días alternos? ¿por propiedad según estado?)
- Mecanismo de re-valoración de precios estimados (¿quincenal? ¿mensual?)
- Política de retención de datos y backups

---

## 11. Notas finales para Claude Code

- **Prioridad absoluta:** que la Fase 1 entregue valor en 3 semanas. Es preferible un MVP feo y funcional que un sistema bonito y tardío.
- **Idioma de interfaz:** español (España y México). Sin localizaciones complejas.
- **Moneda:** Euro (€) como principal, con opción de conversión a USD/MXN para referencia del founder.
- **Zona horaria:** El sistema maneja dos zonas — España (operación) y México (founder). Horarios de bot y notificaciones se configuran según el destinatario.
- **Diseño visual:** profesional, sobrio, denso en información (no minimalista artificial). El founder quiere ver datos, no espacio en blanco. Inspirarse en dashboards tipo Bloomberg Terminal más que en apps consumer.
- **Mobile-first para el founder:** debe ser usable desde celular en México.
- **Texto explicativo:** En cada métrica importante, tooltip que explique cómo se calcula. Los datos sin contexto generan ruido.
- **No reinventar:** usar librerías establecidas, no construir desde cero.
- **Logs verbosos:** durante las primeras semanas, log de absolutamente todo para diagnosticar problemas de adopción y datos.

---

*Fin del documento.*
