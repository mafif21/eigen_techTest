const reverseString = (values) => {
  let w = values.slice(0, -1);
  let n = values.slice(-1);

  let wr = w.split("").reverse();
  let fw = wr.join("") + n;

  return fw;
};

console.log(reverseString("EIGEN1"));
