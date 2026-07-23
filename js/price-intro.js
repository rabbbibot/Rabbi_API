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

  function initPricePageTitle() {
    var intro = document.querySelector(".price-intro[data-category]");
    if (!intro || !window.PRICE_PAGE) return;

    var meta = PRICE_PAGE[intro.dataset.category];
    if (!meta) return;

    if (meta.docTitle) document.title = meta.docTitle;

    var heading = document.querySelector(".page-header .page-title");
    if (heading && meta.title) heading.textContent = meta.title;
  }

  document.querySelectorAll(".price-intro[data-category]").forEach(renderIntro);
  initPricePageTitle();
})();
