// IRA Marketing Solutions — Photorealistic Real Office Scrollytelling Engine
(function() {
  function initApp() {
    var $ = function(s) { return document.querySelector(s); };
    var gl = document.getElementById('gl');
    var sg = document.getElementById('sg');
    var f = document.getElementById('f');
    var side = document.getElementById('side');
    if (!gl || !sg || !f || !side) {
      setTimeout(initApp, 30);
      return;
    }

    // 1. Services Grid
    var SV = [
      ["Digital Marketing", "A practical growth plan built around your audience, goals, competition, and budget.", "Build My Strategy →"],
      ["Social Media", "Content that keeps your business visible, credible, and active where customers spend time.", "Improve My Social Presence →"],
      ["Meta Ads", "Facebook and Instagram campaigns designed to generate leads, calls, bookings, and sales.", "Generate More Leads →"],
      ["Google Ads", "Reach people who are already searching for the products or services you provide.", "Reach Customers Now →"],
      ["Website Design", "Clean, responsive websites that explain your value and guide visitors toward action.", "Build a Website That Converts →"],
      ["Branding & Creative", "A consistent visual identity that makes your business look professional and memorable.", "Strengthen My Brand →"],
      ["SEO", "Improve your visibility in search and create a stronger long-term source of organic traffic.", "Improve Search Visibility →"],
      ["Lead Generation", "Campaigns, landing pages, and follow-up systems designed to create more qualified opportunities.", "Build My Lead System →"],
      ["Marketing Automation", "Respond faster, follow up consistently, and reduce repetitive work.", "Automate My Follow-Up →"],
      ["AI & Voice Solutions", "Use AI to answer, qualify, schedule, route, and support customer conversations.", "Explore Third Assistant →"]
    ];

    var sel = $('#sv');
    $('#sg').innerHTML = SV.map(function(s, i) {
      return '<div class="cell"><h3>' + s[0] + '</h3><p>' + s[1] + '</p><a href="#contact" data-s="' + i + '">' + s[2] + '</a></div>';
    }).join('');

    if (sel) {
      sel.innerHTML = '<option>Choose a service</option>';
      SV.forEach(function(s) {
        var o = document.createElement('option');
        o.textContent = s[0] === 'Branding & Creative' ? 'Branding' : s[0] === 'AI & Voice Solutions' ? 'Third Assistant / AI Voice Assistant' : s[0];
        sel.appendChild(o);
      });
    }

    $('#sg').addEventListener('click', function(e) {
      var a = e.target.closest('[data-s]');
      if (a && sel) sel.selectedIndex = +a.dataset.s + 1;
    });

    // 2. Why IRA Grid
    $('#vg').innerHTML = [
      ["Strategy Before Spending", "We understand your business first, then recommend what actually makes sense."],
      ["Built Around Your Business", "No one-size-fits-all packages. Your plan is based on your market, goals, and stage of growth."],
      ["Focused on Real Outcomes", "We care about leads, calls, appointments, conversions, and sales — not just likes."],
      ["Creative + Data", "Strong ideas get attention. Performance data helps us improve what works."],
      ["Clear Communication", "You should always understand what is happening and why."],
      ["One Connected Growth System", "Branding, ads, websites, follow-up, automation, and AI work better together."]
    ].map(function(v) {
      return '<div class="cell"><h3>' + v[0] + '</h3><p>' + v[1] + '</p></div>';
    }).join('');

    // 3. Process Steps Grid
    $('#st').innerHTML = [
      ["Understand", "We learn your business, your customers, and your goals."],
      ["Identify", "We find where opportunities are being missed and where growth can come from."],
      ["Build", "We create the right strategy, content, campaigns, website experience, and follow-up."],
      ["Launch", "We put the plan into action across the channels that matter most."],
      ["Optimize", "We measure results, improve performance, and scale what works."]
    ].map(function(v) {
      return '<div class="cell"><h3>' + v[0] + '</h3><p>' + v[1] + '</p></div>';
    }).join('');

    // 4. Consultation Form Validation
    function chk(id, eid, msg, fn) {
      var el = $('#' + id);
      if (!el) return true;
      var ok = fn(el.value.trim());
      if (el.parentNode) el.parentNode.classList.toggle('bad', !ok);
      var errEl = $('#' + eid);
      if (errEl) errEl.textContent = ok ? '' : msg;
      return ok;
    }
    function vN() { return chk('n', 'en', 'Please enter your name.', function(v) { return v.length > 1; }); }
    function vE() { return chk('em', 'ee', 'Please enter a valid email, like you@business.com.', function(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); }); }
    if ($('#n')) $('#n').addEventListener('blur', vN);
    if ($('#em')) $('#em').addEventListener('blur', vE);
    if ($('#f')) {
      $('#f').addEventListener('submit', function(e) {
        e.preventDefault();
        var a = vN(), b = vE();
        if (!(a && b)) {
          (a ? $('#em') : $('#n')).focus();
          return;
        }
        [].forEach.call($('#f').children, function(c) { if (c.id !== 'ok') c.style.display = 'none'; });
        var ok = $('#ok');
        if (ok) { ok.style.display = 'block'; ok.focus(); }
      });
    }

    // 5. Scroll Progress Bar
    var pb = $('#pb');
    function prog() {
      if (!pb) return;
      var m = document.documentElement.scrollHeight - innerHeight;
      pb.style.width = (m > 0 ? scrollY / m * 100 : 0) + '%';
    }
    addEventListener('scroll', prog, { passive: true });
    prog();

    // 6. Desktop Navigation Chrome & Side Index
    var secs = [].slice.call(document.querySelectorAll('section.s')),
        cnum = document.getElementById('cnum'),
        ctot = document.getElementById('ctot'),
        keys = document.getElementById('keys'),
        cur = 0;
    if (secs.length && side) {
      side.innerHTML = '';
      var NAMES = ['Home', 'What we do', 'Services', 'Third Assistant', 'Why IRA', 'Process', 'About', 'Testimonials', 'Contact', 'Next step'];
      if (ctot) ctot.textContent = ('0' + secs.length).slice(-2);
      secs.forEach(function(sec, i) {
        var b = document.createElement('button');
        b.innerHTML = '<b></b>' + (NAMES[i] || ('Section ' + (i + 1)));
        b.addEventListener('click', function() { go(i); });
        side.appendChild(b);
        sec._btn = b;
      });
      function go(i) {
        i = Math.max(0, Math.min(secs.length - 1, i));
        secs[i].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }
      function mark() {
        var best = 0, bd = 1e9;
        secs.forEach(function(sec, i) {
          var d = Math.abs(sec.getBoundingClientRect().top - innerHeight * .32);
          if (d < bd) { bd = d; best = i; }
        });
        if (best !== cur || !mark.done) {
          cur = best;
          mark.done = 1;
          if (cnum) cnum.textContent = ('0' + (best + 1)).slice(-2);
          secs.forEach(function(sec, i) { if (sec._btn) sec._btn.classList.toggle('on', i === best); });
        }
        if (keys) keys.style.opacity = scrollY < 120 ? 1 : 0;
      }
      var q = false;
      addEventListener('scroll', function() {
        if (!q) {
          q = true;
          requestAnimationFrame(function() { q = false; mark(); });
        }
      }, { passive: true });
      addEventListener('resize', mark);
      addEventListener('keydown', function(e) {
        if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
        var k = e.key;
        if (k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); go(cur + 1); }
        else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); go(cur - 1); }
        else if (k === 'Home') { e.preventDefault(); go(0); }
        else if (k === 'End') { e.preventDefault(); go(secs.length - 1); }
      });
      mark();
    }

    // 7. Panel Reveal on Scroll
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pans = [].slice.call(document.querySelectorAll('.pan'));
    if (reduce) {
      pans.forEach(function(p) { p.classList.add('in'); });
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(es) {
        es.forEach(function(e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            [].forEach.call(e.target.querySelectorAll('.cell,.ticks li,.qt'), function(c, k) {
              c.style.transitionDelay = (.08 + k * .06) + 's';
            });
          }
        });
      }, { threshold: .18 });
      pans.forEach(function(p) { io.observe(p); });
    } else {
      pans.forEach(function(p) { p.classList.add('in'); });
    }

    // 8. ---- Photorealistic Real Office Scrollytelling Engine ----
    function initRealOfficeEngine() {
      var cv = document.getElementById('gl');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      if (!ctx) return;

      // Image assets representing real creative agency spaces
      var IMAGES_CONFIG = [
        { id: 'hero', src: '/office-hero.jpg' },           // Ultra-photorealistic IRA creative agency headquarters
        { id: 'meeting', src: '/office-meeting.jpg' },     // Real marketing team collaborating with laptops around conference table
        { id: 'team', src: '/office-team.jpg' },           // Tech & AI automation development team
        { id: 'reception', src: '/office-reception.jpg' }, // Executive glass-walled boardroom with daylight
        { id: 'lounge', src: '/office-lounge.jpg' },       // Bright modern consultation window workspace with skyline
        { id: 'success', src: '/office-success.jpg' }      // Real client & agency director celebrating growth success
      ];

      var images = {};
      var loadedCount = 0;
      var totalToLoad = IMAGES_CONFIG.length;

      IMAGES_CONFIG.forEach(function(cfg) {
        var img = new Image();
        img.onload = function() {
          images[cfg.id] = img;
          loadedCount++;
          requestRender();
        };
        img.onerror = function() {
          console.warn('Could not load image: ' + cfg.src);
          loadedCount++;
        };
        img.src = cfg.src;
      });

      // Camera staging across 10 funnel sections
      // Each stage defines: image ID, focal center (0..1), camera zoom (scale), and horizontal/vertical pan offset
      var STAGES = [
        // 0: Home - Establishing wide cinematic shot of the IRA creative hub
        { img: 'hero', fx: 0.50, fy: 0.45, zoom: 1.05, px: 0, py: 0 },
        // 1: What We Do - Smooth zoom & pan into the collaborative workstation with live charts & screens
        { img: 'hero', fx: 0.35, fy: 0.55, zoom: 1.28, px: -0.08, py: 0.04 },
        // 2: Services - Focus on the digital strategy team collaborating on marketing roadmaps
        { img: 'meeting', fx: 0.48, fy: 0.50, zoom: 1.12, px: 0.03, py: -0.02 },
        // 3: Third Assistant - Tech, AI, and automation engineers building voice & automation systems
        { img: 'team', fx: 0.52, fy: 0.50, zoom: 1.16, px: 0, py: 0.02 },
        // 4: Why IRA - High-level executive boardroom with crystal-clear sunlight and structure
        { img: 'reception', fx: 0.50, fy: 0.50, zoom: 1.08, px: 0, py: 0 },
        // 5: Our Process - Active collaborative sprint across the conference table executing the 5 stages
        { img: 'meeting', fx: 0.60, fy: 0.48, zoom: 1.25, px: 0.06, py: 0.03 },
        // 6: About Us - Warm view of the "CREATIVE HUB", bookshelves, and agency culture
        { img: 'hero', fx: 0.72, fy: 0.46, zoom: 1.24, px: 0.10, py: -0.02 },
        // 7: Testimonials - Real client & agency director celebrating verified growth results
        { img: 'success', fx: 0.50, fy: 0.45, zoom: 1.14, px: 0.02, py: 0 },
        // 8: Contact - Peaceful, sunlit consultation window counter ready for a strategy conversation
        { img: 'lounge', fx: 0.50, fy: 0.50, zoom: 1.10, px: 0, py: 0 },
        // 9: Final Thought - Inspiring panoramic agency perspective looking out towards new opportunities
        { img: 'hero', fx: 0.50, fy: 0.45, zoom: 1.08, px: 0, py: 0 }
      ];

      // Mouse interactive parallax
      var targetMx = 0, targetMy = 0, curMx = 0, curMy = 0;
      addEventListener('mousemove', function(e) {
        targetMx = (e.clientX / innerWidth - 0.5) * 2;
        targetMy = (e.clientY / innerHeight - 0.5) * 2;
      }, { passive: true });

      // Ambient floating sunlight dust particles
      var DUST_COUNT = 32;
      var particles = [];
      for (var p = 0; p < DUST_COUNT; p++) {
        particles.push({
          x: Math.random(),
          y: Math.random(),
          radius: 0.8 + Math.random() * 1.8,
          alpha: 0.15 + Math.random() * 0.35,
          vx: (Math.random() - 0.5) * 0.0003,
          vy: -0.0002 - Math.random() * 0.0004,
          flickerSpeed: 0.02 + Math.random() * 0.03,
          flickerOffset: Math.random() * Math.PI * 2
        });
      }

      // Smooth scroll interpolation
      var currentProgress = 0, targetProgress = 0;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var width = 0, height = 0;

      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        cv.width = Math.round(width * dpr);
        cv.height = Math.round(height * dpr);
        cv.style.width = width + 'px';
        cv.style.height = height + 'px';
        requestRender();
      }
      addEventListener('resize', resize, { passive: true });
      resize();

      function updateScrollProgress() {
        var maxScroll = document.documentElement.scrollHeight - innerHeight;
        targetProgress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
      }
      addEventListener('scroll', updateScrollProgress, { passive: true });
      updateScrollProgress();

      var isRendering = false;
      function requestRender() {
        if (!isRendering) {
          isRendering = true;
          requestAnimationFrame(renderLoop);
        }
      }

      // Draw an image with "cover" aspect-ratio, zoom, focal point, and pan
      function drawSceneImage(img, alpha, focalX, focalY, zoom, panX, panY, pMx, pMy) {
        if (!img || alpha <= 0.001) return;

        var imgW = img.naturalWidth || img.width;
        var imgH = img.naturalHeight || img.height;
        if (!imgW || !imgH) return;

        // Base cover calculation
        var scale = Math.max(width / imgW, height / imgH) * zoom;
        var drawW = imgW * scale;
        var drawH = imgH * scale;

        // Center on focal point + pan + mouse parallax
        var mouseShiftX = pMx * 24;
        var mouseShiftY = pMy * 16;
        var targetCenterX = width * 0.5 + panX * width + mouseShiftX;
        var targetCenterY = height * 0.5 + panY * height + mouseShiftY;

        var drawX = targetCenterX - (focalX * drawW);
        var drawY = targetCenterY - (focalY * drawH);

        // Clamp to avoid empty borders if zoom permits
        if (drawX > 0) drawX = 0;
        if (drawY > 0) drawY = 0;
        if (drawX + drawW < width) drawX = width - drawW;
        if (drawY + drawH < height) drawY = height - drawH;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, drawX * dpr, drawY * dpr, drawW * dpr, drawH * dpr);
        ctx.restore();
      }

      var time = 0;
      function renderLoop() {
        time += 0.016;

        // Smooth scroll position
        currentProgress += (targetProgress - currentProgress) * 0.10;
        // Smooth mouse parallax
        curMx += (targetMx - curMx) * 0.06;
        curMy += (targetMy - curMy) * 0.06;

        // Map scroll progress to stages
        var stagePosition = currentProgress * (STAGES.length - 1);
        var stageIdx = Math.floor(stagePosition);
        var nextStageIdx = Math.min(STAGES.length - 1, stageIdx + 1);
        var blend = stagePosition - stageIdx;

        // Smooth ease function for transitions
        var easeBlend = blend < 0.5 ? 2 * blend * blend : -1 + (4 - 2 * blend) * blend;

        var s1 = STAGES[stageIdx] || STAGES[0];
        var s2 = STAGES[nextStageIdx] || s1;

        ctx.clearRect(0, 0, cv.width, cv.height);

        // If s1 and s2 use the same image, smoothly interpolate camera parameters
        if (s1.img === s2.img) {
          var img = images[s1.img];
          var fx = s1.fx + (s2.fx - s1.fx) * easeBlend;
          var fy = s1.fy + (s2.fy - s1.fy) * easeBlend;
          var zoom = s1.zoom + (s2.zoom - s1.zoom) * easeBlend;
          var px = s1.px + (s2.px - s1.px) * easeBlend;
          var py = s1.py + (s2.py - s1.py) * easeBlend;

          drawSceneImage(img, 1.0, fx, fy, zoom, px, py, curMx, curMy);
        } else {
          // Cross-dissolve between two different scenes
          var img1 = images[s1.img];
          var img2 = images[s2.img];

          // Draw scene 1 (fading out)
          if (img1) {
            drawSceneImage(img1, 1.0 - easeBlend, s1.fx, s1.fy, s1.zoom, s1.px, s1.py, curMx, curMy);
          }
          // Draw scene 2 (fading in)
          if (img2) {
            drawSceneImage(img2, easeBlend, s2.fx, s2.fy, s2.zoom, s2.px, s2.py, curMx, curMy);
          }
        }

        // Warm daylight wash & subtle atmospheric overlay for light mode legibility
        ctx.save();
        var isLight = document.documentElement.getAttribute('data-theme') === 'light' || !document.documentElement.getAttribute('data-theme');
        var grad = ctx.createRadialGradient(width * 0.5 * dpr, height * 0.45 * dpr, 100 * dpr, width * 0.5 * dpr, height * 0.5 * dpr, Math.max(width, height) * 0.8 * dpr);
        if (isLight) {
          grad.addColorStop(0, 'rgba(235, 243, 255, 0.32)');
          grad.addColorStop(0.65, 'rgba(220, 234, 255, 0.48)');
          grad.addColorStop(1, 'rgba(185, 211, 255, 0.65)');
        } else {
          grad.addColorStop(0, 'rgba(4, 11, 26, 0.35)');
          grad.addColorStop(1, 'rgba(4, 11, 26, 0.70)');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.restore();

        // Ambient sunlit floating dust particles
        ctx.save();
        for (var i = 0; i < particles.length; i++) {
          var pt = particles[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.y < -0.05) { pt.y = 1.05; pt.x = Math.random(); }
          if (pt.x < -0.05) pt.x = 1.05;
          if (pt.x > 1.05) pt.x = -0.05;

          var flicker = Math.sin(time * 2 + pt.flickerOffset) * 0.2;
          var ptAlpha = Math.max(0.05, Math.min(0.6, pt.alpha + flicker));
          var pxX = (pt.x * width + curMx * 12) * dpr;
          var pxY = (pt.y * height + curMy * 8) * dpr;

          ctx.fillStyle = isLight ? 'rgba(255, 255, 255, ' + ptAlpha + ')' : 'rgba(120, 190, 255, ' + ptAlpha + ')';
          ctx.beginPath();
          ctx.arc(pxX, pxY, pt.radius * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Continue 60fps loop if still moving or keep animation active for dust & parallax
        requestAnimationFrame(renderLoop);
      }

      requestRender();
    }

    initRealOfficeEngine();
  }

  window.initFunnelApp = initApp;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

// Desktop tip dismiss handler
(function(){
  var t = document.getElementById('dtip');
  if (!t) return;
  var hide = function(){ t.classList.add('gone'); };
  var dclose = document.getElementById('dclose');
  if (dclose) dclose.addEventListener('click', hide);
  setTimeout(hide, 7000);
  addEventListener('scroll', function(){ if (scrollY > 400) hide(); }, { passive: true });
})();
