if (typeof Swiper !== 'undefined') {
    const heroSlider = new Swiper('.hero__slider', {
      loop: true,

      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },

      speed: 2000, // 2 секунды

      autoplay: {
        delay: 5000, // каждые 5 секунд
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },

      pagination: {
        el: '.hero__pagination',
        clickable: true,
      },
    });


    const apartmentsSliders = document.querySelectorAll('.apartments__slider');

    apartmentsSliders.forEach((slider) => {
      const section = slider.closest('.apartments');
      const isOpenOther = section?.classList.contains('open-other');
      const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
      const desktopSlides = isOpenOther ? 4 : 3;
      const desktopGap = isOpenOther ? 40 : 80;
      const mobileSlides = isOpenOther ? 1.55 : 1.12;
      let progressbar = slider.querySelector('.apartments__progressbar');

      if (isMobileViewport) {
        return;
      }

      if (!progressbar) {
        progressbar = document.createElement('div');
        progressbar.className = 'apartments__progressbar swiper-pagination';
        slider.appendChild(progressbar);
      }

      new Swiper(slider, {
        allowTouchMove: isOpenOther || isMobileViewport,
        slidesPerView: desktopSlides,
        spaceBetween: desktopGap,
        speed: 800,

        navigation: {
          prevEl: section?.querySelector('.apartments__button--prev'),
          nextEl: section?.querySelector('.apartments__button--next'),
        },
        pagination: {
          el: progressbar,
          type: 'progressbar',
        },
        breakpoints: {
          0: {
            slidesPerView: mobileSlides,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          1100: {
            slidesPerView: desktopSlides,
            spaceBetween: desktopGap,
          },
        },
      });
    });

    const cardSliders = document.querySelectorAll('.card-slider');

    cardSliders.forEach((slider) => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        return;
      }

      const slidesCount = slider.querySelectorAll('.card-slider__slide').length;
      const cardSwiper = new Swiper(slider, {
        loop: true,
        speed: 600,

        pagination: {
          el: slider.querySelector('.card-slider__pagination'),
          clickable: true,
        },
      });

      slider.addEventListener('mousemove', (event) => {
        if (!slidesCount) {
          return;
        }

        const rect = slider.getBoundingClientRect();
        const relativeX = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
        const slideIndex = Math.min(slidesCount - 1, Math.floor((relativeX / rect.width) * slidesCount));

        if (slideIndex !== cardSwiper.realIndex) {
          cardSwiper.slideToLoop(slideIndex);
        }
      });

    });
}


const locationSliders = document.querySelectorAll('.locations__slider');

if (typeof Swiper !== 'undefined' && !window.matchMedia('(max-width: 768px)').matches) {
    locationSliders.forEach((slider) => {
        const slidesCount = slider.querySelectorAll('.locations__slide').length;

        if (slidesCount < 2) {
            return;
        }

        const locationsSwiper = new Swiper(slider, {
            loop: true,
            speed: 600,
            allowTouchMove: false,
            pagination: {
                el: slider.querySelector('.locations__pagination'),
                clickable: true,
            },
        });

        slider.addEventListener('mousemove', (event) => {
            const rect = slider.getBoundingClientRect();
            const relativeX = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
            const slideIndex = Math.min(slidesCount - 1, Math.floor((relativeX / rect.width) * slidesCount));

            if (slideIndex !== locationsSwiper.realIndex) {
                locationsSwiper.slideToLoop(slideIndex);
            }
        });
    });
}


const headers = document.querySelectorAll('.header');

