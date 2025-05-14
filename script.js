const timers = [
  {
    title: "Sex Lord",
    startDate: "2025-03-03",
    endDate: "2025-06-13",
    image: "https://i.pinimg.com/564x/eb/b4/df/ebb4df3f6843e6ac2ac52fb63b7989bf.jpg"
  },
  {
    title: "Furry Femboy Feet Licker",
    startDate: "2025-05-12",
    endDate: "2025-08-31",
    image: "https://media.tenor.com/WSUJGrlnfJAAAAAe/furry-femboy-furry.png"
  },
  // {
  //   title: "El racisto",
  //   startDate: "2025-05-14",
  //   endDate: "2025-08-31",
  //   image: "https://media.tenor.com/WSUJGrlnfJAAAAAe/furry-femboy-furry.png"
  // },
];


function daysRemaining(targetDate) {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getProgress(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const total = end - start;
  const elapsed = now - start;

  let progress = (elapsed / total) * 100;
  progress = Math.min(100, Math.max(0, progress)); // clamp entre 0 et 100
  return progress.toFixed(1);
}

function getDayStats(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const total = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const elapsed = Math.max(0, Math.ceil((now - start) / (1000 * 60 * 60 * 24)));

  return { elapsed, total };
}

function renderTimers() {
  const container = document.getElementById("timers-container");

  timers.forEach(timer => {
    const days = daysRemaining(timer.endDate);
    const progress = getProgress(timer.startDate, timer.endDate);
    const { elapsed, total } = getDayStats(timer.startDate, timer.endDate);

    const card = document.createElement("div");
    card.className = "timer-card";

    card.innerHTML = `
      <div class="timer-card-background" style="background-image: url('${timer.image}')"></div>
      <div class="timer-info">
        <div class="timer-title">${timer.title}</div>
        <div class="timer-days">${days >= 0 ? `${days} jours restants` : `Terminé ! force à vous autres :3`}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%;"></div>
        </div>
        <div class="progress-percent">${progress}% — ${elapsed}/${total}</div>
      </div>
    `;

    container.appendChild(card);
  });
}


renderTimers();
