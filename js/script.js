/* =========================================
   Portfólio da Ludmily — script.js
   ========================================= */

// Avisa o CSS que o JavaScript está ativo (para as animações)
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Ano atual no rodapé ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Menu hambúrguer (celular) ---------- */
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));

  // Fecha o menu ao clicar em um link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  /* ---------- Destaca no menu a seção visível ---------- */
  const links = menu.querySelectorAll("a");
  const sections = document.querySelectorAll("main section[id]");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Elementos aparecem ao rolar ---------- */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Botão "voltar ao topo" ---------- */
  const toTop = document.getElementById("to-top");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 500);
  });

  /* ---------- Texto digitando no início ---------- */
  const typingEl = document.getElementById("typing-text");
  const words = ["desenvolvimento web", "resolver problemas", "fotografia", "música", "aprender coisas novas"];
  let wordIndex = 0;
  let charIndex = words[0].length;
  let deleting = true;

  function type() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    typingEl.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 90;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }
    setTimeout(type, delay);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTimeout(type, 1800);
  }

  /* ---------- Copiar e-mail ---------- */
  const copyBtn = document.getElementById("copy-email");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("ludmily2007@gmail.com");
      copyBtn.textContent = "E-mail copiado! ♡";
    } catch {
      copyBtn.textContent = "ludmily2007@gmail.com";
    }
    setTimeout(() => (copyBtn.textContent = "Copiar e-mail"), 2500);
  });
});
