let displayBox = document.getElementById("displayBox");
let buttons = document.querySelectorAll("button");

var memoryValue = 0;

let output = "";

buttons.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.innerText == "=") {
      output = output == "" ? "0" : output;
      try {
        output = String(eval(output));
        displayBox.value = output;
      } catch (error) {
        displayBox.value = "Error";
      }
    } else if (e.target.innerText === "AC") {
      output = "";
      displayBox.value = output;
    } else if (e.target.innerText === "DEL") {
      output = output.substring(0, output.length - 1);
      displayBox.value = output;
    } else if (e.target.innerText === "plusMinus") {
      output = String(-eval(output));
      displayBox.value = output;
    } else if (e.target.innerText === "%") {
      try {
        output = String(eval(output / 100));
        displayBox.value = output;
      } catch (error) {
        displayBox.value = "Error";
      }
    } else {
      output += e.target.innerText;
      displayBox.value = output;
    }
  });
});
