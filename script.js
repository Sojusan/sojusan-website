(function () {
  var EN = {
    tagline: "Programmer and gamer.",
    cta_subscribe: "Subscribe on YouTube",
    about_h: "About",
    about_p: "Hi, I'm Rafał, also known as Sojusan. I build my own web projects and record full gameplay videos with my commentary. Everything lives here in one place.",
    projects_h: "Projects",
    projects_p: "I'm a programmer and every now and then I build something. You'll find all my apps in the SojusanApps organization on GitHub.",
    gl_pitch: "Track, rate and discover games",
    gl_p: "Sojusan GameList helps you keep track of the games you play, rate and review them, build collections and compare lists with friends.",
    gl_t1: "🎮 Game tracking",
    gl_t2: "⭐ Ratings & reviews",
    gl_note: "Interface: Polish and English",
    visit: "Visit",
    soon: "More coming soon",
    channel_h: "YouTube channel",
    channel_p: "Full gameplay with my commentary.",
    channel_note: "Commentary: Polish",
    f1_h: "Full playthroughs",
    f1_p: "Whole games from start to finish, no cuts or shortcuts.",
    f2_h: "Live commentary",
    f2_p: "Every episode with my Polish commentary.",
    visit_channel: "Visit channel",
    contact_h: "Links & contact",
    email: "✉️ Email",
    badge1: "🎮 Gameplay",
    badge2: "🎙️ Commentary",
    badge3: "💻 Web dev"
  };
  var nodes = document.querySelectorAll("[data-i18n]");
  var pl = {};
  nodes.forEach(function (n) { pl[n.dataset.i18n] = n.textContent; });
  var meta = {
    pl: { title: "Rafał „Sojusan” Grzegorczyk", desc: document.querySelector('meta[name=description]').content },
    en: { title: "Rafał “Sojusan” Grzegorczyk", desc: "Sojusan – creator of gamelist.sojusan.pl and a YouTube channel with full gameplay and commentary." }
  };

  function store(v) { try { return v ? localStorage.setItem("lang", v) : localStorage.getItem("lang"); } catch (e) { return null; } }

  function apply(lang) {
    var dict = lang === "en" ? EN : pl;
    nodes.forEach(function (n) { n.textContent = dict[n.dataset.i18n]; });
    document.documentElement.lang = lang;
    document.title = meta[lang].title;
    document.querySelector('meta[name=description]').content = meta[lang].desc;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }

  function valid(v) { return v === "pl" || v === "en" ? v : null; }
  var q = valid(new URLSearchParams(location.search).get("lang"));
  var lang = q || valid(store()) || "pl";
  apply(lang);

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { store(b.dataset.lang); apply(b.dataset.lang); });
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // --- fancy bits (skipped for reduced motion) ---
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (calm || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  }
  if (!calm) {
    var glow = document.querySelector(".cursor-glow");
    window.addEventListener("pointermove", function (e) {
      glow.style.transform = "translate(" + (e.clientX - 200) + "px," + (e.clientY - 200) + "px)";
      glow.style.opacity = 1;
    });
    document.querySelectorAll(".tilt").forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = "perspective(800px) rotateY(" + x * 8 + "deg) rotateX(" + -y * 8 + "deg) translateY(-4px)";
      });
      c.addEventListener("pointerleave", function () { c.style.transform = ""; });
    });
  }
})();