headers.forEach((header) => {
    const burger = header.querySelector('.header__burger');
    const main = header.querySelector('.header__main');
    const navLinks = Array.from(header.querySelectorAll('.header__nav .nav__link'));

    if (!burger || !main || !navLinks.length) {
        return;
    }

    const mobileMenu = document.createElement('nav');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.setAttribute('aria-hidden', 'true');

    navLinks.forEach((link) => {
        const menuLink = link.cloneNode(true);
        menuLink.classList.add('mobile-menu__link');
        mobileMenu.appendChild(menuLink);
    });

    main.appendChild(mobileMenu);
    burger.setAttribute('aria-expanded', 'false');

    function closeMobileMenu() {
        header.classList.remove('is-menu-open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-lock');
    }

    burger.addEventListener('click', () => {
        const isOpen = header.classList.toggle('is-menu-open');

        burger.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        document.body.classList.toggle('is-lock', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (!window.matchMedia('(max-width: 768px)').matches) {
            closeMobileMenu();
        }
    });
});

function updateFixedHeader() {
    headers.forEach((header) => {
        const shouldFix = window.scrollY > 24;

        if (shouldFix && !header.classList.contains('header-fixed')) {
            header.classList.add('header-fixed');
            requestAnimationFrame(() => header.classList.add('header-fixed-visible'));
            return;
        }

        if (!shouldFix) {
            header.classList.remove('header-fixed-visible');
            header.classList.remove('header-fixed');
        }
    });
}

updateFixedHeader();
window.addEventListener('scroll', updateFixedHeader, { passive: true });


const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    item.querySelector('.faq__question').addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(el => el.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const profileTripTabs = document.querySelectorAll('.profile-trips__tab');

profileTripTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        profileTripTabs.forEach((item) => item.classList.remove('is-active'));
        tab.classList.add('is-active');
    });
});

const advancedLinks = document.querySelectorAll('.search-form__advanced, .open-moscow__filter');
const advancedFilter = document.querySelector('.advanced-filter');
const advancedModal = document.querySelector('.advanced-filter__modal');
const advancedClose = document.querySelector('.advanced-filter__close');

if (
    advancedLinks.length &&
    advancedFilter &&
    advancedModal &&
    advancedClose
) {
    function openAdvancedFilter() {
        advancedFilter.classList.add('is-open');
        advancedFilter.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-lock');
    }

    function closeAdvancedFilter() {
        advancedFilter.classList.remove('is-open');
        advancedFilter.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-lock');
    }

    advancedLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            openAdvancedFilter();
        });
    });

    advancedClose.addEventListener('click', closeAdvancedFilter);

    advancedFilter.addEventListener('click', (event) => {
        if (!advancedModal.contains(event.target)) {
            closeAdvancedFilter();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            advancedFilter.classList.contains('is-open')
        ) {
            closeAdvancedFilter();
        }
    });
}




const bookingMapOpen = document.querySelector('.booking-results__map-link');
const bookingMapModal = document.querySelector('.booking-map-modal');
const bookingMapModalContent = document.querySelector('.booking-map-modal__content');
const bookingMapClose = document.querySelector('.booking-map-modal__close');

if (
    bookingMapOpen &&
    bookingMapModal &&
    bookingMapModalContent &&
    bookingMapClose
) {
    function openBookingMap() {
        bookingMapModal.classList.add('is-open');
        bookingMapModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-lock');
    }

    function closeBookingMap() {
        bookingMapModal.classList.remove('is-open');
        bookingMapModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-lock');
    }

    bookingMapOpen.addEventListener('click', openBookingMap);
    bookingMapClose.addEventListener('click', closeBookingMap);

    bookingMapModal.addEventListener('click', (event) => {
        if (!bookingMapModalContent.contains(event.target)) {
            closeBookingMap();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            bookingMapModal.classList.contains('is-open')
        ) {
            closeBookingMap();
        }
    });
}


// booking popup
const bookingPopup = document.querySelector('.booking-popup');
const bookingPopupModal = document.querySelector('.booking-popup__modal');
const bookingPopupClose = document.querySelector('.booking-popup__close');

const bookingPopupStorageKey = 'bookingPopupClosed';

if (
    bookingPopup &&
    bookingPopupModal &&
    bookingPopupClose
) {
    function openBookingPopup() {
        bookingPopup.classList.add('is-open');
        bookingPopup.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-lock');
    }

    function closeBookingPopup() {
        bookingPopup.classList.remove('is-open');
        bookingPopup.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-lock');
    }

    function closeBookingPopupForever() {
        localStorage.setItem(bookingPopupStorageKey, 'true');
        closeBookingPopup();
    }

    window.addEventListener('load', () => {
        if (localStorage.getItem(bookingPopupStorageKey) !== 'true') {
            setTimeout(openBookingPopup, 4000);
        }
    });

    bookingPopupClose.addEventListener('click', closeBookingPopupForever);

    bookingPopup.addEventListener('click', (event) => {
        if (!bookingPopupModal.contains(event.target)) {
            closeBookingPopup();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && bookingPopup.classList.contains('is-open')) {
            closeBookingPopup();
        }
    });
}




