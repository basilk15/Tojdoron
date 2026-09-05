/* Full-screen background with independently sized vehicles from the approved artwork. */
(() => {
  const width = 1672;
  const duration = 1300;
  const assets = {};
  let ready;
  let active;
  const files = { background: 'background', plane: 'plane', truck: 'truck', ship: 'ship' };
  const preload = () => ready ||= Promise.all(Object.entries(files).map(([name, file]) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { assets[name] = image; resolve(); };
    image.onerror = reject;
    image.src = `assets/transition/route-${file}.webp`;
  })));
  const clamp = (value) => Math.max(0, Math.min(1, value));

  function streaks(ctx, x, y, length, opacity, time) {
    ctx.save();
    const glow = ctx.createLinearGradient(x - length, 0, x, 0);
    glow.addColorStop(0, 'rgba(24,159,111,0)');
    glow.addColorStop(0.7, `rgba(48,194,132,${opacity * 0.24})`);
    glow.addColorStop(1, `rgba(145,255,209,${opacity * 0.55})`);
    ctx.fillStyle = glow;
    ctx.fillRect(x - length, y - 15, length, 30);
    for (let i = 0; i < 5; i++) {
      ctx.globalAlpha = opacity * (0.42 + 0.12 * Math.sin(time * 0.003 + i));
      ctx.strokeStyle = glow;
      ctx.lineWidth = i === 2 ? 3 : 1.4;
      ctx.beginPath();
      ctx.moveTo(x - length * (0.72 + i * 0.06), y - 12 + i * 6);
      ctx.lineTo(x, y - 12 + i * 6);
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw(canvas, elapsed) {
    if (!assets.background) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const height = width * bounds.height / bounds.width;
    const density = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(bounds.width * density);
    const pixelHeight = Math.round(bounds.height * density);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.setTransform(pixelWidth / width, 0, 0, pixelHeight / height, 0, 0);
    const t = clamp(elapsed / duration);

    // Exclude the source's decorative border, then cover the entire viewport.
    // Only the background is cropped; vehicle size and travel remain independent.
    const interior = { x: 40, y: 48, width: 1592, height: 852 };
    const scale = Math.max(width / interior.width, height / interior.height);
    const sourceWidth = width / scale;
    const sourceHeight = height / scale;
    const sourceX = interior.x + (interior.width - sourceWidth) / 2;
    const sourceY = interior.y + (interior.height - sourceHeight) / 2;
    ctx.drawImage(assets.background, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
    const mapY = y => (y - sourceY) * scale;
    const vehicleScale = bounds.width < 600 ? 1.35 : 1;
    const roadY = clamp(mapY(555) / height) * height;
    const waterY = Math.min(height - 22 * vehicleScale, mapY(745));

    // Carry the road's contact surface across the faint map, under every truck frame.
    const road = ctx.createLinearGradient(0, roadY - 3, 0, roadY + 12);
    road.addColorStop(0, 'rgba(87,87,67,0)');
    road.addColorStop(0.25, 'rgba(87,87,67,0.32)');
    road.addColorStop(0.5, 'rgba(87,87,67,0.22)');
    road.addColorStop(1, 'rgba(87,87,67,0)');
    ctx.fillStyle = road;
    ctx.fillRect(0, roadY - 3, width, 15);

    const planeX = 385 + 1390 * t;
    const truckX = 286 + 1450 * t;
    const shipX = 367 + 1370 * t;
    const planeY = Math.max(15, mapY(293) - 43 * vehicleScale) - 7 * Math.sin(t * Math.PI) + Math.sin(t * 12) * 0.9;
    const truckY = roadY - 60 * vehicleScale + Math.sin(elapsed * 0.028) * 0.35;
    const shipY = waterY - 86 * vehicleScale + Math.sin(elapsed * 0.003) * 1.1;

    streaks(ctx, planeX + 44 * vehicleScale, planeY + 63 * vehicleScale, 440, 0.68, elapsed);
    streaks(ctx, truckX + 12 * vehicleScale, truckY + 38 * vehicleScale, 330, 0.55, elapsed);
    streaks(ctx, shipX + 20 * vehicleScale, shipY + 70 * vehicleScale, 400, 0.7, elapsed);

    // Wake ripples move with the vessel, while the water and map remain stationary.
    ctx.save();
    for (let i = 0; i < 7; i++) {
      const y = waterY + 1 + i * 4;
      const start = shipX - 230 - i * 12;
      ctx.strokeStyle = i % 2 ? 'rgba(255,255,237,0.5)' : 'rgba(58,112,93,0.2)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(start, y);
      ctx.bezierCurveTo(start + 70, y + Math.sin(elapsed * 0.005 + i) * 4, shipX + 30, y - 5, shipX + 240 * vehicleScale, waterY);
      ctx.stroke();
    }
    ctx.restore();
    ctx.drawImage(assets.plane, planeX, planeY, 258 * vehicleScale, 87 * vehicleScale);
    ctx.drawImage(assets.truck, truckX, truckY, 213 * vehicleScale, 67 * vehicleScale);
    ctx.drawImage(assets.ship, shipX, shipY, 279 * vehicleScale, 93 * vehicleScale);
  }

  function cancel() {
    if (!active) return;
    cancelAnimationFrame(active.frame);
    active.resolve(false);
    active = null;
  }

  async function play(canvas) {
    cancel();
    await preload();
    return new Promise((resolve) => {
      const run = { frame: 0, resolve };
      active = run;
      let start;
      const frame = (now) => {
        if (active !== run) return;
        start ??= now;
        const elapsed = now - start;
        draw(canvas, elapsed);
        if (elapsed >= duration) { active = null; resolve(true); }
        else run.frame = requestAnimationFrame(frame);
      };
      run.frame = requestAnimationFrame(frame);
    });
  }
  window.TOJDORON_ROUTE = { preload, play, cancel, draw, duration };
})();
