# Ficha para construcción de indicadores

**Curso:** Analítica de Datos e Inteligencia Artificial para la Gestión Pública  
**Entidad:** Contraloría General de Boyacá  
**Sesión 1:** Datos e información para la toma de decisiones  
**Actividad:** Construcción y documentación de indicadores

---

## Propósito

Un indicador permite transformar datos en una medida que ayuda a describir una situación, hacer seguimiento y apoyar la toma de decisiones.

El objetivo de esta ficha es documentar un indicador de forma clara, verificable y reproducible.

> [!IMPORTANT]
> Un indicador no reemplaza el análisis ni constituye por sí solo una conclusión sobre la gestión de una entidad.  
> Su interpretación debe realizarse con contexto, información suficiente y conocimiento del proceso evaluado.

---

# 1. ¿Qué es un indicador?

Un indicador es una medida construida a partir de uno o varios datos.

Ejemplo:

```text
Apropiación definitiva = 1.000.000.000
Compromisos             =   830.000.000
```

A partir de estos datos puede construirse:

\[
\text{Ejecución presupuestal} =
\frac{\text{Compromisos}}
{\text{Apropiación definitiva}}
\times 100
\]

Resultado:

```text
83 %
```

El resultado resume una relación entre dos variables.

---

# 2. Dato, métrica, indicador y meta

Estos conceptos no significan lo mismo.

| Concepto | Ejemplo |
|---|---|
| **Dato** | `$830.000.000` |
| **Métrica** | Valor total comprometido |
| **Indicador** | Porcentaje de ejecución presupuestal |
| **Meta** | Alcanzar determinado nivel definido por la entidad |

---

# 3. Estructura básica de un indicador

Todo indicador debería poder responder:

```text
¿Qué mide?

¿Por qué se mide?

¿Con qué datos se calcula?

¿De dónde salen los datos?

¿Cómo se calcula?

¿En qué unidad se expresa?

¿Cada cuánto se calcula?

¿A qué periodo corresponde?

¿Cómo debe interpretarse?

¿Qué no permite concluir?
```

---

# 4. Ficha general

## Nombre del indicador

```text

```

## Código del indicador

Opcional.

```text

```

## Tema

Seleccione una opción.

- [ ] Presupuesto
- [ ] Ingresos
- [ ] Gastos
- [ ] Contratación
- [ ] Deuda pública
- [ ] Inversión
- [ ] Gestión institucional
- [ ] Calidad de datos
- [ ] Otro

### Otro:

```text

```

---

# 5. Pregunta que pretende responder

Un indicador debe partir de una pregunta.

Ejemplo:

```text
¿Qué proporción de la apropiación definitiva fue comprometida durante la vigencia?
```

### Pregunta

```text



```

---

# 6. Objetivo del indicador

Explique para qué se construye.

Ejemplo:

```text
Describir el nivel de compromiso presupuestal de una entidad durante una vigencia determinada.
```

### Objetivo

```text




```

---

# 7. Definición

Describa en una frase qué representa el indicador.

```text




```

---

# 8. Tipo de indicador

Seleccione la categoría que mejor corresponda.

- [ ] Conteo
- [ ] Suma
- [ ] Promedio
- [ ] Porcentaje
- [ ] Proporción
- [ ] Razón
- [ ] Variación
- [ ] Tasa
- [ ] Índice
- [ ] Otro

### Otro:

```text

```

---

# 9. Unidad de medida

Seleccione o escriba la unidad.

- [ ] Número
- [ ] Pesos colombianos
- [ ] Miles de pesos
- [ ] Millones de pesos
- [ ] Porcentaje
- [ ] Días
- [ ] Meses
- [ ] Años
- [ ] Personas
- [ ] Contratos
- [ ] Proyectos
- [ ] Otro

### Otra:

```text

```

---

# 10. Fórmula

Escriba la fórmula matemática o lógica.

```text




```

Ejemplo:

```text
(compromisos / apropiacion_definitiva) * 100
```

---

# 11. Numerador

## Nombre

```text

```

## Descripción

```text



```

## Unidad

```text

```

## Fuente

```text

```

## Periodo

```text

```

---

# 12. Denominador

Si el indicador no utiliza denominador, escriba:

```text
No aplica
```

## Nombre

```text

```

## Descripción

```text



```

## Unidad

```text

```

## Fuente

```text

```

## Periodo

```text

```

---

# 13. Variables adicionales

Si el indicador utiliza más variables, regístrelas.

| Variable | Descripción | Unidad | Fuente |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

---

# 14. Fuente de información

## Fuente principal

```text

```

## Entidad responsable de la fuente

```text

```

## Dataset, reporte o sistema

```text

```

## Enlace

```text

```

## Fecha de consulta

