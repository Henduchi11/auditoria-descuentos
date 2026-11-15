# Checklist de inspección estática: módulo de descuentos

**Proyecto:** Auditoría estática de un módulo JavaScript para una tienda digital  
**Asignatura:** Verificación y Validación de Software — Unidad 1  
**Artefacto:** `docs/checklist.md`  
**Versión:** 1.1 — instrumento de revisión alineado con la matriz consolidada  
**Fecha de elaboración:** 15 de noviembre de 2026  
**Estado:** Preparado para su aplicación; **inspección todavía no ejecutada**

## 1. Propósito

Definir preguntas objetivas para revisar, **sin ejecutar el software**, la claridad de los requisitos R-01 a R-04, las propuestas RF-01 a RF-04, el código inicial `src/descuentos.js`, la configuración del análisis estático y el proceso de inspección por pares. Este documento sirve para **detectar, describir y registrar indicios de defectos** antes de las pruebas funcionales.

El checklist se construye a partir de la consigna de la actividad universitaria y de `docs/requisitos.md`. Las reglas, cifras y criterios de aceptación de este último son **propuestas pendientes de validación**, no políticas de negocio aprobadas.

> **Alcance de la Fase A:** preparar el instrumento de inspección, no reportar resultados de ESLint, no ejecutar pruebas y no corregir el código. La aplicación formal de las preguntas y sus evidencias corresponde a las fases de revisión siguientes.

## 2. Insumos de referencia

| Clave | Insumo | Uso |
|---|---|---|
| DOC-01 | Consigna «Actividad Unidad 1 — Evaluación estática» | Alcance, fases, evidencias y criterios académicos. |
| DOC-02 | `docs/requisitos.md` | Propuestas RF-01 a RF-04, criterios CA-01.1 a CA-04.5 y decisiones P-01 a P-09. |
| COD-01 | `src/descuentos.js` (código inicial indicado por la consigna) | Inspección visual de sintaxis, condiciones, entradas, cálculo y salida. |
| HERR-01 | ESLint (por configurar en Fase B) | Reglas automatizables y evidencias de análisis inicial/final. |

**Código inicial tomado de la consigna para ubicar las referencias:**

```javascript
function calcularDescuento(precio, porcentaje, esVip) {
  var descuento = precio * porcentaje / 100;
  if (esVip == true) descuento = descuento + 10;
  if (porcentaje > 100) console.log("Descuento inválido");
  var total = precio - descuento;
  return total;
}
module.exports = { calcularDescuento };
```

La numeración `L1`–`L8` usada en este documento corresponde **solo al bloque anterior**, y deberá contrastarse con las líneas reales del archivo del repositorio cuando se cree.

## 3. Instrucciones para aplicar el checklist

1. Identificar la **versión** del artefacto revisado (archivo y, cuando exista, commit).
2. Leer cada pregunta y observar el requisito, la línea de código o la configuración indicada, **sin ejecutar pruebas funcionales**.
3. Registrar una respuesta: **Sí**, **No**, **Parcial** o **No aplica**; antes de revisar, mantener **Pendiente**. Un «No» es una señal de revisión, **no una prueba automática de defecto**.
4. Para respuestas **No** o **Parcial**, anotar una evidencia objetiva (texto, identificador o líneas) y crear un hallazgo con ID `H-01`, `H-02`, etc., **solo cuando la inspección se realice**.
5. Clasificar el origen de cada hallazgo como **Humana** o **ESLint**. Si ambos detectan un mismo problema, conservar una única ficha y registrar ambas fuentes para evitar duplicados.
6. Anotar severidad (**Alta / Media / Baja**), acción propuesta y estado (**Abierto / Pendiente de decisión / Corregido / Descartado**), indicando el fundamento de cada decisión.
7. **No cambiar una regla de negocio sin confirmación**: las decisiones P-01 a P-09 permanecen pendientes hasta su aprobación.
8. Adjuntar las evidencias de ESLint únicamente después de obtenerlas realmente en la Fase B o C (`evidencias/lint-inicial.txt` y `evidencias/lint-final.txt`).

**Leyenda:** `R` = requisito original; `RF` = requisito reformulado; `CA` = criterio de aceptación propuesto; `P` = decisión pendiente de negocio; `L` = línea del bloque de código anterior.

## 4. Preguntas de inspección — requisitos y trazabilidad

**Método:** lectura y comparación de documentos; no implica medir rendimiento ni calcular resultados ejecutando el programa.