if (typeof Swiper !== 'undefined') {
    const apartmentPreviewSliders = document.querySelectorAll('.apartment-preview__slider');

    apartmentPreviewSliders.forEach((slider) => {
        let progressbar = slider.querySelector('.apartment-preview__progressbar');

        if (!progressbar) {
            progressbar = document.createElement('div');
            progressbar.className = 'apartment-preview__progressbar swiper-pagination';
            slider.appendChild(progressbar);
        }

        new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            speed: 1500,
            navigation: {
                nextEl: '.apartment-preview__arrow--next',
                prevEl: '.apartment-preview__arrow--prev',
            },
            pagination: {
                el: progressbar,
                type: 'progressbar',
            },
            breakpoints: {
                0: {
                    spaceBetween: 5,
                },
                769: {
                    spaceBetween: 20,
                },
            },
        });
    });
}

if (typeof Swiper === 'undefined') {
    const apartmentPreviewSlider = document.querySelector('.apartment-preview__slider');

    if (apartmentPreviewSlider) {
        const wrapper = apartmentPreviewSlider.querySelector('.swiper-wrapper');
        const slides = Array.from(apartmentPreviewSlider.querySelectorAll('.swiper-slide'));
        const prevButton = document.querySelector('.apartment-preview__arrow--prev');
        const nextButton = document.querySelector('.apartment-preview__arrow--next');
        let activeIndex = 0;

        function updateApartmentPreviewSlider() {
            const slidesPerView = window.innerWidth < 768 ? 1 : 1.58;
            const maxIndex = Math.max(0, slides.length - Math.ceil(slidesPerView));

            activeIndex = Math.min(activeIndex, maxIndex);
            wrapper.style.transform = `translateX(-${activeIndex * (100 / slidesPerView)}%)`;
            slides.forEach((slide) => {
                slide.style.flex = `0 0 ${100 / slidesPerView}%`;
            });

            if (prevButton) {
                prevButton.disabled = activeIndex === 0;
            }

            if (nextButton) {
                nextButton.disabled = activeIndex === maxIndex;
            }
        }

        prevButton?.addEventListener('click', () => {
            activeIndex = Math.max(0, activeIndex - 1);
            updateApartmentPreviewSlider();
        });

        nextButton?.addEventListener('click', () => {
            activeIndex += 1;
            updateApartmentPreviewSlider();
        });

        window.addEventListener('resize', updateApartmentPreviewSlider);
        updateApartmentPreviewSlider();
    }
}

if (typeof Swiper !== 'undefined') {
    const moscowGallery = document.querySelector('.moscow-inner__gallery');

    if (moscowGallery) {
        const moscowGallerySection = moscowGallery.closest('.moscow-inner');

        new Swiper(moscowGallery, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            speed: 800,
            navigation: {
                prevEl: moscowGallerySection?.querySelector('.moscow-inner__arrow--prev'),
                nextEl: moscowGallerySection?.querySelector('.moscow-inner__arrow--next'),
            },
        });
    }
}

if (typeof Swiper === 'undefined') {
    const moscowGallery = document.querySelector('.moscow-inner__gallery');

    if (moscowGallery) {
        const wrapper = moscowGallery.querySelector('.moscow-inner__gallery-wrapper');
        const slides = Array.from(moscowGallery.querySelectorAll('.moscow-inner__slide'));
        const section = moscowGallery.closest('.moscow-inner');
        const prevButton = section?.querySelector('.moscow-inner__arrow--prev');
        const nextButton = section?.querySelector('.moscow-inner__arrow--next');
        let activeIndex = 0;

        function updateMoscowGallery() {
            const maxIndex = Math.max(0, slides.length - 2);

            activeIndex = Math.min(activeIndex, maxIndex);
            wrapper.style.transform = `translateX(-${activeIndex * 33.5}%)`;

            if (prevButton) {
                prevButton.disabled = activeIndex === 0;
            }

            if (nextButton) {
                nextButton.disabled = activeIndex === maxIndex;
            }
        }

        prevButton?.addEventListener('click', () => {
            activeIndex = Math.max(0, activeIndex - 1);
            updateMoscowGallery();
        });

        nextButton?.addEventListener('click', () => {
            activeIndex += 1;
            updateMoscowGallery();
        });

        updateMoscowGallery();
    }
}

