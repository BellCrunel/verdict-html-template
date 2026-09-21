(function () {
  "use strict";

  // Sticky header
  var header = document.getElementById("header");
  var backToTop = document.getElementById("backToTop");

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Back to top
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Close mobile menu
  var navLinks = document.querySelectorAll("#mainNav .nav-link:not(.dropdown-toggle), #mainNav .dropdown-item");
  var navCollapse = document.getElementById("mainNav");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse.classList.contains("show")) {
        bootstrap.Collapse.getInstance(navCollapse).hide();
      }
    });
  });

  // AOS
  AOS.init({
    duration: 700,
    once: true,
    offset: 80
  });

  if (document.querySelector(".testimonials-slider")) {
    new Swiper(".testimonials-slider", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".testimonials-slider .swiper-pagination",
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  var counters = document.querySelectorAll("[data-counter]");
  var counterStarted = false;

  function startCounters() {
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-counter"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1800;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var value = Math.floor(progress * target);
        el.textContent = value.toLocaleString("en-US") + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    });
  }

  if (counters.length) {
    var statsSection = counters[0].closest("section") || counters[0];
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !counterStarted) {
        counterStarted = true;
        startCounters();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // Contact form test
  var forms = document.querySelectorAll(".contact-form");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-message");
      if (msg) {
        msg.style.display = "block";
        msg.textContent = "Thank you. Your message has been sent, we will get back to you shortly.";
      }
      form.reset();
      // setTimeout(function () { msg.style.display = "none"; }, 5000);
    });
  });

  // Dropdown on hover desktop
  var dropdowns = document.querySelectorAll(".navbar .dropdown");
  dropdowns.forEach(function (dd) {
    dd.addEventListener("mouseenter", function () {
      if (window.innerWidth > 991) {
        dd.querySelector(".dropdown-menu").classList.add("show");
      }
    });
    dd.addEventListener("mouseleave", function () {
      if (window.innerWidth > 991) {
        dd.querySelector(".dropdown-menu").classList.remove("show");
      }
    });
    dd.querySelector(".dropdown-toggle").addEventListener("click", function () {
      if (window.innerWidth > 991) {
        window.location.href = this.getAttribute("href");
      }
    });
  });

})();
