const semicircles = document.querySelectorAll(".semicircle__half");
const rotateStartValues = [16, -20, -35, 45, -45, -20];
let startMousePos;

semicircles.forEach((semicircle, index) => {
  let rotateValue = rotateStartValues[index];
  semicircle.style.transform = `rotate(${rotateValue}deg)`;
});

document.addEventListener("mousemove", event => {
  rotateSemicircles(event);
});

function rotateSemicircles(event) {
  if (startMousePos === undefined) {
    startMousePos = event.clientX;
    return;
  }

  let newMousePos = event.clientX;
  let deltaX = newMousePos - startMousePos;
  startMousePos = newMousePos;

  semicircles.forEach(semicircle => {
    let actualRotate = getActualRotate(semicircle);
    semicircle.style.transform = `rotate(${actualRotate + deltaX / 25}deg)`;
  });
}

function getActualRotate(element) {
  let rotate = element.style.transform;
  let openBracket = rotate.indexOf("(");
  let degString = rotate.indexOf("deg");
  return Number(rotate.slice(openBracket + 1, degString));
}