```text

```

---

# 15. Periodo de medición

## Vigencia

```text

```

## Fecha inicial

```text

```

## Fecha final

```text

```

## Fecha de corte

```text

```

---

# 16. Periodicidad

¿Cada cuánto debería calcularse?

- [ ] Mensual
- [ ] Bimestral
- [ ] Trimestral
- [ ] Semestral
- [ ] Anual
- [ ] Por vigencia
- [ ] Eventual
- [ ] Otra

### Otra:

```text

```

---

# 17. Nivel de análisis

¿A qué nivel se calcula?

- [ ] Nacional
- [ ] Departamental
- [ ] Municipal
- [ ] Entidad
- [ ] Dependencia
- [ ] Contrato
- [ ] Proyecto
- [ ] Programa
- [ ] Otro

### Otro:

```text

```

---

# 18. Población o universo

Indique sobre qué conjunto se construye el indicador.

Ejemplos:

```text
Todos los contratos de una entidad durante 2025.
```

```text
Todas las apropiaciones presupuestales de una vigencia.
```

### Universo

```text




```

---

# 19. Reglas de inclusión

¿Qué registros deben hacer parte del cálculo?

```text




```

---

# 20. Reglas de exclusión

¿Qué registros no deben hacer parte?

```text




```

---

# 21. Supuestos

Registre las condiciones que deben cumplirse para que el indicador tenga sentido.

Ejemplos:

```text
El numerador y el denominador corresponden al mismo periodo.
```

```text
Ambos valores están expresados en la misma unidad.
```

### Supuestos

```text




```

---

# 22. Validaciones previas

Antes de calcular el indicador, verifique:

- [ ] Las variables existen.
- [ ] Los valores están en la misma unidad.
- [ ] El periodo es comparable.
- [ ] No existen valores faltantes críticos.
- [ ] El denominador no es cero.
- [ ] La fuente está identificada.
- [ ] La fecha de corte está definida.
- [ ] Las reglas de inclusión están claras.

---

# 23. Interpretación

Explique qué significa un valor alto y qué significa un valor bajo.

## Valor alto

```text




```

## Valor bajo

```text




```

---

# 24. ¿Qué NO permite concluir?

Este campo es obligatorio.

Ejemplo:

```text
Un porcentaje alto de ejecución presupuestal no demuestra por sí solo eficiencia, calidad del gasto o cumplimiento de resultados.
```

### Limitación de interpretación

```text




```

---

# 25. Rango esperado

Si aplica:

## Mínimo teórico

```text

```

## Máximo teórico

```text

```

## ¿Puede superar el 100 %?

- [ ] Sí
- [ ] No
- [ ] Depende del indicador
- [ ] No aplica

## Explique

```text




```

---

# 26. Sentido del indicador

Seleccione una opción.

- [ ] Un valor mayor puede ser favorable.
- [ ] Un valor menor puede ser favorable.
- [ ] Depende del contexto.
- [ ] No debe interpretarse en términos de favorable/desfavorable.

## Explique

```text




```

---

# 27. Línea base

Si existe una medición anterior:

```text

```

## Periodo de la línea base

```text

```

---

# 28. Meta

Si existe una meta definida institucionalmente:

```text

```

## Fuente de la meta

```text

```

> [!NOTE]
> No debe inventarse una meta para completar la ficha.  
> Si no existe una meta formalmente definida, escriba:

```text
No definida
```

---

# 29. Ejemplo de cálculo

## Datos

```text
Variable A:

Variable B:

Variable C:
```

## Sustitución en la fórmula

```text




```

## Resultado

```text

```

## Unidad

```text

```

---

# 30. Ejemplo completo — Ejecución presupuestal

## Nombre

```text
Porcentaje de ejecución presupuestal por compromisos
```

## Pregunta

```text
¿Qué proporción de la apropiación definitiva fue comprometida durante la vigencia?
```

## Fórmula

\[
\text{Ejecución} =
\frac{\text{Compromisos}}
{\text{Apropiación definitiva}}
\times 100
\]

## Numerador

```text
Compromisos acumulados
```

## Denominador

```text
Apropiación definitiva
```

## Unidad

```text
Porcentaje
```

## Ejemplo

```text
Apropiación definitiva = 1.000.000.000
Compromisos             =   830.000.000
```

\[
\frac{830.000.000}{1.000.000.000}\times100 = 83\%
\]

## Interpretación

```text
El 83 % de la apropiación definitiva fue comprometido durante el periodo analizado.
```

## No permite concluir

```text
No permite afirmar por sí solo que el gasto fue eficiente, que los bienes o servicios fueron recibidos o que se cumplieron los resultados esperados.
```

---

# 31. Ejemplo completo — Porcentaje de recaudo

## Nombre

