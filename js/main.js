// Динамічне підключення header і footer
function loadPartial(id, url, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

function createMobileMenu() {
  // Додаємо модальне меню, якщо його ще немає
  if (!document.getElementById("mobile-menu-modal")) {
    fetch("components/mobile-menu.html")
      .then((res) => res.text())
      .then((html) => {
        document.body.insertAdjacentHTML("beforeend", html);
        initializeMobileMenu();
      });
  } else {
    initializeMobileMenu();
  }
}

function initializeMobileMenu() {
  const modal = document.getElementById("mobile-menu-modal");
  const burger = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("close-mobile-menu");

  if (!modal || !burger || !closeBtn) return;

  // Логіка відкриття/закриття
  burger.addEventListener("click", function () {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  });

  // Закриваємо меню при натисканні на будь-який пункт
  modal.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    });
  });
}

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
          // Якщо не на index або елементу немає — перенаправляємо на головну з хешем
          e.preventDefault();
          window.location.href = "./" + hash;
        }
      }
    });
  });
}

// Головний файл ініціалізації
// Завантаження header/footer, мобільне меню, плавна прокрутка, рік у футері, cookie-banner

document.addEventListener("DOMContentLoaded", function () {
  loadPartial("header", "components/header.html", function () {
    createMobileMenu();
    enableSmoothScrollAnchors();
  });
  loadPartial("footer", "components/footer.html");
  // footer-year.js і cookie-banner.js самі підписані на DOMContentLoaded
});
