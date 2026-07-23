(function () {
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

  function renderMenuLink(item, paddingLeft) {
    return (
      '<a href="' + item.href + '"' +
      (item.id === current ? ' class="active"' : "") +
      ' style="padding-left:' + paddingLeft + 'rem">' +
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
          return (
            '<div class="snb-submenu' + (open ? " open" : "") + '">' +
            '<span class="snb-submenu-label" style="padding-left:' + paddingLeft + 'rem">' +
            child.label +
            "</span>" +
            renderMenuChildren(child.children, depth + 1) +
            "</div>"
          );
        }
        return renderMenuLink(child, paddingLeft);
      })
      .join("");
  }

  var html = "<nav>";

  nav.forEach(function (item) {
    if (item.children) {
      var open = treeContainsCurrent(item);
      html += '<div class="snb-dropdown' + (open ? " open" : "") + '">';
      html += '<span class="snb-dropdown-trigger' + (open ? " active" : "") + '">' + item.label + "</span>";
      html += '<div class="snb-dropdown-menu">' + renderMenuChildren(item.children, 0) + "</div>";
      html += "</div>";
    } else {
      html += '<a href="' + item.href + '"' + (item.id === current ? ' class="active"' : "") + ">" + item.label + "</a>";
    }
  });

  aside.innerHTML = html + "</nav>";
})();
