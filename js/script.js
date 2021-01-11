window.onload = function() {
  checkForExistingSession();
}

function checkForExistingSession() {
  // If existing session found in storage, load and resume
  
  // Else, present timer setup form
  
  console.log("No session found");
}

document.getElementById("timer-setup-form").addEventListener("submit", (e) => {
  e.preventDefault();

  buildTimerFromForm();
});

function buildTimerFromForm() {
  let timerParams = getSetupFormParams();
  let progressBar = buildTimer(timerParams);
  
  document.getElementById("progress-bar").innerHTML = progressBar;
}

function getSetupFormParams() {
  let fields = document.getElementById("timer-setup-form").elements;

  let params = {
    "pomodoro-count": fields[0].value,
    "pomodoro-length": fields[1].value,
    "break-length": fields[2].value,
    "lunch-break": fields[3].checked
  }

  return params;
}

function buildTimer(params) {
  console.log(params);

  let pomodoros = params["pomodoro-count"];
  let progressBar = "";

  for (let i = 0; i < pomodoros; i++) {
    progressBar += `<div class="pomodoro">
      <p><span id="pomodoro">${params["pomodoro-length"]}</span>m</p></div>`;

    // Double the middle break after the second pomodoro if lunch break is ticked and 
    // at least 4 pomodoros are specified
    if (i === 1 && params["lunch-break"] === true && params["pomodoro-length"] === 4) {
      progressBar += `<div class="break lunch">
        <p><span id="lunch-break">${params["break-length"] * 2}</span>m</p></div>`;
    } else if (i !== pomodoros - 1) {
      progressBar += `<div class="break">
        <p><span id="break">${params["break-length"]}</span>m</p></div>`;
    }
  }

  return progressBar;
}