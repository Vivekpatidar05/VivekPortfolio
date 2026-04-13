/**
 * VIVEK PATIDAR — script.js
 * Fast, minimal. No custom scroll. No cursor loops.
 * ─────────────────────────────────────────────────
 * ✦ EDIT YOUR CONTENT IN THE CONFIG SECTION BELOW
 */

/* ══════════════════════════════════════════════════
   ✦ CONFIG — Edit all your content here
══════════════════════════════════════════════════ */

// EmailJS credentials — get free at https://www.emailjs.com
const EJS_KEY = "1xXjjLFMhENxJsCpF";   // Account → API Keys
const EJS_SVC = "service_juw4n2j";   // Email Services tab
const EJS_TPL = "template_1zbhyjj";  // Email Templates tab

// Typewriter phrases — add or remove lines freely
const TW = [
  "responsive interfaces.",
  "interactive web apps.",
  "data-driven dashboards.",
  "clean, maintainable code.",
  "beautiful experiences.",
];

// ── PROJECTS ─────────────────────────────────────
// To add a project: copy one block, paste at end of array, fill in.
// category: "fullstack" | "frontend" | "datascience" | "design"
// thumb: image URL or "" (shows colour gradient)
// live / github: URL or "" (hides button)
const PROJECTS = [
  {
    id: "p1",
    title:    "College ERP System",
    category: "fullstack",
    thumb:    "",           // ← e.g. "https://i.imgur.com/abc.jpg"
    grad:     "linear-gradient(135deg,#c8607f,#7b3d9e 60%,#1a0828)",
    short:    "Full-stack ERP with 8 modules — students, attendance, grades, fees, library, and admin.",
    full:     "A comprehensive Enterprise Resource Planning system for college administration covering 8 modules: Student Management, Attendance Tracking, Grade Management, Fee Collection, Library System, Faculty Management, Timetable, and Admin Dashboard — all with full CRUD, validation, and a responsive dark-themed UI.",
    tech:     ["Flask", "MongoDB", "JavaScript", "HTML5", "CSS3", "REST API", "Jinja2"],
    live:     "",           // ← e.g. "https://my-erp.netlify.app"
    github:   "",           // ← e.g. "https://github.com/vivek/erp"
    year:     "2025",
  },
  {
    id: "p2",
    title:    "Agri-Environmental Infographics",
    category: "datascience",
    thumb:    "",
    grad:     "linear-gradient(135deg,#1a6b3a,#0d4428 60%,#060f08)",
    short:    "Multi-chart data visualizations exploring agriculture, environment & human health.",
    full:     "A data science project visualizing One Health and Agri-Environmental Informatics frameworks using real Kaggle datasets. Multi-chart infographics across four thematic areas, built with Matplotlib, Seaborn, and interactive Plotly dashboards.",
    tech:     ["Python", "Matplotlib", "Seaborn", "Plotly", "Pandas", "NumPy", "Kaggle"],
    live:     "",
    github:   "",
    year:     "2025",
  },
  {
    id: "p3",
    title:    "Ashtanga Yoga Presentation",
    category: "design",
    thumb:    "",
    grad:     "linear-gradient(135deg,#b5541e,#7b2d10 60%,#1a0a05)",
    short:    "Hindi-language Ashtanga Yoga deck with a Rajasthani visual aesthetic — generated with pptxgenjs.",
    full:     "A visually rich Hindi-language Ashtanga Yoga presentation redesigned with a Rajasthani aesthetic. Programmatically generated using pptxgenjs with custom slide layouts, traditional colour palettes, and cultural motifs — every slide crafted through code for easy future updates.",
    tech:     ["pptxgenjs", "JavaScript", "Hindi Content", "Cultural Design", "Typography"],
    live:     "",
    github:   "",
    year:     "2025",
  },
  // ✦ ADD MORE PROJECTS — copy the block above and fill in:
  // {
  //   id: "p4", title: "My New Project", category: "frontend",
  //   thumb: "https://your-image.jpg", grad: "linear-gradient(135deg,#c8607f,#3d1b2a)",
  //   short: "Short card description.", full: "Longer popup description.",
  //   tech: ["React", "CSS", "Firebase"], live: "", github: "", year: "2025",
  // },
];

/* ══════════════════════════════════════════════════
   ENGINE — no need to edit below this line
══════════════════════════════════════════════════ */

const $ = id => document.getElementById(id);
const $$ = s => document.querySelectorAll(s);

// Init EmailJS once loaded
if (typeof emailjs !== "undefined") emailjs.init(EJS_KEY);
window.addEventListener("load", () => {
  if (typeof emailjs !== "undefined") emailjs.init(EJS_KEY);
});

