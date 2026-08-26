document.documentElement.classList.add("js");

const reducePageMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pageTransition = document.createElement("div");
pageTransition.className = "page-transition";
pageTransition.setAttribute("aria-hidden", "true");
pageTransition.innerHTML = '<img class="page-transition__logo" src="assets/tojdoron-logo-green-v2.png" alt="" width="629" height="440" />';
document.body.prepend(pageTransition);

if (reducePageMotion) {
  pageTransition.classList.add("is-entered");
} else {
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => pageTransition.classList.add("is-entered")));
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const menuLinks = document.querySelectorAll(".nav-menu a");
  const years = document.querySelectorAll("[data-year]");

  years.forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willOpen));
    menu?.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("nav-open", willOpen);
  });

  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 928) closeMenu();
  });

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const revealItems = document.querySelectorAll("[data-reveal]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target || link.hasAttribute("download")) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
    if (!destination.pathname.endsWith(".html") && !destination.pathname.endsWith("/")) return;

    event.preventDefault();
    closeMenu();
    if (reducePageMotion) {
      window.location.href = destination.href;
      return;
    }

    pageTransition.className = "page-transition is-leaving";
    window.requestAnimationFrame(() => pageTransition.classList.add("is-covering"));
    window.setTimeout(() => {
      window.location.href = destination.href;
    }, 310);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px 5%", threshold: 0.01 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
});
