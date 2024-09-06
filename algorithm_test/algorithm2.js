const sumWord = (values) => {
  let arrString = values.split(" ");
  let finalSentence = "";
  for (let i = 0; i < arrString.length; i++) {
    if (finalSentence.length < arrString[i].length) {
      finalSentence = arrString[i];
    }
  }

  return `${finalSentence} : ${finalSentence.length}`;
};

const sentence = "Saya sangat senang mengerjakan soal algoritma";
