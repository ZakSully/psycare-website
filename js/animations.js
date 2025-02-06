document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle stat number counting animation
                if (entry.target.classList.contains('stat-number')) {
                    animateStatNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-up, .fade-in, .stagger-children, .line, .diamond').forEach(el => {
        observer.observe(el);
    });

    // Animate stat numbers
    function animateStatNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = `${target}%`;
                clearInterval(timer);
            } else {
                element.textContent = `${Math.round(current)}%`;
            }
        }, 16);
    }
}); 