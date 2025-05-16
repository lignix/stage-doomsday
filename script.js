const timers = [
  {
    title: "Sex Lord",
    startDate: "2025-03-03",
    endDate: "2025-06-13",
    image: "https://media1.tenor.com/m/8GXyDWtSoPwAAAAd/chisato-nishikigi-chisato.gif"
  },
  {
    title: "Furry Femboy Feet Licker",
    startDate: "2025-05-12",
    endDate: "2025-08-31",
    image: "https://media.tenor.com/WSUJGrlnfJAAAAAe/furry-femboy-furry.png"
  },
  {
    title: "Oleg chan >_<",
    startDate: "2025-05-19",
    endDate: "2025-08-28",
    image: "./images/oleg.gif"
  },
  {
    title: "El racisto",
    startDate: "2025-05-14",
    endDate: "2025-08-15",
    image: "./images/osaka.png"
  },
  {
    title: "ching chong",
    startDate: "2025-05-19",
    endDate: "2025-08-22",
    image: "./images/damn.png"
  },
  {
    title: "Gandhi",
    startDate: "2025-05-07",
    endDate: "2025-08-31",
    image: "./images/gandhi.png"
  },
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

function formatDateFr(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function renderTimers() {
  const container = document.getElementById("timers-container");

  timers.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  timers.forEach(timer => {
    const now = new Date();
    const start = new Date(timer.startDate);
    const end = new Date(timer.endDate);
    const daysUntilStart = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    const daysUntilEnd = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  
    const card = document.createElement("div");
    card.className = "timer-card";
    let cardBody;
    // Cas 1 : Le timer n'a pas encore commencé
    if (now < start) {
      cardBody = `
        <div class="timer-before">Commence dans ${daysUntilStart} jour${daysUntilStart > 1 ? 's' : ''}</div>
      `;
    } 
    // Cas 2 : Le timer est terminé
    else if (now > end) {
      cardBody = `
        <div class="timer-days">Terminé ! force à vous autres :3</div>
      `;
    } 
    // Cas 3 : Le timer est en cours
    else {
      const progress = getProgress(timer.startDate, timer.endDate);
      const { elapsed, total } = getDayStats(timer.startDate, timer.endDate);
      cardBody = `
        <div class="timer-days">${daysUntilEnd} jours restants</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%;"></div>
        </div>
        <div class="progress-percent">${progress}% — ${elapsed}/${total}</div>
        <div class="timer-dates">${formatDateFr(timer.startDate)} – ${formatDateFr(timer.endDate)}</div>
      `;
    }

    card.innerHTML = `
      <div class="timer-card-background" style="background-image: url('${timer.image}')"></div>
      <div class="timer-info">
        <div class="timer-title">${timer.title}</div>
        ${cardBody}
      </div>
      `;
  
    container.appendChild(card);
  });
}

renderTimers();
