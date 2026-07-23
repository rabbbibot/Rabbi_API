function createTipItem(item, index) {
  const body = item.html
    ? item.html
    : `<p>${item.text || ""}</p>`;
  const showVideo =
    Object.prototype.hasOwnProperty.call(item, "youtubeId") || item.video === true;
  const video = showVideo
    ? item.youtubeId
      ? createYoutubeVideo(item.youtubeId)
      : '<div class="video-wrap video-wrap--empty" aria-hidden="true"></div>'
    : "";

  const title = item.title ? `<h3>${item.title}</h3>` : "";

  return `
    <article class="tip-row${showVideo ? "" : " tip-row--no-video"}">
      <div class="tip-body">
        ${title}
        ${body}
      </div>
      ${video}
    </article>
  `;
}

function initTipList() {
  const list = document.querySelector(".tip-list");
  if (list && window.TIP_ITEMS) {
    const items = TIP_ITEMS[list.dataset.key] ?? [];
    list.innerHTML = items.map(createTipItem).join("");
  }
}

initTipList();
