document.addEventListener("DOMContentLoaded", () => {
  const route = document.querySelector(".hero-route");
  const routeLine = route?.querySelector(".hero-route__line");
  const routeProgress = routeLine?.querySelector(".hero-route__progress");
  const routeDot = route?.querySelector(".hero-route__dot");
  const stops = [...document.querySelectorAll("[data-route-stop]")];
  const status = document.querySelector(".hero-route__status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const routeLabels = [
    "Road freight for flexible international routes",
    "Sea freight for efficient long-distance shipping",
    "Cargo shipping matched to the load",
    "Air freight for time-critical delivery"
  ];
  let activeIndex = 0;
  let timer = null;

  const selectStop = (index) => {
    activeIndex = index;
    if (routeLine && routeDot) {
      const availableWidth = Math.max(0, routeLine.clientWidth - routeDot.offsetWidth);
      routeDot.style.setProperty("--active-stop-distance", `${(availableWidth * index) / Math.max(1, stops.length - 1)}px`);
    }
    routeProgress?.style.setProperty("--active-stop-progress", `${(100 * index) / Math.max(1, stops.length - 1)}%`);
    route?.setAttribute("data-route", String(index));
    stops.forEach((stop, stopIndex) => {
      const isActive = stopIndex === index;
      stop.classList.toggle("is-active", isActive);
      stop.setAttribute("aria-pressed", String(isActive));
    });
    if (status) status.textContent = window.TOJDORON_I18N?.t(routeLabels[index]) || routeLabels[index] || "";
  };

  const stopRotation = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const startRotation = () => {
    if (reduceMotion || timer || stops.length < 2) return;
    timer = window.setInterval(() => selectStop((activeIndex + 1) % stops.length), 4200);
  };

  stops.forEach((stop, index) => {
    stop.addEventListener("click", () => selectStop(index));
    stop.addEventListener("focus", stopRotation);
  });

  document.addEventListener("tojdoron:languagechange", () => selectStop(activeIndex));

  route?.addEventListener("pointerenter", stopRotation);
  route?.addEventListener("pointerleave", startRotation);
  route?.addEventListener("focusout", (event) => {
    if (!route.contains(event.relatedTarget)) startRotation();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopRotation();
    else startRotation();
  });

  window.addEventListener("resize", () => selectStop(activeIndex));

  selectStop(0);
  startRotation();
});
