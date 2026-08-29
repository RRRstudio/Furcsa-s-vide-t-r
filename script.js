document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-page]");
  const pages = document.querySelectorAll(".page");

  function showPage(id) {
    pages.forEach(page => {
      page.classList.toggle("active", page.id === id);
    });

    buttons.forEach(button => {
      button.classList.toggle("active", button.dataset.page === id);
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  showPage("home");
});
