// go to top
let scrollButton = document.querySelector(".scroll_top");

function goToTop(){
   window.addEventListener("scroll", trackScroll);
   scrollButton.addEventListener("click", goUp);
}

function trackScroll() {
   let scrolled = window.scrollY + 200;
   let y = document.documentElement.clientHeight;

   if (scrolled > y) {
      scrollButton.classList.add("show");
   } else {
      scrollButton.classList.remove("show");
   }
}

function goUp() {
   if (window.pageYOffset > 0) {
     window.scrollBy(0, -80);
     setTimeout(goUp, 0);
   };
   document.querySelector(".active").classList.remove("active");
   document.querySelector('[href="#home"]').classList.add("active")
}

goToTop()