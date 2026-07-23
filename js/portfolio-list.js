function createPortfolioCard(item) {
  const option = item.option
    ? `<p class="portfolio-option">${item.option}</p>`
    : "";

  return `
    <article class="portfolio-card">
      ${createYoutubeVideo(item.youtubeId)}
      <div class="portfolio-meta">
        <p><span>VTUBER:</span> ${item.vtuber ?? ""}</p>
        <p><span>ART:</span> ${item.art ?? ""}</p>
        ${option}
      </div>
    </article>
  `;
}

function initPortfolioList() {
  const grid = document.querySelector(".portfolio-grid");
  if (grid && window.PORTFOLIO_ITEMS) {
    const items = PORTFOLIO_ITEMS[grid.dataset.category] ?? [];
    grid.innerHTML = items.map(createPortfolioCard).join("");
  }
}

initPortfolioList();