if (typeof Swiper !== 'undefined') {
    const openNearbySlider = document.querySelector('.open-nearby__slider');

    if (openNearbySlider) {
        const openNearbySection = openNearbySlider.closest('.open-nearby');

        new Swiper(openNearbySlider, {
            slidesPerView: 3,
            spaceBetween: 80,
            speed: 800,
            navigation: {
                prevEl: openNearbySection?.querySelector('.open-nearby__prev'),
                nextEl: openNearbySection?.querySelector('.open-nearby__next'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 24,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 80,
                },
            },
        });
    }
}

if (typeof Swiper === 'undefined') {
    const openNearbySlider = document.querySelector('.open-nearby__slider');

    if (openNearbySlider) {
        const wrapper = openNearbySlider.querySelector('.open-nearby__wrapper');
        const slides = Array.from(openNearbySlider.querySelectorAll('.open-apartment-card'));
        const section = openNearbySlider.closest('.open-nearby');
        const prevButton = section?.querySelector('.open-nearby__prev');
        const nextButton = section?.querySelector('.open-nearby__next');
        let activeIndex = 0;

        function getSlidesPerView() {
            if (window.innerWidth < 768) {
                return 1;
            }

            if (window.innerWidth < 1100) {
                return 2;
            }

            return 3;
        }

        function updateOpenNearbySlider() {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, slides.length - slidesPerView);

            activeIndex = Math.min(activeIndex, maxIndex);
            wrapper.style.transform = `translateX(-${activeIndex * (100 / slidesPerView)}%)`;
            slides.forEach((slide) => {
                slide.style.flex = `0 0 ${100 / slidesPerView}%`;
            });
            if (prevButton) {
                prevButton.disabled = activeIndex === 0;
            }

            if (nextButton) {
                nextButton.disabled = activeIndex === maxIndex;
            }
        }

        prevButton?.addEventListener('click', () => {
            activeIndex = Math.max(0, activeIndex - 1);
            updateOpenNearbySlider();
        });

        nextButton?.addEventListener('click', () => {
            activeIndex += 1;
            updateOpenNearbySlider();
        });

        window.addEventListener('resize', updateOpenNearbySlider);
        updateOpenNearbySlider();
    }
}

const galleryLightbox = document.querySelector('.gallery-lightbox');
const galleryImages = Array.from(document.querySelectorAll('.apartment-preview__image, .apartment-media__image'));

