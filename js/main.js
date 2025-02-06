// Helper function to generate random numbers in a range
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function initLavaLampEffect() {
    const shapesContainer = document.querySelector('.gradient-shapes');
    if (!shapesContainer) return;

    const NUM_WAVES = 50;
    const COLORS = [
        'rgb(178, 255, 178)',  // Light mint
        'rgb(144, 238, 144)',  // Light green
        'rgb(152, 251, 152)',  // Pale green
        'rgb(255, 255, 255)'   // White
    ];

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < NUM_WAVES; i++) {
        const wave = document.createElement('div');
        const color = COLORS[i % COLORS.length];
        const height = randomInRange(100, 200);
        const width = randomInRange(300, 1000);
        
        // Create more varied starting positions
        const x = randomInRange(-50, 150);
        const y = randomInRange(-50, 150);
        
        // Randomize animation parameters
        const duration = randomInRange(20, 40);
        const delay = randomInRange(0, 20);
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        // Set custom properties for dynamic animations
        wave.style.setProperty('--wave-x', `${randomInRange(100, 200) * direction}px`);
        wave.style.setProperty('--wave-y', `${randomInRange(100, 200) * direction}px`);
        wave.style.setProperty('--wave-rotate', `${randomInRange(-180, 180)}deg`);
        wave.style.setProperty('--wave-scale', randomInRange(0.8, 1.2).toString());
        wave.style.setProperty('--duration', `${duration}s`);

        wave.style.cssText += `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            left: ${x}%;
            top: ${y}%;
            background: ${color};
            border-radius: 50% 50% 50% 50% / 20% 20% 80% 80%;
            filter: blur(${height / 3}px);
            animation: waveFloat var(--duration) ease-in-out infinite;
            animation-delay: -${delay}s;
            will-change: transform;
            transform: translateZ(0);
        `;
        fragment.appendChild(wave);
    }

    shapesContainer.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', function () {
    initLavaLampEffect();
});

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    let lastScroll = 0;
    let ticking = false;

    function updateNav() {
        const currentScroll = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        // Show/hide navbar based on scroll direction and position
        if (currentScroll > lastScroll && currentScroll > heroHeight) {
            // Scrolling down & past hero - hide navbar
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('navbar-hidden');
            
            // Add background when scrolling
            if (currentScroll > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    // Initial check
    updateNav();
}

function initValuePropSection() {
    // Create background shapes
    const shapesContainer = document.querySelector('.value-bg-shapes');
    const numShapes = 5;

    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'bg-shape';
        
        const size = Math.random() * 300 + 200;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        shape.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.5};
        `;
        
        shapesContainer.appendChild(shape);
    }

    // Scroll animations
    const cards = document.querySelectorAll('.value-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    cards.forEach(card => observer.observe(card));
}

function initTextColorEffect() {
    const heroContent = document.querySelector('.hero-content');
    const colorLayer = document.createElement('div');
    colorLayer.className = 'color-interaction-layer';
    
    // Create color points that follow blobs
    function createColorPoints() {
        const colors = [
            'rgba(152, 251, 152, 0.8)',
            'rgba(50, 205, 50, 0.7)',
            'rgba(34, 139, 34, 0.6)',
            'rgba(0, 128, 0, 0.7)',
            'rgba(255, 255, 255, 0.6)'
        ];

        const points = [];
        for (let i = 0; i < 5; i++) {
            const point = document.createElement('div');
            point.style.cssText = `
                position: absolute;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background: ${colors[i % colors.length]};
                filter: blur(10px);
                transition: all 0.5s ease;
            `;
            colorLayer.appendChild(point);
            points.push(point);
        }
        return points;
    }

    // Animate color points
    function animatePoints(points) {
        points.forEach((point, index) => {
            const angle = (index / points.length) * Math.PI * 2;
            const radius = 150;
            const speed = 0.001;
            let time = index * 1000;

            function update() {
                time += 16;
                const x = Math.cos(angle + time * speed) * radius + 50;
                const y = Math.sin(angle + time * speed) * radius + 50;
                point.style.transform = `translate(${x}%, ${y}%)`;
                requestAnimationFrame(update);
            }
            update();
        });
    }

    // Initialize
    heroContent.style.position = 'relative';
    heroContent.insertBefore(colorLayer, heroContent.firstChild);
    const points = createColorPoints();
    animatePoints(points);
}

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const rect = element.getBoundingClientRect();
                    const scrolled = window.pageYOffset;
                    
                    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                        element.style.transform = `translateY(${scrolled * speed}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '0px');
            card.style.setProperty('--mouse-y', '0px');
        });
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.dataset.delay) {
                    entry.target.style.transitionDelay = entry.target.dataset.delay;
                }
            }
        });
    }, options);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function initSuccessMetrics() {
    const complianceData = [
        { month: 'Jan', score: 45 },
        { month: 'Feb', score: 52 },
        { month: 'Mar', score: 63 },
        { month: 'Apr', score: 71 },
        { month: 'May', score: 78 },
        { month: 'Jun', score: 86 }
    ];

    const billingData = [
        { month: 'Jan', accuracy: 55 },
        { month: 'Feb', accuracy: 65 },
        { month: 'Mar', accuracy: 72 },
        { month: 'Apr', accuracy: 80 },
        { month: 'May', accuracy: 88 },
        { month: 'Jun', accuracy: 95 }
    ];

    function createChart(container, data, options) {
        // Clear any existing content
        container.innerHTML = '';
        
        const { valueKey, color, id } = options;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.minHeight = '250px';
        container.appendChild(svg);

        // Create gradient with unique ID
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        const gradientId = `gradient-${id}`;
        gradient.setAttribute('id', gradientId);
        gradient.setAttribute('x1', '0');
        gradient.setAttribute('y1', '0');
        gradient.setAttribute('x2', '0');
        gradient.setAttribute('y2', '1');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', color);
        stop1.setAttribute('stop-opacity', '0.2');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', color);
        stop2.setAttribute('stop-opacity', '0');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);

        // Calculate dimensions
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const width = container.clientWidth - margin.left - margin.right;
        const height = 250 - margin.top - margin.bottom;

        // Create scales with adjusted domain for y-axis
        const xScale = d3.scalePoint()
            .domain(data.map(d => d.month))
            .range([0, width])
            .padding(0.5);

        const yScale = d3.scaleLinear()
            .domain([40, 100]) // Start from 40 to make the changes more visible
            .range([height, 0])
            .nice();

        // Create line generator
        const line = d3.line()
            .x(d => xScale(d.month))
            .y(d => yScale(d[valueKey]))
            .curve(d3.curveMonotoneX);

        // Create area generator
        const area = d3.area()
            .x(d => xScale(d.month))
            .y0(height)
            .y1(d => yScale(d[valueKey]))
            .curve(d3.curveMonotoneX);

        // Create group element
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
        svg.appendChild(g);

        // Add grid lines
        const gridLines = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
        gridLines.setAttribute('class', 'chart-grid');

        yScale.ticks(5).forEach(tick => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 0);
            line.setAttribute('x2', width);
            line.setAttribute('y1', yScale(tick));
            line.setAttribute('y2', yScale(tick));
            gridLines.appendChild(line);
        });

        // Add area
        const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        areaPath.setAttribute('class', 'chart-area');
        areaPath.setAttribute('d', area(data));
        areaPath.style.fill = `url(#${gradientId})`;
        g.appendChild(areaPath);

        // Add line
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'chart-line');
        path.setAttribute('d', line(data));
        path.style.stroke = color;
        g.appendChild(path);

        // Add points
        data.forEach(d => {
            const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('class', 'chart-point');
            point.setAttribute('cx', xScale(d.month));
            point.setAttribute('cy', yScale(d[valueKey]));
            point.setAttribute('r', 6);
            point.style.stroke = color;
            g.appendChild(point);
        });

        // Add axes
        const xAxis = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
        xAxis.setAttribute('class', 'chart-axis');
        xAxis.setAttribute('transform', `translate(0,${height})`);

        data.forEach(d => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('class', 'chart-axis-label');
            text.setAttribute('x', xScale(d.month));
            text.setAttribute('y', 25);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = d.month;
            xAxis.appendChild(text);
        });

        const yAxis = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
        yAxis.setAttribute('class', 'chart-axis');

        yScale.ticks(5).forEach(tick => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('class', 'chart-axis-label');
            text.setAttribute('x', -10);
            text.setAttribute('y', yScale(tick));
            text.setAttribute('text-anchor', 'end');
            text.setAttribute('dominant-baseline', 'middle');
            text.textContent = `${tick}%`;
            yAxis.appendChild(text);
        });
    }

    // Initialize charts with unique IDs
    const complianceChart = document.querySelector('.compliance-chart');
    const billingChart = document.querySelector('.billing-chart');

    if (complianceChart) {
        createChart(complianceChart, complianceData, {
            valueKey: 'score',
            color: '#34D399',
            id: 'compliance'
        });
    }

    if (billingChart) {
        createChart(billingChart, billingData, {
            valueKey: 'accuracy',
            color: '#0B4B3F',
            id: 'billing'
        });
    }
}

