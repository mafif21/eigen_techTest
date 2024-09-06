var getTotalWord = function (arrInp, arrQuery) {
  let total = [];

  for (let i = 0; i < arrQuery.length; i++) {
    let count = 0;
    arrInp.forEach((arr) => {
      if (arr == arrQuery[i]) {
        count++;
      }
    });

    total.push(count);
  }
  return total;
};

const inp = ["xc", "dz", "bbb", "dz"];
const qry = ["bbb", "ac", "dz"];

console.log(getTotalWord(inp, qry));