if (galleryLightbox && galleryImages.length) {
    const lightboxClose = galleryLightbox.querySelector('.gallery-lightbox__close');
    const lightboxPrev = galleryLightbox.querySelector('.gallery-lightbox__arrow--prev');
    const lightboxNext = galleryLightbox.querySelector('.gallery-lightbox__arrow--next');
    const lightboxSlider = galleryLightbox.querySelector('.gallery-lightbox__slider');
    const lightboxWrapper = galleryLightbox.querySelector('.gallery-lightbox__wrapper');
    const lightboxThumbs = galleryLightbox.querySelector('.gallery-lightbox__thumbs');
    const lightboxThumbsWrapper = galleryLightbox.querySelector('.gallery-lightbox__thumbs-wrapper');
    const galleryItems = [];
    let galleryMainSwiper = null;
    let galleryThumbsSwiper = null;
    let activeGalleryIndex = 0;

    galleryImages.forEach((image) => {
        const src = image.getAttribute('src');

        if (!src || galleryItems.some((item) => item.src === src)) {
            return;
        }

        galleryItems.push({
            src,
            alt: image.getAttribute('alt') || 'Фото квартиры',
        });
    });

    galleryItems.forEach((item, index) => {
        const slide = document.createElement('div');
        const slideImage = document.createElement('img');
        const thumb = document.createElement('div');
        const thumbImage = document.createElement('img');

        slide.className = 'gallery-lightbox__slide swiper-slide';
        slideImage.src = item.src;
        slideImage.alt = item.alt;
        slide.appendChild(slideImage);
        lightboxWrapper.appendChild(slide);

        thumb.className = 'gallery-lightbox__thumb swiper-slide';
        thumbImage.src = item.src;
        thumbImage.alt = '';
        thumb.appendChild(thumbImage);
        thumb.addEventListener('click', () => setGalleryImage(index));
        lightboxThumbsWrapper.appendChild(thumb);
    });

    if (typeof Swiper !== 'undefined') {
        galleryThumbsSwiper = new Swiper(lightboxThumbs, {
            slidesPerView: 'auto',
            spaceBetween: 12,
            watchSlidesProgress: true,
        });

        galleryMainSwiper = new Swiper(lightboxSlider, {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            navigation: {
                prevEl: lightboxPrev,
                nextEl: lightboxNext,
            },
            thumbs: {
                swiper: galleryThumbsSwiper,
            },
        });
    }

    function setGalleryImage(index, speed = 600) {
        activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;

        if (galleryMainSwiper && galleryThumbsSwiper) {
            galleryMainSwiper.slideTo(activeGalleryIndex, speed);
            galleryThumbsSwiper.slideTo(activeGalleryIndex, speed);
            return;
        }

        lightboxWrapper.style.transform = `translateX(-${activeGalleryIndex * 100}%)`;

        lightboxThumbsWrapper.querySelectorAll('.gallery-lightbox__thumb').forEach((thumb, thumbIndex) => {
            thumb.classList.toggle('is-active', thumbIndex === activeGalleryIndex);
        });
    }

    function openGallery(index) {
        galleryLightbox.classList.add('is-open');
        galleryLightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-lock');

        if (galleryMainSwiper && galleryThumbsSwiper) {
            galleryMainSwiper.update();
            galleryThumbsSwiper.update();
        }

        setGalleryImage(index, 0);
    }

    function closeGallery() {
        galleryLightbox.classList.remove('is-open');
        galleryLightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-lock');
    }

    galleryImages.forEach((image) => {
        image.addEventListener('click', () => {
            const imageIndex = galleryItems.findIndex((item) => item.src === image.getAttribute('src'));

            if (imageIndex !== -1) {
                openGallery(imageIndex);
            }
        });
    });

    lightboxPrev.addEventListener('click', () => {
        if (!galleryMainSwiper) {
            setGalleryImage(activeGalleryIndex - 1);
        }
    });

    lightboxNext.addEventListener('click', () => {
        if (!galleryMainSwiper) {
            setGalleryImage(activeGalleryIndex + 1);
        }
    });

    lightboxClose.addEventListener('click', closeGallery);

    galleryLightbox.addEventListener('click', (event) => {
        if (event.target === galleryLightbox) {
            closeGallery();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!galleryLightbox.classList.contains('is-open')) {
            return;
        }

        if (event.key === 'Escape') {
            closeGallery();
        }

        if (event.key === 'ArrowLeft') {
            if (galleryMainSwiper) {
                galleryMainSwiper.slidePrev();
            } else {
                setGalleryImage(activeGalleryIndex - 1);
            }
        }

        if (event.key === 'ArrowRight') {
            if (galleryMainSwiper) {
                galleryMainSwiper.slideNext();
            } else {
                setGalleryImage(activeGalleryIndex + 1);
            }
        }
    });
}

const videoPlayers = document.querySelectorAll('.play-pause, .video-link');

function pauseApartmentVideo(player) {
    const video = player.querySelector('video');

    if (!video) {
        return;
    }

    video.pause();
    player.classList.remove('is-playing');
}

videoPlayers.forEach((player) => {
    const video = player.querySelector('video');

    if (!video) {
        return;
    }

    player.dataset.videoReady = 'true';

    video.addEventListener('ended', () => pauseApartmentVideo(player));
    video.addEventListener('pause', () => {
        player.classList.remove('is-playing');
    });
});

document.addEventListener('click', (event) => {
    const player = event.target.closest('.play-pause, .video-link');

    if (!player) {
        return;
    }

    event.preventDefault();

    const video = player.querySelector('video');

    if (!video) {
        return;
    }

    if (video.paused) {
        videoPlayers.forEach((otherPlayer) => {
            if (otherPlayer !== player) {
                pauseApartmentVideo(otherPlayer);
            }
        });

        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    player.classList.add('is-playing');
                })
                .catch(() => {
                    player.classList.remove('is-playing');
                });
        } else {
            player.classList.add('is-playing');
        }
    } else {
        pauseApartmentVideo(player);
    }
});

