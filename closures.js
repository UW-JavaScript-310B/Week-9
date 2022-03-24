// Example
const createCounter = () => {
  let count = 0;
  const getCount = () => count;
  const increaseCount = () => count++;

  return {
    getCount,
    increaseCount,
  };
};

const counter = createCounter();
const counter2 = createCounter();
counter.increaseCount();
console.log(counter.getCount());

// counter2.increaseCount();
// console.log(counter2.getCount());

// counter2.increaseCount();
// console.log(counter2.getCount());
// 1

// Exercise:
// This function should create an empty array of messages, and should then
// return an object with the following methods:
// - addMessage method that adds a message to the array
// - getMessage(index) method that returns the message at index index

const createMessageHolder = () => {
  const messages = [];
  const addMessage = (message) => messages.push(message);
  const getMessage = (index) => messages[index];

  return {
    addMessage,
    getMessage,
  };
};

// Test
const messageHolder = createMessageHolder();
messageHolder.addMessage("Hello!");
messageHolder.addMessage("Goodbye!");
console.log(messageHolder.getMessage(0));
// "Hello!""
console.log(messageHolder.getMessage(1));
//Goodbye

// Example: non-currying
const addNumbers = (num1, num2) => {
  return num1 + num2;
};
console.log(addNumbers(5, 3));
// 8

// Example: currying
const addToNumber = (num1) => {
  const addToFirst = (num2) => {
    return num1 + num2;
  };
  return addToFirst;
};
const addThree = addToNumber(3);
console.log(addThree(9));
// 12

console.log(addThree(41));
// 44

// Create a function createGreeting
// - This should accept a single argument: greeting (i.e. "Hello")
// This will return a function a function greet
// - This accepts a single argument, name (i.e. "Matt")
// - This function should return the greeting combined with the name, (i.e. "Hello Matt")
const createGreeting = (greeting) => {
  const greet = function (name) {
    return `${greeting} ${name}`;
  };

  return greet;
};
// Test
const welcomeGreet = createGreeting("Welcome");
console.log(welcomeGreet("Alice"));

const helloGreet = createGreeting("Hello");
console.log(helloGreet("Winnie"));