// How It Works Section Functionality
function initHowItWorks() {
    const stepButtons = document.querySelectorAll('.step-nav-button');
    const stepPanels = document.querySelectorAll('.step-panel');
    const beforeAfterToggles = document.querySelectorAll('.before-after-toggle .toggle-btn');
    
    // Initialize first step as active
    if (stepButtons.length > 0 && stepPanels.length > 0) {
        stepButtons[0].classList.add('active');
        stepPanels[0].classList.add('active');
    }

    // Step navigation functionality
    stepButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            stepButtons.forEach(btn => btn.classList.remove('active'));
            stepPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            stepPanels[index].classList.add('active');
        });
    });

    // Before/After toggle functionality
    beforeAfterToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const parent = toggle.closest('.before-after-toggle');
            parent.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
            toggle.classList.add('active');
            
            // Get the visual container
            const visualContainer = toggle.closest('.step-visual').querySelector('.visual-container');
            
            // Toggle the visual state
            if (toggle.dataset.state === 'before') {
                visualContainer.style.opacity = '0.7';
                setTimeout(() => {
                    // Update visual content for 'before' state
                    visualContainer.style.opacity = '1';
                }, 300);
            } else {
                visualContainer.style.opacity = '0.7';
                setTimeout(() => {
                    // Update visual content for 'after' state
                    visualContainer.style.opacity = '1';
                }, 300);
            }
        });
    });

    // Add intersection observer for step animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe step panels for scroll animations
    stepPanels.forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        observer.observe(panel);
    });
}

