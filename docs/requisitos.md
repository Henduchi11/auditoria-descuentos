# Revisión y especificación preliminar de requisitos

**Proyecto:** Auditoría estática de un módulo de descuentos para una tienda digital  
**Asignatura:** Verificación y Validación de Software — Unidad 1  
**Artefacto:** `docs/requisitos.md`  
**Versión:** 1.1 (matriz consolidada; propuesta pendiente de validación)  
**Fecha:** 15 de noviembre de 2026  
**Estado general:** Pendiente de validación por el responsable del negocio

## 1. Objetivo y alcance

Identificar las ambigüedades, omisiones y riesgos de los requisitos originales del módulo de descuentos; formular los requisitos **RF-01 a RF-04** de manera verificable y mantener trazabilidad entre cada necesidad original, la propuesta de mejora y el código sujeto a inspección estática (`src/descuentos.js`).

La revisión se efectúa **sin ejecutar pruebas funcionales**. Los criterios de aceptación descritos aquí permitirán definir verificaciones posteriores, pero **no constituyen resultados de pruebas**. Ninguna cifra o regla propuesta se considerará aprobada hasta recibir confirmación del responsable del negocio.

> **Convención de identificación:** Por la consigna de la actividad se emplean los identificadores `RF-01` a `RF-04`. No obstante, **RF-01 describe principalmente un atributo no funcional de rendimiento**; en un proyecto real normalmente se clasificaría como `RNF`. Se conserva `RF-01` para respetar la nomenclatura solicitada.

## 2. Requisitos originales

| ID | Texto original |
|---|---|
| R-01 | «El descuento debe calcularse rápidamente». |
| R-02 | «Los clientes importantes obtendrán un descuento especial». |
| R-03 | «El descuento no puede superar el precio, excepto en promociones». |
| R-04 | «Se debe mostrar el resultado correcto». |

**Referencia del escenario:** en el código inicial se define `calcularDescuento(precio, porcentaje, esVip)`, se calcula un descuento porcentual, se suma `10` cuando `esVip` es verdadero y se devuelve `total`. Esto es **evidencia de implementación**, no prueba de que las reglas de negocio sean correctas o estén aprobadas.

## 3. Diagnóstico y reformulación

### 3.1. R-01 → RF-01. Tiempo de cálculo

**Problema.** «Rápidamente» no indica tiempo máximo, carga, entorno de evaluación ni criterio de cumplimiento.  
**Impacto.** Impide determinar objetivamente si el desempeño es aceptable y puede generar discrepancias entre desarrollo y negocio.

**RF-01 (propuesta verificable; no aprobada).**  
> El módulo deberá completar el cálculo de un descuento con entradas válidas en **10 milisegundos o menos para al menos el 95 % de 10 000 operaciones**, medido en un entorno técnico definido y sin incluir tiempos de red ni renderizado de interfaz.

**Criterios de aceptación propuestos:**

- **CA-01.1:** El método de medición, el equipo y el entorno deben quedar documentados antes de evaluar el desempeño.
- **CA-01.2:** En 10 000 operaciones de cálculo con datos válidos, al menos 9 500 deberán finalizar en un máximo de 10 ms cada una.
- **CA-01.3:** La medición deberá distinguir el tiempo de la función del tiempo de interfaz o de red.

**Supuestos por confirmar:** los umbrales de 10 ms, 95 % y 10 000 operaciones son **referencias propuestas**, no exigencias contractuales; confirmar infraestructura, carga y alcance de la medición.

**Verificabilidad:** cuantitativa mediante medición de rendimiento posterior a la revisión estática. **No se realiza en la Fase A**.  
**Estado:** Propuesto — pendiente de confirmación.

### 3.2. R-02 → RF-02. Beneficio para clientes VIP

**Problema.** «Clientes importantes» no define una categoría formal ni la naturaleza, el valor y la acumulación del beneficio.  
**Impacto.** Puede originar descuentos indebidos, trato inconsistente y diferencias económicas en las operaciones.

**RF-02 (propuesta verificable; no aprobada).**  
> Cuando el parámetro `esVip` tenga el valor booleano `true`, el módulo deberá sumar **una única vez** un beneficio fijo de **10 unidades monetarias** al descuento porcentual. Cuando `esVip` sea `false`, no se aplicará el beneficio adicional. El descuento total deberá respetar las restricciones de RF-03.

**Criterios de aceptación propuestos:**

