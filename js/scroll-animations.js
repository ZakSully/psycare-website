document.addEventListener('DOMContentLoaded', function() {
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Handle stat number animation if it's a stat
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });

    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach((element) => {
        observer.observe(element);
    });

    // Number animation function
    function animateNumber(element) {
        const value = parseInt(element.dataset.value);
        let current = 0;
        const increment = value / 50; // Adjust for animation speed
        const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
                element.textContent = `${value}%`;
                clearInterval(interval);
            } else {
                element.textContent = `${Math.floor(current)}%`;
            }
        }, 20);
    }
}); 