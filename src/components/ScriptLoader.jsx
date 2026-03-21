import { useEffect } from 'react';
import useExternalScripts from '../hooks/useExternalScripts';

const ScriptLoader = () => {
  // CDN Scripts that should always load
  const cdnScripts = [
    'https://code.jquery.com/jquery-3.6.0.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.min.js',
    'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/js/all.min.js'
  ];

  // Local scripts that we'll load as inline code to avoid MIME issues
  const localScriptContents = {
    validation: `(()=>{"use strict";var a=document.querySelectorAll(".needs-validation");Array.from(a).forEach(e=>{e.addEventListener("submit",a=>{e.checkValidity()||(a.preventDefault(),a.stopPropagation()),e.classList.add("was-validated")},!1)})})();`,
    countdown: `// Countdown timer placeholder - add your countdown logic here`,
    zoom: `// Zoom functionality placeholder - add your zoom logic here`,
    theme: `"use strict";!function(){document.querySelectorAll(".dropdown-menu a.dropdown-toggle").forEach((function(e){e.addEventListener("click",(function(e){if(!this.nextElementSibling.classList.contains("show")){this.closest(".dropdown-menu").querySelectorAll(".show").forEach((function(e){e.classList.remove("show")}))}this.nextElementSibling.classList.toggle("show");const t=this.closest("li.nav-item.dropdown.show");t&&t.addEventListener("hidden.bs.dropdown",(function(e){document.querySelectorAll(".dropdown-submenu .show").forEach((function(e){e.classList.remove("show")}))})),e.stopPropagation()}))}));var e=document.querySelectorAll('[data-bs-toggle="tooltip"]');e.length&&e.forEach((function(e){new bootstrap.Tooltip(e)})),document.querySelectorAll(".input-group").forEach((function(e){e.addEventListener("click",(function(e){e.target.classList.contains("button-plus")?function(e){e.preventDefault();var t=e.target,n=t.getAttribute("data-field"),o=t.closest("div").querySelector('input[name="'+n+'"]'),a=parseInt(o.value,10)||0;o.value=a+1}(e):e.target.classList.contains("button-minus")&&function(e){e.preventDefault();var t=e.target,n=t.getAttribute("data-field"),o=t.closest("div").querySelector('input[name="'+n+'"]'),a=parseInt(o.value,10)||0;a>0&&(o.value=a-1)}(e)}))}));var t=document.querySelectorAll('[data-bs-toggle="popover"]');t.length&&t.forEach((function(e){new bootstrap.Popover(e)})),document.querySelectorAll(".rater").forEach((function(e,t){raterJs({starSize:20,element:e,rateCallback:function(e,t){this.setRating(e),t()}})}));var n=document.querySelectorAll(".sidebar-nav-fixed a");n.length&&n.forEach((function(e){e.addEventListener("click",(function(e){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=document.querySelector(this.hash);if(t=t||document.querySelector("[name="+this.hash.slice(1)+"]")){e.preventDefault(),window.scrollTo({top:t.offsetTop-90,behavior:"smooth"});var o=document.querySelector(this.hash)}}}))}))}();`
  };

  const { loaded, error } = useExternalScripts(cdnScripts);

  useEffect(() => {
    if (loaded && typeof window !== 'undefined' && window.jQuery) {
      const $ = window.jQuery;

      // Load local scripts as inline scripts
      Object.entries(localScriptContents).forEach(([name, content]) => {
        // Remove existing script with same ID if it exists
        const existingScript = document.getElementById(`local-script-${name}`);
        if (existingScript) {
          existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.textContent = content;
        script.id = `local-script-${name}`;
        document.head.appendChild(script);
      });

      // Initialize all carousels and functionality
      $(document).ready(function () {
        console.log('Initializing carousels and functionality...');

        // Slick slider - check if element exists
        if ($('.category-slider').length && typeof $.fn.slick === 'function') {
          try {
            $('.category-slider').slick({
              slidesToShow: 6,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000,
              arrows: false,
              dots: false,
              responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 4 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
                { breakpoint: 480, settings: { slidesToShow: 1 } }
              ]
            });
            console.log('Slick slider initialized');
          } catch (error) {
            console.error('Slick slider initialization failed:', error);
          }
        }

        // Bootstrap tooltips - check if Bootstrap is loaded
        if (typeof bootstrap !== 'undefined') {
          try {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            if (tooltipTriggerList.length) {
              const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
              console.log('Bootstrap tooltips initialized');
            }
          } catch (error) {
            console.error('Bootstrap tooltips initialization failed:', error);
          }
        }

        // Owl Carousels - check if Owl Carousel is loaded and elements exist
        if (typeof $.fn.owlCarousel === 'function') {
          const owlCarousels = ['owlCarousel1', 'owlCarousel2', 'owlCarousel3', 'owlCarousel4'];
          const carouselConfigs = {
            owlCarousel1: { items: { 0: 1, 600: 2, 1000: 4 }, nav: true },
            owlCarousel2: { items: { 0: 2, 600: 2, 1000: 6 }, nav: false },
            owlCarousel3: { items: { 0: 2, 600: 3, 1000: 6 }, nav: false },
            owlCarousel4: { items: { 0: 3, 600: 3, 1000: 4 }, nav: false }
          };

          owlCarousels.forEach(carouselId => {
            if ($(`#${carouselId}`).length) {
              try {
                $(`#${carouselId}`).owlCarousel({
                  loop: true,
                  margin: 10,
                  nav: carouselConfigs[carouselId].nav,
                  autoplay: true,
                  autoplayTimeout: 3000,
                  autoplayHoverPause: true,
                  smartSpeed: 1000,
                  responsive: carouselConfigs[carouselId].items
                });
                console.log(`Owl Carousel ${carouselId} initialized`);
              } catch (error) {
                console.error(`Owl Carousel ${carouselId} initialization failed:`, error);
              }
            } else {
              console.log(`Owl Carousel ${carouselId} element not found`);
            }
          });
        } else {
          console.log('Owl Carousel plugin not loaded');
        }

        // Image click handler for product gallery
        if ($('.latest-product__slider img').length) {
          $('.latest-product__slider img').click(function () {
            const newSrc = $(this).attr('data-imgbigurl');
            if (newSrc && $('.product__details__pic__item--large').length) {
              $('.product__details__pic__item--large').attr('src', newSrc);
            }
          });
        }

        // Mousewheel event for owl carousels
        if ($('.owl-carousel').length && typeof $.fn.owlCarousel === 'function') {
          $('.owl-carousel').on('mousewheel', '.owl-stage', function (e) {
            if (e.deltaY > 0) {
              $(this).closest('.owl-carousel').trigger('next.owl.carousel');
            } else {
              $(this).closest('.owl-carousel').trigger('prev.owl.carousel');
            }
            e.preventDefault();
          });
        }

        console.log('All carousels initialization completed');
      });
    }
  }, [loaded]);

  if (error) {
    console.error('Script loading error:', error);
  }

  return null; // This component doesn't render anything
};

export default ScriptLoader;
