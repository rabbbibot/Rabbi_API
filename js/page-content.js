(function () {
  function youtubeEmbed(id) {
    return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?rel=0";
  }

  function videoHtml(id) {
    return (
      '<div class="video-wrap">' +
        '<iframe src="' + youtubeEmbed(id) + '" allowfullscreen loading="lazy"></iframe>' +
      '</div>'
    );
  }

  function renderPortfolio(category) {
    var grid = document.querySelector(".portfolio-grid");
    if (!grid || !window.PORTFOLIO_DATA) return;

    var items = window.PORTFOLIO_DATA[category] || [];
    if (!items.length) return;

    grid.innerHTML = items.map(function (item) {
      return (
        '<article class="portfolio-card">' +
          videoHtml(item.youtubeId) +
          '<div class="portfolio-meta">' +
            '<p><span>VTUBER:</span> ' + (item.vtuber || "") + '</p>' +
            '<p><span>ART:</span> ' + (item.art || "") + '</p>' +
            '<p class="portfolio-option">' + (item.option || "") + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function renderTip(pageKey) {
    var list = document.querySelector(".tip-list");
    var data = window.TIP_DATA && window.TIP_DATA[pageKey];
    if (!list || !data || !data.items || !data.items.length) return;

    var header = document.querySelector(".page-header");
    if (header) {
      var title = header.querySelector(".page-title");
      var desc = header.querySelector(".page-desc");
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc || "";
    }

    list.innerHTML = data.items.map(function (item, i) {
      var num = String(item.num != null ? item.num : i + 1);
      var textHtml = item.title
        ? "<h3>" + item.title + "</h3><p>" + item.text + "</p>"
        : "<p>" + item.text + "</p>";

      return (
        '<div class="tip-row">' +
          '<span class="tip-num">' + num + "</span>" +
          '<div class="tip-body">' + textHtml + "</div>" +
          videoHtml(item.youtubeId) +
        "</div>"
      );
    }).join("");
  }

  document.querySelector(".btn-top")?.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  var portfolio = document.body.dataset.portfolio;
  var tipPage = document.body.dataset.tip;

  if (portfolio) renderPortfolio(portfolio);
  if (tipPage) renderTip(tipPage);
})();
