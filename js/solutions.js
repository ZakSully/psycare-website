document.addEventListener('DOMContentLoaded', () => {
    // Initialize solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    const featureItems = document.querySelectorAll('.feature-item');

    // Intersection Observer for solution cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Intersection Observer for feature items
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                featureObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Set initial styles and observe solution cards
    solutionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);

        // Add click handler for cards
        card.addEventListener('click', () => {
            solutionCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // Set initial styles and observe feature items
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.4s ease-out';
        item.style.transitionDelay = `${index * 0.1}s`;
        featureObserver.observe(item);
    });

    // Add hover effect for solution cards
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.solution-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.solution-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add click handler for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('href');
            if (href) {
                // Smooth scroll to section if it's an anchor link
                if (href.startsWith('#')) {
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Navigate to external link
                    window.location.href = href;
                }
            }
        });
    });
}); 