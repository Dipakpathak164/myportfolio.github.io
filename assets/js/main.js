window.addEventListener("scroll", function () {
  var topheader = document.querySelector(".topheader");
  topheader.classList.toggle("active-bg", window.scrollY > 200);
});

// for the main Navbar
$(document).ready(function () {
  $("#sidebarCollapse, #closeMenu, #side-click-close, .nv_link").on(
    "click",
    function () {
      $(
        "#sidebarCollapse, #navbarNav, #closeMenu,  #side-click-close"
      ).toggleClass("active");
      $("#overlay_menu").toggleClass("bg-body");
      $("body").toggleClass("stop-scroll");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    }
  );
});

// theme settings
$(document).ready(function () {
  $(".theme-settings").on("click", function () {
    $("body, .theme-settings, .navbar, section, .mynav-link, footer").toggleClass("active-theme"
    );
  });
});

// tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Scroll to top 
 window.addEventListener("scroll", function () {
      var scroll = document.querySelector(".scrollTop");
      scroll.classList.toggle("active", window.scrollY > 500);
  });

  function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  }


// AOS
AOS.init();
