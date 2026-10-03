# Diccionario de datos — Ejercicio de calidad

**Curso:** Analítica de Datos e Inteligencia Artificial para la Gestión Pública  
**Entidad:** Contraloría General de Boyacá  
**Sesión 1:** Datos e información para la toma de decisiones  
**Archivo asociado:** `03_datos_sucios.csv`

---

## Propósito

Este documento describe la estructura esperada del conjunto de datos utilizado en el ejercicio de calidad.

Su función es permitir identificar:

- qué representa cada columna;
- qué tipo de dato debería contener;
- qué formato se espera;
- qué campos son obligatorios;
- qué reglas básicas deberían cumplirse;
- qué situaciones requieren verificación.

> [!IMPORTANT]
> Los datos utilizados en el ejercicio son **ficticios** y fueron creados únicamente con fines académicos.  
> No representan información oficial ni hallazgos relacionados con ninguna entidad pública.

---

# 1. ¿Qué es un diccionario de datos?

Un diccionario de datos es un documento que explica el significado y las reglas de las variables que aparecen en un conjunto de datos.

Permite responder preguntas como:

```text
¿Qué significa esta columna?

¿Qué tipo de dato debería contener?

¿Puede estar vacía?

¿Qué formato debería utilizar?

¿Qué valores son válidos?

¿Existe alguna regla para verificarla?
```

Un archivo puede contener miles de registros, pero sin un diccionario de datos resulta mucho más difícil interpretar correctamente la información.

---

# 2. Estructura general del dataset

Cada fila del archivo representa un registro de información presupuestal asociado con un municipio y una vigencia determinada.

El archivo contiene las siguientes columnas:

```text
id
municipio
codigo_divipola
nit_entidad
vigencia
presupuesto_definitivo
valor_comprometido
fecha_reporte
fuente
```

---

# 3. Resumen del diccionario

| Campo | Tipo esperado | Obligatorio | Ejemplo |
|---|---|---:|---|
| `id` | Entero | Sí | `1` |
| `municipio` | Texto | Sí | `Tunja` |
| `codigo_divipola` | Texto numérico | Sí | `15001` |
| `nit_entidad` | Texto | Sí | `891800846-1` |
| `vigencia` | Entero de 4 dígitos | Sí | `2025` |
| `presupuesto_definitivo` | Número | Sí | `125000000000` |
| `valor_comprometido` | Número | Sí | `98750000000` |
| `fecha_reporte` | Fecha | Sí | `2025-12-31` |
| `fuente` | Texto categórico | Sí | `SIA` |

---

# 4. Campo `id`

## Nombre

```text
id
```

## Descripción

Identificador interno del registro dentro del archivo del ejercicio.

## Tipo esperado

```text
Entero
```

## Ejemplo válido

```text
1
```

## Obligatorio

```text
Sí
```

## Reglas esperadas

- debe contener un número entero;
- no debe estar vacío;
- no debería repetirse dentro del mismo archivo;
- debe identificar una fila de manera única.

## Ejemplos esperados

```text
1
2
3
4
5
```

## Ejemplos que requieren revisión

```text
1.5
A01
vacío
```

---

# 5. Campo `municipio`

## Nombre

```text
municipio
```

## Descripción

Nombre del municipio al cual se encuentra asociado el registro.

## Tipo esperado

```text
Texto
```

## Ejemplo válido

```text
Tunja
```

## Obligatorio

```text
Sí
```

## Convención esperada

Se utilizará el nombre oficial del municipio con una escritura uniforme.

Ejemplos:

```text
Tunja
Duitama
Sogamoso
Chiquinquirá
Paipa
Puerto Boyacá
Villa de Leyva
Moniquirá
Garagoa
Soatá
```

## Reglas esperadas

- no debe estar vacío;
- no debe contener espacios innecesarios al inicio o al final;
- debe utilizar una escritura uniforme;
- el nombre debería corresponder con el código DIVIPOLA registrado.

## Ejemplos de variaciones que requieren revisión

```text
TUNJA
tunja
Tunja 
 TUNJA
```

También pueden aparecer diferencias relacionadas con tildes:

```text
Duitama
Duitamá
```

o:

```text
Moniquirá
Moniquira
```

Estas diferencias deben ser revisadas antes de considerar que corresponden a municipios distintos.

---

# 6. Campo `codigo_divipola`

## Nombre

```text
codigo_divipola
```

