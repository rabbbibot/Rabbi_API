function isInternalPageLink(anchor) {
  if (!anchor || anchor.target === "_blank") return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return false;

  if (/^https?:\/\//i.test(href)) {
    try {
      return new URL(href).origin === location.origin;
    } catch {
      return false;
    }
  }

  return href.endsWith(".html") || href === "index.html" || href === "./";
}

const prefetched = new Set();

document.addEventListener(
  "mouseover",
  (event) => {
    const anchor = event.target.closest("a[href]");
    if (!isInternalPageLink(anchor)) return;

    const href = anchor.href;
    if (prefetched.has(href)) return;

    prefetched.add(href);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.body.appendChild(link);
  },
  { passive: true }
);