function animateCounter(element, targetValue, duration = 2000) {
    const startValue = 0;
    const increment = targetValue / (duration / 16); // 60fps
    let currentValue = startValue;

    function updateCounter() {
        currentValue = Math.min(currentValue + increment, targetValue);
        if (targetValue % 1 === 0) {
            // For whole numbers
            element.textContent = Math.floor(currentValue) + (element.dataset.suffix || '');
        } else {
            // For percentages or decimals
            element.textContent = currentValue.toFixed(1) + (element.dataset.suffix || '');
        }

        if (currentValue < targetValue) {
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}

function initMetricCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const numberElement = card.querySelector('.metric-number');
                const targetValue = parseFloat(card.dataset.count);
                
                // Add the + or % suffix if present in the HTML
                const currentText = numberElement.textContent;
                const suffix = currentText.match(/[+%]/)?.[0] || '';
                numberElement.dataset.suffix = suffix;
                
                animateCounter(numberElement, targetValue);
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.metric-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize all sections
document.addEventListener('DOMContentLoaded', () => {
    initLavaLampEffect();
    initNavigation();
    initParallaxEffects();
    initHoverEffects();
    initSmoothScroll();
    initIntersectionObserver();
    initSuccessMetrics();
    initHowItWorks();
    initMetricCounters();
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;
    
    // Throttled scroll handler
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Only trigger the hide/show after scrolling 50px
                if (Math.abs(currentScroll - lastScroll) > 50) {
                    if (currentScroll > lastScroll && currentScroll > 80) {
                        // Scrolling down - hide navbar
                        navbar.classList.add('scrolled');
                    } else {
                        // Scrolling up - show navbar
                        navbar.classList.remove('scrolled');
                    }
                    lastScroll = currentScroll;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });

    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle?.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Toggle functionality for "Who We Help" section
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const contentPanels = document.querySelectorAll('.content-panel');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            
            // Update button states
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update content panels
            contentPanels.forEach(panel => {
                if (panel.id === `${target}-content`) {
                    panel.classList.add('active');
                    // Trigger animation
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        panel.style.opacity = '1';
                        panel.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // Initialize first panel
    const firstPanel = document.querySelector('.content-panel');
    if (firstPanel) {
        firstPanel.style.opacity = '1';
        firstPanel.style.transform = 'translateY(0)';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Safely handle element queries
    const handleElementSafely = (selector, callback) => {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        }
    };

    // Initialize navigation
    handleElementSafely('.navbar', (navbar) => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    });

    // Initialize mobile menu
    handleElementSafely('.mobile-menu-toggle', (menuToggle) => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');

        if (mobileMenu && overlay) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            overlay.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
    });

    // Initialize other features...
});
