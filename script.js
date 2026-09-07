/* =========================================================
   COSMOS — 3D Solar System Explorer
   script.js — all interactivity, no dependencies
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. PLANET DATA
     Single source of truth used by the info panel, planet
     cards, comparison table and search.
     --------------------------------------------------------- */
  const PLANETS = {
    mercury: {
      name: 'Mercury', emoji: '🪐', className: 'mercury',
      desc: 'The smallest planet and the closest to the Sun, with wild temperature swings.',
      distance: '57.9M km', distanceKm: 57909000,
      diameter: '4,879 km', diameterKm: 4879,
      moons: 0, orbit: '88 days', orbitDays: 88,
      rotation: '58.6 days', temp: '167°C',
      mass: '3.30 × 10^23 kg', gravity: '3.7 m/s²',
      facts: [
        'A year on Mercury is just 88 Earth days.',
        'It has almost no atmosphere to trap heat.',
        'Its surface looks similar to Earth\u2019s Moon, covered in craters.'
      ]
    },
    venus: {
      name: 'Venus', emoji: '🪐', className: 'venus',
      desc: 'A scorched, cloud-covered world with the hottest surface of any planet.',
      distance: '108.2M km', distanceKm: 108200000,
      diameter: '12,104 km', diameterKm: 12104,
      moons: 0, orbit: '225 days', orbitDays: 225,
      rotation: '243 days', temp: '464°C',
      mass: '4.87 × 10^24 kg', gravity: '8.87 m/s²',
      facts: [
        'Venus spins backwards compared to most planets.',
        'Its thick atmosphere traps heat in a runaway greenhouse effect.',
        'A day on Venus is longer than its year.'
      ]
    },
    earth: {
      name: 'Earth', emoji: '🌍', className: 'earth',
      desc: 'The only known planet to support life, covered mostly by liquid water.',
      distance: '149.6M km', distanceKm: 149600000,
      diameter: '12,742 km', diameterKm: 12742,
      moons: 1, orbit: '365.25 days', orbitDays: 365.25,
      rotation: '24 hours', temp: '15°C',
      mass: '5.97 × 10^24 kg', gravity: '9.81 m/s²',
      facts: [
        'About 71% of Earth\u2019s surface is covered in water.',
        'Earth\u2019s magnetic field shields it from solar radiation.',
        'It is the only planet not named after a mythological figure.'
      ]
    },
    mars: {
      name: 'Mars', emoji: '🔴', className: 'mars',
      desc: 'The Red Planet, home to the largest volcano and canyon in the solar system.',
      distance: '227.9M km', distanceKm: 227900000,
      diameter: '6,779 km', diameterKm: 6779,
      moons: 2, orbit: '687 days', orbitDays: 687,
      rotation: '24.6 hours', temp: '-63°C',
      mass: '6.39 × 10^23 kg', gravity: '3.71 m/s²',
      facts: [
        'Mars is home to Olympus Mons, the tallest volcano in the solar system.',
        'Its red color comes from iron oxide — rust — on its surface.',
        'Mars has two small moons, Phobos and Deimos.'
      ]
    },
    jupiter: {
      name: 'Jupiter', emoji: '🟠', className: 'jupiter',
      desc: 'The largest planet, a gas giant with a storm bigger than Earth.',
      distance: '778.5M km', distanceKm: 778500000,
      diameter: '139,820 km', diameterKm: 139820,
      moons: 95, orbit: '11.9 years', orbitDays: 4333,
      rotation: '9.9 hours', temp: '-110°C',
      mass: '1.90 × 10^27 kg', gravity: '24.79 m/s²',
      facts: [
        'The Great Red Spot is a storm larger than Earth.',
        'Jupiter has the shortest day of any planet.',
        'It has at least 95 known moons.'
      ]
    },
    saturn: {
      name: 'Saturn', emoji: '🪐', className: 'saturn',
      desc: 'Famous for its spectacular ring system made of ice and rock.',
      distance: '1.43B km', distanceKm: 1434000000,
      diameter: '116,460 km', diameterKm: 116460,
      moons: 146, orbit: '29.5 years', orbitDays: 10759,
      rotation: '10.7 hours', temp: '-140°C',
      mass: '5.68 × 10^26 kg', gravity: '10.44 m/s²',
      facts: [
        'Saturn\u2019s rings are made mostly of ice particles.',
        'It is the least dense planet — it would float in water.',
        'Saturn has 146 confirmed moons, more than any other planet.'
      ]
    },
    uranus: {
      name: 'Uranus', emoji: '🔵', className: 'uranus',
      desc: 'An ice giant that rotates on its side, tilted almost 98 degrees.',
      distance: '2.87B km', distanceKm: 2871000000,
      diameter: '50,724 km', diameterKm: 50724,
      moons: 28, orbit: '84 years', orbitDays: 30687,
      rotation: '17.2 hours', temp: '-195°C',
      mass: '8.68 × 10^25 kg', gravity: '8.69 m/s²',
      facts: [
        'Uranus rotates almost on its side, tilted 98 degrees.',
        'It is the coldest planetary atmosphere in the solar system.',
        'Its blue-green color comes from methane in its atmosphere.'
      ]
    },
    neptune: {
      name: 'Neptune', emoji: '🔵', className: 'neptune',
      desc: 'The windiest planet, a deep blue ice giant at the edge of the solar system.',
      distance: '4.50B km', distanceKm: 4498000000,
      diameter: '49,244 km', diameterKm: 49244,
      moons: 16, orbit: '165 years', orbitDays: 60190,
      rotation: '16.1 hours', temp: '-200°C',
      mass: '1.02 × 10^26 kg', gravity: '11.15 m/s²',
      facts: [
        'Neptune has the fastest winds in the solar system, up to 2,100 km/h.',
        'It was the first planet located through mathematical prediction.',
        'One Neptunian year equals about 165 Earth years.'
      ]
    }
  };

  const PLANET_ORDER = ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune'];

  /* ---------------------------------------------------------
     2. STARFIELD
     --------------------------------------------------------- */
  function buildStarfield() {
    const field = document.getElementById('starfield');
    const count = window.innerWidth < 640 ? 140 : 260;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = (Math.random() * 2 + 0.6).toFixed(2);
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.top = Math.random() * 100 + '%';
      star.style.left = Math.random() * 100 + '%';
      star.style.setProperty('--min-op', (Math.random() * 0.3).toFixed(2));
      star.style.setProperty('--max-op', (0.6 + Math.random() * 0.4).toFixed(2));
      star.style.animationDuration = (2 + Math.random() * 4).toFixed(2) + 's';
      star.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
      frag.appendChild(star);
    }
    field.appendChild(frag);
  }

  /* ---------------------------------------------------------
     3. NAVIGATION (hamburger menu)
     --------------------------------------------------------- */
  function setupNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------
     4. HERO "START EXPLORING" SCROLL
     --------------------------------------------------------- */
  function setupHeroScroll() {
    document.getElementById('startExploring').addEventListener('click', () => {
      document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     5. CAMERA CONTROLS: drag-to-rotate, scroll-to-zoom,
        play/pause, reset, orbit speed
     --------------------------------------------------------- */
  const camera = {
    rotateX: 58,
    rotateY: 0,
    zoom: 1,
    minZoom: 0.5,
    maxZoom: 2.2
  };

  function setupCamera() {
    const viewport = document.getElementById('stageViewport');
    const stage = document.getElementById('stage');

    function applyTransform() {
      stage.style.transform =
        `translate(-50%,-50%) rotateX(${camera.rotateX}deg) rotateZ(${camera.rotateY}deg) scale(${camera.zoom})`;
    }
    applyTransform();

    // --- Drag to rotate (mouse + touch) ---
    let dragging = false;
    let lastX = 0, lastY = 0;

    function dragStart(x, y) {
      dragging = true;
      lastX = x; lastY = y;
      viewport.classList.add('is-dragging');
    }
    function dragMove(x, y) {
      if (!dragging) return;
      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x; lastY = y;
      camera.rotateY += dx * 0.3;
      camera.rotateX = Math.min(85, Math.max(20, camera.rotateX - dy * 0.2));
      applyTransform();
    }
    function dragEnd() {
      dragging = false;
      viewport.classList.remove('is-dragging');
    }

    viewport.addEventListener('mousedown', (e) => dragStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => dragMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', dragEnd);

    viewport.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      dragStart(t.clientX, t.clientY);
    }, { passive: true });
    viewport.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      dragMove(t.clientX, t.clientY);
    }, { passive: true });
    viewport.addEventListener('touchend', dragEnd);

    // --- Scroll to zoom ---
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      camera.zoom = Math.min(camera.maxZoom, Math.max(camera.minZoom, camera.zoom + delta));
      applyTransform();
    }, { passive: false });

    // --- Zoom buttons ---
    document.getElementById('zoomIn').addEventListener('click', () => {
      camera.zoom = Math.min(camera.maxZoom, camera.zoom + 0.15);
      applyTransform();
    });
    document.getElementById('zoomOut').addEventListener('click', () => {
      camera.zoom = Math.max(camera.minZoom, camera.zoom - 0.15);
      applyTransform();
    });

    // --- Play / Pause ---
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    function setPlaying(isPlaying) {
      stage.classList.toggle('paused', !isPlaying);
      playBtn.setAttribute('aria-pressed', String(isPlaying));
      pauseBtn.setAttribute('aria-pressed', String(!isPlaying));
      playBtn.classList.toggle('is-active', isPlaying);
      pauseBtn.classList.toggle('is-active', !isPlaying);
    }
    playBtn.addEventListener('click', () => setPlaying(true));
    pauseBtn.addEventListener('click', () => setPlaying(false));
    setPlaying(true);

    // --- Reset ---
    document.getElementById('resetBtn').addEventListener('click', () => {
      camera.rotateX = 58;
      camera.rotateY = 0;
      camera.zoom = 1;
      applyTransform();
      setPlaying(true);
      resetSpeed();
      closeInfoPanel();
      clearSelection();
    });

    // --- Orbit speed ---
    const speedButtons = Array.from(document.querySelectorAll('.speed-btn'));
    const orbitEls = Array.from(document.querySelectorAll('.orbit'));
    const baseDurations = new Map();
    orbitEls.forEach((el) => {
      const computed = getComputedStyle(el).animationDuration;
      baseDurations.set(el, parseFloat(computed) || 20);
    });

    function applySpeed(multiplier) {
      orbitEls.forEach((el) => {
        const base = baseDurations.get(el);
        el.style.animationDuration = (base / multiplier) + 's';
      });
      speedButtons.forEach((btn) => {
        btn.classList.toggle('is-active', parseFloat(btn.dataset.speed) === multiplier);
      });
    }
    function resetSpeed() { applySpeed(1); }

    speedButtons.forEach((btn) => {
      btn.addEventListener('click', () => applySpeed(parseFloat(btn.dataset.speed)));
    });
  }

  /* ---------------------------------------------------------
     6. PLANET SELECTION + INFO PANEL
     --------------------------------------------------------- */
  const infoPanel = document.getElementById('infoPanel');
  let currentPlanetKey = null;

  function clearSelection() {
    document.querySelectorAll('.planet.is-selected').forEach((p) => p.classList.remove('is-selected'));
    document.getElementById('stage').classList.remove('is-focused');
    document.querySelectorAll('.orbit.is-focus-target').forEach((o) => o.classList.remove('is-focus-target'));
    currentPlanetKey = null;
  }

  function openInfoPanel(key) {
    const data = PLANETS[key];
    if (!data) return;
    currentPlanetKey = key;

    document.getElementById('infoEmoji').textContent = data.emoji;
    document.getElementById('infoName').textContent = data.name;
    document.getElementById('infoDesc').textContent = data.desc;
    document.getElementById('infoDistance').textContent = data.distance;
    document.getElementById('infoDiameter').textContent = data.diameter;
    document.getElementById('infoMoons').textContent = data.moons;
    document.getElementById('infoOrbit').textContent = data.orbit;
    document.getElementById('infoRotation').textContent = data.rotation;
    document.getElementById('infoTemp').textContent = data.temp;

    const factsList = document.getElementById('infoFacts');
    factsList.innerHTML = '';
    data.facts.forEach((fact) => {
      const li = document.createElement('li');
      li.textContent = fact;
      factsList.appendChild(li);
    });

    infoPanel.hidden = false;
    // allow the browser to register hidden -> visible before animating
    requestAnimationFrame(() => infoPanel.classList.add('is-open'));

    // Highlight the selected planet, dim the rest
    document.querySelectorAll('.planet').forEach((p) => {
      p.classList.toggle('is-selected', p.dataset.planet === key);
    });
    document.getElementById('stage').classList.add('is-focused');
    document.querySelectorAll('.orbit').forEach((o) => {
      o.classList.toggle('is-focus-target', o.dataset.planet === key);
    });
  }

  function closeInfoPanel() {
    infoPanel.classList.remove('is-open');
    setTimeout(() => { infoPanel.hidden = true; }, 350);
  }

  function setupPlanetSelection() {
    document.querySelectorAll('.planet, .sun').forEach((el) => {
      el.addEventListener('click', () => {
        const key = el.dataset.planet;
        if (!key || !PLANETS[key]) return;
        openInfoPanel(key);
        document.getElementById('explore').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    document.getElementById('infoClose').addEventListener('click', () => {
      closeInfoPanel();
      clearSelection();
    });

    document.getElementById('infoExplore').addEventListener('click', () => {
      if (currentPlanetKey) {
        document.querySelector(`.planet[data-planet="${currentPlanetKey}"]`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ---------------------------------------------------------
     7. PLANET CARDS
     --------------------------------------------------------- */
  function buildPlanetCards() {
    const grid = document.getElementById('cardsGrid');
    const frag = document.createDocumentFragment();

    PLANET_ORDER.forEach((key) => {
      const data = PLANETS[key];
      const card = document.createElement('article');
      card.className = 'planet-card';

      const visual = document.createElement('div');
      visual.className = `card-visual ${data.className}`;
      card.appendChild(visual);

      const heading = document.createElement('h3');
      heading.textContent = `${data.name} ${data.emoji}`;
      card.appendChild(heading);

      const desc = document.createElement('p');
      desc.textContent = data.desc;
      card.appendChild(desc);

      const meta = document.createElement('div');
      meta.className = 'card-meta';
      meta.innerHTML = `
        <span>Distance<strong>${data.distance}</strong></span>
        <span>Moons<strong>${data.moons}</strong></span>
      `;
      card.appendChild(meta);

      const exploreBtn = document.createElement('button');
      exploreBtn.className = 'card-explore';
      exploreBtn.type = 'button';
      exploreBtn.textContent = 'Explore';
      exploreBtn.addEventListener('click', () => {
        openInfoPanel(key);
        document.getElementById('explore').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      card.appendChild(exploreBtn);

      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  /* ---------------------------------------------------------
     8. COMPARE PLANETS
     --------------------------------------------------------- */
  function buildCompare() {
    const select1 = document.getElementById('comparePlanet1');
    const select2 = document.getElementById('comparePlanet2');

    PLANET_ORDER.forEach((key) => {
      const opt1 = document.createElement('option');
      opt1.value = key;
      opt1.textContent = PLANETS[key].name;
      select1.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = key;
      opt2.textContent = PLANETS[key].name;
      select2.appendChild(opt2);
    });

    select1.value = 'earth';
    select2.value = 'mars';

    function renderCompare() {
      const p1 = PLANETS[select1.value];
      const p2 = PLANETS[select2.value];

      document.getElementById('compareHead1').textContent = `${p1.name} ${p1.emoji}`;
      document.getElementById('compareHead2').textContent = `${p2.name} ${p2.emoji}`;

      const rows = [
        ['Diameter', p1.diameter, p2.diameter],
        ['Mass', p1.mass, p2.mass],
        ['Gravity', p1.gravity, p2.gravity],
        ['Moons', p1.moons, p2.moons],
        ['Orbital period', p1.orbit, p2.orbit],
        ['Avg. temperature', p1.temp, p2.temp],
        ['Distance from Sun', p1.distance, p2.distance]
      ];

      const body = document.getElementById('compareBody');
      body.innerHTML = '';
      rows.forEach(([label, v1, v2]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th scope="row">${label}</th><td>${v1}</td><td>${v2}</td>`;
        body.appendChild(tr);
      });
    }

    select1.addEventListener('change', renderCompare);
    select2.addEventListener('change', renderCompare);
    renderCompare();
  }

  /* ---------------------------------------------------------
     9. SEARCH
     --------------------------------------------------------- */
  function setupSearch() {
    const input = document.getElementById('planetSearch');
    const results = document.getElementById('searchResults');

    function renderResults(query) {
      const q = query.trim().toLowerCase();
      results.innerHTML = '';
      if (!q) { results.hidden = true; return; }

      const matches = PLANET_ORDER.filter((key) => PLANETS[key].name.toLowerCase().includes(q));
      if (matches.length === 0) { results.hidden = true; return; }

      matches.forEach((key) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = `${PLANETS[key].name} ${PLANETS[key].emoji}`;
        btn.addEventListener('click', () => {
          openInfoPanel(key);
          input.value = PLANETS[key].name;
          results.hidden = true;
          document.getElementById('explore').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        results.appendChild(btn);
      });
      results.hidden = false;
    }

    input.addEventListener('input', () => renderResults(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = input.value.trim().toLowerCase();
        const match = PLANET_ORDER.find((key) => PLANETS[key].name.toLowerCase() === q)
          || PLANET_ORDER.find((key) => PLANETS[key].name.toLowerCase().startsWith(q));
        if (match) {
          openInfoPanel(match);
          results.hidden = true;
          document.getElementById('explore').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
    document.addEventListener('click', (e) => {
      if (!results.contains(e.target) && e.target !== input) results.hidden = true;
    });
  }

  /* ---------------------------------------------------------
     10. INIT
     --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    buildStarfield();
    setupNav();
    setupHeroScroll();
    setupCamera();
    setupPlanetSelection();
    buildPlanetCards();
    buildCompare();
    setupSearch();
  });
})();