## Descripción

Código utilizado para identificar territorialmente el municipio.

DIVIPOLA corresponde a la codificación de la División Político-Administrativa de Colombia.

## Tipo esperado

```text
Texto numérico
```

Aunque contiene únicamente dígitos, se recomienda tratarlo como identificador y no como una cantidad matemática.

## Ejemplo

```text
15001
```

## Obligatorio

```text
Sí
```

## Formato esperado

Para los municipios utilizados en este ejercicio:

```text
5 dígitos
```

## Ejemplos

```text
15001
15238
15759
15176
15516
15572
15407
15469
15299
15753
```

## Reglas esperadas

- no debe estar vacío;
- debe contener cinco dígitos;
- debe corresponder con el municipio indicado;
- no debe utilizarse para realizar operaciones matemáticas;
- debe mantenerse como identificador territorial.

## Ejemplos que requieren revisión

```text
1501
15283
vacío
ABC01
```

> [!NOTE]
> Un código con cinco dígitos no es automáticamente correcto.  
> También debe verificarse que corresponda al municipio registrado.

---

# 7. Campo `nit_entidad`

## Nombre

```text
nit_entidad
```

## Descripción

Identificador tributario utilizado para reconocer la entidad asociada con el registro.

## Tipo esperado

```text
Texto
```

No debe tratarse como una cantidad matemática.

## Ejemplo de formato utilizado en el ejercicio

```text
891800846-1
```

## Obligatorio

```text
Sí
```

## Convención esperada

Para efectos del ejercicio se utilizará una representación uniforme:

```text
XXXXXXXXX-X
```

Ejemplo:

```text
891800846-1
```

## Reglas esperadas

- no debe estar vacío;
- no debe utilizar valores como `N/A` o `null`;
- debe mantener una representación consistente;
- debe conservar el dígito de verificación cuando corresponda;
- debe tratarse como texto.

## Ejemplos que requieren revisión

```text
8918008461
891800846-1
N/A
vacío
```

Dos formas diferentes podrían representar el mismo identificador, pero esto debe comprobarse antes de modificar los datos.

---

# 8. Campo `vigencia`

## Nombre

```text
vigencia
```

## Descripción

Año al cual corresponde la información presupuestal del registro.

## Tipo esperado

```text
Entero
```

## Formato esperado

```text
AAAA
```

## Ejemplo válido

```text
2025
```

## Obligatorio

```text
Sí
```

## Reglas esperadas

- debe contener cuatro dígitos;
- debe representar un año válido;
- debe corresponder con el periodo al que pertenece la información;
- no debe utilizar abreviaturas.

## Ejemplos válidos

```text
2024
2025
2026
```

## Ejemplos que requieren revisión

```text
25
025
20250
```

---

# 9. Campo `presupuesto_definitivo`

## Nombre

```text
presupuesto_definitivo
```

## Descripción

Valor monetario que representa el presupuesto definitivo registrado para el ejercicio académico.

## Tipo esperado

```text
Número
```

## Unidad

```text
Pesos colombianos
```

## Ejemplo

```text
125000000000
```

## Obligatorio

```text
Sí
```

## Formato esperado dentro del dataset

Se espera almacenar únicamente el valor numérico.

Ejemplo:

```text
125000000000
```

No se espera almacenar:

```text
$125.000.000.000
```

ni:

```text
125,000,000,000
```

como texto.

## Reglas esperadas

- debe contener un valor numérico;
- no debe incluir símbolos de moneda;
- no debe utilizar separadores de miles dentro del archivo CSV;
- no debe estar vacío;
- no debería ser negativo en el contexto de este ejercicio.

## Ejemplos válidos

```text
125000000000
98000000000
76000000000
```

## Ejemplos que requieren revisión

```text
$125.000.000.000
76,000,000,000
-145000000000
vacío
```

---

# 10. Campo `valor_comprometido`

## Nombre

```text
valor_comprometido
```

## Descripción

Valor monetario registrado como comprometido durante la vigencia para efectos del ejercicio académico.

## Tipo esperado

```text
Número
```

## Unidad

```text
Pesos colombianos
```

## Ejemplo

```text
98750000000
```

## Obligatorio

```text
Sí
```

## Formato esperado

```text
98750000000
```

Sin:

- símbolo `$`;
- puntos de miles;
- comas de miles;
- texto adicional.

## Reglas esperadas

