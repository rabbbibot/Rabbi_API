(function () {
  var site = window.SITE || {};
  var nav = window.NAV || [];
  var aside = document.querySelector(".snb[data-page]");
  if (!aside) return;

  var current = aside.dataset.page || "";

  function isChildActive(item) {
    return item.children && item.children.some(function (child) {
      return child.id === current;
    });
  }

  var html = '<div class="snb-profile"><div class="snb-profile-img">';
  if (site.icon) {
    html += '<img src="' + site.icon + '" alt="' + (site.name || "") + '" width="72" height="72" decoding="sync">';
  }
  html += "</div></div><nav>";

  nav.forEach(function (item) {
    if (item.children) {
      var open = isChildActive(item);
      html += '<div class="snb-dropdown' + (open ? " open" : "") + '">';
      html += '<span class="snb-dropdown-trigger' + (open ? " active" : "") + '">' + item.label + "</span>";
      html += '<div class="snb-dropdown-menu">';
      item.children.forEach(function (child) {
        html += '<a href="' + child.href + '"' + (child.id === current ? ' class="active"' : "") + ">" + child.label + "</a>";
      });
      html += "</div></div>";
    } else {
      html += '<a href="' + item.href + '"' + (item.id === current ? ' class="active"' : "") + ">" + item.label + "</a>";
    }
  });

  aside.innerHTML = html + "</nav>";
})();
