function closeAllDropdowns() {
  document.querySelectorAll(".snb .snb-dropdown.open").forEach((panel) => {
    panel.classList.remove("open");
  });
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".snb-dropdown-trigger");
  if (!trigger) return;

  event.preventDefault();
  event.stopPropagation();

  const panel = trigger.closest(".snb-dropdown");
  if (!panel) return;

  if (panel.classList.contains("open")) {
    panel.classList.remove("open");
    return;
  }

  closeAllDropdowns();
  panel.classList.add("open");
});