- debe ser numérico;
- no debe estar vacío;
- no debería ser negativo;
- debe interpretarse dentro del contexto presupuestal del registro.

## Ejemplos válidos

```text
98750000000
75500000000
54000000000
```

## Ejemplos que requieren revisión

```text
$98.750.000.000
54,000,000,000
vacío
```

---

# 11. Relación entre `presupuesto_definitivo` y `valor_comprometido`

Los dos campos representan valores monetarios relacionados.

Un registro puede presentar, por ejemplo:

```text
presupuesto_definitivo = 87000000000
valor_comprometido     = 91000000000
```

Esta situación debe marcarse para revisión.

> [!IMPORTANT]
> Que un valor comprometido sea superior al presupuesto definitivo no autoriza a cambiar automáticamente ninguno de los dos valores.

La acción correcta es:

```text
Identificar
    ↓
Marcar para revisión
    ↓
Consultar la fuente o documentación correspondiente
```

No debe aplicarse una corrección basada únicamente en lo que “parece lógico”.

---

# 12. Campo `fecha_reporte`

## Nombre

```text
fecha_reporte
```

## Descripción

Fecha asociada con el reporte del registro.

## Tipo esperado

```text
Fecha
```

## Obligatorio

```text
Sí
```

## Formato esperado

Se utilizará el estándar:

```text
AAAA-MM-DD
```

Ejemplo:

```text
2025-12-31
```

## Reglas esperadas

- debe representar una fecha válida;
- debe utilizar el mismo formato en todo el archivo;
- no debe estar vacía;
- el mes debe encontrarse entre `01` y `12`;
- el día debe ser válido para el mes correspondiente.

## Ejemplo válido

```text
2025-12-31
```

## Formatos diferentes que requieren estandarización

```text
31/12/2025
31-12-2025
2025/12/31
31 diciembre 2025
```

## Fechas inválidas

Ejemplos:

```text
2025-13-31
31/02/2025
```

Una fecha inválida no debe ser corregida inventando otra fecha.

---

# 13. Campo `fuente`

## Nombre

```text
fuente
```

## Descripción

Identifica la fuente declarada de donde proviene el registro.

## Tipo esperado

```text
Texto categórico
```

## Obligatorio

```text
Sí
```

## Valor esperado para la mayoría de registros del ejercicio

```text
SIA
```

## Reglas esperadas

- no debe estar vacío;
- debe utilizar nombres consistentes;
- no debe contener espacios adicionales;
- valores como `null` no deben considerarse una fuente válida;
- una fuente diferente al patrón general debe ser revisada antes de asumir que es incorrecta.

## Ejemplos

```text
SIA
sia
SIA 
SECOP
null
```

Estas variantes no significan necesariamente lo mismo.

Por ejemplo:

```text
SIA
sia
SIA 
```

parecen variaciones de formato.

Mientras que:

```text
SECOP
```

corresponde a otra fuente y requiere revisar si el registro pertenece realmente al mismo conjunto.

---

# 14. Tipos de datos esperados

| Campo | Tipo conceptual | Tipo recomendado en una tabla |
|---|---|---|
| `id` | Identificador | Entero |
| `municipio` | Categoría territorial | Texto |
| `codigo_divipola` | Identificador territorial | Texto |
| `nit_entidad` | Identificador de entidad | Texto |
| `vigencia` | Año | Entero |
| `presupuesto_definitivo` | Valor monetario | Número |
| `valor_comprometido` | Valor monetario | Número |
| `fecha_reporte` | Fecha | Fecha |
| `fuente` | Categoría | Texto |

---

# 15. ¿Por qué algunos números deben almacenarse como texto?

Observe:

```text
codigo_divipola = 15001
nit_entidad     = 891800846-1
```

Aunque estos campos contienen números, representan **identificadores**.

No tiene sentido realizar operaciones como:

```text
15001 + 15238
```

o:

```text
promedio del NIT
```

Por ello deben tratarse como texto o categorías.

En cambio:

```text
presupuesto_definitivo
valor_comprometido
```

sí representan cantidades y deberían almacenarse como datos numéricos.

---

# 16. Campos obligatorios

Para este ejercicio todos los campos deben estar diligenciados.

| Campo | Obligatorio |
|---|:---:|
| `id` | Sí |
| `municipio` | Sí |
| `codigo_divipola` | Sí |
| `nit_entidad` | Sí |
| `vigencia` | Sí |
| `presupuesto_definitivo` | Sí |
| `valor_comprometido` | Sí |
| `fecha_reporte` | Sí |
| `fuente` | Sí |

