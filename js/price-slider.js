(function () {
  var AUTO_MS = window.PRICE_SLIDER_INTERVAL || 5000;

  function getItemSlides(category) {
    var items = (window.PRICE_ITEMS || {})[category] || [];
    return items.filter(function (item) {
      return item.image || item.youtubeId;
    });
  }

  function getBannerSlides(category) {
    return (window.PRICE_BANNERS || {})[category] || [];
  }

  function createSlideMedia(slide) {
    if (slide.youtubeId && typeof createYoutubeVideo === "function") {
      return createYoutubeVideo(slide.youtubeId);
    }
    if (slide.src || slide.image) {
      var src = slide.src || slide.image;
      return (
        '<img src="' + src + '" alt="' + (slide.caption || slide.title || "") + '" loading="lazy" decoding="async">'
      );
    }
    return "";
  }

  function createItemSlide(item, index) {
    return (
      '<figure class="price-slider-slide" data-index="' + index + '">' +
        '<div class="price-slider-media">' + createSlideMedia(item) + "</div>" +
        '<figcaption class="price-slider-caption">' +
          '<strong class="price-slider-title">' + (item.title || "") + "</strong>" +
          (item.desc ? '<p class="price-slider-desc">' + item.desc + "</p>" : "") +
        "</figcaption>" +
      "</figure>"
    );
  }

  function createBannerSlide(slide, index) {
    return (
      '<figure class="price-slider-slide price-slider-slide--banner" data-index="' + index + '">' +
        '<div class="price-slider-media">' + createSlideMedia(slide) + "</div>" +
        (slide.caption
          ? '<figcaption class="price-slider-caption price-slider-caption--banner">' + slide.caption + "</figcaption>"
          : "") +
      "</figure>"
    );
  }

  function initSlider(root) {
    var category = root.dataset.category;
    var isBanner = root.dataset.mode === "banner";
    var slides = isBanner ? getBannerSlides(category) : getItemSlides(category);

    if (!slides.length) {
      root.hidden = true;
      return;
    }

    var current = 0;
    var timer = null;
    var createSlide = isBanner ? createBannerSlide : createItemSlide;

    root.innerHTML =
      '<button type="button" class="price-slider-btn price-slider-prev" aria-label="이전">' +
        '<span aria-hidden="true">‹</span>' +
      "</button>" +
      '<div class="price-slider-viewport">' +
        '<div class="price-slider-track">' +
          slides.map(createSlide).join("") +
        "</div>" +
      "</div>" +
      '<button type="button" class="price-slider-btn price-slider-next" aria-label="다음">' +
        '<span aria-hidden="true">›</span>' +
      "</button>" +
      '<div class="price-slider-dots">' +
        slides.map(function (_, i) {
          return (
            '<button type="button" class="price-slider-dot' + (i === 0 ? " active" : "") + '" ' +
            'data-index="' + i + '" aria-label="' + (i + 1) + '번째 슬라이드"></button>'
          );
        }).join("") +
      "</div>";

    var track = root.querySelector(".price-slider-track");
    var dots = root.querySelectorAll(".price-slider-dot");
    var prevBtn = root.querySelector(".price-slider-prev");
    var nextBtn = root.querySelector(".price-slider-next");

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === current);
      });
    }

    function resetTimer() {
      if (timer) clearInterval(timer);
      if (slides.length < 2) return;
      timer = setInterval(function () {
        goTo(current + 1);
      }, AUTO_MS);
    }

    prevBtn.addEventListener("click", function () {
      goTo(current - 1);
      resetTimer();
    });

    nextBtn.addEventListener("click", function () {
      goTo(current + 1);
      resetTimer();
    });

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goTo(Number(dot.dataset.index));
        resetTimer();
      });
    });

    root.addEventListener("mouseenter", function () {
      if (timer) clearInterval(timer);
    });

    root.addEventListener("mouseleave", resetTimer);

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        goTo(current - 1);
        resetTimer();
      }
      if (event.key === "ArrowRight") {
        goTo(current + 1);
        resetTimer();
      }
    });

    if (slides.length < 2) {
      prevBtn.hidden = true;
      nextBtn.hidden = true;
      root.querySelector(".price-slider-dots").hidden = true;
    }

    resetTimer();
  }

  document.querySelectorAll(".price-slider[data-category]").forEach(initSlider);
})();
