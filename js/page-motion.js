function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isInternalPageLink(anchor) {
  if (!anchor || anchor.target === "_blank") return false;

  var href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return false;

  if (/^https?:\/\//i.test(href)) {
    try {
      return new URL(href, location.href).origin === location.origin;
    } catch (error) {
      return false;
    }
  }

  return href.endsWith(".html") || href === "index.html" || href === "./";
}

function isPersistentScript(src) {
  var name = String(src || "").split("/").pop().split("?")[0];
  return (
    name === "site-config.js" ||
    name === "site-nav.js" ||
    name === "commission-menu.js" ||
    name === "page-motion.js" ||
    name === "page-motion-init.js"
  );
}

function wait(ms) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, ms);
  });
}

var prefetched = new Set();
var isNavigating = false;
var REVEAL_STAGGER_MS = 110;
var REVEAL_DURATION_MS = 1050;
var REVEAL_MAX_STAGGER_INDEX = 7;

function clearPageReveal(main) {
  main.classList.remove("page-reveal-active");
  main.querySelectorAll(".page-reveal-item").forEach(function (el) {
    el.classList.remove("page-reveal-item");
    el.style.removeProperty("--reveal-index");
  });
}

function collectRevealTargets(main) {
  var items = [];

  function push(el) {
    if (el && items.indexOf(el) < 0) items.push(el);
  }

  push(main.querySelector(".page-header"));
  push(main.querySelector(".price-intro"));

  var slider = main.querySelector(".price-slider");
  if (slider) {
    var firstSlide = slider.querySelector(".price-slider-slide");
    if (firstSlide) {
      push(firstSlide.querySelector(".price-slider-media"));
      push(firstSlide.querySelector(".price-slider-caption"));
    } else {
      push(slider);
    }
  }

  main.querySelectorAll(".price-card").forEach(function (card) {
    push(card.querySelector(".price-card-media"));
    push(card.querySelector(".price-card-body"));
  });

  [
    ".prop-category",
    ".tip-row",
    ".portfolio-card",
    ".intro-profile",
    ".notice-list > .notice-card",
    ".order-section",
    ".order-summary",
    ".order-output"
  ].forEach(function (selector) {
    main.querySelectorAll(selector).forEach(function (el) {
      push(el);
    });
  });

  if (!items.length) {
    var content = main.querySelector(".content-block");
    if (content) items.push(content);
    else items = Array.prototype.slice.call(main.children);
  }

  return items;
}

function setupPageReveal(main) {
  clearPageReveal(main);
  if (prefersReducedMotion()) return 0;

  var items = collectRevealTargets(main);
  items.forEach(function (el, index) {
    el.classList.add("page-reveal-item");
    el.style.setProperty("--reveal-index", String(Math.min(index, REVEAL_MAX_STAGGER_INDEX)));
  });

  return items.length;
}

function fadeOutMain(main) {
  clearPageReveal(main);
  if (prefersReducedMotion()) return Promise.resolve();
  main.classList.remove("page-main-enter", "page-main-ready", "page-reveal-active");
  main.classList.add("page-main-leaving");
  return wait(220);
}

function playPageReveal(main) {
  document.documentElement.classList.remove("page-motion-pending");
  document.documentElement.classList.add("page-motion-booted");
  main.classList.remove("page-main-leaving");
  if (prefersReducedMotion()) {
    document.documentElement.classList.remove("page-motion-pending");
    document.documentElement.classList.add("page-motion-booted");
    main.classList.add("page-main-ready");
    return Promise.resolve();
  }

  var itemCount = setupPageReveal(main);
  main.classList.add("page-main-enter");

  return new Promise(function (resolve) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        main.classList.add("page-reveal-active", "page-main-ready");
        var staggerSteps = Math.min(Math.max(itemCount - 1, 0), REVEAL_MAX_STAGGER_INDEX);
        var totalMs = staggerSteps * REVEAL_STAGGER_MS + REVEAL_DURATION_MS + 40;
        window.setTimeout(function () {
          clearPageReveal(main);
          main.classList.remove("page-main-enter");
          resolve();
        }, totalMs);
      });
    });
  });
}