Por lo tanto, deben marcarse para revisión valores como:

```text
vacío
N/A
null
```

cuando aparecen en campos obligatorios.

---

# 17. Valores faltantes

Un valor faltante puede aparecer de diferentes maneras.

Ejemplos:

```text
,
```

```text
N/A
```

```text
null
```

```text
""
```

Estos valores no siempre significan exactamente lo mismo.

Por ello, durante una revisión se debe identificar:

1. si el dato realmente no existe;
2. si no fue reportado;
3. si se perdió durante una exportación;
4. si fue representado mediante una palabra como `null`;
5. si puede recuperarse consultando la fuente.

---

# 18. Convenciones esperadas

Para este ejercicio se utilizarán las siguientes convenciones.

## Municipio

```text
Nombre oficial con uso normal de mayúsculas y minúsculas.
```

Ejemplo:

```text
Puerto Boyacá
```

---

## Código DIVIPOLA

```text
5 dígitos
```

Ejemplo:

```text
15572
```

---

## NIT

```text
XXXXXXXXX-X
```

Ejemplo:

```text
891803456-7
```

---

## Vigencia

```text
AAAA
```

Ejemplo:

```text
2025
```

---

## Valores monetarios

```text
Solo números
```

Ejemplo:

```text
112000000000
```

---

## Fecha

```text
AAAA-MM-DD
```

Ejemplo:

```text
2025-12-31
```

---

## Fuente

```text
Nombre normalizado de la fuente
```

Ejemplo:

```text
SIA
```

---

# 19. Reglas mínimas de validación

| Campo | Regla básica |
|---|---|
| `id` | Debe existir y no repetirse |
| `municipio` | Debe estar diligenciado y usar una escritura uniforme |
| `codigo_divipola` | Debe tener 5 dígitos y corresponder al municipio |
| `nit_entidad` | Debe existir y utilizar un formato uniforme |
| `vigencia` | Debe contener 4 dígitos |
| `presupuesto_definitivo` | Debe ser numérico y no negativo |
| `valor_comprometido` | Debe ser numérico y no negativo |
| `fecha_reporte` | Debe ser una fecha válida |
| `fuente` | Debe estar diligenciada e identificarse claramente |

---

# 20. Regla de correspondencia territorial

Dos campos del archivo están directamente relacionados:

```text
municipio
codigo_divipola
```

La combinación debe ser coherente.

Ejemplo conceptual:

```text
Tunja → 15001
```

Si aparece:

```text
Tunja → código diferente
```

no basta con mirar que el código tenga cinco dígitos.

Debe verificarse la correspondencia correcta.

---

# 21. Regla de correspondencia de entidad

También debe existir coherencia entre:

```text
municipio
nit_entidad
```

Si un mismo municipio aparece repetido con distintas representaciones del NIT, debe revisarse si:

- se trata de la misma entidad;
- se eliminó un carácter;
- cambió el formato;
- corresponde realmente a otra entidad.

No debe modificarse un identificador únicamente por similitud visual.

---

# 22. Reglas para fechas

Una fecha se considera válida cuando:

- existe en el calendario;
- puede interpretarse sin ambigüedad;
- utiliza el formato definido para el archivo.

Formato esperado:

```text
YYYY-MM-DD
```

Ejemplo:

```text
2025-12-31
```

Una fecha como:

```text
31/12/2025
```

puede ser válida, pero no utiliza el formato esperado.

Una fecha como:

```text
31/02/2025
```

es inválida porque el día indicado no existe en ese mes.

---

# 23. Reglas para valores monetarios

Los valores monetarios del dataset deben almacenarse como números.

Correcto:

```text
125000000000
```

Requiere revisión de formato:

```text
$125.000.000.000
```

```text
125,000,000,000
```

Esto es importante porque diferentes programas pueden interpretar los separadores de miles y decimales de formas distintas.

---

# 24. Diferencia entre error evidente y dato por verificar

No todos los problemas tienen el mismo tratamiento.

## Error de formato evidente

Ejemplo:

```text
municipio = "Tunja "
```

Existe un espacio al final.

Puede documentarse como problema de formato.

---

## Dato inválido

Ejemplo:

```text
fecha_reporte = 2025-13-31
```

