(function () {
  "use strict";

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      document.body.classList.toggle("nav-open", open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Gallery
  var grid = document.getElementById("gallery-grid");
  var items = (window.GALLERY || []).filter(function (i) { return i && i.src; });
  var usingPlaceholders = items.length === 0;
  if (usingPlaceholders) {
    for (var p = 1; p <= 9; p++) items.push({ placeholder: true, caption: "Your project photo here" });
  }

  items.forEach(function (item, i) {
    var btn = document.createElement("button");
    btn.className = "tile" + (item.placeholder ? " tile-placeholder tile-v" + ((i % 3) + 1) : "");
    btn.type = "button";
    btn.setAttribute("aria-label", "View " + (item.caption || "photo " + (i + 1)));
    if (item.placeholder) {
      btn.innerHTML = '<span class="tile-label"><span class="tile-icon" aria-hidden="true"></span>Your project photo here<small>Placeholder ' + (i + 1) + ' of 9</small></span>';
    } else {
      var img = document.createElement("img");
      img.src = "images/gallery/" + item.src;
      img.alt = item.caption || "JMP Glass Designs project";
      img.loading = "lazy";
      btn.appendChild(img);
      if (item.caption) {
        var cap = document.createElement("span");
        cap.className = "tile-caption";
        cap.textContent = item.caption;
        btn.appendChild(cap);
      }
    }
    btn.addEventListener("click", function () { openLightbox(i); });
    grid.appendChild(btn);
  });

  // Lightbox
  var lb = document.getElementById("lightbox");
  var media = document.getElementById("lb-media");
  var caption = document.getElementById("lb-caption");
  var current = 0, lastFocus = null;

  function render() {
    var item = items[current];
    media.innerHTML = "";
    if (item.placeholder) {
      var ph = document.createElement("div");
      ph.className = "lb-placeholder tile-v" + ((current % 3) + 1);
      ph.textContent = "Your project photo here";
      media.appendChild(ph);
    } else {
      var img = document.createElement("img");
      img.src = "images/gallery/" + item.src;
      img.alt = item.caption || "";
      media.appendChild(img);
    }
    caption.textContent = (item.caption || "") + "  ·  " + (current + 1) + " / " + items.length;
  }
  function openLightbox(i) {
    current = i; lastFocus = document.activeElement;
    render(); lb.hidden = false; document.body.classList.add("lb-open");
    lb.querySelector(".lb-close").focus();
  }
  function closeLightbox() {
    lb.hidden = true; document.body.classList.remove("lb-open");
    if (lastFocus) lastFocus.focus();
  }
  function step(d) { current = (current + d + items.length) % items.length; render(); }

  lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
  lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    tx = null;
  });

  // Quote form (mailto mode). TODO: switch to Formspree if preferred — see index.html comment.
  var form = document.getElementById("quote-form");
  if (form && form.dataset.mailto === "true") {
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) return;
      e.preventDefault();
      var f = form.elements;
      var body =
        "Name: " + f.name.value + "\n" +
        "Email: " + f.email.value + "\n" +
        "Phone: " + f.phone.value + "\n" +
        "Project address: " + f.project_address.value + "\n" +
        "Project type: " + f.project_type.value + "\n\n" +
        f.message.value;
      var subject = "Quote request: " + f.project_type.value + " (" + f.name.value + ")";
      window.location.href = "mailto:" + form.dataset.email +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      document.getElementById("form-note").textContent =
        "Your email app should open now. If it doesn't, email jmpdesignsco@gmail.com directly.";
    });
  }
})();