/* ── Scroll: throttled with one rAF tick ── */
{
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const sy  = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      $("sp").style.width = (max > 0 ? (sy / max) * 100 : 0) + "%";
      $("nav").classList.toggle("up", sy > 50);
      $("btt").classList.toggle("on", sy > 400);
      // Active nav link
      let cur = "";
      $$("section[id]").forEach(s => { if (sy >= s.offsetTop - 160) cur = s.id; });
      $$(".nl").forEach(a => a.classList.toggle("act", a.getAttribute("href") === "#" + cur));
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

/* ── Back to top ── */
$("btt").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ── Theme toggle ── */
{
  const html = document.documentElement;
  const ico  = $("themeIco");
  const apply = t => {
    html.setAttribute("data-theme", t);
    ico.className = t === "dark" ? "fas fa-moon" : "fas fa-sun";
    localStorage.setItem("vp-theme", t);
  };
  apply(localStorage.getItem("vp-theme") || "dark");
  $("themeBtn").addEventListener("click", () =>
    apply(html.dataset.theme === "dark" ? "light" : "dark")
  );
}

/* ── Mobile nav ── */
{
  const nav = $("mobNav");
  const bg  = $("mobBg");
  const ham = $("ham");
  const open = () => {
    nav.classList.add("open"); bg.classList.add("open");
    ham.classList.add("open"); ham.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    nav.classList.remove("open"); bg.classList.remove("open");
    ham.classList.remove("open"); ham.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  ham.addEventListener("click", () => nav.classList.contains("open") ? close() : open());
  bg.addEventListener("click", close);
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { close(); closeModal(); }
  });
}

/* ── Scroll reveal (IntersectionObserver) ── */
{
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
  }, { threshold: 0.1, rootMargin: "0px 0px -32px 0px" });
  $$(".reveal").forEach(el => obs.observe(el));
}

/* ── Counter animation ── */
{
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, n = +el.dataset.count;
      if (!n) return;
      let v = 0;
      const step = () => { el.textContent = (++v) + "+"; if (v < n) setTimeout(step, 80); };
      step(); obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach(el => obs.observe(el));
}

/* ── Typewriter ── */
{
  const el = $("tw");
  let pi = 0, ci = 0, del = false;
  const tick = () => {
    const w = TW[pi];
    del ? (el.textContent = w.slice(0, --ci)) : (el.textContent = w.slice(0, ++ci));
    if (!del && ci === w.length) { del = true; setTimeout(tick, 1800); return; }
    if (del && ci === 0) { del = false; pi = (pi + 1) % TW.length; }
    setTimeout(tick, del ? 35 : 65);
  };
  setTimeout(tick, 800);
}

/* ── Toast ── */
let toastTimer;
function toast(msg, ms = 3000) {
  const el = $("toast");
  el.textContent = msg; el.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("on"), ms);
}
$$("[download]").forEach(a => a.addEventListener("click", () => toast("📄 Resume downloading…")));

/* ── Category helpers ── */
const CAT_C = { fullstack:"c-fs", frontend:"c-fe", datascience:"c-ds", design:"c-de" };
const CAT_L = { fullstack:"Full Stack", frontend:"Frontend", datascience:"Data Science", design:"Design" };

