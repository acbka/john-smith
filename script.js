// go to top
const scrollButton = document.querySelector(".scroll_top");

let hash = "#home"

function goToTop() {
   window.addEventListener("scroll", showScroll);
   scrollButton.addEventListener("click", goUp);
}

function showScroll() {
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
   document.querySelector('[href="#home"]').classList.add("active");
}

// active menu item

const anchors = document.querySelectorAll(".item");
const animationTime = 300;
const framesCount = 15;
let V = .1; // скорость, может иметь дробное значение через точку

function activeMenuItem() {
   anchors.forEach(item => {
      item.addEventListener('click', function (e) {
         e.preventDefault();
         scrollMenu(item);
         anchors.forEach((nl) => {
            if (nl != this) {
               nl.classList.remove('active');
            }
         });
         this.classList.add('active');
         document.querySelector(".navbar-collapse").classList.toggle("show")
      }, false);
   });
}

//scroll menu
function scrollMenu(item) {
   var w = window.pageYOffset;
   hash = item.href.replace(/[^#]*(.*)/, '$1'); 
   t = document.querySelector(hash).getBoundingClientRect().top; 
   start = null;

   requestAnimationFrame(step);

   function step(time) {
      if (start === null) start = time;
      let progress = time - start;
      r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
      window.scrollTo(0, r);
      if (r != w + t) {
         requestAnimationFrame(step)
      } else { 
         if (window.innerWidth > 1199) {
            window.scrollTo(0, t + w - 80)
         } else {
            window.scrollTo(0, t + w - 50);
         }
         
         //location.hash = hash  -  URL с хэшем если меню не fixed
      }
   };
}



activeMenuItem()
//goToTop()