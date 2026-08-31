document.addEventListener("DOMContentLoaded", () => {
  const setupPartnerLoop = () => {
    const root = document.querySelector("[data-partner-loop]");
    if (!root) return;

    const stage = root.querySelector(".partner-loop__stage");
    const cards = [...root.querySelectorAll(".partner-loop__card")];
    const controlButtons = [...root.querySelectorAll("[data-partner-loop-dir]")];
    if (!stage || cards.length < 2) return;

    const state = {
      frameId: 0,
      lastProgress: 0,
      lastTimestamp: 0,
      stepSpacing: 220,
      speed: 0.00042,
      resumeTimer: 0,
    };

    const updateMetrics = () => {
      const stageWidth = stage.clientWidth;
      state.stepSpacing = stageWidth < 760 ? 132 : 220;
      state.speed = stageWidth < 760 ? 0.0003 : 0.00042;
    };

    const normalizeProgress = (value) => {
      const count = cards.length;
      return ((value % count) + count) % count;
    };

    const wrapDistance = (value, count) => {
      let distance = value % count;
      if (distance > count / 2) distance -= count;
      if (distance < -count / 2) distance += count;
      return distance;
    };

    const renderCards = (progress) => {
      const count = cards.length;
      const isMobile = stage.clientWidth < 760;

      cards.forEach((card, index) => {
        const relative = wrapDistance(index - progress, count);
        const absRelative = Math.abs(relative);
        const direction = Math.sign(relative) || 1;

        if (isMobile) {
          const distance = Math.min(absRelative, 2.8);
          const scale = absRelative <= 1.2
            ? 1 - distance * 0.12
            : 0.86 - Math.min(absRelative - 1.2, 1.6) * 0.23;
          const opacity = absRelative <= 2.25
            ? 1 - distance * 0.22
            : Math.max(0, 0.34 - (absRelative - 2.25) * 0.24);
          const x = relative * 112;
          const y = Math.min(absRelative, 2.6) * 15;
          const rotateY = -relative * 4;

          card.style.transform = `translate(-50%, -50%) translateX(${x.toFixed(2)}px) translateY(${y.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${Math.max(scale, 0.01).toFixed(3)})`;
          card.style.opacity = Math.max(opacity, 0).toFixed(3);
          card.style.zIndex = String(Math.max(1, 100 - Math.round(absRelative * 20)));
          card.style.pointerEvents = opacity > 0.12 ? "auto" : "none";
          return;
        }

        let x = relative * state.stepSpacing;
        let y = 0;
        let scale = 0;
        let opacity = 0;
        let rotateY = 0;

        if (absRelative <= 0.5) {
          const t = absRelative / 0.5;
          x = direction * absRelative * state.stepSpacing * 1.9;
          y = t * 5;
          scale = 1 - t * 0.16;
          opacity = 1;
          rotateY = -relative * 7;
        } else if (absRelative <= 1.5) {
          const t = absRelative - 0.5;
          x = direction * state.stepSpacing * (1.02 + t * 0.82);
          y = 5 + t * 20;
          scale = 0.84 - t * 0.2;
          opacity = 0.94 - t * 0.18;
          rotateY = -direction * (8 + t * 16);
        } else if (absRelative <= 2.5) {
          const t = absRelative - 1.5;
          x = direction * state.stepSpacing * (1.84 + t * 0.76);
          y = 25 + t * 24;
          scale = 0.64 - t * 0.2;
          opacity = 0.76 - t * 0.34;
          rotateY = -direction * (24 + t * 14);
        } else if (absRelative <= 3.5) {
          const t = absRelative - 2.5;
          x = direction * state.stepSpacing * (2.6 + t * 0.52);
          y = 49 + t * 18;
          scale = 0.44 - t * 0.18;
          opacity = 0.42 - t * 0.3;
          rotateY = -direction * (38 + t * 12);
        }

        card.style.transform = `translate(-50%, -50%) translateX(${x.toFixed(2)}px) translateY(${y.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${Math.max(scale, 0.01).toFixed(3)})`;
        card.style.opacity = Math.max(opacity, 0).toFixed(3);
        card.style.zIndex = String(Math.max(1, 100 - Math.round(absRelative * 20)));
        card.style.pointerEvents = opacity > 0.12 ? "auto" : "none";
      });
    };

    const pauseAutoMotion = () => {
      window.clearTimeout(state.resumeTimer);
      state.resumeTimer = window.setTimeout(() => {
        state.lastTimestamp = 0;
      }, 1400);
    };

    const nudgeProgress = (delta) => {
      state.lastProgress = normalizeProgress(state.lastProgress + delta);
      renderCards(state.lastProgress);
      pauseAutoMotion();
    };

    const animate = (timestamp) => {
      if (!state.lastTimestamp) state.lastTimestamp = timestamp;
      const delta = timestamp - state.lastTimestamp;
      state.lastTimestamp = timestamp;
      state.lastProgress = normalizeProgress(state.lastProgress + delta * state.speed);
      renderCards(state.lastProgress);
      if (!reduceMotion) state.frameId = window.requestAnimationFrame(animate);
    };

    const refresh = () => {
      updateMetrics();
      renderCards(state.lastProgress);
    };

    updateMetrics();
    renderCards(0);

    if (!reduceMotion) state.frameId = window.requestAnimationFrame(animate);

    root.addEventListener("wheel", (event) => {
      const scrollDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(scrollDelta) < 2) return;
      event.preventDefault();
      nudgeProgress(scrollDelta / 360);
    }, { passive: false });

    let pointerActive = false;
    let pointerStartX = 0;
    let pointerLastX = 0;

    root.addEventListener("pointerdown", (event) => {
      if (stage.clientWidth >= 760 || event.pointerType === "mouse") return;
      pointerActive = true;
      pointerStartX = event.clientX;
      pointerLastX = event.clientX;
      pauseAutoMotion();
      root.setPointerCapture?.(event.pointerId);
    });

    root.addEventListener("pointermove", (event) => {
      if (!pointerActive) return;
      const delta = event.clientX - pointerLastX;
      if (Math.abs(delta) < 1) return;
      pointerLastX = event.clientX;
      state.lastProgress = normalizeProgress(state.lastProgress - delta / 130);
      renderCards(state.lastProgress);
      if (Math.abs(event.clientX - pointerStartX) > 6) event.preventDefault();
    }, { passive: false });

    const finishPointerGesture = (event) => {
      if (!pointerActive) return;
      pointerActive = false;
      root.releasePointerCapture?.(event.pointerId);
      pauseAutoMotion();
    };

    root.addEventListener("pointerup", finishPointerGesture);
    root.addEventListener("pointercancel", finishPointerGesture);

    stage.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        nudgeProgress(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nudgeProgress(1);
      }
    });

    controlButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const direction = Number(button.dataset.partnerLoopDir || 0);
        if (direction) nudgeProgress(direction);
      });
    });

    window.addEventListener("resize", refresh);
  };

  const route = document.querySelector(".hero-route");
  const routeLine = route?.querySelector(".hero-route__line");
  const routeProgress = routeLine?.querySelector(".hero-route__progress");
  const routeDot = route?.querySelector(".hero-route__dot");
  const stops = [...document.querySelectorAll("[data-route-stop]")];
  const status = document.querySelector(".hero-route__status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  setupPartnerLoop();

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
