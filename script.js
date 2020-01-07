// load website

window.onload = function() {
   item = document.querySelector(".active");
   scrollMenu(item);
 };

// active menu item

let menuItems = Array.from(document.querySelectorAll(".item"));

let anchors = menuItems.map(el => {
   hash = el.href.replace(/[^#]*(.*)/, '$1'); 
   return hash;
})

let sections = anchors.map(hash => {
   block = document.querySelector(hash);
   return block ;
})

let menuHeight = document.querySelector(".nav-menu").offsetHeight;
let V = .1;

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
   window.addEventListener('scroll', activeBlock);

   function activeBlock(){
      sections.forEach(item => {
         let start = item.offsetTop - menuHeight;
         let end = item.offsetTop + item.offsetHeight/1.3;

         if (pageYOffset > start && pageYOffset < end){
            document.querySelector(".active").classList.remove("active");
            let index = sections.indexOf(item);
            menuItems[index].classList.add("active");
         }
      })
   }
}

function portfolio(selector){
   let imageSelector = "." + selector;
   let linkSelector = selector + "-link";
   let images = document.querySelectorAll(".portfolio-img");
   let currentArray = document.querySelectorAll(imageSelector);
   let links = document.querySelectorAll(".nav-link");

   images.forEach(image => {
      if(image.classList.contains("showed")) {
         image.classList.remove("showed")
      }
      image.classList.add("hidden")
   })
   
   currentArray.forEach(image => {
      image.classList.remove("hidden");
      image.classList.add("showed")
   })

   links.forEach(link => {
      if(link.classList.contains("active")) {
         link.classList.remove("active");
      }
 
      if (link.classList.contains(linkSelector)) {
         link.classList.add("active");
      }
   })


   
}



activeMenuItem();
scrollPage()