- **CA-02.1:** Si `esVip = false`, el descuento adicional VIP deberá ser 0.
- **CA-02.2:** Si `esVip = true`, se añadirá una sola vez el importe VIP autorizado; provisionalmente se proponen 10 unidades monetarias.
- **CA-02.3:** El beneficio VIP no podrá provocar que el descuento total exceda el máximo admitido por RF-03 en una operación ordinaria.
- **CA-02.4:** La definición y asignación de la categoría VIP deberán estar documentadas por el negocio, aun cuando la función solo reciba un indicador booleano.

**Ejemplo ilustrativo, no validado:** para un precio de 100, descuento general de 20 % y beneficio VIP fijo de 10, el descuento total sería 30 y el saldo, 70, **si ambas reglas fueran aprobadas**.

**Supuestos por confirmar:** significado de «cliente importante»; responsable de asignar el estado VIP; importe (`10` proviene del código base, pero **no está aprobado**); si el beneficio es fijo o porcentual; moneda; acumulación con otras promociones; naturaleza exacta de `esVip`.

**Verificabilidad:** reglas de decisión explícitas para un cliente VIP y uno no VIP, sujetas a los límites de RF-03.  
**Estado:** Propuesto — pendiente de confirmación.

### 3.3. R-03 → RF-03. Límites y excepciones de descuentos

**Problema.** La excepción «excepto en promociones» no define qué es una promoción autorizada, qué límites se permiten ni cómo proceder cuando se excede el precio.  
**Impacto.** Riesgo de descuentos superiores al importe de venta, totales negativos, cobros inconsistentes y pérdidas económicas.

**RF-03 (regla ordinaria propuesta; excepción promocional pendiente).**  
> En operaciones **sin una promoción autorizada**, el porcentaje de descuento deberá estar comprendido entre **0 % y 100 %**, inclusive, y el **descuento total** (porcentual más beneficio VIP) no podrá superar el precio original. Cuando el porcentaje esté fuera de ese rango, la operación deberá ser rechazada con una indicación de entrada inválida, sin devolver un total como si el cálculo fuera válido. Las excepciones promocionales se especificarán únicamente después de su aprobación.

**Criterios de aceptación propuestos:**

- **CA-03.1:** Un porcentaje entre 0 y 100, inclusive, es admisible para una operación ordinaria; cualquier porcentaje fuera de ese rango será inválido.
- **CA-03.2:** El descuento acumulado en una operación ordinaria no podrá ser superior al precio original.
- **CA-03.3:** Si el porcentaje es inválido, no se deberá presentar un total como resultado válido.
- **CA-03.4:** Si el descuento acumulado supera el precio, se impedirá confirmar la operación; **la estrategia definitiva (rechazar o limitar el descuento) debe aprobarla el negocio**.
- **CA-03.5:** No se implementarán excepciones promocionales sin definir condiciones de activación, topes y forma de representar cualquier excedente.

**Supuestos por confirmar:** comportamiento frente a descuento acumulado excesivo (rechazo o tope); existencia de promociones que pueden superar el precio; reglas de autorización; interpretación del excedente; datos de entrada aceptados y tratamiento de precios negativos o no numéricos. La firma actual de `calcularDescuento(precio, porcentaje, esVip)` **no dispone de un parámetro explícito para identificar promociones**.

**Verificabilidad:** límites y rechazos observables una vez definidas las políticas pendientes.  
**Estado:** Parcialmente especificado — excepción promocional pendiente de confirmación.

### 3.4. R-04 → RF-04. Exactitud y presentación del resultado

**Problema.** «Resultado correcto» no define la fórmula, la precisión monetaria, los datos a presentar ni quién se encarga de mostrarlos.  
**Impacto.** Inconsistencias de cálculo, errores de redondeo y resultados poco claros para el cliente.

**RF-04 (propuesta verificable; no aprobada).**  
> Para una operación válida, el módulo deberá calcular el importe a pagar como **precio original menos descuento porcentual menos beneficio VIP aplicable**, respetando RF-03. La capa de presentación de la tienda deberá mostrar **precio original, descuento total y total a pagar**, con moneda y **dos decimales**. La política de redondeo deberá ser aprobada antes de implementarse.

**Fórmulas propuestas:**

```text
Descuento porcentual = precio × (porcentaje / 100)
Descuento total       = descuento porcentual + beneficio VIP aplicable
Total a pagar         = precio − descuento total
```

**Criterios de aceptación propuestos:**

