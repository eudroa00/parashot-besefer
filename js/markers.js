document.addEventListener('DOMContentLoaded', () => {
  setTimeout(placeVerses, 50); // Allow layout to settle
});
window.addEventListener('resize', placeVerses);
window.addEventListener('resize', updateChapterPosition);
document.addEventListener('DOMContentLoaded', updateChapterPosition);

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
  const columnOffset = numberColumn.getBoundingClientRect().top; // Get the offset of the index column

  markers.forEach((marker, index) => {
    const markerRect = marker.getBoundingClientRect();

    const markerId = marker.id.split('_');
    const partNumber = markerId[1];

    // Create a new number element
    const numberElement = document.createElement('p');
    numberElement.className = 'number-tag';
    numberElement.innerText = partNumber;

    // Calculate the position relative to the index column
    const topPosition = markerRect.top - columnOffset;
    // Set the top position for the number element
    if (marker.classList.contains('inside')) {
      if (window.innerWidth <= 576) {
        numberElement.style.top = `${topPosition + 4}px`;
      } else {
        numberElement.style.top = `${topPosition + 9}px`;
      }
    } else {
      numberElement.style.top = `${topPosition + 1}px`;
    }

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

    // Check if the current element overlaps with the next element
    if (currentRect.bottom > nextRect.top) {
      // Move the previous (current) element a few pixels upward
      currentElement.style.top =
        parseFloat(currentElement.style.top) - 6 + 'px';

      // Move the next element a few pixels downward
      nextElement.style.top = parseFloat(nextElement.style.top) + 10 + 'px';
      i++;
    }
  }
}
