const pointerChangeArea = document.getElementById("change-pointer");

pointerChangeArea.addEventListener("mouseover", changeCursorToCustom);

function changeCursorToCustom(event) {
  let x = event.clientX;
  let y = event.clientY + window.pageYOffset;

  const customCursor = document.createElement("div");
  const body = document.querySelector("body");

  body.appendChild(customCursor);
  customCursor.classList.add("custom-cursor");
  setNewCursorPosition(x, y);

  pointerChangeArea.addEventListener("mousemove", moveCustomCursor);
  pointerChangeArea.addEventListener("mouseout", destroyCustomCursor);

  function moveCustomCursor(event) {
    x = event.clientX;
    y = event.clientY + window.pageYOffset;
    setNewCursorPosition(x, y);
  }

  function destroyCustomCursor() {
    body.removeChild(customCursor);
    pointerChangeArea.removeEventListener("mousemove", moveCustomCursor);
    pointerChangeArea.removeEventListener("mouseout", destroyCustomCursor);
  }

  function setNewCursorPosition(posX, posY) {
    customCursor.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))`;
  }
}
