(function () {
  function renderIntro(root) {
    var intro = (window.PRICE_INTRO || {})[root.dataset.category];
    if (!intro) return;

    root.innerHTML =
      '<div class="price-intro-copy">' +
        "<p>" + intro.lead + "</p>" +
        "<p>" + intro.note + "</p>" +
      "</div>" +
      '<p class="price-intro-price">' + intro.price + "</p>";
  }

  function initFootnote() {
    var foot = document.querySelector(".price-footnote");
    if (foot && window.PRICE_NOTE) {
      foot.textContent = PRICE_NOTE;
    }
  }

  document.querySelectorAll(".price-intro[data-category]").forEach(renderIntro);
  initFootnote();
})();
