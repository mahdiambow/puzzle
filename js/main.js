const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var G = urlParams.has("grid") ? urlParams.get("grid") : 3;
var harekat = 0;
var solved_puzzle = [];
for (var i = 1; i < G ** 2; i++) {
  solved_puzzle.push(i);
}
solved_puzzle.push(0);
var canBoardWin = (array) => {
  let startBoardPosition = array.every((el, i) => {
    return el === solved_puzzle[i];
  });
  if (startBoardPosition) return false;
  let p = 0;
  let row = 0;
  let blankRow = 0;
  for (let i = 0; i < array.length; i++) {
    if (i % G == 0) row++;
    if (array[i] == 0) {
      blankRow = row;
      continue;
    }
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j] && array[j] != 0) p++;
    }
  }
  if (G % 2 == 0 && blankRow % 2 != 0) return p % 2 != 0;
  else return p % 2 == 0;
};
var shuffle = () => {
  let array = solved_puzzle.concat().sort(() => Math.random() - 0.5);
  if (canBoardWin(array)) {
    return array;
  }
  return shuffle();
};
var A = shuffle();
var switcher = (l) => {
  harekat++;
  let temp = A[l[0]];
  A[l[0]] = A[l[1]];
  A[l[1]] = temp;
  printer();
};
var checker = () => {
  let flag = true;
  A.forEach((a, i) => (flag *= a == (i == A.length - 1 ? 0 : i + 1)));
  if (flag) {
    var payam = document.getElementById("payam");
    payam.textContent = "شما برنده شدید";
    payam.setAttribute(
      "style",
      "color:gold;font-size:x-large;font-weight:bold"
    );
  }
};
var finder = (n) => {
  let loc = [0, 0];
  for (let i = 0; i < A.length; i++) {
    if (A[i] == n) loc[0] = i;
    else if (A[i] == 0) loc[1] = i;
  }
  return loc;
};
var play = (n) => {
  var payam = document.getElementById("payam");
  payam.innerHTML = "";
  let l = finder(n);
  if (
    Math.floor(l[0] / G) == Math.floor(l[1] / G) &&
    Math.abs(l[0] - l[1]) == 1
  ) {
    switcher(l);
  } else if (Math.abs(l[0] - l[1]) == G) {
    switcher(l);
  } else {
    var error = document.getElementById("payam");
    error.textContent = `شما نمیتونید حرکت بدین شماره   ${n} رو`;
    error.style.color = "red";
    error.style.fontSize = "15px";
    error.style.marginTop = "1rem";
  }
  checker();
};
var printer = () => {
  var tharekat = document.getElementById("harekat");
  tharekat.textContent = `کل حرکت ها  : ${harekat}`;
  tharekat.style.color = "black";
  tharekat.style.fontSize = "15px";
  tharekat.style.marginTop = "1rem";
  var table = document.getElementById("puzzle");
  table.innerHTML = "";
  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);
  let p = 0;
  for (let i = 0; i < G; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);
    for (let j = 0; j < G; j++) {
      var td = document.createElement("TD");
      if (A[p] > 0) {
        td.setAttribute("onclick", `play("${A[p]}")`);
        td.appendChild(document.createTextNode(A[p]));
      } else {
        td.appendChild(document.createTextNode(""));
      }
      tr.appendChild(td);
      p++;
    }
  }
};
printer();