```text
Porcentaje de recaudo
```

## Pregunta

```text
¿Qué proporción de los ingresos definitivos fue efectivamente recaudada?
```

## Fórmula

\[
\text{Recaudo} =
\frac{\text{Ingresos recaudados}}
{\text{Ingresos definitivos}}
\times 100
\]

## Unidad

```text
Porcentaje
```

## Ejemplo

```text
Ingresos definitivos = 500.000.000
Ingresos recaudados  = 425.000.000
```

Resultado:

```text
85 %
```

## Interpretación

```text
Durante el periodo analizado se recaudó un valor equivalente al 85 % de los ingresos definitivos registrados.
```

---

# 32. Ejemplo completo — Variación porcentual

## Nombre

```text
Variación porcentual entre dos periodos
```

## Pregunta

```text
¿Cuánto aumentó o disminuyó un valor frente al periodo anterior?
```

## Fórmula

\[
\text{Variación} =
\frac{\text{Valor actual} - \text{Valor anterior}}
{\text{Valor anterior}}
\times 100
\]

## Ejemplo

```text
Valor anterior = 100
Valor actual   = 120
```

Resultado:

```text
20 %
```

## Interpretación

```text
El valor aumentó 20 % frente al periodo anterior.
```

---

# 33. Ejemplo completo — Completitud de datos

## Nombre

```text
Porcentaje de completitud
```

## Pregunta

```text
¿Qué proporción de los campos obligatorios se encuentra diligenciada?
```

## Fórmula

\[
\text{Completitud} =
\frac{\text{Campos diligenciados}}
{\text{Campos obligatorios esperados}}
\times 100
\]

## Ejemplo

```text
Campos obligatorios esperados = 100
Campos diligenciados          = 92
```

Resultado:

```text
92 %
```

---

# 34. Indicadores de conteo

No todos los indicadores necesitan una división.

Ejemplo:

```text
Número de contratos registrados durante la vigencia
```

Fórmula conceptual:

```text
Conteo de registros válidos
```

Unidad:

```text
Contratos
```

---

# 35. Indicadores de suma

Ejemplo:

```text
Valor total de contratos registrados durante la vigencia
```

Fórmula conceptual:

```text
Suma del valor de los contratos incluidos
```

Unidad:

```text
Pesos colombianos
```

---

# 36. Indicadores de promedio

Ejemplo:

```text
Valor promedio de los contratos registrados
```

Fórmula:

\[
\text{Promedio} =
\frac{\text{Suma de valores}}
{\text{Número de contratos}}
\]

Antes de utilizar un promedio es necesario definir claramente qué registros se incluyen.

---

# 37. Cuidado con los denominadores

Un indicador puede cambiar de significado según el denominador utilizado.

Ejemplo:

```text
Contratos de modalidad A / Total de contratos
```

no es igual a:

```text
Valor de contratos de modalidad A / Valor total contratado
```

El primero mide una proporción de **cantidad**.

El segundo mide una proporción de **valor**.

Por ello, el denominador debe estar claramente documentado.

---

# 38. Cuidado con las unidades

No deben combinarse valores expresados en unidades diferentes sin verificar previamente.

Ejemplo:

```text
Numerador   = 850 millones de pesos
Denominador = 1.000.000.000 pesos
```

Antes del cálculo ambos deben representar la misma unidad.

---

# 39. Cuidado con los periodos

Este cálculo puede ser incorrecto:

```text
Compromisos de enero a junio 2025
/
Apropiación definitiva de diciembre 2025
```

si la intención era comparar información del mismo corte.

Siempre debe documentarse:

```text
Periodo del numerador
Periodo del denominador
Fecha de corte
```

---

# 40. Cuidado con valores faltantes

Suponga:

```text
presupuesto_definitivo = vacío
valor_comprometido     = 500000000
```

No debe calcularse:

```text
500000000 / 0
```

ni reemplazarse automáticamente el valor faltante por cero.

Debe registrarse que el indicador no puede calcularse con la información disponible.

---

# 41. Cuidado con el valor cero

Si el denominador es:

```text
0
```

la división no puede realizarse.

El resultado debería registrarse como:

```text
No calculable
```

o la convención definida institucionalmente.

---

# 42. Cuidado con los porcentajes

Un porcentaje siempre debe tener claramente definidos:

```text
Numerador
Denominador
Periodo
Unidad
Universo
```

Ejemplo ambiguo:

```text
La ejecución fue del 85 %.
```

Ejemplo mejor documentado:

```text
Los compromisos acumulados al 31 de diciembre representan el 85 % de la apropiación definitiva de la vigencia.
```

---

# 43. Actividad — Construya un indicador presupuestal

Complete:

## Nombre

```text

```

## Pregunta

```text

```

