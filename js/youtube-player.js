function createYoutubeVideo(id) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`;
  return `
    <div class="video-wrap">
      <iframe src="${embedUrl}" allowfullscreen loading="lazy"></iframe>
    </div>
  `;
}
