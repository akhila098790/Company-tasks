
  let display = document.getElementById("display");

  function input(val) {
    if (display.innerText === "0") display.innerText = val;
    else display.innerText += val;
  }

  function clearAll() {
    display.innerText = "0";
  }

  function backspace() {
    let text = display.innerText;
    display.innerText = text.length > 1 ? text.slice(0, -1) : "0";
  }

  function calculate() {
    try {
      display.innerText = eval(display.innerText);
    } catch {
      display.innerText = "Error";
    }
  }
