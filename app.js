/* ═══════════════════════════════════════════════════════════════
   app.js — Single-page app with hash routing
   Content is loaded from content/projects/ and content/blogs/
   ═══════════════════════════════════════════════════════════════ */

const CONTENT = 'content';
const app = document.getElementById('app');

// ─── Utilities ────────────────────────────────────────────────────

async function fetchText(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load ${path} (${res.status})`);
  return res.text();
}

async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load ${path} (${res.status})`);
  return res.json();
}

function parseFrontmatter(text) {
  const m = text.match(/^---[\r\n]([\s\S]*?)[\r\n]---[\r\n]?([\s\S]*)$/);
  if (!m) return { meta: {}, content: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const raw = line.slice(colon + 1).trim();
    if (raw.startsWith('[') && raw.endsWith(']')) {
      meta[key] = raw.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    } else {
      meta[key] = raw;
    }
  }
  return { meta, content: m[2].trimStart() };
}

function getExcerpt(markdownContent, words = 35) {
  const lines = markdownContent.split('\n');
  const para = lines.find(l => l.trim() && !l.startsWith('#') && !l.startsWith('---'));
  if (!para) return '';
  const clean = para.replace(/[*_`\[\]()#>!]/g, '').trim();
  const ws = clean.split(/\s+/);
  return ws.slice(0, words).join(' ') + (ws.length > words ? '…' : '');
}

function formatDate(str) {
  if (!str) return '';
  try {
    return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return str;
  }
}

function tagsHtml(tags = [], type = 'blog') {
  if (!tags.length) return '';
  if (type === 'project') {
    return tags.map(t => `<span class="tag tag--plain">${escape(t)}</span>`).join('');
  }
  return tags.map(t =>
    `<a class="tag" href="#/blogs/tag/${encodeURIComponent(t)}">${escape(t)}</a>`
  ).join('');
}

// Cards must be <div> not <a> because tag links inside them are also <a>,
// and nested <a> is invalid HTML — browsers eject the inner links outside the card.
function cardHtml(href, innerHtml) {
  return `<div class="card" role="link" tabindex="0" data-href="${href}" onclick="navigate(event,this)" onkeydown="if(event.key==='Enter')navigate(event,this)">${innerHtml}</div>`;
}

function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function setActiveNav(page) {
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

// ─── Data Loading ──────────────────────────────────────────────────

async function loadList(type) {
  const manifest = await fetchJSON(`${CONTENT}/${type}/_manifest.json`);
  const posts = await Promise.all(
    manifest.map(async filename => {
      const text = await fetchText(`${CONTENT}/${type}/${filename}`);
      const { meta, content } = parseFrontmatter(text);
      return {
        id: filename.replace(/\.md$/, ''),
        filename,
        title: meta.title || filename.replace(/\.md$/, '').replace(/-/g, ' '),
        description: meta.description || getExcerpt(content),
        tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []),
        date: meta.date || '',
        content,
      };
    })
  );
  if (type === 'blogs') {
    posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }
  return posts;
}

// ─── Page: Home ────────────────────────────────────────────────────

function renderHome() {
  setActiveNav('home');
  app.innerHTML = `
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <span class="hero-eyebrow">Hi, I'm</span>
          <h1 class="hero-name">Wenjing Yan</h1>
          <p class="hero-sub">Full-Stack Developer &amp; AI Enthusiast</p>
          <p class="hero-desc">
            I'm fascinated by the space where AI meets human experience —
            from designing smarter tools for language learners to exploring
            how technology can illuminate the inner workings of the mind.
            I build things at the intersection of full-stack development, HCI, and applied AI.
          </p>
          <div class="hero-pills">
            <span class="pill">🌱 Language Education</span>
            <span class="pill">🧠 Psychology &amp; AI</span>
            <span class="pill">⚡ HCI &amp; Design</span>
            <span class="pill">🔧 Full-Stack</span>
          </div>
          <div class="hero-actions">
            <a href="#/projects" class="btn btn-primary">View Projects</a>
            <a href="#/blogs" class="btn btn-outline">Read Blogs</a>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="hero-art-ring ring-1"></div>
          <div class="hero-art-ring ring-2"></div>
          <div class="hero-art-ring ring-3"></div>
          <div class="hero-art-dot"></div>
        </div>
      </div>
    </section>
  `;
}

// ─── Page: Projects Listing ────────────────────────────────────────

async function renderProjects() {
  setActiveNav('projects');
  app.innerHTML = `<div class="page-loading">Loading projects…</div>`;
  try {
    const projects = await loadList('projects');
    app.innerHTML = `
      <section class="page-section">
        <div class="page-header">
          <h1 class="page-title">Projects</h1>
          <p class="page-desc">Things I've built — spanning HCI, AI, language education, and beyond.</p>
        </div>
        <div class="card-grid">
          ${projects.map(p => cardHtml(`#/projects/${p.id}`, `
              <div class="card-body">
                <h2 class="card-title">${escape(p.title)}</h2>
                <p class="card-desc">${escape(p.description)}</p>
              </div>
              <div class="card-footer">
                <div class="card-tags">${tagsHtml(p.tags, 'project')}</div>
                <span class="card-arrow">→</span>
              </div>
          `)).join('')}
        </div>
      </section>
    `;
  } catch (e) {
    app.innerHTML = `<div class="page-error">Couldn't load projects.<br><small>${escape(e.message)}</small></div>`;
  }
}

// ─── Page: Project Detail ──────────────────────────────────────────

async function renderProject(id) {
  setActiveNav('projects');
  app.innerHTML = `<div class="page-loading">Loading…</div>`;
  try {
    const text = await fetchText(`${CONTENT}/projects/${id}.md`);
    const { meta, content } = parseFrontmatter(text);
    const title = meta.title || id.replace(/-/g, ' ');
    const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []);
    app.innerHTML = `
      <article class="post-page">
        <div class="post-back"><a href="#/projects">← All Projects</a></div>
        <header class="post-header">
          <h1 class="post-title">${escape(title)}</h1>
          <div class="post-meta-tags">${tagsHtml(tags, 'project')}</div>
        </header>
        <div class="post-body prose">${marked.parse(content)}</div>
      </article>
    `;
  } catch (e) {
    app.innerHTML = `<div class="page-error">Project not found.<br><small>${escape(e.message)}</small></div>`;
  }
}

