/* ============================================================
   script.js — Award-Winning Portfolio Interactions
   Divyansh | 2026
   GSAP + Three.js + Typed.js + Vanilla-Tilt + Custom FX
   ============================================================ */

'use strict';

// ── Utilities ───────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── 1. LOADING SCREEN ───────────────────────────────────────
(function initLoader() {
    const loader  = $('#loader');
    const loaderBar = $('#loader-bar');

    if (!loader) return;

    // Simulate loading progress, then hide
    window.addEventListener('load', () => {
        // Small delay for visual polish
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            // Hero entrance animations
            runHeroEntrance();
        }, 400);
    });

    // Fallback if window.load already fired (e.g., cached resources)
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loader.classList.add('hidden');
            runHeroEntrance();
        }, 500);
    }

    document.body.style.overflow = 'hidden';
})();

// ── 21. VEHICLE CHROMA KEY + MOTION OVERLAY ────────────────────────
// Converts the generated green-screen vehicle into a transparent PNG in-browser.
// This keeps the asset lightweight and lets the CSS perspective loop feel alive
// without adding another runtime dependency.
(function initVehicleOverlay() {
    const vehicle = document.getElementById('journey-vehicle-img');
    const wrap = document.querySelector('.journey-vehicle');
    if (!vehicle || !wrap) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let processed = false;

    function removeGreen() {
        if (processed || !vehicle.naturalWidth) return;
        processed = true;
        canvas.width = vehicle.naturalWidth;
        canvas.height = vehicle.naturalHeight;
        ctx.drawImage(vehicle, 0, 0);

        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = frame.data;

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const greenDominance = g - Math.max(r, b);

            if (g > 105 && greenDominance > 28) {
                pixels[i + 3] = 0;
            } else if (g > 90 && greenDominance > 12) {
                const edge = Math.min(1, (greenDominance - 12) / 24);
                pixels[i + 3] = Math.round(pixels[i + 3] * (1 - edge));
                pixels[i + 1] = Math.min(g, Math.round((r + b) / 2 + 18));
            }
        }

        ctx.putImageData(frame, 0, 0);
        vehicle.addEventListener('load', () => wrap.classList.add('is-ready'), { once: true });
        vehicle.src = canvas.toDataURL('image/png');
    }

    vehicle.addEventListener('load', removeGreen, { once: true });
    if (vehicle.complete) removeGreen();
})();

(function initJourneyVideoControl() {
    const video = document.querySelector('.journey-video');
    const control = document.querySelector('.journey-video-control');
    if (!video || !control) return;

    const icon = control.querySelector('.video-control-icon');
    const label = control.querySelector('.video-control-text');

    function setState(isPaused) {
        control.setAttribute('aria-pressed', String(isPaused));
        control.setAttribute('aria-label', isPaused ? 'Play background video' : 'Pause background video');
        if (icon) icon.textContent = isPaused ? '▶' : 'Ⅱ';
        if (label) label.textContent = isPaused ? 'Play motion' : 'Pause motion';
    }

    control.addEventListener('click', () => {
        if (video.paused) {
            video.play().then(() => setState(false)).catch(() => setState(true));
        } else {
            video.pause();
            setState(true);
        }
    });

    video.addEventListener('pause', () => setState(true));
    video.addEventListener('play', () => setState(false));
})();

