// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeSlider();
    initializeProductCards();
    initializeSearch();
    initializeScrollAnimations();
    initializeBackToTop();
    initializeNewsletter();
    initializeMobileMenu();
});

// Slider functionality
function initializeSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('img');
    if (!slides.length) return;

    let currentSlide = 0;

    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-nav prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-nav next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    // Add event listeners
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    // Auto slide
    let slideInterval = setInterval(() => changeSlide(1), 5000);

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => changeSlide(1), 5000);
    });

    function changeSlide(direction) {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Calculate new slide index
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
}

// Product cards functionality
function initializeProductCards() {
    const cards = document.querySelectorAll('.card-item');
    
    cards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        // Add to cart functionality
        const addToCartBtn = card.querySelector('.btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const productName = card.querySelector('h3').textContent;
                showNotification(`Added ${productName} to cart!`);
                updateCartCount();
            });
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search .btn');
    
    if (!searchInput || !searchBtn) return;

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            showNotification(`Searching for: ${query}`);
            // Add actual search functionality here
        }
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.card, .category-item, .testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

// Back to top button
function initializeBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Newsletter subscription
function initializeNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value.trim();
        
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing!');
            form.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Mobile menu
function initializeMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;

    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('nav').insertBefore(menuBtn, nav);
    
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            nav.classList.remove('show');
        }
    });
}

// Helper functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateCartCount() {
    let count = parseInt(localStorage.getItem('cartCount') || '0');
    count++;
    localStorage.setItem('cartCount', count);
    
    const cartLink = document.querySelector('nav a[href="cart.html"]');
    if (cartLink) {
        const badge = cartLink.querySelector('.cart-badge') || document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = count;
        if (!cartLink.querySelector('.cart-badge')) {
            cartLink.appendChild(badge);
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add styles for new elements
const styles = `
    .slider-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.8);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
    }

    .slider-nav:hover {
        background: var(--white);
    }

    .slider-nav.prev {
        left: 20px;
    }

    .slider-nav.next {
        right: 20px;
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--white);
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        border-left: 4px solid #2ecc71;
    }

    .notification.error {
        border-left: 4px solid #e74c3c;
    }

    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: var(--secondary-color);
        color: var(--white);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .back-to-top:hover {
        background: var(--primary-color);
        transform: translateY(-3px);
    }

    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-color);
        cursor: pointer;
    }

    .cart-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--accent-color);
        color: var(--white);
        font-size: 0.8rem;
        padding: 2px 6px;
        border-radius: 10px;
    }

    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }

        nav ul {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--white);
            padding: 1rem;
            box-shadow: var(--shadow);
        }

        nav ul.show {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 