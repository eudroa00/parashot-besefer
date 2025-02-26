window.addEventListener('load', () => {
  setTimeout(() => {
    placeVerses();
    updateChapterPosition();
  }, 50);
});
window.addEventListener('resize', placeVerses);
window.addEventListener('resize', updateChapterPosition);

let editable2 = document.getElementById('editable');
editable2.addEventListener('keyup', placeVerses);
editable2.addEventListener('change', placeVerses);

function updateChapterPosition() {
  const chapters = document.getElementsByClassName('perek');
  const numberColumn = document.getElementById('numberColumn');

  const numberColumnWidth = window.getComputedStyle(numberColumn).width;

  Array.from(chapters).forEach((chapter) => {
    chapter.style.paddingLeft = numberColumnWidth;
  });
}

function placeVerses() {
  const numberColumn = document.querySelector('.index');
  numberColumn.innerHTML = '';
  const markers = document.querySelectorAll('.marker');
  const columnOffset = numberColumn.getBoundingClientRect().top;

  markers.forEach((marker) => {
    const markerRect = marker.getBoundingClientRect();

    const markerId = marker.id.split('_');
    const partNumber = markerId[1];

    const numberElement = document.createElement('p');
    numberElement.className = 'number-tag';
    numberElement.innerText = partNumber;

    const topPosition = markerRect.top - columnOffset;

    numberElement.style.top = topPosition + 'px';
    numberElement.style.height = markerRect.height + 'px';

    numberColumn.appendChild(numberElement);
  });

  checkForOverlap();
}

function checkForOverlap() {
  const verseNumbers = document.getElementsByClassName('number-tag');

  for (let i = 0; i < verseNumbers.length - 1; i++) {
    const currentElement = verseNumbers[i];
    const nextElement = verseNumbers[i + 1];

    const currentRect = currentElement.getBoundingClientRect();
    const nextRect = nextElement.getBoundingClientRect();

    if (currentRect.bottom == nextRect.bottom) {
      currentElement.style.top =
        parseFloat(currentElement.style.top) - 6 + 'px';

      nextElement.style.top = parseFloat(nextElement.style.top) + 10 + 'px';
      i++;
    }
  }
}