| ID | Pregunta de revisión estática | Referencia | Criterio de revisión documental | Estado inicial |
|---|---|---|---|---|
| CHK-01 | ¿RF-01 reemplaza «rápidamente» por una métrica cuantificable y un umbral explícito? | R-01; RF-01; CA-01.2 | Se especifican tiempo máximo y proporción de operaciones que deben cumplirlo; se identifican como propuesta si no están aprobados. | Pendiente |
| CHK-02 | ¿RF-01 define o deja identificadas las condiciones de medición (entorno, carga y alcance)? | RF-01; CA-01.1 y CA-01.3; P-01 | Se documentan condiciones o su aprobación pendiente; no se afirma que ya se midió el rendimiento. | Pendiente |
| CHK-03 | ¿Se define quién es «cliente importante» y cómo se determina `esVip`? | R-02; RF-02; CA-02.4; P-02 | Se presenta una definición aprobada o una decisión explícitamente pendiente. | Pendiente |
| CHK-04 | ¿Se especifica si el beneficio VIP es fijo o porcentual y cuál sería su cuantía? | RF-02; CA-02.2; P-03 | El importe `10` observado en el código no se confunde con una regla confirmada. | Pendiente |
| CHK-05 | ¿Se aclara si el descuento VIP puede acumularse con descuentos y promociones? | RF-02; CA-02.3; P-04 | Se describe la regla o se identifica la aprobación necesaria. | Pendiente |
| CHK-06 | ¿RF-03 establece límites inequívocos para el descuento ordinario y el porcentaje admitido? | R-03; RF-03; CA-03.1 y CA-03.2 | Se identifica rango propuesto de 0 % a 100 % y tope por precio original, sin aprobarlo tácitamente. | Pendiente |
| CHK-07 | ¿Se define qué ocurre si el porcentaje ingresado es inválido o el descuento excede el precio? | RF-03; CA-03.3 y CA-03.4; P-05 y P-07 | Se establece respuesta propuesta y se separa la decisión pendiente de rechazo frente a limitación. | Pendiente |
| CHK-08 | ¿La excepción «excepto en promociones» dispone de autorización, límites y tratamiento del excedente? | R-03; RF-03; CA-03.5; P-06 | Existe una regla comprobable aprobada o queda formalmente bloqueada como decisión pendiente. | Pendiente |
| CHK-09 | ¿RF-04 especifica la fórmula para obtener el importe total a pagar? | R-04; RF-04; CA-04.1 | Fórmula identificable y consistente con RF-02 y RF-03; se distingue fórmula propuesta de regla aprobada. | Pendiente |
| CHK-10 | ¿Se separan la responsabilidad de calcular y la de mostrar resultados en la interfaz? | RF-04; CA-04.2; P-09 | Se reconoce que el módulo actual devuelve un número y que la interfaz es otra responsabilidad. | Pendiente |
| CHK-11 | ¿Se documentan precisión monetaria, redondeo, moneda e impuestos, o sus decisiones pendientes? | RF-04; CA-04.3 y CA-04.4; P-08 | No se presenta una política de redondeo o tributación sin aprobación. | Pendiente |
| CHK-12 | ¿Existe trazabilidad R-01→RF-01, R-02→RF-02, R-03→RF-03 y R-04→RF-04? | `docs/requisitos.md`, matrices | Cada requisito original está documentado en la matriz consolidada con **ID, problema, impacto, propuesta, artefacto y estado**, además de criterios vinculados. | Pendiente |

## 5. Preguntas de inspección — código JavaScript inicial

**Método:** lectura humana de `src/descuentos.js`; las referencias a reglas ESLint son **hipótesis de verificación futura**, no resultados obtenidos.