const searchDateForms = Array.from(document.querySelectorAll('.search-form')).filter((form) => {
    const fields = Array.from(form.querySelectorAll('.search-form__field')).slice(0, 2);

    return fields.length === 2;
});

let activeSearchDateForm = null;
let bookingCalendarSubtitle = null;
let bookingCalendarModal = null;

const bookingCalendarMonths = [
    { value: '2026-04', title: 'Апрель, 2026', days: 30, offset: 2 },
    { value: '2026-05', title: 'Май, 2026', days: 30, offset: 4, disabled: [13, 14, 15, 16, 17, 18, 19, 20, 21] },
    { value: '2026-06', title: 'Июнь, 2026', days: 30, offset: 0 },
    { value: '2026-07', title: 'Июль, 2026', days: 31, offset: 2 },
    { value: '2026-08', title: 'Август, 2026', days: 31, offset: 5 },
    { value: '2026-09', title: 'Сентябрь, 2026', days: 30, offset: 1 },
];

const bookingMonthNames = {
    '01': 'Января',
    '02': 'Февраля',
    '03': 'Марта',
    '04': 'Апреля',
    '05': 'Мая',
    '06': 'Июня',
    '07': 'Июля',
    '08': 'Августа',
    '09': 'Сентября',
    '10': 'Октября',
    '11': 'Ноября',
    '12': 'Декабря',
};

function formatBookingDate(value) {
    const [year, month, day] = value.split('-');

    return `${Number(day)} ${bookingMonthNames[month]}, ${year}`;
}

function createBookingCalendarModal() {
    if (!searchDateForms.length) {
        return null;
    }

    const modal = document.createElement('div');
    modal.className = 'booking-calendar-modal';
    modal.setAttribute('aria-hidden', 'true');

    const monthsMarkup = bookingCalendarMonths.map((month) => {
        const disabledDays = month.disabled || [];
        const emptyDays = Array.from({ length: month.offset }, () => '<span></span>').join('');
        const days = Array.from({ length: month.days }, (_, index) => {
            const day = index + 1;
            const disabled = disabledDays.includes(day);

            return `<button${disabled ? ' class="is-disabled" disabled' : ''} type="button">${day}</button>`;
        }).join('');

        return `
            <div class="calendar__month swiper-slide" data-month="${month.value}">
                <h3 class="calendar__month-title">${month.title}</h3>
                <div class="calendar__weekdays">
                    <span>Пн</span>
                    <span>Вт</span>
                    <span>Ср</span>
                    <span>Чт</span>
                    <span>Пт</span>
                    <span>Сб</span>
                    <span>Вс</span>
                </div>
                <div class="calendar__days">${emptyDays}${days}</div>
            </div>
        `;
    }).join('');

    modal.innerHTML = `
        <div class="booking-calendar-modal__overlay"></div>
        <div class="booking-calendar-modal__dialog" role="dialog" aria-modal="true" aria-label="Даты бронирования">
            <button class="booking-calendar-modal__close" type="button" aria-label="Закрыть"></button>
            <section class="calendar calendar--booking">
                <div class="calendar__panel">
                    <div class="calendar__header">
                        <div>
                            <h2 class="calendar__title">Даты бронирования</h2>
                            <p class="calendar__subtitle">Укажите дату заезда</p>
                        </div>
                        <div class="calendar__nav">
                            <button class="calendar__arrow" type="button" aria-label="Предыдущий месяц"><span></span></button>
                            <button class="calendar__arrow calendar__arrow--next" type="button" aria-label="Следующий месяц"><span></span></button>
                        </div>
                    </div>
                    <div class="calendar__months swiper">
                        <div class="calendar__months-wrapper swiper-wrapper">${monthsMarkup}</div>
                    </div>
                    <button class="calendar__clear" type="button">Очистить выбор</button>
                </div>
            </section>
        </div>
    `;

    document.body.appendChild(modal);

    return modal;
}

