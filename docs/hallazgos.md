# Registro preliminar de hallazgos — Fase C, paso 1

**Proyecto:** Auditoría estática de un módulo JavaScript para una tienda digital  
**Asignatura:** Verificación y Validación de Software — Unidad 1  
**Artefacto:** `docs/hallazgos.md`  
**Fecha:** 15 de noviembre de 2026  
**Versión del documento:** 1.0 — preparación para inspección por pares  
**Código inspeccionado:** `src/descuentos.js`, versión original de la consigna, sin cambios  
**Evidencia automática:** `evidencias/lint-inicial.txt` (resultado real mostrado en VS Code: 5 errores y 0 advertencias)  
**Evidencia documental:** `docs/requisitos.md` y `docs/checklist.md`, versión 1.1

> **Alcance y estado:** Esta tabla es un **análisis preliminar del código** basado en la salida real de ESLint y lectura estática. **No constituye un acta de inspección por pares realizada**. No se han ejecutado pruebas funcionales ni se ha corregido el código. La severidad es una valoración técnica inicial; las reglas de negocio siguen pendientes de confirmación.

## 1. Código base sin modificaciones

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

**Nota sobre líneas:** El bloque anterior está transcrito sin líneas vacías. La instalación local presentó los cinco errores en las **líneas reales 3, 4, 4, 5 y 6** de `src/descuentos.js`; esas son las posiciones que prevalecen al citar `lint-inicial.txt`. Si se inserta o elimina una línea en el archivo, actualizar la localización de la evidencia antes de la revisión.

## 2. Lectura estática, instrucción por instrucción

| Fragmento | Lectura del comportamiento declarado | Observación relevante |
|---|---|---|
| `function calcularDescuento(precio, porcentaje, esVip)` | Declara una función con tres parámetros. | No valida el dominio ni los tipos de las entradas; no recibe un indicador explícito de promoción. |
| `var descuento = precio * porcentaje / 100;` | Calcula descuento porcentual. | ESLint reporta `no-var`; tampoco hay validación previa ni política monetaria explícita. |
| `if (esVip == true) descuento = descuento + 10;` | Suma 10 unidades cuando se cumple la condición. | ESLint reporta `eqeqeq` y `curly`; el importe VIP aún no está aprobado como regla de negocio. |
| `if (porcentaje > 100) console.log("Descuento inválido");` | Emite un mensaje de consola si el porcentaje supera 100. | ESLint reporta `curly`; imprimir un aviso **no detiene** el cálculo ni invalida el retorno. No revisa el límite inferior. |
| `var total = precio - descuento;` | Resta el descuento al precio. | ESLint reporta `no-var`; no existe control visible del descuento acumulado frente al precio. |
| `return total;` | Devuelve un único valor. | No diferencia un cálculo inválido de uno válido ni incluye desglose de importes para la presentación. |
| `module.exports = { calcularDescuento };` | Exporta la función mediante CommonJS. | No se identifica por sí mismo un defecto en esta línea. |

## 3. Criterios de severidad y estado

- **Alta:** puede afectar directamente importes, rechazos de entradas o cumplimiento de restricciones de descuentos, **si se confirma** la política aplicable.
- **Media:** amenaza la claridad del contrato, la precisión o la mantenibilidad, sin fallo económico necesariamente demostrado.
- **Baja:** incumplimiento de convención de estilo con impacto principalmente preventivo.
- **Confirmado por ESLint:** infracción observada en el reporte real; no implica error funcional.
- **Observación estática:** condición visible o ausencia de control en el código; la valoración como defecto de negocio está pendiente de aprobación.
- **Pendiente de decisión:** requiere confirmación de RF-01 a RF-04 o de las decisiones P-01 a P-09.

## 4. Matriz de hallazgos — análisis inicial

