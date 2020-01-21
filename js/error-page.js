const halfCircles = document.querySelectorAll(".error-page__half-circle-box");
const errorCode = document.querySelector(".error-page__code-text");
let startMouseX;

halfCircles.forEach(halfCircle => {
  halfCircle.style.transform = `translateX(0%)`;
});

errorCode.style.transform = `translateX(0%)`;

document.addEventListener("mousemove", function(event) {
  if (startMouseX == undefined) {
    startMouseX = event.clientX;
    return;
  }
  let newMouseX = event.clientX;
  let mouseDeltaX = newMouseX - startMouseX;
  startMouseX = newMouseX;

  halfCircles.forEach(halfCircle => {
    let translateX = getActualTranslateX(halfCircle);

    if (halfCircle.classList.contains("error-page__half-circle-box--top")) {
      halfCircle.style.transform = `translateX(${translateX +
        mouseDeltaX / 45}%)`;
      translateX = getActualTranslateX(halfCircle);

      let halfCircleBg = halfCircle.querySelector(".error-page__half-circle");
      if (translateX > 4) {
        halfCircleBg.style.backgroundColor = "orange";
      } else if (translateX < -4) {
        halfCircleBg.style.backgroundColor = "palegreen";
      } else {
        halfCircleBg.style.backgroundColor = "crimson";
      }
    }
    if (halfCircle.classList.contains("error-page__half-circle-box--bottom")) {
      halfCircle.style.transform = `translateX(${translateX -
        mouseDeltaX / 45}%)`;
    }
  });

  let codeTranslateX = getActualTranslateX(errorCode);
  errorCode.style.transform = `translate(${codeTranslateX +
    mouseDeltaX / 140}%)`;
});

function getActualTranslateX(element) {
  let translateX = element.style.transform;
  let openBracket = translateX.indexOf("(");
  let percentSign = translateX.indexOf("%");
  return Number(translateX.slice(openBracket + 1, percentSign));
}
