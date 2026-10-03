import { readFile, writeFile, mkdir, readdir, cp, rm } from 'node:fs/promises';
import { marked } from 'marked';
import katex from 'katex';
import JSZip from 'jszip';
import { build } from 'esbuild';

const course = 'Analítica de Datos e Inteligencia Artificial para la Gestión Pública';
const resources = [
  ['guia', 'Guía de la sesión', 'Conceptos, fuentes, calidad, gobernanza e indicadores.', 'book-open'],
  ['fuentes', 'Mapa de fuentes', 'Dónde encontrar datos públicos y cómo obtenerlos.', 'network'],
  ['datos-sucios', 'Práctica de calidad', 'Identificación y revisión de errores en datos ficticios.', 'scan-search'],
  ['diccionario', 'Diccionario de datos', 'Variables, formatos y reglas de validación.', 'list-tree'],
  ['ficha-fuente', 'Ficha de fuente', 'Documentación y evaluación de una fuente de información.', 'file-search'],
  ['ficha-indicador', 'Ficha de indicador', 'Construcción, interpretación y límites de un indicador.', 'chart-no-axes-combined'],
  ['reto-boyaca', 'Reto Boyacá 360°', 'Un territorio, varias fuentes y una conclusión sustentada.', 'map-pin'],
  ['enlaces', 'Directorio de enlaces', 'Accesos a portales, datasets y documentación oficial.', 'external-link'],
];
const sessions = [
  ['Datos para decidir', ['Datos e información para la toma de decisiones.', 'Tipos y fuentes de datos en el sector público.', 'Calidad, estructuración y gobernanza de datos.', 'Indicadores y métricas para la gestión pública.']],
  ['Análisis de datos públicos', ['Análisis exploratorio de datos.', 'Identificación de patrones, tendencias y anomalías.', 'Cruce y depuración de bases de datos.', 'Construcción de indicadores.', 'Casos aplicados a contratación, presupuesto y ejecución de recursos.']],
  ['Inteligencia artificial', ['Fundamentos y tipos de IA.', 'IA generativa y modelos de lenguaje.', 'Ingeniería de prompts.', 'IA para análisis documental.', 'IA para generación y transformación de información.']],
  ['IA aplicada a la gestión', ['Automatización de tareas.', 'Análisis de documentos y grandes volúmenes de información.', 'Identificación de riesgos y anomalías.', 'Elaboración de informes y reportes.', 'Casos de uso en entidades públicas.']],
  ['Uso responsable de la IA', ['Protección de datos.', 'Seguridad de la información.', 'Sesgos y riesgos de la IA.', 'Transparencia y trazabilidad.', 'Uso responsable de IA en el sector público.']],
];
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const button = (href, text, name = 'arrow-up-right', download = false) => `<a class="button${download ? ' outline' : ''}" href="${href}"${download ? ' download' : ''}>${icon(name)}${text}</a>`;
const footer = `<footer><div><strong>Universidad Santo Tomas</strong><p>Analítica de datos e inteligencia artificial para la gestión pública</p></div><div class="authors">Andrea Cruz Yomayusa<br>Diego Alejandro Vela</div></footer>`;
function shell(title, body, root = './', active = 'index') {
  return `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#003DCC"><meta name="description" content="${esc(course)}. Materiales, actividades y fuentes de consulta."><title>${esc(title)} | Universidad Santo Tomas</title><link rel="stylesheet" href="${root}assets/style.css"><link rel="stylesheet" href="${root}assets/katex/katex.min.css"><script type="module" src="${root}assets/app.js"></script></head><body><a class="skip" href="#contenido">Saltar al contenido</a><div class="utility">UNIVERSIDAD SANTO TOMAS <span>Formación para la gestión pública</span></div><header><a class="brand" href="${root}"><span class="brand-mark">USTA<span></span></span><span>Aula de aprendizaje<small>Datos · Inteligencia artificial</small></span></a><nav aria-label="Principal"><a ${active === 'index' ? 'aria-current="page"' : ''} href="${root}">Programa</a><a ${active === 'session' ? 'aria-current="page"' : ''} href="${root}sesion-1/">Sesión 1</a><a href="${root}sesion-1/#materiales">${icon('folder-down')}<span>Materiales</span></a></nav></header>${body}${footer}</body></html>`;
}
function cards(root = './') {
  return resources.map(([slug, title, desc, symbol], i) => `<article class="resource"><div class="resource-top">${icon(symbol)}<span>0${i + 1}</span></div><h3><a href="${root}${slug}.html">${title}</a></h3><p>${desc}</p><div class="resource-actions"><a href="${root}${slug}.html">Abrir ${icon('arrow-right')}</a><a class="download-icon" href="${root}../descargas/${slug}.md" download title="Descargar ${title}" aria-label="Descargar ${title}">${icon('download')}</a></div></article>`).join('');
}
await rm('dist', { recursive: true, force: true });
await mkdir('dist/sesion-1', { recursive: true });
await mkdir('dist/descargas', { recursive: true });
await mkdir('dist/assets', { recursive: true });
await cp('web/style.css', 'dist/assets/style.css');
await cp('node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2', 'dist/assets/montserrat.woff2');
await cp('node_modules/@fontsource-variable/montserrat/LICENSE', 'dist/assets/montserrat-LICENSE.txt');
await cp('node_modules/katex/dist', 'dist/assets/katex', { recursive: true });
await build({ entryPoints: ['web/app.js'], outdir: 'dist/assets', bundle: true, minify: true, format: 'esm', splitting: true });
await writeFile('dist/.nojekyll', '');

