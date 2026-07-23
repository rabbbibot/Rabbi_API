function getPriceImages(item) {
  if (item.images && item.images.length) return item.images;
  if (item.image) return [item.image];
  return [];
}

function createPriceMedia(item) {
  if (item.youtubeId && typeof createYoutubeVideo === "function") {
    return '<div class="price-card-media">' + createYoutubeVideo(item.youtubeId) + "</div>";
  }

  var images = getPriceImages(item);
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
    '<div class="price-card-media price-card-media--gallery">' +
      images.map(function (src, index) {
        return (
          '<div class="price-card-media-item">' +
            '<img src="' + src + '" alt="' + (item.title || "") + " " + (index + 1) + '" loading="lazy" decoding="async">' +
          "</div>"
        );
      }).join("") +
    "</div>"
  );
}

function formatOptionLabel(option) {
  if (typeof option === "string") return option;
  if (!option || !option.label) return "";
  return option.label + (option.price ? " " + option.price : "");
}

function createPriceOptions(item) {
  var options = item.options;
  if (!options || !options.length) return "";

  return (
    '<div class="price-card-tags" aria-label="변경 가능 옵션">' +
      options.map(function (option) {
        return '<span class="price-card-tag">' + formatOptionLabel(option) + "</span>";
      }).join("") +
    "</div>"
  );
}

function createPriceCard(item) {
  return (
    '<article class="price-card">' +
      createPriceMedia(item) +
      '<div class="price-card-body">' +
        '<div class="price-card-head">' +
          '<h3 class="price-card-title">' + (item.title || "") + "</h3>" +
          '<span class="price-card-price">' + (item.price || "문의") + "</span>" +
        "</div>" +
        (item.desc ? '<p class="price-card-desc">' + item.desc + "</p>" : "") +
        createPriceOptions(item) +
      "</div>" +
    "</article>"
  );
}

function initPriceList() {
  var grid = document.querySelector(".price-grid");
  if (!grid || !window.PRICE_ITEMS) return;

  var items = PRICE_ITEMS[grid.dataset.category] ?? [];
  grid.innerHTML = items.map(createPriceCard).join("");
}

initPriceList();
