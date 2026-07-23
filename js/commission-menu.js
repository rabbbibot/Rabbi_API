(function () {
  var MOBILE_MQ = window.matchMedia("(max-width: 768px)");

  function getAside() {
    return document.querySelector(".snb[data-page]");
  }

  function getOpenDropdowns() {
    var aside = getAside();
    if (!aside) return [];
    return Array.prototype.slice.call(
      aside.querySelectorAll(".snb-primary-nav > .snb-dropdown.snb-gnb-open")
    );
  }

  function positionGnbMenu(dropdown) {
    var menu = dropdown.querySelector(":scope > .snb-dropdown-menu");
    var trigger = dropdown.querySelector(":scope > .snb-dropdown-trigger");
    if (!menu || !trigger) return;

    menu.style.display = "block";
    var rect = trigger.getBoundingClientRect();
    var menuWidth = menu.offsetWidth || 168;
    var left = rect.left;
    var maxLeft = window.innerWidth - menuWidth - 8;

    if (left > maxLeft) left = Math.max(8, maxLeft);
    if (left < 8) left = 8;

    menu.style.position = "fixed";
    menu.style.top = Math.round(rect.bottom) + "px";
    menu.style.left = Math.round(left) + "px";
    menu.style.right = "auto";
    menu.style.width = "auto";
    menu.style.minWidth = "10.5rem";
    menu.style.maxWidth = Math.min(18 * 16, window.innerWidth - 16) + "px";
  }

  function clearGnbMenuPosition(dropdown) {
    var menu = dropdown.querySelector(":scope > .snb-dropdown-menu");
    if (!menu) return;
    menu.removeAttribute("style");
  }

  function repositionOpenGnbMenus() {
    if (!MOBILE_MQ.matches) return;
    getOpenDropdowns().forEach(positionGnbMenu);
  }

  function setGnbPanelOpenState() {
    var aside = getAside();
    if (!aside) return;
    var gnb = aside.querySelector(".snb-gnb");
    if (!gnb) return;
    gnb.classList.toggle("snb-gnb-has-panel", getOpenDropdowns().length > 0);
  }

  function closeGnbPanels(except) {
    var aside = getAside();
    if (!aside) return;
    aside.querySelectorAll(".snb-primary-nav > .snb-dropdown.snb-gnb-open").forEach(function (dropdown) {
      if (dropdown !== except) {
        dropdown.classList.remove("snb-gnb-open");
        clearGnbMenuPosition(dropdown);
      }
    });
    setGnbPanelOpenState();
  }

  function closeAllGnbPanels() {
    closeGnbPanels(null);
  }

  document.addEventListener(
    "click",
    function (event) {
      if (!MOBILE_MQ.matches) return;

      var trigger = event.target.closest(".snb-primary-nav > .snb-dropdown > .snb-dropdown-trigger");
      if (trigger) {
        event.preventDefault();
        event.stopPropagation();
        var dropdown = trigger.closest(".snb-dropdown");
        if (!dropdown) return;
        var willOpen = !dropdown.classList.contains("snb-gnb-open");
        closeGnbPanels(willOpen ? dropdown : null);
        dropdown.classList.toggle("snb-gnb-open", willOpen);
        setGnbPanelOpenState();
        if (willOpen) {
          requestAnimationFrame(function () {
            positionGnbMenu(dropdown);
          });
        } else {
          clearGnbMenuPosition(dropdown);
        }
        return;
      }

      var subLabel = event.target.closest(
        ".snb-primary-nav > .snb-dropdown.snb-gnb-open .snb-submenu > .snb-submenu-label"
      );
      if (subLabel) {
        event.preventDefault();
        event.stopPropagation();
        var submenu = subLabel.closest(".snb-submenu");
        if (submenu) submenu.classList.toggle("open");
        getOpenDropdowns().forEach(positionGnbMenu);
        return;
      }

      if (event.target.closest(".snb-dropdown-menu a[href]:not(.snb-submenu-label)")) {
        closeAllGnbPanels();
        return;
      }

      if (!event.target.closest(".snb-dropdown")) {
        closeAllGnbPanels();
      }
    },
    true
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeAllGnbPanels();
  });

  window.addEventListener("resize", repositionOpenGnbMenus);
  window.addEventListener("scroll", repositionOpenGnbMenus, true);

  MOBILE_MQ.addEventListener("change", function () {
    closeAllGnbPanels();
  });

  window.closeMobileSiteNav = closeAllGnbPanels;
})();
