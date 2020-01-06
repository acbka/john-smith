// go to top

const scrollButton = document.querySelector(".scroll_top");

window.onload = function() {
   item = document.querySelector(".active");
   scrollMenu(item);
 };


/*
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
*/



// active menu item

let menuItems = Array.from(document.querySelectorAll(".item"));

let anchors = menuItems.map(el => {
   hash = el.href.replace(/[^#]*(.*)/, '$1'); 
   return hash;
})

let menuHeight = document.querySelector(".nav-menu").offsetHeight;

const animationTime = 300;
const framesCount = 15;
let id = 0;
let lastId = 0;
let V = .1; // скорость, может иметь дробное значение через точку
let currentElement = 0;
let coordY = 0;


function activeMenuItem() {

   menuItems.forEach(elem => {
      elem.addEventListener('click', function (e) {
         e.preventDefault();
         scrollMenu(elem);
         
         menuItems.forEach((nl) => {
            if (nl != this) {
               nl.classList.remove('active');
            }
         });
         this.classList.add('active');
        
         document.querySelector(".navbar-collapse").classList.toggle("show")
      }, false);
   });
}

   // scroll menu

   function scrollMenu(item) {
      var w = window.pageYOffset;
      hash = item.href.replace(/[^#]*(.*)/, '$1'); 
      t = document.querySelector(hash).getBoundingClientRect().top; 
      start = null;
   
      requestAnimationFrame(step);
   
      function step(time) {
         let menuHeight = document.querySelector(".nav-menu").offsetHeight;
         if (start === null) start = time;
         let progress = time - start;
         r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
         window.scrollTo(0, r);
         if (r != w + t) {
            requestAnimationFrame(step)
         } else { 
            window.scrollTo(0, t + w - menuHeight)
            //location.hash = hash  -  URL с хэшем если меню не fixed
         }
      };
   }

   
      // scroll page

function scrollPage(){
   let menuItems = Array.from(document.querySelectorAll(".item"));

   let sections = menuItems.map(el => {
      hash = el.href.replace(/[^#]*(.*)/, '$1'); 
      block = document.querySelector(hash);
      return block ;
   })


   let menuHeight = document.querySelector(".nav-menu").offsetHeight;

   window.addEventListener('scroll', activeBlock);
   function activeBlock(){
      sections.forEach(item => {
         let start = item.offsetTop - menuHeight;
         let end = item.offsetTop + item.offsetHeight/1.5;
         if (pageYOffset > start && pageYOffset < end){
            let act = document.querySelector(".active")
            document.querySelector(".active").classList.remove("active");
            let index = sections.indexOf(item);
            menuItems[index].classList.add("active");
         }
      })

   }
}

activeMenuItem();
scrollPage()
