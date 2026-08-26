document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll("[data-service-section]")];
  const links = [...document.querySelectorAll("[data-service-link]")];

  const setActive = (service) => {
    links.forEach((link) => {
      const active = link.dataset.serviceLink === service;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.dataset.serviceSection);
    },
    { rootMargin: "-30% 0px -55%", threshold: [0.05, 0.2, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
  links.forEach((link) => link.addEventListener("click", () => setActive(link.dataset.serviceLink)));

  if (window.location.hash) setActive(window.location.hash.replace("#", ""));
  else if (sections[0]) setActive(sections[0].dataset.serviceSection);
});
