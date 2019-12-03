const movingTextArea = document.querySelector(".moving-text");
const texts = movingTextArea.querySelectorAll(".text");
const startPos = 15;

let pagePosition = window.pageYOffset;
let pageNewPosition;

texts.forEach(text => {
  text.style.transform = `translateX(${startPos}%)`;
});

const movingTextAreaObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => moveTextOnSroll(entry));
});

movingTextAreaObserver.observe(movingTextArea);

function moveTextOnSroll(entry) {
  if (entry.isIntersecting) {
    document.addEventListener("scroll", moveText);
  } else {
    document.removeEventListener("scroll", moveText);
  }
}

function moveText() {
  pageNewPosition = window.pageYOffset;

  texts.forEach(text => {
    let translateAmount = getTranslateAmount(text);

    if (
      (pageNewPosition > pagePosition && text.classList.contains("right")) ||
      (pageNewPosition < pagePosition && text.classList.contains("left"))
    ) {
      text.style.transform = `translate(${translateAmount + 0.1}%)`;
    }

    if (
      (pageNewPosition > pagePosition && text.classList.contains("left")) ||
      (pageNewPosition < pagePosition && text.classList.contains("right"))
    ) {
      text.style.transform = `translate(${translateAmount - 0.1}%)`;
    }
  });

  pagePosition = pageNewPosition;
}

function getTranslateAmount(element) {
  let translate = element.style.transform;
  let openBracket = translate.indexOf("(");
  let percentSign = translate.indexOf("%");
  return Number(translate.slice(openBracket + 1, percentSign));
}
