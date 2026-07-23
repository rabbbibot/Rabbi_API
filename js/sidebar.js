(function () {
  var NAV = [
    { id: "intro", label: "소개", href: "index.html" },
    { id: "notice", label: "안내사항", href: "notice.html" },
    {
      id: "portfolio",
      label: "포트폴리오",
      children: [
        { id: "portfolio-female", label: "여자", href: "portfolio-female.html" },
        { id: "portfolio-male", label: "남자", href: "portfolio-male.html" },
        { id: "portfolio-other", label: "인외", href: "portfolio-other.html" },
        { id: "portfolio-sd", label: "SD", href: "portfolio-sd.html" }
      ]
    },
    {
      id: "model",
      label: "버츄얼 설정",
      children: [
        { id: "model-vtube", label: "Vtube Studio", href: "model-vtube.html" },
        { id: "model-vbridger", label: "Vbridger", href: "model-vbridger.html" },
        { id: "model-expression", label: "표정", href: "model-expression.html" },
        { id: "model-shoost", label: "Shoost", href: "model-shoost.html" }
      ]
    },
    {
      id: "tip",
      label: "팁",
      children: [
        { id: "tip-model", label: "모델 셋팅", href: "tip-model.html" },
        { id: "tip-expression", label: "표정 셋팅", href: "tip-expression.html" },
        { id: "tip-external", label: "외부 프로그램", href: "tip-external.html" },
        { id: "tip-iphone", label: "아이폰 기능", href: "tip-iphone.html" }
      ]
    }
  ];

  var PROFILE = {
    name: "",
    logo: ""
  };

  function renderNav(current) {
    var html = '<div class="snb-profile"><div class="snb-profile-img">';
    if (PROFILE.logo) html += '<img src="' + PROFILE.logo + '" alt="">';
    html += '</div>';
    if (PROFILE.name) html += '<span class="snb-profile-name">' + PROFILE.name + "</span>";
    html += '</div><nav>';

    NAV.forEach(function (item) {
      if (item.children) {
        var open = item.children.some(function (c) { return c.id === current; });
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

    return html + "</nav>";
  }

  var aside = document.querySelector(".snb[data-page]");
  if (!aside) return;

  aside.innerHTML = renderNav(aside.dataset.page || "");
})();