- **CA-04.1:** El total calculado corresponderá al precio original menos los descuentos válidamente aplicados.
- **CA-04.2:** Se mostrarán precio original, descuento total y total a pagar en la interfaz correspondiente.
- **CA-04.3:** Los importes presentados deberán incluir la moneda y dos cifras decimales.
- **CA-04.4:** El método de redondeo y el momento de aplicarlo deberán definirse previamente para evitar divergencias.
- **CA-04.5:** No se mostrará un total como válido si la operación incumple RF-03.

**Supuestos por confirmar:** moneda; método y momento del redondeo; aplicación de impuestos; alcance del módulo; responsabilidad de visualización; formato regional. La función original **devuelve un número, pero no implementa una interfaz de usuario**. Por ello, el cálculo corresponde al módulo y la visualización a la capa de interfaz o requisito asociado.

**Verificabilidad:** fórmula documentada y campos de salida verificables posteriormente; requiere definición de reglas de precisión.  
**Estado:** Propuesto — pendiente de confirmación.

## 4. Matriz consolidada de requisitos (Fase A)

La siguiente matriz utiliza **exactamente los seis campos solicitados en la consigna: ID, problema, impacto, propuesta, artefacto y estado**. El campo *estado* corresponde al grado de definición y aprobación del requisito, **no** al resultado de una prueba ni a un hallazgo de ESLint.

| ID | Problema | Impacto | Propuesta | Artefacto | Estado |
|---|---|---|---|---|---|
| R-01 | «Rápidamente» no especifica umbral, carga ni entorno de medición. | No es posible evaluar objetivamente el rendimiento requerido. | **RF-01:** medir el cálculo con umbral, porcentaje de cumplimiento y condiciones documentadas; cifras propuestas sujetas a P-01. | `docs/requisitos.md` (RF-01; CA-01.1 a CA-01.3); `docs/checklist.md` (CHK-01, CHK-02). | **Propuesto; pendiente de confirmación** (P-01). |
| R-02 | «Clientes importantes» carece de definición y el beneficio no tiene importe ni mecanismo aprobados. | Riesgo de descuentos inconsistentes y pérdidas por beneficios indebidos. | **RF-02:** formalizar `esVip` y un beneficio adicional único; el valor fijo de 10 es una hipótesis basada en el código, no una regla aprobada. | `docs/requisitos.md` (RF-02; CA-02.1 a CA-02.4); `docs/checklist.md` (CHK-03 a CHK-05). | **Propuesto; pendiente de confirmación** (P-02 a P-04). |
| R-03 | «Excepto en promociones» no define aprobación, límites ni tratamiento del descuento que supera el precio. | Riesgo de totales negativos, descuentos excesivos y cobros incorrectos. | **RF-03:** proponer límites ordinarios y rechazo de porcentajes inválidos; dejar la excepción promocional y el tratamiento del exceso sujetos a decisión. | `docs/requisitos.md` (RF-03; CA-03.1 a CA-03.5); `docs/checklist.md` (CHK-06 a CHK-08). | **Parcialmente especificado; pendiente de confirmación** (P-05 a P-07). |
| R-04 | «Resultado correcto» no establece fórmula, precisión ni responsabilidad de visualización. | Riesgo de errores monetarios, redondeos inconsistentes y presentación confusa. | **RF-04:** documentar fórmula, importes a mostrar y separación entre cálculo e interfaz; redondeo e impuestos quedan pendientes. | `docs/requisitos.md` (RF-04; CA-04.1 a CA-04.5); `docs/checklist.md` (CHK-09 a CHK-11). | **Propuesto; pendiente de confirmación** (P-08 y P-09). |

**Cobertura transversal:** CHK-12 comprueba la trazabilidad entre los cuatro requisitos originales y reformulados. Las preguntas CHK-13 a CHK-34 quedan preparadas para las inspecciones de código, ESLint y revisión por pares de las fases posteriores.

## 5. Matriz de trazabilidad preliminar

| Origen | Requisito propuesto | Criterios de aceptación | Elemento del código inicial relacionado | Decisión pendiente |
|---|---|---|---|---|
| R-01 | RF-01 | CA-01.1 a CA-01.3 | Función `calcularDescuento(...)`; no existen métricas de rendimiento en el código. | Acordar objetivo de tiempo y entorno. |
| R-02 | RF-02 | CA-02.1 a CA-02.4 | `esVip`, condición `esVip == true` y suma de `10`. | Definir VIP, beneficio y acumulación. |
| R-03 | RF-03 | CA-03.1 a CA-03.5 | `if (porcentaje > 100) console.log(...)` y cálculo posterior de `total`. | Confirmar rechazos, topes y excepción promocional. |
| R-04 | RF-04 | CA-04.1 a CA-04.5 | `var total = precio - descuento; return total;`; no hay interfaz en este archivo. | Definir precisión, moneda, impuestos y visualización. |