// ─── Page: Blogs Listing ───────────────────────────────────────────

async function renderBlogs() {
  setActiveNav('blogs');
  app.innerHTML = `<div class="page-loading">Loading blogs…</div>`;
  try {
    const [posts, tagDefs] = await Promise.all([
      loadList('blogs'),
      fetchJSON(`${CONTENT}/blogs/_tags.json`).catch(() => ({})),
    ]);
    const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();

    app.innerHTML = `
      <section class="page-section">
        <div class="page-header">
          <h1 class="page-title">Blogs</h1>
          <p class="page-desc">Writing on AI, HCI, language learning, and the messy joy of building things.</p>
        </div>
        ${allTags.length ? `
          <div class="tag-nav">
            <span class="tag-nav-label">Browse by tag</span>
            ${allTags.map(t =>
              `<a class="tag tag--nav" href="#/blogs/tag/${encodeURIComponent(t)}">${escape(t)}</a>`
            ).join('')}
          </div>
        ` : ''}
        <div class="card-grid">
          ${posts.map(p => cardHtml(`#/blogs/${p.id}`, `
              <div class="card-body">
                ${p.date ? `<time class="card-date">${formatDate(p.date)}</time>` : ''}
                <h2 class="card-title">${escape(p.title)}</h2>
                <p class="card-desc">${escape(p.description)}</p>
              </div>
              <div class="card-footer">
                <div class="card-tags">${tagsHtml(p.tags)}</div>
                <span class="card-arrow">→</span>
              </div>
          `)).join('')}
        </div>
      </section>
    `;
  } catch (e) {
    app.innerHTML = `<div class="page-error">Couldn't load blogs.<br><small>${escape(e.message)}</small></div>`;
  }
}

