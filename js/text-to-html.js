const fs = require('fs');

let br = '<br>'; // #
let p = '<p>'; // *
let fp = '</p>'; // ^
let y_q = '<div class="y-q">'; // $
let a_q = '<div class="a-q">'; // @
let r_q = '<div class="r-q">'; // %
let end = '</div>'; // &
let uTag = '<u>'; // \
let u_end = '</u>'; // +
let close_marker = '</span>'; // Z | Opening marker is created in the function createVerseSpan()
let small_space = '<div class="small-space"></div>';

fs.readFile('../input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let i = 0;
  while (i < data.length) {
    if (data[i] === '#') {
      data = changeThisFor(data, i, br);
    } else if (data[i] === '$') {
      data = changeThisFor(data, i, y_q);
    } else if (data[i] === '*') {
      data = changeThisFor(data, i, p);
    } else if (data[i] === '^') {
      data = changeThisFor(data, i, fp);
    } else if (data[i] === '@') {
      data = changeThisFor(data, i, a_q);
    } else if (data[i] === '%') {
      data = changeThisFor(data, i, r_q);
    } else if (data[i] === '\\') {
      data = changeThisFor(data, i, uTag);
    } else if (data[i] === '+') {
      data = changeThisFor(data, i, u_end);
    } else if (data[i] === '&') {
      data = changeThisFor(data, i, end);
    } else if (data[i] === 'R') {
      data = createVerseSpan(data, i);
    } else if (data[i] === `Z`) {
      data = changeThisFor(data, i, close_marker);
    } else if (data[i] === 'S') {
      data = changeThisFor(data, i, small_space);
    }
    i++;
  }
  fs.writeFile('../output.txt', data, (err) => {
    if (err) throw err;
    console.log('Done!');
  });
});

function changeThisFor(data, i, that) {
  let slice1 = data.slice(0, i);
  let slice2 = data.slice(i + 1, data.length);
  data = slice1 + that + slice2;
  return data;
}

function createVerseSpan(data, i) {
  let verse = '';
  let verseDigits = 0;

  if (i + 1 < data.length && !isNaN(data[i + 1])) {
    verse += data[i + 1];
    verseDigits++;
  }
  if (i + 2 < data.length && !isNaN(data[i + 2])) {
    verse += data[i + 2];
    verseDigits++;
  }

  let openingMarker = `<span id="X_${verse}" class="marker">`;

  let slice1 = data.slice(0, i);
  let slice2 = data.slice(i + verseDigits + 1, data.length);
  data = slice1 + openingMarker + slice2;
  return data;
}