| ID | Pregunta de revisión estática | Referencia | Qué observar sin ejecutar el código | Estado inicial |
|---|---|---|---|---|
| CHK-13 | ¿Las declaraciones de variables siguen el estándar definido para el proyecto? | COD-01 L2 y L5; `no-var` | Uso de `var`; determinar si debe sustituirse por `const`/`let` sin alterar comportamiento. | Pendiente |
| CHK-14 | ¿Las comparaciones evitan coerciones de tipo no intencionales? | COD-01 L3; `eqeqeq` | Comparación `esVip == true`; revisar exigencia de comparación estricta. | Pendiente |
| CHK-15 | ¿Los bloques de control usan llaves para evitar interpretaciones o cambios accidentales? | COD-01 L3–L4; `curly` | Sentencias `if` en una sola línea sin `{}`. | Pendiente |
| CHK-16 | ¿Los parámetros y variables declarados tienen un uso justificable? | COD-01 L1–L6; `no-unused-vars` | Verificar referencias de `precio`, `porcentaje`, `esVip`, `descuento` y `total`; **no presumir infracción**. | Pendiente |
| CHK-17 | ¿Existen controles explícitos del tipo de dato de `precio` y `porcentaje`? | COD-01 L1–L5; RF-03; P-07 | Identificar validaciones o ausencia de ellas, sin probar entradas. | Pendiente |
| CHK-18 | ¿Se comprueba que el precio sea válido conforme a una regla definida? | COD-01 L1–L2; RF-03; P-07 | Revisar casos como precio negativo o no numérico y confirmar que la política sea aprobada. | Pendiente |
| CHK-19 | ¿Se contempla el límite inferior de `porcentaje` además del superior? | COD-01 L4; RF-03; CA-03.1 | Comparar condiciones existentes con el rango propuesto. | Pendiente |
| CHK-20 | ¿La detección de un porcentaje inválido interrumpe o invalida efectivamente el cálculo? | COD-01 L4–L6; RF-03; CA-03.3 | Determinar si `console.log` equivale o no a rechazar la operación, mediante lectura del flujo. | Pendiente |
| CHK-21 | ¿El descuento porcentual y el adicional VIP cumplen los topes ordinarios documentados? | COD-01 L2–L5; RF-02 y RF-03 | Buscar validación del descuento total frente al precio; reconocer reglas pendientes de aprobación. | Pendiente |
| CHK-22 | ¿La condición VIP aplica el beneficio solo bajo una condición definida y una vez por operación? | COD-01 L3; RF-02; CA-02.1–CA-02.3 | Revisar condición, suma de `10` y ausencia de duplicaciones visibles en este fragmento. | Pendiente |
| CHK-23 | ¿Se diferencia una promoción autorizada de una venta ordinaria dentro del contrato del módulo? | COD-01 L1; RF-03; P-06 | Inspeccionar parámetros y referencias a promociones; **no inventar** una regla o parámetro no presente. | Pendiente |
| CHK-24 | ¿La fórmula y el valor retornado representan el resultado definido en RF-04? | COD-01 L2, L5 y L6; RF-04 | Comparar operación algebraica con especificación, sin afirmar exactitud de casos ejecutados. | Pendiente |
| CHK-25 | ¿La gestión del redondeo y la precisión monetaria está contemplada o identificada como pendiente? | COD-01 L2–L6; RF-04; P-08 | Verificar si existen instrucciones pertinentes y si la decisión de negocio ya está aprobada. | Pendiente |
| CHK-26 | ¿Los mensajes de error y la salida se ajustan al contrato de la función? | COD-01 L4 y L6; RF-03 y RF-04 | Diferenciar impresión en consola, rechazo del cálculo y retorno de valor. | Pendiente |

## 6. Preguntas de inspección — ESLint y evidencias

**Método:** estas preguntas se responderán **cuando se configure y ejecute realmente ESLint** en las fases B y C. Su inclusión no significa que el análisis ya se haya realizado.

| ID | Pregunta de revisión estática | Referencia | Evidencia necesaria | Estado inicial |
|---|---|---|---|---|
| CHK-27 | ¿Está configurado un script `lint` reproducible y una configuración de ESLint compatible con el proyecto? | `package.json`; configuración ESLint; Fase B | Archivos de configuración y comando registrado. | Pendiente |
| CHK-28 | ¿Se documenta la finalidad de `no-var`, `eqeqeq`, `no-unused-vars` y `curly`? | Fase B; reglas ESLint | Justificación técnica específica de cada regla; no afirmar que todas arrojan errores. | Pendiente |
| CHK-29 | ¿Existe evidencia íntegra del análisis inicial antes de modificar el código? | `evidencias/lint-inicial.txt` | Salida real de ESLint, con comando, contexto y resultado conservados. | Pendiente |
| CHK-30 | ¿Existe evidencia íntegra del análisis final y se pueden comparar sus resultados con los iniciales? | `evidencias/lint-final.txt`; Fase C | Salida real posterior a correcciones aprobadas y comparación documentada. | Pendiente |

## 7. Preguntas de inspección — revisión por pares y decisiones

**Método:** aplicable en la Fase C, durante una revisión real con autor, revisor y registrador.

| ID | Pregunta de revisión estática | Referencia | Evidencia necesaria | Estado inicial |
|---|---|---|---|---|
| CHK-31 | ¿Se identificaron los roles de autor, revisor y registrador, junto con la fecha y el artefacto revisado? | Fase C | Acta o registro real con participantes y responsabilidades. | Pendiente |
| CHK-32 | ¿Se documentaron por lo menos seis hallazgos con severidad, evidencia, acción y estado? | Fase C | Fichas o tabla de hallazgos verificables; no crear hallazgos ficticios. | Pendiente |
| CHK-33 | ¿Se diferencia el origen humano o ESLint de cada hallazgo y se evita duplicar el mismo defecto? | Fase C | Campo `Origen` y referencias cruzadas cuando corresponda. | Pendiente |
| CHK-34 | ¿Las correcciones realizadas responden a reglas confirmadas y se conserva la justificación de las no realizadas? | Fase C; P-01 a P-09 | Decisión documentada, cambios de código y evidencia de revisión. | Pendiente |

