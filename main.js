const btnZero = document.getElementById("zero");
const btnOne = document.getElementById("one");
const btnTwo = document.getElementById("two");
const btnThree = document.getElementById("three");
const btnFour = document.getElementById("four");
const btnFive = document.getElementById("five");
const btnSix = document.getElementById("six");
const btnSeven = document.getElementById("seven");
const btnEight = document.getElementById("eight");
const btnNine = document.getElementById("nine");
const btnEnter = document.getElementById("enter")
const btnPlus = document.getElementById("plus")
const btnMinus = document.getElementById("minus")
const btnMultiply = document.getElementById("multiply")
const btnDivide = document.getElementById("divide")
const btnDelete = document.getElementById("delete")

btnZero.addEventListener("click", () => updateRow("0"));
btnOne.addEventListener("click", () => updateRow("1"));
btnTwo.addEventListener("click", () => updateRow("2"));
btnThree.addEventListener("click", () => updateRow("3"));
btnFour.addEventListener("click", () => updateRow("4"));
btnFive.addEventListener("click", () => updateRow("5"));
btnSix.addEventListener("click", () => updateRow("6"));
btnSeven.addEventListener("click", () => updateRow("7"));
btnEight.addEventListener("click", () => updateRow("8"));
btnNine.addEventListener("click", () => updateRow("9"));
btnPlus.addEventListener("click", () => updateRow("+"));
btnMinus.addEventListener("click", () => updateRow("-"));
btnMultiply.addEventListener("click", () => updateRow("*"));
btnDivide.addEventListener("click", () => updateRow("/"));

const rows = document.querySelectorAll(".row");
const slots = document.querySelectorAll(".slots");
const numbersAndSymbols = document.querySelectorAll(".numbers button, .symbols button");
let currentRowIndex = 0;

const randomNumber = document.getElementById("random-number");
const singleDigitMin = 1;
const singleDigitMax = 9;
const doubleDigitMin = 10;
const doubleDigitMax = 99;
const symbols = ["+", "-", "*", "/"];

let calculation = "";

// function to generate a random calculation 
function generateCalculation () {
    let number1 = '';
    let symbol1 = '';
    let number2 = '';
    let symbol2 = '';
    let number3 = '';

let result;

while (!Number.isInteger(result) || result <= 0 || result >150) {
    // generate either single or double digit for the first number
    number1 = Math.random() < 0.5 ? 
    Math.floor(Math.random() * (singleDigitMax - singleDigitMin +1)) + singleDigitMin : 
    Math.floor(Math.random() * (doubleDigitMax - doubleDigitMin +1)) + doubleDigitMin;
    
    // generate a random symbol 
    symbol1 = symbols[Math.floor(Math.random() * symbols.length)];

    // generate either single or double digit for the second number
    if (number1 >= doubleDigitMin) {
        number2 = Math.floor(Math.random() * 
        (singleDigitMax - singleDigitMin +1)) + singleDigitMin
    } else {
        number2 = Math.random() < 0.5 ?  
        Math.floor(Math.random() * (singleDigitMax - singleDigitMin +1)) + singleDigitMin : 
        Math.floor(Math.random() * (doubleDigitMax - doubleDigitMin +1)) + doubleDigitMin;
    }

    // generate a random symbol
    symbol2 = symbols[Math.floor(Math.random() * symbols.length)];

    // generate either single or double digit for the third number
    if (number1 >= doubleDigitMin || number2 >= doubleDigitMin) {
        number3 = Math.floor(Math.random() * 
        (singleDigitMax - singleDigitMin +1)) + singleDigitMin
    } else {
       number3 = Math.floor(Math.random() * (doubleDigitMax - doubleDigitMin +1)) + doubleDigitMin;
    }
     
    // concatenate the numbers and symbols into one variable
    calculation = number1 + symbol1 + number2 + symbol2 + number3;
    // calculate the concatenated variable
    result = eval(calculation);

    randomNumber.innerHTML = result;
    
    }
}
generateCalculation();

// display numbers/symbols on the current row that is being used
function updateRow(content) {
    const currentRow = rows[currentRowIndex];
      const slots = currentRow.querySelectorAll(".slots");
      for (const slot of slots) {
        if (!slot.textContent) {
          slot.textContent = content;
          return;
        }
      }
  }

  // when users clicks delete button, shortens the length of the innerText on the current row
  btnDelete.addEventListener("click", function() {
    const currentRow = rows[currentRowIndex];
    const slots = currentRow.querySelectorAll(".slots");
    for (let i = slots.length - 1; i >= 0; i--) {
        if (slots[i].innerText.length > 0) {
            slots[i].innerText = "";
            break;
        }
    }
})

let coloredBtns = [];

  btnEnter.addEventListener("click", function() {
    let userCalc = "";
    const currentRow = rows[currentRowIndex];
    const slots = currentRow.querySelectorAll(".slots");
    for (const slot of slots) {
      userCalc += slot.textContent;
    }

   
    // if the user's calculation does not equal to the random number or 
    // does not have enough inputs (6), pop up a message
    if (eval(userCalc) != randomNumber.textContent || userCalc.length < 6) {
      window.alert("The calculation does not equal to " + randomNumber.textContent);
      return;
      // comparing each input's position on the current row one by one 
      // with the generated calculation's inputs' position
    } else {
        for (let i = 0; i < slots.length; i++) {
          let slotValue = slots[i].textContent;
          let calculationValue = calculation.charAt(i);
          // change the background color of the inputs on the row to green
          // if matches exaclty with the inputs from the generated calculation
          if (slotValue === calculationValue) {
            slots[i].style.backgroundColor = "#06d455";
            // finding the "correct" input from button elements and change
            // the background color to green as well
            numbersAndSymbols.forEach(button => {
              if (button.innerText === slotValue) {
                button.style.backgroundColor = "#06d455";
                coloredBtns.push(button);
              }
            })
            // changes background color to yellow
          } else if (calculation.indexOf(slotValue) !== -1) {
            slots[i].style.backgroundColor = "#fadf5a";
            numbersAndSymbols.forEach(button => {
              if (button.innerText === slotValue && !coloredBtns.includes(button)) 
              {
                button.style.backgroundColor = "#fadf5a";
              }
            })    
            // changes background color to gray
          } else {
            slots[i].style.backgroundColor = "#a3a3a3";
            numbersAndSymbols.forEach(button => {
              if (button.innerText === slotValue) {
                button.style.backgroundColor = "#a3a3a3";
              }
            })
          }
        }
        currentRowIndex++;
      }
      
})
