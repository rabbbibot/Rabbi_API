(function () {
  var dropdowns = document.querySelectorAll(".snb .snb-dropdown");

  function closeAll() {
    dropdowns.forEach(function (dd) {
      dd.classList.remove("open");
    });
  }

  function openDropdown(dd) {
    closeAll();
    dd.classList.add("open");
  }

  dropdowns.forEach(function (dd) {
    dd.classList.remove("open");
  });

  var activeSub = document.querySelector(".snb-dropdown-menu a.active");
  if (activeSub) {
    var parent = activeSub.closest(".snb-dropdown");
    if (parent) parent.classList.add("open");
  }

  document.querySelectorAll(".snb-dropdown-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var panel = trigger.closest(".snb-dropdown");
      if (!panel) return;

      if (panel.classList.contains("open")) {
        panel.classList.remove("open");
      } else {
        openDropdown(panel);
      }
    });
  });
})();
