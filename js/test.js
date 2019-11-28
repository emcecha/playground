// const button = document.querySelector(".button");
// const text = document.querySelector(".text");

// button.addEventListener("mouseover", function (event) {
//   let x = event.clientX;
//   let y = event.clientY;

//   let newposX = x - text.getBoundingClientRect().x;
//   let newposY = y - text.getBoundingClientRect().y;

//   text.style.transform = "translate("+ (newposX * 0.7) +"px,"+ (newposY * 0.7) +"px)";

//   // setTimeout(() => {
//   //   text.style.transition = "none";
//   // }, 1000);

//   button.addEventListener("mousemove", function (event) {
//     let x = event.clientX;
//     let y = event.clientY;

//     let newposX = x - text.getBoundingClientRect().x;
//     let newposY = y - text.getBoundingClientRect().y;

//     text.style.transform = "translate("+ (newposX * 0.5) +"px,"+ (newposY * 0.5) +"px)";
//   })
// })

// button.addEventListener("mouseout", function () {
//   text.style = "";
// })

// ------------------------------------------------------------------

const elementsToObserve = document.querySelectorAll(".observe");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains("[class*=translate]")
    ) {
      entry.target.classList.add("is-intersecting");
    } else {
      if (window.pageYOffset + window.innerHeight < entry.target.offsetHeight + entry.target.offsetTop) {
        entry.target.classList.remove("is-intersecting");
      } 
    }
  });
});

elementsToObserve.forEach(element => {
  observer.observe(element);
})

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

menu.addEventListener("click", (event) => {
  menu.classList.toggle("open");
  nav.classList.toggle("open");
});

// -------------------------------------

$(function() {

  const $navSlider = $(".nav__list");

  $navSlider.slick({
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "17%",
    focusOnSelect: true,
    speed: 200,
    easing: "ease-out",
  });

  $navSlider.on("wheel", function (event) {

    event.preventDefault();

    if (event.originalEvent.deltaY > 0) {
      $navSlider.slick("slickNext");
    } else {
      $navSlider.slick("slickPrev");
    }
  })

  document.addEventListener("keydown", function (event) {
    
    if (event.key === "ArrowDown") {
      event.preventDefault()
      $navSlider.slick("slickNext");
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      $navSlider.slick("slickPrev");
    } else if (event.key === "Escape") {
      event.preventDefault()
      menu.classList.toggle("open");
      nav.classList.toggle("open");
    }
  })

  // ------------ EMOJI POINTER ----------------

  const pointerChangeArea = document.getElementById("change-pointer");

  pointerChangeArea.addEventListener("mouseover", changeCursorToCustom);

  function changeCursorToCustom(event) {
    
    let x = event.clientX;
    let y = event.clientY + window.pageYOffset;
    
    const customCursor = document.createElement("div");
    const body = document.querySelector("body");

    body.appendChild(customCursor);
    customCursor.classList.add("custom-cursor");
    setNewCursorPosition(x,y);

    pointerChangeArea.addEventListener("mousemove", moveCustomCursor);
    pointerChangeArea.addEventListener("mouseout", destroyCustomCursor);

    function moveCustomCursor(event) {
      x = event.clientX;
      y = event.clientY + window.pageYOffset;
      setNewCursorPosition(x,y)
    }

    function destroyCustomCursor() {
      body.removeChild(customCursor);
      pointerChangeArea.removeEventListener("mousemove", moveCustomCursor);
      pointerChangeArea.removeEventListener("mouseout", destroyCustomCursor);
    }

    function setNewCursorPosition(posX,posY) {
      customCursor.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))`;
    }
  }

});


