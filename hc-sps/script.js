function scrollToForm() {
  document.getElementById("form").scrollIntoView({ behavior: "smooth" });
}

function analyze() {
  const sleep = Number(document.getElementById("sleep").value);
  const wake = document.getElementById("wake").value;
  const study = Number(document.getElementById("study").value);
  const screen = Number(document.getElementById("screen").value);
  const activeDays = Number(document.getElementById("activeDays").value);
  const productive = document.getElementById("productive").value;

  if (!sleep || !wake || !study || !screen || !activeDays) {
    alert("Please complete all inputs.");
    return;
  }

  document.getElementById("result").classList.remove("hidden");

  // ===== SCORING =====
  const sleepScore = sleep >= 7 && sleep <= 9 ? 30 : sleep >= 6 ? 22 : sleep >= 5 ? 15 : 8;
  const studyScore = study <= 4 ? 25 : study <= 6 ? 18 : 10;
  const screenScore = screen <= 4 ? 25 : screen <= 6 ? 18 : screen <= 8 ? 10 : 5;
  const routineScore = activeDays >= 5 ? 20 : activeDays >= 3 ? 14 : 8;

  const totalScore = sleepScore + studyScore + screenScore + routineScore;

  // ===== ZONE =====
  let zoneText = "";
  let zoneColor = "";

  if (totalScore <= 40) {
    zoneText = "🔴 Red Zone — Burnout Risk";
    zoneColor = "red";
  } else if (totalScore <= 70) {
    zoneText = "🟡 Yellow Zone — Unstable Balance";
    zoneColor = "orange";
  } else {
    zoneText = "🟢 Green Zone — Healthy Balance";
    zoneColor = "green";
  }

  document.getElementById("scoreText").innerText = `Balance Score: ${totalScore} / 100`;
  document.getElementById("zoneText").innerText = zoneText;
  document.getElementById("zoneText").style.color = zoneColor;

  // ===== PEAK TIME =====
  const [wakeHour] = wake.split(":").map(Number);
  const offset = productive === "Morning" ? 2 : productive === "Afternoon" ? 5 : 8;
  const peakStart = wakeHour + offset;
  const peakEnd = peakStart + 2;

  document.getElementById("peakTime").innerText =
    `${String(peakStart).padStart(2, "0")}:00 – ${String(peakEnd).padStart(2, "0")}:00`;

  // ===== BARS =====
  setBar("sleepBar", sleepScore, 30);
  setBar("studyBar", studyScore, 25);
  setBar("screenBar", screenScore, 25);
  setBar("routineBar", routineScore, 20);

  // ===== INSIGHT =====
  document.getElementById("insight").innerText =
    `Your productivity balance is mainly influenced by ${sleep < 7 ? "sleep deficit" : "adequate recovery"} 
    and ${screen > 6 ? "high digital exposure" : "controlled screen usage"}. 
    Your estimated peak focus window aligns best with ${productive.toLowerCase()} hours.`;

  // ===== SOLUTIONS =====
  const solutions = document.getElementById("solutions");
  solutions.innerHTML = "";

  if (sleep < 7) addItem(solutions, "Increase sleep duration to stabilize cognitive performance.");
  if (screen > 6) addItem(solutions, "Reduce screen exposure 1–2 hours before sleep.");
  if (study > 6) addItem(solutions, "Focus on shorter, higher-quality study sessions.");
  if (productive === "Night") addItem(solutions, "Avoid heavy study late at night to protect sleep rhythm.");

  if (!solutions.children.length) {
    addItem(solutions, "Your routine is balanced. Maintain consistency.");
  }

  // ===== THREATS =====
  const threats = document.getElementById("threats");
  threats.innerHTML = "";

  if (sleep < 6) addItem(threats, "Chronic fatigue and memory consolidation issues.");
  if (screen > 8) addItem(threats, "Attention fragmentation and dopamine overstimulation.");
  if (study > 7) addItem(threats, "High risk of academic burnout.");

  if (!threats.children.length) {
    addItem(threats, "No immediate threats detected.");
  }
}

function setBar(id, value, max) {
  const percent = (value / max) * 100;
  const bar = document.getElementById(id);
  bar.style.width = percent + "%";
  bar.innerText = value;
}

function addItem(list, text) {
  const li = document.createElement("li");
  li.innerText = text;
  list.appendChild(li);
}

function resetAll() {
  location.reload();
}
