(function () {
  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function createPropItem(item) {
    var hasImage = !!item.image;
    var imageHtml = hasImage
      ? (
        '<img src="' + item.image + '" alt="' + escapeHtml(item.title) + '" loading="lazy" decoding="async">'
      )
      : "";
    var thumbHtml = hasImage
      ? (
        '<button type="button" class="prop-item-thumb prop-item-thumb--zoom" aria-label="' +
          escapeHtml(item.title) + ' 크게 보기">' + imageHtml + "</button>"
      )
      : ('<div class="prop-item-thumb">' + imageHtml + "</div>");

    return (
      '<li class="prop-item"' +
        (hasImage
          ? ' data-prop-src="' + escapeHtml(item.image) + '" data-prop-title="' + escapeHtml(item.title) + '"'
          : "") +
        ">" +
        '<figure class="prop-item-card">' +
          thumbHtml +
          '<figcaption class="prop-item-name">' + escapeHtml(item.title) + "</figcaption>" +
        "</figure>" +
      "</li>"
    );
  }

  function createPropCategory(section) {
    if (!section.items || !section.items.length) return "";

    return (
      '<section class="prop-category">' +
        '<h2 class="prop-category-title">' + escapeHtml(section.category) + "</h2>" +
        '<ul class="prop-item-grid">' +
          section.items.map(createPropItem).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function ensureLightbox() {
    var lightbox = document.querySelector(".prop-lightbox");
    if (lightbox) return lightbox;

    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="prop-lightbox" hidden aria-hidden="true">' +
        '<div class="prop-lightbox-backdrop" data-prop-lightbox-close></div>' +
        '<div class="prop-lightbox-panel" role="dialog" aria-modal="true" aria-labelledby="prop-lightbox-title">' +
          '<button type="button" class="prop-lightbox-close" data-prop-lightbox-close aria-label="닫기">×</button>' +
          '<figure class="prop-lightbox-figure">' +
            '<img class="prop-lightbox-img" src="" alt="">' +
            '<figcaption class="prop-lightbox-title" id="prop-lightbox-title"></figcaption>' +
          "</figure>" +
        "</div>" +
      "</div>"
    );

    return document.querySelector(".prop-lightbox");
  }

  function bindLightbox(root) {
    var lightbox = ensureLightbox();
    var img = lightbox.querySelector(".prop-lightbox-img");
    var titleEl = lightbox.querySelector(".prop-lightbox-title");

    function openLightbox(src, title) {
      img.src = src;
      img.alt = title;
      titleEl.textContent = title;
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("prop-lightbox-open");
    }

    function closeLightbox() {
      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("prop-lightbox-open");
      img.removeAttribute("src");
    }

    root.addEventListener("click", function (event) {
      var item = event.target.closest(".prop-item[data-prop-src]");
      if (!item) return;
      openLightbox(item.dataset.propSrc, item.dataset.propTitle);
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target.closest("[data-prop-lightbox-close]")) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  function initPropCatalog() {
    var root = document.querySelector(".prop-catalog");
    if (!root || !window.PROP_CATALOG) return;

    var sections = PROP_CATALOG.filter(function (section) {
      return section.items && section.items.length;
    });

    if (!sections.length) {
      root.hidden = true;
      return;
    }

    root.innerHTML = sections.map(createPropCategory).join("");
    bindLightbox(root);
  }

  initPropCatalog();
})();