// ─── Page: Tag View ────────────────────────────────────────────────

async function renderTag(encodedTag) {
  setActiveNav('blogs');
  const tag = decodeURIComponent(encodedTag);
  app.innerHTML = `<div class="page-loading">Loading…</div>`;
  try {
    const [posts, tagDefs] = await Promise.all([
      loadList('blogs'),
      fetchJSON(`${CONTENT}/blogs/_tags.json`).catch(() => ({})),
    ]);
    const filtered = posts.filter(p => (p.tags || []).includes(tag));
    const info = tagDefs[tag] || {};

    app.innerHTML = `
      <section class="page-section">
        <div class="post-back"><a href="#/blogs">← All Blogs</a></div>
        <div class="page-header tag-page-header">
          <span class="tag-page-badge">${escape(tag)}</span>
          <h1 class="page-title">${escape(tag)}</h1>
          ${info.description ? `<p class="page-desc">${escape(info.description)}</p>` : ''}
        </div>
        <div class="card-grid">
          ${filtered.length ? filtered.map(p => cardHtml(`#/blogs/${p.id}`, `
              <div class="card-body">
                ${p.date ? `<time class="card-date">${formatDate(p.date)}</time>` : ''}
                <h2 class="card-title">${escape(p.title)}</h2>
                <p class="card-desc">${escape(p.description)}</p>
              </div>
              <div class="card-footer">
                <div class="card-tags">${tagsHtml(p.tags)}</div>
                <span class="card-arrow">→</span>
              </div>
          `)).join('') : `<p class="empty-state">No posts with this tag yet.</p>`}
        </div>
      </section>
    `;
  } catch (e) {
    app.innerHTML = `<div class="page-error">Couldn't load tag.<br><small>${escape(e.message)}</small></div>`;
  }
}

// ─── Page: Blog Post ───────────────────────────────────────────────

async function renderBlogPost(id) {
  setActiveNav('blogs');
  app.innerHTML = `<div class="page-loading">Loading…</div>`;
  try {
    const text = await fetchText(`${CONTENT}/blogs/${id}.md`);
    const { meta, content } = parseFrontmatter(text);
    const title = meta.title || id.replace(/-/g, ' ');
    const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []);
    app.innerHTML = `
      <article class="post-page">
        <div class="post-back"><a href="#/blogs">← All Blogs</a></div>
        <header class="post-header">
          ${meta.date ? `<time class="post-date">${formatDate(meta.date)}</time>` : ''}
          <h1 class="post-title">${escape(title)}</h1>
          <div class="post-meta-tags">${tagsHtml(tags)}</div>
        </header>
        <div class="post-body prose">${marked.parse(content)}</div>
      </article>
    `;
  } catch (e) {
    app.innerHTML = `<div class="page-error">Post not found.<br><small>${escape(e.message)}</small></div>`;
  }
}

// ─── Card Navigation (avoids nested <a> invalid HTML) ─────────────

function navigate(event, el) {
  // Let tag <a> clicks bubble normally without triggering card navigation
  if (event.target.closest('a')) return;
  window.location.hash = el.dataset.href;
}

// ─── Router ────────────────────────────────────────────────────────

const routes = [
  [/^\/$/, () => renderHome()],
  [/^\/projects$/, () => renderProjects()],
  [/^\/projects\/(.+)$/, m => renderProject(m[1])],
  [/^\/blogs$/, () => renderBlogs()],
  [/^\/blogs\/tag\/(.+)$/, m => renderTag(m[1])],
  [/^\/blogs\/(.+)$/, m => renderBlogPost(m[1])],
];

function route() {
  const hash = window.location.hash.slice(1) || '/';
  window.scrollTo({ top: 0, behavior: 'instant' });
  for (const [pattern, handler] of routes) {
    const m = hash.match(pattern);
    if (m) { handler(m); return; }
  }
  renderHome();
}

window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', route);
