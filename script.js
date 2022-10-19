
const tiles = document.querySelectorAll('.tiles div'),
      start = document.getElementById('start'),
      win = document.getElementById('win'),
      fields = document.querySelectorAll('.field_cell'),
      bets = document.querySelectorAll('.current-bet'),
      cash = document.querySelector('.cash');

start.addEventListener('click', () => wave(tiles, 2, randomWave));

async function wave(arr, times, cb) {
  for (elem of arr) {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active')
    }
  }
  for (let n = 0; n < times; n++) {
    for (item of arr) {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(item), 200)
      });
      let result = await promise;
      flash(result)
      getWin();
    }
  }
  cb(arr)
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function flash(elem) {
  elem.classList.add('active');
  setTimeout(() => {
    elem.classList.remove('active');
  }, 250);
};

function randomWave(arr) {
  for (elem of arr) {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active')
    }
  }
  let num = randomInt(0, arr.length - 1);
  for (let i = 0; i <= num; i++) {
    setTimeout(() => {
      if (i != num) {
        flash(arr[i])
      } else {
        arr[i].classList.add('active')
        win.innerHTML = '<b>' + arr[i].innerHTML + '</b>';
        tempWonNumber = i + 1;
        let remainingCash = Number(cash.innerHTML);
        cash.innerHTML = remainingCash + getWin();
      }
    }, 250 * i);
  }
}

let tempWonNumber;
let tempBetValue;
let currentField;
let currentMultiplier;

for (let bet of bets) {
  bet.addEventListener('click', () => betSelect(bet))
}

function betSelect(bet) {
  tempBetValue = Number(bet.innerHTML);
}

for (let field of fields) {
  field.addEventListener('click', () => addBetToField(field))
}

function addBetToField(field) {

  for (const field of fields) {
    let child = field.querySelector('.show-bet');
    child.innerHTML = '';
  }

  if (tempBetValue) {
    let child = field.querySelector('.show-bet');
    child.innerHTML = tempBetValue;
    currentField = Number(field.querySelector('.number').innerHTML);
    currentMultiplier = Number(field.querySelector('.multiplier').innerHTML);
  }
}

function getWin() {
  if (tempBetValue && tempWonNumber) {
    if (tempWonNumber == currentField) {
      let plus = tempBetValue * currentMultiplier;
      return plus;
    } else {
      let minus = -(tempBetValue)
      return minus;
    }
  }
}

