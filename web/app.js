import { createIcons, ArrowRight, ArrowLeft, ArrowUp, ArrowUpRight, BookOpen, Network, ScanSearch, ListTree, FileSearch, ChartNoAxesCombined, MapPin, ExternalLink, Download, FolderDown, ChevronRight, ChevronDown, Database, Printer, List, Copy, Check, ListChecks } from 'lucide';

const icons = { ArrowRight, ArrowLeft, ArrowUp, ArrowUpRight, BookOpen, Network, ScanSearch, ListTree, FileSearch, ChartNoAxesCombined, MapPin, ExternalLink, Download, FolderDown, ChevronRight, ChevronDown, Database, Printer, List, Copy, Check, ListChecks };
const refreshIcons = () => createIcons({ icons });
refreshIcons();
document.querySelector('.print-button')?.addEventListener('click', () => window.print());
document.querySelectorAll('.prose pre:not(.mermaid)').forEach(pre => {
  const code = pre.querySelector('code');
  if (!code?.textContent.trim()) return;
  const button = document.createElement('button');
  button.className = 'copy-button icon-button';
  button.title = 'Copiar';
  button.setAttribute('aria-label', 'Copiar contenido');
  button.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i>';
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.innerHTML = '<i data-lucide="check" aria-hidden="true"></i>';
      button.title = 'Copiado';
      refreshIcons();
      setTimeout(() => { button.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i>'; button.title = 'Copiar'; refreshIcons(); }, 1800);
    } catch { button.title = 'Seleccione el texto para copiar'; }
  });
  pre.append(button);
});
refreshIcons();
const checks = [...document.querySelectorAll('.prose input[type="checkbox"]')];
checks.forEach((input, index) => {
  input.disabled = false;
  input.setAttribute('aria-label', input.parentElement.textContent.trim());
  const key = `curso:${location.pathname}:check:${index}`;
  try { input.checked = localStorage.getItem(key) === 'true'; } catch {}
  input.addEventListener('change', () => { try { localStorage.setItem(key, input.checked); } catch {} });
});
if (document.querySelector('.mermaid')) {
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'base', themeVariables: { primaryColor: '#eaf1ff', primaryTextColor: '#172033', primaryBorderColor: '#003dcc', lineColor: '#64748b', secondaryColor: '#fff5c2', tertiaryColor: '#f6f7f9', fontFamily: 'Arial, sans-serif', fontSize: '16px' }, flowchart: { htmlLabels: false, useMaxWidth: true, wrappingWidth: 180 } });
  const nodes = [...document.querySelectorAll('.mermaid')];
  for (const node of nodes) {
    try {
      await mermaid.run({ nodes: [node] });
      const svg = node.querySelector('svg');
      if (svg) { svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Diagrama: ' + [...svg.querySelectorAll('.nodeLabel')].map(n => n.textContent).join(', ')); }
    } catch { node.closest('figure').querySelector('figcaption').textContent = 'Diagrama disponible en el material descargable.'; }
  }
  document.documentElement.dataset.diagrams = 'ready';
}