| ID | Origen | Severidad preliminar | Evidencia objetiva | Riesgo / impacto | Acción propuesta (sin ejecutar) | Estado | Trazabilidad |
|---|---|---|---|---|---|---|---|
| **ESL-01** | ESLint | Baja | L3:3, `var descuento`; regla `no-var`. | Menor legibilidad del ámbito y actualización de variables. | Evaluar reemplazo por `let`, ya que `descuento` se reasigna en la rama VIP. | **Confirmado por ESLint; sin corregir** | CHK-13 |
| **ESL-02** | ESLint | Media | L4:13, `esVip == true`; regla `eqeqeq`. | Conversión de tipos no intencionada; condición VIP poco explícita. | Confirmar que `esVip` debe ser booleano y, después, usar comparación estricta. | **Confirmado por ESLint; cambio sujeto a contrato** | CHK-14; RF-02; P-07 |
| **ESL-03** | ESLint | Baja | L4:22, `if` de VIP sin llaves; regla `curly`. | Mayor posibilidad de errores al ampliar la condición. | Añadir `{}` sin alterar la instrucción que ya controla el `if`. | **Confirmado por ESLint; sin corregir** | CHK-15 |
| **ESL-04** | ESLint | Baja | L5:25, `if` de porcentaje sin llaves; regla `curly`. | Menor claridad ante cambios futuros. | Añadir `{}` sin modificar la condición ni el tratamiento del error. | **Confirmado por ESLint; sin corregir** | CHK-15 |
| **ESL-05** | ESLint | Baja | L6:3, `var total`; regla `no-var`. | Convención de declaración mejorable. | Evaluar reemplazo por `const`, pues `total` no se reasigna en el fragmento. | **Confirmado por ESLint; sin corregir** | CHK-13 |
| **HUM-01** | Revisión estática humana preliminar | Alta | L5 avisa con `console.log` cuando `porcentaje > 100`, pero las líneas siguientes calculan y retornan `total`. | Puede entregarse un total derivado de un porcentaje considerado inválido. | Solicitar aprobación sobre rechazo/retorno de error; definir el contrato de entradas inválidas. | **Observado; pendiente de decisión** | CHK-20 y CHK-26; RF-03; P-07 |
| **HUM-02** | Revisión estática humana preliminar | Media | No se ve validación del límite inferior de `porcentaje`, del signo de `precio` ni de tipos de entrada. | Entradas no válidas podrían llegar a operaciones aritméticas sin control. | Confirmar dominio y tipos admitidos; después diseñar validaciones. | **Observado; pendiente de decisión** | CHK-17 a CHK-19; RF-03; P-07 |
| **HUM-03** | Revisión estática humana preliminar | Alta | L4 puede incrementar `descuento`; L6 calcula `precio - descuento` sin límite del descuento acumulado. | Un descuento acumulado superior al precio puede producir un total negativo. | Consultar si se debe rechazar o limitar el exceso; definir excepción promocional antes de cambiar lógica. | **Observado; pendiente de decisión** | CHK-21; RF-02 y RF-03; P-05 |
| **HUM-04** | Revisión estática humana preliminar | Media | L4 agrega el literal `10` al descuento cuando se evalúa `esVip`. | El importe y la elegibilidad VIP podrían no corresponder a una política aprobada. | Confirmar categoría VIP, cuantía y acumulación; no cambiar `10` por otro valor sin aprobación. | **Observado; pendiente de decisión** | CHK-22; RF-02; P-02 a P-04 |
| **HUM-05** | Revisión estática humana preliminar | Media | La firma de la función solo recibe `precio`, `porcentaje`, `esVip`; no hay control de promoción visible. | No se distingue una excepción promocional autorizada de una operación normal. | Definir primero cómo se autoriza y representa una promoción. | **Observado; pendiente de decisión** | CHK-23; RF-03; P-06 |
| **HUM-06** | Revisión estática humana preliminar | Media | El código realiza operaciones numéricas y devuelve `total` sin método explícito de redondeo monetario. | Riesgo de inconsistencias de precisión si el total se presenta o liquida como dinero. | Confirmar moneda, redondeo, impuestos y capa responsable. | **Observado; pendiente de decisión** | CHK-25; RF-04; P-08 |
| **HUM-07** | Revisión estática humana preliminar | Media | `return total` devuelve solamente un número; el archivo no incluye lógica de interfaz. | R-04 requiere «mostrar» resultado, pero no consta qué componente tiene esa responsabilidad. | Aclarar alcance de la función frente a la interfaz y el desglose requerido; no adjudicarle automáticamente una falla de UI a esta función. | **Observado; pendiente de alcance** | CHK-24 y CHK-26; RF-04; P-09 |

**Recuento de esta matriz:** 12 registros = **5 incumplimientos efectivamente reportados por ESLint** + **7 observaciones de lectura humana preliminar**. El recuento no representa todavía 12 hallazgos validados por un equipo de pares.

**Regla `no-unused-vars`:** estuvo configurada y **no produjo ningún hallazgo** en el reporte inicial. No se añade una fila ficticia por esa regla.

**Solapamientos controlados:** `ESL-04` evalúa exclusivamente llaves del `if`, mientras que `HUM-01` observa la falta de rechazo; `ESL-02` evalúa la comparación, mientras que `HUM-04` observa la política del beneficio. Son cuestiones diferentes, no el mismo defecto contado dos veces.

## 5. Plan de revisión real por pares — pendiente de ejecución

| Rol exigido | Función en la inspección | Participante real | Estado |
|---|---|---|---|
| Autor | Explicar la intención del módulo y aclarar decisiones de implementación. | Por asignar | No realizada |
| Revisor | Examinar evidencia y checklist; confirmar, matizar o descartar registros. | Por asignar | No realizada |
| Registrador | Documentar acuerdos, severidades finales, acciones y responsables. | Por asignar | No realizada |

Para cerrar formalmente la inspección por pares se deberá indicar la **fecha real**, **participantes**, **artefacto/versión revisado**, **al menos seis hallazgos aceptados**, y las **decisiones resultantes**; guardar evidencia de revisión o acta equivalente. No completar estos datos por suposición.

## 6. Decisiones antes de cualquier cambio de código

1. **Posibles correcciones técnicas de estilo:** `ESL-01`, `ESL-03`, `ESL-04`, `ESL-05`, sujetas a revisión; `ESL-02` requiere especialmente confirmar el tipo booleano de `esVip` para no alterar silenciosamente el comportamiento.
2. **Cambios funcionales bloqueados por negocio:** `HUM-01` a `HUM-07` deben contrastarse con los requisitos propuestos y sus decisiones pendientes. No asumir que RF-01 a RF-04 ya están aprobados.
3. **Próxima evidencia:** después de la revisión real y las correcciones autorizadas, ejecutar ESLint y guardar `evidencias/lint-final.txt`. Conservar íntegramente `lint-inicial.txt` y un historial Git que distinga cambios.

## 7. Fuentes y trazabilidad

- Consigna universitaria: *Actividad Unidad 1 — Evaluación estática*.
- Código original: `src/descuentos.js`, sin cambios.
- Salida real de ESLint: `evidencias/lint-inicial.txt`, cinco errores, cero advertencias (captura proporcionada por el estudiante).
- Matriz de requisitos y decisiones: `docs/requisitos.md` (v1.1).
- Preguntas de auditoría: `docs/checklist.md` (v1.1; CHK-13 a CHK-26, CHK-31 a CHK-34).

**Estado final del paso 1:** análisis preliminar documentado; **inspección por pares, decisiones y correcciones pendientes**.
