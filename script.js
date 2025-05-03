const clickSound = new Audio('click.mp3');
const happySound = new Audio('success.mp3');
const alertSound = new Audio('alert.mp3');

let history = [];

function calculateBMI() {
  clickSound.play();

  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  if (!height || !weight || !age || !gender) {
    alert("Please fill in all fields!");
    return;
  }

  const heightInM = height / 100;
  const bmi = (weight / (heightInM * heightInM)).toFixed(2);

  let category = "", emoji = "", tip = "", colorClass = "";

  if (bmi < 18.5) {
    category = "Underweight";
    emoji = "🥗";
    tip = "Try eating protein-rich and calorie-dense meals.";
    colorClass = "yellow";
    alertSound.play();
  } else if (bmi < 24.9) {
    category = "Normal";
    emoji = "💪";
    tip = "Great job! Keep up a balanced lifestyle.";
    colorClass = "green";
    happySound.play();
  } else if (bmi < 29.9) {
    category = "Overweight";
    emoji = "🍔";
    tip = "Consider light exercise and a healthy diet.";
    colorClass = "yellow";
    alertSound.play();
  } else {
    category = "Obese";
    emoji = "🧁";
    tip = "Consult a doctor for health and nutrition advice.";
    colorClass = "red";
    alertSound.play();
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `Your BMI is ${bmi} (<span style="color:${colorClass}">${category}</span>)`;

  document.getElementById("emoji").innerText = emoji;
  document.getElementById("tip").innerText = `💡 Tip: ${tip}`;

  // Add to history
  history.unshift(`BMI: ${bmi} (${category}) - Age: ${age}, Gender: ${gender}`);
  if (history.length > 5) history.pop();

  const historyList = document.getElementById("history");
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function resetForm() {
  clickSound.play();
  ["age", "gender", "height", "weight"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("result").innerText = "";
  document.getElementById("emoji").innerText = "";
  document.getElementById("tip").innerText = "";
}

function toggleHistory() {
  const container = document.getElementById("historyContainer");
  const button = document.getElementById("toggleHistory");

  container.style.display = container.style.display === "none" ? "block" : "none";
  button.innerText = container.style.display === "block" ? "📜 Hide History ▲" : "📜 Show History ▼";
}

document.getElementById("themeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode", this.checked);
});

