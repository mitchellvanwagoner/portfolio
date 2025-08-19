/**
 * Reusable Carousel Gallery Component
 * Separated from main script for better organization
 */
class CarouselGallery {
    constructor(config) {
        this.settings = {
            numberFormat: 'parentheses',
            maxImages: 100,
            startIndex: 1,
            extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            showDots: false,
            showCounter: true,
            showThumbnails: false,
            autoPlay: false,
            autoPlayInterval: 3000,
            loop: true,
            itemsPerView: 1,
            ...config
        };

        this.currentIndex = 0;
        this.images = [];
        this.autoPlayTimer = null;
        this.container = document.querySelector(this.settings.containerSelector);
        
        if (!this.container) {
            console.error('Container not found:', this.settings.containerSelector);
            return;
        }
        
        this.init();
    }

    init() {
        this.container.innerHTML = '<div class="carousel-loading">Loading images...</div>';
        this.loadImages();
    }

    generateFilename(index, extension) {
        const { namePattern, numberFormat } = this.settings;
        switch (numberFormat) {
            case 'parentheses': return `${namePattern} (${index}).${extension}`;
            case 'underscore': return `${namePattern}_${index}.${extension}`;
            case 'dash': return `${namePattern}-${index}.${extension}`;
            case 'none': return `${namePattern}${index}.${extension}`;
            default: return `${namePattern} (${index}).${extension}`;
        }
    }

    loadImages() {
        let loadedCount = 0;
        let attemptedCount = 0;
        const totalAttempts = this.settings.maxImages * this.settings.extensions.length;

        for (let i = this.settings.startIndex; i < this.settings.startIndex + this.settings.maxImages; i++) {
            this.settings.extensions.forEach(ext => {
                const img = new Image();
                const filename = this.generateFilename(i, ext);
                const imagePath = `${this.settings.directory}/${filename}`;

                img.onload = () => {
                    loadedCount++;
                    this.images.push({
                        src: imagePath,
                        alt: `${this.settings.namePattern} Image ${loadedCount}`,
                        filename: filename
                    });

                    if (loadedCount === 1) {
                        this.buildCarousel();
                    } else {
                        this.updateCarousel();
                    }
                };

                img.onerror = () => {
                    attemptedCount++;
                    if (attemptedCount === totalAttempts && loadedCount === 0) {
                        this.container.innerHTML = '<div class="carousel-loading">No images found</div>';
                    }
                };

                img.src = imagePath;
            });
        }
    }

    buildCarousel() {
        const multiClass = this.settings.itemsPerView > 1 ? 'carousel-multi' : '';
        
        this.container.innerHTML = `
            <div class="carousel-wrapper ${multiClass}">
                <div class="carousel-track"></div>
                <button class="carousel-nav prev" aria-label="Previous image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button class="carousel-nav next" aria-label="Next image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
                ${this.settings.showCounter ? '<div class="carousel-counter"></div>' : ''}
                ${this.settings.showDots ? '<div class="carousel-dots"></div>' : ''}
            </div>
            ${this.settings.showThumbnails ? '<div class="carousel-thumbnails"></div>' : ''}
        `;

        this.attachEventListeners();
        this.updateCarousel();
    }

    attachEventListeners() {
        const prevBtn = this.container.querySelector('.carousel-nav.prev');
        const nextBtn = this.container.querySelector('.carousel-nav.next');
        const track = this.container.querySelector('.carousel-track');

        prevBtn.addEventListener('click', () => this.navigate(-1));
        nextBtn.addEventListener('click', () => this.navigate(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });

        // Auto-play
        if (this.settings.autoPlay) {
            this.startAutoPlay();
            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    handleSwipe(startX, endX) {
        if (endX < startX - 50) this.navigate(1);  // Swipe left
        if (endX > startX + 50) this.navigate(-1); // Swipe right
    }

    updateCarousel() {
        const track = this.container.querySelector('.carousel-track');
        const counter = this.container.querySelector('.carousel-counter');
        const dotsContainer = this.container.querySelector('.carousel-dots');
        const thumbnailsContainer = this.container.querySelector('.carousel-thumbnails');

        if (!track) return;

        // Update slides
        track.innerHTML = this.images.map(img => `
            <div class="carousel-slide">
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `).join('');

        // Update dots
        if (dotsContainer) {
            dotsContainer.innerHTML = this.images.map((_, index) => `
                <button class="carousel-dot ${index === this.currentIndex ? 'active' : ''}" 
                        data-index="${index}" aria-label="Go to image ${index + 1}"></button>
            `).join('');

            dotsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
                dot.addEventListener('click', (e) => {
                    this.goToSlide(parseInt(e.target.dataset.index));
                });
            });
        }

        // Update thumbnails
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = this.images.map((img, index) => `
                <div class="carousel-thumbnail ${index === this.currentIndex ? 'active' : ''}" 
                        data-index="${index}">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `).join('');

            thumbnailsContainer.querySelectorAll('.carousel-thumbnail').forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    this.goToSlide(parseInt(e.currentTarget.dataset.index));
                });
            });
        }

        this.updateView();
    }

    navigate(direction) {
        const maxIndex = Math.ceil(this.images.length / this.settings.itemsPerView) - 1;

        if (this.settings.loop) {
            if (direction === 1 && this.currentIndex >= maxIndex) {
                this.currentIndex = 0;
            } else if (direction === -1 && this.currentIndex <= 0) {
                this.currentIndex = maxIndex;
            } else {
                this.currentIndex += direction;
            }
        } else {
            this.currentIndex = Math.max(0, Math.min(maxIndex, this.currentIndex + direction));
        }

        this.updateView();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateView();
    }

    updateView() {
        const track = this.container.querySelector('.carousel-track');
        const counter = this.container.querySelector('.carousel-counter');
        const prevBtn = this.container.querySelector('.carousel-nav.prev');
        const nextBtn = this.container.querySelector('.carousel-nav.next');
        const dots = this.container.querySelectorAll('.carousel-dot');
        const thumbnails = this.container.querySelectorAll('.carousel-thumbnail');

        if (!track) return;

        // Update track position
        const slideWidth = 100 / this.settings.itemsPerView;
        track.style.transform = `translateX(-${this.currentIndex * slideWidth}%)`;

        // Update counter
        if (counter) {
            counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        }

        // Update navigation buttons
        if (!this.settings.loop && prevBtn && nextBtn) {
            prevBtn.disabled = this.currentIndex === 0;
            nextBtn.disabled = this.currentIndex >= this.images.length - this.settings.itemsPerView;
        }

        // Update dots and thumbnails
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        if (!this.settings.autoPlay) return;
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => this.navigate(1), this.settings.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    // Public API
    next() { this.navigate(1); }
    prev() { this.navigate(-1); }
    goTo(index) { this.goToSlide(index); }
    getCurrentIndex() { return this.currentIndex; }
    getImages() { return this.images; }
    
    destroy() {
        this.stopAutoPlay();
        this.container.innerHTML = '';
    }
}

// Export for module use or global access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CarouselGallery;
} else {
    window.CarouselGallery = CarouselGallery;
}

// Legacy function support for existing implementations
function loadCarouselGallery(config) {
    return new CarouselGallery(config);
}