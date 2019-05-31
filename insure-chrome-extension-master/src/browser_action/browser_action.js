const DISABLED_KEY = "THIRD_EYE_DISABLED";

const toggle = document.getElementById("toggle-extension");
const isDisabled = localStorage.getItem(DISABLED_KEY) == "true";

toggle.checked = !isDisabled;

toggle.addEventListener("change", () => {
  localStorage.setItem(DISABLED_KEY, !toggle.checked);
});