/* ── Render projects ── */
function renderProjects(filter = "all") {
  const grid = $("pg");
  grid.innerHTML = "";
  const list = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  if (!list.length) {
    grid.innerHTML = `<div class="proj-empty">No projects in this category yet.</div>`;
    return;
  }

  list.forEach(p => {
    const thumb = p.thumb
      ? `<img src="${p.thumb}" alt="${p.title}" loading="lazy"/>`
      : `<div class="proj-thumb-grad" style="background:${p.grad}"></div>`;

    const el = document.createElement("article");
    el.className = "proj-card reveal";
    el.innerHTML = `
      <div class="proj-thumb">${thumb}</div>
      <div class="proj-body">
        <div class="proj-cat ${CAT_C[p.category]||"c-fs"}">${CAT_L[p.category]||p.category}</div>
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.short}</p>
        <div class="proj-chips">${p.tech.slice(0,4).map(t=>`<span class="chip">${t}</span>`).join("")}</div>
        <div class="proj-btns">
          ${p.live   ? `<a href="${p.live}"   target="_blank" rel="noopener" class="pb-l"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ""}
          <button class="pb-g" data-id="${p.id}"><i class="fas fa-info-circle"></i> Details</button>
        </div>
      </div>`;
    el.querySelector(".pb-g").addEventListener("click", () => openModal(p.id));
    grid.appendChild(el);
    revObs.observe(el);
  });
}

// Shared reveal observer for dynamic cards
const revObs = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
}, { threshold: 0.1, rootMargin: "0px 0px -32px 0px" });

renderProjects();

// Filter buttons
$("filt").addEventListener("click", e => {
  const btn = e.target.closest(".fb");
  if (!btn) return;
  $$(".fb").forEach(b => b.classList.remove("act"));
  btn.classList.add("act");
  renderProjects(btn.dataset.f);
});

/* ── Project modal ── */
function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const th = p.thumb ? `<img src="${p.thumb}" alt="${p.title}"/>` : `<div class="modal-img-g" style="background:${p.grad}"></div>`;
  $("mImg").innerHTML = th;
  $("mCat").textContent = CAT_L[p.category] || p.category;
  $("mTitle").textContent = p.title;
  $("mYr").textContent = p.year;
  $("mDesc").textContent = p.full;
  $("mTech").innerHTML = p.tech.map(t => `<span>${t}</span>`).join("");
  $("mActs").innerHTML = [
    p.live   ? `<a href="${p.live}"   target="_blank" rel="noopener" class="ma-l"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : "",
    p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="ma-g"><i class="fab fa-github"></i> View on GitHub</a>` : "",
  ].join("");
  $("modal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("modal").classList.remove("open");
  document.body.style.overflow = "";
}
$("modalX").addEventListener("click", closeModal);
$("modal").addEventListener("click", e => { if (e.target === $("modal")) closeModal(); });

/* ── Experience section: hide "empty" if entries exist ── */
{
  const list = $("expList");
  const empty = $("expEmpty");
  if (list && empty) {
    // If any .exp-card children are found, hide the empty state
    const cards = list.querySelectorAll(".exp-card");
    if (cards.length > 0) empty.style.display = "none";
  }
}

/* ── Contact form ── */
$("cForm").addEventListener("submit", async e => {
  e.preventDefault();
  const btn = $("cBtn"), ico = $("cIco"), txt = $("cTxt"), msg = $("fMsg");
  btn.disabled = true; ico.className = "fas fa-spinner fa-spin"; txt.textContent = "Sending…";
  msg.className = "f-msg";

  if (EJS_KEY === "YOUR_PUBLIC_KEY") {
    msg.textContent = "⚠️ EmailJS not configured — see the HTML comment in the contact section for setup instructions.";
    msg.className = "f-msg err"; btn.disabled = false; ico.className = "fas fa-paper-plane"; txt.textContent = "Send Message"; return;
  }
  try {
    await emailjs.send(EJS_SVC, EJS_TPL, {
      from_name:  e.target.from_name.value,
      from_email: e.target.from_email.value,
      phone:      e.target.phone.value || "Not provided",
      subject:    e.target.subject.value,
      message:    e.target.message.value,
    });
    msg.textContent = "✓ Message sent! I'll reply within 24 hours — thank you!";
    msg.className = "f-msg ok";
    e.target.reset();
    toast("✓ Message sent!");
  } catch {
    msg.textContent = "✗ Something went wrong. Email me directly: patidarvivek333@gmail.com";
    msg.className = "f-msg err";
  }
  btn.disabled = false; ico.className = "fas fa-paper-plane"; txt.textContent = "Send Message";
});

/* ── Secret admin access (for Project Manager reference export)
   Desktop: Ctrl+Shift+A
   Desktop: Click footer logo 5× quickly
   Mobile:  Long-press footer logo 1.5s        ── */
{
  const exportProjects = () => {
    const json = JSON.stringify(PROJECTS, null, 2);
    const blob = new Blob([`// Paste this as the PROJECTS array in js/script.js\nconst PROJECTS = ${json};`], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "projects-export.js"; a.click();
    toast("📁 Projects config downloaded as projects-export.js");
  };

  // Keyboard shortcut
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "A") { e.preventDefault(); exportProjects(); }
  });

  // Click footer logo 5× within 3s
  let clicks = 0, clickTimer;
  $("footLogo").addEventListener("click", () => {
    clicks++; clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clicks = 0; }, 3000);
    if (clicks >= 5) { clicks = 0; exportProjects(); }
  });

  // Long-press on mobile
  let pressTimer;
  $("footLogo").addEventListener("touchstart", () => {
    pressTimer = setTimeout(() => { exportProjects(); navigator.vibrate && navigator.vibrate(40); }, 1500);
  }, { passive: true });
  $("footLogo").addEventListener("touchend",  () => clearTimeout(pressTimer), { passive: true });
  $("footLogo").addEventListener("touchmove", () => clearTimeout(pressTimer), { passive: true });
}
