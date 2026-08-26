document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".route-atlas__visual");
  const controls = [...document.querySelectorAll("[data-atlas-control]")];
  const scenes = [...document.querySelectorAll("[data-atlas-scene]")];
  const status = document.querySelector("[data-atlas-status]");
  const action = document.querySelector("[data-atlas-action]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const statusCopy = {
    road: "Road freight",
    sea: "Sea freight",
    cargo: "Cargo handling",
    air: "Air freight"
  };
  const actionCopy = {
    road: "Scheduled cross-border delivery",
    sea: "Containerized ocean transit",
    cargo: "Warehouse consolidation and dispatch",
    air: "Priority airfreight uplift"
  };
  let activeIndex = 0;
  let timer = null;

  const restartSceneAnimation = (scene) => {
    if (!scene || reduceMotion) return;
    scene.querySelector(".atlas-scene__photo")?.getAnimations().forEach((animation) => {
      animation.cancel();
      animation.play();
    });
  };

  const selectMode = (index) => {
    activeIndex = index;
    const selectedMode = controls[index]?.dataset.atlasControl || "road";
    const selectedScene = scenes.find((scene) => scene.dataset.atlasScene === selectedMode);

    controls.forEach((control, controlIndex) => {
      const isActive = controlIndex === index;
      control.classList.toggle("is-active", isActive);
      control.setAttribute("aria-pressed", String(isActive));
    });

    scenes.forEach((scene) => {
      const isActive = scene === selectedScene;
      scene.classList.toggle("is-active", isActive);
      if (isActive) restartSceneAnimation(scene);
    });

    if (status) status.textContent = window.TOJDORON_I18N?.t(statusCopy[selectedMode]) || statusCopy.road;
    if (action) action.textContent = window.TOJDORON_I18N?.t(actionCopy[selectedMode]) || actionCopy.road;
  };

  const stopRotation = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const startRotation = () => {
    if (reduceMotion || timer || controls.length < 2) return;
    timer = window.setInterval(() => selectMode((activeIndex + 1) % controls.length), 8800);
  };

  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      stopRotation();
      selectMode(index);
    });
    control.addEventListener("focus", stopRotation);
  });

  document.addEventListener("tojdoron:languagechange", () => selectMode(activeIndex));

  board?.addEventListener("pointerenter", stopRotation);
  board?.addEventListener("pointerleave", startRotation);
  board?.addEventListener("focusout", (event) => {
    if (!board.contains(event.relatedTarget)) startRotation();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopRotation();
    else startRotation();
  });

  selectMode(0);
  startRotation();
});
