document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".route-atlas__visual");
  const controls = [...document.querySelectorAll("[data-atlas-control]")];
  const scenes = [...document.querySelectorAll("[data-atlas-scene]")];
  const status = document.querySelector("[data-atlas-status]");
  const action = document.querySelector("[data-atlas-action]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const content = {
    road: {
      status: "Road freight: truck loading",
      action: "Truck departs on the selected road route"
    },
    sea: {
      status: "Sea freight: container loading",
      action: "Ship sails toward the destination port"
    },
    cargo: {
      status: "Cargo shipping: pallet handling",
      action: "Forklift moves the checked load to the bay"
    },
    air: {
      status: "Air freight: aircraft loading",
      action: "Aircraft departs with the urgent shipment"
    }
  };
  let activeIndex = 0;
  let timer = null;

  const restartSceneAnimation = (scene) => {
    if (!scene || reduceMotion) return;
    scene.querySelectorAll(".freight-load, .freight-vehicle, .freight-pallet").forEach((element) => {
      element.getAnimations().forEach((animation) => {
        animation.cancel();
        animation.play();
      });
    });
  };

  const selectMode = (index) => {
    activeIndex = index;
    const selectedMode = controls[index]?.dataset.atlasControl || "road";
    controls.forEach((control, controlIndex) => {
      const isActive = controlIndex === index;
      control.classList.toggle("is-active", isActive);
      control.setAttribute("aria-pressed", String(isActive));
    });
    scenes.forEach((scene) => {
      const isActive = scene.dataset.atlasScene === selectedMode;
      scene.classList.toggle("is-active", isActive);
      if (isActive) restartSceneAnimation(scene);
    });
    if (status) status.textContent = content[selectedMode].status;
    if (action) action.textContent = content[selectedMode].action;
  };

  const stopRotation = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const startRotation = () => {
    if (reduceMotion || timer || controls.length < 2) return;
    timer = window.setInterval(() => selectMode((activeIndex + 1) % controls.length), 5200);
  };

  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      stopRotation();
      selectMode(index);
    });
    control.addEventListener("focus", stopRotation);
  });

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
