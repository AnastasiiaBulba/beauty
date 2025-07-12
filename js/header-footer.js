// Завантаження header/footer
function loadPartial(id, url, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}
