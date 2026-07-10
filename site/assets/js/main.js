/* Sachi Savant — portfolio interactions */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* page fade-in */
  window.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("is-loaded");
  });

  /* nav scroll state */
  var nav = document.querySelector(".nav");
  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* stagger siblings marked with data-stagger */
  document.querySelectorAll("[data-stagger]").forEach(function (parent) {
    var kids = parent.querySelectorAll(".reveal");
    kids.forEach(function (k, i) {
      k.style.setProperty("--d", Math.min(i * 0.08, 0.5) + "s");
    });
  });

  /* gentle parallax on elements with [data-parallax] */
  if (!reduced) {
    var pEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    var ticking = false;
    function parallax() {
      pEls.forEach(function (el) {
        var rate = parseFloat(el.getAttribute("data-parallax")) || 0.12;
        var r = el.getBoundingClientRect();
        var mid = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = "translateY(" + (-mid * rate).toFixed(1) + "px) scale(" + (1 + rate * 0.55) + ")";
      });
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(parallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    parallax();
  }

  /* lightbox */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lightbox__caption");
    document.querySelectorAll(".gallery figure").forEach(function (fig) {
      fig.addEventListener("click", function () {
        var img = fig.querySelector("img");
        if (!img) return;
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || "";
        var cap = fig.querySelector("figcaption");
        lbCap.textContent = cap ? cap.textContent : "";
        lb.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });
    function closeLb() {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    lb.addEventListener("click", closeLb);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
    });
  }

  /* before / after sliders */
  document.querySelectorAll(".ba").forEach(function (ba) {
    function setCut(clientX) {
      var r = ba.getBoundingClientRect();
      var pct = Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100));
      ba.style.setProperty("--cut", pct + "%");
    }
    var dragging = false;
    ba.addEventListener("pointerdown", function (e) {
      dragging = true;
      ba.setPointerCapture(e.pointerId);
      setCut(e.clientX);
    });
    ba.addEventListener("pointermove", function (e) {
      if (dragging) setCut(e.clientX);
    });
    ba.addEventListener("pointerup", function () { dragging = false; });
    ba.addEventListener("pointercancel", function () { dragging = false; });
  });

  /* current year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