const index = `<main id="contenido"><section class="course-intro"><p class="eyebrow">PROGRAMA DE FORMACIÓN</p><h1>Analítica de Datos e<br>Inteligencia Artificial<br><span>para la Gestión Pública</span></h1><div class="intro-bottom"><p>De la pregunta a la evidencia: datos, herramientas y criterios para comprender la información pública y tomar decisiones informadas.</p>${button('sesion-1/', 'Comenzar la sesión 1', 'arrow-right')}</div></section><section class="program section"><div class="section-heading"><div><p class="eyebrow">RUTA DE APRENDIZAJE</p><h2>El programa, sesión a sesión</h2></div><span class="count">01 disponible / 05 sesiones</span></div><div class="session-list">${sessions.map(([title, topics], i) => `<article class="session-row ${i === 0 ? 'available' : ''}"><div class="session-number">0${i + 1}</div><div class="session-title"><span class="status ${i === 0 ? 'ready' : ''}">${i === 0 ? 'Disponible' : 'Pendiente'}</span><h3>${title}</h3>${i === 0 ? `<a class="text-link" href="sesion-1/">Entrar a la sesión ${icon('arrow-right')}</a>` : ''}</div><ul>${topics.map(t => `<li>${t}</li>`).join('')}</ul></article>`).join('')}</div></section></main>`;
await writeFile('dist/index.html', shell(course, index));
const session = `<main id="contenido"><section class="session-intro section"><a class="breadcrumb" href="../">Programa ${icon('chevron-right')} Sesión 1</a><p class="eyebrow">SESIÓN 01 <span class="status ready">Disponible</span></p><h1>Datos e información<br>para la toma de decisiones</h1><p class="lead">Reconocer las fuentes, comprender los datos y construir indicadores con contexto para la gestión y el control fiscal.</p><div class="actions">${button('guia.html', 'Abrir guía de la sesión', 'book-open')}${button('../descargas/sesion-1.zip', 'Descargar materiales', 'download', true)}</div></section><section class="section learning"><div><p class="eyebrow">PUNTO DE PARTIDA</p><h2>Una buena decisión<br>comienza con una pregunta.</h2><p>Un número aislado no cuenta toda la historia. Su utilidad depende de su procedencia, significado, periodo, calidad y límites.</p></div><ol class="learning-list">${sessions[0][1].map((t, i) => `<li><span>0${i + 1}</span>${t}</li>`).join('')}</ol></section><section class="section materials" id="materiales"><div class="section-heading"><div><p class="eyebrow">LECTURAS Y ACTIVIDADES</p><h2>Materiales de la sesión</h2></div>${button('../descargas/sesion-1.zip', 'Todo en ZIP', 'download', true)}</div><div class="resources">${cards()}</div><div class="dataset-band"><div>${icon('database')}<div><h3>Datos para la práctica de calidad</h3><p>40 registros ficticios · CSV · UTF-8 · Uso académico</p></div></div>${button('../descargas/03_datos_sucios.csv', 'Descargar CSV', 'download', true)}</div></section><section class="closing section"><p class="eyebrow">PARA TENER PRESENTE</p><h2>Una señal no es una conclusión.</h2><p>Una diferencia, un valor atípico o una anomalía requieren contexto, contraste con otras fuentes y evidencia antes de orientar una decisión.</p></section></main>`;
await writeFile('dist/sesion-1/index.html', shell('Sesión 1 · Datos para decidir', session, '../', 'session'));

