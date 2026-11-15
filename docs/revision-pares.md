# Acta de inspección por pares — Fase C, paso 2

**Proyecto:** Auditoría estática de un módulo JavaScript para una tienda digital  
**Asignatura:** Verificación y Validación de Software — Unidad 1  
**Artefacto:** `docs/revision-pares.md`  
**Versión del documento:** 1.2 — constancia de conformidad informada respecto de dos comentarios técnicos  
**Estado del acta:** **EN PROCESO. EL ESTUDIANTE REPORTÓ CONFORMIDAD DE LUIS CON DOS COMENTARIOS TÉCNICOS; LA INSPECCIÓN COMPLETA Y SUS EVIDENCIAS SIGUEN PENDIENTES**  
**Código objeto de revisión:** `src/descuentos.js`, versión original de la consigna, sin modificaciones.  
**Evidencia disponible:** `evidencias/lint-inicial.txt` (5 errores, 0 advertencias, según evidencia compartida en VS Code).  
**Documentos de consulta:** `docs/requisitos.md` (v1.1), `docs/checklist.md` (v1.1), `docs/hallazgos.md` (v1.0).

> **Nota de integridad académica:** La clasificación técnica de este documento fue preparada a partir del código original, la documentación de requisitos y la salida de ESLint. **No acredita una reunión presencial, una revisión integral de los 12 hallazgos ni una ejecución de pruebas funcionales.** El estudiante informó el 15/11/2026 que Luis dio su conformidad a dos comentarios técnicos preparados para su revisión; esta conformidad no se ha verificado directamente ni se ha adjuntado evidencia independiente. Los campos restantes deben completarse con hechos verificables.

## 1. Finalidad y alcance

Preparar una revisión por pares que distinga los incumplimientos automáticos de ESLint de observaciones humanas de lógica y requisitos, asigne severidad y acción propuesta y determine qué cambios pueden considerarse sin inventar reglas de negocio. Se registran **12 entradas preliminares**: cinco errores reportados por ESLint y siete observaciones de lectura estática. Para cerrar la actividad deberá realizarse una inspección por pares real y registrar al menos seis hallazgos con severidad, evidencia, acción y estado.

**Fuera de alcance en este paso:** ejecutar pruebas funcionales, modificar `src/descuentos.js`, generar `lint-final.txt` o afirmar que las reglas propuestas RF-01–RF-04 fueron aprobadas. Los dos textos aceptados por Luis según el estudiante se registran como propuestas avaladas indirectamente, no como citas textuales independientes de Luis.

## 2. Roles y datos de la revisión — avances reportados y pendientes

| Campo | Registro por completar durante la inspección |
|---|---|
| Fecha y hora efectivas | Pendiente |
| Medio / lugar de revisión | Pendiente |
| Identificador del commit o versión revisada | Pendiente |
| Persona que actúa como **autor** / expositor del código | Estudiante responsable de este trabajo (nombre completo pendiente) |
| Persona que actúa como **revisor** | Luis (hermano del estudiante, mismo ciclo universitario); el estudiante informa que aceptó dos comentarios técnicos; sin comprobante adjunto |
| Persona que actúa como **registrador** | Estudiante responsable de este trabajo, con doble rol autor/registrador |
| Evidencia de participación (PR, comentarios o acta acordada) | Confirmación comunicada por el estudiante el 15/11/2026; pendiente de captura, mensaje o confirmación escrita directa |
| Decisión final sobre cada hallazgo | Los comentarios propuestos sobre ESL-02 y HUM-03 cuentan con conformidad informada; no equivale a aprobación de correcciones ni de la matriz completa |
| Resultado de la inspección (aprobación, correcciones solicitadas, nueva revisión) | Pendiente |

**Funciones de los roles:** el autor/presentador explica el módulo y sus decisiones conocidas; el revisor (Luis, si acepta y realiza la revisión) contrasta código, reglas y requisitos y cuestiona los riesgos; el registrador documenta observaciones, acuerdos, desacuerdos, responsables y decisiones. **El estudiante puede actuar como autor/presentador y registrador a la vez**; esto cubre tres funciones mediante dos personas, sin inventar un tercer participante. Como el código base lo suministró la cátedra, no atribuirse su autoría original.

### Cómo cerrar esta revisión con Luis (tareas aún pendientes)

