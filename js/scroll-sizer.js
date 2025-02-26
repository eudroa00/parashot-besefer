document.addEventListener('DOMContentLoaded', adaptScroll);

window.addEventListener('resize', adaptScroll);

let editable = document.getElementById('editable');

editable.addEventListener('keyup', adaptScroll);
editable.addEventListener('input', adaptScroll);
editable.addEventListener('paste', adaptScroll);
const observer = new MutationObserver(adaptScroll);
observer.observe(editable, {
  attributes: true,
  childList: true,
  subtree: true,
});
editable.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = range.startContainer;

      let markerSpan =
        container.nodeType === Node.TEXT_NODE
          ? container.parentNode
          : container;
      if (markerSpan.classList && markerSpan.classList.contains('marker')) {
        const br = document.createElement('br');
        markerSpan.parentNode.insertBefore(br, markerSpan);

        const newRange = document.createRange();
        newRange.setStartAfter(br);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        const br = document.createElement('br');
        range.deleteContents();
        range.insertNode(br);

        const newRange = document.createRange();
        newRange.setStartAfter(br);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }
});

function adaptScroll() {
  let container = document.getElementById('container');
  let scrollTop = document.getElementById('scrollTop');
  let scrollBody = document.getElementById('scrollBody');
  let scrollBottom = document.getElementById('scrollBottom');
  let text = document.getElementById('text');

  let scrollTopHeight = scrollTop.getBoundingClientRect().height;
  let scrollBottomHeight = scrollBottom.getBoundingClientRect().height;

  text.style.paddingTop = 0.6 * scrollTopHeight + 'px';

  let textHeight = text.getBoundingClientRect().height;

  scrollBody.style.height = textHeight - scrollBottomHeight + 50 + 'px';

  container.style.height =
    0.6 * scrollTopHeight + textHeight + scrollBottomHeight + 'px';

  scrollBottom.style.bottom = 150 * (scrollBottomHeight / 360) + 'px';
}

function wrapSelectedText() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (!range.collapsed) {
      const span = document.createElement('span');
      span.id = 'selected-text';
      range.surroundContents(span);
    }
  }
}

document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0 || selection.isCollapsed) {
    const span = document.getElementById('selected-text');
    if (span) {
      const parent = span.parentNode;
      const textContent = span.textContent;

      const textNode = document.createTextNode(textContent);

      parent.insertBefore(textNode, span);

      parent.removeChild(span);

      if (
        textNode.previousSibling &&
        textNode.previousSibling.nodeType === Node.TEXT_NODE
      ) {
        textNode.previousSibling.textContent += textNode.textContent;
        parent.removeChild(textNode);
        textNode = textNode.previousSibling;
      }

      if (
        textNode.nextSibling &&
        textNode.nextSibling.nodeType === Node.TEXT_NODE
      ) {
        textNode.textContent += textNode.nextSibling.textContent;
        parent.removeChild(textNode.nextSibling);
      }
    }
  }
});

document.getElementById('insertButton').addEventListener('click', () => {
  const chapter = prompt('Enter the chapter:');
  if (chapter !== null) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (!range.collapsed) {
        let text = selection.toString();
        let textWithReferences = createReferences(text, chapter);
        range.deleteContents();
        const div = document.createElement('div');
        div.className = 'perek';
        div.textContent = chapter;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = textWithReferences;
        const fragment = document.createDocumentFragment();
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }
        const hr = document.createElement('hr');
        range.insertNode(hr);
        const br2 = document.createElement('br');
        range.insertNode(br2);
        range.insertNode(fragment);
        const br1 = document.createElement('br');
        range.insertNode(br1);
        range.insertNode(div);

        selection.removeAllRanges();

        placeVerses();
      }
    }
  }
});

function createReferences(data, chapter) {
  return data.replace(/\b(\d{1,3})\s+([^\s]+)/g, (match, verse, firstWord) => {
    return `<span id="${chapter}_${verse}" class="marker">${firstWord}</span>`;
  });
}
