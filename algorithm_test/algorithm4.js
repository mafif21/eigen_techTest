var sumList = function (l) {
  let num1 = 0;
  let num2 = 0;
  for (let i = 0; i < l.length; i++) {
    if (num1 != 0) {
      num1 += l[i][i];
      num2 += l[i][l.length - 1 - i];
    } else {
      num1 = l[i][i];
      num2 = l[i][l.length - 1 - i];
    }
  }
  return num1 - num2;
};

console.log(
  sumList([
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
