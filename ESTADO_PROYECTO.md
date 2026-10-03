# Estado del proyecto

Fecha: 3 de octubre de 2026.

## Lo que se quiere hacer

Crear un aula pública en GitHub Pages para el curso **Analítica de Datos e Inteligencia Artificial para la Gestión Pública**:

- Presentar el índice de las cinco sesiones y sus temáticas.
- Publicar la sesión 1 a partir de los ocho documentos de `Sesion_1`.
- Conservar las sesiones 2 a 5 como pendientes hasta disponer de sus materiales.
- Seguir la identidad visual de `estilos.json`, con contenido de ancho amplio y adaptación a móviles.
- Mostrar diagramas, tablas y fórmulas de los documentos.
- Facilitar la descarga de los materiales y del dataset de práctica.
- Omitir entidad, duración y horario de las cabeceras publicadas.
- Incluir Universidad Santo Tomas y los nombres Andrea Cruz Yomayusa y Diego Alejandro Vela en el pie de página.
- Mantener el aula y el README orientados al estudiante.

## Lo que se hizo

- Índice general con las cinco sesiones, sus temáticas y sus estados.
- Página de presentación de la sesión 1 y ocho lecturas navegables con el contenido de los documentos suministrados.
- Índice de apartados en cada lectura, navegación entre materiales y versión de impresión.
- Renderizado de 33 diagramas Mermaid y 12 fórmulas matemáticas.
- Descargas individuales en Markdown, paquete ZIP y CSV UTF-8 con los 40 registros ficticios del ejercicio.
- Copia de bloques de texto y casillas de verificación que conservan su estado en el navegador.
- Cabeceras publicadas sin los metadatos excluidos, incluidos los documentos descargables; los archivos fuente permanecen conservados.
- Diseño con tipografía Montserrat, colores institucionales, tablas desplazables y navegación adaptable.
- Pie de página con la universidad y los dos nombres solicitados.
- README dirigido al estudiante.
- Compilación estática y flujo de publicación automática mediante GitHub Actions.
- Repositorio Git local con el contenido versionado.
- Repositorio público creado en GitHub y sincronizado con la rama `main`.
- GitHub Pages habilitado y sitio publicado mediante GitHub Actions.

## Verificación realizada

- Compilación local completada.
- Diez páginas comprobadas en navegador con anchos de 320, 390, 1440 y 1920 píxeles, sin desbordamiento horizontal de página.
- Los 33 diagramas y las 12 fórmulas se muestran correctamente.
- Rutas internas y enlaces de descarga comprobados en el sitio local.
- Navegación por apartados, copia, descarga y persistencia de casillas comprobadas.
- Capturas revisadas en escritorio y móvil; sin errores de JavaScript en las pruebas.
- Verificación repetida sobre la URL pública en los cuatro anchos: páginas, enlaces internos, descargas, diagramas, fórmulas, copia y casillas correctos.
- ZIP validado con nueve archivos íntegros; CSV idéntico al bloque original del ejercicio, incluidos sus errores intencionales.
- Publicación completada en [GitHub Actions](https://github.com/DIALVEBE/Contraloria/actions/runs/37157069641). El primer intento recibió un error 503 de GitHub; el reintento finalizó correctamente.

## Lo que falta

- Incorporar los materiales de las sesiones 2, 3, 4 y 5 cuando estén disponibles. Estas sesiones permanecen pendientes por diseño.

La creación, publicación y verificación del índice y de la sesión 1 están completas.

## Publicación

- Repositorio: https://github.com/DIALVEBE/Contraloria
- Sitio: https://dialvebe.github.io/Contraloria/
- Sesión 1: https://dialvebe.github.io/Contraloria/sesion-1/
- Materiales: https://dialvebe.github.io/Contraloria/descargas/sesion-1.zip
- Estado: publicado y verificado.