1. Mostrarle a Luis el archivo `src/descuentos.js`, la evidencia `evidencias/lint-inicial.txt` y la tabla de 12 observaciones.
2. Conservar una confirmación real de Luis sobre los dos comentarios ya aceptados según el estudiante y pedirle que examine los demás hallazgos y las cuatro correcciones de estilo propuestas.
3. Registrar **sus propias palabras**, fecha y decisiones cuando estén disponibles; los textos sugeridos y aceptados indirectamente no deben presentarse como citas literales redactadas por Luis.
4. Si están de acuerdo, dejar constancia de la revisión en el acta, con nombre completo y aceptación real de Luis (por ejemplo, una confirmación escrita que se pueda conservar).
5. Tras confirmar los cambios técnicos, aplicarlos y obtener la evidencia final de ESLint.

## 3. Material que debe consultarse durante la sesión

1. `src/descuentos.js` original, sin cambios; el reporte de ESLint ubica infracciones en líneas 3, 4, 5 y 6 del archivo local.
2. `evidencias/lint-inicial.txt`, con los cinco errores verificables: dos `no-var`, uno `eqeqeq` y dos `curly`. `no-unused-vars` no reportó infracciones.
3. `docs/requisitos.md`: R-01–R-04, RF-01–RF-04 propuestos, matriz y decisiones P-01–P-09 pendientes.
4. `docs/checklist.md`: preguntas CHK-13 a CHK-26 (código) y CHK-31 a CHK-34 (inspección y decisiones).
5. `docs/hallazgos.md`: registro preliminar ESL-01–ESL-05 y HUM-01–HUM-07.

## 4. Escala y reglas de decisión

- **Alta:** riesgo potencial para integridad del descuento, reglas de rechazo o total monetario; requiere prioridad para aclarar negocio.
- **Media:** ambigüedad contractual, precisión, coherencia o comportamiento de tipos potencialmente relevante.
- **Baja:** defecto de convención/mantenibilidad ya reconocido por las reglas de ESLint.
- **Corrección técnica de bajo riesgo:** posibilidad de ajuste estructural o de declaración sin alterar la lógica prevista del fragmento; **no significa que esté aprobada**.
- **Corrección condicionada:** podría cambiar el tratamiento de entradas, requiere definición del contrato.
- **Cambio funcional bloqueado:** se necesita una decisión de negocio real antes de alterar el código.

La severidad es **preliminar**. Solo los cinco incumplimientos del linter están **confirmados por la herramienta**; las siete observaciones humanas no son defectos funcionales verificados mediante ejecución.

## 5. Tabla de evaluación técnica de los 12 registros

| ID | Origen | Severidad preliminar | Evidencia del código / ESLint | Acción sugerida | Viabilidad de corrección | Estado actual |
|---|---|---|---|---|---|---|
| **ESL-01** | ESLint | Baja | L3:3 `var descuento`; `no-var` | Cambiar declaración por `let` porque se reasigna en la rama VIP. | **Técnica de bajo riesgo**; revisión y autorización pendientes. | Confirmado por herramienta; sin corregir. |
| **ESL-02** | ESLint | Media | L4:13 `esVip == true`; `eqeqeq` | Precisar tipo de `esVip`; si su contrato es booleano, utilizar `=== true`. | **Condicionada**: `==` y `===` no son equivalentes para todos los tipos. | Confirmado por herramienta; pendiente de contrato P-07. |
| **ESL-03** | ESLint | Baja | L4:22 condición VIP sin llaves; `curly` | Envolver únicamente la instrucción existente en `{}`. | **Técnica de bajo riesgo**; revisión y autorización pendientes. | Confirmado por herramienta; sin corregir. |
| **ESL-04** | ESLint | Baja | L5:25 condición del porcentaje sin llaves; `curly` | Envolver únicamente `console.log(...)` en `{}`. | **Técnica de bajo riesgo**; revisión y autorización pendientes. | Confirmado por herramienta; sin corregir. |
| **ESL-05** | ESLint | Baja | L6:3 `var total`; `no-var` | Cambiar declaración por `const`, ya que no se reasigna. | **Técnica de bajo riesgo**; revisión y autorización pendientes. | Confirmado por herramienta; sin corregir. |
| **HUM-01** | Lectura humana preliminar | Alta | L5 registra un aviso si `porcentaje > 100` y L6–L7 continúan hasta `return total`. | Definir qué respuesta debe producir una entrada inválida y su efecto en el retorno. | **Cambio funcional bloqueado** por RF-03/P-07. | Observación preliminar; decisión pendiente. |
| **HUM-02** | Lectura humana preliminar | Media | No existen verificaciones explícitas del tipo o signo de `precio`, ni del límite inferior de `porcentaje`. | Acordar dominio de entradas y política de validación. | **Cambio funcional bloqueado** por P-07. | Observación preliminar; decisión pendiente. |
| **HUM-03** | Lectura humana preliminar | Alta | La suma de 10 puede elevar `descuento` por encima de `precio`; la resta no tiene tope visible. | Definir rechazo frente a ajuste y reglas promocionales. | **Cambio funcional bloqueado** por P-05/P-06. | Observación preliminar; decisión pendiente. |
| **HUM-04** | Lectura humana preliminar | Media | Se suma el literal `10` si se cumple la condición VIP. | Confirmar quién es VIP, importe, moneda y posibilidad de acumulación. | **Cambio funcional bloqueado** por P-02/P-03/P-04. | Observación preliminar; decisión pendiente. |
| **HUM-05** | Lectura humana preliminar | Media | La firma de la función recibe solo `precio`, `porcentaje`, `esVip`; no hay mecanismo visible de promociones. | Definir identificación y autorización de promociones y su contrato. | **Cambio funcional bloqueado** por P-06. | Observación preliminar; decisión pendiente. |
| **HUM-06** | Lectura humana preliminar | Media | No aparece instrucción de redondeo monetario. | Acordar moneda, impuestos, precisión, método y momento de redondeo. | **Cambio funcional bloqueado** por P-08. | Observación preliminar; decisión pendiente. |
| **HUM-07** | Lectura humana preliminar | Media | `return total` entrega un número; el archivo no implementa interfaz. | Definir responsabilidad de presentación y formato de salida. | **Pendiente de alcance**, P-09; no presumir error de UI. | Observación preliminar; decisión pendiente. |