// ── 2. GSAP HERO ENTRANCE ───────────────────────────────────
function runHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('#hero-badge',    { opacity: 0, y: 20, duration: 0.6, delay: 0.1 })
      .from('#hero-greeting', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('#hero-title',    { opacity: 0, y: 30, duration: 0.7, scale: 0.96 }, '-=0.4')
      .from('.hero-role-wrap',{ opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('#hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('#hero-stats .stat-chip', {
            opacity: 0, y: 16, duration: 0.4,
            stagger: 0.08,
        }, '-=0.2')
      .from('#hero-btns .btn', {
            opacity: 0, y: 16, duration: 0.4,
            stagger: 0.1,
        }, '-=0.2')
      .from('#hero-visual', { opacity: 0, x: 40, duration: 0.8, scale: 0.95 }, '-=0.6')
      .from('#scroll-indicator', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2');

    // GSAP Scroll animations
    initScrollAnimations();

    // Init typed.js after entrance
    setTimeout(initTyped, 800);
}

// ── 3. TYPED.JS ─────────────────────────────────────────────
function initTyped() {
    const el = document.getElementById('typed-target');
    if (!el || typeof Typed === 'undefined') return;

    new Typed(el, {
        strings: [
            'Java Developer',
            'DSA Enthusiast',
            'Web Developer',
            'Problem Solver',
            'Clean Code Advocate',
        ],
        typeSpeed:    52,
        backSpeed:    28,
        backDelay:    1600,
        startDelay:   200,
        loop:         true,
        cursorChar:   '|',
        smartBackspace: true,
    });
}

// ── 4. THREE.JS PARTICLE BACKGROUND ─────────────────────────
(function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    // Particle geometry
    const COUNT   = 1200;
    const geo     = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    const palette = [
        new THREE.Color('#00d4ff'),
        new THREE.Color('#7c3aed'),
        new THREE.Color('#e879f9'),
        new THREE.Color('#00ff88'),
    ];

    for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size:         0.18,
        vertexColors: true,
        transparent:  true,
        opacity:      0.7,
        sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', e => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Resize
    function onResize() {
        const W = canvas.parentElement.clientWidth;
        const H = canvas.parentElement.clientHeight;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
    }
    onResize();
    window.addEventListener('resize', onResize);

    // Only run when hero is visible (IntersectionObserver)
    let heroRunning = true;
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const io = new IntersectionObserver(entries => {
            heroRunning = entries[0].isIntersecting;
        }, { threshold: 0.05 });
        io.observe(heroSection);
    }

    // Animation loop
    let t = 0;
    function animate() {
        requestAnimationFrame(animate);
        if (!heroRunning) return;

        t += 0.001;
        particles.rotation.y = t * 0.12 + mouse.x * 0.08;
        particles.rotation.x = t * 0.05 + mouse.y * 0.04;

        renderer.render(scene, camera);
    }
    animate();
})();

// ── 5. CUSTOM CURSOR ────────────────────────────────────────
(function initCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    // Skip on touch devices
    if (!matchMedia('(pointer:fine)').matches) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    const interactives = 'a, button, [data-tilt], input, textarea, .skill-tab, .nav-link, .social-btn';

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        document.body.classList.add('cursor-ready');
    }, { passive: true });

    document.addEventListener('mousedown', () => {
        ring.classList.add('click');
        dot.classList.add('click');
    });
    document.addEventListener('mouseup', () => {
        ring.classList.remove('click');
        dot.classList.remove('click');
    });

    // Delegated hover state keeps the cursor working for dynamically rendered cards.
    document.addEventListener('pointerover', e => {
        const target = e.target.closest?.(interactives);
        if (!target) return;
        ring.classList.add('hover');
        dot.classList.add('hover');
        ring.classList.toggle('scene', Boolean(target.closest('.journey-hero')));
        ring.dataset.label = target.closest('.journey-hero') ? 'VIEW' : target.tagName === 'A' ? 'OPEN' : 'SELECT';
    });

    document.addEventListener('pointerout', e => {
        const target = e.target.closest?.(interactives);
        if (!target || target.contains(e.relatedTarget)) return;
        ring.classList.remove('hover', 'scene');
        dot.classList.remove('hover');
        ring.dataset.label = '';
    });

    // Lag ring slightly behind for smooth magnetic feel
    function loop() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;

        dot.style.left  = mx + 'px';
        dot.style.top   = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';

        requestAnimationFrame(loop);
    }
    loop();
})();

