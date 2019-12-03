const counterObserver = new IntersectionObserver(startCounting);
const countersArr = document.querySelectorAll(".counter");
const iterations = 50;

countersArr.forEach(observeCounter);

function observeCounter(counter) {
  counterObserver.observe(counter);
}

function startCounting(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let counterElement = entry.target;
      let counterNumber = Number(counterElement.innerText);
      let counterFraction = counterNumber / iterations;

      let multiplier = getMultiplier(counterFraction);

      let counterValue = 0;
      let iterationCount = 0;

      const counterInterval = setInterval(() => {
        if (iterationCount < iterations) {
          counterValue += counterFraction;
          counterValue = Math.round(counterValue * multiplier) / multiplier;
          counterStringValue = (
            Math.round(counterValue * 100) / 100
          ).toString();

          let comaIndex = counterStringValue.indexOf(".");

          if (counterElement.dataset.decimal === "true") {
            if (comaIndex < 0) {
              counterStringValue += ".00";
            } else {
              let afterComa = counterStringValue.slice(comaIndex + 1);

              if (afterComa.length === 1) {
                counterStringValue += "0";
              }
            }
          } else {
            if (comaIndex > -1) {
              counterStringValue = counterStringValue.slice(0, comaIndex);
            }
          }
          counterElement.innerText = counterStringValue;
        } else {
          clearInterval(counterInterval);
        }
        iterationCount++;
      }, 20);
    }
  });
}

function getMultiplier(fraction) {
  let fractionString = fraction.toString();
  let comaIndex = fractionString.indexOf(".");
  let afterComa = fractionString.slice(comaIndex + 1);

  let multiplier = "1";
  for (let i = 0; i < afterComa.length; i++) {
    multiplier += "0";
  }

  return Number(multiplier);
}
