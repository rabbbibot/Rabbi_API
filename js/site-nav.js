window.findNavItemById = function (items, id) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.id === id) return item;
    if (item.children) {
      var found = window.findNavItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

window.renderSiteNav = function () {
  var site = window.SITE || {};
  var nav = window.NAV || [];
  var aside = document.querySelector(".snb[data-page]");
  if (!aside) return;

  var current = aside.dataset.page || "";

  function treeContainsCurrent(item) {
    if (item.id === current) return true;
    if (!item.children) return false;
    return item.children.some(treeContainsCurrent);
  }

  function getFirstHref(item) {
    if (item.href) return item.href;
    if (!item.children || !item.children.length) return "";
    for (var i = 0; i < item.children.length; i++) {
      var href = getFirstHref(item.children[i]);
      if (href) return href;
    }
    return "";
  }

  function renderMenuLink(item, paddingLeft) {
    return (
      '<a href="' +
      item.href +
      '" data-nav-id="' +
      item.id +
      '"' +
      (item.id === current ? ' class="active"' : "") +
      ' style="padding-left:' +
      paddingLeft +
      'rem">' +
      item.label +
      "</a>"
    );
  }

  function renderMenuChildren(children, depth) {
    var paddingLeft = 2 + depth * 0.75;
    return children
      .map(function (child) {
        if (child.children) {
          var open = treeContainsCurrent(child);
          var firstHref = getFirstHref(child);
          return (
            '<div class="snb-submenu' +
            (open ? " open" : "") +
            '" data-nav-id="' +
            child.id +
            '">' +
            '<a class="snb-submenu-label' +
            (open ? " active" : "") +
            '" href="' +
            firstHref +
            '" data-nav-id="' +
            child.id +
            '">' +
            child.label +
            "</a>" +
            '<div class="snb-submenu-children">' +
            renderMenuChildren(child.children, depth + 1) +
            "</div>" +
            "</div>"
          );
        }
        return renderMenuLink(child, paddingLeft);
      })
      .join("");
  }

  var html = '<div class="snb-gnb">';
  html += '<div class="snb-profile">';
  html += '<div class="snb-profile-img" aria-hidden="true"></div>';
  if (site.name) {
    html += '<span class="snb-profile-name">' + site.name + "</span>";
  }
  html += "</div>";
  html += '<nav id="snb-primary-nav" class="snb-primary-nav">';

  nav.forEach(function (item) {
    if (item.children) {
      var open = treeContainsCurrent(item);
      var firstHref = getFirstHref(item);
      html += '<div class="snb-dropdown' + (open ? " open" : "") + '" data-nav-id="' + item.id + '">';
      html +=
        '<a class="snb-dropdown-trigger' +
        (open ? " active" : "") +
        '" href="' +
        firstHref +
        '" data-nav-id="' +
        item.id +
        '">' +
        item.label +
        "</a>";
      html += '<div class="snb-dropdown-menu">' + renderMenuChildren(item.children, 0) + "</div>";
      html += "</div>";
    } else {
      html +=
        '<a href="' +
        item.href +
        '" data-nav-id="' +
        item.id +
        '"' +
        (item.id === current ? ' class="active"' : "") +
        ">" +
        item.label +
        "</a>";
    }
  });

  aside.innerHTML = html + "</nav></div>";
  aside.dataset.navActive = current;
};

window.updateSiteNavActive = function () {
  var aside = document.querySelector(".snb[data-page]");
  var nav = window.NAV || [];
  if (!aside) return;

  if (!aside.querySelector(".snb-primary-nav")) {
    window.renderSiteNav();
    return;
  }

  var current = aside.dataset.page || "";
  if (aside.dataset.navActive === current) return;

  function treeContainsCurrent(item) {
    if (item.id === current) return true;
    if (!item.children) return false;
    return item.children.some(treeContainsCurrent);
  }

  aside.querySelectorAll(".snb-primary-nav > a[data-nav-id]").forEach(function (link) {
    link.classList.toggle("active", link.dataset.navId === current);
  });

  aside.querySelectorAll(".snb-primary-nav > .snb-dropdown[data-nav-id]").forEach(function (dropdown) {
    var item = window.findNavItemById(nav, dropdown.dataset.navId);
    if (!item) return;

    var contains = treeContainsCurrent(item);
    dropdown.classList.toggle("open", contains);

    var trigger = dropdown.querySelector(":scope > .snb-dropdown-trigger");
    if (trigger) trigger.classList.toggle("active", contains);

    dropdown.querySelectorAll(".snb-submenu[data-nav-id]").forEach(function (submenu) {
      var subItem = window.findNavItemById(nav, submenu.dataset.navId);
      if (!subItem) return;

      var subContains = treeContainsCurrent(subItem);
      submenu.classList.toggle("open", subContains);

      var label = submenu.querySelector(":scope > .snb-submenu-label");
      if (label) label.classList.toggle("active", subContains);
    });

    dropdown.querySelectorAll(".snb-dropdown-menu a[data-nav-id]").forEach(function (link) {
      if (link.classList.contains("snb-submenu-label")) return;
      link.classList.toggle("active", link.dataset.navId === current);
    });
  });

  aside.dataset.navActive = current;
};

window.syncSiteNavPage = function (pageId) {
  var aside = document.querySelector(".snb[data-page]");
  if (!aside || !pageId) return;
  aside.dataset.page = pageId;
  window.updateSiteNavActive();
};

window.initSiteNav = function () {
  var legacyStyle = document.getElementById("snb-nav-state");
  if (legacyStyle) legacyStyle.remove();
  window.updateSiteNavActive();
};

window.initSiteNav();
