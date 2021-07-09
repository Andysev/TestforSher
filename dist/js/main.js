function setCursorPosition(pos, e) {
    e.focus();
    if (e.setSelectionRange) e.setSelectionRange(pos, pos);
    else if (e.createTextRange) {
      var range = e.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  }

  function mask(e) {
    //console.log('mask',e);
    var matrix = this.placeholder,// .defaultValue
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
      return val.charAt(i++) || "_";
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this);
  }
  window.addEventListener("DOMContentLoaded", function() {
    var input = document.querySelector("#online_phone");
    input.addEventListener("input", mask, false);
     });
  window.addEventListener("DOMContentLoaded", function() {
    var input = document.querySelector("#online_phone1");
    input.addEventListener("input", mask, false);
      });
  window.addEventListener("DOMContentLoaded", function() {
    var input = document.querySelector("#online_phone3");
    input.addEventListener("input", mask, false);
     });
  window.addEventListener("DOMContentLoaded", function() {
    var input = document.querySelector("#online_phone4");
    input.addEventListener("input", mask, false);
      });

  function slider1(){
    let slider = document.querySelector('.slider1'),
    sliderList = slider.querySelector('.slider-list'),
    sliderTrack = slider.querySelector('.slider-track'),
    slides = slider.querySelectorAll('.slide'),
    arrows = slider.querySelector('.slider-arrows'),
    prev = arrows.children[0],
    next = arrows.children[1],
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --slides.length * slideWidth,
    posThreshold = slides[0].offsetWidth * 0.35,
    trfRegExp = /([-0-9.]+(?=px))/,
    swipeStartTime,
    swipeEndTime,
    getEvent = function() {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide = function() {
      if (transition) {
        sliderTrack.style.transition = 'transform .5s';
      }
      sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
  
      prev.classList.toggle('disabled', slideIndex === 0);
      next.classList.toggle('disabled', slideIndex === --slides.length);
    },
    swipeStart = function() {
      let evt = getEvent();
  
      if (allowSwipe) {
  
        swipeStartTime = Date.now();
        
        transition = true;
  
        nextTrf = (slideIndex + 1) * -slideWidth;
        prevTrf = (slideIndex - 1) * -slideWidth;
  
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
  
        sliderTrack.style.transition = '';
  
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);
  
        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
      }
    },
    swipeAction = function() {
  
      let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0];
  
      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;
  
      posY2 = posY1 - evt.clientY;
      posY1 = evt.clientY;
  
      if (!isSwipe && !isScroll) {
        let posY = Math.abs(posY2);
        if (posY > 7 || posX2 === 0) {
          isScroll = true;
          allowSwipe = false;
        } else if (posY < 7) {
          isSwipe = true;
        }
      }
  
      if (isSwipe) {
        if (slideIndex === 0) {
          if (posInit < posX1) {
            setTransform(transform, 0);
            return;
          } else {
            allowSwipe = true;
          }
        }
  
        // запрет ухода вправо на последнем слайде
        if (slideIndex === --slides.length) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
          } else {
            allowSwipe = true;
          }
        }
  
        if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
          reachEdge();
          return;
        }
  
        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
      }
  
    },
    swipeEnd = function() {
      posFinal = posInit - posX1;
  
      isScroll = false;
      isSwipe = false;
  
      document.removeEventListener('touchmove', swipeAction);
      document.removeEventListener('mousemove', swipeAction);
      document.removeEventListener('touchend', swipeEnd);
      document.removeEventListener('mouseup', swipeEnd);
  
      sliderList.classList.add('grab');
      sliderList.classList.remove('grabbing');
  
      if (allowSwipe) {
        swipeEndTime = Date.now();
        if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
          if (posInit < posX1) {
            slideIndex--;
          } else if (posInit > posX1) {
            slideIndex++;
          }
        }
  
        if (posInit !== posX1) {
          allowSwipe = false;
          slide();
        } else {
          allowSwipe = true;
        }
  
      } else {
        allowSwipe = true;
      }
  
    },
    setTransform = function(transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
      }
      allowSwipe = false;
    },
    reachEdge = function() {
      transition = false;
      swipeEnd();
      allowSwipe = true;
    };
  
  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderList.classList.add('grab');
  
  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart);
  slider.addEventListener('mousedown', swipeStart);
  
  arrows.addEventListener('click', function() {
    let target = event.target;
  
    if (target.classList.contains('next')) {
      slideIndex++;
    } else if (target.classList.contains('prev')) {
      slideIndex--;
    } else {
      return;
    }
  
    slide();
  });
  
  }
  slider1();


 //animate
 var isScrolling = false;
 
 window.addEventListener("scroll", throttleScroll, false);

 function throttleScroll(e) {
   if (isScrolling == false) {
     window.requestAnimationFrame(function() {
       scrolling(e);
       isScrolling = false;
     });
   }
   isScrolling = true;
 }

 document.addEventListener("DOMContentLoaded", scrolling, false);

 var listItems = document.querySelectorAll("#mainContent .animate");
 

 function scrolling(e) {

   for (var i = 0; i < listItems.length; i++) {
     var listItem = listItems[i];

     if (isPartiallyVisible(listItem)) {
       listItem.classList.add("active");
     } else {
       listItem.classList.remove("active");
     }
   }
 }

 function isPartiallyVisible(el) {
   var elementBoundary = el.getBoundingClientRect();

   var top = elementBoundary.top;
   var bottom = elementBoundary.bottom;
   var height = elementBoundary.height;

   return ((top + height >= 0) && (height + window.innerHeight >= bottom));
 }

 function isFullyVisible(el) {
   var elementBoundary = el.getBoundingClientRect();

   var top = elementBoundary.top;
   var bottom = elementBoundary.bottom;

   return ((top >= 0) && (bottom <= window.innerHeight));
 }