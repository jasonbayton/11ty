/**
 * orb-chat.js — The Orb: AI-powered knowledge orb for bayton.org
 *
 * Vanilla JS port of flashi_standalone's Canvas orb animation + voice + chat,
 * wired to the bayton.org MCP via /api/orb-chat.
 */

(function () {
  'use strict';

  // =========================================================================
  // Utility functions (ported from Orb.tsx)
  // =========================================================================

  function noise(x, y, t) {
    return (
      Math.sin(x * 1.3 + t * 0.7) * 0.5 +
      Math.sin(y * 1.7 + t * 0.5) * 0.3 +
      Math.sin((x + y) * 0.9 + t * 1.1) * 0.2
    );
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(a, b, t) {
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  }

  // =========================================================================
  // Particle system
  // =========================================================================

  function createParticles(count) {
    var particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 0.55 + Math.random() * 0.45,
        speed: 0.2 + Math.random() * 0.8,
        size: 1 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.5,
        hue: Math.random() * 60 - 30,
        orbitSpeed: 0.3 + Math.random() * 0.7,
        phaseOffset: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  }

  // =========================================================================
  // Colour presets — site brand colours
  // =========================================================================

  function getColors(state, isDark) {
    var base = {
      primary: [255, 69, 0],       // #ff4500 brand orange
      secondary: [206, 56, 0],     // #ce3800 blood orange
      accent: [255, 160, 70],      // warm light inner orange
      glow: 'rgba(255, 69, 0, 0.4)',
      particleBase: 25,
    };

    switch (state) {
      case 'thinking':
        return {
          primary: [245, 158, 11],
          secondary: [255, 96, 40],    // #ff6028 orange-200
          accent: [2, 131, 189],       // #0283bd brand blue
          glow: isDark ? 'rgba(245, 158, 11, 0.5)' : 'rgba(245, 158, 11, 0.35)',
          particleBase: 40,
        };
      case 'speaking':
        return {
          primary: [255, 69, 0],       // brand orange
          secondary: [195, 0, 0],      // #c30000 brand red
          accent: [255, 140, 40],
          glow: isDark ? 'rgba(255, 69, 0, 0.55)' : 'rgba(255, 69, 0, 0.4)',
          particleBase: 20,
        };
      default: // idle
        return {
          primary: base.primary,
          secondary: base.secondary,
          accent: base.accent,
          glow: isDark ? 'rgba(255, 69, 0, 0.45)' : 'rgba(255, 69, 0, 0.3)',
          particleBase: base.particleBase,
        };
    }
  }

  // =========================================================================
  // Explosion fragments (Order 66 easter egg)
  // =========================================================================

  var FRAGMENT_COLOR_SETS = [
    { inner: [255, 69, 0], outer: [206, 56, 0], accent: [2, 131, 189] },
    { inner: [255, 96, 40], outer: [200, 60, 10], accent: [21, 176, 7] },
    { inner: [2, 131, 189], outer: [1, 80, 120], accent: [255, 69, 0] },
    { inner: [21, 176, 7], outer: [10, 110, 4], accent: [255, 96, 40] },
    { inner: [239, 68, 68], outer: [160, 30, 30], accent: [249, 115, 22] },
    { inner: [249, 115, 22], outer: [170, 70, 10], accent: [245, 158, 11] },
    { inner: [245, 158, 11], outer: [180, 110, 5], accent: [255, 200, 120] },
    { inner: [195, 0, 0], outer: [140, 0, 0], accent: [239, 68, 68] },
  ];

  function createExplosionFragments(cx, cy, radius, count) {
    var fragments = [];
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var dist = radius * (0.1 + Math.random() * 0.9);
      var speed = 80 + Math.random() * 400;
      var spread = (Math.random() - 0.5) * 1.2;
      var colorSet = FRAGMENT_COLOR_SETS[Math.floor(Math.random() * FRAGMENT_COLOR_SETS.length)];
      fragments.push({
        originX: cx + Math.cos(angle) * dist,
        originY: cy + Math.sin(angle) * dist,
        vx: Math.cos(angle + spread) * speed,
        vy: Math.sin(angle + spread) * speed,
        radius: 3 + Math.random() * 25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 12,
        innerColor: colorSet.inner,
        outerColor: colorSet.outer,
        accentColor: colorSet.accent,
        opacity: 0.75 + Math.random() * 0.25,
        driftPhase: Math.random() * Math.PI * 2,
        driftAmp: 15 + Math.random() * 40,
        seed: Math.random(),
        distortion: 0.08 + Math.random() * 0.15,
        segments: 16 + Math.floor(Math.random() * 16),
        noiseSpeed: 0.5 + Math.random() * 1.5,
      });
    }
    return fragments;
  }

  function createCrackLines(count) {
    var cracks = [];
    for (var i = 0; i < count; i++) {
      var numSegments = 3 + Math.floor(Math.random() * 4);
      var segments = [];
      for (var s = 0; s < numSegments; s++) {
        segments.push({
          offsetAngle: (Math.random() - 0.5) * 0.5,
          lengthFraction: (s + 1) / numSegments,
        });
      }
      cracks.push({
        startAngle: Math.random() * Math.PI * 2,
        angularSpread: (Math.random() - 0.5) * 0.8,
        segments: segments,
      });
    }
    return cracks;
  }

  function drawFragment(ctx, x, y, frag, alpha, t) {
    var r = frag.radius;
    if (r < 1) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    var ir = frag.innerColor[0], ig = frag.innerColor[1], ib = frag.innerColor[2];
    var or = frag.outerColor[0], og = frag.outerColor[1], ob = frag.outerColor[2];
    var ar = frag.accentColor[0], ag = frag.accentColor[1], ab = frag.accentColor[2];
    ctx.shadowColor = 'rgba(' + ir + ',' + ig + ',' + ib + ',' + (alpha * 0.4) + ')';
    ctx.shadowBlur = Math.min(r * 0.3, 8);
    var seed = frag.seed;
    var s = seed * 17.3;
    ctx.beginPath();
    for (var i = 0; i <= frag.segments; i++) {
      var angle = (i / frag.segments) * Math.PI * 2;
      var nx = Math.cos(angle);
      var ny = Math.sin(angle);
      var n = (
        Math.sin(nx * (1.3 + seed * 0.8) * 3 + t * frag.noiseSpeed + s) * 0.5 +
        Math.sin(ny * (1.7 + seed * 0.4) * 3 + t * frag.noiseSpeed * 0.7 + s * 1.3) * 0.3 +
        Math.sin((nx + ny) * (0.9 + seed * 0.6) * 3 + t * frag.noiseSpeed * 1.1 + s * 0.7) * 0.2
      );
      var distortedR = r + n * r * frag.distortion;
      var px = x + nx * distortedR;
      var py = y + ny * distortedR;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    var grad = ctx.createRadialGradient(x - r * 0.2, y - r * 0.25, 0, x, y, r * 1.1);
    grad.addColorStop(0, 'rgba(' + ar + ',' + ag + ',' + ab + ',' + alpha + ')');
    grad.addColorStop(0.35, 'rgba(' + ir + ',' + ig + ',' + ib + ',' + alpha + ')');
    grad.addColorStop(0.7, 'rgba(' + or + ',' + og + ',' + ob + ',' + alpha + ')');
    grad.addColorStop(1, 'rgba(' + Math.round(or * 0.5) + ',' + Math.round(og * 0.5) + ',' + Math.round(ob * 0.5) + ',' + alpha + ')');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.shadowBlur = 0;
    if (r > 5) {
      var specAngle = seed * Math.PI * 2;
      var specX = x + Math.cos(specAngle) * r * 0.2;
      var specY = y + Math.sin(specAngle) * r * 0.2 - r * 0.15;
      var specGrad = ctx.createRadialGradient(specX, specY, 0, specX, specY, r * 0.5);
      specGrad.addColorStop(0, 'rgba(255,255,255,' + Math.min(alpha * 0.5, 0.5) + ')');
      specGrad.addColorStop(0.5, 'rgba(255,255,255,' + Math.min(alpha * 0.15, 0.15) + ')');
      specGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Explosion timing constants (seconds)
  var EXPLOSION_BUILDUP_END = 2.0;
  var EXPLOSION_FLASH_END = 2.3;
  var EXPLOSION_SHATTER_END = 3.0;
  var EXPLOSION_DRIFT_END = 12.0;
  var EXPLOSION_REFORM_END = 14.0;

  // =========================================================================
  // Orb renderer
  // =========================================================================

  function OrbRenderer(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.time = 0;
    this.state = 'idle'; // idle | thinking | speaking
    this.audioLevel = 0;
    this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.particles = createParticles(60);
    this.rafId = 0;

    // Smoothed values for transitions
    this.sm = {
      primary: [255, 69, 0],
      secondary: [206, 56, 0],
      accent: [255, 120, 30],
      audioLevel: 0,
      radius: 1,
      particleBase: 25,
    };

    // Explosion state
    this.explosion = {
      active: false,
      startTime: 0,
      fragments: [],
      shockwaveRadius: 0,
      completeFired: false,
      cracks: [],
      orbCenterX: 0,
      orbCenterY: 0,
      baseRadius: 0,
    };
    this.prevState = 'idle';

    // Observe dark mode changes
    var self = this;
    this._themeObserver = new MutationObserver(function () {
      self.isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    });
    this._themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    this._draw = this._draw.bind(this);
  }

  OrbRenderer.prototype.start = function () {
    this.rafId = requestAnimationFrame(this._draw);
  };

  OrbRenderer.prototype.stop = function () {
    cancelAnimationFrame(this.rafId);
    this._themeObserver.disconnect();
  };

  OrbRenderer.prototype.setState = function (newState) {
    this.state = newState;
  };

  OrbRenderer.prototype.setAudioLevel = function (level) {
    this.audioLevel = level;
  };

  OrbRenderer.prototype.triggerExplosion = function () {
    this.state = 'exploding';
  };

  OrbRenderer.prototype._draw = function () {
    var canvas = this.canvas;
    var ctx = this.ctx;
    if (!ctx) return;

    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    var displayWidth = rect.width;
    var displayHeight = rect.height;

    if (this._lastW !== displayWidth || this._lastH !== displayHeight || this._lastDpr !== dpr) {
      this._lastW = displayWidth;
      this._lastH = displayHeight;
      this._lastDpr = dpr;
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var W = displayWidth;
    var H = displayHeight;
    var dt = 0.016;
    this.time += dt;
    var t = this.time;
    var state = this.state;
    var isDark = this.isDark;
    var exp = this.explosion;

    var cx, cy, baseRadius;
    if (exp.active) {
      cx = exp.orbCenterX;
      cy = exp.orbCenterY;
      baseRadius = exp.baseRadius;
    } else {
      cx = W / 2;
      cy = H / 2;
      baseRadius = Math.min(W, H) * 0.32;
    }

    // Detect transition into exploding
    if (state === 'exploding' && this.prevState !== 'exploding') {
      exp.active = true;
      exp.startTime = t;
      exp.completeFired = false;
      exp.shockwaveRadius = 0;
      exp.orbCenterX = W / 2;
      exp.orbCenterY = H / 2;
      exp.baseRadius = Math.min(W, H) * 0.32;
      exp.cracks = createCrackLines(5 + Math.floor(Math.random() * 4));
      exp.fragments = [];
      cx = exp.orbCenterX;
      cy = exp.orbCenterY;
      baseRadius = exp.baseRadius;
    }
    this.prevState = state;

    // ---- EXPLOSION MODE ----
    if (exp.active) {
      var elapsed = t - exp.startTime;
      ctx.clearRect(0, 0, W, H);

      // Phase 0: Buildup
      if (elapsed < EXPLOSION_BUILDUP_END) {
        var buildupProgress = elapsed / EXPLOSION_BUILDUP_END;
        var eased = buildupProgress * buildupProgress;
        var shakeAmp = eased * 8;
        var shakeX = (Math.sin(t * 30) + Math.sin(t * 47 + 1.3)) * shakeAmp * 0.5;
        var shakeY = (Math.sin(t * 37 + 2.1) + Math.sin(t * 53 + 0.7)) * shakeAmp * 0.5;
        var shakeCx = cx + shakeX;
        var shakeCy = cy + shakeY;
        var pulseFreq = 4 + buildupProgress * 12;
        var pulseAmp = 0.01 + buildupProgress * 0.04;
        var radiusPulse = 1 + Math.sin(t * pulseFreq) * pulseAmp;
        var builtRadius = baseRadius * radiusPulse;

        var normalPrimary = [255, 69, 0];
        var dangerPrimary = [200, 30, 15];
        var normalSecondary = [206, 56, 0];
        var dangerSecondary = [180, 50, 10];
        var normalAccent = [2, 131, 189];
        var dangerAccent = [255, 100, 20];
        var bprim = lerpColor(normalPrimary, dangerPrimary, eased);
        var bsec = lerpColor(normalSecondary, dangerSecondary, eased);
        var bacc = lerpColor(normalAccent, dangerAccent, eased);

        // Glow layers
        for (var gi = 4; gi >= 1; gi--) {
          var glowR = builtRadius + gi * 25 + eased * gi * 20;
          var glowAlpha = (0.04 - gi * 0.008) + eased * 0.04;
          var gGrad = ctx.createRadialGradient(shakeCx, shakeCy, builtRadius * 0.5, shakeCx, shakeCy, glowR);
          gGrad.addColorStop(0, 'rgba(' + bprim[0] + ',' + bprim[1] + ',' + bprim[2] + ',' + Math.max(0, glowAlpha) + ')');
          gGrad.addColorStop(1, 'rgba(' + bprim[0] + ',' + bprim[1] + ',' + bprim[2] + ',0)');
          ctx.fillStyle = gGrad;
          ctx.beginPath();
          ctx.arc(shakeCx, shakeCy, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main orb body
        var segments = 128;
        ctx.beginPath();
        for (var si = 0; si <= segments; si++) {
          var angle = (si / segments) * Math.PI * 2;
          var nx = Math.cos(angle);
          var ny = Math.sin(angle);
          var distortion = noise(nx * 3, ny * 3, t * 0.8) * 8 + noise(nx * 6, ny * 6, t * 3) * eased * 6;
          var r = builtRadius + distortion;
          var px = shakeCx + nx * r;
          var py = shakeCy + ny * r;
          if (si === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        var glowColor = 'rgba(' + lerp(255, 239, eased) + ',' + lerp(69, 50, eased) + ',' + lerp(0, 30, eased) + ',' + (0.4 + eased * 0.4) + ')';
        var orbGrad = ctx.createRadialGradient(shakeCx - builtRadius * 0.25, shakeCy - builtRadius * 0.25, 0, shakeCx, shakeCy, builtRadius * 1.3);
        orbGrad.addColorStop(0, 'rgba(' + bacc[0] + ',' + bacc[1] + ',' + bacc[2] + ',0.95)');
        orbGrad.addColorStop(0.35, 'rgba(' + bprim[0] + ',' + bprim[1] + ',' + bprim[2] + ',0.9)');
        orbGrad.addColorStop(0.7, 'rgba(' + bsec[0] + ',' + bsec[1] + ',' + bsec[2] + ',0.85)');
        orbGrad.addColorStop(1, 'rgba(' + (bsec[0] * 0.5) + ',' + (bsec[1] * 0.5) + ',' + (bsec[2] * 0.5) + ',0.6)');
        ctx.fillStyle = orbGrad;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 40 + eased * 80;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Specular
        var sGrad = ctx.createRadialGradient(shakeCx - builtRadius * 0.3, shakeCy - builtRadius * 0.35, 0, shakeCx - builtRadius * 0.1, shakeCy - builtRadius * 0.1, builtRadius * 0.7);
        sGrad.addColorStop(0, 'rgba(255,255,255,' + (0.35 * (1 - eased * 0.5)) + ')');
        sGrad.addColorStop(0.5, 'rgba(255,255,255,' + (0.08 * (1 - eased * 0.5)) + ')');
        sGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = sGrad;
        ctx.beginPath();
        ctx.arc(shakeCx, shakeCy, builtRadius, 0, Math.PI * 2);
        ctx.fill();

        // White flash at end
        var flashStart = EXPLOSION_BUILDUP_END - 0.2;
        if (elapsed > flashStart) {
          var flashP = (elapsed - flashStart) / 0.2;
          ctx.globalAlpha = flashP * 0.6;
          var fGrad = ctx.createRadialGradient(shakeCx, shakeCy, 0, shakeCx, shakeCy, builtRadius * 2);
          fGrad.addColorStop(0, 'rgba(255,255,255,1)');
          fGrad.addColorStop(0.5, 'rgba(255,240,200,0.5)');
          fGrad.addColorStop(1, 'rgba(255,200,100,0)');
          ctx.fillStyle = fGrad;
          ctx.beginPath();
          ctx.arc(shakeCx, shakeCy, builtRadius * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      // Phase 1: Flash
      else if (elapsed < EXPLOSION_FLASH_END) {
        var flashProgress = (elapsed - EXPLOSION_BUILDUP_END) / (EXPLOSION_FLASH_END - EXPLOSION_BUILDUP_END);
        if (exp.fragments.length === 0) {
          exp.fragments = createExplosionFragments(cx, cy, baseRadius, 150);
        }
        var swellRadius = baseRadius * (1 + flashProgress * 0.4);
        var flashAlpha = 1 - flashProgress * 0.3;
        var gR = swellRadius + 60 * flashProgress;
        var gG = ctx.createRadialGradient(cx, cy, swellRadius * 0.3, cx, cy, gR);
        gG.addColorStop(0, 'rgba(255,200,100,' + (0.6 * flashAlpha) + ')');
        gG.addColorStop(0.5, 'rgba(239,68,68,' + (0.3 * flashAlpha) + ')');
        gG.addColorStop(1, 'rgba(239,68,68,0)');
        ctx.fillStyle = gG;
        ctx.beginPath();
        ctx.arc(cx, cy, gR, 0, Math.PI * 2);
        ctx.fill();
        var oG = ctx.createRadialGradient(cx, cy, 0, cx, cy, swellRadius);
        var wr = lerp(239, 255, flashProgress);
        var wg = lerp(68, 220, flashProgress);
        var wb = lerp(68, 150, flashProgress);
        oG.addColorStop(0, 'rgba(255,255,240,' + flashAlpha + ')');
        oG.addColorStop(0.4, 'rgba(' + wr + ',' + wg + ',' + wb + ',' + (flashAlpha * 0.9) + ')');
        oG.addColorStop(1, 'rgba(200,50,20,' + (flashAlpha * 0.7) + ')');
        ctx.fillStyle = oG;
        ctx.shadowColor = 'rgba(255,150,50,' + flashAlpha + ')';
        ctx.shadowBlur = 80;
        ctx.beginPath();
        ctx.arc(cx, cy, swellRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // Phase 2: Shatter
      else if (elapsed < EXPLOSION_SHATTER_END) {
        var shatterProgress = (elapsed - EXPLOSION_FLASH_END) / (EXPLOSION_SHATTER_END - EXPLOSION_FLASH_END);
        var remnantAlpha = Math.max(0, 1 - shatterProgress * 2);
        if (remnantAlpha > 0) {
          var remnantR = baseRadius * (1.4 - shatterProgress * 0.8);
          var rG = ctx.createRadialGradient(cx, cy, 0, cx, cy, remnantR);
          rG.addColorStop(0, 'rgba(255,200,100,' + (remnantAlpha * 0.5) + ')');
          rG.addColorStop(1, 'rgba(239,68,68,0)');
          ctx.fillStyle = rG;
          ctx.beginPath();
          ctx.arc(cx, cy, remnantR, 0, Math.PI * 2);
          ctx.fill();
        }
        exp.shockwaveRadius = lerp(baseRadius, baseRadius * 4, shatterProgress);
        var swAlpha = (1 - shatterProgress) * 0.6;
        ctx.beginPath();
        ctx.arc(cx, cy, exp.shockwaveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,180,80,' + swAlpha + ')';
        ctx.lineWidth = 3 - shatterProgress * 2;
        ctx.stroke();
        for (var fi = 0; fi < exp.fragments.length; fi++) {
          var frag = exp.fragments[fi];
          var fragTime = elapsed - EXPLOSION_FLASH_END;
          drawFragment(ctx, frag.originX + frag.vx * fragTime, frag.originY + frag.vy * fragTime, frag, frag.opacity, t);
        }
      }
      // Phase 3: Drift
      else if (elapsed < EXPLOSION_DRIFT_END) {
        var driftTime = elapsed - EXPLOSION_FLASH_END;
        var driftProgress = (elapsed - EXPLOSION_SHATTER_END) / (EXPLOSION_DRIFT_END - EXPLOSION_SHATTER_END);
        var centreAlpha = Math.max(0, 0.08 - driftProgress * 0.08);
        if (centreAlpha > 0) {
          var cG = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 0.8);
          cG.addColorStop(0, 'rgba(255,100,50,' + centreAlpha + ')');
          cG.addColorStop(1, 'rgba(255,100,50,0)');
          ctx.fillStyle = cG;
          ctx.beginPath();
          ctx.arc(cx, cy, baseRadius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        for (var di = 0; di < exp.fragments.length; di++) {
          var df = exp.fragments[di];
          var decel = 1 / (1 + driftTime * 0.3);
          var wobbleX = Math.sin(t * 0.5 + df.driftPhase) * df.driftAmp;
          var wobbleY = Math.cos(t * 0.4 + df.driftPhase * 1.3) * df.driftAmp * 0.7;
          var dpx = df.originX + df.vx * driftTime * decel + wobbleX;
          var dpy = df.originY + df.vy * driftTime * decel + wobbleY;
          var fadeAlpha = df.opacity * (1 - driftProgress * 0.3);
          drawFragment(ctx, dpx, dpy, df, fadeAlpha, t);
        }
      }
      // Phase 4: Reform
      else if (elapsed < EXPLOSION_REFORM_END) {
        var reformProgress = (elapsed - EXPLOSION_DRIFT_END) / (EXPLOSION_REFORM_END - EXPLOSION_DRIFT_END);
        var rEased = reformProgress < 0.5
          ? 2 * reformProgress * reformProgress
          : 1 - Math.pow(-2 * reformProgress + 2, 2) / 2;
        var rDriftTime = EXPLOSION_DRIFT_END - EXPLOSION_FLASH_END;
        var rDecel = 1 / (1 + rDriftTime * 0.3);
        for (var ri = 0; ri < exp.fragments.length; ri++) {
          var rf = exp.fragments[ri];
          var rdx = rf.originX + rf.vx * rDriftTime * rDecel;
          var rdy = rf.originY + rf.vy * rDriftTime * rDecel;
          var tAngle = Math.atan2(rf.originY - cy, rf.originX - cx);
          var tX = cx + Math.cos(tAngle) * baseRadius * 0.5;
          var tY = cy + Math.sin(tAngle) * baseRadius * 0.5;
          var rpx = lerp(rdx, tX, rEased);
          var rpy = lerp(rdy, tY, rEased);
          var rfa = rf.opacity * 0.7 * (1 - rEased * 0.7);
          var reformFrag = {
            innerColor: [lerp(rf.innerColor[0], 255, rEased), lerp(rf.innerColor[1], 69, rEased), lerp(rf.innerColor[2], 0, rEased)],
            outerColor: [lerp(rf.outerColor[0], 206, rEased), lerp(rf.outerColor[1], 56, rEased), lerp(rf.outerColor[2], 0, rEased)],
            accentColor: [lerp(rf.accentColor[0], 255, rEased), lerp(rf.accentColor[1], 120, rEased), lerp(rf.accentColor[2], 30, rEased)],
            radius: rf.radius * (1 - rEased * 0.6),
            seed: rf.seed, distortion: rf.distortion, segments: rf.segments, noiseSpeed: rf.noiseSpeed,
          };
          drawFragment(ctx, rpx, rpy, reformFrag, rfa, t);
        }
        // Orb fading back in
        if (rEased > 0.3) {
          var orbAlpha = (rEased - 0.3) / 0.7;
          var orbR = baseRadius * (0.5 + orbAlpha * 0.5);
          var colors = getColors('idle', isDark);
          var oGrad = ctx.createRadialGradient(cx - orbR * 0.25, cy - orbR * 0.25, 0, cx, cy, orbR * 1.3);
          oGrad.addColorStop(0, 'rgba(' + colors.accent[0] + ',' + colors.accent[1] + ',' + colors.accent[2] + ',' + (orbAlpha * 0.95) + ')');
          oGrad.addColorStop(0.35, 'rgba(' + colors.primary[0] + ',' + colors.primary[1] + ',' + colors.primary[2] + ',' + (orbAlpha * 0.9) + ')');
          oGrad.addColorStop(0.7, 'rgba(' + colors.secondary[0] + ',' + colors.secondary[1] + ',' + colors.secondary[2] + ',' + (orbAlpha * 0.85) + ')');
          oGrad.addColorStop(1, 'rgba(' + (colors.secondary[0] * 0.5) + ',' + (colors.secondary[1] * 0.5) + ',' + (colors.secondary[2] * 0.5) + ',' + (orbAlpha * 0.6) + ')');
          ctx.fillStyle = oGrad;
          ctx.shadowColor = colors.glow;
          ctx.shadowBlur = 40 * orbAlpha;
          ctx.globalAlpha = orbAlpha;
          ctx.beginPath();
          ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }
      // Phase 5: Complete
      else {
        exp.active = false;
        this.state = 'idle';
      }

      if (exp.active) {
        this.rafId = requestAnimationFrame(this._draw);
        return;
      }
    }

    // ---- NORMAL ORB DRAWING ----
    var colors = getColors(state, isDark);
    var sm = this.sm;
    var smoothSpeed = 0.04;
    sm.primary = lerpColor(sm.primary, colors.primary, smoothSpeed);
    sm.secondary = lerpColor(sm.secondary, colors.secondary, smoothSpeed);
    sm.accent = lerpColor(sm.accent, colors.accent, smoothSpeed);
    sm.audioLevel = lerp(sm.audioLevel, this.audioLevel, 0.12);
    sm.particleBase = lerp(sm.particleBase, colors.particleBase, smoothSpeed);

    var al = sm.audioLevel;
    var targetRadius = 1.0;
    switch (state) {
      case 'idle':
        targetRadius = 1.0 + Math.sin(t * 0.8) * 0.015;
        break;
      case 'thinking':
        targetRadius = 1.0 + Math.sin(t * 1.5) * 0.03;
        break;
      case 'speaking':
        targetRadius = 1.0 + al * 0.12 + Math.sin(t * 3) * 0.015;
        break;
    }
    sm.radius = lerp(sm.radius, targetRadius, 0.08);
    var radius = baseRadius * sm.radius;

    ctx.clearRect(0, 0, W, H);

    // Outer glow layers
    for (var gli = 4; gli >= 1; gli--) {
      var glR = radius + gli * 25 + al * gli * 15;
      var glA = (0.04 - gli * 0.008) + al * 0.02;
      var glGrad = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, glR);
      glGrad.addColorStop(0, 'rgba(' + sm.primary[0] + ',' + sm.primary[1] + ',' + sm.primary[2] + ',' + Math.max(0, glA) + ')');
      glGrad.addColorStop(1, 'rgba(' + sm.primary[0] + ',' + sm.primary[1] + ',' + sm.primary[2] + ',0)');
      ctx.fillStyle = glGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glR, 0, Math.PI * 2);
      ctx.fill();
    }

    // Main orb body with noise-distorted edge
    var segments = 128;
    ctx.beginPath();
    for (var mi = 0; mi <= segments; mi++) {
      var mAngle = (mi / segments) * Math.PI * 2;
      var mnx = Math.cos(mAngle);
      var mny = Math.sin(mAngle);
      var mDistortion = noise(mnx * 3, mny * 3, t * 0.8) * 8;
      if (state === 'thinking') {
        mDistortion += noise(mnx * 4 + t * 0.5, mny * 4, t * 1.2) * 6;
      } else if (state === 'speaking') {
        mDistortion += Math.sin(mAngle * 6 + t * 4) * al * 10;
      }
      var mr = radius + mDistortion;
      var mx = cx + mnx * mr;
      var my = cy + mny * mr;
      if (mi === 0) ctx.moveTo(mx, my);
      else ctx.lineTo(mx, my);
    }
    ctx.closePath();

    // Multi-stop gradient fill
    var pr = sm.primary[0], pg = sm.primary[1], pb = sm.primary[2];
    var sr = sm.secondary[0], sg = sm.secondary[1], sb = sm.secondary[2];
    var ar = sm.accent[0], ag = sm.accent[1], ab = sm.accent[2];
    var brightness = isDark ? 1.0 : 0.92;
    var mGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, 0, cx, cy, radius * 1.3);
    mGrad.addColorStop(0, 'rgba(' + (ar * brightness) + ',' + (ag * brightness) + ',' + (ab * brightness) + ',0.95)');
    mGrad.addColorStop(0.35, 'rgba(' + (pr * brightness) + ',' + (pg * brightness) + ',' + (pb * brightness) + ',0.9)');
    mGrad.addColorStop(0.7, 'rgba(' + (sr * brightness) + ',' + (sg * brightness) + ',' + (sb * brightness) + ',0.85)');
    mGrad.addColorStop(1, 'rgba(' + (sr * 0.5) + ',' + (sg * 0.5) + ',' + (sb * 0.5) + ',0.6)');
    ctx.fillStyle = mGrad;
    ctx.shadowColor = colors.glow;
    ctx.shadowBlur = 40 + al * 30;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Specular highlight (light orange tint)
    var spGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.35, 0, cx - radius * 0.1, cy - radius * 0.1, radius * 0.9);
    spGrad.addColorStop(0, 'rgba(255,140,60,0.18)');
    spGrad.addColorStop(0.4, 'rgba(255,120,40,0.06)');
    spGrad.addColorStop(1, 'rgba(255,100,20,0)');
    ctx.fillStyle = spGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Inner depth layer
    var iGrad = ctx.createRadialGradient(cx + radius * 0.15, cy + radius * 0.2, 0, cx, cy, radius);
    iGrad.addColorStop(0, 'rgba(' + sr + ',' + sg + ',' + sb + ',0.2)');
    iGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = iGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.95, 0, Math.PI * 2);
    ctx.fill();

    // Thinking swirl overlay
    if (state === 'thinking') {
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.6);
      for (var ring = 0; ring < 3; ring++) {
        var ringR = radius * (0.3 + ring * 0.2);
        ctx.beginPath();
        for (var ri2 = 0; ri2 <= 64; ri2++) {
          var ra = (ri2 / 64) * Math.PI * 2;
          var wobble = Math.sin(ra * 3 + t * 2 + ring) * 8;
          var rx = Math.cos(ra) * (ringR + wobble);
          var ry = Math.sin(ra) * (ringR + wobble);
          if (ri2 === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(' + ar + ',' + ag + ',' + ab + ',' + (0.3 - ring * 0.08) + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();
    }

    // Particles
    for (var pi = 0; pi < this.particles.length; pi++) {
      var p = this.particles[pi];
      var pAngle = p.angle + t * p.orbitSpeed * 0.3;
      var pDist = radius * p.distance;
      if (state === 'thinking') {
        var spiralPhase = (t * 0.5 + p.phaseOffset) % (Math.PI * 2);
        pDist = radius * (0.3 + p.distance * 0.5 * (0.5 + 0.5 * Math.sin(spiralPhase)));
        pAngle += t * p.orbitSpeed * 0.8;
      } else if (state === 'speaking') {
        pDist = radius * p.distance + al * 20 * Math.sin(t * 3 + p.phaseOffset);
        pAngle += t * p.orbitSpeed * 0.5;
      }
      var ppx = cx + Math.cos(pAngle) * pDist;
      var ppy = cy + Math.sin(pAngle) * pDist;
      var hue = sm.particleBase + p.hue;
      var pAlpha = p.opacity * (0.6 + 0.4 * Math.sin(t * p.speed + p.phaseOffset)) * (state === 'idle' ? 0.5 : 0.8 + al * 0.2);
      ctx.beginPath();
      ctx.arc(ppx, ppy, p.size * (0.8 + al * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + hue + ',80%,' + (isDark ? 70 : 60) + '%,' + pAlpha + ')';
      ctx.fill();
    }

    // Speaking pulse rings
    if (state === 'speaking' && al > 0.05) {
      var pulsePhase = (t * 2.5) % 2;
      var ringR = radius + pulsePhase * 50;
      var ringAlpha = (1 - pulsePhase / 2) * al * 0.25;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + pr + ',' + pg + ',' + pb + ',' + ringAlpha + ')';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    this.rafId = requestAnimationFrame(this._draw);
  };

  // =========================================================================
  // British English normaliser — OpenAI transcription uses US spellings
  // =========================================================================

  var BE_REPLACEMENTS = [
    [/\benroll(s|ing|ed)?\b/gi, function (m, s) { return 'enrol' + (s === 's' ? 's' : s === 'ing' ? 'ling' : s === 'ed' ? 'led' : ''); }],
    [/\benrollment(s)?\b/gi, function (m, s) { return 'enrolment' + (s || ''); }],
    [/\bauthoriz(e|es|ed|ing|ation)\b/gi, function (m, s) { return 'authoris' + s; }],
    [/\bcustomiz(e|es|ed|ing|ation)\b/gi, function (m, s) { return 'customis' + s; }],
    [/\borganiz(e|es|ed|ing|ation|ations)\b/gi, function (m, s) { return 'organis' + s; }],
    [/\boptimiz(e|es|ed|ing|ation)\b/gi, function (m, s) { return 'optimis' + s; }],
    [/\brecogniz(e|es|ed|ing)\b/gi, function (m, s) { return 'recognis' + s; }],
    [/\butiliz(e|es|ed|ing|ation)\b/gi, function (m, s) { return 'utilis' + s; }],
    [/\bminimiz(e|es|ed|ing)\b/gi, function (m, s) { return 'minimis' + s; }],
    [/\bmoderniz(e|es|ed|ing|ation)\b/gi, function (m, s) { return 'modernis' + s; }],
    [/\bcentraliz(e|es|ed|ing|ation)\b/gi, function (m, s) { return 'centralis' + s; }],
    [/\bstandardiz(e|es|ed|ing|ation)\b/gi, function (m, s) { return 'standardis' + s; }],
    [/\bspecializ(e|es|ed|ing|ation)\b/gi, function (m, s) { return 'specialis' + s; }],
    [/\bfavor(s|ed|ing|ite|ites)?\b/gi, function (m, s) { return 'favour' + (s || ''); }],
    [/\bcolor(s|ed|ing)?\b/gi, function (m, s) { return 'colour' + (s || ''); }],
    [/\bbehavior(s)?\b/gi, function (m, s) { return 'behaviour' + (s || ''); }],
    [/\blicens(e|es|ed|ing)\b/gi, function (m, s) { return 'licenc' + (s === 'ing' ? 'ing' : s); }],
    [/\bdefens(e|es)\b/gi, function (m, s) { return 'defenc' + s; }],
    [/\bcatalog(s|ed|ing)?\b/gi, function (m, s) { return 'catalogue' + (s === 's' ? 's' : s === 'ed' ? 'd' : s === 'ing' ? 'ing' : ''); }],
    [/\bcenter(s|ed)?\b/gi, function (m, s) { return 'centre' + (s || ''); }],
  ];

  function toBritishEnglish(text) {
    if (!text) return text;
    for (var i = 0; i < BE_REPLACEMENTS.length; i++) {
      text = text.replace(BE_REPLACEMENTS[i][0], BE_REPLACEMENTS[i][1]);
    }
    return text;
  }

  // =========================================================================
  // Voice engine (OpenAI Realtime API via WebRTC)
  // =========================================================================

  var REALTIME_TOOLS = [
    {
      type: 'function',
      name: 'search_bayton',
      description: 'Search bayton.org documentation for Android Enterprise content, guides, and resources.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'The search query' },
        },
        required: ['query'],
      },
    },
    {
      type: 'function',
      name: 'sysapps_search',
      description: 'Search the bayton.org Android system apps database by package name, app name, or alias. Use when users ask about system apps, bloatware, pre-installed apps, or package names.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Package name, app name, or keyword' },
        },
        required: ['query'],
      },
    },
    {
      type: 'function',
      name: 'sysapps_list_devices',
      description: 'List devices in the system apps database. Optionally filter by OEM, model, or OS.',
      parameters: {
        type: 'object',
        properties: {
          make: { type: 'string', description: 'OEM filter e.g. "Samsung"' },
          model: { type: 'string', description: 'Model filter' },
          os: { type: 'string', description: 'OS version filter' },
        },
      },
    },
    {
      type: 'function',
      name: 'sysapps_get_device_apps',
      description: 'Get the full system app list for a specific device. Use sysapps_list_devices first to find exact values.',
      parameters: {
        type: 'object',
        properties: {
          make: { type: 'string', description: 'OEM name (exact)' },
          model: { type: 'string', description: 'Device model (exact)' },
          os: { type: 'string', description: 'OS version (exact)' },
        },
        required: ['make', 'model', 'os'],
      },
    },
    {
      type: 'function',
      name: 'fetch_url',
      description: 'LAST RESORT ONLY. Fetch content from an external Android documentation URL. ONLY use this AFTER search_bayton returned no useful results. Allowed domains: developer.android.com, source.android.com, androidenterprise.community. Returns plain text content from the page.',
      parameters: {
        type: 'object',
        properties: {
          url: { type: 'string', description: 'The full URL to fetch (must be on an allowed domain)' },
        },
        required: ['url'],
      },
    },
  ];

  function VoiceEngine(orb) {
    this.orb = orb;
    this.isLive = false;
    this.isConnecting = false;
    this.pc = null;
    this.dc = null;
    this.localStream = null;
    this.remoteAudio = null;
    this.handledToolCalls = {};
    this.deliveredResponses = {};
    this.pendingSources = null;     // sources from the last search_bayton tool call
    this.lastUserTranscript = '';   // for client-side question saving
    this.onTranscript = null;       // callback(transcript)
    this.onAssistantMessage = null; // callback(text, sources)
    this.onLoadingStart = null;
    this.onLoadingEnd = null;
  }

  VoiceEngine.prototype.stopVoice = function () {
    if (this._livenessInterval) { clearInterval(this._livenessInterval); this._livenessInterval = null; }
    if (this.dc) { try { this.dc.close(); } catch (e) {} }
    if (this.pc) { try { this.pc.close(); } catch (e) {} }
    if (this.localStream) {
      this.localStream.getTracks().forEach(function (t) { t.stop(); });
    }
    if (this.remoteAudio) {
      this.remoteAudio.pause();
      this.remoteAudio.srcObject = null;
    }
    this.dc = null;
    this.pc = null;
    this.localStream = null;
    this.remoteAudio = null;
    this.handledToolCalls = {};
    this.deliveredResponses = {};
    this.isLive = false;
    this.isConnecting = false;
    this.orb.setState('idle');
    this.orb.setAudioLevel(0);
    this.updateMicButton();
  };

  VoiceEngine.prototype.startVoice = function () {
    if (this.isConnecting) return;
    var self = this;

    // Clean up stale session
    if (this.pc) this.stopVoice();

    this.isConnecting = true;
    this.updateMicButton();

    (async function () {
      try {
        // 1. Get ephemeral key
        var sessionRes = await fetch('/api/orb-realtime-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        var sessionJson = await sessionRes.json().catch(function () { return {}; });
        if (!sessionRes.ok) throw new Error('Unable to start realtime session.');
        var ephemeralKey = sessionJson && sessionJson.client_secret && sessionJson.client_secret.value;
        if (!ephemeralKey) throw new Error('Realtime session token was not returned.');
        var model = sessionJson.model || 'gpt-realtime-1.5';

        // 2. Mic access
        var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        self.localStream = stream;

        // 3. RTCPeerConnection
        var pc = new RTCPeerConnection();
        stream.getTracks().forEach(function (track) { pc.addTrack(track, stream); });

        // 4. Remote audio element
        var audio = new Audio();
        audio.autoplay = true;
        audio.playsInline = true;
        audio.volume = 1;
        audio.onplaying = function () { self.orb.setState('speaking'); };
        self.remoteAudio = audio;

        // Audio level monitoring for orb animation
        var audioCtx = null;
        var analyser = null;
        var levelData = null;
        pc.ontrack = function (event) {
          self.orb.setState('speaking');
          audio.srcObject = event.streams[0];
          audio.play().catch(function () {});
          // Set up audio level analyser
          try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            var source = audioCtx.createMediaStreamSource(event.streams[0]);
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            levelData = new Uint8Array(analyser.frequencyBinCount);
            (function updateLevel() {
              if (!self.isLive) { if (audioCtx) audioCtx.close().catch(function(){}); return; }
              analyser.getByteFrequencyData(levelData);
              var sum = 0;
              for (var li = 0; li < levelData.length; li++) sum += levelData[li];
              var avg = sum / levelData.length / 255;
              self.orb.setAudioLevel(avg);
              requestAnimationFrame(updateLevel);
            })();
          } catch (e) {
            console.warn('[VoiceEngine] Audio analyser setup failed:', e);
          }
        };

        // 5. Data channel
        var dc = pc.createDataChannel('oai-events');

        dc.onmessage = function (event) {
          try {
            var msg = JSON.parse(event.data);
            var type = msg && msg.type;

            // Error events
            if (type === 'error') {
              var errMsg = (msg.error && msg.error.message) || 'Unknown error';
              var isHarmless = /no active response|cancellation failed|already has an active response/i.test(errMsg);
              if (!isHarmless) console.error('[Realtime API error]', errMsg);
            }

            // Speech started — cancel current response
            if (type === 'input_audio_buffer.speech_started') {
              try { dc.send(JSON.stringify({ type: 'response.cancel' })); } catch (e) {}
              self.orb.setState('listening');
            }

            // User transcript
            if (type === 'conversation.item.input_audio_transcription.completed' && typeof msg.transcript === 'string') {
              var transcript = toBritishEnglish(msg.transcript.trim());
              if (transcript) {
                self.lastUserTranscript = transcript;
                if (self.onTranscript) self.onTranscript(transcript);
              }
              self.orb.setState('thinking');
              if (self.onLoadingStart) self.onLoadingStart();
            }

            // Audio activity
            if (typeof type === 'string' && /audio/i.test(type)) {
              self.orb.setState('speaking');
            }

            // Completed assistant audio transcript
            if (type === 'response.audio_transcript.done' && typeof msg.transcript === 'string') {
              var text = toBritishEnglish(msg.transcript.trim());
              var responseId = String(msg.response_id || '');
              var dedupKey = responseId ? 'resp:' + responseId : 'text:' + text.slice(0, 200);
              if (text && !self.deliveredResponses[dedupKey]) {
                self.deliveredResponses[dedupKey] = true;
                var sources = self.pendingSources || [];
                self.pendingSources = [];
                if (self.onAssistantMessage) self.onAssistantMessage(text, sources);
              }
              if (self.onLoadingEnd) self.onLoadingEnd();
            }

            // Text-only fallback via output_item.done
            if (type === 'response.output_item.done' && msg.item && msg.item.type === 'message' && msg.item.role === 'assistant') {
              var respId = String(msg.response_id || '');
              var dk = respId ? 'resp:' + respId : '';
              if (dk && self.deliveredResponses[dk]) {
                if (self.onLoadingEnd) self.onLoadingEnd();
                return;
              }
              var assistText = '';
              if (Array.isArray(msg.item.content)) {
                msg.item.content.forEach(function (c) {
                  if (c.text) assistText += c.text;
                  if (c.transcript) assistText += c.transcript;
                });
              }
              assistText = toBritishEnglish(assistText.trim());
              if (assistText) {
                var textDk = 'text:' + assistText.slice(0, 200);
                if (!self.deliveredResponses[textDk]) {
                  if (dk) self.deliveredResponses[dk] = true;
                  self.deliveredResponses[textDk] = true;
                  var sources = self.pendingSources || [];
                  self.pendingSources = [];
                  if (self.onAssistantMessage) self.onAssistantMessage(assistText, sources);
                }
              }
              if (self.onLoadingEnd) self.onLoadingEnd();
            }

            // Function call — execute via REST
            if (type === 'response.output_item.done' && msg.item && msg.item.type === 'function_call') {
              var item = msg.item;
              var callId = String(item.call_id || item.id || '').trim();
              var toolName = String(item.name || '').trim();

              if (!callId || !toolName || self.handledToolCalls[callId]) return;
              self.handledToolCalls[callId] = true;

              var args = {};
              try { args = JSON.parse(item.arguments || '{}'); } catch (e) {}

              self.orb.setState('thinking');
              if (self.onLoadingStart) self.onLoadingStart();

              // Execute tool asynchronously
              fetch('/api/orb-realtime-tool', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tool_name: toolName, arguments: args }),
              })
                .then(function (r) { return r.json().catch(function () { return {}; }); })
                .then(function (toolData) {
                  // Capture sources from search_bayton or fetch_url for the next assistant message
                  if (toolData.sources && toolData.sources.length > 0) {
                    if (self.pendingSources && self.pendingSources.length > 0) {
                      // Merge — don't replace search sources with fetch sources
                      var existingUrls = {};
                      self.pendingSources.forEach(function (s) { existingUrls[s.url] = true; });
                      toolData.sources.forEach(function (s) {
                        if (!existingUrls[s.url]) self.pendingSources.push(s);
                      });
                    } else {
                      self.pendingSources = toolData.sources;
                    }
                  }
                  var output = toolData.result || JSON.stringify(toolData);
                  try {
                    dc.send(JSON.stringify({
                      type: 'conversation.item.create',
                      item: {
                        type: 'function_call_output',
                        call_id: callId,
                        output: typeof output === 'string' ? output : JSON.stringify(output),
                      },
                    }));
                    // Only trigger a new response for search — save_question is fire-and-forget
                    if (toolName !== 'save_question') {
                      dc.send(JSON.stringify({
                        type: 'response.create',
                        response: {
                          modalities: ['text', 'audio'],
                          tool_choice: 'auto',
                          instructions: 'Use the tool output to answer clearly in concise British English. Summarise rather than reading raw data. Cite sources by article title. The search results are the ONLY source of truth — do NOT use your own training knowledge. Read ALL results before answering. Do NOT confuse deployment scenarios — QR code provisions fully managed devices, NOT work profiles.',
                        },
                      }));
                    }
                  } catch (sendErr) {
                    console.warn('[VoiceEngine] DC send failed (session may have ended):', sendErr.message);
                  }
                })
                .catch(function (err) {
                  console.error('[VoiceEngine] Tool error:', toolName, err);
                  try {
                    dc.send(JSON.stringify({
                      type: 'conversation.item.create',
                      item: {
                        type: 'function_call_output',
                        call_id: callId,
                        output: JSON.stringify({ error: err.message || 'Tool execution failed.' }),
                      },
                    }));
                    if (toolName !== 'save_question') {
                      dc.send(JSON.stringify({ type: 'response.create', response: { modalities: ['text', 'audio'] } }));
                    }
                  } catch (sendErr) {
                    console.warn('[VoiceEngine] DC send failed (session may have ended):', sendErr.message);
                  }
                });
            }

            // Response lifecycle
            if (type === 'response.created') {
              self.orb.setState('thinking');
              if (self.onLoadingStart) self.onLoadingStart();
            }
            if (type === 'response.done') {
              self.orb.setState('idle');
              if (self.onLoadingEnd) self.onLoadingEnd();
            }
          } catch (e) {
            // Ignore malformed events
          }
        };

        // 6. Session update on data channel open
        dc.onopen = function () {
          dc.send(JSON.stringify({
            type: 'session.update',
            session: {
              modalities: ['text', 'audio'],
              voice: 'sage',
              turn_detection: {
                type: 'server_vad',
                threshold: 0.4,
                prefix_padding_ms: 500,
                silence_duration_ms: 1400,
                create_response: true,
              },
              input_audio_transcription: {
                model: 'gpt-4o-mini-transcribe',
                language: 'en',
              },
              tools: REALTIME_TOOLS,
              tool_choice: 'auto',
            },
          }));
        };

        // 7. SDP offer
        var offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        var sdpRes = await fetch(
          'https://api.openai.com/v1/realtime?model=' + encodeURIComponent(model),
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + ephemeralKey,
              'Content-Type': 'application/sdp',
            },
            body: offer.sdp || '',
          }
        );
        var answerSdp = await sdpRes.text();
        if (!sdpRes.ok) throw new Error(answerSdp || 'Realtime connection failed.');

        // 8. Set remote description
        await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

        self.pc = pc;
        self.dc = dc;
        self.isLive = true;
        self.isConnecting = false;
        self.orb.setState('idle');
        self.updateMicButton();
        // Play a ready chime so the user knows to start speaking
        self._playReadyChime();

        // Liveness check — detect and clean up dead sessions
        self._livenessInterval = setInterval(function () {
          if (self.dc && self.dc.readyState !== 'open') {
            console.warn('[VoiceEngine] Data channel died — cleaning up');
            self.stopVoice();
            return;
          }
          if (self.pc && (self.pc.connectionState === 'failed' || self.pc.connectionState === 'closed' || self.pc.connectionState === 'disconnected')) {
            console.warn('[VoiceEngine] Peer connection died — cleaning up');
            self.stopVoice();
          }
        }, 5000);
      } catch (e) {
        console.error('[VoiceEngine] start failed:', e);
        if (self.localStream) {
          self.localStream.getTracks().forEach(function (t) { t.stop(); });
          self.localStream = null;
        }
        self.isConnecting = false;
        self.orb.setState('idle');
        self.updateMicButton();
        if (self.onError) self.onError('Voice connection failed — try again in a moment.');
      }
    })();
  };

  VoiceEngine.prototype.sendTextMessage = function (text) {
    var dc = this.dc;
    if (!dc || dc.readyState !== 'open') {
      // Session is dead — clean up and fall through to text API
      if (this.isLive) this.stopVoice();
      return false;
    }
    var prompt = text.trim();
    if (!prompt) return false;
    try {
      dc.send(JSON.stringify({ type: 'response.cancel' }));
      if (this.onLoadingStart) this.onLoadingStart();
      dc.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [{ type: 'input_text', text: prompt }],
        },
      }));
      dc.send(JSON.stringify({
        type: 'response.create',
        response: {
          modalities: ['text', 'audio'],
          instructions: 'Respond in concise British English. If data lookup is needed, call the appropriate tool.',
        },
      }));
      return true;
    } catch (e) {
      // Send failed — session is dead
      this.stopVoice();
      return false;
    }
  };

  VoiceEngine.prototype.toggleMic = function () {
    if (this.isLive) {
      this.stopVoice();
    } else {
      this.startVoice();
    }
  };

  /**
   * Play a short ascending two-tone chime via the Web Audio API to signal
   * that the voice session is ready and the user can begin speaking.
   * Fails silently if the browser does not support Web Audio.
   */
  VoiceEngine.prototype._playReadyChime = function () {
    try {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var gainNode = audioCtx.createGain();
      gainNode.connect(audioCtx.destination);

      // First tone: lower note
      var osc1 = audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc1.connect(gainNode);
      gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.22);
      osc1.start(audioCtx.currentTime);
      osc1.stop(audioCtx.currentTime + 0.22);

      // Second tone: higher note, slightly delayed for the rising "ding" feel
      var gainNode2 = audioCtx.createGain();
      gainNode2.connect(audioCtx.destination);
      var osc2 = audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1320, audioCtx.currentTime + 0.18);
      osc2.connect(gainNode2);
      gainNode2.gain.setValueAtTime(0, audioCtx.currentTime + 0.18);
      gainNode2.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.26);
      gainNode2.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.55);
      osc2.start(audioCtx.currentTime + 0.18);
      osc2.stop(audioCtx.currentTime + 0.55);

      osc2.onended = function () { audioCtx.close().catch(function () {}); };
    } catch (e) {
      // Audio chime not supported — fail silently
    }
  };

  VoiceEngine.prototype.updateMicButton = function () {
    var btn = document.getElementById('orb-mic-btn');
    if (!btn) return;
    if (this.isConnecting) {
      // Session is being established — show a subtle pulsing indicator
      btn.classList.remove('orb-mic-active');
      btn.classList.add('orb-mic-connecting');
      btn.setAttribute('aria-label', 'Connecting...');
    } else if (this.isLive) {
      // Session is live and ready to listen
      btn.classList.remove('orb-mic-connecting');
      btn.classList.add('orb-mic-active');
      btn.setAttribute('aria-label', 'End voice session');
    } else {
      btn.classList.remove('orb-mic-active', 'orb-mic-connecting');
      btn.setAttribute('aria-label', 'Start voice session');
    }
  };

  VoiceEngine.prototype.destroy = function () {
    this.stopVoice();
  };

  // =========================================================================
  // Chat controller
  // =========================================================================

  var MIKA_STORAGE_KEY = 'mika-chat-history';

  function ChatController(orb, voice) {
    this.orb = orb;
    this.voice = voice;
    this.messages = []; // { role: 'user'|'assistant', content: string }
    this.isProcessing = false;
    this.messagesEl = document.getElementById('orb-messages');
    this.inputEl = document.getElementById('orb-input');
    this.sendBtn = document.getElementById('orb-send-btn');
    this.recentEl = document.getElementById('orb-recent-questions');

    // Restore conversation from widget or previous session
    try {
      var saved = JSON.parse(localStorage.getItem(MIKA_STORAGE_KEY) || '[]');
      if (Array.isArray(saved) && saved.length > 0) {
        // Filter out any stale welcome messages that got persisted by mistake
        var welcome = 'I can search documentation';
        saved = saved.filter(function (m) { return m.content.indexOf(welcome) === -1; });
        for (var i = 0; i < saved.length; i++) {
          this.addMessage(saved[i].role, saved[i].content);
        }
        if (saved.length > 0) {
          try { localStorage.setItem(MIKA_STORAGE_KEY, JSON.stringify(saved)); } catch (e) {}
        } else {
          localStorage.removeItem(MIKA_STORAGE_KEY);
        }
      }
    } catch (e) {}

    var self = this;

    // Text send
    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', function () { self.sendFromInput(); });
    }
    if (this.inputEl) {
      this.inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          self.sendFromInput();
        }
      });
    }

    // Voice callbacks (Realtime API)
    if (this.voice) {
      this.voice.onTranscript = function (transcript) {
        self.addMessage('user', transcript);
        self.isProcessing = true;
        self.updateProcessingState();
      };
      this.voice.onAssistantMessage = function (text, sources) {
        self.addMessage('assistant', text, sources);
        self.isProcessing = false;
        self.updateProcessingState();
        // Auto-save question client-side — don't rely on LLM calling save_question
        var q = self.voice.lastUserTranscript;
        if (q && self._shouldSaveQuestion(q)) {
          var isMissing = /don't have information|jason.*draft|no relevant/i.test(text);
          fetch('/api/orb-realtime-tool', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tool_name: 'save_question',
              arguments: { question: q, answer: isMissing ? 'missing content' : text },
            }),
          }).then(function (r) {
            return r.json();
          }).catch(function (e) {
            console.error('[AutoSave] Failed:', e);
          });
        }
      };
      this.voice.onLoadingStart = function () {
        self.isProcessing = true;
        self.updateProcessingState();
      };
      this.voice.onLoadingEnd = function () {
        self.isProcessing = false;
        self.updateProcessingState();
      };
      this.voice.onError = function (msg) {
        self.addMessage('assistant', msg);
      };
    }

    // Load recent questions
    this.loadRecentQuestions();

    // Show welcome message only if no restored history
    if (this.messages.length === 0) {
      this._addWelcome('I can search documentation, guides, and resources across bayton.org to help you find what you need. You can type or use the microphone.');
    }
  }

  // Add a message to the UI only — does NOT persist to history/localStorage
  ChatController.prototype._addWelcome = function (content) {
    if (!this.messagesEl) return;
    var wrapper = document.createElement('div');
    wrapper.className = 'orb-msg orb-msg-assistant';
    var bubble = document.createElement('div');
    bubble.className = 'orb-bubble orb-bubble-assistant';
    bubble.innerHTML = this.renderMarkdown(content);
    wrapper.appendChild(bubble);
    this.messagesEl.appendChild(wrapper);
  };

  // Determine if a user message is worth saving as a question
  ChatController.prototype._shouldSaveQuestion = function (text) {
    if (!text || text.length < 10) return false;
    var lower = text.toLowerCase().trim();
    // Hard reject — greetings, pleasantries, chit-chat
    if (/^(hi|hey|hello|howdy|sup|yo|thanks|thank you|cheers|ok|okay|bye|goodbye|good (morning|afternoon|evening|night)|how are you|what'?s up|nice|cool|great|awesome|brilliant|wow|lol|haha)/.test(lower)) return false;
    // Hard reject — very short non-questions
    if (lower.length < 15 && !/\?/.test(lower)) return false;
    // Strong signal — contains AE-related keywords (soft boost, not required)
    var aeSignals = /android|enterprise|provisioning|enrolment|enrollment|work.?profile|fully.?managed|dedicated|cope|byod|mdm|emm|oemconfig|zero.?touch|knox|samsung|intune|amapi|dpc|device.?admin|managed.?google|play.?protect|gms|aer|recommended|kiosk|rugged|factory.?reset|qr.?code|nfc|kme|policy|restriction|compliance|app.?management|managed.?config/i;
    if (aeSignals.test(lower)) return true;
    // Fallback — if it ends with a question mark or is long enough, probably worth saving
    if (/\?/.test(lower)) return true;
    if (lower.length >= 30) return true;
    return false;
  };

  ChatController.prototype.sendFromInput = function () {
    if (!this.inputEl || this.isProcessing) return;
    var text = this.inputEl.value.trim();
    if (!text) return;
    this.inputEl.value = '';

    // Order 66 easter egg
    if (/^(execute\s+)?order\s*66$/i.test(text)) {
      this.addMessage('user', text);
      this.addMessage('assistant', 'It will be done, my Lord.');
      this.orb.triggerExplosion();
      return;
    }

    // If Realtime session is active, send text through it (gets voice response)
    if (this.voice && this.voice.isLive && this.voice.sendTextMessage(text)) {
      this.addMessage('user', text);
      this.isProcessing = true;
      this.updateProcessingState();
      return;
    }

    this.sendMessage(text);
  };

  ChatController.prototype.sendMessage = function (text) {
    this.addMessage('user', text);
    this.isProcessing = true;
    this.updateProcessingState();
    this.orb.setState('thinking');

    var self = this;
    var history = this.messages.slice(-10).map(function (m) {
      return { role: m.role, content: m.content };
    });

    fetch('/api/orb-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('API returned ' + res.status);
        return res.json();
      })
      .then(function (data) {
        self.isProcessing = false;
        self.updateProcessingState();
        if (data && data.reply) {
          self.addMessage('assistant', toBritishEnglish(data.reply), data.sources);
          self.orb.setState('idle');
        } else {
          self.addMessage('assistant', 'Sorry, something went wrong. Please try again.');
          self.orb.setState('idle');
        }
      })
      .catch(function (err) {
        console.error('Chat error:', err);
        self.isProcessing = false;
        self.updateProcessingState();
        self.addMessage('assistant', 'Connection error. Please try again.');
        self.orb.setState('idle');
      });
  };

  ChatController.prototype.addMessage = function (role, content, sources) {
    this.messages.push({ role: role, content: content });
    try { localStorage.setItem(MIKA_STORAGE_KEY, JSON.stringify(this.messages.slice(-20))); } catch (e) {}
    if (!this.messagesEl) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'orb-msg orb-msg-' + role;

    var bubble = document.createElement('div');
    bubble.className = 'orb-bubble orb-bubble-' + role;
    bubble.innerHTML = this.renderMarkdown(content);
    wrapper.appendChild(bubble);

    // Source links
    if (sources && sources.length > 0) {
      // For text responses with inline markdown links, filter out duplicates
      // For voice responses (no URLs in content), show all sources
      var hasAnyUrl = /https?:\/\//.test(content);
      var toShow = sources;
      if (hasAnyUrl) {
        toShow = sources.filter(function (s) {
          return !content.includes(s.url) && !content.includes('(' + s.url + ')');
        });
      }
      if (toShow.length > 0) {
        var srcDiv = document.createElement('div');
        srcDiv.className = 'orb-sources';
        toShow.forEach(function (s) {
          var a = document.createElement('a');
          a.href = s.url;
          a.textContent = s.title;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          srcDiv.appendChild(a);
        });
        wrapper.appendChild(srcDiv);
      }
    }

    // Remove typing indicator if present
    var typing = this.messagesEl.querySelector('.orb-typing');
    if (typing) typing.remove();

    this.messagesEl.appendChild(wrapper);
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  };

  ChatController.prototype.updateProcessingState = function () {
    if (!this.messagesEl) return;
    var existing = this.messagesEl.querySelector('.orb-typing');
    if (this.isProcessing && !existing) {
      var wrapper = document.createElement('div');
      wrapper.className = 'orb-msg orb-msg-assistant orb-typing';
      wrapper.innerHTML = '<div class="orb-bubble orb-bubble-assistant"><span class="orb-dot"></span><span class="orb-dot"></span><span class="orb-dot"></span></div>';
      this.messagesEl.appendChild(wrapper);
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    } else if (!this.isProcessing && existing) {
      existing.remove();
    }
    if (this.sendBtn) this.sendBtn.disabled = this.isProcessing;
    if (this.inputEl) this.inputEl.disabled = this.isProcessing;
  };

  ChatController.prototype.renderMarkdown = function (text) {
    // Escape HTML
    var html = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Fenced code blocks: ```lang\n...\n```
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (m, lang, code) {
      return '<pre class="orb-code"><code>' + code.replace(/\n$/, '') + '</code></pre>';
    });

    // Inline code: `code`
    html = html.replace(/`([^`\n]+)`/g, '<code class="orb-inline-code">$1</code>');

    // Headings: ### h3, ## h2 (at start of line)
    html = html.replace(/(^|\n)#### (.+)/g, '$1<strong class="orb-h4">$2</strong>');
    html = html.replace(/(^|\n)### (.+)/g, '$1<strong class="orb-h3">$2</strong>');
    html = html.replace(/(^|\n)## (.+)/g, '$1<strong class="orb-h2">$2</strong>');

    // Bold & italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (m, linkText, url) {
      if (/^(https?:\/\/|\/)/i.test(url)) {
        var safeUrl = url.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return '<a href="' + safeUrl + '" target="_blank" rel="noopener noreferrer">' + linkText + '</a>';
      }
      return linkText;
    });

    // Unordered lists: lines starting with - (convert blocks)
    html = html.replace(/(^|\n)(- .+(\n- .+)*)/g, function (m, pre, block) {
      var items = block.split('\n').map(function (line) {
        return '<li>' + line.replace(/^- /, '') + '</li>';
      }).join('');
      return pre + '<ul class="orb-list">' + items + '</ul>';
    });

    // Ordered lists: lines starting with 1. 2. etc
    html = html.replace(/(^|\n)(\d+\. .+(\n\d+\. .+)*)/g, function (m, pre, block) {
      var items = block.split('\n').map(function (line) {
        return '<li>' + line.replace(/^\d+\. /, '') + '</li>';
      }).join('');
      return pre + '<ol class="orb-list">' + items + '</ol>';
    });

    // Line breaks (but not inside <pre> blocks)
    html = html.replace(/\n/g, '<br>');
    // Clean up <br> immediately after block elements
    html = html.replace(/<\/(pre|ul|ol|li)><br>/g, '</$1>');
    html = html.replace(/<br><(pre|ul|ol)/g, '<$1');

    return html;
  };

  ChatController.prototype.loadRecentQuestions = function () {
    if (!this.recentEl) return;
    var self = this;
    fetch('/api/orb-popular')
      .then(function (res) { return res.ok ? res.json() : { questions: [] }; })
      .then(function (data) {
        var questions = data.questions || [];
        if (questions.length === 0) {
          self.recentEl.style.display = 'none';
          return;
        }
        self.recentEl.style.display = '';
        var list = self.recentEl.querySelector('.orb-recent-list');
        if (!list) return;
        list.innerHTML = '';
        questions.forEach(function (q) {
          var btn = document.createElement('button');
          btn.className = 'orb-recent-item';
          btn.textContent = q;
          btn.addEventListener('click', function () {
            if (self.inputEl) self.inputEl.value = q;
            self.sendFromInput();
          });
          list.appendChild(btn);
        });
      })
      .catch(function () {
        self.recentEl.style.display = 'none';
      });
  };

  // =========================================================================
  // Initialisation
  // =========================================================================

  document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('orb-canvas');
    if (!canvas) return;

    var orb = new OrbRenderer(canvas);
    orb.start();

    var voice = new VoiceEngine(orb);
    var chat = new ChatController(orb, voice);

    // Mic button
    var micBtn = document.getElementById('orb-mic-btn');
    if (micBtn) {
      micBtn.addEventListener('click', function () {
        voice.toggleMic();
      });
    }
  });
})();