El mes `13` no existe.

---

## Dato que requiere verificación

Ejemplo:

```text
presupuesto_definitivo = 87000000000
valor_comprometido     = 91000000000
```

No debe modificarse automáticamente.

Debe contrastarse con la fuente correspondiente.

---

# 25. Estados posibles durante la revisión

Al revisar una celda puede utilizarse una clasificación sencilla.

| Estado | Significado |
|---|---|
| **Válido** | Cumple las reglas conocidas |
| **Formato inconsistente** | El dato parece correcto, pero está representado de otra manera |
| **Faltante** | El dato obligatorio no está disponible |
| **Inválido** | Incumple una regla conocida |
| **Requiere verificación** | No puede decidirse únicamente con la información del archivo |

---

# 26. Ejemplo de lectura del diccionario

Suponga el siguiente registro:

```text
municipio = TUNJA
codigo_divipola = 15001
vigencia = 25
fecha_reporte = 31/12/2025
```

Al comparar con el diccionario:

### `municipio`

El valor existe, pero no utiliza la convención esperada.

Estado posible:

```text
Formato inconsistente
```

### `codigo_divipola`

Contiene cinco dígitos.

Debe comprobarse además que corresponda al municipio.

### `vigencia`

No utiliza cuatro dígitos.

Estado:

```text
Inválido según la regla del ejercicio
```

### `fecha_reporte`

La fecha puede ser válida, pero no utiliza el formato definido.

Estado:

```text
Formato inconsistente
```

---

# 27. Actividad — Consulte el diccionario

Para cada caso indique qué regla del diccionario utilizaría.

| Caso | Campo | Regla que debe consultarse |
|---|---|---|
| `TUNJA` | | |
| `2025-13-31` | | |
| `$125.000.000.000` | | |
| código vacío | | |
| `N/A` en NIT | | |
| vigencia `25` | | |
| fuente `SIA ` | | |

---

# 28. Actividad — Campo correcto o incorrecto

Clasifique cada valor utilizando:

```text
Válido
Formato inconsistente
Inválido
Faltante
Requiere verificación
```

| Campo | Valor | Clasificación |
|---|---|---|
| `municipio` | `Tunja` | |
| `municipio` | `TUNJA` | |
| `codigo_divipola` | `15001` | |
| `codigo_divipola` | vacío | |
| `vigencia` | `25` | |
| `vigencia` | `2025` | |
| `fecha_reporte` | `2025-12-31` | |
| `fecha_reporte` | `31/02/2025` | |
| `fuente` | `SIA` | |
| `fuente` | `null` | |

---

# 29. Plantilla para documentar una variable

Cuando se cree un nuevo conjunto de datos, una variable puede documentarse utilizando la siguiente estructura:

```text
Nombre del campo:

Descripción:

Tipo de dato:

Obligatorio:

Unidad:

Formato:

Ejemplo:

Valores permitidos:

Reglas de validación:

Observaciones:
```

---

# 30. Plantilla de diccionario de datos

| Campo | Descripción | Tipo | Obligatorio | Formato | Ejemplo | Regla |
|---|---|---|:---:|---|---|---|
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |

---

# 31. Lista de verificación

Antes de utilizar el archivo del ejercicio, compruebe que puede responder:

- [ ] ¿Sé qué significa cada columna?
- [ ] ¿Sé qué campos son identificadores?
- [ ] ¿Sé cuáles campos deberían ser numéricos?
- [ ] ¿Sé qué formato deben utilizar las fechas?
- [ ] ¿Sé qué campos son obligatorios?
- [ ] ¿Sé qué representación debe tener el NIT?
- [ ] ¿Sé qué longitud debe tener el código DIVIPOLA?
- [ ] ¿Sé cuándo un valor puede corregirse por formato?
- [ ] ¿Sé cuándo un valor requiere consultar la fuente?
- [ ] ¿Sé qué valores no debo inventar?

---

# 32. Idea central

```mermaid
flowchart LR
    A["Dato observado"] --> B["Consultar diccionario"]
    B --> C["Conocer significado"]
    C --> D["Revisar regla"]
    D --> E["Determinar si cumple"]
```

Un diccionario de datos permite pasar de:

```text
"este valor se ve raro"
```

a:

```text
"este valor incumple una regla documentada"
```

Esa diferencia es fundamental para realizar una revisión de calidad de manera ordenada y verificable.