## Numerador

```text

```

## Denominador

```text

```

## Fórmula

```text

```

## Unidad

```text

```

## Fuente

```text

```

## Periodo

```text

```

## Interpretación

```text




```

## ¿Qué no permite concluir?

```text




```

---

# 44. Actividad — Construya un indicador de calidad de datos

Utilice el archivo:

```text
03_datos_sucios.csv
```

Puede plantear, por ejemplo:

```text
Porcentaje de registros con todos los campos obligatorios diligenciados
```

Complete la ficha.

## Nombre

```text

```

## Pregunta

```text

```

## Fórmula

```text

```

## Unidad

```text

```

## Numerador

```text

```

## Denominador

```text

```

## Interpretación

```text




```

---

# 45. Actividad — ¿Indicador bien definido?

Revise cada caso.

## Caso A

```text
Nombre: Ejecución
Fórmula: Gastado / Total
```

### ¿Qué información falta?

```text




```

---

## Caso B

```text
Nombre: Contratación
Resultado: 42 %
```

### ¿Puede interpretarse?

- [ ] Sí
- [ ] No

### ¿Por qué?

```text




```

---

## Caso C

```text
Nombre: Variación anual
Fórmula: (valor actual - valor anterior) / valor anterior
```

### ¿Qué elemento falta para expresar correctamente el resultado como porcentaje?

```text

```

---

# 46. Actividad — Mejore la definición

Transforme:

```text
Indicador: Presupuesto ejecutado
```

en una definición completa.

## Pregunta

```text

```

## Fórmula

```text

```

## Unidad

```text

```

## Periodo

```text

```

## Fuente

```text

```

## Interpretación

```text




```

---

# 47. Matriz de validación

Antes de aceptar un indicador, revise:

| Pregunta | Sí | No |
|---|:---:|:---:|
| ¿Tiene un nombre claro? | [ ] | [ ] |
| ¿Responde una pregunta concreta? | [ ] | [ ] |
| ¿La fórmula está documentada? | [ ] | [ ] |
| ¿El numerador está definido? | [ ] | [ ] |
| ¿El denominador está definido? | [ ] | [ ] |
| ¿La unidad está definida? | [ ] | [ ] |
| ¿La fuente está identificada? | [ ] | [ ] |
| ¿El periodo está definido? | [ ] | [ ] |
| ¿La fecha de corte está definida? | [ ] | [ ] |
| ¿La interpretación está documentada? | [ ] | [ ] |
| ¿Se explican las limitaciones? | [ ] | [ ] |
| ¿Puede otra persona reproducir el cálculo? | [ ] | [ ] |

---

# 48. Ficha resumida de indicador

| Campo | Información |
|---|---|
| Nombre | |
| Código | |
| Pregunta | |
| Objetivo | |
| Definición | |
| Tipo | |
| Fórmula | |
| Numerador | |
| Denominador | |
| Unidad | |
| Fuente | |
| Periodo | |
| Fecha de corte | |
| Periodicidad | |
| Nivel de análisis | |
| Universo | |
| Regla de inclusión | |
| Regla de exclusión | |
| Interpretación | |
| Limitaciones | |
| Responsable | |

---

# 49. Plantilla corta

Cuando se necesite documentar un indicador rápidamente:

```text
Nombre:

Pregunta:

Fórmula:

Numerador:

Denominador:

Unidad:

Fuente:

Periodo:

Fecha de corte:

Interpretación:

¿Qué NO permite concluir?:
```

---

# 50. Entregable de la actividad

Cada grupo debe construir **un indicador** relacionado con información de gestión pública.

Debe entregar:

1. nombre;
2. pregunta;
3. fórmula;
4. numerador;
5. denominador;
6. unidad;
7. fuente;
8. periodo;
9. interpretación;
10. limitación.

---

# 51. Principio de interpretación

Considere:

```text
Indicador = 92 %
```

Por sí solo, este valor no responde:

```text
¿92 % de qué?
¿En qué periodo?
¿Con qué fuente?
¿Frente a qué universo?
¿Es alto o bajo?
¿Es favorable?
¿Existe una meta?
```

Por ello:

```mermaid
flowchart LR
    A["Dato"] --> B["Fórmula"]
    B --> C["Indicador"]
    C --> D["Contexto"]
    D --> E["Interpretación"]
```

---

# 52. Regla final

> **Un buen indicador debe poder ser entendido y calculado nuevamente por otra persona utilizando la misma definición, la misma fuente, el mismo periodo y las mismas reglas.**

La construcción de indicadores no consiste únicamente en obtener un número.

Consiste en documentar con claridad:

```text
qué se mide,
cómo se mide,
con qué datos,
para qué periodo,
y hasta dónde puede interpretarse.
```