// ── 6. NAVBAR ───────────────────────────────────────────────
(function initNavbar() {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');
    const navLinks  = $$('.nav-link');

    if (!navbar) return;

    // Scroll: add glass effect
    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Scroll-to-top button
        const scrollBtn = document.getElementById('scroll-top-btn');
        if (scrollBtn) {
            scrollBtn.classList.toggle('visible', window.scrollY > 500);
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active link on scroll (IntersectionObserver)
    const sections = $$('section[id]');
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => io.observe(s));
})();

// ── 7. GSAP SCROLL ANIMATIONS ───────────────────────────────
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Fallback to plain IntersectionObserver
        initRevealObserver();
        return;
    }

    // Batch reveal elements with class .reveal
    ScrollTrigger.batch('.reveal', {
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1,
            });
        },
        start: 'top 88%',
        once: true,
    });

    // Skill bars animate on scroll
    ScrollTrigger.create({
        trigger: '#skills',
        start: 'top 70%',
        once: true,
        onEnter: () => animateSkillBars(),
    });

    // About stat counters
    ScrollTrigger.create({
        trigger: '.about-stats-row',
        start: 'top 80%',
        once: true,
        onEnter: () => animateCounters(),
    });
}

// Fallback reveal for no GSAP
function initRevealObserver() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    $$('.reveal').forEach(el => io.observe(el));

    // Skill bars & counters (simple IO)
    const skillsIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateSkillBars();
                animateCounters();
                skillsIO.disconnect();
            }
        });
    }, { threshold: 0.3 });
    const skillsSection = document.getElementById('skills');
    if (skillsSection) skillsIO.observe(skillsSection);
}

// ── 8. SKILL BARS ───────────────────────────────────────────
function animateSkillBars() {
    $$('.skill-bar').forEach(bar => {
        bar.classList.add('animated');
    });
}

// ── 9. COUNTER ANIMATION ────────────────────────────────────
function animateCounters() {
    $$('.about-stat-num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const start  = parseInt(el.textContent, 10) || 0;
        const diff   = target - start;
        const dur    = 1400;
        const step   = 16;
        let elapsed  = 0;

        const timer = setInterval(() => {
            elapsed += step;
            const progress = Math.min(elapsed / dur, 1);
            // ease-out
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + diff * ease);
            if (progress >= 1) clearInterval(timer);
        }, step);
    });
}

// ── 10. SKILL TABS ──────────────────────────────────────────
(function initSkillTabs() {
    const tabs = $$('.skill-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels
            $$('.skills-panel').forEach(panel => panel.classList.remove('active'));
            const panel = document.getElementById(`panel-${target}`);
            if (panel) {
                panel.classList.add('active');
                // Re-animate bars in new panel
                panel.querySelectorAll('.skill-bar').forEach(b => {
                    b.classList.remove('animated');
                    requestAnimationFrame(() => b.classList.add('animated'));
                });
            }
        });
    });
})();

// ── 11. MAGNETIC BUTTONS ────────────────────────────────────
(function initMagnetic() {
    const STRENGTH = 0.35;

    $$('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect   = btn.getBoundingClientRect();
            const cx     = rect.left + rect.width  / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = (e.clientX - cx) * STRENGTH;
            const dy     = (e.clientY - cy) * STRENGTH;
            btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
})();

// ── 12. VANILLA TILT (3D card tilt) ─────────────────────────
(function initTilt() {
    if (typeof VanillaTilt === 'undefined') return;

    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max:        10,
        speed:      400,
        glare:      true,
        'max-glare': 0.1,
        scale:       1.02,
        perspective: 1000,
    });
})();