function removePageScripts() {
  Array.prototype.slice.call(document.querySelectorAll("script[src]")).forEach(function (script) {
    var src = script.getAttribute("src");
    if (src && !isPersistentScript(src)) script.remove();
  });
}

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    var joiner = src.indexOf("?") >= 0 ? "&" : "?";
    script.src = src + joiner + "pm=" + Date.now();
    script.onload = function () {
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function runInlineScripts(doc) {
  Array.prototype.forEach.call(doc.body.querySelectorAll("script:not([src])"), function (oldScript) {
    if (!oldScript.textContent.trim()) return;
    var script = document.createElement("script");
    script.textContent = oldScript.textContent;
    document.body.appendChild(script);
  });
}

function loadPageScripts(doc) {
  removePageScripts();

  var srcs = Array.prototype.slice
    .call(doc.querySelectorAll("script[src]"))
    .map(function (script) {
      return script.getAttribute("src");
    })
    .filter(function (src) {
      return src && !isPersistentScript(src);
    });

  return srcs.reduce(function (chain, src) {
    return chain.then(function () {
      return loadScript(src);
    });
  }, Promise.resolve()).then(function () {
    runInlineScripts(doc);
  });
}

function samePagePath(a, b) {
  try {
    return new URL(a, location.href).pathname === new URL(b, location.href).pathname;
  } catch (error) {
    return false;
  }
}

function pageIdFromPath(pathname) {
  var file = pathname.split("/").pop() || "index.html";
  if (file === "" || file === "index.html") return "intro";
  return file.replace(/\.html$/, "");
}

function navigateSoft(href, options) {
  options = options || {};

  if (isNavigating) return Promise.resolve();
  if (!options.force && samePagePath(href, location.href)) return Promise.resolve();

  var nextUrl;
  try {
    nextUrl = new URL(href, location.href);
  } catch (error) {
    window.location.href = href;
    return Promise.resolve();
  }

  if (nextUrl.origin !== location.origin) {
    window.location.href = nextUrl.href;
    return Promise.resolve();
  }

  if (prefersReducedMotion()) {
    window.location.href = nextUrl.href;
    return Promise.resolve();
  }

  var main = document.querySelector(".main");
  var aside = document.querySelector(".snb[data-page]");
  if (!main) {
    window.location.href = nextUrl.href;
    return Promise.resolve();
  }

  isNavigating = true;
  document.body.classList.add("is-navigating");

  var fadeOut = options.skipFadeOut ? Promise.resolve() : fadeOutMain(main);

  return fadeOut
    .then(function () {
      return fetch(nextUrl.href, { credentials: "same-origin" });
    })
    .then(function (response) {
      if (!response.ok) throw new Error("fetch failed");
      return response.text();
    })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var newMain = doc.querySelector(".main");
      var newAside = doc.querySelector(".snb[data-page]");
      if (!newMain) throw new Error("missing main");

      if (aside && newAside) {
        aside.classList.add("snb-swapping");
        aside.dataset.page = newAside.dataset.page || pageIdFromPath(nextUrl.pathname);
        requestAnimationFrame(function () {
          aside.classList.remove("snb-swapping");
        });
      }

      main.className = newMain.className;
      main.innerHTML = newMain.innerHTML;

      if (doc.title) document.title = doc.title;

      window.scrollTo(0, 0);
      return loadPageScripts(doc);
    })
    .then(function () {
      if (!options.skipPush) {
        history.pushState({ pageMotion: true }, "", nextUrl.href);
      }
      return playPageReveal(main);
    })
    .catch(function () {
      window.location.href = nextUrl.href;
    })
    .finally(function () {
      isNavigating = false;
      document.body.classList.remove("is-navigating");
    });
}

document.addEventListener(
  "click",
  function (event) {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    var anchor = event.target.closest("a[href]");
    if (!isInternalPageLink(anchor)) return;

    event.preventDefault();
    if (anchor.blur) anchor.blur();
    navigateSoft(anchor.href);
  },
  false
);

document.addEventListener(
  "mouseover",
  function (event) {
    var anchor = event.target.closest("a[href]");
    if (!isInternalPageLink(anchor)) return;

    var href = anchor.href;
    if (prefetched.has(href)) return;

    prefetched.add(href);
    var link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.body.appendChild(link);
  },
  { passive: true }
);

window.addEventListener("popstate", function () {
  navigateSoft(location.href, { skipPush: true });
});

(function initMain() {
  var main = document.querySelector(".main");
  if (!main) return;
  playPageReveal(main);
})();
