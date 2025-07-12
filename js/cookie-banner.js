// Логіка банера cookies
document.addEventListener("DOMContentLoaded", function () {
  var banner = document.getElementById("cookie-banner");
  if (!banner) return;
  if (!localStorage.getItem("cookieConsent")) {
    banner.style.display = "flex";
  }
  var acceptBtn = banner.querySelector(".cookie-banner__accept");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "accepted");
      banner.style.display = "none";
    });
  }
});