// ── 13. SCROLL TO TOP ───────────────────────────────────────
(function initScrollTop() {
    const btn = document.getElementById('scroll-top-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ── 14. PARALLAX ORBS (mouse) ───────────────────────────────
(function initParallaxOrbs() {
    const orbs = $$('.orb');
    if (!orbs.length) return;

    window.addEventListener('mousemove', e => {
        const mx = (e.clientX / window.innerWidth  - 0.5);
        const my = (e.clientY / window.innerHeight - 0.5);
        orbs.forEach((orb, i) => {
            const strength = (i + 1) * 25;
            const tx = mx * strength;
            const ty = my * strength;
            orb.style.transform = `translate(${tx}px, ${ty}px)`;
        });
    });
})();

// ── 15. CONTACT FORM ────────────────────────────────────────
(function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        const btn = document.getElementById('form-submit-btn');
        if (btn) {
            btn.innerHTML = '<span>Sending...</span>';
            setTimeout(() => {
                btn.innerHTML = `<span>Message Sent!</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
                btn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
            }, 800);
        }
    });
})();

// ── 16. CARD HOVER RIPPLE ───────────────────────────────────
(function initCardRipple() {
    $$('.glass-card, .pcard').forEach(card => {
        card.addEventListener('click', function(e) {
            const rect   = this.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height);
            const x      = e.clientX - rect.left - size / 2;
            const y      = e.clientY - rect.top  - size / 2;
            const ripple = document.createElement('span');

            Object.assign(ripple.style, {
                position:     'absolute',
                width:        size + 'px',
                height:       size + 'px',
                left:         x + 'px',
                top:          y + 'px',
                borderRadius: '50%',
                background:   'rgba(0,212,255,0.08)',
                transform:    'scale(0)',
                animation:    'ripple-anim 0.6s linear forwards',
                pointerEvents:'none',
                zIndex:       '0',
            });

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });

    // Inject ripple keyframe once
    const style = document.createElement('style');
    style.textContent = `@keyframes ripple-anim { to { transform: scale(2.5); opacity: 0; } }`;
    document.head.appendChild(style);
})();

// ── 17. SCROLL INDICATOR HIDE ───────────────────────────────
(function initScrollIndicatorHide() {
    const si = document.getElementById('scroll-indicator');
    if (!si) return;

    window.addEventListener('scroll', () => {
        si.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
})();

// ── 18. PAGE REVEAL (IntersectionObserver fallback) ─────────
(function initPageReveal() {
    // If GSAP loaded, ScrollTrigger handles it via initScrollAnimations
    // This is the pure fallback
    if (typeof ScrollTrigger !== 'undefined') return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    // Stagger children of each section
    $$('.reveal').forEach((el, i) => {
        el.style.transitionDelay = `${(i % 5) * 0.07}s`;
        io.observe(el);
    });
})();

// ── 19. SECTION OBSERVER FOR SKILL BARS + COUNTERS ──────────
(function initSectionObservers() {
    let skillsAnimated   = false;
    let countersAnimated = false;

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;

            if (id === 'skills' && !skillsAnimated) {
                skillsAnimated = true;
                animateSkillBars();
            }

            if (id === 'about' && !countersAnimated) {
                countersAnimated = true;
                setTimeout(animateCounters, 400);
            }
        });
    }, { threshold: 0.2 });

    ['skills', 'about'].forEach(id => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
    });
})();

// ── 20. CONSOLE EASTER EGG ──────────────────────────────────
(function consoleEasterEgg() {
    const cyan   = 'color: #00d4ff; font-size: 18px; font-weight: bold;';
    const purple = 'color: #7c3aed; font-size: 13px; font-style: italic;';
    const muted  = 'color: #8892b0; font-size: 12px;';

    console.log('%c👋 Hello, curious developer!', cyan);
    console.log('%c"Good software is built twice — once in logic, once in code."', purple);
    console.log('%cLike the portfolio? Let\'s connect → divyanshsingh74178@gmail.com', muted);
    console.log('%c🚀 Built with GSAP · Three.js · Typed.js · Vanilla-Tilt', muted);
})();