function ensureSearchDateInputs(form) {
    let checkinInput = form.querySelector('input[name="checkin"]');
    let checkoutInput = form.querySelector('input[name="checkout"]');

    if (!checkinInput) {
        checkinInput = document.createElement('input');
        checkinInput.type = 'hidden';
        checkinInput.name = 'checkin';
        form.appendChild(checkinInput);
    }

    if (!checkoutInput) {
        checkoutInput = document.createElement('input');
        checkoutInput.type = 'hidden';
        checkoutInput.name = 'checkout';
        form.appendChild(checkoutInput);
    }

    return { checkinInput, checkoutInput };
}

function updateSearchDateForm(startValue, endValue) {
    if (!activeSearchDateForm) {
        return;
    }

    const dateFields = activeSearchDateForm.querySelectorAll('.search-form__field');
    const checkinLabel = dateFields[0]?.querySelector('.search-form__label');
    const checkoutLabel = dateFields[1]?.querySelector('.search-form__label');
    const { checkinInput, checkoutInput } = ensureSearchDateInputs(activeSearchDateForm);

    if (startValue && checkinLabel) {
        checkinLabel.textContent = formatBookingDate(startValue);
        checkinInput.value = startValue;
    }

    if (endValue && checkoutLabel) {
        checkoutLabel.textContent = formatBookingDate(endValue);
        checkoutInput.value = endValue;
    }
}

function clearSearchDateForm() {
    if (!activeSearchDateForm) {
        return;
    }

    const dateFields = activeSearchDateForm.querySelectorAll('.search-form__field');
    const checkinLabel = dateFields[0]?.querySelector('.search-form__label');
    const checkoutLabel = dateFields[1]?.querySelector('.search-form__label');
    const { checkinInput, checkoutInput } = ensureSearchDateInputs(activeSearchDateForm);

    if (checkinLabel) {
        checkinLabel.textContent = 'Дата Заезда';
    }

    if (checkoutLabel) {
        checkoutLabel.textContent = 'Дата Выезда';
    }

    checkinInput.value = '';
    checkoutInput.value = '';
}

function openBookingCalendar(form) {
    activeSearchDateForm = form;
    bookingCalendarModal?.classList.add('is-open');
    bookingCalendarModal?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-lock');
}

function closeBookingCalendar() {
    bookingCalendarModal?.classList.remove('is-open');
    bookingCalendarModal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-lock');
}

if (searchDateForms.length) {
    bookingCalendarModal = createBookingCalendarModal();
    bookingCalendarSubtitle = bookingCalendarModal?.querySelector('.calendar__subtitle');

    searchDateForms.forEach((form) => {
        const dateFields = Array.from(form.querySelectorAll('.search-form__field')).slice(0, 2);
        ensureSearchDateInputs(form);

        dateFields.forEach((field) => {
            field.classList.add('search-form__field--date');
            field.addEventListener('click', () => openBookingCalendar(form));
        });
    });

    bookingCalendarModal?.querySelector('.booking-calendar-modal__overlay')?.addEventListener('click', closeBookingCalendar);
    bookingCalendarModal?.querySelector('.booking-calendar-modal__close')?.addEventListener('click', closeBookingCalendar);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && bookingCalendarModal?.classList.contains('is-open')) {
            closeBookingCalendar();
        }
    });
}

