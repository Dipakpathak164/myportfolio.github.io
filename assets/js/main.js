window.addEventListener("scroll", function () {
  var topheader = document.querySelector(".topheader");
  topheader.classList.toggle("active-bg", window.scrollY > 200);
});

// for the main Navbar
$(document).ready(function () {
  $(
    "#sidebarCollapse, #closeMenu, #side-click-close, #body-overlay"
  ).on("click", function () {
    $(
      "#sidebarCollapse, #navbarNav, #closeMenu,  #side-click-close, #body-overlay"
    ).toggleClass("active");
    $("#overlay_menu").toggleClass("bg-body");
    $("body").toggleClass("stop-scroll");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
  });
});

// theme settings
$(document).ready(function () {
  $(".theme-settings").on("click", function () {
    $(
      "body, .theme-settings, .navbar, section, .mynav-link, footer"
    ).toggleClass("active-theme");
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
};

const main = document.getElementById("main");
const highlight = document.getElementById("bar-higlight");
var mainHeight;
window.onscroll = function(){
    mainHeight = main.offsetHeight - window.innerHeight;
    mainPos = main.getBoundingClientRect();
    diff = mainHeight + mainPos.top;
    progressPercentage  = diff / mainHeight * 100;
    cssWidth = Math.floor(100 - progressPercentage);
    highlight.style.width = cssWidth + "%";
}
 
// AOS
AOS.init();

// Typing Js
var typed = new Typed(".type__text", {
    strings: ["Web Developer", "Full Stack Developer"],
    smartBackspace: true, // Default value
    typeSpeed: 60,
    backSpeed: 60,
    loop: true,
 });

 var loader = document.getElementById("preloader");
 window.addEventListener("load", function(){
     loader.style.left = "-100%";
     setTimeout(function () {
       clearInterval(tid); //clear above interval after 5 seconds
     }, 6000);
 });
 // Swiper Js
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  margin: 30,
  effect: "cube",
  grabCursor: true,
  autoplay:false,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  keyboard: {
    enabled: true,
  },
  autoplay: {
    disableOnInteraction: false,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// carousel
$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    center: true,
    items:2,
    loop:true,
    nav:true,
    dots:false,
    autoplay:true,
    margin:10,
    responsive:{
        600:{
            items:3
        }
    },navText:["<i class='fa fa-angle-left'></i>",
    "<i class='fa fa-angle-right' ></i>"]
  });
});


// Custom Cursor
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.custom-cursor');
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

const body = document.body;
const elements = document.querySelectorAll('.bar-parents, .toggle_texts, .scrollTop, .toggler-button');

function handleHover() {
  body.classList.add('hover');
}

function handleMouseOut() {
  body.classList.remove('hover');
}

function handleLinkHover(e) {
  const target = e.target;

  if (target.tagName === 'A' || target.tagName === 'IMG' || target.tagName === 'BUTTON') {
      body.classList.add('link-hover');
  }
}

function handleLinkMouseOut() {
  body.classList.remove('link-hover');
}

elements.forEach(element => {
  element.addEventListener('mouseover', handleHover);
  element.addEventListener('mouseout', handleMouseOut);
});

document.addEventListener('mouseover', handleLinkHover);
document.addEventListener('mouseout', handleLinkMouseOut);