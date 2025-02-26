const choiceWrapersTitles = document.querySelectorAll(".choice-features__wraper-title");

function equalizeTitleHeights() {
  if (window.innerWidth <= 768) {
    choiceWrapersTitles.forEach((title) => (title.style.height = "auto"));
    return;
  }
  choiceWrapersTitles.forEach((title) => (title.style.height = "auto"));

  for (let i = 0; i < choiceWrapersTitles.length; i += 2) {
    const first = choiceWrapersTitles[i];
    const second = choiceWrapersTitles[i + 1];

    if (!second) break;

    const maxHeight = Math.max(first.offsetHeight, second.offsetHeight);
    first.style.height = `${maxHeight}px`;
    second.style.height = `${maxHeight}px`;
  }
}

window.addEventListener("load", equalizeTitleHeights);
window.addEventListener("resize", equalizeTitleHeights);
