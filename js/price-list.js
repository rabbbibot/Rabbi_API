function getPriceImages(item) {
  if (item.variants && item.variants.length) {
    return item.variants.map(function (variant) {
      return variant.image;
    });
  }
  if (item.images && item.images.length) return item.images;
  if (item.image) return [item.image];
  return [];
}

function getPriceVariants(item) {
  if (item.variants && item.variants.length) return item.variants;
  return getPriceImages(item).map(function (src) {
    return { image: src, label: "", desc: item.desc || "" };
  });
}

function createPriceMedia(item) {
  if (item.youtubeId && typeof createYoutubeVideo === "function") {
    return '<div class="price-card-media">' + createYoutubeVideo(item.youtubeId) + "</div>";
  }

  var images = getPriceImages(item);
  var variants = getPriceVariants(item);
  if (!images.length) return "";

  if (images.length === 1) {
    return (
      '<div class="price-card-media">' +
        '<div class="video-wrap">' +
          '<img src="' + images[0] + '" alt="' + (item.title || "") + '" loading="lazy" decoding="async">' +
        "</div>" +
      "</div>"
    );
  }

  return (
    '<div class="price-card-media">' +
      '<div class="price-card-slider" tabindex="0"' +
      (item.variants && item.variants.length > 1 ? ' data-has-variants="true"' : "") +
      ">" +
        '<button type="button" class="price-card-slider-btn price-card-slider-prev" aria-label="이전 이미지">' +
          '<span aria-hidden="true">‹</span>' +
        "</button>" +
        '<div class="price-card-slider-viewport">' +
          '<div class="price-card-slider-track">' +
            variants
              .map(function (variant, index) {
                return (
                  '<figure class="price-card-slider-slide"' +
                    ' data-variant-label="' + (variant.label || "") + '"' +
                    ' data-variant-desc="' + (variant.desc || item.desc || "") + '">' +
                    '<img src="' +
                    variant.image +
                    '" alt="' +
                    (item.title || "") +
                    " " +
                    (variant.label || index + 1) +
                    '" loading="lazy" decoding="async">' +
                  "</figure>"
                );
              })
              .join("") +
          "</div>" +
        "</div>" +
        '<button type="button" class="price-card-slider-btn price-card-slider-next" aria-label="다음 이미지">' +
          '<span aria-hidden="true">›</span>' +
        "</button>" +
        '<div class="price-card-slider-dots">' +
          images
            .map(function (_, index) {
              return (
                '<button type="button" class="price-card-slider-dot' +
                (index === 0 ? " active" : "") +
                '" data-index="' +
                index +
                '" aria-label="' +
                (index + 1) +
                '번째 이미지"></button>'
              );
            })
            .join("") +
        "</div>" +
      "</div>" +
    "</div>"
  );
}

function ensureOptionO(text) {
  var value = String(text || "").trim();
  if (!value || value.endsWith(" O")) return value;
  if (/\+/.test(value)) return value;
  return value + " O";
}

function formatOptionLabel(option) {
  if (typeof option === "string") return ensureOptionO(option);
  if (!option || !option.label) return "";
  return ensureOptionO(option.label + (option.price ? " " + option.price : ""));
}

function createPriceOptions(item) {
  var options = item.options;
  if (!options || !options.length) return "";

  return (
    '<div class="price-card-tags" aria-label="변경 O 옵션">' +
      options
        .map(function (option) {
          return '<span class="price-card-tag">' + formatOptionLabel(option) + "</span>";
        })
        .join("") +
    "</div>"
  );
}

function createPriceCard(item) {
  var variants = getPriceVariants(item);
  var hasVariants = item.variants && item.variants.length > 1;
  var initialVariant = hasVariants ? variants[0] : null;

  return (
    '<article class="price-card">' +
      createPriceMedia(item) +
      '<div class="price-card-body">' +
        '<div class="price-card-head">' +
          '<h3 class="price-card-title">' +
          (item.title || "") +
          "</h3>" +
          '<span class="price-card-price">' +
          (item.price || "문의") +
          "</span>" +
        "</div>" +
        (hasVariants
          ? (initialVariant.label
              ? '<p class="price-card-variant-label">' + initialVariant.label + "</p>"
              : "") +
            '<p class="price-card-desc price-card-desc--variant">' + (initialVariant.desc || item.desc || "") + "</p>"
          : item.desc
            ? '<p class="price-card-desc">' + item.desc + "</p>"
            : "") +
        createPriceOptions(item) +
      "</div>" +
    "</article>"
  );
}

function initPriceCardSlider(root) {
  var track = root.querySelector(".price-card-slider-track");
  var dots = root.querySelectorAll(".price-card-slider-dot");
  var prevBtn = root.querySelector(".price-card-slider-prev");
  var nextBtn = root.querySelector(".price-card-slider-next");
  var slideCount = track ? track.children.length : 0;
  var current = 0;
  var autoplayMs = window.PRICE_SLIDER_INTERVAL || 5000;
  var autoplayId = null;
  var paused = false;
  var hasVariants = root.dataset.hasVariants === "true";
  var card = root.closest(".price-card");
  var variantLabel = card ? card.querySelector(".price-card-variant-label") : null;
  var variantDesc = card ? card.querySelector(".price-card-desc--variant") : null;

  if (!track || slideCount < 2) {
    if (prevBtn) prevBtn.hidden = true;
    if (nextBtn) nextBtn.hidden = true;
    var dotWrap = root.querySelector(".price-card-slider-dots");
    if (dotWrap) dotWrap.hidden = true;
    return;
  }

  function updateVariantCopy(index) {
    if (!hasVariants || !track) return;
    var slide = track.children[index];
    if (!slide) return;
    if (variantLabel) {
      var label = slide.dataset.variantLabel || "";
      variantLabel.textContent = label;
      variantLabel.hidden = !label;
    }
    if (variantDesc) variantDesc.textContent = slide.dataset.variantDesc || "";
  }

  function goTo(index) {
    current = (index + slideCount) % slideCount;
    track.style.transform = "translateX(-" + current * 100 + "%)";
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === current);
    });
    updateVariantCopy(current);
  }

  function stopAutoplay() {
    if (autoplayId !== null) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (paused) return;
    autoplayId = setInterval(function () {
      goTo(current + 1);
    }, autoplayMs);
  }

  function pauseAutoplay() {
    paused = true;
    stopAutoplay();
  }

  function resumeAutoplay() {
    paused = false;
    startAutoplay();
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  prevBtn.addEventListener("click", function () {
    goTo(current - 1);
    restartAutoplay();
  });

  nextBtn.addEventListener("click", function () {
    goTo(current + 1);
    restartAutoplay();
  });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      goTo(Number(dot.dataset.index));
      restartAutoplay();
    });
  });

  root.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      goTo(current - 1);
      restartAutoplay();
    }
    if (event.key === "ArrowRight") {
      goTo(current + 1);
      restartAutoplay();
    }
  });

  root.addEventListener("mouseenter", pauseAutoplay);
  root.addEventListener("mouseleave", resumeAutoplay);
  root.addEventListener("focusin", pauseAutoplay);
  root.addEventListener("focusout", function (event) {
    if (!root.contains(event.relatedTarget)) resumeAutoplay();
  });

  startAutoplay();
}

function initPriceList() {
  var grid = document.querySelector(".price-grid");
  if (!grid || !window.PRICE_ITEMS) return;

  var items = PRICE_ITEMS[grid.dataset.category] ?? [];
  grid.innerHTML = items.map(createPriceCard).join("");
  grid.querySelectorAll(".price-card-slider").forEach(initPriceCardSlider);
}

initPriceList();
