function createPortfolioCard(item) {
  return (
    '<article class="portfolio-card">' +
      createYoutubeVideo(item.youtubeId) +
      '<div class="portfolio-meta">' +
        '<p class="portfolio-desc">' + (item.desc || "임시 텍스트") + "</p>" +
      "</div>" +
    "</article>"
  );
}

function initPortfolioList() {
  const grid = document.querySelector(".portfolio-grid");
  if (grid && window.PORTFOLIO_ITEMS) {
    const items = PORTFOLIO_ITEMS[grid.dataset.category] ?? [];
    grid.innerHTML = items.map(createPortfolioCard).join("");
  }
}

initPortfolioList();
