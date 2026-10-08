// IRA Marketing Solutions 3D Virtual Agency Walkthrough & Interactions
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

    var SV = [
      ["Digital Marketing","A practical growth plan built around your audience, goals, competition, and budget.","Build My Strategy →"],
      ["Social Media","Content that keeps your business visible, credible, and active where customers spend time.","Improve My Social Presence →"],
      ["Meta Ads","Facebook and Instagram campaigns designed to generate leads, calls, bookings, and sales.","Generate More Leads →"],
      ["Google Ads","Reach people who are already searching for the products or services you provide.","Reach Customers Now →"],
      ["Website Design","Clean, responsive websites that explain your value and guide visitors toward action.","Build a Website That Converts →"],
      ["Branding & Creative","A consistent visual identity that makes your business look professional and memorable.","Strengthen My Brand →"],
      ["SEO","Improve your visibility in search and create a stronger long-term source of organic traffic.","Improve Search Visibility →"],
      ["Lead Generation","Campaigns, landing pages, and follow-up systems designed to create more qualified opportunities.","Build My Lead System →"],
      ["Marketing Automation","Respond faster, follow up consistently, and reduce repetitive work.","Automate My Follow-Up →"],
      ["AI & Voice Solutions","Use AI to answer, qualify, schedule, route, and support customer conversations.","Explore Third Assistant →"]
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

    $('#vg').innerHTML = [
      ["Strategy Before Spending","We understand your business first, then recommend what actually makes sense."],
      ["Built Around Your Business","No one-size-fits-all packages. Your plan is based on your market, goals, and stage of growth."],
      ["Focused on Real Outcomes","We care about leads, calls, appointments, conversions, and sales — not just likes."],
      ["Creative + Data","Strong ideas get attention. Performance data helps us improve what works."],
      ["Clear Communication","You should always understand what is happening and why."],
      ["One Connected Growth System","Branding, ads, websites, follow-up, automation, and AI work better together."]
    ].map(function(v) {
      return '<div class="cell"><h3>' + v[0] + '</h3><p>' + v[1] + '</p></div>';
    }).join('');

    $('#st').innerHTML = [
      ["Understand","We learn your business, your customers, and your goals."],
      ["Identify","We find where opportunities are being missed and where growth can come from."],
      ["Build","We create the right strategy, content, campaigns, website experience, and follow-up."],
      ["Launch","We put the plan into action across the channels that matter most."],
      ["Optimize","We measure results, improve performance, and scale what works."]
    ].map(function(v) {
      return '<div class="cell"><h3>' + v[0] + '</h3><p>' + v[1] + '</p></div>';
    }).join('');

    // form
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

    // progress bar
    var pb = $('#pb');
    function prog() {
      if (!pb) return;
      var m = document.documentElement.scrollHeight - innerHeight;
      pb.style.width = (m > 0 ? scrollY / m * 100 : 0) + '%';
    }
    addEventListener('scroll', prog, { passive: true });
    prog();

    // desktop chrome: section list, counter, keyboard paging
    (function() {
      var secs = [].slice.call(document.querySelectorAll('section.s')),
          side = document.getElementById('side'),
          cnum = document.getElementById('cnum'),
          ctot = document.getElementById('ctot'),
          keys = document.getElementById('keys'),
          cur = 0;
      if (!secs.length || !side) return;
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
    })();

    // reveal panels on scroll
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

    // ---- Three.js Agency Floor ----
    function initThree() {
      if (!window.THREE) {
        setTimeout(initThree, 40);
        return;
      }
      var cv = $('#gl');
      if (!cv) return;
      var R;
      try {
        R = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
      } catch (e) {
        return;
      }

      var reduce2 = matchMedia('(prefers-reduced-motion: reduce)').matches, big = innerWidth > 900;
      R.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
      R.shadowMap.enabled = big;
      R.shadowMap.type = THREE.PCFSoftShadowMap;
      if (R.outputEncoding !== undefined) R.outputEncoding = THREE.sRGBEncoding;
      R.toneMapping = THREE.ACESFilmicToneMapping;
      var bc = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#040b1a'),
          light = (bc.r + bc.g + bc.b) / 3 > .5;
      R.toneMappingExposure = light ? 1.08 : .78;
      R.physicallyCorrectLights = true;
      var sc = new THREE.Scene();
      sc.fog = new THREE.Fog(bc, 44, 150);
      var cam = new THREE.PerspectiveCamera(60, 1, .1, 300), i, k, seed = 23;
      function rnd() { seed = seed * 16807 % 2147483647; return seed / 2147483647; }
      function cTex(draw, w, h, rx, ry) {
        var c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
        var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; if (rx) t.repeat.set(rx, ry);
        t.anisotropy = R.capabilities.getMaxAnisotropy ? R.capabilities.getMaxAnisotropy() : 8;
        if (t.encoding !== undefined) t.encoding = THREE.sRGBEncoding;
        return t;
      }
      function envMap() {
        try {
          var c = document.createElement('canvas'); c.width = 512; c.height = 256; var x = c.getContext('2d');
          var g = x.createLinearGradient(0, 0, 0, 256);
          g.addColorStop(0, light ? '#ffffff' : '#9fb9dd'); g.addColorStop(.42, light ? '#dceaff' : '#4d6party');
          g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, light ? '#ffffff' : '#8fa9cc');
          g.addColorStop(.45, light ? '#dbe9fb' : '#44608a'); g.addColorStop(.52, light ? '#b9c9dc' : '#24344d');
          g.addColorStop(1, light ? '#6f7988' : '#101822'); x.fillStyle = g; x.fillRect(0, 0, 512, 256);
          x.fillStyle = light ? 'rgba(255,255,255,.95)' : 'rgba(214,232,255,.8)';
          for (var q = 0; q < 5; q++) x.fillRect(40 + q * 100, 54, 56, 96);
          x.fillStyle = 'rgba(255,236,200,.75)'; for (q = 0; q < 6; q++) x.fillRect(24 + q * 86, 16, 40, 12);
          var t = new THREE.CanvasTexture(c); t.mapping = THREE.EquirectangularReflectionMapping;
          if (t.encoding !== undefined) t.encoding = THREE.sRGBEncoding;
          var p = new THREE.PMREMGenerator(R); p.compileEquirectangularShader();
          var e = p.fromEquirectangular(t).texture; p.dispose(); return e;
        } catch (err) { return null; }
      }
      function grain(x, w, h, n, a) {
        for (var q = 0; q < n; q++) {
          x.fillStyle = 'rgba(0,0,0,' + (Math.random() * a) + ')';
          x.fillRect(Math.random() * w, Math.random() * h, 1.6, 1.6);
        }
      }
      var brick = cTex(function(x, w, h) {
        x.fillStyle = '#6d4433'; x.fillRect(0, 0, w, h);
        for (var r = 0; r < 14; r++) for (var c = -1; c < 9; c++) {
          var off = (r % 2) * 36, bx = c * 72 + off + 3, by = r * 36 + 3, sh = Math.random();
          x.fillStyle = 'rgb(' + Math.round(138 + sh * 46) + ',' + Math.round(82 + sh * 28) + ',' + Math.round(66 + sh * 22) + ')';
          if (x.roundRect) { x.beginPath(); x.roundRect(bx, by, 66, 30, 3); x.fill(); } else x.fillRect(bx, by, 66, 30);
          x.fillStyle = 'rgba(255,255,255,' + (.04 + sh * .05) + ')'; x.fillRect(bx, by, 66, 4);
        }
        grain(x, w, h, 2600, .22);
      }, 512, 512, 4, 2.2);

      var bump = cTex(function(x, w, h) {
        x.fillStyle = '#808080'; x.fillRect(0, 0, w, h);
        for (var r = 0; r < 14; r++) for (var c = -1; c < 9; c++) {
          var off = (r % 2) * 36; x.fillStyle = '#dcdcdc'; x.fillRect(c * 72 + off + 3, r * 36 + 3, 66, 30);
        }
      }, 512, 512, 4, 2.2);

      var wood = cTex(function(x, w, h) {
        x.fillStyle = '#8a5f3c'; x.fillRect(0, 0, w, h);
        for (var p2 = 0; p2 < 12; p2++) {
          var py = p2 * (h / 12);
          x.fillStyle = p2 % 2 ? '#7a5234' : '#996942'; x.fillRect(0, py, w, h / 12);
          x.fillStyle = 'rgba(0,0,0,.08)'; x.fillRect(0, py + h / 12 - 2, w, 2);
          for (var g2 = 0; g2 < 6; g2++) {
            x.strokeStyle = 'rgba(0,0,0,.04)'; x.lineWidth = 1; x.beginPath();
            x.moveTo(0, py + g2 * 6); x.bezierCurveTo(w * .3, py + g2 * 6 + 2, w * .7, py + g2 * 6 - 2, w, py + g2 * 6); x.stroke();
          }
        }
        grain(x, w, h, 1400, .14);
      }, 512, 512, 3, 14);

      var carpet = cTex(function(x, w, h) {
        x.fillStyle = light ? '#455977' : '#141d2e'; x.fillRect(0, 0, w, h);
        grain(x, w, h, 4000, .25);
      }, 256, 256, 10, 10);

      var ceilT = cTex(function(x, w, h) {
        x.fillStyle = light ? '#eef3fa' : '#0c1626'; x.fillRect(0, 0, w, h);
        x.strokeStyle = light ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.05)'; x.lineWidth = 2;
        for (var i2 = 0; i2 <= w; i2 += 32) { x.beginPath(); x.moveTo(i2, 0); x.lineTo(i2, h); x.stroke(); }
        for (var j2 = 0; j2 <= h; j2 += 32) { x.beginPath(); x.moveTo(0, j2); x.lineTo(w, j2); x.stroke(); }
      }, 256, 256, 6, 6);

      var env = envMap();
      if (env) sc.environment = env;

      function sm(o) {
        if (env) o.envMap = env;
        var m = new THREE.MeshPhysicalMaterial(o);
        if (!light && m.color) m.color.multiplyScalar(.84);
        return m;
      }

      var mBrick = sm({ map: brick, bumpMap: bump, bumpScale: .06, roughness: .95 }),
          mFloor = sm({ map: wood, roughness: .3, clearcoat: .55, clearcoatRoughness: .35, envMapIntensity: light ? 1.1 : .8 }),
          mCarpet = sm({ map: carpet, roughness: 1 }),
          mCeil = sm({ map: ceilT, roughness: .95 }),
          mWhite = sm({ color: 0xf0f3f7, roughness: .8 }),
          mDesk = sm({ color: 0xcbb092, roughness: .42, clearcoat: .3, clearcoatRoughness: .4 }),
          mDesk2 = sm({ color: 0x3a4252, roughness: .7 }),
          mDark = sm({ color: 0x23272f, roughness: .38, metalness: .25, clearcoat: .4, clearcoatRoughness: .3 }),
          mMetal = sm({ color: 0x9aa2ac, roughness: .26, metalness: .95 }),
          mFab = sm({ color: 0x394559, roughness: .95 }),
          mSkin = sm({ color: 0xc79a7a, roughness: .75 }),
          mShirt = [
            sm({ color: 0x2f5d9e, roughness: .9 }),
            sm({ color: 0xb4bcc8, roughness: .9 }),
            sm({ color: 0x44506a, roughness: .9 }),
            sm({ color: 0x6b7f99, roughness: .9 }),
            sm({ color: 0x8a5a8c, roughness: .9 })
          ],
          mGlass = new THREE.MeshPhysicalMaterial({
            color: 0xdceeff, transparent: true, opacity: .17, roughness: .02, metalness: 0,
            clearcoat: 1, transmission: 0, reflectivity: .6, side: THREE.DoubleSide, depthWrite: false, envMapIntensity: 1.6
          }),
          mLeaf = sm({ color: 0x3c7a4a, roughness: .85 }),
          mPot = sm({ color: 0xe6e9ee, roughness: .45, clearcoat: .5 }),
          mLamp = new THREE.MeshBasicMaterial({ color: 0xfff2d6 });

      function box(w, h, d, m, x, y, z, g, no) {
        var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
        b.position.set(x, y, z);
        if (big && !no) { b.castShadow = true; b.receiveShadow = true; }
        (g || sc).add(b);
        return b;
      }

      function screenTex(kind) {
        return cTex(function(x, w, h) {
          var bgc = light ? '#f6f9ff' : '#0d1a2e';
          x.fillStyle = bgc; x.fillRect(0, 0, w, h);
          var A = '#0768ff', B = '#5aaeff', C = '#ff8a3d', T2 = light ? '#17304f' : '#cfe3ff';
          if (kind === 'doc') {
            x.fillStyle = light ? '#ffffff' : '#132544'; x.fillRect(24, 16, w - 48, h - 32);
            x.fillStyle = A; x.fillRect(40, 34, 120, 12);
            for (var r = 0; r < 9; r++) {
              x.fillStyle = light ? '#c9d6e8' : '#2b4466';
              x.fillRect(40, 58 + r * 16, (w - 110) * (.5 + Math.random() * .5), 8);
            }
          } else if (kind === 'chart') {
            x.fillStyle = T2; x.fillRect(24, 18, 70, 9);
            for (var b2 = 0; b2 < 7; b2++) {
              var hh = (.25 + b2 / 7 * .7) * (h - 70);
              x.fillStyle = b2 === 6 ? A : B;
              x.fillRect(30 + b2 * ((w - 60) / 7), h - 26 - hh, ((w - 60) / 7) * .6, hh);
            }
          } else if (kind === 'timeline') {
            x.fillStyle = light ? '#e8eefa' : '#091426'; x.fillRect(0, 0, w, h);
            x.fillStyle = light ? '#cfe0f5' : '#13263f'; x.fillRect(10, 10, w - 20, h * .45);
            x.fillStyle = '#1d2b44'; x.fillRect(10, h * .56, w - 20, h * .38);
            var cols = [A, B, C, '#49c78a'];
            for (var t2 = 0; t2 < 10; t2++) {
              x.fillStyle = cols[t2 % 4];
              x.fillRect(16 + t2 * ((w - 40) / 10), h * .6 + (t2 % 3) * 18, ((w - 40) / 10) * .85, 14);
            }
            x.fillStyle = '#ff5a5a'; x.fillRect(w * .42, h * .56, 3, h * .38);
          } else if (kind === 'video') {
            x.fillStyle = '#101722'; x.fillRect(0, 0, w, h);
            x.fillStyle = light ? '#9fd4ff' : '#2b5e9e'; x.fillRect(30, 24, w - 60, h - 80);
            x.fillStyle = '#ffffff'; x.beginPath();
            x.moveTo(w / 2 - 14, h / 2 - 26); x.lineTo(w / 2 + 22, h / 2 - 6); x.lineTo(w / 2 - 14, h / 2 + 14);
            x.closePath(); x.fill();
            x.fillStyle = C; x.fillRect(30, h - 40, (w - 60) * .62, 8);
          } else if (kind === 'social') {
            for (var c2 = 0; c2 < 3; c2++) {
              x.fillStyle = light ? '#ffffff' : '#132544'; x.fillRect(20 + c2 * ((w - 40) / 3), 20, ((w - 40) / 3) - 10, h - 40);
              x.fillStyle = [A, B, C][c2]; x.fillRect(28 + c2 * ((w - 40) / 3), 28, ((w - 40) / 3) - 26, 46);
              for (var r2 = 0; r2 < 4; r2++) {
                x.fillStyle = light ? '#ccd9ea' : '#2b4466';
                x.fillRect(28 + c2 * ((w - 40) / 3), 84 + r2 * 14, ((w - 40) / 3) - 30, 7);
              }
            }
          } else {
            x.fillStyle = light ? '#ffffff' : '#132544'; x.fillRect(20, 20, w - 40, h - 40);
            x.strokeStyle = B; x.lineWidth = 5; x.beginPath();
            for (var p3 = 0; p3 < 14; p3++) {
              var py2 = h - 40 - (.1 + p3 / 14 * .72 + Math.sin(p3) * .05) * (h - 70);
              p3 ? x.lineTo(30 + p3 * ((w - 60) / 13), py2) : x.moveTo(30, py2);
            }
            x.stroke();
          }
        }, 256, 160);
      }

      var SCR = ['doc', 'chart', 'timeline', 'video', 'social', 'line'].map(screenTex), screens = [];
      function screen(w, h, x, y, z, g, rotY) {
        var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: SCR[Math.floor(rnd() * SCR.length)] }));
        m.position.set(x, y, z);
        if (rotY) m.rotation.y = rotY;
        (g || sc).add(m);
        screens.push(m);
        return m;
      }

      var Z0 = 10, Z1 = -126, L = Z0 - Z1, mid = (Z0 + Z1) / 2;
      box(30, .3, L, mFloor, 0, -.15, mid, null, true).receiveShadow = big;
      box(13, .04, L * .86, mCarpet, 0, .03, mid - 4, null, true).receiveShadow = big;
      box(30, .3, L, mCeil, 0, 10.6, mid, null, true);
      box(.5, 11, L, mBrick, -14.6, 5.3, mid, null, true).receiveShadow = big;
      for (i = 0; i < Math.floor(L / 6); i++) box(30, .55, .5, mWhite, 0, 10.1, Z0 - 3 - i * 6, null, true);
      for (i = 0; i < Math.floor(L / 6); i++) {
        var z = Z0 - 2 - i * 6;
        box(.3, 10, .45, mMetal, 14.4, 5, z, null, true);
        var pane = new THREE.Mesh(new THREE.PlaneGeometry(5.3, 8.4), new THREE.MeshBasicMaterial({
          color: light ? 0xffffff : 0xa8caf2, transparent: true, opacity: light ? .98 : .52
        }));
        pane.position.set(14.25, 5.4, z - 3);
        pane.rotation.y = -Math.PI / 2;
        sc.add(pane);
        glow(13.6, 5.4, z - 3, 11, 0xdcebff);
      }
      box(.35, 11, L, mMetal, 14.6, 5.3, mid, null, true);
      var shaftM = new THREE.MeshBasicMaterial({
        color: 0xfff0d2, transparent: true, opacity: light ? .07 : .05, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
      });
      for (i = 0; i < Math.floor(L / 12); i++) {
        var sh = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), shaftM);
        sh.position.set(5.5, 5, Z0 - 6 - i * 12);
        sh.rotation.set(0, -.5, .42);
        sc.add(sh);
      }

      var folks = [];
      // Realistic skin tones (PBR clearcoat & melanin tones)
      var SKINS = [0xf3cfb3, 0xdfa980, 0xc28255, 0x895232, 0x54321d].map(function(c) {
        return sm({ color: c, roughness: 0.62, clearcoat: 0.08 });
      });
      // Realistic hair colors
      var HAIRS = [0x1a1512, 0x3a2519, 0x61412b, 0xa88552, 0x50545c].map(function(c) {
        return sm({ color: c, roughness: 0.82 });
      });
      // Professional corporate wardrobe
      var mBlazers = [
        sm({ color: 0x1c2b3d, roughness: 0.85 }), // navy suit blazer
        sm({ color: 0x2e353c, roughness: 0.85 }), // charcoal blazer
        sm({ color: 0x3e4958, roughness: 0.85 }), // slate blue jacket
        sm({ color: 0x483e35, roughness: 0.85 }), // mocha jacket
        sm({ color: 0x24322a, roughness: 0.85 })  // forest deep olive
      ];
      var mShirts = [
        sm({ color: 0xfafcff, roughness: 0.85 }), // crisp white oxford
        sm({ color: 0xd4e5f8, roughness: 0.85 }), // light sky blue shirt
        sm({ color: 0x2a384c, roughness: 0.85 }), // midnight blue shirt
        sm({ color: 0xecdecb, roughness: 0.85 }), // linen cream
        sm({ color: 0x4e6175, roughness: 0.85 })  // steel grey
      ];
      var mTrousers = [
        sm({ color: 0x18202c, roughness: 0.9 }), // dark navy slacks
        sm({ color: 0x25282c, roughness: 0.9 }), // black trousers
        sm({ color: 0x4d535a, roughness: 0.9 }), // grey chinos
        sm({ color: 0x7a7162, roughness: 0.9 }), // khaki chinos
        sm({ color: 0x263444, roughness: 0.9 })  // raw denim
      ];
      var mBelt = sm({ color: 0x14100e, roughness: 0.4 }),
          mBuckle = sm({ color: 0xd0d5dd, roughness: 0.2, metalness: 0.95 }),
          mButtons = sm({ color: 0xecf0f5, roughness: 0.3 }),
          mTie = [sm({ color: 0x0768ff, roughness: 0.7 }), sm({ color: 0xa83232, roughness: 0.7 }), sm({ color: 0x22354d, roughness: 0.7 })],
          mShoeLeather = sm({ color: 0x181412, roughness: 0.35, clearcoat: 0.4 }),
          mShoeBrown = sm({ color: 0x4a2a16, roughness: 0.35, clearcoat: 0.4 }),
          mShoeSneaker = sm({ color: 0xf2f4f7, roughness: 0.55, clearcoat: 0.15 }),
          mShoeSole = sm({ color: 0x222428, roughness: 0.8 }),
          mWatch = sm({ color: 0x1b1f28, roughness: 0.3, metalness: 0.85 }),
          mGlasses = sm({ color: 0x15171c, roughness: 0.2, metalness: 0.6 }),
          mGlassesLens = new THREE.MeshPhysicalMaterial({ color: 0xdceeff, transparent: true, opacity: 0.22, roughness: 0.05, transmission: 0.9 }),
          mLanyard = sm({ color: 0x0768ff, roughness: 0.85 }),
          mBadge = sm({ color: 0xffffff, roughness: 0.3, clearcoat: 0.5 }),
          mBadgeLogo = sm({ color: 0x0768ff, roughness: 0.5 }),
          mHeadset = sm({ color: 0x1e2229, roughness: 0.35, metalness: 0.6 }),
          mCushion = sm({ color: 0x2d323b, roughness: 0.9 });

      function limb(r, len, m, g) {
        var q = new THREE.Group();
        var cy2 = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.92, len, 14), m); q.add(cy2);
        var t1 = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), m); t1.position.y = len / 2; q.add(t1);
        var t2 = new THREE.Mesh(new THREE.SphereGeometry(r * 0.92, 12, 10), m); t2.position.y = -len / 2; q.add(t2);
        if (big) q.children.forEach(function(o) { o.castShadow = true; });
        (g || sc).add(q);
        return q;
      }

      function person(x, z, rot, n, stand) {
        var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot; sc.add(g);
        var pType = n % 4; // 0: Suit & Tie, 1: Oxford with Rolled Sleeves & Lanyard, 2: Knitwear & Headset, 3: Smart Blazer & Glasses
        var sk = SKINS[(n + Math.floor(rnd() * 5)) % 5],
            ha = HAIRS[n % 5],
            shFab = mShirts[n % 5],
            bzFab = mBlazers[n % 5],
            trFab = mTrousers[(n + 2) % 5],
            hasBlazer = (pType === 0 || pType === 3),
            hasRolled = (pType === 1),
            hasGlasses = (pType === 0 || pType === 3 || n === 2),
            hasLanyard = (pType === 1 || pType === 3),
            hasHeadphones = (pType === 2 || (Math.abs(x) > 7 && Math.abs(z) > 60)),
            hasTie = (pType === 0),
            lift = stand ? 0.92 : 0;

        // Torso base (shirt or knitwear)
        var torsoMat = hasBlazer ? shFab : (pType === 2 ? bzFab : shFab);
        var torso = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 1.15, 18), torsoMat);
        torso.position.set(0, 2.3 + lift, 0);
        if (big) torso.castShadow = true;
        g.add(torso);

        // Shoulders & upper chest
        var sh3 = new THREE.Mesh(new THREE.SphereGeometry(0.47, 18, 14), hasBlazer ? bzFab : torsoMat);
        sh3.position.set(0, 2.84 + lift, 0); sh3.scale.set(1.24, 0.62, 0.88);
        if (big) sh3.castShadow = true;
        g.add(sh3);

        // Suit Blazer Panels (for archetypes 0 & 3)
        if (hasBlazer) {
          [-0.24, 0.24].forEach(function(px, idx) {
            var bp = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.08, 0.44), bzFab);
            bp.position.set(px, 2.32 + lift, 0.04);
            bp.rotation.y = idx === 0 ? 0.12 : -0.12;
            if (big) bp.castShadow = true;
            g.add(bp);

            // Lapel flap
            var lap = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.04), bzFab);
            lap.position.set(px * 0.65, 2.68 + lift, 0.27);
            lap.rotation.z = idx === 0 ? 0.22 : -0.22;
            lap.rotation.y = idx === 0 ? -0.1 : 0.1;
            g.add(lap);
          });
        }

        // Shirt Collar (two angled tabs)
        [-0.12, 0.12].forEach(function(cx, idx) {
          var colTab = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.03), shFab);
          colTab.position.set(cx, 2.92 + lift, 0.21);
          colTab.rotation.z = idx === 0 ? -0.35 : 0.35;
          colTab.rotation.x = -0.2;
          g.add(colTab);
        });

        // Neck Tie or Shirt Buttons
        if (hasTie) {
          var tieMat = mTie[n % 3];
          var knot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.04), tieMat);
          knot.position.set(0, 2.88 + lift, 0.22); g.add(knot);
          var tieBody = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.68, 0.03), tieMat);
          tieBody.position.set(0, 2.52 + lift, 0.23); g.add(tieBody);
        } else {
          for (var bIdx = 0; bIdx < 4; bIdx++) {
            var btn = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), mButtons);
            btn.position.set(0, 2.72 - bIdx * 0.18 + lift, 0.24); g.add(btn);
          }
        }

        // Mathematically seamless Pelvis, Belt, and Legs
        if (stand) {
          // Standing: torso bottom is at 2.645
          // Pelvis from y = 1.95 to y = 2.65
          var pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.42, 0.7, 18), trFab);
          pelvis.position.set(0, 2.3, 0.02);
          if (big) pelvis.castShadow = true;
          g.add(pelvis);

          // Belt at interface of torso and pelvis
          var beltMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.465, 0.465, 0.09, 20), mBelt);
          beltMesh.position.set(0, 2.65, 0.02); g.add(beltMesh);
          var buckleMesh = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.11, 0.04), mBuckle);
          buckleMesh.position.set(0, 2.65, 0.49); g.add(buckleMesh);

          // Legs from floor (0.0) to bottom of pelvis (1.95)
          var lL = limb(0.15, 1.95, trFab, g), lR = limb(0.15, 1.95, trFab, g);
          lL.position.set(0.2, 0.975, 0.02); lR.position.set(-0.2, 0.975, 0.02);

          // Shoes resting flat on floor
          [-0.2, 0.2].forEach(function(px) {
            var shoeMat = n % 3 === 0 ? mShoeLeather : (n % 3 === 1 ? mShoeBrown : mShoeSneaker);
            var sole = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.06, 0.62), mShoeSole);
            sole.position.set(px, 0.03, 0.16); g.add(sole);
            var upper = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.14, 0.58), shoeMat);
            upper.position.set(px, 0.11, 0.15); g.add(upper);
            var toe = new THREE.Mesh(new THREE.SphereGeometry(0.125, 12, 10), shoeMat);
            toe.position.set(px, 0.09, 0.38); toe.scale.set(0.98, 0.65, 1.1); g.add(toe);
          });
        } else {
          // Seated: torso bottom is at 1.725
          var pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.48, 0.72), trFab);
          pelvis.position.set(0, 1.5, 0.18);
          if (big) pelvis.castShadow = true;
          g.add(pelvis);

          // Belt at interface of torso and seat
          var beltMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.465, 0.465, 0.09, 20), mBelt);
          beltMesh.position.set(0, 1.73, 0.04); g.add(beltMesh);
          var buckleMesh = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.11, 0.04), mBuckle);
          buckleMesh.position.set(0, 1.73, 0.51); g.add(buckleMesh);

          // Thighs extending horizontally forward over chair
          [-0.26, 0.26].forEach(function(o) {
            var th = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.16, 1, 14), trFab);
            th.rotation.x = Math.PI / 2; th.position.set(o, 1.62, 0.56); g.add(th);
            var shn = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.12, 1.1, 14), trFab);
            shn.position.set(o, 0.85, 1.05); g.add(shn);
            var shoeMat = n % 3 === 0 ? mShoeLeather : (n % 3 === 1 ? mShoeBrown : mShoeSneaker);
            var sole = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.06, 0.6), mShoeSole);
            sole.position.set(o, 0.03, 1.12); g.add(sole);
            var upper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.13, 0.56), shoeMat);
            upper.position.set(o, 0.1, 1.11); g.add(upper);
            var toe = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), shoeMat);
            toe.position.set(o, 0.08, 1.32); toe.scale.set(0.98, 0.65, 1.1); g.add(toe);
          });
        }

        // IRA Company Lanyard & Identity Badge
        if (hasLanyard) {
          [-0.1, 0.1].forEach(function(lx, idx) {
            var rib = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.54, 8), mLanyard);
            rib.position.set(lx * 0.5, 2.68 + lift, 0.24);
            rib.rotation.z = idx === 0 ? -0.16 : 0.16;
            g.add(rib);
          });
          var badge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.02), mBadge);
          badge.position.set(0, 2.34 + lift, 0.26); g.add(badge);
          var badgeStrip = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.022), mBadgeLogo);
          badgeStrip.position.set(0, 2.41 + lift, 0.262); g.add(badgeStrip);
        }

        // Neck
        var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.22, 14), sk);
        neck.position.set(0, 3.02 + lift, 0); g.add(neck);

        // Head (cranium + jawline)
        var hd = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 20), sk);
        hd.position.set(0, 3.33 + lift, 0); hd.scale.set(0.92, 1.1, 1);
        if (big) hd.castShadow = true;
        g.add(hd);

        // Chin / Jawline definition
        var jaw = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.26), sk);
        jaw.position.set(0, 3.16 + lift, 0.08); g.add(jaw);

        // Nose Bridge
        var nose = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 6), sk);
        nose.position.set(0, 3.31 + lift, 0.31);
        nose.rotation.x = -Math.PI / 2.2; g.add(nose);

        // Ears
        [-0.29, 0.29].forEach(function(ex) {
          var ear = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 8), sk);
          ear.position.set(ex, 3.32 + lift, 0.02); ear.scale.set(0.5, 1.2, 0.8);
          g.add(ear);
        });

        // 4 Modern Hairstyles
        var hairStyle = n % 4;
        if (hairStyle === 0) {
          var hTop = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 16, 0, 6.28, 0, 1.55), ha);
          hTop.position.set(0, 3.38 + lift, -0.02); hTop.scale.set(0.96, 1.15, 1.05); g.add(hTop);
          var hCrest = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.36), ha);
          hCrest.position.set(0.02, 3.63 + lift, 0.02); hCrest.rotation.z = -0.12; g.add(hCrest);
        } else if (hairStyle === 1) {
          var hCrop = new THREE.Mesh(new THREE.SphereGeometry(0.315, 20, 16, 0, 6.28, 0, 1.6), ha);
          hCrop.position.set(0, 3.36 + lift, -0.02); hCrop.scale.set(0.95, 1.1, 1.04); g.add(hCrop);
        } else if (hairStyle === 2) {
          var hBob = new THREE.Mesh(new THREE.SphereGeometry(0.33, 20, 16), ha);
          hBob.position.set(0, 3.4 + lift, -0.04); hBob.scale.set(1.02, 1.18, 1.1); g.add(hBob);
          [-0.27, 0.27].forEach(function(hx) {
            var lock = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.65, 12), ha);
            lock.position.set(hx, 3.12 + lift, 0.06); lock.rotation.z = hx < 0 ? 0.15 : -0.15;
            g.add(lock);
          });
        } else {
          var hBunBase = new THREE.Mesh(new THREE.SphereGeometry(0.318, 20, 16, 0, 6.28, 0, 1.55), ha);
          hBunBase.position.set(0, 3.37 + lift, -0.02); hBunBase.scale.set(0.96, 1.12, 1.05); g.add(hBunBase);
          var bunKnot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 12), ha);
          bunKnot.position.set(0, 3.28 + lift, -0.32); bunKnot.scale.set(1.1, 1, 0.85); g.add(bunKnot);
        }

        // Modern Glasses (archetypes 0 & 3)
        if (hasGlasses) {
          [-0.12, 0.12].forEach(function(gx) {
            var rim = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.012, 8, 16), mGlasses);
            rim.position.set(gx, 3.35 + lift, 0.29); g.add(rim);
            var lens = new THREE.Mesh(new THREE.CircleGeometry(0.058, 14), mGlassesLens);
            lens.position.set(gx, 3.35 + lift, 0.29); g.add(lens);
            var temple = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.28), mGlasses);
            temple.position.set(gx < 0 ? -0.21 : 0.21, 3.36 + lift, 0.16); g.add(temple);
          });
          var bridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.014, 0.014), mGlasses);
          bridge.position.set(0, 3.36 + lift, 0.295); g.add(bridge);
        }

        // Studio Headphones (archetype 2 or studio crew)
        if (hasHeadphones) {
          var band = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.024, 8, 24, Math.PI), mHeadset);
          band.position.set(0, 3.38 + lift, 0.02); band.rotation.z = Math.PI; g.add(band);
          [-0.34, 0.34].forEach(function(ex) {
            var cup = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16), mHeadset);
            cup.position.set(ex, 3.34 + lift, 0.02); cup.rotation.z = Math.PI / 2; g.add(cup);
            var pad = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.04, 16), mCushion);
            pad.position.set(ex < 0 ? ex + 0.03 : ex - 0.03, 3.34 + lift, 0.02); pad.rotation.z = Math.PI / 2; g.add(pad);
          });
        }

        // Arms & Hands
        var armMat = hasBlazer ? bzFab : shFab;
        var aL = limb(0.11, 0.8, armMat, g), aR = limb(0.11, 0.8, armMat, g);
        aL.position.set(0.56, 2.42 + lift, 0.1); aR.position.set(-0.56, 2.42 + lift, 0.1);
        aL.rotation.x = -0.55; aR.rotation.x = -0.55;

        // Rolled cuffs
        if (hasRolled) {
          [aL, aR].forEach(function(arm) {
            var cuff = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 8, 16), shFab);
            cuff.position.y = -0.22; arm.add(cuff);
          });
        }

        // Smartwatch on left wrist
        var watchMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.07, 14), mWatch);
        watchMesh.position.y = -0.36; aL.add(watchMesh);

        // Hands with palm & thumb
        [-1, 1].forEach(function(sideSign, sIdx) {
          var targetArm = sIdx === 0 ? aL : aR;
          var hand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.18, 0.07), sk);
          hand.position.y = -0.46; targetArm.add(hand);
          var thumb = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.09, 0.05), sk);
          thumb.position.set(sideSign * 0.08, -0.44, 0.02); targetArm.add(thumb);
        });

        g._aL = aL; g._aR = aR; g._s = rnd() * 6; g._h = hd; folks.push(g);
        return g;
      }
      // ZONE 1: search + ads pods
      function station(x, z, flip) {
        var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = flip ? Math.PI : 0; sc.add(g);
        box(5.8, .18, 9.4, mDesk, 0, 2.5, 0, g);
        [-2.6, 2.6].forEach(function(dx) { [-4.2, 4.2].forEach(function(dz) { box(.16, 2.5, .16, mMetal, dx, 1.25, dz, g); }); });
        box(.12, 1.4, 9, mDesk2, 0, 3.2, 0, g);
        [-3, 0, 3].forEach(function(dz) {
          [-1.4, 1.4].forEach(function(dx) {
            var rot = dx < 0 ? Math.PI / 2 : -Math.PI / 2;
            box(1.7, 1.05, .08, mDark, dx, 3.4, dz, g).rotation.y = rot;
            screen(1.6, .95, dx + (dx < 0 ? .05 : -.05), 3.4, dz, g, rot);
            box(.9, .06, .45, mDark, dx * .7, 2.62, dz, g);
          });
          [-2.4, 2.4].forEach(function(cx) {
            var c = new THREE.Group(); c.position.set(cx, 0, dz); c.rotation.y = cx < 0 ? Math.PI / 2 : -Math.PI / 2; g.add(c);
            box(1.4, .16, 1.4, mFab, 0, 1.7, 0, c); box(1.3, 1.4, .14, mFab, 0, 2.4, -.6, c);
            box(.16, 1.6, .16, mMetal, 0, .8, 0, c);
            [-.6, .6].forEach(function(ox) { [-.6, .6].forEach(function(oz) { box(.08, .1, .55, mMetal, ox, .1, oz, c); }); });
            person(cx < 0 ? x + cx : x + cx, z + dz, (cx < 0 ? 1 : -1) * Math.PI / 2 + (flip ? Math.PI : 0), Math.floor(rnd() * 5));
          });
        });
      }
      station(-8, -14);
      station(8, -32, true);

      // ZONE 2: strategy / pitch whiteboard
      var WZ = -48;
      box(.3, 5.4, 10.4, mMetal, -14.2, 5.2, WZ, null, true);
      box(.15, 5, 10, sm({ color: light ? 0xf4f7fb : 0x0f1826, roughness: .25, clearcoat: .8 }), -14, 5.2, WZ, null, true);
      var wbArt = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 3.7), new THREE.MeshBasicMaterial({
        map: cTex(function(x, w, h) {
          var A = '#0768ff', B = '#ff8a3d';
          x.fillStyle = light ? '#f8fafd' : '#101a2b'; x.fillRect(0, 0, w, h);
          x.strokeStyle = A; x.lineWidth = 6;
          for (var k2 = 0; k2 < 4; k2++) {
            x.strokeRect(40 + k2 * 115, 50, 95, 55);
            if (k2 < 3) {
              x.beginPath(); x.moveTo(135 + k2 * 115, 78); x.lineTo(155 + k2 * 115, 78); x.stroke();
            }
          }
          x.strokeStyle = B; x.lineWidth = 5; x.beginPath();
          x.moveTo(40, 190); x.bezierCurveTo(160, 210, 280, 130, 480, 110); x.stroke();
        }, 512, 256)
      }));
      wbArt.position.set(-13.9, 5.2, WZ); wbArt.rotation.y = Math.PI / 2; sc.add(wbArt);
      person(-12.4, WZ, Math.PI / 2, 1, true);

      // ZONE 3: creative production stage
      var VZ = -70;
      box(8, .12, 12, sm({ color: light ? 0x24334a : 0x0d1422, roughness: .85 }), 10.5, .06, VZ, null, true).receiveShadow = big;
      var backdrop = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 5.4, 8, 24, 1, true, -Math.PI / 2, Math.PI), sm({ color: 0x0768ff, roughness: .8, side: THREE.BackSide }));
      backdrop.position.set(13.6, 4, VZ); backdrop.rotation.y = Math.PI; sc.add(backdrop);
      box(.35, 1.4, .35, mDark, 10.1, 3.8, VZ + 1, null, true);
      box(.45, .45, 1.2, mDark, 10.1, 4.35, VZ + 1, null, true);
      var recLed = new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff3b30 }));
      recLed.position.set(9.9, 4.35, VZ + 1); sc.add(recLed);
      [[-1, VZ + 6], [1, VZ - 4]].forEach(function(p, n) {
        var bx2 = 11.6;
        box(1, .2, 1, mDark, bx2, .1, p[1], null, true);
        box(.14, 4, .14, mMetal, bx2, 2, p[1], null, true);
        var sbf = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ color: 0xfff6e4, transparent: true, opacity: .95 }));
        sbf.position.set(bx2 - .6, 4.3, p[1]); sbf.rotation.y = -Math.PI / 2 + (n ? .5 : -.5); sc.add(sbf);
        box(2.6, 2.6, .5, sm({ color: 0x1b212c, roughness: .7 }), bx2, 4.3, p[1], null, true);
      });
      box(.1, .1, 3.4, mMetal, 11, 6.6, VZ + 1, null, true); box(.4, .4, .7, mDark, 11, 6.5, VZ - .6, null, true);
      person(12.1, VZ, -Math.PI / 2, 0, true);
      person(9.4, VZ + 3.6, -Math.PI / 2, 3, true);
      box(2, .9, 2, mFab, 8.6, .45, VZ - 6, null, true);

      // ZONE 4: editors + kanban work board
      var EZ = -90;
      for (i = 0; i < 2; i++) {
        var ez = EZ - i * 7;
        box(6, .18, 2.8, mDesk, -9.4, 2.5, ez);
        [-2.5, 2.5].forEach(function(o) { box(.16, 2.5, .16, mMetal, -9.4 + o, 1.25, ez); });
        [-1.5, 1.5].forEach(function(o) {
          var mo = box(2.4, 1.4, .1, mDark, -9.4 + o, 3.5, ez - .6);
          mo.rotation.y = o < 0 ? .22 : -.22;
          screen(2.25, 1.25, -9.4 + o * 1.02, 3.5, ez - .5, null, mo.rotation.y);
        });
        box(1.1, .08, .5, mDark, -9.4, 2.6, ez + .6, null, true);
        box(.5, .5, .3, mDark, -7.4, 2.8, ez + .4, null, true);
        person(-9.4, ez + 2, Math.PI, i);
      }

      var board = box(10, 5, .2, sm({ color: light ? 0xf7f9fc : 0x16233a, roughness: .8 }), 14.2, 5, EZ - 2);
      board.rotation.y = Math.PI / 2;
      var colX = [-3, 0, 3], notes = [], nc = [0xffd66b, 0x8fd6a0, 0x9fc8ff, 0xffb4a2, 0xd5b8ff];
      for (i = 0; i < 9; i++) {
        var col = i % 3, row = Math.floor(i / 3),
            n2 = box(1.5, 1.1, .08, sm({ color: nc[i % 5], roughness: .9 }), 14.05, 6.1 - row * 1.5, EZ - 2 + colX[col]);
        n2.rotation.y = Math.PI / 2; n2._col = col; n2._row = row; notes.push(n2);
      }
      for (i = 0; i < 3; i++) {
        var hdr = box(1.4, .3, .09, sm({ color: 0x0768ff, roughness: .7 }), 14.05, 7.5, EZ - 2 + colX[i]);
        hdr.rotation.y = Math.PI / 2;
      }
      person(12.4, EZ - 2, -Math.PI / 2, 2, true);

      // ZONE 5: meeting room + lounge
      var MZ = -110;
      box(.18, 7.8, 19, mGlass, -4.5, 3.9, MZ - 4, null, true);
      box(19, 7.8, .18, mGlass, -6, 3.9, MZ + 5.4, null, true);
      box(.22, 7.8, .3, mMetal, -4.5, 3.9, MZ + 5.4, null, true);
      box(.22, 7.8, .3, mMetal, -4.5, 3.9, MZ - 13.4, null, true);
      box(7.4, .22, 3.4, mDesk, -9, 2.5, MZ - 4);
      [-1.8, 1.8].forEach(function(o) {
        [-2.8, 0, 2.8].forEach(function(t2) {
          box(1.2, .16, 1.2, mFab, -9 + t2, 1.5, MZ - 4 + o);
          box(1.15, 1.3, .16, mFab, -9 + t2, 2.2, MZ - 4 + o + (o < 0 ? -.55 : .55));
        });
      });
      person(-9, MZ - 6.4, 0, 1); person(-11.6, MZ - 2, Math.PI * .5, 4);
      var tv = box(5.6, 3.1, .14, mDark, -9, 4.9, MZ - 13);
      screen(5.2, 2.75, -9, 4.9, MZ - 12.9);
      box(11, .08, 9, sm({ color: 0x1d3a63, roughness: 1 }), 7.5, .05, MZ - 2, null, true).receiveShadow = big;
      box(5.8, .85, 2.3, mFab, 7.5, .75, MZ + 1); box(5.8, 1.6, .65, mFab, 7.5, 1.6, MZ + 2);
      [-1.7, 1.7].forEach(function(o) {
        box(2.1, .85, 2.1, mFab, 7.5 + o * 2.8, .75, MZ - 5);
        box(.65, 1.5, 2.1, mFab, 7.5 + o * 3.3, 1.4, MZ - 5);
      });
      box(2.6, .18, 1.5, mDesk, 7.5, 1.05, MZ - 2); person(6, MZ + .4, 0, 3);

      for (i = 0; i < 16; i++) {
        var pz = -3 - i * 8, px = i % 2 ? 7 : -7;
        box(.07, 2.3, .07, mMetal, px, 8.8, pz, null, true);
        var shade = new THREE.Mesh(new THREE.ConeGeometry(.95, 1, 22, 1, true), sm({ color: 0x1b212c, roughness: .6, side: THREE.DoubleSide }));
        shade.position.set(px, 7.3, pz); sc.add(shade);
        var bulb = new THREE.Mesh(new THREE.SphereGeometry(.28, 16, 12), mLamp);
        bulb.position.set(px, 6.95, pz); sc.add(bulb); glow(px, 6.95, pz, 4.4);
      }

      var glowTex = cTex(function(x, w, h) {
        var g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
        g.addColorStop(0, 'rgba(255,240,210,.95)'); g.addColorStop(.35, 'rgba(255,226,180,.35)'); g.addColorStop(1, 'rgba(255,220,170,0)');
        x.fillStyle = g; x.fillRect(0, 0, w, h);
      }, 128, 128);

      function glow(x, y, z, size, col) {
        var sp = new THREE.Sprite(new THREE.SpriteMaterial({
          map: glowTex, color: col || 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: light ? .35 : .6
        }));
        sp.position.set(x, y, z); sp.scale.set(size, size, 1); sc.add(sp); return sp;
      }

      function plant(x, z) {
        var g = new THREE.Group(); g.position.set(x, 0, z); sc.add(g);
        var p = new THREE.Mesh(new THREE.CylinderGeometry(.62, .5, 1.2, 18), mPot);
        p.position.y = .6; if (big) p.castShadow = true; g.add(p);
        for (var n = 0; n < 9; n++) {
          var l = new THREE.Mesh(new THREE.SphereGeometry(.55 + rnd() * .42, 10, 8), mLeaf);
          l.position.set((rnd() - .5) * 1.5, 1.5 + rnd() * 1.8, (rnd() - .5) * 1.5);
          l.scale.y = .55; if (big) l.castShadow = true; g.add(l);
        }
      }
      [[-13, -10], [13.2, -24], [-13, -40], [13.2, -58], [-13, -80], [13.2, -98], [-13, -104]].forEach(function(p) { plant(p[0], p[1]); });

      var mPaper = sm({ color: 0xf4f6fa, roughness: .9 }),
          mCup = sm({ color: 0xffffff, roughness: .35, clearcoat: .7 }),
          mBag = sm({ color: 0x2b3242, roughness: .9 });

      for (i = 0; i < 34; i++) {
        var zc = -5 - rnd() * 100, xc = (rnd() < .5 ? -1 : 1) * (4.4 + rnd() * 5.4), r3 = rnd();
        if (r3 < .34) {
          var cup = new THREE.Mesh(new THREE.CylinderGeometry(.16, .13, .34, 14), mCup);
          cup.position.set(xc, 2.68, zc); if (big) cup.castShadow = true; sc.add(cup);
        } else if (r3 < .68) {
          var pp2 = box(.9, .03, 1.25, mPaper, xc, 2.61, zc, null, true); pp2.rotation.y = rnd() * .6 - .3;
          box(.85, .03, 1.2, mPaper, xc + .12, 2.64, zc + .1, null, true).rotation.y = rnd() * .6 - .3;
        } else {
          var bg2 = box(.9, .7, .4, mBag, xc * 1.25, .35, zc, null, true); bg2.rotation.y = rnd() * 1.2;
        }
      }

      for (i = 0; i < 12; i++) {
        var zz = -6 - i * 9, cab = new THREE.Mesh(new THREE.TorusGeometry(.32, .045, 8, 24, 3.4), mDark);
        cab.position.set((i % 2 ? 1 : -1) * 6.9, 2.1, zz); cab.rotation.set(1.2, rnd(), 0); sc.add(cab);
      }

      sc.add(new THREE.HemisphereLight(0xdcebff, 0x4a5260, light ? .75 : .5));
      var sun = new THREE.DirectionalLight(0xfff1dd, light ? 1.5 : 1);
      sun.position.set(26, 20, -24); sun.target.position.set(-4, 0, -44); sc.add(sun.target);
      if (big) {
        sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
        var d = 48, csm = sun.shadow.camera;
        csm.left = -d; csm.right = d; csm.top = d; csm.bottom = -d;
        csm.near = 1; csm.far = 150; sun.shadow.bias = -.0012; sun.shadow.normalBias = .03;
      }
      sc.add(sun);
      var warm = new THREE.PointLight(0xffd9a8, light ? 110 : 170, 34, 2); sc.add(warm);
      var fill = new THREE.PointLight(0xbcd8ff, 70, 46, 2); sc.add(fill);
      var studio = new THREE.PointLight(0xfff4e0, 220, 28, 2); studio.position.set(11.4, 4.6, VZ); sc.add(studio);

      var KEY = [[0, 4.4, 8], [.7, 4.4, -10], [-.8, 4.5, -26], [-.6, 4.4, -46], [1.6, 4.4, -66], [.4, 4.3, -84], [-1.4, 4.3, -96], [-5.5, 4.1, -108]],
          LK = [[0, 4.1, -16], [0, 4.1, -32], [-6, 4.2, -48], [-8, 4.2, -54], [11, 4.2, -70], [12, 4.4, -90], [-6, 4.1, -104], [-9, 3.6, -118]];
      var cPath = new THREE.CatmullRomCurve3(KEY.map(function(a) { return new THREE.Vector3(a[0], a[1], a[2]); })),
          lPath = new THREE.CatmullRomCurve3(LK.map(function(a) { return new THREE.Vector3(a[0], a[1], a[2]); }));
      var T = 0, cp = 0, cv3 = new THREE.Vector3(), lv3 = new THREE.Vector3(), tSwap = 0, tNote = 0;

      function aim() {
        var m = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        return Math.min(1, Math.max(0, scrollY / m));
      }

      function render() {
        cPath.getPoint(cp, cv3); lPath.getPoint(cp, lv3);
        cam.position.set(cv3.x, cv3.y + (reduce2 ? 0 : Math.sin(T * 1.7) * .045), cv3.z);
        cam.lookAt(lv3);
        warm.position.set(cv3.x, 7, cv3.z - 7); fill.position.set(9, 6, cv3.z - 10);
        sun.position.set(26, 20, cv3.z - 14); sun.target.position.set(-4, 0, cv3.z - 30);
        sun.target.updateMatrixWorld();
        R.render(sc, cam);
      }

      function loop() {
        var a = aim();
        if (reduce2) { cp = a; render(); return; }
        T += .016; cp += (a - cp) * .065;
        folks.forEach(function(g) {
          var w = Math.sin(T * 6 + g._s);
          g._aL.rotation.x = -.5 + w * .1; g._aR.rotation.x = -.5 - w * .1;
          g._h.position.x = Math.sin(T * .7 + g._s) * .04;
        });
        recLed.visible = Math.sin(T * 3) > 0;
        if (T - tSwap > 2.4) {
          tSwap = T;
          var m2 = screens[Math.floor(Math.random() * screens.length)];
          m2.material.map = SCR[Math.floor(Math.random() * SCR.length)];
          m2.material.needsUpdate = true;
        }
        if (T - tNote > 3.2) {
          tNote = T;
          var n3 = notes[Math.floor(Math.random() * notes.length)];
          n3._col = (n3._col + 1) % 3;
          n3.position.z = EZ - 2 + colX[n3._col];
        }
        render();
        requestAnimationFrame(loop);
      }

      function size() {
        R.setSize(innerWidth, innerHeight, false);
        cam.aspect = innerWidth / innerHeight;
        cam.updateProjectionMatrix();
        render();
      }

      addEventListener('resize', size);
      size();
      loop();
      if (reduce2) addEventListener('scroll', loop, { passive: true });
    }

    initThree();
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
