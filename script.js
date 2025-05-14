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
    image: "https://cdn.discordapp.com/attachments/1257764972973523048/1372302968820334642/ezgif.com-video-to-gif-converter.gif?ex=6826483b&is=6824f6bb&hm=5ac1cf969ce7d611242eaedb16bade10f63a6950e888ec5f78c0e796c7639dd5&"
  },
  {
    title: "El racisto",
    startDate: "2025-05-14",
    endDate: "2025-08-15",
    image: "https://media.discordapp.net/attachments/1225159881766469822/1372302788826108004/Screenshot_20240328-085936.png?ex=68264811&is=6824f691&hm=a3adb407eb437f00db4c8242e712ab31168ab79280c9e6c6f928a4f955792a31&=&format=webp&quality=lossless"
  },
  {
    title: "ching chong",
    startDate: "2025-05-19",
    endDate: "2025-08-22",
    image: "https://media.discordapp.net/attachments/1172504716379426947/1372310074835468398/image.png?ex=68264eda&is=6824fd5a&hm=fdf668238c277dff05f3c7e9f5c83fc11468d4770c51c3b41302b386c69c32da&=&format=webp&quality=lossless"
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

function renderTimers() {
  const container = document.getElementById("timers-container");

  timers.forEach(timer => {
    const now = new Date();
    const start = new Date(timer.startDate);
    const end = new Date(timer.endDate);
    const daysUntilStart = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    const daysUntilEnd = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  
    const card = document.createElement("div");
    card.className = "timer-card";
  
    // Cas 1 : Le timer n'a pas encore commencé
    if (now < start) {
      card.innerHTML = `
        <div class="timer-card-background" style="background-image: url('${timer.image}')"></div>
        <div class="timer-info">
          <div class="timer-title">${timer.title}</div>
          <div class="timer-before">Commence dans ${daysUntilStart} jour${daysUntilStart > 1 ? 's' : ''}</div>
        </div>
      `;
    } 
    // Cas 2 : Le timer est terminé
    else if (now > end) {
      card.innerHTML = `
        <div class="timer-card-background" style="background-image: url('${timer.image}')"></div>
        <div class="timer-info">
          <div class="timer-title">${timer.title}</div>
          <div class="timer-days">Terminé ! force à vous autres :3</div>
        </div>
      `;
    } 
    // Cas 3 : Le timer est en cours
    else {
      const progress = getProgress(timer.startDate, timer.endDate);
      const { elapsed, total } = getDayStats(timer.startDate, timer.endDate);
  
      card.innerHTML = `
        <div class="timer-card-background" style="background-image: url('${timer.image}')"></div>
        <div class="timer-info">
          <div class="timer-title">${timer.title}</div>
          <div class="timer-days">${daysUntilEnd} jours restants</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%;"></div>
          </div>
          <div class="progress-percent">${progress}% — ${elapsed}/${total}</div>
        </div>
      `;
    }
  
    container.appendChild(card);
  });
  
}


renderTimers();
