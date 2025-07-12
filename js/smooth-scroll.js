// Плавна прокрутка
function enableSmoothScrollAnchors() {
  function isIndexPage() {
    const path = location.pathname.replace(/\\/g, "/");
    return (
      path === "/" ||
      path.endsWith("/") ||
      path === "" ||
      location.protocol === "file:"
    );
  }
  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        const target = document.querySelector(hash);
        if (isIndexPage() && target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Закриваємо мобільне меню, якщо воно є
          const modal = document.getElementById("mobile-menu-modal");
          if (modal && modal.classList.contains("active")) {
            modal.classList.remove("active");
          }
        } else if (!target) {
          e.preventDefault();
          window.location.href = "./" + hash;
        }
      }
    });
  });
}
