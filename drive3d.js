/* ============================================================
   drive3d.js  —  Cinematic 3D Road: Smooth + Stop-At-Projects
   ============================================================ */
(function () {
  "use strict";

  // ─── Config ───────────────────────────────────────────────
  const CFG = {
    ROAD_WIDTH    : 280,
    SEG_LEN       : 250,
    NUM_SEGS      : 200,
    DRAW_DIST     : 80,       // reduced for performance
    TREE_COUNT    : 180,      // reduced for performance
    CAM_H         : 130,
    FOV           : 140,
    CRUISE_SPEED  : 3.5,      // normal driving speed
    STOP_DIST     : 12,       // segments before milestone to start braking
    PAUSE_MS      : 4500,     // how long to pause at each stop
    ACCEL         : 0.06,     // acceleration rate
    BRAKE         : 0.10,     // braking rate
  };

  // ─── State ────────────────────────────────────────────────
  let canvas, ctx, W, H;
  let playerZ   = 0;
  let speed     = 0;
  let targetSpd = CFG.CRUISE_SPEED;
  let frame     = 0;
  let lastTime  = 0;
  let running   = false;

  // Vehicle stop-at-project state machine
  // States: 'cruise' | 'braking' | 'stopped' | 'resuming'
  let driveState   = 'cruise';
  let stopTarget   = 0;      // z position to stop at
  let stopMilIdx   = -1;     // which milestone we stopped at
  let stopTimer    = 0;      // ms countdown while stopped
  let visitedMils  = new Set();

  // Visual
  let cameraShake  = 0;
  let cycleT       = 0;      // 0 = day, 1 = night (cycles slowly)
  let dustParts    = [];
  let rainParts    = [];
  let weatherMode  = 'clear';

  // ─── Road Data ───────────────────────────────────────────
  const segs = [];
  const trees = [];

  // Milestones: z positions are set after segs are built
  const MILESTONES = [
    { frac: 0.15, title: 'Event Registration System',             num: '01',
      desc:  'College event registration with data validation and dynamic array management.',
      tech:  ['Java', 'OOP', 'Data Validation'], color: '#6366f1' },
    { frac: 0.35, title: 'Temple & Pilgrimage Crowd Management',  num: '02',
      desc:  'Intelligent crowd control and monitoring for pilgrimage sites.',
      tech:  ['System Design', 'Crowd Analytics', 'Smart Solutions'], color: '#8b5cf6' },
    { frac: 0.58, title: 'Study GPS System',                       num: '03',
      desc:  'Navigation app to prioritize topics and track study roadmaps.',
      tech:  ['Web Dev', 'JavaScript', 'LocalStorage'], color: '#06b6d4' },
    { frac: 0.80, title: 'Online Quiz System',                     num: '04',
      desc:  'Interactive quiz platform with multi-language support, timers, and charts.',
      tech:  ['HTML/CSS', 'JavaScript', 'Chart.js'], color: '#10b981' },
  ];

  // ─── Cached Gradient Refs ─────────────────────────────────
  // We rebuild these only on resize
  let skyGradDay, skyGradNight, groundGrad;

  // ─── Build Road ───────────────────────────────────────────
  function buildRoad() {
    let curveAcc = 0, hillAcc = 0;
    let curveTgt = 0, hillTgt = 0;
    for (let i = 0; i < CFG.NUM_SEGS; i++) {
      if (i % 25 === 0) curveTgt = (Math.random() - 0.5) * 3.5;
      if (i % 35 === 0) hillTgt  = (Math.random() - 0.5) * 55;
      curveAcc += (curveTgt - curveAcc) * 0.08;
      hillAcc  += (hillTgt  - hillAcc)  * 0.05;
      segs.push({
        worldX : i === 0 ? 0 : segs[i-1].worldX + segs[i-1].curve,
        worldY : hillAcc,
        curve  : curveAcc,
        altRow : i % 2 === 0,
        dashOn : i % 4 < 2,
      });
    }
    // Assign milestone z positions
    const totalZ = CFG.NUM_SEGS * CFG.SEG_LEN;
    MILESTONES.forEach(m => { m.z = m.frac * totalZ; });
  }

  // ─── Build Trees ─────────────────────────────────────────
  function buildTrees() {
    const TYPES = ['pine', 'round', 'tall'];
    for (let i = 0; i < CFG.TREE_COUNT; i++) {
      const seg  = Math.floor(Math.random() * CFG.NUM_SEGS);
      const side = Math.random() > 0.5 ? 1 : -1;
      trees.push({
        z      : seg * CFG.SEG_LEN + Math.random() * CFG.SEG_LEN,
        offset : side * (CFG.ROAD_WIDTH / 2 + 50 + Math.random() * 250),
        segIdx : seg,
        scale  : 0.7 + Math.random() * 0.9,
        type   : TYPES[Math.floor(Math.random() * 3)],
      });
    }
  }

  // ─── Resize ───────────────────────────────────────────────
  function resize() {
    const wrap = canvas.parentElement;
    W = canvas.width  = wrap.clientWidth  || 900;
    H = canvas.height = Math.min(window.innerHeight * 0.62, 560);
    canvas.style.height = H + 'px';
    buildGradients();
  }

  function buildGradients() {
    skyGradDay = ctx.createLinearGradient(0, 0, 0, H * 0.54);
    skyGradDay.addColorStop(0,   '#0a1628');
    skyGradDay.addColorStop(0.4, '#1e4a8a');
    skyGradDay.addColorStop(1,   '#f97316');

    skyGradNight = ctx.createLinearGradient(0, 0, 0, H * 0.54);
    skyGradNight.addColorStop(0, '#020617');
    skyGradNight.addColorStop(1, '#0f172a');

    groundGrad = ctx.createLinearGradient(0, H * 0.52, 0, H);
    groundGrad.addColorStop(0, '#1a3d1a');
    groundGrad.addColorStop(1, '#0d2010');
  }

  // ─── Sky ─────────────────────────────────────────────────
  function drawSky(n) {
    // Blend day/night
    if (n < 0.5) {
      ctx.fillStyle = skyGradDay;
    } else {
      ctx.fillStyle = skyGradNight;
    }
    ctx.fillRect(0, 0, W, H * 0.54);

    if (n < 0.5) {
      // Sun
      const sx = W * 0.72, sy = H * 0.16;
      const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 65);
      sg.addColorStop(0,   'rgba(255,240,100,1)');
      sg.addColorStop(0.4, 'rgba(255,180,50,0.7)');
      sg.addColorStop(1,   'rgba(255,100,0,0)');
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(sx, sy, 65, 0, Math.PI*2); ctx.fill();
    } else {
      // Moon
      const mx = W * 0.2, my = H * 0.1;
      ctx.fillStyle = 'rgba(225,235,255,0.95)';
      ctx.beginPath(); ctx.arc(mx, my, 28, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#020617';
      ctx.beginPath(); ctx.arc(mx+10, my-4, 23, 0, Math.PI*2); ctx.fill();
      // Stars
      if (!drawSky._starCache) {
        drawSky._starCache = Array.from({length:120}, () => ({
          x: Math.random(), y: Math.random() * 0.5,
          r: Math.random() * 1.8 + 0.4,
          p: Math.random() * Math.PI * 2,
        }));
      }
      const stAlpha = Math.min(1, (n - 0.5) * 4);
      drawSky._starCache.forEach(s => {
        const a = stAlpha * (0.4 + 0.6 * Math.abs(Math.sin(s.p + frame * 0.018)));
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI*2); ctx.fill();
      });
    }

    // Mountains
    const mR = Math.round(15 + 10*(1-n)), mG = Math.round(25+5*(1-n)), mB = Math.round(50+30*(1-n));
    ctx.fillStyle = `rgba(${mR},${mG},${mB},0.85)`;
    ctx.beginPath();
    ctx.moveTo(0, H*0.54);
    [[0,0.42],[0.07,0.28],[0.14,0.44],[0.22,0.30],[0.30,0.46],[0.38,0.32],
     [0.46,0.44],[0.54,0.26],[0.62,0.38],[0.70,0.23],[0.78,0.36],[0.86,0.28],
     [0.93,0.40],[1.0,0.34],[1.0,0.54]].forEach(([px,py]) => ctx.lineTo(px*W, py*H));
    ctx.closePath(); ctx.fill();
  }

  // ─── Ground ───────────────────────────────────────────────
  function drawGround() {
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, H * 0.52, W, H * 0.48);
  }

  // ─── Road Renderer (pseudo-3D) ────────────────────────────
  // Returns { camX, camSegIdx } for tree/vehicle use
  function drawRoad() {
    const camSegIdx = Math.floor(playerZ / CFG.SEG_LEN) % CFG.NUM_SEGS;
    const camSeg    = segs[camSegIdx];
    const camX      = camSeg.worldX;
    const camY      = CFG.CAM_H;
    const fov       = CFG.FOV;

    let prevY     = H;
    let prevLeft  = null, prevRight = null;

    for (let n = CFG.DRAW_DIST; n >= 1; n--) {
      const idx   = (camSegIdx + n) % CFG.NUM_SEGS;
      const seg   = segs[idx];
      const worldZ = n * CFG.SEG_LEN;

      const scale   = fov / worldZ;
      const screenX = W/2 + (seg.worldX - camX) * scale * 1.4;
      const screenY = H/2 - (-camY - seg.worldY) * scale + cameraShake;

      if (screenY >= prevY) { prevY = screenY; prevLeft = null; continue; }

      const rw = CFG.ROAD_WIDTH * scale;
      const cl = { x: screenX - rw, y: screenY };
      const cr = { x: screenX + rw, y: screenY };

      if (prevLeft) {
        // Road surface
        ctx.fillStyle = seg.altRow ? '#1a2744' : '#1e2e50';
        ctx.beginPath();
        ctx.moveTo(prevLeft.x,  prevLeft.y);
        ctx.lineTo(prevRight.x, prevRight.y);
        ctx.lineTo(cr.x, cr.y);
        ctx.lineTo(cl.x, cl.y);
        ctx.closePath(); ctx.fill();

        // Shoulders
        const sw = rw * 0.14;
        ctx.fillStyle = '#0f2010';
        ctx.beginPath();
        ctx.moveTo(prevLeft.x, prevLeft.y); ctx.lineTo(prevLeft.x - sw, prevLeft.y);
        ctx.lineTo(cl.x - sw, cl.y);       ctx.lineTo(cl.x, cl.y);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(prevRight.x, prevRight.y); ctx.lineTo(prevRight.x + sw, prevRight.y);
        ctx.lineTo(cr.x + sw, cr.y);          ctx.lineTo(cr.x, cr.y);
        ctx.fill();

        // Edge lines
        const ew = Math.max(1, rw * 0.05);
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.beginPath();
        ctx.moveTo(prevLeft.x, prevLeft.y);       ctx.lineTo(prevLeft.x + ew, prevLeft.y);
        ctx.lineTo(cl.x + ew, cl.y);              ctx.lineTo(cl.x, cl.y); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(prevRight.x, prevRight.y);      ctx.lineTo(prevRight.x - ew, prevRight.y);
        ctx.lineTo(cr.x - ew, cr.y);              ctx.lineTo(cr.x, cr.y); ctx.fill();

        // Center dash
        if (seg.dashOn) {
          const mx  = (prevLeft.x + prevRight.x) / 2;
          const mcx = (cl.x + cr.x) / 2;
          const lw  = Math.max(1, rw * 0.025);
          ctx.fillStyle = 'rgba(251,191,36,0.85)';
          ctx.beginPath();
          ctx.moveTo(mx - lw, prevLeft.y); ctx.lineTo(mx + lw, prevLeft.y);
          ctx.lineTo(mcx + lw, cl.y);     ctx.lineTo(mcx - lw, cl.y);
          ctx.fill();
        }
      }

      prevLeft  = cl;
      prevRight = cr;
      prevY     = screenY;
    }

    return { camX, camSegIdx };
  }

  // ─── Trees ────────────────────────────────────────────────
  // Collect visible trees, sort back→front, draw once
  function drawTrees(camSegIdx, camX, night) {
    const camZ    = camSegIdx * CFG.SEG_LEN;
    const maxDist = CFG.DRAW_DIST * CFG.SEG_LEN;
    const fov     = CFG.FOV;
    const vis     = [];

    for (let i = 0; i < trees.length; i++) {
      const t  = trees[i];
      let relZ = t.z - camZ;
      if (relZ < 0) relZ += CFG.NUM_SEGS * CFG.SEG_LEN;
      if (relZ > maxDist || relZ < CFG.SEG_LEN * 0.5) continue;

      const seg    = segs[t.segIdx];
      const scale  = fov / relZ;
      const sx     = W/2 + (seg.worldX + t.offset - camX) * scale;
      const sy     = H/2 - (-CFG.CAM_H - seg.worldY) * scale;
      if (sx < -150 || sx > W+150 || sy < 0 || sy > H) continue;

      vis.push({ t, sx, sy, scale: scale * t.scale * 7, relZ });
    }

    vis.sort((a, b) => b.relZ - a.relZ);
    vis.forEach(({ t, sx, sy, scale }) => _drawTree(ctx, sx, sy, scale, t.type, night));
  }

  function _drawTree(ctx, sx, sy, s, type, night) {
    const tH  = 55 * s, tW = 22 * s;
    const trH = 15 * s, trW = 5 * s;

    // Shadow
    ctx.fillStyle = `rgba(0,0,0,${0.12 + 0.1*night})`;
    ctx.beginPath(); ctx.ellipse(sx, sy+3, tW*0.7, tW*0.18, 0, 0, Math.PI*2); ctx.fill();

    // Trunk
    ctx.fillStyle = '#6b2f0a';
    ctx.fillRect(sx - trW/2, sy - trH, trW, trH);

    const gv = night > 0.5 ? 60 : 110;

    if (type === 'pine') {
      for (let tier = 3; tier >= 0; tier--) {
        const ts = 1 - tier * 0.18;
        ctx.fillStyle = `rgb(10,${gv + tier*12},20)`;
        ctx.beginPath();
        ctx.moveTo(sx, sy - trH - tH * ts);
        ctx.lineTo(sx - tW * ts, sy - trH - tier * tH * 0.25);
        ctx.lineTo(sx + tW * ts, sy - trH - tier * tH * 0.25);
        ctx.closePath(); ctx.fill();
      }
    } else if (type === 'round') {
      ctx.fillStyle = `rgb(15,${gv+10},15)`;
      ctx.beginPath(); ctx.arc(sx, sy - trH - tH * 0.4, tW, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = `rgba(50,${gv+60},30,0.25)`;
      ctx.beginPath(); ctx.arc(sx - tW*0.2, sy - trH - tH*0.5, tW*0.5, 0, Math.PI*2); ctx.fill();
    } else {
      ctx.fillStyle = `rgb(12,${gv},22)`;
      ctx.beginPath();
      ctx.moveTo(sx, sy - trH - tH);
      ctx.lineTo(sx - tW, sy - trH);
      ctx.lineTo(sx + tW, sy - trH);
      ctx.closePath(); ctx.fill();
    }
  }

  // ─── Vehicle (isometric truck) ────────────────────────────
  function drawVehicle(night, dt) {
    const cx = W / 2;
    const cy = H * 0.695 + cameraShake;

    // Gentle sway when moving, none when stopped
    const sway = driveState === 'stopped' ? 0 : Math.sin(frame * 0.06) * 2.5;
    const bounce = driveState === 'stopped' ? 0 : Math.sin(frame * 0.12) * 1.5;

    ctx.save();
    ctx.translate(cx, cy + bounce);

    // Shadow
    const shadowW = 110 + (driveState === 'stopped' ? 0 : speed * 3);
    const sg = ctx.createRadialGradient(0, 10, 5, 0, 12, shadowW * 0.55);
    sg.addColorStop(0, 'rgba(0,0,0,0.55)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.ellipse(0, 12, shadowW * 0.55, 22, 0, 0, Math.PI*2); ctx.fill();

    const cargo  = { x: -62, y: -42, w: 70, h: 38, d: 16 };
    const cab    = { x: cargo.x + cargo.w + cargo.d, y: cargo.y + cargo.h - 40, w: 32, h: 40, d: 12 };

    // ── Cargo top ──
    ctx.fillStyle = night > 0.5 ? '#312e81' : '#4338ca';
    ctx.beginPath();
    ctx.moveTo(cargo.x,              cargo.y);
    ctx.lineTo(cargo.x + cargo.w,    cargo.y);
    ctx.lineTo(cargo.x + cargo.w + cargo.d, cargo.y - cargo.d);
    ctx.lineTo(cargo.x + cargo.d,   cargo.y - cargo.d);
    ctx.closePath(); ctx.fill();
    // top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.moveTo(cargo.x+4, cargo.y-2); ctx.lineTo(cargo.x+cargo.w-4, cargo.y-2);
    ctx.lineTo(cargo.x+cargo.w+cargo.d-6, cargo.y-cargo.d+2); ctx.lineTo(cargo.x+cargo.d+4, cargo.y-cargo.d+2);
    ctx.closePath(); ctx.fill();

    // ── Cargo side (right isometric) ──
    ctx.fillStyle = night > 0.5 ? '#1e1b4b' : '#2e1c9a';
    ctx.beginPath();
    ctx.moveTo(cargo.x+cargo.w,         cargo.y);
    ctx.lineTo(cargo.x+cargo.w+cargo.d, cargo.y - cargo.d);
    ctx.lineTo(cargo.x+cargo.w+cargo.d, cargo.y - cargo.d + cargo.h);
    ctx.lineTo(cargo.x+cargo.w,         cargo.y + cargo.h);
    ctx.closePath(); ctx.fill();

    // ── Cargo front face ──
    ctx.fillStyle = night > 0.5 ? '#2d2980' : '#4f46e5';
    ctx.fillRect(cargo.x, cargo.y, cargo.w, cargo.h);
    // vertical stripe details
    ctx.strokeStyle = 'rgba(99,102,241,0.4)'; ctx.lineWidth = 1.2;
    for (let i = 1; i <= 3; i++) {
      const lx = cargo.x + (cargo.w / 4) * i;
      ctx.beginPath(); ctx.moveTo(lx, cargo.y+3); ctx.lineTo(lx, cargo.y+cargo.h-3); ctx.stroke();
    }
    // Brand
    ctx.fillStyle = 'rgba(165,180,252,0.8)';
    ctx.font = 'bold 8px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DIVYANSH', cargo.x + cargo.w/2, cargo.y + cargo.h/2 + 3);

    // ── Cab top ──
    ctx.fillStyle = night > 0.5 ? '#3730a3' : '#6366f1';
    ctx.beginPath();
    ctx.moveTo(cab.x,          cab.y);
    ctx.lineTo(cab.x+cab.w,    cab.y);
    ctx.lineTo(cab.x+cab.w+cab.d, cab.y - cab.d*0.55);
    ctx.lineTo(cab.x+cab.d,   cab.y - cab.d*0.55);
    ctx.closePath(); ctx.fill();

    // ── Cab side ──
    ctx.fillStyle = night > 0.5 ? '#2d1c8a' : '#4338ca';
    ctx.beginPath();
    ctx.moveTo(cab.x+cab.w,        cab.y);
    ctx.lineTo(cab.x+cab.w+cab.d,  cab.y - cab.d*0.55);
    ctx.lineTo(cab.x+cab.w+cab.d,  cab.y - cab.d*0.55 + cab.h);
    ctx.lineTo(cab.x+cab.w,        cab.y+cab.h);
    ctx.closePath(); ctx.fill();

    // ── Cab front ──
    ctx.fillStyle = night > 0.5 ? '#4f46e5' : '#818cf8';
    ctx.fillRect(cab.x, cab.y, cab.w, cab.h);
    // Windshield
    ctx.fillStyle = night > 0.5 ? 'rgba(80,100,200,0.9)' : 'rgba(199,210,254,0.9)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(cab.x+4, cab.y+4, cab.w-8, cab.h*0.44, 3);
    else ctx.rect(cab.x+4, cab.y+4, cab.w-8, cab.h*0.44);
    ctx.fill();
    // Glare
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.moveTo(cab.x+6, cab.y+6); ctx.lineTo(cab.x+cab.w*0.55, cab.y+6);
    ctx.lineTo(cab.x+cab.w*0.38, cab.y+cab.h*0.2); ctx.lineTo(cab.x+6, cab.y+cab.h*0.2);
    ctx.closePath(); ctx.fill();

    // ── Headlights ──
    const hlGlow = 0.6 + 0.4 * Math.sin(frame * 0.1);
    const hlColor = night > 0.5 ? `rgba(255,240,140,${hlGlow})` : 'rgba(255,240,140,0.9)';
    ctx.fillStyle = hlColor;
    const hlX = cab.x + cab.w + cab.d - 3;
    ctx.beginPath(); ctx.ellipse(hlX, cab.y+cab.h*0.52, 5, 3.5, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(hlX, cab.y+cab.h*0.72, 5, 3.5, 0, 0, Math.PI*2); ctx.fill();

    // Headlight beam at night
    if (night > 0.35) {
      const ba = (night - 0.35) * 0.7;
      const bg = ctx.createLinearGradient(hlX, 0, hlX + 230, 0);
      bg.addColorStop(0, `rgba(255,250,190,${ba*0.55})`); bg.addColorStop(1, 'rgba(255,250,190,0)');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.moveTo(hlX, cab.y+cab.h*0.44); ctx.lineTo(hlX+240, cab.y+cab.h*0.22);
      ctx.lineTo(hlX+240, cab.y+cab.h*1.05); ctx.lineTo(hlX, cab.y+cab.h*0.8);
      ctx.closePath(); ctx.fill();
    }

    // ── Wheels ──
    const wR   = 10;
    const wY   = cargo.y + cargo.h + 2;
    const spin = (frame * Math.max(speed, 0) * 0.12) % (Math.PI * 2);
    [cargo.x + cargo.w*0.18, cargo.x + cargo.w*0.63, cab.x + cab.w*0.65].forEach(wx => {
      ctx.fillStyle = '#111827';
      ctx.beginPath(); ctx.arc(wx, wY, wR, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = '#374151'; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.arc(wx, wY, wR-1.5, 0, Math.PI*2); ctx.stroke();
      ctx.fillStyle = '#9ca3af';
      ctx.beginPath(); ctx.arc(wx, wY, wR*0.52, 0, Math.PI*2); ctx.fill();
      if (speed > 0.3) {
        ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1.2;
        for (let k = 0; k < 5; k++) {
          const a = spin + k / 5 * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(wx, wY);
          ctx.lineTo(wx + Math.cos(a) * wR*0.48, wY + Math.sin(a) * wR*0.48);
          ctx.stroke();
        }
      }
    });

    // ── Stop indicator (when paused at milestone) ──
    if (driveState === 'stopped') {
      const stopFade = Math.min(1, (CFG.PAUSE_MS - stopTimer) / 400);
      ctx.globalAlpha = stopFade * (0.6 + 0.4 * Math.sin(frame * 0.15));
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(cargo.x + cargo.w/2, cargo.y - cargo.d - 18, 7, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Inter,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('■', cargo.x + cargo.w/2, cargo.y - cargo.d - 15);
      ctx.globalAlpha = 1;
    }

    // ── Exhaust smoke ──
    if (speed > 0.5) {
      for (let p = 0; p < 3; p++) {
        const pLife = ((frame * 0.05 + p * 0.45) % 1);
        ctx.fillStyle = `rgba(160,160,170,${(1-pLife)*0.25})`;
        ctx.beginPath();
        ctx.arc(
          cargo.x - 5 - pLife*30 + Math.sin(frame*0.12+p)*6,
          cargo.y + cargo.h - 5 - pLife*18,
          pLife * 14 + 4, 0, Math.PI*2
        );
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // ─── Speed Lines ─────────────────────────────────────────
  function drawSpeedLines() {
    if (speed < 1) return;
    const alpha = Math.min(0.3, speed * 0.07);
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 0.7;
    for (let i = 0; i < 14; i++) {
      const x   = Math.random() * W;
      const y   = Math.random() * H;
      const len = speed * 14 + 8;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y + (y - H/2)*0.08); ctx.stroke();
    }
  }

  // ─── Dust & Rain ─────────────────────────────────────────
  function updateDust() {
    if (speed > 0.4 && dustParts.length < 16) {
      dustParts.push({
        x: W/2 + (Math.random()-0.5)*70, y: H*0.73 + Math.random()*15,
        vx: (Math.random()-0.5)*1.8, vy: -Math.random()*1.2,
        life: 1, size: Math.random()*6+3,
      });
    }
    dustParts = dustParts.filter(p => {
      p.x += p.vx; p.y += p.vy; p.life -= 0.025; p.size *= 1.015;
      if (p.life <= 0) return false;
      ctx.fillStyle = `rgba(200,190,170,${p.life*0.22})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
      return true;
    });
  }

  function updateRain() {
    if (weatherMode !== 'rain') return;
    while (rainParts.length < 160) {
      rainParts.push({
        x: Math.random()*W, y: Math.random()*H,
        sp: 8 + Math.random()*6, len: 14 + Math.random()*18,
        a: 0.1 + Math.random()*0.25,
      });
    }
    rainParts.forEach(r => {
      r.y += r.sp; r.x += 1.2;
      if (r.y > H) { r.y = -r.len; r.x = Math.random()*W; }
      ctx.strokeStyle = `rgba(174,214,241,${r.a})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x+1.5, r.y+r.len); ctx.stroke();
    });
  }

  // ─── HUD ─────────────────────────────────────────────────
  function drawHUD(night) {
    const kmh = Math.round(speed * 28);
    const hmX = W - 105, hmY = H - 82;

    ctx.save();
    ctx.globalAlpha = 0.88;
    ctx.fillStyle   = 'rgba(0,0,0,0.52)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(hmX-8, hmY-8, 112, 68, 10);
    else ctx.rect(hmX-8, hmY-8, 112, 68);
    ctx.fill();
    ctx.strokeStyle = 'rgba(99,102,241,0.4)'; ctx.lineWidth = 1; ctx.stroke();

    ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 23px Inter,sans-serif';
    ctx.textAlign = 'center'; ctx.fillText(kmh, hmX+46, hmY+23);
    ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.font = '11px Inter,sans-serif';
    ctx.fillText('km/h', hmX+46, hmY+38);

    // State badge
    const stateLabel = driveState === 'stopped' ? '⏸ STOPPED' : driveState === 'braking' ? '🛑 BRAKING' : '▶ DRIVING';
    ctx.fillStyle = driveState === 'stopped' ? '#ef4444' : driveState === 'braking' ? '#f59e0b' : '#10b981';
    ctx.font = 'bold 8px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(stateLabel, hmX+46, hmY+52);
    ctx.globalAlpha = 1;
    ctx.restore();

    // Progress bar
    const totalZ = CFG.NUM_SEGS * CFG.SEG_LEN;
    const prog   = Math.min(1, playerZ / totalZ);
    const bW     = Math.min(W*0.55, 460);
    const bX     = (W - bW) / 2, bY = H - 26;

    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(bX-8, bY-7, bW+16, 20, 6); else ctx.rect(bX-8, bY-7, bW+16, 20);
    ctx.fill();

    ctx.fillStyle = 'rgba(30,41,59,0.9)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(bX, bY, bW, 6, 3); else ctx.rect(bX, bY, bW, 6);
    ctx.fill();

    const pg = ctx.createLinearGradient(bX, 0, bX+bW, 0);
    pg.addColorStop(0, '#6366f1'); pg.addColorStop(1, '#06b6d4');
    ctx.fillStyle = pg;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(bX, bY, bW*prog, 6, 3); else ctx.rect(bX, bY, bW*prog, 6);
    ctx.fill();

    // Milestone dots on bar
    MILESTONES.forEach((m, i) => {
      const mx = bX + m.frac * bW;
      const visited = visitedMils.has(i);
      ctx.fillStyle = visited ? m.color : 'rgba(80,90,110,0.8)';
      ctx.beginPath(); ctx.arc(mx, bY+3, visited ? 7 : 5, 0, Math.PI*2); ctx.fill();
      if (visited) {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
      }
      // Milestone number label
      ctx.fillStyle = visited ? 'rgba(255,255,255,0.9)' : 'rgba(150,163,175,0.6)';
      ctx.font = `bold 7px Inter,sans-serif`; ctx.textAlign = 'center';
      ctx.fillText(m.num, mx, bY - 5);
    });
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // ─── Stop-At-Projects Logic ───────────────────────────────
  function updateDriveState(dt) {
    const totalZ = CFG.NUM_SEGS * CFG.SEG_LEN;

    if (driveState === 'cruise') {
      // Check if we're approaching any unvisited milestone
      for (let i = 0; i < MILESTONES.length; i++) {
        if (visitedMils.has(i)) continue;
        const dist = MILESTONES[i].z - playerZ;
        if (dist > 0 && dist < CFG.STOP_DIST * CFG.SEG_LEN) {
          // Start braking
          driveState = 'braking';
          stopTarget = MILESTONES[i].z;
          stopMilIdx = i;
          break;
        }
      }
      targetSpd = CFG.CRUISE_SPEED;
    }

    if (driveState === 'braking') {
      const dist = stopTarget - playerZ;
      // Proportional speed reduction as we near the stop
      const brakeFrac = Math.max(0, Math.min(1, dist / (CFG.STOP_DIST * CFG.SEG_LEN)));
      targetSpd = CFG.CRUISE_SPEED * 0.15 + brakeFrac * CFG.CRUISE_SPEED * 0.85;

      if (dist <= 0 || speed < 0.15) {
        // Arrived — full stop
        speed     = 0;
        targetSpd = 0;
        driveState = 'stopped';
        stopTimer  = CFG.PAUSE_MS;
        visitedMils.add(stopMilIdx);
        cameraShake = 3;
        setTimeout(() => { cameraShake = 0; }, 400);
        showMilestoneCard(MILESTONES[stopMilIdx], stopMilIdx);
      }
    }

    if (driveState === 'stopped') {
      stopTimer -= dt;
      speed      = 0;
      targetSpd  = 0;
      if (stopTimer <= 0) {
        driveState = 'resuming';
        hideMilestoneCard();
      }
    }

    if (driveState === 'resuming') {
      targetSpd = CFG.CRUISE_SPEED;
      if (speed > CFG.CRUISE_SPEED * 0.9) {
        driveState = 'cruise';
      }
    }

    // Smooth speed with acceleration / braking
    const rate = speed < targetSpd ? CFG.ACCEL : CFG.BRAKE;
    speed += (targetSpd - speed) * rate;
    speed  = Math.max(0, speed);
  }

  // ─── Milestone Card DOM ───────────────────────────────────
  function showMilestoneCard(m, idx) {
    const overlay = document.getElementById('milestone-overlay');
    if (!overlay) return;
    overlay.innerHTML = `
      <div class="mo-card" style="--accent:${m.color}; border-top-color:${m.color}">
        <div class="mo-num" style="color:${m.color}">${m.num}</div>
        <div class="mo-badge" style="background:${m.color}18;color:${m.color}">PROJECT STOP</div>
        <h3 class="mo-title">${m.title}</h3>
        <p class="mo-desc">${m.desc}</p>
        <div class="mo-tech">
          ${m.tech.map(t => `<span style="border-color:${m.color}40;color:${m.color}">${t}</span>`).join('')}
        </div>
        <div class="mo-timer">
          <div class="mo-timer-bar" style="animation-duration:${CFG.PAUSE_MS}ms;background:${m.color}"></div>
        </div>
        <button class="mo-resume" id="mo-resume-btn" onclick="window._driveResume && window._driveResume()">
          Continue Journey →
        </button>
      </div>`;
    overlay.classList.add('visible');
  }

  function hideMilestoneCard() {
    const overlay = document.getElementById('milestone-overlay');
    if (overlay) overlay.classList.remove('visible');
  }

  // Allow manual resume
  window._driveResume = function () {
    if (driveState === 'stopped') {
      stopTimer = 0; // Immediately trigger resume
    }
  };

  // ─── Controls ────────────────────────────────────────────
  function initControls() {
    document.getElementById('ctrl-speedup')?.addEventListener('click', () => {
      if (driveState === 'cruise' || driveState === 'resuming') CFG.CRUISE_SPEED = Math.min(7, CFG.CRUISE_SPEED + 0.8);
    });
    document.getElementById('ctrl-speeddown')?.addEventListener('click', () => {
      CFG.CRUISE_SPEED = Math.max(1, CFG.CRUISE_SPEED - 0.8);
    });
    document.getElementById('ctrl-weather')?.addEventListener('click', function () {
      weatherMode = weatherMode === 'clear' ? 'rain' : 'clear';
      if (weatherMode === 'clear') rainParts = [];
      this.querySelector('span')?.textContent && (this.innerHTML = weatherMode === 'rain'
        ? '<span>☀️</span><span class="ctrl-label">Clear</span>'
        : '<span>🌧️</span><span class="ctrl-label">Rain</span>');
    });
    document.getElementById('ctrl-night')?.addEventListener('click', () => {
      cycleT = cycleT > 0.5 ? 0 : 1;
    });
  }

  // ─── Main Loop ────────────────────────────────────────────
  function loop(timestamp) {
    if (!running) return;

    // Delta time (capped at 50ms to avoid spiral of death on tab switch)
    const dt  = lastTime ? Math.min(timestamp - lastTime, 50) : 16;
    lastTime  = timestamp;
    frame++;

    // Day/night — slow cycle every ~25s
    cycleT = (Math.sin(frame * 0.0015) + 1) / 2;

    // Camera shake decay
    cameraShake *= 0.88;

    // Drive state machine
    updateDriveState(dt);

    // Advance player
    playerZ += speed * CFG.SEG_LEN * 0.004;
    const maxZ = CFG.NUM_SEGS * CFG.SEG_LEN;
    if (playerZ >= maxZ) {
      playerZ -= maxZ;
      visitedMils.clear(); // Loop: reset milestone visits
    }

    // ── Render ──
    ctx.clearRect(0, 0, W, H);
    drawSky(cycleT);
    drawGround();
    const { camX, camSegIdx } = drawRoad();
    drawTrees(camSegIdx, camX, cycleT);
    drawVehicle(cycleT, dt);
    if (speed > 0.5) drawSpeedLines();
    updateDust();
    updateRain();
    drawHUD(cycleT);

    requestAnimationFrame(loop);
  }

  // ─── Intersection Observer — start only when visible ─────
  function initVisibilityObserver() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !running) {
          running = true;
          requestAnimationFrame(loop);
        }
        if (!e.isIntersecting) {
          // pause when off-screen to save CPU
          running = false;
        }
      });
    }, { threshold: 0.1 });
    io.observe(canvas);
  }

  // ─── Init ────────────────────────────────────────────────
  function init() {
    canvas = document.getElementById('drive-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d', { alpha: false }); // opaque = faster compositing

    resize();
    window.addEventListener('resize', () => { resize(); });

    buildRoad();
    buildTrees();
    initControls();
    initVisibilityObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
