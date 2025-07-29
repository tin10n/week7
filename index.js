// CALCULATOR TESTING VERSION //

// The displayBox will show what is being computed using our buttons.
let displayBox = document.getElementById("displayBox");
let buttons = document.querySelectorAll("button");

let output = "";
let hhistoryLog = 0;
let history = [];

// Allows user to use keyboard input for the calculator.
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Restricts the process to only the valid keys (numbers, operators, and control keys)
  const validKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    ".",
    "Enter",
    "Return",
    "Backspace",
    "Escape",
    "%",
  ];

  if (validKeys.includes(key)) {
    handleKeyInput(key);
  }
});

// Allows user to click the buttons for the calculator.
buttons.forEach((element) => {
  element.addEventListener("click", (e) => {
    const buttonText = e.target.innerText;
    handleKeyInput(buttonText);
  });
});

// Functionality for the calculator by button or keyboard. Instead of infinity, division by zero is handled as 'Error'.
function handleKeyInput(key) {
  if (key === "Enter" || key === "=") {
    output = output === "" ? "0" : output;
    try {
      if (output.includes("/0")) {
        output = "Error";
      } else {
        output = String(eval(output));
      }
    } catch (error) {
      output = "Error";
    }

    // Updating history log.
    history.push(output);
    updateHistory();
    displayBox.value = output;

    // If Backspace or DEL pressed, the last character iss removed.
  } else if (key === "Backspace" || key === "DEL") {
    output = output.substring(0, output.length - 1);
    displayBox.value = output;

    // If Escape or AC pressed, the display is clear.
  } else if (key === "Escape" || key === "AC") {
    output = "";
    displayBox.value = output;
    history = [];
    updateHistory();

    // If plusMinus is pressed, result is negated.
  } else if (key === "plusMinus") {
    output = String(-eval(output));
    displayBox.value = output;

    // If percentage is pressed, the result is divided by 100.
  } else if (key === "%") {
    try {
      output = String(eval(output) / 100);
      displayBox.value = output;
    } catch (error) {
      displayBox.value = "Error";
    }

    // If it's a number or operator, append it to the output.
  } else {
    output += key;
    displayBox.value = output;
  }

  function updateHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    history.forEach((item) => {
      let li = document.createElement("li");
      li.classList.add("historyView");
      li.textContent = item;
      historyList.appendChild(li);
    });
  }
}
