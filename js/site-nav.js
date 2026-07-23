window.buildSiteNavStateCss = function (nav) {
  var rules = [];

  function addActiveLink(pageId) {
    rules.push(
      '.snb[data-page="' +
        pageId +
        '"] a[data-nav-id="' +
        pageId +
        '"]{' +
        "color:var(--text)!important;" +
        "border-left-color:var(--text-muted)!important;" +
        "background:var(--hover-bg)!important;" +
        "}"
    );
  }

  function addOpenDropdown(pageId, dropdownId) {
    rules.push(
      '.snb[data-page="' +
        pageId +
        '"] .snb-dropdown[data-nav-id="' +
        dropdownId +
        '"] .snb-dropdown-menu{display:block!important}',
      '.snb[data-page="' +
        pageId +
        '"] .snb-dropdown[data-nav-id="' +
        dropdownId +
        '"] > .snb-dropdown-trigger{' +
        "color:var(--text)!important;" +
        "background:var(--hover-bg)!important;" +
        "border-left-color:var(--text-muted)!important;" +
        "}"
    );
  }

  function addOpenSubmenu(pageId, submenuId) {
    rules.push(
      '.snb[data-page="' +
        pageId +
        '"] .snb-submenu[data-nav-id="' +
        submenuId +
        '"] .snb-submenu-children{display:block!important}',
      '.snb[data-page="' +
        pageId +
        '"] .snb-submenu[data-nav-id="' +
        submenuId +
        '"] > .snb-submenu-label{' +
        "color:var(--text)!important;" +
        "background:var(--hover-bg)!important;" +
        "border-left-color:var(--text-muted)!important;" +
        "}"
    );
  }

  function walk(items, ancestors) {
    items.forEach(function (item) {
      if (item.href) {
        addActiveLink(item.id);
        ancestors.forEach(function (ancestorId) {
          addOpenDropdown(item.id, ancestorId);
          addOpenSubmenu(item.id, ancestorId);
        });
      }
      if (item.children) {
        walk(item.children, ancestors.concat(item.id));
      }
    });
  }

  walk(nav, []);
  return rules.join("\n");
};

window.ensureSiteNavStyles = function () {
  var nav = window.NAV || [];
  var style = document.getElementById("snb-nav-state");
  var css = window.buildSiteNavStateCss(nav);

  if (style) {
    if (style.textContent !== css) style.textContent = css;
    return;
  }

  style = document.createElement("style");
  style.id = "snb-nav-state";
  style.textContent = css;
  document.head.appendChild(style);
};

window.renderSiteNav = function () {
  var site = window.SITE || {};
  var nav = window.NAV || [];
  var aside = document.querySelector(".snb[data-page]");
  if (!aside) return;

  window.ensureSiteNavStyles();

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
      '" style="padding-left:' +
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
          var firstHref = getFirstHref(child);
          return (
            '<div class="snb-submenu" data-nav-id="' +
            child.id +
            '">' +
            '<a class="snb-submenu-label" href="' +
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

  var html = '<div class="snb-profile">';
  html += '<div class="snb-profile-img" aria-hidden="true"></div>';
  if (site.name) {
    html += '<span class="snb-profile-name">' + site.name + "</span>";
  }
  html += "</div><nav>";

  nav.forEach(function (item) {
    if (item.children) {
      var firstHref = getFirstHref(item);
      html += '<div class="snb-dropdown" data-nav-id="' + item.id + '">';
      html +=
        '<a class="snb-dropdown-trigger" href="' +
        firstHref +
        '" data-nav-id="' +
        item.id +
        '">' +
        item.label +
        "</a>";
      html += '<div class="snb-dropdown-menu">' + renderMenuChildren(item.children, 0) + "</div>";
      html += "</div>";
    } else {
      html += '<a href="' + item.href + '" data-nav-id="' + item.id + '">' + item.label + "</a>";
    }
  });

  aside.innerHTML = html + "</nav>";
};

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

window.updateSiteNavActive = function () {
  var aside = document.querySelector(".snb[data-page]");
  if (!aside) return;
  if (!aside.querySelector("nav")) {
    window.renderSiteNav();
  }
};

window.initSiteNav = function () {
  window.ensureSiteNavStyles();
  window.updateSiteNavActive();
};

window.initSiteNav();
