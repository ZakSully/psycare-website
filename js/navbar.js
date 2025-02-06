document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    // Handle scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-active');
            document.body.style.overflow = navbar.classList.contains('mobile-active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking links
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('mobile-active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar.classList.contains('mobile-active') && 
                !e.target.closest('.mobile-nav') && 
                !e.target.closest('.mobile-toggle')) {
                navbar.classList.remove('mobile-active');
                document.body.style.overflow = '';
            }
        });
    }
}); 