let paragraphButton = document.getElementById('paragraphButton');
let quoteBlueButton = document.getElementById('quoteBlueButton');
let quoteRedButton = document.getElementById('quoteRedButton');
let quoteGreenButton = document.getElementById('quoteGreenButton');
let quoteYellowButton = document.getElementById('quoteYellowButton');
let quoteGrayButton = document.getElementById('quoteGrayButton');
let quotePurpleButton = document.getElementById('quotePurpleButton');

function wrapSelection(tagName, className = null) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    if (
      startContainer.nodeType === Node.TEXT_NODE &&
      startContainer.parentNode.classList.contains('marker')
    ) {
      range.setStartBefore(startContainer.parentNode);
    }
    if (
      endContainer.nodeType === Node.TEXT_NODE &&
      endContainer.parentNode.classList.contains('marker')
    ) {
      range.setEndAfter(endContainer.parentNode);
    }

    if (!range.collapsed) {
      const wrapper = document.createElement(tagName);
      if (className) {
        wrapper.className = className;
      }
      try {
        range.surroundContents(wrapper);
      } catch (e) {
        console.error('Error wrapping selection:', e);
      }
    }
    placeVerses();
  }
}

paragraphButton.addEventListener('click', () => {
  wrapSelection('p');
});

quoteBlueButton.addEventListener('click', () => {
  wrapSelection('div', 'y-q');
});

quoteRedButton.addEventListener('click', () => {
  wrapSelection('div', 'r-q');
});

quoteGreenButton.addEventListener('click', () => {
  wrapSelection('div', 'a-q');
});

quoteYellowButton.addEventListener('click', () => {
  wrapSelection('div', 's-q');
});

quoteGrayButton.addEventListener('click', () => {
  wrapSelection('div', 'i-q');
});

quotePurpleButton.addEventListener('click', () => {
  wrapSelection('div', 'p-q');
});