**Interpretación:** esta tabla demuestra cobertura documental de los cuatro requisitos originales. **No acredita** que el código actual cumpla los requisitos propuestos ni que se hayan ejecutado pruebas.

## 6. Registro de decisiones y supuestos pendientes

| Clave | Tema | Decisión requerida del negocio | Estado |
|---|---|---|---|
| P-01 | Rendimiento | Confirmar 10 ms, 95 %, 10 000 operaciones y entorno de medición. | Pendiente |
| P-02 | Categoría VIP | Precisar quién es VIP y quién establece la categoría. | Pendiente |
| P-03 | Beneficio VIP | Confirmar si es fijo o porcentual, el importe y la moneda. | Pendiente |
| P-04 | Acumulación | Definir si el beneficio VIP se combina con otras promociones. | Pendiente |
| P-05 | Límites | Definir si un exceso de descuento acumulado se rechaza o se ajusta al precio. | Pendiente |
| P-06 | Promociones | Definir autorización, elegibilidad, máximos y tratamiento del excedente. | Pendiente |
| P-07 | Entradas inválidas | Establecer validación de `precio`, `porcentaje` y `esVip`, incluidos valores no numéricos. | Pendiente |
| P-08 | Cálculo monetario | Definir moneda, redondeo y tratamiento de impuestos. | Pendiente |
| P-09 | Presentación | Confirmar qué componente muestra el resultado y qué campos requiere. | Pendiente |

**Regla de control de cambios:** ningún supuesto pendiente debe convertirse en una regla implementada solo porque aparece como propuesta en este documento. Las correcciones del código se limitarán a reglas confirmadas y a mejoras técnicas justificadas que no alteren el comportamiento de negocio sin aprobación.

## 7. Observaciones de revisión estática preliminar

A partir de la lectura del código base proporcionado en la actividad, **sin ejecutarlo**, se observan los siguientes puntos que deben examinarse con el checklist y con ESLint en las fases siguientes:

1. Se declara `var` en lugar de las formas modernas `let` o `const`.
2. Se usa comparación no estricta en `esVip == true`.
3. Las instrucciones condicionales no emplean llaves `{}`.
4. Para porcentajes mayores a 100, se emite un mensaje mediante `console.log`, pero no se aprecia interrupción del cálculo.
5. No se observa una comprobación que impida que el descuento total supere el precio.
6. No se observan validaciones explícitas para precios negativos, datos no numéricos o el límite inferior del porcentaje.
7. La función devuelve un total, sin presentar por sí misma los importes en una interfaz.

Estas son **observaciones preliminares**, no defectos confirmados mediante ejecución ni resultados de ESLint. Deberán clasificarse como hallazgos de herramienta o de revisión humana cuando corresponda, sin duplicarlos arbitrariamente.

## 8. Criterios de cierre documental de la Fase A

- [x] Transcripción fiel de los cuatro requisitos originales R-01 a R-04.
- [x] Identificación de ambigüedades e impactos.
- [x] Formulación de RF-01 a RF-04 con criterios de aceptación propuestos.
- [x] Matriz de problemas y trazabilidad documental.
- [x] Registro explícito de supuestos de negocio pendientes.
- [ ] Aprobación formal de reglas y valores por parte del negocio.
- [x] Elaboración de `docs/checklist.md` con **34 preguntas identificadas**, vinculadas a requisitos, código y fases de revisión.

## 9. Referencia documental

- **Consigna oficial:** *Actividad Unidad 1 — Evaluación estática: Auditoría estática de un módulo JavaScript: requisitos, inspección por pares y detección temprana de defectos* (documento suministrado para la actividad).
- **Código inicial:** `src/descuentos.js`, conforme al ejemplo incluido en la consigna.

---

**Resultado del cierre de Fase A (documental):** se han creado y contrastado `docs/requisitos.md` y `docs/checklist.md`, con más de ocho preguntas y la matriz obligatoria de seis campos. **Fase A completa en cuanto a preparación de artefactos**; la aprobación de los supuestos de negocio P-01 a P-09 sigue pendiente y no se considera un requisito de finalización documental de esta actividad. La aplicación formal del checklist, la ejecución de ESLint y la inspección por pares corresponden a las fases siguientes.

**Nota de trazabilidad:** esta especificación es un artefacto de revisión estática y no reemplaza la confirmación de los requisitos por el responsable del negocio.
