// This function should execute the callback function the number of times specified.
// When the function is being executed, the repetition number (i.e. 1 for the first call)
// should be passed to the callback.
const repeatFn = (times, callback) => {
  for(let i =0; i<times; i++){
    callback(times)
  }
};

// Test repeatFn
const addButton = num => {
  const button = document.createElement('button');
  button.innerText = `Button ${num}`;
  document.querySelector('body').appendChild(button);
};
repeatFn(6, addButton);

const toThePower = (num, pow) => {
  let product = 1;
  repeatFn(pow, () => {
    product = product * num;
  });
  return product;
};

console.log(toThePower(3, 3));

const createCounter = () => {
  let count = 0;
  const getCount = () => count;
  const increaseCount = () => count++;
  return {
  getCount,
  increaseCount
  };
  };
  const counter = createCounter();
  counter.increaseCount();
  console.log(counter.getCount());