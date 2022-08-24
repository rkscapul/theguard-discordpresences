export const randomizeArray = (array) => {
  let currentIndex = array.length;
  let randomIndex = 0;
  let randomizedArray = [];

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    randomizedArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }

  return randomizedArray;
}