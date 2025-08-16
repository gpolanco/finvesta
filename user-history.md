Historias y criterios de aceptación — Sprint 1 (Presupuesto, Transacciones, Import CSV, Alertas)

## Presupuesto

**B1. Crear/seleccionar mes**

- Historia: Como usuario quiero cambiar de mes y crear el presupuesto si no existe.
- Criterios:

  - Dado que selecciono un mes sin presupuesto, cuando confirmo “Create budget”, entonces se crea con categorías base y montos en 0.
  - Dado un mes existente, cuando lo selecciono, entonces veo sus importes y rollovers.
  - Persistencia por `user_id + month`.

**B2. Duplicar mes anterior**

- Historia: Como usuario quiero duplicar el presupuesto del mes anterior para ahorrar tiempo.
- Criterios:

  - Dado un mes actual sin presupuesto, cuando pulso “Duplicate last month”, entonces copia `budget_items.amount` y `rollover_enabled`.
  - No copia `carried_over_amount`. Se recalcula al cerrar mes.
  - Si no existe mes anterior, botón deshabilitado.

**B3. Edición inline por categoría**

- Historia: Como usuario quiero editar importes de cada categoría en línea.
- Criterios:

  - Dado un presupuesto abierto, cuando edito `amount` y confirmo, entonces se guarda sin refrescar página.
  - Validaciones: `amount ≥ 0`, moneda fija del usuario, formato `1,234.56` o `1234,56` aceptado.
  - Undo disponible por 10 s.

**B4. Rollover por categoría**

- Historia: Como usuario quiero activar rollover por categoría.
- Criterios:

  - Toggle por categoría guarda `rollover_enabled`.
  - Al cerrar mes: `carried_over_amount = max(0, amount - spent)` si `rollover_enabled`, si no, 0.
  - Apertura del nuevo mes: `amount += carried_over_amount` y `carried_over_amount` vuelve a 0.

**B5. Available to spend**

- Historia: Como usuario quiero ver el “disponible para gastar” del mes.
- Criterios:

  - Cálculo: `ingresos_presupuestados - suma_gastos_presupuestados - compromisos_fijos + rollovers_positivos - gasto_real_mes`.
  - Se actualiza en tiempo real al editar importes o registrar transacciones.
  - Si < 0, mostrar estado de alerta.

**B6. Sumarios por categoría**

- Historia: Como usuario quiero ver gasto vs presupuesto por categoría.
- Criterios:

  - Cada fila muestra: `spent`, `% used`, barra de progreso.
  - Estados: <75% normal, 75–99% aviso, ≥100% alerta.
  - Click abre lista de transacciones filtradas.

## Transacciones

**T1. Quick add**

- Historia: Como usuario quiero registrar una transacción en dos pasos.
- Criterios:

  - Campos mínimos: fecha, cuenta, categoría, importe, nota opcional.
  - Signo: gasto negativo o selector “Expense/Income” que fija el signo.
  - Validación: saldo de cuenta no puede quedar < 0 si la cuenta tiene “no overdraft”.
  - Guardar y reflejar en `spent` y balances al instante.

**T2. Recurrentes simples**

- Historia: Como usuario quiero programar gastos/ingresos recurrentes.
- Criterios:

  - Campos: frecuencia (mensual/semanal/anual), día, cuenta, categoría, importe, etiqueta “Bill?”.
  - Generación: instancia del mes se crea al inicio del período o al entrar al mes.
  - Pausar, reanudar, editar sin duplicar históricos.
  - Si “Bill?”, marca para alertas de vencimiento.

**T3. Filtros y lista**

- Historia: Como usuario quiero filtrar transacciones por cuenta, categoría, tipo y rango de fechas.
- Criterios:

  - Filtros combinables. Persisten por sesión.
  - Export CSV del resultado.

## Importación CSV de transacciones

**I1. Mapeo guiado**

- Historia: Como usuario quiero importar un CSV y mapear columnas a campos del sistema.
- Criterios:

  - Paso 1: subir archivo `.csv` hasta 5 MB.
  - Paso 2: detectar encabezados y sugerir mapeo a `date, account, category, amount, notes`.
  - Paso 3: vista previa de 20 filas con validaciones en línea.

**I2. Validaciones y formatos**

- Historia: Como usuario quiero que el importador detecte errores comunes.
- Criterios:

  - Fecha: admite `YYYY-MM-DD`, `DD/MM/YYYY`. Zona: Europe/Madrid.
  - Decimal: `.` o `,`. Miles: `,` o espacio. Normalización automática.
  - Categoría: si no existe, opción “Create on import” o asignar “Uncategorized”.
  - Cuenta: requiere correspondencia exacta; si no existe, seleccionar una por defecto.
  - Duplicados: regla hash `(date+amount+account+notes)` con opción “skip/keep”.

**I3. Idempotencia y commit**

- Historia: Como usuario quiero confirmar antes de aplicar la importación.
- Criterios:

  - “Validate” no escribe en BD. “Import” hace commit transaccional.
  - Resumen final: creadas, saltadas por duplicado, con advertencias.
  - Log de import con archivo fuente y mapeo aplicado.

## Alertas

**A1. Umbrales de presupuesto**

- Historia: Como usuario quiero alertas cuando una categoría cruza un umbral.
- Criterios:

  - Configuración global por defecto: 50/75/90/100%. Editable por categoría.
  - Disparo al recalcular `spent`. Una sola notificación por umbral y mes.
  - Entrega in-app: badge en Dashboard + lista en “Alerts”.

**A2. Recordatorio de facturas**

- Historia: Como usuario quiero avisos X días antes de una factura marcada como “Bill”.
- Criterios:

  - Configuración por usuario: `X` días (por defecto 3).
  - Solo para transacciones recurrentes con “Bill?” o futuras programadas.
  - Notificación muestra fecha, cuenta, importe y acción “Mark as paid” que crea/ajusta la transacción.

## Técnica y no funcional

- TZ fija: Europe/Madrid. Fechas almacenadas en UTC, mostradas en local.
- Rendimiento: listas de hasta 5.000 transacciones sin bloqueos.
- A11y: navegación por teclado en edición inline y mapeo CSV.
- Seguridad: autorización por `user_id` en todas las queries. Soft delete en transacciones.
- Auditoría mínima: `created_at`, `updated_at`, `created_by`, `updated_by`.

## Definition of Done

- Pruebas de unidad de cálculos: rollover, available-to-spend, umbrales.
- Pruebas de integración: import CSV con 3 formatos de fecha y 2 de decimal.
- Telemetría: eventos `budget_edit`, `txn_create`, `csv_import_ok`, `alert_fire`.
- Documentación breve de API y modelos. Texto en interfaz en inglés.