function initCalendar(availabilityCalendar, callbacks = {}) {
    function initCalendarFallbackSlider() {
        const track = availabilityCalendar.querySelector('.calendar__months-wrapper');
        const prevButton = availabilityCalendar.querySelector('.calendar__arrow');
        const nextButton = availabilityCalendar.querySelector('.calendar__arrow--next');
        const slides = Array.from(availabilityCalendar.querySelectorAll('.calendar__month'));
        let activeIndex = 0;

        function getSlidesPerView() {
            if (window.innerWidth <= 768) {
                return 1;
            }

            if (window.innerWidth <= 1100) {
                return 2;
            }

            return 3;
        }

        function updateSlider() {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(slides.length - slidesPerView, 0);
            activeIndex = Math.min(activeIndex, maxIndex);
            const slide = slides[activeIndex];

            if (slide) {
                track.style.transform = `translateX(-${slide.offsetLeft}px)`;
            }

            if (prevButton) {
                prevButton.disabled = activeIndex === 0;
            }

            if (nextButton) {
                nextButton.disabled = activeIndex === maxIndex;
            }
        }

        prevButton?.addEventListener('click', () => {
            activeIndex = Math.max(activeIndex - 1, 0);
            updateSlider();
        });

        nextButton?.addEventListener('click', () => {
            activeIndex += 1;
            updateSlider();
        });

        window.addEventListener('resize', updateSlider);
        updateSlider();
    }

    if (typeof Swiper !== 'undefined') {
        const calendarMonths = availabilityCalendar.querySelector('.calendar__months');

        if (calendarMonths) {
            new Swiper(calendarMonths, {
            slidesPerView: 1,
            spaceBetween: 28,
            speed: 700,
            navigation: {
                prevEl: availabilityCalendar.querySelector('.calendar__arrow'),
                nextEl: availabilityCalendar.querySelector('.calendar__arrow--next'),
            },
            breakpoints: {
                769: {
                    slidesPerView: 2,
                    spaceBetween: 28,
                },
                1101: {
                    slidesPerView: 3,
                    spaceBetween: 52,
                },
            },
            });
        }
    } else {
        initCalendarFallbackSlider();
    }

    const calendarDays = Array.from(availabilityCalendar.querySelectorAll('.calendar__days button:not(.is-disabled)'));
    const calendarClear = availabilityCalendar.querySelector('.calendar__clear');

    function clearCalendarSelection() {
        calendarDays.forEach((day) => {
            day.classList.remove(
                'is-selected',
                'is-range',
                'is-range-start',
                'is-range-end',
                'is-range-row-start',
                'is-range-row-end'
            );
        });
        callbacks.onClear?.();
    }

    function getCalendarDayValue(day) {
        const month = day.closest('.calendar__month').dataset.month;
        const date = day.textContent.trim().padStart(2, '0');

        return `${month}-${date}`;
    }

    function paintCalendarRange(startDay, endDay) {
        const startValue = getCalendarDayValue(startDay);
        const endValue = getCalendarDayValue(endDay);
        const rangeStart = startValue <= endValue ? startValue : endValue;
        const rangeEnd = startValue <= endValue ? endValue : startValue;

        calendarDays.forEach((day) => {
            const dayValue = getCalendarDayValue(day);

            if (dayValue < rangeStart || dayValue > rangeEnd) {
                return;
            }

            day.classList.add('is-range');

            const cellIndex = Array.from(day.parentElement.children).indexOf(day);
            const columnIndex = cellIndex % 7;

            if (columnIndex === 0) {
                day.classList.add('is-range-row-start');
            }

            if (columnIndex === 6) {
                day.classList.add('is-range-row-end');
            }

            if (dayValue === rangeStart) {
                day.classList.add('is-selected', 'is-range-start');
            }

            if (dayValue === rangeEnd) {
                day.classList.add('is-selected', 'is-range-end');
            }
        });
    }

    calendarDays.forEach((day) => {
        day.addEventListener('click', () => {
            const selectedDays = calendarDays.filter((item) => item.classList.contains('is-selected'));
            const dayValue = getCalendarDayValue(day);

            if (selectedDays.length !== 1) {
                clearCalendarSelection();
                day.classList.add('is-selected');
                callbacks.onSelect?.(dayValue, null);
                return;
            }

            if (selectedDays[0] === day) {
                clearCalendarSelection();
                return;
            }

            clearCalendarSelection();
            paintCalendarRange(selectedDays[0], day);

            const startValue = getCalendarDayValue(selectedDays[0]);
            const rangeStart = startValue <= dayValue ? startValue : dayValue;
            const rangeEnd = startValue <= dayValue ? dayValue : startValue;
            callbacks.onSelect?.(rangeStart, rangeEnd);
        });
    });

    if (calendarClear) {
        calendarClear.addEventListener('click', clearCalendarSelection);
    }
}

document.querySelectorAll('.calendar').forEach((calendar) => {
    const isBookingCalendar = calendar.classList.contains('calendar--booking');

    initCalendar(calendar, isBookingCalendar ? {
        onSelect(startValue, endValue) {
            updateSearchDateForm(startValue, endValue);

            if (bookingCalendarSubtitle) {
                bookingCalendarSubtitle.textContent = endValue ? 'Даты выбраны' : 'Укажите дату выезда';
            }
        },
        onClear() {
            clearSearchDateForm();

            if (bookingCalendarSubtitle) {
                bookingCalendarSubtitle.textContent = 'Укажите дату заезда';
            }
        },
    } : {});
});