## 8. Plantilla de registro de aplicación del checklist

**No completar con resultados supuestos.** Crear una fila por pregunta cuando se lleve a cabo la revisión; el siguiente formato solo contiene campos vacíos de ejemplo.

| Fecha | Revisor | Versión/commit | ID checklist | Respuesta (Sí/No/Parcial/N/A) | Evidencia objetiva | Hallazgo vinculado | Observaciones |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — |

**Criterios para interpretar respuestas:**

- **Sí:** el punto está documentado u observable según el criterio de la pregunta.
- **No:** el punto no se identifica en el artefacto revisado; requiere análisis y posible hallazgo.
- **Parcial:** el punto se cumple de forma incompleta o depende de una decisión explícitamente pendiente.
- **No aplica:** está fuera del alcance comprobado; se debe justificar.
- **Pendiente:** todavía no se ha llevado a cabo la comprobación. **Es el estado inicial de todas las preguntas.**

### Plantilla de hallazgos para la Fase C (sin registros ficticios)

| ID hallazgo | ID checklist | Origen (Humana/ESLint) | Severidad | Evidencia verificable | Riesgo/impacto | Acción acordada | Estado | Responsable |
|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | — |

**Notas de control:**

- La severidad se asignará según el riesgo documentado: **Alta** (potencial cobro incorrecto o incumplimiento crítico), **Media** (mantenibilidad, validaciones o claridad importantes), **Baja** (estilo o documentación de impacto menor). Son criterios orientativos, no valoraciones ya efectuadas.
- Un incumplimiento de estilo reportado por ESLint **no prueba por sí solo** un fallo de cálculo.
- Un defecto lógico o una ambigüedad de negocio pueden requerir **inspección humana**, incluso cuando ESLint no emita advertencias.
- Si no existe confirmación del negocio, registrar **Pendiente de decisión**, no corregir por intuición.

## 9. Trazabilidad resumida del checklist

| Grupo de preguntas | Cobertura principal | Fase de aplicación |
|---|---|---|
| CHK-01 a CHK-02 | R-01 / RF-01 — rendimiento y verificabilidad | A (documentación) |
| CHK-03 a CHK-05 | R-02 / RF-02 — elegibilidad y beneficio VIP | A (documentación) |
| CHK-06 a CHK-08 | R-03 / RF-03 — límites y promociones | A (documentación) |
| CHK-09 a CHK-11 | R-04 / RF-04 — cálculo y presentación | A (documentación) |
| CHK-12 | Trazabilidad integral de los cuatro requisitos | A (documentación) |
| CHK-13 a CHK-26 | Código inicial y correspondencia con requisitos | A/C (inspección humana) |
| CHK-27 a CHK-30 | Reglas ESLint, configuración y evidencias antes/después | B/C |
| CHK-31 a CHK-34 | Roles, hallazgos y decisiones de inspección por pares | C |

## 10. Criterios de cierre y límites de este artefacto

**Elaboración del checklist (Fase A):**

- [x] Documento en formato Markdown con ubicación `docs/checklist.md`.
- [x] Al menos ocho preguntas de inspección (se incluyen **34 preguntas identificadas**).
- [x] Preguntas vinculadas a los cuatro requisitos originales, sus propuestas y el código base.
- [x] Criterios de revisión, referencias y mecanismo para registrar resultados posteriores.
- [x] Separación explícita entre revisión humana, ESLint y decisiones de negocio.
- [ ] Aplicación del checklist y registro de respuestas reales.
- [ ] Ejecución y conservación de análisis ESLint inicial/final.
- [ ] Inspección por pares y formalización de hallazgos reales.

**Limitación:** el checklist organiza lo que debe inspeccionarse, pero **no demuestra la ausencia de defectos**. Tampoco verifica el rendimiento real ni sustituye las pruebas dinámicas posteriores, que quedan fuera de esta actividad de evaluación estática.

## 11. Referencias

1. **Documento de la tarea:** «Actividad Unidad 1 — Evaluación estática: Auditoría estática de un módulo JavaScript: requisitos, inspección por pares y detección temprana de defectos» (material suministrado por la universidad).
2. **Documento interno:** `docs/requisitos.md`, versión 1.1 (matriz consolidada; propuesta pendiente de validación).
3. **Código inicial:** `src/descuentos.js`, transcrito de la consigna; pendiente de incorporación y versionado en el repositorio.

---

**Nota final:** todas las preguntas están deliberadamente en estado **Pendiente**. No se han simulado ejecuciones, resultados de ESLint, inspecciones por pares ni aprobaciones de negocio.
