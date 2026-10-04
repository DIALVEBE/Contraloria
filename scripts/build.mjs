import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { marked } from 'marked';
import katex from 'katex';
import JSZip from 'jszip';
import { build } from 'esbuild';

const course = 'Analítica de Datos e Inteligencia Artificial para la Gestión Pública';
const sourceFile = 'Sesion_1/01_guia_sesion_1_secop.md';
const phases = [
  ['fase-1', 'Fase 1', 'Datos e información', 'Dato, contexto, información, evidencia y decisión.', 'book-open'],
  ['fase-2', 'Fase 2', 'Fuentes de datos públicos', 'Acceso al dataset SECOP II y documentos asociados.', 'database'],
  ['fase-3', 'Fase 3', 'Calidad y gobernanza', 'Revisión, estructuración, trazabilidad y reglas de uso.', 'list-checks'],
  ['fase-4', 'Fase 4', 'Indicadores y métricas', 'Medidas útiles para interpretar la contratación pública.', 'chart-no-axes-combined'],
];
const phaseHeadings = [
  'Datos e información para la toma de decisiones',
  'Tipos y fuentes de datos en el sector público',
  'Calidad, estructuración y gobernanza de datos',
  'Indicadores y métricas para la gestión pública',
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
const footer = `<footer><div><strong>Universidad Santo Tomás</strong><p>Analítica de datos e inteligencia artificial para la gestión pública</p></div><div class="authors">Andrea Cruz Yomayusa<br>Diego Alejandro Vela</div></footer>`;

function shell(title, body, root = './', active = 'index') {
  return `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#003DCC"><meta name="description" content="${esc(course)}. Materiales, actividades y fuentes de consulta."><title>${esc(title)} | Universidad Santo Tomás</title><link rel="icon" href="data:,"><link rel="stylesheet" href="${root}assets/style.css"><link rel="stylesheet" href="${root}assets/katex/katex.min.css"><script type="module" src="${root}assets/app.js"></script></head><body><a class="skip" href="#contenido">Saltar al contenido</a><div class="utility">UNIVERSIDAD SANTO TOMÁS <span>Formación para la gestión pública</span></div><header><a class="brand" href="${root}"><span class="brand-mark">Santoto<span></span></span><span>Aula de aprendizaje<small>Datos · Inteligencia artificial</small></span></a><nav aria-label="Principal"><a ${active === 'index' ? 'aria-current="page"' : ''} href="${root}">Programa</a><a ${active === 'session' ? 'aria-current="page"' : ''} href="${root}sesion-1/">Sesión 1</a><a href="${root}sesion-1/#materiales">${icon('folder-down')}<span>Materiales</span></a></nav></header>${body}${footer}</body></html>`;
}

function phaseCards(root = './') {
  return phases.map(([slug, phase, title, desc, symbol]) => `<article class="resource"><div class="resource-top">${icon(symbol)}<span>${phase}</span></div><h3><a href="${root}${slug}.html">${title}</a></h3><p>${desc}</p><div class="resource-actions"><a href="${root}${slug}.html">Abrir ${icon('arrow-right')}</a><a class="download-icon" href="${root}../descargas/${slug}.md" download title="Descargar ${title}" aria-label="Descargar ${title}">${icon('download')}</a></div></article>`).join('');
}

function cleanMetadata(source) {
  return source.split('\n').filter(line => !/^\*\*(Entidad|Duración|Horario):\*\*/.test(line)).join('\n');
}

function splitGuide(source) {
  const clean = cleanMetadata(source);
  const firstPhase = clean.search(/^# (?!Sesión)/m);
  if (firstPhase === -1) throw new Error('No se encontraron fases en la guía de sesión 1');
  const intro = clean.slice(0, firstPhase).replace(/^# .+\n+/, '').trim();
  const phaseText = clean.slice(firstPhase).trim();
  const matches = phaseHeadings.map(heading => {
    const pattern = new RegExp(`^# ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm');
    const match = pattern.exec(phaseText);
    if (!match) throw new Error(`No se encontró la fase: ${heading}`);
    return match;
  });
  const sections = matches.map((match, index) => {
    const start = match.index;
    const end = matches[index + 1]?.index ?? phaseText.length;
    return phaseText.slice(start, end).trim();
  });
  return { intro, sections, full: `${intro}\n\n${sections.join('\n\n')}\n` };
}

function renderMarkdown(markdown, phaseNumber = null) {
  let body = markdown.replace(/\\\[([\s\S]*?)\\\]/g, (_, tex) => `\n<div class="formula">${katex.renderToString(tex, { displayMode: true, throwOnError: true })}</div>\n`);
  const headings = [];
  let headingIndex = 0;
  let diagramCount = 0;
  const renderer = new marked.Renderer();
  renderer.heading = function(token) {
    const depth = phaseNumber === null ? token.depth : Math.min(token.depth + 1, 6);
    const id = `seccion-${++headingIndex}`;
    const text = this.parser.parseInline(token.tokens);
    if ((phaseNumber === null && token.depth <= 2) || (phaseNumber !== null && token.depth === 1)) headings.push({ id, text });
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
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
  return { html, headings, diagramCount };
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

const { intro, sections, full } = splitGuide(await readFile(sourceFile, 'utf8'));
const zip = new JSZip();
zip.file('guia-sesion-1-secop.md', full);
await writeFile('dist/descargas/guia-sesion-1-secop.md', full);

const index = `<main id="contenido"><section class="course-intro"><p class="eyebrow">PROGRAMA DE FORMACIÓN</p><h1>Analítica de Datos e<br>Inteligencia Artificial<br><span>para la Gestión Pública</span></h1><div class="intro-bottom"><p>De la pregunta a la evidencia: datos, herramientas y criterios para comprender la información pública y tomar decisiones informadas.</p>${button('sesion-1/', 'Comenzar la sesión 1', 'arrow-right')}</div></section><section class="program section"><div class="section-heading"><div><p class="eyebrow">RUTA DE APRENDIZAJE</p><h2>El programa, sesión a sesión</h2></div><span class="count">01 disponible / 05 sesiones</span></div><div class="session-list">${sessions.map(([title, topics], i) => `<article class="session-row ${i === 0 ? 'available' : ''}"><div class="session-number">0${i + 1}</div><div class="session-title"><span class="status ${i === 0 ? 'ready' : ''}">${i === 0 ? 'Disponible' : 'Pendiente'}</span><h3>${title}</h3>${i === 0 ? `<a class="text-link" href="sesion-1/">Entrar a la sesión ${icon('arrow-right')}</a>` : ''}</div><ul>${topics.map(t => `<li>${t}</li>`).join('')}</ul></article>`).join('')}</div></section></main>`;
await writeFile('dist/index.html', shell(course, index));

const introRendered = renderMarkdown(intro);
const session = `<main id="contenido"><section class="session-intro section"><a class="breadcrumb" href="../">Programa ${icon('chevron-right')} Sesión 1</a><p class="eyebrow">SESIÓN 01 <span class="status ready">Disponible</span></p><h1>Datos e información<br>para la toma de decisiones</h1><p class="lead">Trabajo aplicado con SECOP II para comprender datos públicos, obtener información oficial, revisar calidad y construir indicadores de gestión pública.</p><div class="actions">${button('fase-1.html', 'Iniciar fase 1', 'book-open')}${button('../descargas/sesion-1.zip', 'Descargar materiales', 'download', true)}</div></section><section class="section learning"><div><p class="eyebrow">RECORRIDO DE LA SESIÓN</p><h2>Cuatro fases para pasar del dato a la evidencia.</h2><p>La actividad se concentra en registros de contratación pública de Boyacá, con énfasis en fuente oficial, trazabilidad y uso responsable de los resultados.</p></div><ol class="learning-list">${phases.map(([, phase, title, desc], i) => `<li><span>0${i + 1}</span><div><strong>${phase}: ${title}</strong><small>${desc}</small></div></li>`).join('')}</ol></section><section class="section materials" id="materiales"><div class="section-heading"><div><p class="eyebrow">LECTURA Y ACTIVIDADES</p><h2>Fases de la sesión</h2></div>${button('../descargas/sesion-1.zip', 'Todo en ZIP', 'download', true)}</div><div class="resources four-phases">${phaseCards()}</div><div class="dataset-band"><div>${icon('database')}<div><h3>Fuente principal de trabajo</h3><p>SECOP II · Procesos de contratación · Dataset p6dx-8zbt</p></div></div>${button('https://www.datos.gov.co/w/p6dx-8zbt', 'Abrir fuente oficial', 'external-link')}</div></section><section class="section guide-summary"><div class="section-heading"><div><p class="eyebrow">PROPÓSITO</p><h2>Guía de trabajo</h2></div>${button('../descargas/guia-sesion-1-secop.md', 'Descargar guía completa', 'download', true)}</div><article class="prose">${introRendered.html}</article></section><section class="closing section"><p class="eyebrow">PARA TENER PRESENTE</p><h2>Una señal no es una conclusión.</h2><p>Una diferencia, un valor atípico o una anomalía requieren contexto, contraste con otras fuentes y evidencia antes de orientar una decisión.</p></section></main>`;
await writeFile('dist/sesion-1/index.html', shell('Sesión 1 · Datos para decidir', session, '../', 'session'));

let diagramCount = introRendered.diagramCount;
for (const [index, markdown] of sections.entries()) {
  const [slug, phase, label] = phases[index];
  const download = `${markdown}\n`;
  await writeFile(`dist/descargas/${slug}.md`, download);
  zip.file(`${slug}.md`, download);
  const { html, headings, diagramCount: phaseDiagrams } = renderMarkdown(markdown, index + 1);
  diagramCount += phaseDiagrams;
  const nav = `<aside class="sidebar"><a class="back-link" href="./">${icon('arrow-left')} Sesión 1</a><p class="eyebrow">FASES</p><nav aria-label="Fases de la sesión">${phases.map(([s, p, t, , sym]) => `<a href="${s}.html" ${s === slug ? 'aria-current="page"' : ''}>${icon(sym)}<span><small>${p}</small>${t}</span></a>`).join('')}</nav><a class="sidebar-download" href="../descargas/sesion-1.zip" download>${icon('folder-down')} Descargar todo</a></aside>`;
  const toc = `<details class="toc"><summary>${icon('list')} En esta fase <span>${headings.length} apartados</span>${icon('chevron-down')}</summary><ol>${headings.map(h => `<li><a href="#${h.id}">${h.text}</a></li>`).join('')}</ol></details>`;
  const article = `<main id="contenido" class="reader-layout">${nav}<div class="reading"><div class="reading-heading"><p class="eyebrow">SESIÓN 01 / ${phase.toUpperCase()}</p><h1>${esc(label)}</h1><div class="actions">${button(`../descargas/${slug}.md`, 'Descargar fase', 'download', true)}<button class="icon-button print-button" title="Imprimir o guardar PDF" aria-label="Imprimir o guardar PDF">${icon('printer')}</button></div></div>${toc}<article class="prose">${html}</article><div class="reader-bottom"><a href="${index > 0 ? phases[index - 1][0] + '.html' : './'}">${icon('arrow-left')} ${index > 0 ? phases[index - 1][2] : 'Sesión 1'}</a>${index < phases.length - 1 ? `<a href="${phases[index + 1][0]}.html">${phases[index + 1][2]} ${icon('arrow-right')}</a>` : '<a href="./">Volver a la sesión</a>'}</div><a class="to-top" href="#contenido">${icon('arrow-up')} Volver arriba</a></div></main>`;
  await writeFile(`dist/sesion-1/${slug}.html`, shell(`${phase} · ${label}`, article, '../', 'session'));
}

await writeFile('dist/descargas/sesion-1.zip', await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
console.log(`Sitio generado: 6 páginas, ${diagramCount} diagramas y 4 fases de la sesión 1.`);
