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
            autoPlay: false,
            autoPlayInterval: 5000,
            loop: true,
            onComplete: null, // Callback when carousel finishes loading
            ...config
        };

        this.currentIndex = 0;
        this.images = [];
        this.autoPlayTimer = null;
        this.isComplete = false;
        this.container = document.querySelector(this.settings.containerSelector);

        if (!this.container) {
            console.error('Container not found:', this.settings.containerSelector);
            if (this.settings.onComplete) this.settings.onComplete();
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

        const checkComplete = () => {
            if (attemptedCount >= totalAttempts) {
                this.isComplete = true;
                if (this.settings.onComplete) {
                    this.settings.onComplete();
                }
            }
        };

        for (let i = this.settings.startIndex; i < this.settings.startIndex + this.settings.maxImages; i++) {
            this.settings.extensions.forEach(ext => {
                const img = new Image();
                const filename = this.generateFilename(i, ext);
                const imagePath = `${this.settings.directory}/${filename}`;

                img.onload = () => {
                    loadedCount++;
                    attemptedCount++;
                    this.images.push({
                        src: imagePath,
                        alt: `${this.settings.namePattern} Image ${i}`,
                        filename: filename,
                        index: i, // Store the original index for sorting
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        aspectRatio: img.naturalWidth / img.naturalHeight
                    });

                    // Sort images by their index to maintain numerical order
                    this.images.sort((a, b) => a.index - b.index);

                    if (loadedCount === 1) {
                        this.buildCarousel();
                    } else {
                        this.updateCarousel();
                    }

                    checkComplete();
                };

                img.onerror = () => {
                    attemptedCount++;
                    if (attemptedCount === totalAttempts && loadedCount === 0) {
                        this.container.innerHTML = '<div class="carousel-loading">No images found</div>';
                    }
                    checkComplete();
                };

                img.src = imagePath;
            });
        }
    }

    buildCarousel() {
        
        this.container.innerHTML = `
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
            <button class="carousel-fullscreen" aria-label="View fullscreen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8M3 16.2V21m0 0h4.8M3 21l6-6M21 7.8V3m0 0h-4.8M21 3l-6 6M3 7.8V3m0 0h4.8M3 3l6 6"/>
                </svg>
            </button>
        `;

        this.attachEventListeners();
        this.updateCarousel();
    }

    attachEventListeners() {
        const prevBtn = this.container.querySelector('.carousel-nav.prev');
        const nextBtn = this.container.querySelector('.carousel-nav.next');
        const fullscreenBtn = this.container.querySelector('.carousel-fullscreen');
        const track = this.container.querySelector('.carousel-track');

        prevBtn.addEventListener('click', () => this.navigate(-1));
        nextBtn.addEventListener('click', () => this.navigate(1));
        fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
            if (e.key === 'Escape') this.exitFullscreen();
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

        this.updateView();
    }

    navigate(direction) {
        const maxIndex = this.images.length - 1;

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

        if (!track) return;

        // Update track position
        track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // Update counter
        if (counter) {
            counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        }

        // Update navigation buttons
        if (!this.settings.loop && prevBtn && nextBtn) {
            prevBtn.disabled = this.currentIndex === 0;
            nextBtn.disabled = this.currentIndex >= this.images.length - 1;
        }

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
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

    toggleFullscreen() {
        if (document.fullscreenElement) {
            this.exitFullscreen();
        } else {
            this.enterFullscreen();
        }
    }

    enterFullscreen() {
        const currentImage = this.images[this.currentIndex];
        if (!currentImage) return;

        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.className = 'carousel-fullscreen-overlay';
        overlay.innerHTML = `
            <div class="carousel-fullscreen-content">
                <img src="${currentImage.src}" alt="${currentImage.alt}" class="carousel-fullscreen-image">
                <div class="carousel-fullscreen-controls">
                    <button class="carousel-fullscreen-nav prev" aria-label="Previous image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button class="carousel-fullscreen-nav next" aria-label="Next image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                    <button class="carousel-fullscreen-close" aria-label="Close fullscreen">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Add event listeners
        const closeBtn = overlay.querySelector('.carousel-fullscreen-close');
        const prevBtn = overlay.querySelector('.carousel-fullscreen-nav.prev');
        const nextBtn = overlay.querySelector('.carousel-fullscreen-nav.next');

        closeBtn.addEventListener('click', () => this.exitFullscreen());
        prevBtn.addEventListener('click', () => this.fullscreenNavigate(-1));
        nextBtn.addEventListener('click', () => this.fullscreenNavigate(1));
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.exitFullscreen();
        });

        this.fullscreenOverlay = overlay;
    }

    exitFullscreen() {
        const overlay = document.querySelector('.carousel-fullscreen-overlay');
        if (overlay) {
            overlay.remove();
            document.body.style.overflow = '';
            this.fullscreenOverlay = null;
        }
    }

    fullscreenNavigate(direction) {
        this.navigate(direction);
        
        // Update fullscreen image
        const overlay = document.querySelector('.carousel-fullscreen-overlay');
        const image = overlay?.querySelector('.carousel-fullscreen-image');
        if (image && this.images[this.currentIndex]) {
            image.src = this.images[this.currentIndex].src;
            image.alt = this.images[this.currentIndex].alt;
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
        this.exitFullscreen();
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