const files = (await readdir('Sesion_1')).filter(f => f.endsWith('.md')).sort();
if (files.length !== resources.length) throw new Error('Revisar catálogo de materiales');
const zip = new JSZip();
let diagramCount = 0;
for (const [index, file] of files.entries()) {
  const [slug, label] = resources[index];
  const source = await readFile(`Sesion_1/${file}`, 'utf8');
  const divider = source.indexOf('\n---');
  const clean = source.slice(0, divider).split('\n').filter(l => !/^\*\*(Entidad|Duración|Horario):\*\*/.test(l)).join('\n') + source.slice(divider);
  await writeFile(`dist/descargas/${slug}.md`, clean);
  zip.file(`${slug}.md`, clean);
  const title = source.split('\n')[0].replace(/^# /, '');
  let body = clean.slice(clean.indexOf('\n---') + 4).trim();
  if (slug === 'datos-sucios') {
    const csv = marked.lexer(body).find(t => t.type === 'code' && t.lang === 'csv').text + '\n';
    await writeFile('dist/descargas/03_datos_sucios.csv', csv);
    zip.file('03_datos_sucios.csv', csv);
    body = body.replace('Copie el siguiente contenido en un archivo llamado:', 'El conjunto de práctica está disponible en la descarga CSV:');
  }
  body = body.replace(/\\\[([\s\S]*?)\\\]/g, (_, tex) => `\n<div class="formula">${katex.renderToString(tex, { displayMode: true, throwOnError: true })}</div>\n`);
  const headings = [];
  let headingIndex = 0;
  const renderer = new marked.Renderer();
  renderer.heading = function(token) {
    const level = Math.min(token.depth + 1, 6);
    const id = `seccion-${++headingIndex}`;
    const text = this.parser.parseInline(token.tokens);
    if (token.depth === 1) headings.push({ id, text });
    return `<h${level} id="${id}">${text}</h${level}>\n`;
  };
  renderer.code = function({ text, lang }) {
    if (lang === 'mermaid') {
      diagramCount++;
      return `<figure class="diagram"><pre class="mermaid">${esc(text)}</pre><figcaption>Diagrama de la sesión</figcaption></figure>`;
    }
    return `<pre><code${lang ? ` class="language-${esc(lang)}"` : ''}>${esc(text)}</code></pre>`;
  };
  let html = marked.parse(body, { renderer });
  html = html.replace(/<table>/g, '<div class="table-scroll" role="region" aria-label="Tabla de contenido" tabindex="0"><table>').replace(/<\/table>/g, '</table></div>');
  html = html.replace(/<blockquote>\s*<p>\[!(IMPORTANT|TIP|NOTE|CAUTION|WARNING)\]/g, (_, kind) => `<blockquote class="callout ${kind.toLowerCase()}"><p><strong>${({ IMPORTANT: 'Importante', TIP: 'Sugerencia', NOTE: 'Nota', CAUTION: 'Precaución', WARNING: 'Atención' })[kind]}</strong><br>`);
  const nav = `<aside class="sidebar"><a class="back-link" href="./">${icon('arrow-left')} Sesión 1</a><p class="eyebrow">MATERIALES</p><nav aria-label="Materiales de la sesión">${resources.map(([s, t, , sym], i) => `<a href="${s}.html" ${s === slug ? 'aria-current="page"' : ''}>${icon(sym)}<span><small>0${i + 1}</small>${t}</span></a>`).join('')}</nav><a class="sidebar-download" href="../descargas/sesion-1.zip" download>${icon('folder-down')} Descargar todo</a></aside>`;
  const toc = `<details class="toc"><summary>${icon('list')} En esta lectura <span>${headings.length} apartados</span>${icon('chevron-down')}</summary><ol>${headings.map(h => `<li><a href="#${h.id}">${h.text}</a></li>`).join('')}</ol></details>`;
  const article = `<main id="contenido" class="reader-layout">${nav}<div class="reading"><div class="reading-heading"><p class="eyebrow">SESIÓN 01 / MATERIAL 0${index + 1}</p><h1>${esc(title)}</h1><div class="actions">${button(`../descargas/${slug}.md`, 'Descargar material', 'download', true)}${slug === 'datos-sucios' ? button('../descargas/03_datos_sucios.csv', 'Descargar CSV', 'download', true) : ''}<button class="icon-button print-button" title="Imprimir o guardar PDF" aria-label="Imprimir o guardar PDF">${icon('printer')}</button></div></div>${toc}<article class="prose">${html}</article><div class="reader-bottom"><a href="${index > 0 ? resources[index - 1][0] + '.html' : './'}">${icon('arrow-left')} ${index > 0 ? resources[index - 1][1] : 'Sesión 1'}</a>${index < resources.length - 1 ? `<a href="${resources[index + 1][0]}.html">${resources[index + 1][1]} ${icon('arrow-right')}</a>` : '<a href="./">Volver a la sesión</a>'}</div><a class="to-top" href="#contenido">${icon('arrow-up')} Volver arriba</a></div></main>`;
  await writeFile(`dist/sesion-1/${slug}.html`, shell(label, article, '../', 'session'));
}
await writeFile('dist/descargas/sesion-1.zip', await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
console.log(`Sitio generado: 10 páginas, ${diagramCount} diagramas, 8 lecturas y CSV de práctica.`);