**Control de doble conteo:** ESL-04 se refiere a llaves y HUM-01 al flujo de rechazo; ESL-02 se refiere a comparación y HUM-04 a reglas VIP. Son aspectos distintos de instrucciones compartidas.

## 6. Propuesta de decisión técnica (correcciones aún sin aprobación registrada)

### 6.1 Cambios técnicos candidatos a autorizar

- **ESL-01:** `var descuento` → `let descuento` por reasignación observada.
- **ESL-03:** agregar llaves al primer `if` manteniendo idéntica condición e instrucción interna.
- **ESL-04:** agregar llaves al segundo `if` manteniendo idéntica condición e instrucción interna.
- **ESL-05:** `var total` → `const total`, sin reasignación posterior.

Estos cuatro cambios se limitan a estilo y mantenibilidad. **No aplicarlos hasta que la inspección valide la propuesta**. El contador de ESLint puede disminuir por ellos, pero no debe anticiparse un resultado de `lint-final.txt` no obtenido.

### 6.2 Cambio técnico condicionado

- **ESL-02:** sustituir `==` por `===` requiere confirmar el contrato de tipo para `esVip` (P-07). Una comparación estricta podría dejar de considerar ciertos valores no booleanos que la comparación flexible considera equivalentes a `true`. No cambiar silenciosamente el comportamiento.

### 6.3 Cambios funcionales no autorizados por esta preparación

- **HUM-01–HUM-07:** no implementar rechazo de porcentaje, topes, controles nuevos, beneficios VIP, promociones, redondeos o interfaz sin aclarar las decisiones P-02–P-09 y el alcance. Los requisitos RF son **propuestas**, no autorizaciones.

### 6.4 Registro de decisiones que debe completar el equipo al reunirse

| Hallazgos | Decisión real del equipo | Responsable | Evidencia / comentario | Fecha |
|---|---|---|---|---|
| ESL-01, ESL-03, ESL-04, ESL-05 | Pendiente | Pendiente | Pendiente | Pendiente |
| ESL-02 | Pendiente | Pendiente | Pendiente | Pendiente |
| HUM-01–HUM-07 | Pendiente | Pendiente | Pendiente | Pendiente |

## 7. Guion sugerido de la inspección real

1. El estudiante, como registrador, anota asistentes reales (él y Luis si participa), roles, fecha, modalidad y versión de código.
2. El estudiante, como presentador del código proporcionado por la cátedra, explica los tres parámetros y el cálculo sin ejecutar pruebas funcionales.
3. Luis, si participa como revisor, contrasta los **cinco resultados de ESLint** contra el código y pregunta si los cuatro ajustes de estilo son admisibles.
4. Luis examina las **siete observaciones humanas** y las decisiones pendientes de negocio, sin suponer reglas no documentadas.
5. Los participantes clasifican cada hallazgo como aceptado, descartado, duplicado o pendiente de aclaración; registran justificaciones y responsables.
6. El estudiante, como registrador, consigna las observaciones que Luis haya formulado realmente y los acuerdos alcanzados; se preserva evidencia (acta revisada por ambos, captura con contexto o comentarios en pull request).
7. **Solo después** de registrar autorizaciones se implementan los cambios permitidos y se genera `evidencias/lint-final.txt`.

