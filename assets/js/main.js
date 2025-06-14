/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function () {
  // Hambuger nav menu
  //const hambuger = document.querySelector(".hamburger-bar");
  //const nav = document.querySelector(".header-nav-container");
  const hambuger = document.getElementById("hamburger-bar-id");
  const nav = document.getElementById("header-nav-container-id");

  hambuger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});
