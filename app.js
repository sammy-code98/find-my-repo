// i used the window.onload  because the document.querySelector
// keeps returning null before the Dom fully loads
window.onload = function () {
  const harmburger = document.querySelector(".harmburger");
  const navMenu = document.querySelector(".nav-menu");

  harmburger.addEventListener("click", mobileMenu);
  function mobileMenu() {
    harmburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  const navLink = document.querySelectorAll(".nav-link");

  navLink.forEach((n) => n.addEventListener("click", closeMenu));

  function closeMenu() {
    harmburger.classList.remove("active");
    navMenu.classList.remove("active");
  }

  function setBg() {
    const randColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector(".random").style.backgroundColor = "#" + randColor;
    color.innerHTML = "#" + randColor;

  }
  setBg();

};