## 8. Comentarios técnicos propuestos y conformidad informada de Luis

**Comentario 1 — ESL-02 (comparación VIP):**

> Sería conveniente cambiar `esVip == true` por `esVip === true`, porque la comparación estricta evita que JavaScript trate valores como el número 1 como equivalentes a `true`. Antes del cambio, es necesario confirmar que el sistema siempre reciba un booleano, pues de lo contrario se alteraría el comportamiento.

**Criterio técnico:** mantener ESL-02 pendiente hasta confirmar el contrato del parámetro `esVip`. **Conformidad de Luis:** reportada por el estudiante; evidencia directa pendiente.

**Comentario 2 — HUM-03 (descuento mayor que el precio):**

> El código no controla si el descuento total supera el precio del producto. Al acumular el descuento porcentual con el beneficio VIP, podría obtenerse un total negativo. Es necesario definir la regla de negocio correspondiente, con excepción de promociones autorizadas.

**Criterio técnico:** mantener HUM-03 como riesgo de severidad alta; no introducir un tope o rechazo sin que el negocio defina la excepción promocional. **Conformidad de Luis:** reportada por el estudiante; evidencia directa pendiente.

**Alcance de la conformidad informada:** aceptación de estos **dos comentarios**, no aprobación de las cuatro correcciones de estilo ni validación de los doce hallazgos. Para robustecer la evidencia se recomienda adjuntar una confirmación escrita de Luis o que ambos firmen/ratifiquen el acta.

## 9. Resultados, acuerdos y aprobación — espacios reservados

- Hallazgos confirmados por participantes: **pendiente de sesión**.
- Hallazgos descartados / fusionados: **pendiente de sesión**.
- Correcciones de estilo aprobadas: **ninguna aprobación registrada**.
- Correcciones funcionales aprobadas: **ninguna aprobación registrada**.
- Roles designados: estudiante responsable (autor/presentador y registrador) y Luis (revisor). **El estudiante reportó su conformidad con dos comentarios el 15/11/2026; evidencia directa y revisión integral pendientes**.
- Revisión del código corregido: **pendiente**.
- Evidencia `evidencias/lint-final.txt`: **pendiente**.

**Cierre provisional:** el estudiante reporta conformidad de Luis con dos comentarios, pero esta evidencia indirecta **no demuestra por sí sola una inspección integral**. No se inventa un tercer participante: el estudiante ejerce dos funciones (presentador/autor del trabajo y registrador). El cierre del requisito de revisión por pares dependerá de documentar el alcance real de la revisión, las decisiones del equipo y una constancia verificable.

## 10. Síntesis reflexiva preliminar (revisar tras la reunión)

Un analizador estático detecta patrones de estilo y comparaciones potencialmente problemáticas, pero no confirma qué descuentos autoriza el negocio ni cómo debe manejarse una promoción. El revisor humano puede identificar riesgos económicos o de contrato, pedir aclaraciones y evitar que un arreglo de estilo introduzca cambios semánticos. La conformidad atribuida a Luis se registra como información comunicada por el estudiante; el aporte verificable del revisor podrá describirse con mayor precisión cuando se conserve su confirmación y el alcance efectivo de su participación.

## 11. Referencias internas

- Consigna universitaria: *Actividad Unidad 1 — Evaluación estática*, Fases A–D y rúbrica.
- `src/descuentos.js` — código original.
- `docs/requisitos.md` — requisitos, aceptación y decisiones P-01–P-09.
- `docs/checklist.md` — CHK-13–CHK-26 y CHK-31–CHK-34.
- `docs/hallazgos.md` — 12 registros preliminares de Fase C, paso 1.
- `evidencias/lint-inicial.txt` — cinco errores y cero advertencias según salida de VS Code aportada por el estudiante.

## Seguimiento de correcciones

Fecha: 15 de noviembre de 2026.

Se aplicaron cuatro correcciones técnicas de bajo
riesgo correspondientes a los hallazgos ESL-01,
ESL-03, ESL-04 y ESL-05.

La comparación esVip == true permanece sin modificar
hasta confirmar el contrato de tipos del parámetro.

Los comentarios técnicos propuestos sobre ESL-02
y HUM-03 fueron compartidos con Luis. El autor
comunicó que Luis manifestó su conformidad.

No se documenta una revisión integral de los
12 hallazgos por parte del revisor.

El análisis final de ESLint registró un error,
frente a los cinco errores iniciales.

Los hallazgos relacionados con reglas de negocio
permanecen pendientes de confirmación.
