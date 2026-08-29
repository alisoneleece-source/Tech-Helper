const searchInput = document.querySelector('#guide-search');
const cards = [...document.querySelectorAll('.topic-card')];
const noResults = document.querySelector('#no-results');
const textToggle = document.querySelector('#text-toggle');
const solutionPanel = document.querySelector('#solution-panel');
const emergencyButtons = [...document.querySelectorAll('.emergency-card')];

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const matches = !query || card.dataset.search.includes(query) || card.textContent.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  noResults.hidden = visible !== 0;
});

textToggle.addEventListener('click', () => {
  const active = document.body.classList.toggle('large-text');
  textToggle.setAttribute('aria-pressed', String(active));
  textToggle.textContent = active ? 'Standard text' : 'Larger text';
});

const solutions = {
  frozen: {
    label: 'Device frozen',
    title: 'Pause, then try a restart.',
    body: 'Give the device a moment. If the screen still does not respond, use the restart method for that device rather than repeatedly tapping the screen.'
  },
  internet: {
    label: 'No internet',
    title: 'Check whether other devices are connected.',
    body: 'Try opening a website on another phone, tablet, or computer. This helps identify whether the problem is one device or the home internet connection.'
  },
  power: {
    label: 'Device will not turn on',
    title: 'Connect the original charger and wait.',
    body: 'Look for a charging symbol or small light and leave the device connected for at least 15 minutes before trying the power button again.'
  },
  calls: {
    label: 'Cannot make calls',
    title: 'Check the signal and airplane mode.',
    body: 'Look for signal bars at the top of the screen, then confirm airplane mode is turned off before trying the call again.'
  }
};

emergencyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    emergencyButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const solution = solutions[button.dataset.solution];
    solutionPanel.innerHTML = `<p class="solution-label">${solution.label}</p><h3>${solution.title}</h3><p>${solution.body}</p>`;
    solutionPanel.focus({ preventScroll: true });
  });
});
