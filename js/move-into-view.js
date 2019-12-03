const elementsToObserve = document.querySelectorAll(".observe");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (
      entry.isIntersecting &&
      !entry.target.classList.contains("[class*=translate]")
    ) {
      entry.target.classList.add("is-intersecting");
    } else {
      if (
        window.pageYOffset + window.innerHeight <
        entry.target.offsetHeight + entry.target.offsetTop
      ) {
        entry.target.classList.remove("is-intersecting");
      }
    }
  });
});

elementsToObserve.forEach(element => {
  observer.observe(element);
});
